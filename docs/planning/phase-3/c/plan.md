# Phase 3c — Design + Motion System Spec (TKS Palette, Refunnel Polish)

## Focus
Define the design tokens and motion system to implement the desired visual/interaction quality.

## Inputs
- `docs/phase-3/ia-copy-spec.md` (Phase 3b output).
- Reference captures in `/tmp/site-analysis/`.

## Work
1. **Design tokens**
   - Colors (TKS palette), radii, borders, shadows, spacing, typography.
2. **Motion rules**
   - Global easing, durations, stagger rules.
   - Reduced-motion behavior.
3. **Per-section animations**
   - Hero intro, marquee, card reveals, timeline/agenda, FAQ accordion.
4. **Performance guardrails**
   - Lazy-load media, cap simultaneous animations.

## Output
- `docs/phase-3/design-motion-spec.md` motion/design spec that can be implemented without new decisions.

## Handoff
Pass `docs/phase-3/design-motion-spec.md` to Phase 3d so funnel pages inherit the same system.

## Validation (RED TEAM)
- `/tmp/site-analysis/` captures are present or re-generated before finalizing tokens/motion.
- Reduced-motion behavior is explicitly defined for each motion pattern.
- Performance guardrails define max concurrent animations and lazy-load rules.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Drafted `docs/phase-3/design-motion-spec.md` with tokens, typography, motion rules, and reduced-motion behavior.
  - Regenerated reference captures under `/tmp/site-analysis/` (screenshots, data JSON, motion frames/videos).
- Commands run:
  - `cat <<'EOF' > docs/phase-3/design-motion-spec.md` — pass
  - `NODE_PATH=/tmp/puppeteer/node_modules node /tmp/site-capture.js` — pass
  - `ffmpeg ... /tmp/site-analysis/videos/compare/*.webm` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Begin Phase 3d funnel spec and integrate pricing/payment decisions.
