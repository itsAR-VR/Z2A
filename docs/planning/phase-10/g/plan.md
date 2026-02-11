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

## Coordination Notes
- Integrated baseline behavior from overlap-heavy phases:
  - Phase 8: speakers/pricing/apply structure retained and patched semantically.
  - Phase 9: hero loop implementation preserved; only copy/CTA surface behavior changed.
- No conflicting concurrent agent edits detected in working tree during execution (only local execution changes present).

## Verification
- `npm run lint` — pass
- `npm run typecheck` — pass
- `npm run build` — pass
- `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test z2a/landing.spec.ts z2a/reduced-motion.spec.ts --project=chromium --project=mobile-chrome` — blocked by sandbox bind error (`listen EPERM 0.0.0.0:3000`)

## Handoff
- Next operator should run local Playwright validation outside this sandbox (or on CI) for:
  - `z2a/landing.spec.ts`
  - `z2a/reduced-motion.spec.ts`
- If visual QA reveals hero loop misalignment at 390x844 or 1333x863, tune only positional/layout classes in `src/components/sections/Hero.tsx` without altering loop motion logic.
- Optional follow-up: add dedicated testimonial/proof section if product wants additional social-proof above Pricing.
