# Zero-to-Agent — Design + Motion System Spec (Phase 3c)

## Inputs
- `docs/phase-3/ia-copy-spec.md`
- Reference captures at `/tmp/site-analysis/` (must be regenerated before final token validation)

## Design Direction (High-Level)
- Aesthetic: premium, editorial, calm confidence.
- Contrast: near-black background + off-white text + green accent.
- Layout: generous spacing, tight copy, clear hierarchy.
- Motion: subtle, purposeful; no gimmicks; honor `prefers-reduced-motion`.

## Design Tokens

### Color Palette
- `bg-900`: #0B0B0B (primary background)
- `bg-850`: #111111 (section blocks)
- `bg-800`: #171717 (cards)
- `text-100`: #F5F5F0 (primary text)
- `text-300`: #CFCFC9 (secondary text)
- `text-500`: #9A9A94 (muted)
- `accent-500`: #21E27C (primary green)
- `accent-600`: #12C96A (hover/active)
- `border-700`: #2A2A2A (hairline)

### Typography
- Headline: `Sora` (600–700)
- Body: `IBM Plex Sans` (400–500)
- Mono/label: `IBM Plex Mono` (500)

Type scale (desktop):
- H1: 56 / 64
- H2: 36 / 44
- H3: 24 / 32
- Body: 18 / 28
- Small: 14 / 22

Type scale (mobile):
- H1: 34 / 42
- H2: 26 / 34
- H3: 20 / 28
- Body: 16 / 26
- Small: 13 / 20

### Spacing
- Base unit: 8px
- Section padding (desktop): 96–120px vertical
- Section padding (mobile): 64–80px vertical
- Card padding: 24–32px
- Grid gap: 16–24px

### Radii + Borders
- Small: 8px
- Medium: 12px
- Large: 20px
- Border: 1px solid `border-700`

### Shadows
- Soft: `0 10px 30px rgba(0,0,0,0.35)`
- Glow (accent): `0 0 32px rgba(33,226,124,0.25)`

## Motion System

### Global Rules (Phase 5 — Robust Stack)
- **Lenis:** Desktop smooth scroll only. Disabled on mobile and reduced-motion.
- **GSAP + ScrollTrigger:** Scroll-driven animations only (hero parallax, timeline progress, nav scroll spy).
- **CSS + IntersectionObserver:** All reveals, hovers, menu, accordion transitions.
- Default easing: `power3.out`
- Base duration: 0.6s (text), 0.8s (cards), 1.2s (hero media)
- Stagger: 0.08–0.12s for list/card groups

### Reduced Motion
- Respect `prefers-reduced-motion` (non-negotiable):
  - Lenis OFF — native browser scroll.
  - ScrollTrigger OFF — elements at final state immediately.
  - Parallax OFF.
  - Marquee OFF or static.
  - Reveals instant (opacity: 1 immediately) or minimal opacity fade only.
  - Hover effects allowed (user-initiated).
  - Accordion/menu transitions: instant.

### Performance Guardrails
- No more than 2 simultaneous section-level animations.
- Lazy-load media below the fold.
- Avoid heavy blur filters or continuous GPU effects.

## Section-Level Motion

### Hero
- Headline + subhead fade-in (y: 8px → 0, opacity 0 → 1).
- CTA button subtle glow pulse once on load.
- Hero media loop starts after text settles (delay 0.2s).

### Why / Outcomes
- Card group staggered reveal on scroll enter.
- Icons scale from 0.98 → 1.0 for subtle pop.

### Speakers (Phase 5 addition)
- Speaker cards staggered reveal on scroll enter (0.1s delay between cards).
- Card hover: subtle lift (translateY -4px) + shadow.
- LinkedIn link underline expand on hover.

### How / Agenda
- Timeline steps slide-in (x: -10px → 0).
- Connector line draw animation (if not reduced motion).

### Pricing
- Card lift on hover (translateY: -4px, shadow intensifies).
- Tooltip fade-in for “What happens at check-in?”

### FAQ
- Accordion expand with height + opacity transition (0.3s).

### Apply
- CTA block fade-in with slight scale (0.98 → 1.0).

## Visual Components (Notes)
- Marquee text: “Build → Deploy → Test → Demo” as a subtle motion element (disabled for reduced motion).
- Use line separators to create editorial structure.

## Validation Checklist
- `/tmp/site-analysis/` captures reviewed and palette adjusted if needed.
- Reduced-motion works: no parallax, no marquee, no scroll transforms.
- Motion never blocks interaction or delays CTA visibility.

## Implementation Playbook
- For a detailed, step-by-step execution checklist and micro-animation inventory, see:
  - `docs/phase-3/ui-motion-implementation-playbook.md`
