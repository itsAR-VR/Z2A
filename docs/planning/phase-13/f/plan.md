# Phase 13f - Playwright Coverage and Assertion Updates

## Focus
Rebase end-to-end coverage on the new route architecture and menu behavior so regressions are caught across Home, Individuals, and Businesses.

## Inputs
- `docs/planning/phase-13/plan.md`
- Outputs from `13a` through `13e`
- `docs/planning/phase-14/phase-13-integration.md`
- Existing tests in `z2a/landing.spec.ts` and `z2a/reduced-motion.spec.ts`

## Work
- Update `z2a/landing.spec.ts`:
  - route target from `"/"` to `"/individuals"` for existing landing/anchors checks
  - remove or relocate outcomes assertions if outcomes are not rendered in individuals route
- Add `z2a/home.spec.ts`:
  - verify Home heading renders
  - verify links to `/individuals` and `/businesses`
  - verify Menu contains pages links
- Add `z2a/businesses.spec.ts`:
  - verify pricing section exists
  - verify three tier names render
  - verify tier order is `Ongoing AI Partnership` -> `Implementation Sprint` -> `Discovery Workshop`
  - verify refund text renders as `100% refund if you aren't satisfied`
  - verify CTA is present
- Update menu-focus assertions in:
  - `z2a/landing.spec.ts`
  - `z2a/reduced-motion.spec.ts`
  so the first focused link in overlay is the first Pages link.

## Output
- Playwright suite now reflects the new IA:
  - `z2a/landing.spec.ts` targets `/individuals` and pages-first menu focus.
  - `z2a/reduced-motion.spec.ts` targets `/individuals` and pages-first menu focus.
  - `z2a/home.spec.ts` added for `/` pathway and menu link coverage.
  - `z2a/businesses.spec.ts` added for tier presence/order and refund line.
  - `z2a/speakers.spec.ts` now targets `/individuals`.

## Handoff
Phase complete when route behavior and test intent are aligned; next execution phase can implement and validate code changes directly against this spec.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Reworked existing landing/reduced-motion assertions to the new route model.
  - Added dedicated home and businesses specs.
  - Hardened selectors for duplicate-link strictness and dynamic seat-counter text.
- Commands run:
  - `npm run test:e2e -- z2a/landing.spec.ts z2a/reduced-motion.spec.ts z2a/speakers.spec.ts z2a/home.spec.ts z2a/businesses.spec.ts` - fail against default base URL (`https://zerotoagent.com`) because production is not yet deployed to this branch's changes.
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- z2a/landing.spec.ts z2a/reduced-motion.spec.ts z2a/speakers.spec.ts z2a/home.spec.ts z2a/businesses.spec.ts` - pass (22/22).
- Blockers:
  - None for local validation; production checks require deployment first.
- Next concrete steps:
  - Deploy and rerun prod-safe suite against production URL when ready.
