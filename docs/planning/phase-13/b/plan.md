# Phase 13b - Home Page Implementation (`/`)

## Focus
Implement a brand-forward Home page that orients visitors quickly and routes them to either Individuals or Businesses with clear, grounded positioning.

## Inputs
- `docs/planning/phase-13/plan.md`
- Output from `docs/planning/phase-13/a/plan.md`
- `docs/planning/phase-14/copy-spec.md` (canonical Home copy)
- Existing visual system tokens and section wrappers in `src/components/*`

## Work
- Build complete Home sections:
  - `#top` (headline + one-line vision + primary CTA to `/individuals`)
  - `#vision` (plain-language positioning)
  - `#programs` (two pathway cards linking to `/individuals` and `/businesses`)
  - `#principles` (3-5 principles based on provided material: abstraction of complexity, post-deploy value, pragmatic demos)
- Implement section copy from `docs/planning/phase-14/copy-spec.md` verbatim unless constrained by UI layout.
- Ensure copy style stays direct and low-jargon.
- Reuse existing components (`SectionWrapper`, `Button`, badge/card patterns) to preserve design consistency.
- Ensure mobile and desktop scan paths remain clear and conversion-oriented.

## Output
- `src/app/page.tsx` now renders complete Home experience with required IDs:
  - `top`, `vision`, `programs`, `principles`.
- Home includes clear pathways to `/individuals` and `/businesses`.
- Route-level Home metadata added.

## Handoff
Subphase `13c` uses the same IA and design language to implement the dedicated Businesses page.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Replaced legacy landing composition at `/` with Home vision/pathway page.
  - Implemented Home copy aligned to Phase 14 guidance.
- Commands run:
  - `npm run build` - pass.
- Blockers:
  - None.
- Next concrete steps:
  - Implement `/businesses` with sectioned B2B content and tier cards.
