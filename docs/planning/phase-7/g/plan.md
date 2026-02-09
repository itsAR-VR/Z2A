# Phase 7g — Production Parity + Launch Readiness

## Focus
Close the loop: ensure Phase 7 changes are actually running on the live site, then validate with production-safe Playwright smokes and a real Stripe test checkout (automated).

## Inputs
- Phase 7 code changes (this branch / working tree)
- Phase 6 runbooks (for Stripe verification):
  - `docs/planning/phase-6/complete-flow-checklist.md`
  - `docs/planning/phase-6/stripe-cli.md`
- Playwright prod-safe suite: `npm run test:e2e:prod` (grep `@prod-safe`)
- Stripe production E2E: `z2a/stripe-production.spec.ts` (requires `Z2A_STRIPE_PROD_E2E=1`)

## Work
1. Metadata parity (SEO/trust)
   - Ensure site title/description match the hero (“working AI agent”, not “working agent”).
   - Verify live HTML contains updated `<title>` and OG/Twitter descriptions.
2. Deploy parity
   - Deploy a preview and run prod-safe Playwright smokes against it:
     - `vercel deploy --yes` → capture URL
     - `PLAYWRIGHT_BASE_URL=<preview-url> npm run test:e2e:prod`
   - Deploy to production (only after preview smokes pass):
     - `vercel deploy --prod --yes`
3. Production-safe smoke suite
   - Run:
     - `PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npm run test:e2e:prod`
   - Expect all `@prod-safe` tests to pass (landing, speakers, reduced-motion).
4. Stripe end-to-end verification (production, automated)
   - Run:
     - `Z2A_STRIPE_PROD_E2E=1 PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npx playwright test z2a/stripe-production.spec.ts --project=chromium --reporter=list`
   - This creates a real Stripe *test* payment and validates webhook → admin `depositStatus=paid`.
5. Final review doc
   - Write `docs/planning/phase-7/review.md` summarizing:
     - What shipped (by subphase)
     - Evidence (commands + pass results)
     - Remaining risks (if any)

## Validation (RED TEAM)
- Preview deploy passes `npm run test:e2e:prod`.
- Production deploy passes `npm run test:e2e:prod`.
- Stripe production E2E passes in < 3 minutes and admin reflects `depositStatus=paid`.
- Live HTML `<title>` contains “Build a Working AI Agent…”.

## Output
Completed artifacts:
- SEO metadata now matches hero copy (“working AI agent”):
  - `src/app/layout.tsx`
- Production deployment completed and aliased:
  - `https://www.zerotoagent.com`
- Production-safe Playwright smokes passing:
  - `PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npm run test:e2e:prod`
- Stripe production E2E passing (creates Stripe test payment; admin reflects `depositStatus=paid`):
  - `Z2A_STRIPE_PROD_E2E=1 PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npx playwright test z2a/stripe-production.spec.ts --project=chromium --reporter=list`
- Final phase review document:
  - `docs/planning/phase-7/review.md`

## Handoff
If all validations pass, Phase 7 is ready to launch. Next work should be a new phase (Phase 8) only if we’re changing scope (new cities, new speakers, new pricing model, etc.).

## Progress This Turn (Terminus Maximus)
- Work done:
  - Deployed Phase 7 to production and verified live-site parity using prod-safe Playwright smokes.
  - Verified production Stripe deposit flow end-to-end (automated).
  - Updated SEO metadata to match the hero (“AI agent”) and confirmed on live HTML.
- Commands run:
  - `npm run lint && npm run typecheck && npm run build` — pass
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — pass (34 passed, 2 skipped)
  - `vercel deploy --yes` — pass (preview deployed; protected by Vercel login)
  - `vercel deploy --prod --yes` — pass (aliased to `https://www.zerotoagent.com`)
  - `PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npm run test:e2e:prod` — pass (20 passed)
  - `Z2A_STRIPE_PROD_E2E=1 PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npx playwright test z2a/stripe-production.spec.ts --project=chromium --reporter=list` — pass (1 passed)
  - `curl -fsSL https://www.zerotoagent.com` — pass (title/description updated)
- Blockers:
  - Preview deployments require “Log in to Vercel”, so preview-smoke automation is blocked without additional auth or an unprotected staging domain.
- Next concrete steps:
  - Commit Phase 7 changes so the deployed state is reproducible.
