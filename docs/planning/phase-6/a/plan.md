# Phase 6a — Complete-Flow Spec + Environment Audit (Stripe + Funnel + Ops)

## Focus
Turn "verify Stripe and everything else" into a **concrete complete-flow spec**: exact scenarios, acceptance criteria, and a checklist that covers user + ops outcomes.

## Inputs
- Phase 5 baseline + evidence:
  - `docs/planning/phase-5/review.md`
  - `docs/planning/phase-5/stripe-cli.md`
  - `docs/planning/phase-5/playwright-cli.md`
- Core funnel code:
  - `src/app/api/apply/route.ts`
  - `src/app/api/stripe/webhook/route.ts`
  - `/apply`, `/apply/success`, `/admin`
- Existing test coverage:
  - `z2a/*.spec.ts`

## Work
1. **Validate Phase 5 artifacts exist** _(RED TEAM F5)_
   - Confirm `docs/planning/phase-5/review.md`, `stripe-cli.md`, `playwright-cli.md` exist.
   - If any are missing, generate the equivalent checklist from scratch using repo code as the source of truth (read route handlers, Playwright config, and Stripe webhook handler).
2. **Define the "complete flow"** as a numbered sequence:
   1. Landing → CTA to Apply
   2. Apply form submit → server creates Stripe Checkout session
   3. Redirect to Stripe Checkout (test mode)
   4. Successful payment → user lands on success confirmation URL
   5. Webhook received/verified → DB updates idempotently
   6. Admin can confirm attendee + payment state
3. **Acceptance criteria matrix** (must be explicit, no hand-waving):
   - Happy path:
     - No referral code
     - Valid referral/network code (if supported by the apply form)
   - User aborts:
     - Checkout cancel path (no DB corruption)
   - Webhook robustness:
     - Duplicate webhook delivery (idempotency)
     - Missing metadata → **must log an error, not silently no-op** _(RED TEAM F2)_
     - Refund event (safe handling, audit)
   - Ops/admin verification:
     - New attendee is visible in `/admin` and has the expected fields populated
     - Referral/audit surfaces remain correct after a successful checkout (if applicable)
   - Known limitations to document:
     - Seat cap enforcement is optimistic (check-then-act); acceptable for 50-seat pilot _(RED TEAM F11)_
     - `/apply/success` is a static confirmation page — does not verify payment status from Stripe _(RED TEAM F6)_
4. **Environment audit**:
   - Enumerate required env vars for local + production (source: `src/lib/env.ts` validates 8 vars via Zod).
   - Verify which values must be set in Vercel (production) vs `.env.local` (dev).
   - Verify admin auth config (basic auth) and which routes are protected (source: `src/middleware.ts` protects `/admin/*` and `/api/admin/*`).
5. **Define what we can automate vs manual**:
   - What's feasible in Playwright (UI flows + mocked apply API)
   - What must be verified via Stripe CLI / Stripe dashboard (real Checkout)
   - What to verify through admin UI vs direct DB query
   - **Define "production-safe" Playwright tests** _(RED TEAM F7)_: only `landing.spec.ts`, `speakers.spec.ts`, and `reduced-motion.spec.ts` are safe against a live server. Tests using `page.route()` mocks (`apply.spec.ts`) or expecting specific 401 behavior (`admin-auth.spec.ts`) must be excluded from production runs.

## Output
Created: `docs/planning/phase-6/complete-flow-checklist.md`

## Handoff
Phase 6b should:
- Turn the checklist into repeatable smokes:
  - update Stripe CLI runbook for “complete flow” and clarify what’s local-only vs production
  - add production-safe Playwright subset (tag/grep or a script)
- Implement missing-metadata logging in `src/app/api/stripe/webhook/route.ts`.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Validated Phase 5 runbooks exist and extracted the relevant verification steps.
  - Wrote the Phase 6 complete-flow checklist with: env preflight, happy path, cancel path, refund handling, and Playwright local vs production-safe classification.
- Commands run:
  - `sed -n '1,220p' src/lib/env.ts` — PASS (confirmed 8 required env vars)
  - `sed -n '1,220p' src/middleware.ts` — PASS (confirmed admin auth protection on `/admin/*` and `/api/admin/*`)
  - `sed -n '1,260p' src/app/api/apply/route.ts` — PASS (confirmed Checkout session metadata includes `attendee_id`)
  - `sed -n '1,260p' src/app/api/stripe/webhook/route.ts` — PASS (confirmed idempotency via `StripeEvent` insert + `P2002` handling)
- Blockers:
  - None
- Next concrete steps:
  - Execute Phase 6b (Stripe smokes + prod-safe Playwright subset + missing-metadata logging).
