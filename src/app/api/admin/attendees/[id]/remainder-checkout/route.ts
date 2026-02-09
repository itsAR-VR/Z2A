import { NextResponse } from "next/server";

import { EARLY_BIRD_REMAINDER_AMOUNT_CENTS } from "@/lib/config";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!env.STRIPE_REMAINDER_PRICE_ID) {
    return NextResponse.json(
      { error: "STRIPE_REMAINDER_PRICE_ID is not configured" },
      { status: 500 },
    );
  }

  const attendee = await prisma.attendee.findUnique({ where: { id } });
  if (!attendee) {
    return NextResponse.json({ error: "Attendee not found" }, { status: 404 });
  }

  if (attendee.depositStatus !== "paid") {
    return NextResponse.json(
      { error: "Cannot collect remainder before deposit is paid" },
      { status: 409 },
    );
  }

  if (attendee.remainderStatus !== "none") {
    return NextResponse.json(
      { error: "Remainder is already authorized or processed" },
      { status: 409 },
    );
  }

  const isEarlyBird = attendee.remainderAmount === EARLY_BIRD_REMAINDER_AMOUNT_CENTS;
  if (isEarlyBird && !env.STRIPE_EARLY_BIRD_COUPON_ID) {
    return NextResponse.json(
      { error: "STRIPE_EARLY_BIRD_COUPON_ID is not configured" },
      { status: 500 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: env.STRIPE_REMAINDER_PRICE_ID, quantity: 1 }],
    ...(isEarlyBird
      ? {
          discounts: [{ coupon: env.STRIPE_EARLY_BIRD_COUPON_ID! }],
          allow_promotion_codes: false,
        }
      : { allow_promotion_codes: true }),
    payment_intent_data: {
      capture_method: "manual",
    },
    success_url: `${env.APP_URL}/remainder/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.APP_URL}/remainder/canceled`,
    client_reference_id: attendee.id,
    customer_email: attendee.email,
    metadata: {
      attendee_id: attendee.id,
      payment_type: "remainder",
      referral_code: attendee.networkCode || "",
      pricing_tier: isEarlyBird ? "early_bird" : "standard",
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe Checkout session missing redirect URL" },
      { status: 500 },
    );
  }

  return NextResponse.json({ checkoutUrl: session.url });
}
