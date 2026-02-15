# Phase 13a - Route Split and Individuals Migration Scaffold

## Focus
Create the core route structure so the current individuals experience moves from `"/"` to `"/individuals"` without content loss, and establish the new route baseline required by downstream subphases.

## Inputs
- `docs/planning/phase-13/plan.md`
- Current individuals implementation in `src/app/page.tsx`
- Existing section component composition and IDs

## Work
- Create `src/app/individuals/page.tsx` by moving current page composition as-is.
- Replace `src/app/page.tsx` with a temporary minimal Home scaffold that preserves future section IDs (`top`, `vision`, `programs`, `principles`) for subphase `13b`.
- Verify section IDs for individuals page remain unchanged for scroll spy compatibility.
- Confirm imports and component composition remain consistent with existing design system primitives.

## Output
- `src/app/individuals/page.tsx` created with existing individuals composition preserved (`top`, `why`, `speakers`, `how`, `agenda`, `pricing`, `faq`, `apply`).
- `src/app/page.tsx` moved off the individuals funnel and now hosts Home route structure.
- Individuals section-ID continuity preserved for scroll behavior.

## Handoff
Subphase `13b` completes Home content on the new `src/app/page.tsx` route while reusing existing design primitives.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Split routes so individuals funnel lives at `/individuals`.
  - Established `/` as dedicated Home route target.
- Commands run:
  - `npm run lint` - pass.
  - `npm run typecheck` - pass.
- Blockers:
  - None.
- Next concrete steps:
  - Implement full Home section content and metadata.
