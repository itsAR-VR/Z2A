import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

function getPaymentIntentId(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "id" in value && typeof value.id === "string") {
    return value.id;
  }
  return null;
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Invalid signature: ${message}` }, { status: 400 });
  }

  // Idempotency: Stripe will retry; duplicates must be safe.
  try {
    await prisma.stripeEvent.create({
      data: { stripeEventId: event.id, eventType: event.type },
    });
  } catch (err) {
    const code =
      typeof err === "object" && err && "code" in err
        ? (err as { code?: unknown }).code
        : null;
    if (code === "P2002") {
      return NextResponse.json({ received: true });
    }
    throw err;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const attendeeId = session.metadata?.attendee_id;

      if (!attendeeId) {
        break;
      }

      await prisma.attendee.update({
        where: { id: attendeeId },
        data: {
          depositStatus: "paid",
          checkoutSessionId: session.id,
          depositPaymentIntentId: getPaymentIntentId(session.payment_intent),
        },
      });

      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId = getPaymentIntentId(charge.payment_intent);
      if (!paymentIntentId) break;

      await prisma.attendee.updateMany({
        where: { depositPaymentIntentId: paymentIntentId },
        data: { depositStatus: "refunded" },
      });
      break;
    }

    default: {
      // Ignore unhandled event types for now.
      break;
    }
  }

  return NextResponse.json({ received: true });
}
