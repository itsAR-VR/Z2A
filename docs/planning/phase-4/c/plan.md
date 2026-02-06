# Phase 4c — Motion Infrastructure Spec (Lenis + GSAP/ScrollTrigger + CSS/IO)

## Focus
Define the robust motion stack and the exact implementation primitives a UI agent should use, including reduced-motion behavior and anti-jank rules.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/design-motion-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ui-motion-implementation-playbook.md`
- Phase 4a output: `#speakers` motion mapping and admin motion patterns

## Work
1. Define the motion stack contract:
   - Lenis:
     - desktop-only
     - disabled for reduced motion
     - safe teardown on route changes
   - GSAP + ScrollTrigger:
     - only for scroll-driven progress/scrub sequences (timeline/progress rails, etc.)
     - all other motion uses CSS transitions/keyframes + IO class toggles
   - IntersectionObserver reveal system:
     - reveal-once and reveal-repeat variants
     - group stagger variant (cards, list items)
2. Reduced-motion rules:
   - One centralized guard used by:
     - Lenis init (off)
     - ScrollTrigger init (off)
     - reveal transitions (instant)
     - marquee (paused/static)
3. Performance budgets:
   - transform/opacity only for most animations
   - avoid layout reads inside scroll handlers
   - no heavy continuous background animations on mobile
4. Add motion patterns for:
   - `#speakers` cards + award badge micro
   - admin table/filter/modal/toast interactions

## Output
- Motion infrastructure spec and implementation checklist:
  - primitives, patterns, and when to use each
  - reduced-motion fallback mapping
  - explicit performance guardrails

## Handoff
Phase 4d and 4e consume this to map motion patterns to public and admin UI components.

