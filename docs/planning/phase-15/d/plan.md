# Phase 15d — Navigation Motion Overhaul (Full-Canvas Menu + 3D Link Hovers)

## Focus
Upgrade navigation from subtle polish to signature interaction quality while preserving accessibility guarantees and route-aware behavior.

## Inputs
- `docs/planning/phase-15/plan.md`
- `docs/planning/phase-15/motion-blueprint.md` (from 15a)
- Visual/motion handoff from `15b` and `15c`
- Current nav implementation in `src/components/Nav.tsx`

## Work
1. Refactor desktop menu presentation from card-overlay feel to stronger full-canvas navigation state.
2. Upgrade link hover motion in top nav and menu links:
   - perspective-based 3D flip transforms,
   - consistent active/hover transition language,
   - no translate-only fallback as primary desktop behavior.
3. Preserve core behavior requirements:
   - first focus target,
   - tab trap,
   - ESC close/focus restore,
   - page-aware anchors and route links.
4. Define and apply reduced-motion behavior for nav/menu interactions.
5. Confirm no regression to Individuals route navigation.

## Output
- Updated navigation system with:
  - full-canvas desktop menu composition (viewport-dominant panel, pages-first visual hierarchy),
  - perspective-aware hover motion via updated 3D flip labels and `tilt-hover` surfaces,
  - preserved page-aware anchors/routes, focus trap, ESC close, and first-link focus behavior.
- Files changed:
  - `src/components/Nav.tsx`
  - `src/app/globals.css`

## Handoff
Run `15e` regression suite and live MCP verification; update selectors/assertions where interaction text duplication affects accessible-name matching.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Refactored menu overlay from card-centric layout to full-canvas navigation state.
  - Upgraded nav and menu links to 3D flip/tilt interaction language.
  - Preserved reduced-motion deterministic behavior.
- Commands run:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- z2a/home.spec.ts z2a/businesses.spec.ts z2a/landing.spec.ts z2a/reduced-motion.spec.ts` — initial fail (`z2a/home.spec.ts` exact-name assertions), then pass after assertion update.
- Blockers:
  - None.
- Next concrete steps:
  - Finalize local + live verification results in `15e`, capture deploy-gap blocker if production not updated yet.
