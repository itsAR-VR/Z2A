import { NextResponse } from "next/server";

import {
  CURRENCY,
  DEPOSIT_AMOUNT_CENTS,
  LIST_REMAINDER_AMOUNT_CENTS,
  SEAT_CAP,
} from "@/lib/config";
import { prisma } from "@/lib/db";
import { sendWaitlistSeatOfferEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

type PrepareConversionResult =
  | { kind: "not_found" }
  | { kind: "already_converted" }
  | { kind: "already_paid" }
  | { kind: "sold_out" }
  | { kind: "reused"; checkoutUrl: string }
  | { kind: "in_progress" }
  | { kind: "invalid_status"; status: string }
  | {
      kind: "ready";
      waitlist: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        roleTitle: string | null;
        company: string | null;
        linkedinUrl: string | null;
        useCase: string | null;
        networkCode: string | null;
      };
      attendee: { id: string; email: string };
    };

async function rollbackSeatOffer(waitlistId: string) {
  await prisma.waitlist.updateMany({
    where: {
      id: waitlistId,
      status: "seat_offered",
      convertedCheckoutSessionId: null,
    },
    data: {
      status: "pending",
      seatOfferedAt: null,
    },
  });
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const prep = await prisma.$transaction<PrepareConversionResult>(async (tx) => {
    const waitlist = await tx.waitlist.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roleTitle: true,
        company: true,
        linkedinUrl: true,
        useCase: true,
        networkCode: true,
        status: true,
        convertedCheckoutUrl: true,
      },
    });
    if (!waitlist) return { kind: "not_found" };

    if (waitlist.status === "converted") return { kind: "already_converted" };
    if (waitlist.status === "seat_offered" && waitlist.convertedCheckoutUrl) {
      return { kind: "reused", checkoutUrl: waitlist.convertedCheckoutUrl };
    }
    if (waitlist.status === "seat_offered") return { kind: "in_progress" };
    if (waitlist.status !== "pending") {
      return { kind: "invalid_status", status: waitlist.status };
    }

    const paidSeats = await tx.attendee.count({
      where: { depositStatus: "paid" },
    });
    if (paidSeats >= SEAT_CAP) return { kind: "sold_out" };

    const claimed = await tx.waitlist.updateMany({
      where: { id: waitlist.id, status: "pending" },
      data: {
        status: "seat_offered",
        seatOfferedAt: new Date(),
      },
    });
    if (claimed.count === 0) return { kind: "in_progress" };

    const existing = await tx.attendee.findUnique({
      where: { email: waitlist.email },
      select: { id: true, depositStatus: true },
    });
    if (existing?.depositStatus === "paid") {
      await tx.waitlist.update({
        where: { id: waitlist.id },
        data: {
          status: "converted",
          convertedAt: new Date(),
          attendeeId: existing.id,
        },
      });
      return { kind: "already_paid" };
    }

    const attendee = existing
      ? await tx.attendee.update({
          where: { id: existing.id },
          data: {
            firstName: waitlist.firstName,
            lastName: waitlist.lastName,
            roleTitle: waitlist.roleTitle || "Waitlist Applicant",
            company: waitlist.company || null,
            linkedinUrl: waitlist.linkedinUrl || null,
            useCase: waitlist.useCase || "Waitlist conversion",
            networkCode: waitlist.networkCode || null,
            depositAmount: DEPOSIT_AMOUNT_CENTS,
            depositCurrency: CURRENCY,
            remainderAmount: LIST_REMAINDER_AMOUNT_CENTS,
            remainderCurrency: CURRENCY,
            seatStatus: "reserved",
            applicationStatus: "approved",
          },
        })
      : await tx.attendee.create({
          data: {
            firstName: waitlist.firstName,
            lastName: waitlist.lastName,
            email: waitlist.email,
            roleTitle: waitlist.roleTitle || "Waitlist Applicant",
            company: waitlist.company || null,
            linkedinUrl: waitlist.linkedinUrl || null,
            useCase: waitlist.useCase || "Waitlist conversion",
            networkCode: waitlist.networkCode || null,
            depositAmount: DEPOSIT_AMOUNT_CENTS,
            depositCurrency: CURRENCY,
            remainderAmount: LIST_REMAINDER_AMOUNT_CENTS,
            remainderCurrency: CURRENCY,
            seatStatus: "reserved",
            applicationStatus: "approved",
          },
        });

    return {
      kind: "ready",
      waitlist,
      attendee: { id: attendee.id, email: attendee.email },
    };
  });

  if (prep.kind === "not_found") {
    return NextResponse.json({ error: "Waitlist entry not found" }, { status: 404 });
  }
  if (prep.kind === "already_converted") {
    return NextResponse.json({ error: "Waitlist entry already converted" }, { status: 409 });
  }
  if (prep.kind === "already_paid") {
    return NextResponse.json(
      { error: "This person already has a paid seat reservation." },
      { status: 409 },
    );
  }
  if (prep.kind === "sold_out") {
    return NextResponse.json({ error: "No seats currently available" }, { status: 409 });
  }
  if (prep.kind === "reused") {
    return NextResponse.json({
      checkoutUrl: prep.checkoutUrl,
      reused: true,
      emailSent: false,
    });
  }
  if (prep.kind === "in_progress") {
    return NextResponse.json(
      {
        error:
          "A seat offer is already being prepared for this entry. Please retry in a few seconds.",
      },
      { status: 409 },
    );
  }
  if (prep.kind === "invalid_status") {
    return NextResponse.json(
      { error: `Waitlist entry is not convertible from status: ${prep.status}` },
      { status: 409 },
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: env.STRIPE_DEPOSIT_PRICE_ID, quantity: 1 }],
      success_url: `${env.APP_URL}/apply/success?session_id={CHECKOUT_SESSION_ID}&mode=waitlist`,
      cancel_url: `${env.APP_URL}/apply?canceled=1&mode=waitlist`,
      client_reference_id: prep.attendee.id,
      customer_email: prep.attendee.email,
      metadata: {
        attendee_id: prep.attendee.id,
        waitlist_id: prep.waitlist.id,
        payment_type: "deposit",
        source: "waitlist_convert",
      },
    });
  } catch {
    await rollbackSeatOffer(prep.waitlist.id);
    return NextResponse.json({ error: "Failed to create Stripe Checkout session" }, { status: 500 });
  }

  if (!session.url) {
    await rollbackSeatOffer(prep.waitlist.id);
    return NextResponse.json(
      { error: "Stripe Checkout session missing redirect URL" },
      { status: 500 },
    );
  }

  await Promise.all([
    prisma.waitlist.update({
      where: { id: prep.waitlist.id },
      data: {
        status: "seat_offered",
        convertedCheckoutSessionId: session.id,
        convertedCheckoutUrl: session.url,
        attendeeId: prep.attendee.id,
      },
    }),
    prisma.attendee.update({
      where: { id: prep.attendee.id },
      data: { checkoutSessionId: session.id },
    }),
  ]);

  let emailSent = false;
  let emailError: string | null = null;
  try {
    const result = await sendWaitlistSeatOfferEmail({
      firstName: prep.waitlist.firstName,
      to: prep.waitlist.email,
      checkoutUrl: session.url,
    });
    emailSent = !result.skipped;
    if (result.skipped) emailError = result.reason;
  } catch (err) {
    emailError = err instanceof Error ? err.message : "Unknown email error";
  }

  return NextResponse.json({
    checkoutUrl: session.url,
    emailSent,
    ...(emailError ? { emailError } : {}),
  });
}
