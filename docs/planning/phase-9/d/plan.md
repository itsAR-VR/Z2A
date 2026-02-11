# Phase 9d — Restore Animated Hero Loop + Lower Ticket Further

## Focus
Revert the hero “Scope / Build / Deploy / Evaluate” element back to the animated loop concept (runner dot visiting each node), add purposeful node animations, and move the desktop “Toronto pilot / 50 seats” ticket slightly lower.

## Inputs
- Jam `9440520b-504e-4c64-93d0-1cd1c9acdc4f` + user feedback requesting the animated loop behavior.
- Current hero implementation: `src/components/sections/Hero.tsx`
- Prior loop markup/GSAP behavior (pre-Phase 9b) as the visual baseline.

## Work
1. Hero loop:
   - Remove the stepper component usage from `Hero.tsx`.
   - Restore the SVG loop markup (pill + nodes) and runner dot.
   - Implement GSAP timeline so the runner dot visits nodes in order (Scope → Build → Deploy → Evaluate) and loops.
   - Trigger a small pulse/highlight on the node as the runner arrives (no continuous “bouncy” pulsing).
   - Ensure reduced-motion disables the loop animation (static UI).
2. Ticket positioning:
   - Move the desktop Toronto/50 seats ticket slightly lower (e.g., `-bottom-4` → `-bottom-10`).
3. Tests:
   - Update `z2a/landing.spec.ts` and `z2a/reduced-motion.spec.ts` to stop referencing the stepper selectors and re-assert loop presence/reduced-motion behavior.
4. Gates:
   - Run `npm run lint`, `npm run typecheck`, `npm run build`.
   - Attempt `npm run test:e2e:prod` (expect it to remain blocked in this sandbox; record result).

## Output
- Restored the animated hero loop (runner dot visiting nodes + subtle node pulses):
  - `src/components/sections/Hero.tsx` now renders the loop SVG on the right side (below “What you leave with”), with the runner dot + node halos/labels only (removed the old loop card wrapper and extra copy).
  - Reworked the GSAP animation to eliminate jitter/jerk by using a single constant-velocity lap (MotionPathPlugin) plus scheduled node pulses (no continuous “bouncy” pulsing).
  - Animation is gated by `useReducedMotion()` (no GSAP loop init under reduced motion).
  - Added stable selectors:
    - `data-testid="hero-agent-loop"`
    - `data-testid="hero-agent-loop-runner"`
- Lowered the desktop Toronto/50 seats ticket further:
  - `src/components/sections/Hero.tsx` changed `-bottom-4` → `-bottom-10` on `data-testid="hero-ticket-toronto"`.
- Removed stepper artifacts:
  - Deleted `src/components/hero/HeroStepper.tsx`
  - Removed `.z2a-stepper-range` styling from `src/app/globals.css`
- Updated Playwright specs back to the loop:
  - `z2a/landing.spec.ts` asserts loop presence and the lowered ticket class.
  - `z2a/reduced-motion.spec.ts` asserts the loop runner does not move under reduced motion (bounding box stable).
- Quality gates:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e:prod` — **blocked in this execution environment** (Chromium MachPortRendezvous permission denied; `kill EPERM`).

## Handoff
- Update `docs/planning/phase-9/review.md` to reflect the final shipped hero behavior and the updated selectors/tests.
- Run Playwright in a normal local environment / CI runner to close the `@prod-safe` gate:
  - `npm run test:e2e:prod`
- Visual QA (desktop + mobile widths):
  - Runner motion feels “premium and grounded” (not bouncy), node pulse reads clearly.
  - Toronto ticket sits slightly lower and does not overlap right-side content.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Replaced the interactive stepper with the animated loop (runner dot + node pulse accents).
  - Lowered the Toronto pilot ticket further.
  - Removed stepper code + CSS and updated Playwright selectors/tests to match.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass (Next.js middleware deprecation warning only)
  - `npm run test:e2e:prod` — fail/blocked (Chromium launch: MachPortRendezvous permission denied; `kill EPERM`)
- Blockers:
  - Playwright/Chromium cannot run in this sandboxed execution environment → run `npm run test:e2e:prod` outside.
  - Jam MCP tools require auth in this environment → Jam artifacts could not be fetched via MCP (`Auth required`).
- Next concrete steps:
  - Run prod-safe Playwright tests outside this sandbox.
  - If motion/ticket alignment needs adjustment after visual QA, tune the loop timings/positions in `src/components/sections/Hero.tsx`.
