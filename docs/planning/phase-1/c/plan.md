# Phase 1c — Motion System (GSAP/ScrollTrigger/Lenis + Micro-Interactions)

## Focus
Implement a coherent motion language inspired by TKS/Refunnel:
scroll-driven reveals, micro-interactions, and smooth scrolling—while respecting performance and reduced-motion preferences.

## Inputs
- Phase 1b component scaffolding (finalized DOM structure per section).
- Reference signals:
  - GSAP + ScrollTrigger on both sites
  - Lenis used on TKS
- Design/motion principles from Phase 1a.

## Work
1. Add Lenis and integrate with ScrollTrigger (single source of scroll truth).
2. Define global motion constants:
   - easing, duration bands, stagger rules, reduced-motion overrides
3. Implement micro-interactions:
   - nav link hover treatment (original implementation; “double-text” style allowed as a motif)
   - primary CTA hover + press feedback
   - marquee/ticker loop + pause-on-hover
4. Implement per-section scroll interactions:
   - hero intro sequence (headline/subhead/CTA)
   - roadmap pin + step transitions (if included in IA)
   - card reveals and subtle parallax where appropriate
5. Add `prefers-reduced-motion` handling:
   - disable Lenis, replace timelines with instant states or minimal fades
6. Add instrumentation hooks:
   - lightweight debug mode to visualize triggers during development (optional)

## Output
- Motion system implemented with documented rules and a per-section checklist.
- A “motion review” capture script plan (Playwright) to export short videos for stakeholder review.

## Handoff
Hand off stable motion hooks and section animation contracts to Phase 1d so Apply/admin pages inherit the same interaction quality.

