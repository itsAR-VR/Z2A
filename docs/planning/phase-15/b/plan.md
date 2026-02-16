# Phase 15b — Home Hero Choreography + First-Viewport Contrast Layering

## Focus
Implement a high-impact, staged Home top-of-fold experience that increases visual authority while staying light-theme and readable.

## Inputs
- `docs/planning/phase-15/plan.md`
- `docs/planning/phase-15/motion-blueprint.md` (from 15a)
- Existing Home structure in `src/app/page.tsx`

## Work
1. Implement staged timeline choreography in Home `#top`:
   - headline split/sequence reveal,
   - body copy delayed entrance,
   - CTA stagger,
   - secondary visual/media entrance.
2. Increase first-viewport contrast layering with controlled light-theme composition:
   - shape masks,
   - gradient planes,
   - depth hierarchy behind content.
3. Ensure typography and spacing remain premium/editorial, not crowded.
4. Add or refine one Home signature motion element that communicates system progression without excessive ornamentation.
5. Add reduced-motion path for all added choreography (simplified fades/no 3D transforms).

## Output
- Updated Home hero in `src/app/page.tsx` with:
  - staged sequence (`stage-enter` timing) for badge, headline, body, CTAs, and support elements,
  - stronger first-viewport contrast layers using hero planes and gradient depth,
  - signature motion block (`Signature sequence` rail: Scope -> Build -> Deploy -> Measure -> Scale).
- Added supporting primitives in `src/app/globals.css`:
  - `stage-enter` keyframes/delay model,
  - reusable `signature-rail` classes,
  - contrast plane classes (`hero-plane*`), with reduced-motion fallback behavior.

## Handoff
Reuse the Home sequencing and rail primitives in `15c` so Businesses gets parallel choreography with domain-specific orchestration semantics.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Replaced Home top section with staged entrance choreography and editorial composition.
  - Added higher-contrast but light-theme-safe background planes and accent gradients.
  - Implemented Home signature rail using shared motion primitives.
- Commands run:
  - `npm run lint` — pass.
  - `npm run build` — pass.
- Blockers:
  - None.
- Next concrete steps:
  - Apply same motion system to `/businesses` with orchestration-specific signature block and custom-pricing preservation.
