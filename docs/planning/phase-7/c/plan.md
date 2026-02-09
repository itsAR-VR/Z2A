# Phase 7c — Landing (TKS-Inspired Structure + Agentic Cinematic)

## Focus
Upgrade the landing experience to be more TKS-inspired in structure/impact while staying premium and grounded. Add a single bold-cinematic "agent trace" motif that communicates AI power as a secondary proof point.

## Inputs
- 7b primitives: motion tokens + semantic tokens + standardized reveals
- 7a findings for landing files
- Landing components:
  - `src/components/Nav.tsx`
  - `src/components/sections/Hero.tsx`
  - `src/components/sections/*`

## Work
1. Signature hero moment (GSAP)
   - Refactor the existing hero GSAP choreography (`Hero.tsx:59-96`) to use JS motion tokens from `src/lib/motion-tokens.ts` instead of inline `power3.out` + hardcoded durations.
   - Add a restrained "agent trace" SVG layer:
     - A node/edge SVG (Scope → Build → Deploy → Evaluate) behind or adjacent to the hero content area (desktop only, hidden on mobile for performance).
     - Animate with CSS `stroke-dashoffset` + IntersectionObserver (NOT GSAP DrawSVGPlugin — avoid paid plugin dependency). Opacity entrance via GSAP timeline.
     - Use `--duration-cinematic` / GSAP `DURATION.cinematic` for stroke reveal timing.
     - Reduced-motion: render the SVG statically (no stroke animation, full opacity).
   - Important: The SVG is **static/decorative** content. It does not reflect real build data.
2. "Built by an AI agent" proof point (secondary)
   - Add an "Agent Trace" pill/button near the hero meta area.
   - Opens a dialog using the shared `src/components/Dialog.tsx` component (NOT a bespoke overlay).
   - Dialog content: **static curated narrative** (3-5 bullet points, e.g., "Designed in 6 phases", "12,000+ lines of code", "Stripe integration verified end-to-end"). Copy TBD — see Open Question in root plan.
   - Add `data-testid="agent-trace-trigger"` to the pill and `data-testid="agent-trace-dialog"` to the dialog panel.
3. TKS-inspired structure pass
   - Tighten scan paths, reduce repetitive card chrome, increase editorial hierarchy.
   - Normalize spacing rhythm across sections using existing `.section-padding` utility (already defined in `globals.css:102`). Ensure all sections use it consistently.
4. Motion consistency across landing
   - Replace any remaining ad-hoc timings in Nav overlay transitions (`Nav.tsx:214-215`, `Nav.tsx:223-224`) with CSS motion tokens (`--duration-fast`, `--ease-quart`).
   - Ensure sticky bar (`StickyApplyBar.tsx`) entrance/exit, speaker dialog (`Speakers.tsx`) transitions all use motion tokens.
   - All `RevealOnScroll` usages in landing sections should specify a `variant` prop (default to `"soft"`).
5. Verification
   - Update `z2a/landing.spec.ts`: anchor IDs remain; add assertion for agent-trace trigger visibility.
   - Update `z2a/reduced-motion.spec.ts`: add test that agent-trace SVG does not animate (check `stroke-dashoffset` is not transitioning or element has no animation class).
   - Add test for agent-trace dialog: open → ESC close → focus restores to trigger button.

## Validation (RED TEAM)
- No GSAP paid plugins (DrawSVGPlugin, MorphSVG) imported anywhere.
- Hero GSAP timeline uses constants from `src/lib/motion-tokens.ts`, not inline values.
- Agent trace dialog uses `src/components/Dialog.tsx` with proper `labelledBy`/`onClose` props.
- `data-testid="agent-trace-trigger"` and `data-testid="agent-trace-dialog"` exist in rendered markup.
- All `RevealOnScroll` usages on landing specify a `variant` prop.
- Nav overlay transitions reference CSS motion token variables, not hardcoded `duration-200`.
- `npm run lint && npm run typecheck && npm run build && npm run test:e2e` pass.

## Output
Completed artifacts:
- Hero GSAP timeline tokenized to use `src/lib/motion-tokens.ts` (durations + easing).
- Added a desktop-only “agent trace” decorative SVG layer with IntersectionObserver gating and reduced-motion-safe behavior.
- Added “Agent Trace” dialog using shared `src/components/Dialog.tsx` with stable test IDs and focus restore.
- Updated nav behavior to be more TKS-inspired (Menu available on desktop; link list shifts to `lg`).
- Expanded Playwright coverage:
  - `z2a/landing.spec.ts` (agent trace trigger + dialog focus restore)
  - `z2a/reduced-motion.spec.ts` (agent trace static under reduced motion)

## Handoff
Subphase 7d should reuse the same "agent trace" language subtly (microcopy and/or small motifs) but keep the apply flow conversion-first and low-friction.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented the “agent trace” hero layer and dialog (static curated narrative, not data-driven).
  - Refactored hero GSAP choreography to use JS motion tokens.
  - Adjusted nav structure to introduce a TKS-like Menu affordance on desktop while keeping fast scan links on large screens.
  - Added E2E coverage for dialog accessibility/focus restore and reduced-motion trace behavior.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — pass (18 passed, 2 skipped)
- Blockers:
  - None.
- Next concrete steps:
  - Execute 7d to harden `/apply` (first-invalid focus, aria-live summary, double-submit prevention, example chips).
