# Phase 3j — Stripe Webhooks + Idempotency

## Focus
Implement Stripe webhook verification and idempotent state transitions for deposit payments and refunds.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/funnel-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/qa-deploy-checklist.md`

## Work
1. Implement webhook endpoint:
   - verify signature using `STRIPE_WEBHOOK_SECRET`
   - store Stripe `event.id` for dedupe
2. Handle:
   - `checkout.session.completed` → mark deposit paid, store IDs
   - `charge.refunded` (or `payment_intent.refunded`) → mark deposit refunded
3. Ensure duplicate deliveries are safe (no duplicate attendee updates).

## Output
- Implemented webhook handler + idempotency foundation:
  - `src/app/api/stripe/webhook/route.ts`
  - `stripe_events` table in Prisma schema (unique on `stripe_event_id`)
  - Event handling implemented:
    - `checkout.session.completed` → marks deposit as paid
    - `charge.refunded` → marks deposit as refunded

## Handoff
Proceed to Phase 3k (admin) and Phase 3l (Stripe CLI + Playwright validation).

## Validation (RED TEAM)
- Stripe CLI can trigger events and DB state updates accordingly.
- Replaying the same event does not change state a second time.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented Stripe webhook verification and idempotency storage.
- Commands run:
  - `npm run build` — pass
  - `npm run db:push` — pass
- Blockers:
  - Stripe CLI trigger validation not executed yet (deferred).
- Next concrete steps:
  - Run Stripe CLI `checkout.session.completed` and `charge.refunded` smoke tests per `docs/phase-3/qa-deploy-checklist.md`.
