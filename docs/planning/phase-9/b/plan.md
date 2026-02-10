# Phase 9b — Interactive Hero Stepper

## Focus
Replace the hero SVG “agent loop” (Scope/Build/Deploy/Evaluate) animation with an interactive stepper/slider that supports click + drag, snaps to steps, and is reduced-motion compliant.

## Inputs
- Jam `9440520b-504e-4c64-93d0-1cd1c9acdc4f` complaint about misaligned/bouncy dots.
- Motion tokens in `src/app/globals.css` and `src/lib/motion-tokens.ts`.
- Existing hero GSAP intro sequence in `src/components/sections/Hero.tsx`.

## Work
1. Create `src/components/hero/HeroStepper.tsx`:
   - Controlled `input[type="range"]` min=0 max=3 step=1.
   - `aria-label="Hero timeline"`.
   - `data-testid="hero-stepper"` wrapper.
   - Step labels as buttons to jump to a step.
   - Active label + description block with test ids.
2. Style the range thumb (dot) via `src/app/globals.css` (track is drawn via normal divs).
3. In `Hero.tsx`:
   - Remove MotionPathPlugin usage and the continuous runner/pulse GSAP logic.
   - Replace the SVG markup with the new `HeroStepper` inside the same bordered container.
4. Ensure reduced-motion path remains stable (no reliance on GSAP for stepper).

## Output
- Replaced the hero SVG loop animation with an interactive stepper.
- New component: `src/components/hero/HeroStepper.tsx` (range thumb dot + step label buttons + active description block).
- Added `.z2a-stepper-range` styling to `src/app/globals.css` (thumb only; track is drawn via normal divs).
- Updated `src/components/sections/Hero.tsx` to render the stepper and removed MotionPathPlugin + runner/pulse GSAP logic.
- Files:
  - `src/components/sections/Hero.tsx`
  - `src/components/hero/HeroStepper.tsx`
  - `src/app/globals.css`

## Handoff
Phase 9c should update tests to:
- Stop referencing `data-testid="hero-agent-loop"`.
- Assert stepper behavior via `data-testid="hero-stepper"`, `hero-stepper-active-label`, `hero-stepper-active-description`, and `hero-stepper-progress`.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented a click + drag hero stepper and removed the old SVG/GSAP loop behavior.
- Commands run:
  - `nl -ba src/components/sections/Hero.tsx | sed -n '1,170p'` — pass (confirmed MotionPathPlugin removal and stepper insertion).
  - `sed -n '1,240p' src/components/hero/HeroStepper.tsx` — pass (confirmed selectors and a11y attrs).
- Blockers:
  - None.
- Next concrete steps:
  - Update Playwright specs and run quality gates (Phase 9c).
