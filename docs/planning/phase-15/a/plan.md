# Phase 15a — Benchmark-to-Motion Blueprint and File-Level Map

## Focus
Translate validated reference patterns (TKS/Webflow/SaaS) into an explicit motion blueprint that fits the current Zero-to-Agent codebase and brand constraints.

## Inputs
- `docs/planning/phase-15/plan.md`
- Live Playwright MCP findings and screenshots from:
  - `https://zerotoagent.com/`
  - `https://zerotoagent.com/businesses`
  - `https://www.tks.world/`
  - selected Webflow cloneables and SaaS references
- Existing motion stack and tokens in:
  - `src/app/globals.css`
  - `src/components/motion/*`
  - `src/components/Nav.tsx`

## Work
1. Extract reusable interaction patterns from benchmarks:
   - hero timeline sequencing model,
   - full-canvas navigation state model,
   - 3D link-hover transform model,
   - contrast-layer composition model.
2. Define implementation-ready motion specs:
   - timing/easing token updates,
   - transform model (`perspective`, `rotateX/rotateY`, fallback behavior),
   - desktop/mobile differences,
   - reduced-motion substitutions.
3. Map specs to concrete target files/components and note ownership boundaries:
   - `src/app/page.tsx`
   - `src/app/businesses/page.tsx`
   - `src/components/Nav.tsx`
   - `src/app/globals.css`
4. Record non-goals to prevent scope sprawl (no route changes, no pricing-table reintroduction).

## Output
- Created `docs/planning/phase-15/motion-blueprint.md` with:
  - benchmark-grounded interaction patterns (`tks.world`, Webflow exemplars, SaaS references),
  - implementation-ready motion model (staged hero timing, 3D flip hover, full-canvas menu, contrast layering),
  - file-level implementation map for `src/app/page.tsx`, `src/app/businesses/page.tsx`, `src/components/Nav.tsx`, `src/app/globals.css`, and `z2a/*`.
- Coordination note:
  - `git status` already contained uncommitted edits in `src/app/businesses/page.tsx` and `src/components/Nav.tsx`; this phase merged onto current state instead of resetting those files.

## Handoff
Use `motion-blueprint.md` as canonical input for `15b`, then keep sequencing tokens consistent when implementing `15c` and `15d`.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Loaded and applied motion benchmark evidence from live Playwright MCP audits.
  - Authored the concrete motion blueprint with implementation map and non-goals.
  - Performed multi-agent preflight (`git status`, last 10 phase scan) and documented merge-aware coordination.
- Commands run:
  - `git status --short` — pass (showed pre-existing modifications in nav/businesses files).
  - `ls -dt docs/planning/phase-* | head -10` — pass (overlap confirmed with phases 13/14/10).
- Blockers:
  - None.
- Next concrete steps:
  - Execute Home top-of-fold choreography and contrast-layer upgrade in `15b`.
