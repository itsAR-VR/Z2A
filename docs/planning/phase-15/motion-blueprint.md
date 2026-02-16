# Phase 15 Motion Blueprint — Home + Businesses + Nav

## Goal
Raise `/` and `/businesses` to a stronger premium-motion standard using a TKS-inspired interaction language while preserving:
- light-first brand direction,
- plain-language trust posture,
- accessibility/reduced-motion behavior,
- current routing and section IDs.

## Benchmark extracts (grounded)
1. `tks.world`
- dual-label link structure with transform-driven hover transitions.
- cinematic hero emphasis with high contrast media plane.
- menu state feels like a dedicated navigation canvas, not a small modal.

2. Webflow motion exemplars
- large spatial compositions with layered panels and masked gradients.
- deliberate reveal sequencing (not all content entering at once).

3. Stripe / Framer style references
- clear top-of-fold hierarchy with restrained but confident motion.
- strong contrast planes and depth cues without noisy effects.

## Interaction model to implement

### 1) Staged hero timeline (Home + Businesses)
- Stage 1: eyebrow badge.
- Stage 2: headline (primary load-bearing message).
- Stage 3: support paragraph.
- Stage 4: primary/secondary CTA row.
- Stage 5+: trust/support text and signature block.
- Timing profile:
  - delays in ~90-140ms increments,
  - default easing `var(--ease-expo)`,
  - duration around `var(--duration-cinematic)`.

### 2) Full-canvas menu model (desktop-first)
- Overlay occupies the viewport and uses a near-full-height panel.
- Pages are elevated as primary navigation objects.
- Current-page anchors become secondary but still prominent.
- Keep keyboard behavior:
  - focus first Pages link on open,
  - trap tab cycle,
  - ESC closes and restores menu button focus.

### 3) 3D link hover model
- Replace translate-only label motion with perspective rotate transforms:
  - primary label rotates out,
  - secondary label rotates in.
- Apply to top-nav links and menu links.
- Provide deterministic reduced-motion fallback (no 3D transforms).

### 4) Signature motion block per page
- Home: execution sequence rail (Scope -> Build -> Deploy -> Measure -> Scale).
- Businesses: orchestration rail (Intake -> Route -> Act -> Verify -> Improve).
- Animated runner conveys progression without overpowering copy.

### 5) First-viewport contrast layering
- Add large soft planes + gradient/mask depth behind hero content.
- Keep palette in current light neutral + indigo accent system.
- Avoid dark theme drift and avoid hype visual gimmicks.

## Reduced-motion contract
- Disable staged/runner/tilt/3D transforms.
- Keep content visible instantly with stable layout.
- Preserve interaction semantics and focus behavior.

## File-level implementation map
- `src/app/globals.css`
  - staged animation primitives (`stage-enter`),
  - 3D flip behavior,
  - hover tilt utility,
  - signature rail primitives,
  - hero contrast plane primitives,
  - reduced-motion overrides.

- `src/app/page.tsx`
  - Home hero staged sequence,
  - Home signature sequence rail,
  - upgraded first-viewport contrast layers.

- `src/app/businesses/page.tsx`
  - Businesses hero staged sequence,
  - orchestration rail block,
  - upgraded first-viewport contrast layers,
  - preserve custom-pricing-only content.

- `src/components/Nav.tsx`
  - full-canvas menu composition,
  - 3D flip-driven link interactions,
  - accessibility behavior unchanged.

- `z2a/home.spec.ts`, `z2a/businesses.spec.ts`
  - align assertions with updated hero text and custom-pricing structure.

## Non-goals
- No route map changes.
- No section ID renames.
- No reintroduction of public businesses pricing tiers/ranges.
- No changes to the Individuals page architecture.
