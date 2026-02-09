# Phase 7b — Motion + Semantic Tokens

Date: 2026-02-08

This phase introduces two layers of motion tokens (CSS + JS) and semantic status colors so all surfaces can share the same timing, easing, and meaning.

## Why Two Layers (CSS + JS)

- **CSS tokens** power transitions/animations declared in CSS or Tailwind arbitrary properties.
- **GSAP timelines** live in JS and cannot reliably read CSS variables as “durations”/“eases” for timeline construction, so we use **JS constants**.

## CSS Motion Tokens

Defined in `src/app/globals.css` (`@theme`):

- Durations:
  - `--duration-fast: 0.2s`
  - `--duration-default: 0.4s`
  - `--duration-slow: 0.72s`
  - `--duration-cinematic: 1s`
- Easings:
  - `--ease-quart`
  - `--ease-expo`
  - `--ease-quint`
- Stagger:
  - `--stagger-step: 60ms`

Example (Tailwind arbitrary props):

```tsx
className="transition-opacity [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-quart)]"
```

## JS Motion Tokens (GSAP)

Defined in `src/lib/motion-tokens.ts`:

- `DURATION.fast/default/slow/cinematic` (seconds)
- `EASE.quart/expo/quint` (GSAP ease names)
- `STAGGER.step` (seconds)

## Reveal Primitive

`src/components/motion/RevealOnScroll.tsx` now supports:

- `variant="soft" | "snappy" | "cinematic"` (default: `soft`)
- `direction="up" | "left" | "right" | "none"`
- `delay` (ms)

Variants map to:

- `soft`: `--duration-slow` + `--ease-expo` + 18px offset
- `snappy`: `--duration-default` + `--ease-quart` + 10px offset
- `cinematic`: `--duration-cinematic` + `--ease-quint` + 24px offset

Reduced motion:

- `useReveal()` returns visible immediately
- component sets `transition: none`

## Semantic Status Tokens (Admin)

Defined in `src/app/globals.css`:

- `--color-success`, `--color-info`
- `--color-error-surface`, `--color-warning-surface`, `--color-success-surface`, `--color-info-surface`

Admin components should use semantic tokens, not hard-coded Tailwind colors:

```tsx
className="text-[var(--color-success)] bg-[var(--color-success-surface)]"
```

