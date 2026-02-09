# Phase 6b — Stripe End-to-End Smokes (Scripts/Runbooks + Playwright Coverage)

## Focus
Make Stripe verification **repeatable** and closer to a "complete flow":
- keep Playwright fast and deterministic
- use Stripe CLI for webhook + event realism
- document exactly how to confirm outcomes in admin/UI

## Inputs
- Phase 6a checklist + acceptance matrix
- Existing Stripe smoke runbook:
  - `docs/planning/phase-5/stripe-cli.md` (if exists; otherwise use Phase 6a-generated equivalent)
- Existing E2E tests:
  - `z2a/apply.spec.ts`
  - `z2a/admin-auth.spec.ts`
  - `z2a/landing.spec.ts`

## Work
1. **Harden the Stripe smoke runbook into "E2E-ish"**:
   - Cover both:
     - checkout completion event
     - at least one refund-related event
   - Include explicit "expected outcomes" (what DB/admin should show).
2. **Add missing-metadata error logging** _(RED TEAM F2)_:
   - In `src/app/api/stripe/webhook/route.ts`, the `checkout.session.completed` handler silently breaks when `attendee_id` is missing from metadata (line 56-58).
   - Add a `console.error` with the session ID and event ID so ops can detect and investigate corrupted checkouts.
   - Smoke runbook should include a "missing metadata" test: trigger a checkout.session.completed with no `attendee_id` metadata, verify the server returns 200 but logs an error.
3. **Automate what we can safely automate**:
   - Add a `scripts/` helper (or `npm run smoke:*` scripts) to reduce manual steps.
   - Ensure we never print/store secrets in repo output.
4. **Playwright coverage upgrades (where feasible)**:
   - Keep the existing mocked `/api/apply` redirect test (stable).
   - Add lightweight assertions that the apply form collects expected fields and produces the expected request payload shape.
   - **Define and tag a production-safe smoke subset** _(RED TEAM F7)_:
     - Production-safe: `landing.spec.ts`, `speakers.spec.ts`, `reduced-motion.spec.ts`
     - Local-only: `apply.spec.ts` (uses `page.route()` mocks), `admin-auth.spec.ts` (expects specific 401 behavior)
     - Implementation options: separate Playwright project named `prod-smoke`, or a `@prod-safe` tag/grep pattern in test descriptions.
     - Command: `PLAYWRIGHT_BASE_URL=https://zerotoagent.com npx playwright test --grep @prod-safe`
5. **Webhook + idempotency confidence**:
   - Ensure smokes include a "duplicate delivery" step (trigger same event twice or replay).
   - Confirm handler responds 2xx and does not double-apply state.

## Validation
- [ ] Stripe CLI runbook executes without errors locally
- [ ] `npm run test:e2e` passes locally (all 5 spec files)
- [ ] Production-safe subset passes against `https://zerotoagent.com` (if deployed)
- [ ] Missing-metadata scenario logged (not silently dropped)
- [ ] Duplicate webhook delivery returns 200 without DB mutation

## Output
Implemented:
- Stripe webhook reliability + missing-metadata logging:
  - `src/app/api/stripe/webhook/route.ts`
  - Changes:
    - Side effects + `StripeEvent` insert are now atomic via a Prisma transaction
    - `checkout.session.completed` falls back to `client_reference_id` when metadata is missing and logs errors for missing/invalid references
- Production-safe Playwright subset:
  - Added `@prod-safe` tag to:
    - `z2a/landing.spec.ts`
    - `z2a/speakers.spec.ts`
    - `z2a/reduced-motion.spec.ts`
  - Added script: `npm run test:e2e:prod` (`package.json`)
- Apply request payload assertion (deterministic contract check):
  - `z2a/apply.spec.ts`
- New runbooks/scripts:
  - `docs/planning/phase-6/stripe-cli.md`
  - `scripts/create-test-checkout-url.mjs`

## Handoff
Phase 6c should focus on Nav/menu polish. After Nav changes:
- Re-run: `npm run lint`, `npm run typecheck`, `npm run build`
- Re-run: `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e`
- If the Nav change is non-trivial, capture before/after snapshots with `scripts/snapshot-sites.mjs`.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Hardened Stripe webhook handling (transaction + logging + safer attendee update semantics).
  - Added a production-safe Playwright smoke subset and a dedicated npm script.
  - Tightened Apply test by asserting the `/api/apply` payload contract.
  - Added a small helper script to generate a real Checkout URL via `/api/apply`.
  - Wrote a Phase 6 Stripe runbook aligned to complete-flow verification.
- Commands run:
  - `npm run lint` — PASS
  - `npm run typecheck` — PASS
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — PASS (14/14)
- Blockers:
  - None (production smoke to be executed in Phase 6e after deploy).
- Next concrete steps:
  - Execute Phase 6c (Nav/menu refinement to push closer to TKS-style structure + micro-interactions).

## Handoff
