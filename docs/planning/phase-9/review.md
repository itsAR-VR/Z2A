# Phase 9 — Review

## Summary
- Shipped hero polish from Jam `9440520b-504e-4c64-93d0-1cd1c9acdc4f`:
  - Lowered the desktop “Toronto pilot / 50 seats” floating ticket.
  - Restored a coherent animated hero loop (runner dot visits Scope → Build → Deploy → Evaluate; nodes pulse briefly on arrival).
- Verified locally: `npm run lint`, `npm run typecheck`, `npm run build` all pass (2026-02-10).
- E2E: `npm run test:e2e:prod` is **blocked in this execution environment** (Chromium launch fails with MachPortRendezvous permission denied; `kill EPERM`).

## What Shipped
- Ticket alignment + test ids:
  - `src/components/sections/Hero.tsx` (`data-testid="hero-ticket-toronto"`, class `-bottom-8`)
  - `src/components/sections/Hero.tsx` (`data-testid="hero-structure-card"`)
- Animated hero loop (final):
  - `src/components/sections/Hero.tsx` (renders “Weekend loop” SVG, GSAP runner loop + node pulse accents)
  - Stable selectors:
    - `data-testid="hero-agent-loop"`
    - `data-testid="hero-agent-loop-runner"`
- Removed stepper artifacts:
  - Deleted `src/components/hero/HeroStepper.tsx`
  - Removed `.z2a-stepper-range` CSS from `src/app/globals.css`
- Tests updated for final selectors/behavior:
  - `z2a/landing.spec.ts`
  - `z2a/reduced-motion.spec.ts`
- Environment guardrail (sandbox-only):
  - `playwright.config.ts` (sets `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE` when `os.cpus()` is empty)

## Verification

### Commands
- `npm run lint` — pass (2026-02-10)
- `npm run typecheck` — pass (2026-02-10)
- `npm run build` — pass (2026-02-10)
- `npm run test:e2e:prod` — fail/blocked (Chromium launch restriction in this environment)

### Notes
- Next.js emits a middleware deprecation warning during build; unrelated to Phase 9 scope.
- Playwright cannot launch Chromium in this environment due to macOS Mach port permission denial inside the sandbox. This is not caused by Phase 9 code changes.

## Success Criteria → Evidence

1. Desktop hero ticket is visibly lower and no longer feels misaligned.
   - Evidence: `src/components/sections/Hero.tsx` uses `className="... absolute -bottom-8 -left-4 ..."` on `data-testid="hero-ticket-toronto"`.
   - Status: met (code-level); requires final visual confirm in a real browser session.

2. Hero loop runner visits nodes and avoids “bouncy slider” behavior.
   - Evidence:
     - `src/components/sections/Hero.tsx` renders an SVG loop and runs a GSAP timeline that moves a runner dot through nodes and triggers brief, time-bounded node accents.
     - Reduced motion path: loop GSAP init is gated by `useReducedMotion()` and the reduced-motion spec asserts runner position is stable.
   - Status: met (code-level); requires final visual confirm in a real browser session.

3. QA gates pass: lint/typecheck/build.
   - Evidence: command results above.
   - Status: met.

4. Playwright `@prod-safe` tests pass.
   - Evidence: `npm run test:e2e:prod` fails before executing tests because Chromium cannot launch in this sandbox.
   - Status: not met (environment blocker).

## Plan Adherence
- Planned: lower ticket + stabilize “Scope/Build/Deploy/Evaluate” hero element + update tests + run gates.
  - Implemented: yes (final behavior is the animated loop; the stepper was an intermediate attempt that was reverted per user feedback).
- Delta: kept a guarded Playwright host-platform override (`playwright.config.ts`) because `os.cpus()` is empty in this environment, which causes Playwright to mis-detect `mac-x64`.

## Risks / Rollback
- Risk: Loop motion tempo/pulse may need tuning after visual QA.
  - Mitigation: durations and dwell are centralized in the GSAP loop timeline inside `src/components/sections/Hero.tsx`.
- Rollback: revert to the previous stepper approach (re-introduce `HeroStepper` + thumb CSS) or render a static (non-animated) loop under reduced motion only.

## Follow-ups
- Run `npm run test:e2e:prod` on a normal local machine or CI runner to close the final gate.
- Visual QA the hero loop motion and the lowered ticket on desktop + mobile widths.
