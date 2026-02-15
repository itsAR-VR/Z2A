# Phase 14d — Phase 13 Integration Notes (Implementation + Validation)

## Focus
Bridge the refined reasoning/copy outputs back into the Phase 13 implementation phase with explicit insertion points and acceptance checks.

## Inputs
- `/businesses` copy spec and Home principles spec from `docs/planning/phase-14/c/plan.md`
- Phase 13 plan and subphases in `docs/planning/phase-13/*`

## Work
- Document exactly how Phase 13 should consume Phase 14 outputs:
  - which sections/components get which copy blocks,
  - which CTA targets and env vars are required,
  - which test assertions should change (or be added) to lock the new copy/structure.
- Add acceptance checklist:
  - route parity (`/`, `/individuals`, `/businesses`),
  - nav/menu behavior (pages-first focus),
  - pricing tier presence and order.

## Validation (RED TEAM)
- [x] Every Phase 13 subphase has explicit consumption points for Phase 14 artifacts.
- [x] Test expectations were converted into concrete assertions and ordering checks.
- [x] Cross-phase overlap with active Phase 13 is documented and bounded.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Created implementation handoff doc for Phase 13 route/nav/tests alignment.
  - Added deterministic acceptance checklist and conflict-resolution source-of-truth rules.
  - Patched Phase 13 planning docs so copy/rules are consumed from Phase 14 artifacts.
- Commands run:
  - `for f in src/app/page.tsx src/app/apply/page.tsx src/components/Nav.tsx z2a/landing.spec.ts z2a/reduced-motion.spec.ts src/app/layout.tsx` — pass (touchpoints exist).
  - `for f in src/app/individuals/page.tsx src/app/businesses/page.tsx z2a/home.spec.ts z2a/businesses.spec.ts` — pass (confirmed planned/new files are currently missing, as expected for Phase 13 implementation).
- Blockers:
  - None.
- Next concrete steps:
  - Execute Phase 13 implementation against these now-deterministic inputs.

## Output
- `docs/planning/phase-14/phase-13-integration.md` created with:
  - subphase-by-subphase insertion map,
  - test assertion requirements,
  - acceptance checklist,
  - coordination notes.
- Phase 13 plan files updated to reference Phase 14 artifacts directly.

## Handoff
Phase 14 is complete. Phase 13 can now proceed without unresolved copy/positioning/pricing decisions.
