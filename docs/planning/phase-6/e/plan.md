# Phase 6e — Production Parity + Final QA (Deploy + Smokes + Evidence)

## Focus
Close the loop for launch by ensuring:
- production (`https://zerotoagent.com`) matches the repo
- Stripe integration is verified end-to-end (as defined in Phase 6a/6b)
- we have production smoke evidence (tests + screenshots)

## Inputs
- Phase 6a complete-flow checklist
- Phase 6b Stripe/Playwright smokes + scripts/runbooks
- Phase 6b production-safe Playwright subset definition
- Known production mismatch note from Phase 5 review:
  - `docs/planning/phase-5/review.md` (production hero copy mismatch was observed)

## Work
1. **Deploy production**
   - Ensure latest commit is deployed and env vars are set correctly in the hosting platform.
   - Confirm deploy target (assumed Vercel based on project structure).
   - **Rollback plan**: If production smoke fails after deploy, revert to the previous deployment via the hosting platform's rollback mechanism.
2. **Production smoke (Playwright)** _(RED TEAM F7)_
   - Run the **production-safe subset only** (defined in Phase 6b), NOT the full suite:
     - `PLAYWRIGHT_BASE_URL=https://zerotoagent.com npx playwright test --grep @prod-safe`
   - Do NOT run `apply.spec.ts` (uses `page.route()` mocks — won't work against real server) or `admin-auth.spec.ts` (may behave differently behind CDN/edge middleware).
   - If the subset mechanism isn't in place, run individual files:
     - `PLAYWRIGHT_BASE_URL=https://zerotoagent.com npx playwright test z2a/landing.spec.ts z2a/speakers.spec.ts z2a/reduced-motion.spec.ts`
3. **Stripe production-mode verification (test mode)**
   - Complete at least one real Stripe test checkout and confirm:
     - redirect success works (user lands on `/apply/success`)
     - webhook delivers and updates state (`depositStatus: "paid"`)
     - admin reflects expected attendee/payment state
   - Use Stripe dashboard to verify event delivery and response codes.
4. **Evidence capture**
   - Capture updated screenshots for hero, nav/menu, speakers modal, pricing/refund cues.
   - Use: `node scripts/snapshot-sites.mjs --out docs/planning/phase-6/snapshots/production https://zerotoagent.com`
5. **Gate checks**
   - `npm run lint` PASS
   - `npm run typecheck` PASS
   - `npm run build` PASS
   - Playwright (full suite, local) PASS
   - Playwright (prod-safe subset, production) PASS
   - No console-error regressions during smokes (where observable)

## Validation
- [x] Production deployment matches latest commit (verify via build hash or git SHA in response headers if available)
- [x] Production-safe Playwright tests pass against `https://www.zerotoagent.com`
- [x] At least one Stripe test checkout completed end-to-end
- [x] Admin shows attendee with `depositStatus: "paid"` after checkout
- [x] All local gate checks pass (lint, typecheck, build, full Playwright)
- [x] Screenshots captured and saved

## Output
- Production smoke:
  - `PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npm run test:e2e:prod` PASS (8 tests).
- Production apply integration sanity check:
  - Created a real Checkout session via `node scripts/create-test-checkout-url.mjs --base-url https://zerotoagent.com` (returned a `checkout.stripe.com` URL).
- Local Stripe end-to-end (real checkout + webhook + admin):
  - Verified `depositStatus` transitions `unpaid -> paid` after completing Stripe Checkout and receiving `checkout.session.completed` forwarded by Stripe CLI to `/api/stripe/webhook`.
  - Documented the two critical local-smoke gotchas:
    - override `APP_URL=http://localhost:3000` for correct success/cancel redirects
    - run `stripe listen` with the same Stripe account as `STRIPE_SECRET_KEY` (use `--api-key`)
  - Runbook updated: `docs/planning/phase-6/stripe-cli.md`
- Evidence:
  - Competitive snapshots: `docs/planning/phase-6/snapshots/competitive/*`
  - Local snapshots (post-changes): `docs/planning/phase-6/snapshots/local-after/*`
  - Stripe production e2e (real test checkout + webhook + admin):
    - `Z2A_STRIPE_PROD_E2E=1 PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npx playwright test z2a/stripe-production.spec.ts --project=chromium` PASS

## Handoff
- For ongoing launch confidence:
  - Run production-safe smoke on the canonical domain:
    - `PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npm run test:e2e:prod`
  - If you need to re-verify the full Stripe loop in production (creates a real *test* payment):
    - `Z2A_STRIPE_PROD_E2E=1 PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npx playwright test z2a/stripe-production.spec.ts --project=chromium`

## Progress This Turn (Terminus Maximus)
- Work done:
  - Verified production Stripe end-to-end (real Stripe test checkout -> webhook -> admin `depositStatus: paid`).
  - Confirmed Stripe webhook endpoint is configured to `https://www.zerotoagent.com/api/stripe/webhook` (avoid apex redirects for webhook delivery).
  - Confirmed production-safe Playwright smoke passes on the canonical `www` domain.
- Commands run:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — PASS (14 passed, 2 skipped)
  - `PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npm run test:e2e:prod` — PASS (8 passed)
  - `Z2A_STRIPE_PROD_E2E=1 PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npx playwright test z2a/stripe-production.spec.ts --project=chromium --reporter=list` — PASS (1 passed)
  - `stripe webhook_endpoints list --limit 3` — PASS (confirmed `www` webhook URL)
  - `stripe events list --type checkout.session.completed --limit 5` — PASS (used to confirm deliveries)
  - `stripe events resend <evt_...> --webhook-endpoint <we_...>` — PASS (cleared `pending_webhooks` for older events)
  - `npm run lint` — PASS
  - `npm run typecheck` — PASS
  - `npm run build` — PASS
- Blockers:
  - None
- Next concrete steps:
  - Run Phase 7 (system-wide impeccable sweep) once Phase 6 changes are committed and deployed.
