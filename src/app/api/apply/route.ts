import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import {
  CURRENCY,
  DEPOSIT_AMOUNT_CENTS,
  LIST_REMAINDER_AMOUNT_CENTS,
  NETWORK_REMAINDER_AMOUNT_CENTS,
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

  // Seat cap: enforce at the moment we create a deposit checkout session.
  const reservedCount = await prisma.attendee.count({
    where: { depositStatus: "paid" },
  });
  if (reservedCount >= SEAT_CAP) {
    return NextResponse.json({ error: "Sold out" }, { status: 409 });
  }

  const networkCodeValid = networkCode
    ? Boolean(
        await prisma.referralCode.findFirst({
          where: { code: networkCode, active: true, type: "network" },
          select: { id: true },
        }),
      )
    : false;

  const remainderAmount = networkCodeValid
    ? NETWORK_REMAINDER_AMOUNT_CENTS
    : LIST_REMAINDER_AMOUNT_CENTS;

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

  return NextResponse.json({ checkoutUrl: session.url });
}

