# Phase 8 — Review

## Summary
- Shipped landing simplifications: removed hero meta tiles, simplified speakers to LinkedIn links, collapsed pricing to a single plan with trust cues.
- Implemented Stripe promo-code discounts at payment time for the remainder (no second SKU): authorize at check-in, capture later (batch + per-attendee).
- Verification:
  - `npm run lint` — pass (2026-02-09)
  - `npm run typecheck` — pass (2026-02-09)
  - `npm run build` — pass (2026-02-09)
  - `npm run test:e2e:prod` — **fail** in this sandbox (Playwright browsers not installed; requires `npx playwright install`)

## What Shipped
- Landing
  - Hero header tiles removed: `src/components/sections/Hero.tsx`
  - Speakers simplified to LinkedIn-only cards: `src/components/sections/Speakers.tsx`
  - Pricing collapsed to a single plan + trust cues: `src/components/sections/Pricing.tsx`
- Discounts / remainder ops
  - Admin remainder checkout (Checkout + promo codes + manual capture):
    - `src/app/api/admin/attendees/[id]/remainder-checkout/route.ts`
  - Admin capture/cancel:
    - `src/app/api/admin/attendees/[id]/remainder-capture/route.ts`
    - `src/app/api/admin/attendees/[id]/remainder-cancel/route.ts`
    - `src/app/api/admin/remainder-capture-all/route.ts`
  - Webhook branches deposit vs remainder by `metadata.payment_type`:
    - `src/app/api/stripe/webhook/route.ts`
  - Public redirect targets (avoid `/admin` Basic Auth):
    - `src/app/remainder/success/page.tsx`
    - `src/app/remainder/canceled/page.tsx`
  - Admin UI actions:
    - `src/components/admin/AttendeeDetail.tsx`
    - `src/components/admin/AttendeeTable.tsx`
  - Ops runbook:
    - `docs/planning/phase-8/stripe-remainder-setup.md`
- Tests updated/added
  - `z2a/landing.spec.ts`, `z2a/speakers.spec.ts` updated for UI simplifications
  - `z2a/admin.spec.ts` added tests for remainder ops UI + API calls (mocked)

## Verification

### Commands
- `npm run lint` — pass (2026-02-09 03:27 EST)
- `npm run typecheck` — pass (2026-02-09 03:27 EST)
- `npm run build` — pass (2026-02-09 03:27 EST)
- `npm run test:e2e:prod` — fail (missing Playwright browsers; install required)

### Notes
- Playwright failure is environment-related:
  - `browserType.launch: Executable doesn't exist ...`
  - Resolution: `npx playwright install`, then rerun `npm run test:e2e:prod`.

## Success Criteria → Evidence

1. Hero meta pill row removed (Deposit/Stripe/Refund/Location/Instructor/Agent Trace)
   - Evidence: `src/components/sections/Hero.tsx`
   - Status: met

2. Speakers section links directly to LinkedIn (no dialog; no bullets; no award plaque)
   - Evidence: `src/components/sections/Speakers.tsx`, `z2a/speakers.spec.ts`
   - Status: met

3. Pricing shows only one plan; trust cues are present in Pricing
   - Evidence: `src/components/sections/Pricing.tsx`
   - Status: met

4. Discount codes supported without a second discounted SKU; applied at payment time (Stripe-side)
   - Evidence: `src/app/api/admin/attendees/[id]/remainder-checkout/route.ts` (`allow_promotion_codes: true`)
   - Status: met (requires Stripe dashboard setup + `STRIPE_REMAINDER_PRICE_ID`)

5. Remainder collection (authorize-then-capture) operable
   - Evidence:
     - Webhook: `src/app/api/stripe/webhook/route.ts` (remainder authorization)
     - Admin endpoints: `src/app/api/admin/remainder-capture-all/route.ts`, `src/app/api/admin/attendees/[id]/remainder-capture/route.ts`, `src/app/api/admin/attendees/[id]/remainder-cancel/route.ts`
     - Admin UI: `src/components/admin/AttendeeDetail.tsx`, `src/components/admin/AttendeeTable.tsx`
     - Runbook: `docs/planning/phase-8/stripe-remainder-setup.md`
   - Status: met

6. QA
   - Evidence:
     - `npm run lint`, `npm run typecheck`, `npm run build` pass (above)
     - `npm run test:e2e:prod` fails only due to missing browsers
   - Status: partial (blocked in this environment)

## Plan Adherence
- Planned vs implemented deltas:
  - Remainder checkout success/cancel redirects use public `/remainder/*` pages (not `/admin/*`) to avoid Basic Auth 401s.
  - Batch capture UI is implemented in `src/components/admin/AttendeeTable.tsx` (Attendees tab banner) rather than `src/app/admin/page.tsx`.

## Risks / Rollback
- Risk: authorization expiry (manual capture window) → capture after Day 1 (same day) per runbook.
- Risk: `STRIPE_REMAINDER_PRICE_ID` unset in prod → remainder checkout endpoint returns 500; confirm env is set before event.

## Follow-ups
- Run locally:
  - `npx playwright install && npm run test:e2e:prod`
- Verify in Stripe test mode end-to-end:
  - Collect remainder via admin checkout → webhook marks `authorized` → capture-all charges.

