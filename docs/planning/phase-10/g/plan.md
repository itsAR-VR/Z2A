# Phase 10g — Execution (Consumer Repositioning + Jam Fixes)

## Focus
Implement the approved Phase 10 checklist in product code with minimal, reversible changes, preserving Phase 8/9 behavior while resolving the Jam-reported copy and confidence friction.

## Inputs
- `docs/planning/phase-10/e/implementation-checklist.md`
- `docs/planning/phase-10/b/terminology.md`
- `docs/planning/phase-10/b/copy-spec.md`
- `docs/planning/phase-10/c/critique-report.md`
- Overlap-sensitive files from prior phases:
  - `src/components/sections/Hero.tsx`
  - `src/components/Nav.tsx`
  - `src/components/sections/Pricing.tsx`
  - `z2a/landing.spec.ts`
  - `z2a/reduced-motion.spec.ts`

## Work
1. Add a lightweight analytics baseline for page views + CTA clicks + apply start + success signal.
2. Apply canonical status terminology (`Applications open now`) across Hero/Nav/Sticky.
3. Improve mobile menu transition feel (without regressing reduced-motion behavior).
4. Add immediate CTA feedback state (`Redirecting...` + disabled) for Hero/Pricing/CTAFooter/Sticky.
5. Apply consumer-clarity copy updates across Why/Outcomes/HowItWorks/Pricing/Apply metadata.
6. Implement desktop trust fixes (speaker card proof hierarchy + pre-FAQ confidence strip + FAQ reorder).
7. Update Playwright text assertions impacted by copy updates.
8. Run quality gates (`npm run lint`, `npm run typecheck`, `npm run build`) and record results.

## Output
- Implemented instrumentation baseline:
  - Added lightweight analytics client helper:
    - `src/lib/analytics.ts`
  - Added analytics ingestion endpoint:
    - `src/app/api/analytics/route.ts`
  - Added automatic route-level page-view tracking in layout:
    - `src/components/analytics/PageViewTracker.tsx`
    - `src/app/layout.tsx`
  - Added apply funnel events:
    - apply form start event on first form focus (`src/app/apply/page.tsx`)
    - submit click event (`src/app/apply/page.tsx`)
    - success/deposit completion view event (`src/app/apply/success/page.tsx`)
- Implemented canonical status language (`Applications open now`) across jam-flagged surfaces:
  - `src/components/sections/Hero.tsx`
  - `src/components/Nav.tsx`
  - `src/components/StickyApplyBar.tsx`
  - `src/components/sections/FAQ.tsx` (confidence strip)
- Implemented CTA confidence feedback state (`Redirecting...` + disabled) on primary conversion surfaces:
  - `src/components/sections/Hero.tsx`
  - `src/components/Nav.tsx`
  - `src/components/StickyApplyBar.tsx`
  - `src/components/sections/Pricing.tsx`
  - `src/components/sections/CTAFooter.tsx`
- Implemented mobile/menu and desktop/trust UX changes from Jam:
  - Smoothed mobile menu timing/easing and improved orientation cue (`src/components/Nav.tsx`)
  - Added pre-FAQ confidence strip and friction-ordered FAQ content (`src/components/sections/FAQ.tsx`)
  - Standardized speaker proof framing and outbound affordance copy (`src/components/sections/Speakers.tsx`)
- Applied consumer-clarity narrative copy updates:
  - `src/components/sections/Why.tsx`
  - `src/components/sections/Outcomes.tsx`
  - `src/components/sections/HowItWorks.tsx`
  - `src/components/sections/Pricing.tsx`
  - `src/app/apply/page.tsx`
  - `src/app/layout.tsx` metadata
- Updated affected E2E assertion text:
  - `z2a/landing.spec.ts`
  - `z2a/reduced-motion.spec.ts`
  - `z2a/speakers.spec.ts`
- Implemented mobile-first conversion polish update per user feedback:
  - Mobile menu panel now opens with a softer swipe-down ease and cleaner header layout; removed in-panel "Applications open now" badge and centered "Navigate" label.
  - Hero now uses a stronger minimal-premium date/location/seat callout and includes `Limited to 50 seats in Toronto.` helper text beneath the primary CTA.
  - Removed the animated hero marquee and tightened hero-to-next-section spacing.
  - Replaced Outcomes cards with a TKS-inspired three-image statement block: `One weekend`, `Pods of 5`, `Future-ready`.
  - Updated speakers so both cards use explicit bottom-right LinkedIn icon links under proof points.
  - Reworked FAQ to 7 objection-first, purchase-blocking questions and concise answers.
  - Normalized pod-size references to `pods of 5` in relevant sections.

## Coordination Notes
- Integrated baseline behavior from overlap-heavy phases:
  - Phase 8: speakers/pricing/apply structure retained and patched semantically.
  - Phase 9: hero loop implementation preserved; only copy/CTA surface behavior changed.
- No conflicting concurrent agent edits detected in working tree during execution (only local execution changes present).

## Verification
- `npm run lint` — pass
- `npm run typecheck` — pass
- `npm run build` — pass (with required local env vars for Prisma config: `DIRECT_URL`, `DATABASE_URL`, etc.)
- `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test z2a/landing.spec.ts z2a/reduced-motion.spec.ts --project=chromium --project=mobile-chrome` — blocked by sandbox bind error (`listen EPERM 0.0.0.0:3000`)
- `PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test z2a/landing.spec.ts z2a/reduced-motion.spec.ts z2a/speakers.spec.ts --project=chromium --project=mobile-chrome --reporter=list` — pass (18 passed)
- Playwright visual QA via `playwright-skill` custom script (`/tmp/playwright-test-post-implementation-qa.js`) — pass with mobile+desktop screenshots captured.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Applied the approved mobile-first implementation plan across Nav/Hero/Why/Outcomes/Speakers/FAQ/Pricing/HowItWorks/CTAFooter plus test suite updates.
  - Added fallback image assets under `public/program/` to ensure the new three-image outcomes block renders until final photos are supplied.
  - Executed automated quality gates and full targeted Playwright spec run on both Chromium and mobile-chrome.
  - Executed manual visual QA with `playwright-skill` and captured post-change evidence screenshots.
- Commands run:
  - `npm run lint` — pass.
  - `npm run typecheck` — pass.
  - `npm run build` — fail first (missing `DIRECT_URL`), then pass with explicit env vars.
  - `PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test z2a/landing.spec.ts z2a/reduced-motion.spec.ts z2a/speakers.spec.ts --project=chromium --project=mobile-chrome --reporter=list` — pass (18/18).
  - `cd /Users/mm-macbookpro/.codex/skills/playwright-skill && node -e "require('./lib/helpers').detectDevServers().then(servers => console.log(JSON.stringify(servers)))"` — pass (found `:3000` and `:5000`).
  - `cd /Users/mm-macbookpro/.codex/skills/playwright-skill && TARGET_URL=http://localhost:3000 node run.js /tmp/playwright-test-post-implementation-qa.js` — pass (captured mobile/desktop screenshots).
- Blockers:
  - None blocking implementation completion.
- Next concrete steps:
  - Replace temporary placeholder assets in `public/program/` with the final three user-provided photos.
  - Optionally run one more polish pass after final assets are swapped.

## Handoff
- Replace temporary placeholder assets in `public/program/` with final approved photos from product/brand.
- Optionally run a final visual polish pass after image swap to fine-tune crop focal points and text contrast.
