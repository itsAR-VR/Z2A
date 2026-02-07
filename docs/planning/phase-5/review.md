# Phase 5 Review — QA + Launch Readiness (2026-02-07)

## Go / No-Go
**Go** for deploy from an engineering-gates standpoint:
- `npm run lint` / `npm run typecheck` / `npm run build` all pass.
- Playwright CLI smoke passes against a local server.
- Stripe webhook smoke passes (Stripe CLI forward + triggers, 200 responses).

## Engineering Quality Gates

- `npm run lint` — **PASS**
- `npm run typecheck` — **PASS**
- `npm run build` — **PASS** (`next build`)

Build notes:
- Next.js warns that the `middleware` convention is deprecated in favor of `proxy`. Not addressed in this pass.
- `next.config.ts` sets `turbopack.root` to avoid workspace root inference issues when multiple lockfiles exist outside this repo.
- If you run into Turbopack-specific issues in your environment, the repo includes explicit webpack fallbacks:
  - `npm run dev:webpack`
  - `npm run build:webpack`

## UI Requirements Check

- Anchored IA present in `src/app/page.tsx`:
  - `#why` → `#speakers` → `#outcomes` → `#how` → `#agenda` → `#pricing` → `#faq` → `#apply`
- TKS-inspired urgency motif:
  - Sticky bottom “Admissions open” apply bar (`src/components/StickyApplyBar.tsx`)
- Speakers are now clickable with an accessible modal:
  - `src/components/sections/Speakers.tsx`
  - `src/components/Dialog.tsx`
  - `src/components/SpeakerAvatar.tsx`
- Referral code toggle reason semantics aligned across server/UI/docs:
  - Reason **required only for deactivation**, optional for activation/reactivation
  - `src/app/api/admin/referral-codes/[id]/route.ts`
  - `src/components/admin/ReferralCodeTable.tsx`
  - `docs/planning/phase-4/b/plan.md`
  - `docs/planning/phase-5/handoff.md`

## Playwright / Screenshot Evidence

Competitive reference screenshots (already captured on disk):
- `refunnel.com`: `.playwright/competitive/2026-02-06/refunnel-*.png`
- `tks.world`: `.playwright/competitive/2026-02-06/tks-*.png`
- `zerotoagent.com`: `.playwright/competitive/2026-02-06/zerotoagent-*.png`
- Updated set (after Phase 5 polish work):
  - `.playwright/competitive/2026-02-07/*`

Competitive compare notes (principles only, no cloning):
- Refunnel: airy layout, pill navigation, soft gradients, typographic polish.
- TKS: bold “admissions are live” urgency motifs and strong editorial hierarchy.
- Z2A direction in code: light-first tinted neutrals, asymmetric hero with a “what you leave with” module, admissions-live badge + ticker, and consistent reveal language with reduced-motion compliance.

Local Playwright smoke:
- One-time prerequisite: `npx playwright install`
- `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — **PASS** (14/14)
- `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- --repeat-each=3` — **PASS** (42/42)

Notes:
- `playwright.config.ts` now enforces that `PLAYWRIGHT_WEB_SERVER=1` must use a `localhost` base URL (prevents accidentally running the suite against production).
- The Playwright webServer command uses `npm run dev:webpack` for determinism in nested workspaces.

Production note (as of 2026-02-07):
- `PLAYWRIGHT_BASE_URL=https://zerotoagent.com npx playwright test z2a/landing.spec.ts` — **FAIL**
  - The deployed hero copy differs from the current codebase, indicating production is not yet running the latest UI.

## Stripe CLI Smoke

Stripe webhook smoke (local):
- `stripe listen --events checkout.session.completed,charge.refunded --forward-to http://localhost:3000/api/stripe/webhook`
- `stripe trigger checkout.session.completed` — forwarded, webhook responded **200**
- `stripe trigger charge.refunded` — forwarded, webhook responded **200**

This validates signature verification (when `STRIPE_WEBHOOK_SECRET` is set to the `whsec_...` printed by `stripe listen`) and basic handler correctness.

Runbook: `docs/planning/phase-5/stripe-cli.md`

## Open Items (Non-Blocking)

- Speaker headshots:
  - Added at:
    - `public/speakers/aadil-headshot.jpg`
    - `public/speakers/abdur-headshot.jpg`
- Award plaque:
  - Added at `public/speakers/openai-award-plaque.jpeg` and displayed in Abdur Sajid’s speaker modal.
- LinkedIn-derived bios:
  - Automated retrieval is blocked here; current copy is based on repo content + provided constraints.
