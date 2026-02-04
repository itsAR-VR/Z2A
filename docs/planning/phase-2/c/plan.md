# Phase 2c — Motion + Design System Spec (TKS Palette + Refunnel Polish)

## Focus
Specify the design tokens and motion system that will be implemented in code, using the TKS palette and interaction principles inspired by TKS/Refunnel.

## Inputs
- Phase 2b section structure and content density.
- TKS palette requirement (black/white/off-white + green accent).

## Work
1. Define the token system:
   - colors (TKS values), radii, borders, shadows, spacing scale, typography choices
2. Define the motion system:
   - global easing + durations, stagger rules, reduced-motion behavior
   - scroll-triggered reveal patterns for each section
   - micro-interactions (nav hover, CTA hover, marquee loop)
3. Performance budgets:
   - avoid heavy scroll jank; cap simultaneous timelines
   - lazy-load hero media and below-fold assets
4. Accessibility requirements:
   - focus-visible styles, keyboard nav, skip-to-content
   - ensure animated content is not required to understand the page
5. Produce an implementation checklist:
   - per-component animation hooks and trigger rules

## Output
- A motion + design spec that can be implemented without additional subjective decisions.

## Handoff
Hand off motion+design spec to Phase 2d so checkout/apply pages inherit the same polish without new design work.

