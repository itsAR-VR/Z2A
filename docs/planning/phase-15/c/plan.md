# Phase 15c — Businesses Hero Choreography + Signature Orchestration Block

## Focus
Bring `/businesses` to the same motion/visual quality level as Home while preserving enterprise clarity and custom-pricing policy.

## Inputs
- `docs/planning/phase-15/plan.md`
- `docs/planning/phase-15/motion-blueprint.md` (from 15a)
- Home motion decisions/handoff from `15b`
- Positioning constraints from:
  - `docs/planning/phase-14/copy-spec.md`
  - `docs/planning/phase-14/re-evaluation.md`

## Work
1. Implement staged timeline choreography for Businesses `#top` aligned to Home rhythm but tuned for B2B tone.
2. Add one signature Businesses motion block (workflow/orchestration rail or equivalent) that visually conveys managed agentic operations.
3. Strengthen first-viewport composition and contrast layers without drifting from light-first visual direction.
4. Preserve custom pricing posture:
   - no public numeric pricing ranges,
   - maintain `Contact for pricing` CTA and supporting copy.
5. Ensure reduced-motion equivalents for all added motion.

## Output
- Updated `/businesses` top-of-fold in `src/app/businesses/page.tsx` with:
  - staged hero sequence aligned to Home rhythm,
  - orchestration signature rail (`Intake -> Route -> Act -> Verify -> Improve`),
  - stronger first-viewport contrast layers using shared hero-plane primitives.
- Preserved custom pricing posture:
  - no public numeric pricing tables in local code,
  - `Contact for pricing` section and CTA retained.
- Coordination note:
  - integrated prior uncommitted edits to the same file without reverting existing copy-direction changes.

## Handoff
Move to `15d` and align nav/menu interaction language (3D flip + full-canvas state) with the updated hero motion vocabulary.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented staged Businesses hero and orchestration motion block.
  - Kept pricing section in custom-scoped mode (no public ranges).
  - Matched visual depth model with Home while maintaining B2B clarity.
- Commands run:
  - `npm run lint` — pass (executed after file changes).
  - `npm run build` — pass (executed after file changes).
- Blockers:
  - None.
- Next concrete steps:
  - Execute nav/menu overhaul in `15d` and validate no accessibility regressions.
