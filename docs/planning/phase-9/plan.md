# Phase 9 — Hero Ticket Alignment + Animated Hero Loop (Jam 9440520b…)

## Purpose
Fix the homepage hero UI issues reported in Jam `9440520b-504e-4c64-93d0-1cd1c9acdc4f`: the desktop “Toronto pilot / 50 seats” floating ticket sits too high, and the hero “Scope / Build / Deploy / Evaluate” element should read as a coherent animated loop (runner dot visits each node) without a “bouncy” feel.

## Context
- Jam report: `https://jam.dev/c/9440520b-504e-4c64-93d0-1cd1c9acdc4f`
- Observed complaints in the recording:
  - “Toronto Pilot / 50 seats” should sit lower relative to the right-side content.
  - The “Scope / Build / Deploy / Evaluate” row should behave like a coherent step/progress control; current motion/alignment feels wrong.
- Implementation baseline:
  - Hero is implemented in `src/components/sections/Hero.tsx`.
  - Reduced-motion coverage exists via `z2a/reduced-motion.spec.ts`.

## Concurrent Phases
Overlap exists with recent completed work that touched the same landing files.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 8 | Complete | Files: `src/components/sections/Hero.tsx`, tests under `z2a/*` | Treat current `Hero.tsx` as baseline; do not revert Phase 8 changes. |
| Phase 7 | Complete | Domain: motion tokens + hero motion | Preserve global reduced-motion rules and motion token usage. |

## Objectives
* [x] Lower the desktop floating “Toronto pilot / 50 seats” ticket so it feels attached to the right-side content.
* [x] Replace the hero SVG “agent loop” animation with an interactive, accessible stepper/slider for Scope/Build/Deploy/Evaluate. (implemented in 9b, reverted in 9d)
* [x] Update Playwright tests (landing + reduced motion) to cover the new stepper and avoid flake. (implemented in 9c, reverted in 9d)
* [x] Restore the animated hero loop (runner dot visits each node) and add purposeful node animations (no “bouncy” feel).
* [x] Move the desktop Toronto/50 seats ticket slightly lower (from the Phase 9a adjustment).

## Constraints
- Brand: focused, premium, builder-first. No hype.
- Motion: progressive enhancement; reduced-motion compliant.
- A11y: keyboard navigable; visible focus; touch targets >= 44px.
- Keep changes surgical; avoid broad refactors.

## Success Criteria
- Desktop hero ticket is visibly lower and no longer feels misaligned.
- Hero loop:
  - The runner dot visits Scope → Build → Deploy → Evaluate in a loop.
  - Each node gets a small, timed accent (pulse/highlight) as the runner reaches it.
  - No confusing “bouncy slider” behavior.
- QA:
  - `npm run lint`, `npm run typecheck`, `npm run build` pass.
  - Playwright `@prod-safe` tests pass.

## Subphase Index
* a — Adjust desktop floating ticket positioning + add test ids
* b — Implement interactive hero stepper (replace SVG loop + remove loop GSAP)
* c — Update Playwright coverage + run quality gates; write review
* d — Restore animated hero loop + lower ticket further; update tests + re-run gates

## Repo Reality Check (RED TEAM)

- What exists today:
  - Hero implementation: `src/components/sections/Hero.tsx`
  - Hero loop animation: GSAP timeline scoped to the hero loop card (runner dot visits nodes)
  - Loop selectors: `data-testid="hero-agent-loop"`, `data-testid="hero-agent-loop-runner"`
  - Tests: `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`
  - Playwright config: `playwright.config.ts`
- What the plan assumes:
  - A simple animated loop (runner + brief node pulses) resolves the “bouncy/misaligned” complaint without reading as an interactive control.
  - The floating ticket remains a desktop-only overlay (md+) and is not clipped by the right-card container.
- Verified touch points:
  - Phase 9 code touch points exist on disk (Hero loop + tests); stepper artifacts were intentionally removed in 9d.
  - `npm run lint`, `npm run typecheck`, `npm run build` run successfully in this environment.

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- Loop motion reads “busy” or “bouncy” at the current tempo → Mitigation: tune durations/dwell in `src/components/sections/Hero.tsx` after visual QA; keep pulses time-bounded.
- SVG text spacing collides at narrow widths → Mitigation: reduce label letter spacing/font size or simplify labels after mobile QA.

### Testing / validation
- Playwright cannot launch Chromium in this execution environment (MachPortRendezvous permission denied; `kill EPERM`) → Mitigation: run `npm run test:e2e:prod` on a normal local machine or CI runner; treat it as the final gate.

## Open Questions (Need Human Input)

- [ ] Where should the Playwright `@prod-safe` gate run (CI vs your local machine) given the sandbox limitation here? (confidence <90%)
  - Why it matters: determines how we close Success Criteria “tests pass” and prevents regressions.
  - Current assumption in this plan: run `npm run test:e2e:prod` outside this sandbox.

## Phase Summary (running)
- 2026-02-09 — Phase created from Jam report; pending implementation.
- 2026-02-09 — Lowered desktop Toronto/50 seats ticket and added hero test ids (files: `src/components/sections/Hero.tsx`, `docs/planning/phase-9/a/plan.md`)
- 2026-02-09 — Replaced hero SVG loop with interactive stepper (files: `src/components/sections/Hero.tsx`, `src/components/hero/HeroStepper.tsx`, `src/app/globals.css`, `docs/planning/phase-9/b/plan.md`)
- 2026-02-09 — Updated Playwright specs + ran lint/typecheck/build; Playwright execution blocked in this sandbox (files: `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`, `docs/planning/phase-9/c/plan.md`)
- 2026-02-10 — Moved the hero loop below “What you leave with”, smoothed runner motion (no jitter), and lowered the ticket further (files: `src/components/sections/Hero.tsx`, `z2a/landing.spec.ts`, `docs/planning/phase-9/d/plan.md`)

## Phase Summary

- Shipped:
  - Lowered desktop “Toronto pilot / 50 seats” floating ticket and added hero selectors.
  - Restored the animated “Scope / Build / Deploy / Evaluate” hero loop (runner dot + brief node accents).
  - Lowered the Toronto ticket further (`-bottom-10`) and updated Playwright specs to match the final selectors/behavior.
- Verified:
  - `npm run lint`: pass
  - `npm run typecheck`: pass
  - `npm run build`: pass
- Notes:
  - `npm run test:e2e:prod` is blocked in this execution environment due to Chromium launch restrictions; run in local/CI to close the final gate (see `docs/planning/phase-9/review.md`).
