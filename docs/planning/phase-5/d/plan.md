# Phase 5d — Motion System Implementation Spec (Robust Stack)

## Focus
Make motion implementation decision-complete for a UI agent: primitives, patterns, reduced-motion rules, and performance budgets.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/design-motion-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ui-motion-implementation-playbook.md`
- Phase 5b spec deltas (speakers + admin motion needs)

## Work
1. Define motion primitives:
   - `useReducedMotion` (prefers-reduced-motion)
   - Reveal system (IntersectionObserver)
   - Stagger groups
   - Scroll spy for nav active section
2. Define robust stack:
   - Lenis desktop-only; off for reduced motion; safe teardown.
   - GSAP/ScrollTrigger for scroll-driven bits only.
   - CSS for most reveals/hover/menu/accordion.
3. Reduced-motion behavior mapping (non-negotiable).
4. Anti-jank rules and perf budgets.

## Output
- Motion spec that an implementer can follow without additional decisions.

## Handoff
Phase 5e uses these primitives to implement the public site and admin UI motion.

