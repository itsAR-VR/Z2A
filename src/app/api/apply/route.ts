import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import {
  CURRENCY,
  DEPOSIT_AMOUNT_CENTS,
  LIST_REMAINDER_AMOUNT_CENTS,
  SEAT_CAP,
} from "@/lib/config";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const applySchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(320),
  roleTitle: z.string().min(1).max(120),
  company: z.string().max(200).optional(),
  linkedinUrl: z.string().url().max(500).optional(),
  useCase: z.string().min(1).max(2000),
  networkCode: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = applySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const networkCode = data.networkCode?.trim() || null;

  // Soft-cap policy:
  // We keep accepting applications after seats are full, but over-cap
  // applicants enter a waitlist flow (card on file via setup mode).
  const reservedCount = await prisma.attendee.count({
    where: { depositStatus: "paid" },
  });
  const soldOut = reservedCount >= SEAT_CAP;

  const remainderAmount = LIST_REMAINDER_AMOUNT_CENTS;

  const existing = await prisma.attendee.findUnique({
    where: { email: data.email },
    select: { id: true, depositStatus: true },
  });

  if (existing?.depositStatus === "paid") {
    return NextResponse.json(
      { error: "A seat is already reserved for this email." },
      { status: 409 },
    );
  }

  if (soldOut) {
    const waitlist = await prisma.waitlist.upsert({
      where: { email: data.email },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        roleTitle: data.roleTitle || null,
        company: data.company || null,
        linkedinUrl: data.linkedinUrl || null,
        useCase: data.useCase || null,
        networkCode,
        source: "apply_overcap",
        overCapReason: "seat_cap_reached",
        status: "pending",
      },
      create: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        roleTitle: data.roleTitle || null,
        company: data.company || null,
        linkedinUrl: data.linkedinUrl || null,
        useCase: data.useCase || null,
        networkCode,
        source: "apply_overcap",
        overCapReason: "seat_cap_reached",
        status: "pending",
      },
    });

    const setupSession = await stripe.checkout.sessions.create({
      mode: "setup",
      success_url: `${env.APP_URL}/apply/success?session_id={CHECKOUT_SESSION_ID}&mode=waitlist`,
      cancel_url: `${env.APP_URL}/apply?canceled=1&mode=waitlist`,
      client_reference_id: waitlist.id,
      customer_email: waitlist.email,
      metadata: {
        waitlist_id: waitlist.id,
        payment_type: "waitlist_setup",
        source: "apply_overcap",
      },
    });

    if (!setupSession.url) {
      return NextResponse.json(
        { error: "Stripe Checkout session missing redirect URL" },
        { status: 500 },
      );
    }

    await prisma.waitlist.update({
      where: { id: waitlist.id },
      data: { setupCheckoutSessionId: setupSession.id },
    });

    return NextResponse.json({
      checkoutUrl: setupSession.url,
      mode: "waitlist_setup",
      soldOut: true,
      message:
        "Current cohort is sold out. You're joining the waitlist and adding a card on file for seat-release offers.",
    });
  }

  const attendee = existing
    ? await prisma.attendee.update({
        where: { id: existing.id },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          roleTitle: data.roleTitle,
          company: data.company || null,
          linkedinUrl: data.linkedinUrl || null,
          useCase: data.useCase,
          networkCode,
          depositAmount: DEPOSIT_AMOUNT_CENTS,
          depositCurrency: CURRENCY,
          remainderAmount,
          remainderCurrency: CURRENCY,
        },
      })
    : await prisma.attendee.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          roleTitle: data.roleTitle,
          company: data.company || null,
          linkedinUrl: data.linkedinUrl || null,
          useCase: data.useCase,
          networkCode,
          depositAmount: DEPOSIT_AMOUNT_CENTS,
          depositCurrency: CURRENCY,
          remainderAmount,
          remainderCurrency: CURRENCY,
          // Defaults cover persona/application/seat status.
        },
      });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: env.STRIPE_DEPOSIT_PRICE_ID, quantity: 1 }],
    success_url: `${env.APP_URL}/apply/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.APP_URL}/apply?canceled=1`,
    client_reference_id: attendee.id,
    customer_email: attendee.email,
    metadata: {
      attendee_id: attendee.id,
      network_code: networkCode || "",
      persona: "PM_ADVANCED",
      payment_type: "deposit",
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe Checkout session missing redirect URL" },
      { status: 500 },
    );
  }

  await prisma.attendee.update({
    where: { id: attendee.id },
    data: { checkoutSessionId: session.id },
  });

  return NextResponse.json({ checkoutUrl: session.url, mode: "deposit", soldOut: false });
}
