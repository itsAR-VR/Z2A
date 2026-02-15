# Phase 13d - Page-Aware Navigation Refactor

## Focus
Refactor global navigation so it adapts anchors and CTA by current route while keeping overlay accessibility and reduced-motion behavior intact.

## Inputs
- `docs/planning/phase-13/plan.md`
- Outputs from `13a`, `13b`, and `13c` route/page structure
- `docs/planning/phase-14/phase-13-integration.md`
- Existing `src/components/Nav.tsx` behavior

## Work
- Add route-aware nav config keyed by pathname:
  - Home (`/`): `vision`, `programs`, `principles`
  - Individuals (`/individuals`): `why`, `speakers`, `how`, `agenda`, `pricing`, `faq`
  - Businesses (`/businesses`): `who`, `what`, `pricing`, `faq`, `contact`
- Update desktop top-links to render current-page anchors only.
- Update overlay menu structure:
  - First section: Pages (`/`, `/individuals`, `/businesses`)
  - Second section: On this page (current anchors)
- Ensure first focus target on open is first Pages link.
- Keep existing focus trap, ESC close, body-scroll lock, and reduced-motion menu transitions.
- Apply route-specific CTA labels/targets and use deterministic businesses fallback target `#contact` when env URL is missing.

## Output
- `src/components/Nav.tsx` now supports:
  - pathname-aware anchor sets (`/`, `/individuals`, `/businesses`),
  - pages-first overlay section with links to Home/Individuals/Businesses,
  - per-page CTA labels/targets with deterministic businesses fallback `#contact`,
  - preserved focus trap, ESC close, and focus restore behavior.

## Handoff
Subphase `13e` aligns metadata/config and apply-flow routing with the new nav model.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Replaced static nav link config with route-aware anchor/CTA config.
  - Updated overlay information architecture to "Pages" then "On this page".
- Commands run:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- z2a/landing.spec.ts z2a/reduced-motion.spec.ts` - pass.
- Blockers:
  - None.
- Next concrete steps:
  - Finalize metadata defaults and apply-page route continuity.
