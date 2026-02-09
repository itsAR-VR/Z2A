# Phase 6 — Complete Flow Checklist (Landing → Apply → Stripe → Webhook → Admin)

This is the minimum set of checks to confirm the platform works end-to-end.

## Preflight (Local)
- [ ] `.env.local` contains the required vars validated by `src/lib/env.ts`:
  - `APP_URL` (example: `http://localhost:3000`)
  - `STRIPE_SECRET_KEY` (test mode for local)
  - `STRIPE_WEBHOOK_SECRET` (from `stripe listen`)
  - `STRIPE_DEPOSIT_PRICE_ID` (must belong to the same Stripe mode as `STRIPE_SECRET_KEY`)
  - `DATABASE_URL`, `DIRECT_URL`
  - `ADMIN_BASIC_AUTH_USER` and one of:
    - `ADMIN_BASIC_AUTH_PASS` (preferred)
    - `ADMIN_BASIC_AUTH_PASSWORD` (accepted)
- [ ] Playwright browsers installed: `npx playwright install`
- [ ] Stripe CLI installed + logged in: `stripe login`

## Complete Flow — Happy Path (Local, Real Checkout)
1. Start dev server:
   - `APP_URL=http://localhost:3000 npm run dev:webpack`
2. Start webhook forwarder (keep running):
   - `stripe listen --events checkout.session.completed,charge.refunded --forward-to localhost:3000/api/stripe/webhook`
   - Copy the printed `whsec_...` value into `STRIPE_WEBHOOK_SECRET` in `.env.local` (must match for signature verification).
   - If your Stripe CLI is using a different Stripe account than `STRIPE_SECRET_KEY`, pass `--api-key "$STRIPE_SECRET_KEY"` (see `docs/planning/phase-6/stripe-cli.md`).
3. Submit an application:
   - Go to `http://localhost:3000/apply`
   - Fill required fields, submit
   - Confirm you are redirected to Stripe Checkout
4. Complete the test payment (Stripe hosted checkout).
5. Confirm user-facing completion:
   - You land on `/apply/success` (success URL uses `APP_URL`).
6. Confirm webhook delivery:
   - In the `stripe listen` terminal: see `[200] POST http://localhost:3000/api/stripe/webhook` for `checkout.session.completed`.
7. Confirm ops visibility:
   - Visit `http://localhost:3000/admin`
   - Find the attendee; confirm:
     - `depositStatus` shows `paid`
     - the attendee details match the application (name/email/use case)

## Idempotency (Same Event Delivered Twice)
**Why:** Stripe will retry webhook deliveries. Our handler must tolerate receiving the exact same `evt_...` more than once.

Recommended (production, reliable):
1. In Stripe Dashboard (test mode), pick a real `checkout.session.completed` event and use **Resend** to the production webhook endpoint.
2. Expected:
   - Webhook returns `2xx`
   - DB does not duplicate the `StripeEvent` record for the same event id
   - Attendee state remains `depositStatus: paid`

Optional (local, if you can target the CLI endpoint):
1. Run `stripe webhook_endpoints list` and find the endpoint created by Stripe CLI (often labeled “Stripe CLI”).
2. Use `stripe events resend evt_... --webhook-endpoint we_...` and watch `stripe listen` forward it to your local app.

## Refund Handling (Representative Event)
1. Trigger a refund event (CLI fixture):
   - `stripe trigger charge.refunded`
2. Expected:
   - Webhook returns `200`
   - If the refund charge maps to an attendee’s `depositPaymentIntentId`, their `depositStatus` becomes `refunded`
   - If it doesn’t map (fixture mismatch), handler should be a safe no-op (still 200)

## Cancel Path (User Aborts Checkout)
1. From `/apply`, submit application and reach Stripe Checkout.
2. Cancel/close checkout and return.
3. Expected:
   - You land on `/apply?canceled=1`
   - Copy communicates “application is saved” (it is saved server-side when the checkout session is created)
   - Attendee exists in admin but `depositStatus` remains `unpaid` until webhook completion

## Playwright Classification (Local vs Production-Safe)
Local-only (requires Playwright webServer + mocks):
- `z2a/apply.spec.ts` (mocks `/api/apply`)

Production-safe (read-only assertions against a live site):
- `z2a/landing.spec.ts`
- `z2a/speakers.spec.ts`
- `z2a/reduced-motion.spec.ts`

Suggested commands:
- Local: `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e`
- Production-safe subset:
  - `PLAYWRIGHT_BASE_URL=https://zerotoagent.com npm run test:e2e:prod`

## Known Limitations (Documented, Acceptable for Pilot)
- Seat cap enforcement is “check-then-act” (`/api/apply` counts `depositStatus: paid`). For a 50-seat pilot, this is acceptable; if it becomes an issue, we’ll need a transactional reservation primitive.
- `/apply/success` is a static confirmation page. It does not verify `session_id` against Stripe. The source of truth is webhook + admin.
