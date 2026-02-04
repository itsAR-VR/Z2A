# Phase 1b — Design System + Layout Scaffolding (Next.js/Tailwind)

## Focus
Create the Next.js/Tailwind foundations and component scaffolding that match the intended look:
**TKS palette** + **Refunnel-like polish** (depth, spacing, crisp radii), without copying layouts.

## Inputs
- Phase 1a IA + section specs (anchors and required components).
- TKS palette constraint from Phase 1 root plan.

## Work
1. Initialize Next.js App Router project (TypeScript) and Tailwind configuration.
2. Implement design tokens as CSS variables (colors, radii, shadows, spacing scale).
3. Build layout primitives:
   - page container + section wrapper patterns
   - header (desktop + mobile), footer
4. Implement the single-page routing structure:
   - `/` with anchor navigation and smooth scroll hooks (without motion yet)
5. Build section skeletons with placeholder content and correct semantic HTML.
6. Add accessibility foundations:
   - focus states, skip link, heading order, aria labels for nav/menu

## Output
- Running single-page site skeleton with all sections present and navigable.
- Design token system reflecting TKS (black/white/off-white + green accent).

## Handoff
Hand off stable component boundaries to Phase 1c to layer motion without refactoring layout.

