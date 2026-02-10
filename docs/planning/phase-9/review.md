# Phase 9 — Review

## Summary
- Shipped hero polish from Jam `9440520b-504e-4c64-93d0-1cd1c9acdc4f`:
  - Lowered the desktop “Toronto pilot / 50 seats” floating ticket.
  - Replaced the confusing SVG/GSAP loop with an interactive hero stepper (click + drag).
- Verified locally: `npm run lint`, `npm run typecheck`, `npm run build` all pass (2026-02-09 17:25 EST).
- E2E: `npm run test:e2e:prod` is **blocked in this execution environment** (Chromium launch fails with MachPortRendezvous permission denied; `kill EPERM`).

## What Shipped
- Ticket alignment + test ids:
  - `src/components/sections/Hero.tsx` (`data-testid="hero-ticket-toronto"`, class `-bottom-4`)
  - `src/components/sections/Hero.tsx` (`data-testid="hero-structure-card"`)
- Interactive hero stepper:
  - `src/components/hero/HeroStepper.tsx`
  - `src/components/sections/Hero.tsx` (renders `HeroStepper`, removes MotionPathPlugin + SVG loop)
  - `src/app/globals.css` (range thumb styling via `.z2a-stepper-range`)
- Tests updated for new selectors/behavior:
  - `z2a/landing.spec.ts`
  - `z2a/reduced-motion.spec.ts`
- Environment guardrail (sandbox-only):
  - `playwright.config.ts` (sets `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE` when `os.cpus()` is empty)

## Verification

### Commands
- `npm run lint` — pass (2026-02-09 17:25 EST)
- `npm run typecheck` — pass (2026-02-09 17:25 EST)
- `npm run build` — pass (2026-02-09 17:25 EST)
- `npm run test:e2e:prod` — fail/blocked (Chromium launch restriction in this environment)

### Notes
- Next.js emits a middleware deprecation warning during build; unrelated to Phase 9 scope.
- Playwright cannot launch Chromium in this environment due to macOS Mach port permission denial inside the sandbox. This is not caused by Phase 9 code changes.

## Success Criteria → Evidence

1. Desktop hero ticket is visibly lower and no longer feels misaligned.
   - Evidence: `src/components/sections/Hero.tsx` uses `className="... absolute -bottom-4 -left-4 ..."` on `data-testid="hero-ticket-toronto"`.
   - Status: met (code-level); requires final visual confirm in a real browser session.

2. Hero stepper supports click + drag and avoids “bouncy” animation.
   - Evidence:
     - `src/components/hero/HeroStepper.tsx` implements a snapped `input[type="range"]` + step label buttons and active description block.
     - `src/components/sections/Hero.tsx` removed the prior SVG/GSAP loop logic.
   - Status: met (code-level); requires final visual confirm in a real browser session.

3. QA gates pass: lint/typecheck/build.
   - Evidence: command results above.
   - Status: met.

4. Playwright `@prod-safe` tests pass.
   - Evidence: `npm run test:e2e:prod` fails before executing tests because Chromium cannot launch in this sandbox.
   - Status: not met (environment blocker).

## Plan Adherence
- Planned: implement stepper + update tests + run gates.
  - Implemented: yes.
- Delta: added a guarded Playwright host-platform override (`playwright.config.ts`) because `os.cpus()` is empty in this environment, which causes Playwright to mis-detect `mac-x64`.

## Risks / Rollback
- Risk: On very narrow widths, absolutely-positioned step labels could collide.
  - Mitigation: labels are short; run mobile QA once E2E can execute (or spot-check in browser).
- Rollback: revert `HeroStepper` usage in `src/components/sections/Hero.tsx` and restore the prior SVG block.

## Follow-ups
- Run `npm run test:e2e:prod` on a normal local machine or CI runner to close the final gate.
- Visual QA the hero stepper and the lowered ticket on desktop + mobile widths.
