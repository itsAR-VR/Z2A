import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { EARLY_BIRD_END_AT_ISO, EARLY_BIRD_REMAINDER_AMOUNT_CENTS } from "@/lib/config";
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

  // Idempotency + reliability:
  //
  // Stripe will retry deliveries on 5xx/timeouts. We want duplicates to be safe
  // AND we want retries to be able to re-attempt side effects if we fail mid-way.
  // Use a transaction so `StripeEvent` creation and side effects are atomic.
  try {
    await prisma.$transaction(async (tx) => {
      await tx.stripeEvent.create({
        data: { stripeEventId: event.id, eventType: event.type },
      });

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const attendeeId = session.metadata?.attendee_id || session.client_reference_id;

          if (!attendeeId) {
            // No-op, but log for debugging so we can fix checkout metadata quickly.
            console.error("[stripe-webhook] Missing attendee reference on checkout.session.completed", {
              eventId: event.id,
              sessionId: session.id,
            });
            break;
          }

          if (!session.metadata?.attendee_id) {
            console.error(
              "[stripe-webhook] checkout.session.completed missing metadata.attendee_id; using client_reference_id",
              { eventId: event.id, sessionId: session.id },
            );
          }

          const paymentType = session.metadata?.payment_type || "";

          if (paymentType === "remainder") {
            const paymentIntentId = getPaymentIntentId(session.payment_intent);
            if (!paymentIntentId) {
              console.error(
                "[stripe-webhook] Missing payment_intent on remainder checkout.session.completed",
                { eventId: event.id, sessionId: session.id, attendeeId },
              );
              break;
            }

            const amountTotal =
              typeof session.amount_total === "number" ? session.amount_total : null;
            const currency = typeof session.currency === "string" ? session.currency : null;

            const updated = await tx.attendee.updateMany({
              where: { id: attendeeId },
              data: {
                remainderStatus: "authorized",
                remainderPaymentIntentId: paymentIntentId,
                remainderAuthorizedAt: new Date(),
                ...(amountTotal !== null ? { remainderAmount: amountTotal } : {}),
                ...(currency ? { remainderCurrency: currency } : {}),
              },
            });

            if (updated.count === 0) {
              console.error("[stripe-webhook] Attendee not found for remainder checkout", {
                eventId: event.id,
                sessionId: session.id,
                attendeeId,
              });
            }

            break;
          }

          const updated = await tx.attendee.updateMany({
            where: { id: attendeeId },
            data: {
              depositStatus: "paid",
              checkoutSessionId: session.id,
              depositPaymentIntentId: getPaymentIntentId(session.payment_intent),
            },
          });

          if (updated.count === 0) {
            console.error("[stripe-webhook] Attendee not found for checkout.session.completed", {
              eventId: event.id,
              sessionId: session.id,
              attendeeId,
            });
          }

          // Lock-in Early Bird eligibility at deposit payment time.
          //
          // IMPORTANT: use the webhook event creation timestamp (not the Checkout session creation time)
          // to avoid “create session before deadline, pay after deadline” loopholes.
          const earlyBirdCutoffMs = Date.parse(EARLY_BIRD_END_AT_ISO);
          const isEarlyBird =
            Number.isFinite(earlyBirdCutoffMs) &&
            event.created * 1000 <= earlyBirdCutoffMs;

          if (isEarlyBird) {
            await tx.attendee.updateMany({
              where: { id: attendeeId, remainderStatus: "none" },
              data: { remainderAmount: EARLY_BIRD_REMAINDER_AMOUNT_CENTS },
            });
          }

          break;
        }

        case "charge.refunded": {
          const charge = event.data.object as Stripe.Charge;
          const paymentIntentId = getPaymentIntentId(charge.payment_intent);
          if (!paymentIntentId) break;

          await tx.attendee.updateMany({
            where: { depositPaymentIntentId: paymentIntentId },
            data: { depositStatus: "refunded" },
          });
          await tx.attendee.updateMany({
            where: { remainderPaymentIntentId: paymentIntentId },
            data: { remainderStatus: "refunded" },
          });
          break;
        }

        default: {
          // Ignore unhandled event types for now.
          break;
        }
      }
    });
  } catch (err) {
    const code =
      typeof err === "object" && err && "code" in err
        ? (err as { code?: unknown }).code
        : null;
    if (code === "P2002") {
      // Duplicate event delivery.
      return NextResponse.json({ received: true });
    }
    throw err;
  }

  return NextResponse.json({ received: true });
}
