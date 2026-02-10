# Phase 9c — Tests + Quality Gates + Review

## Focus
Update Playwright specs to validate the new hero stepper and reduced-motion behavior; run quality gates and record evidence.

## Inputs
- `z2a/landing.spec.ts`
- `z2a/reduced-motion.spec.ts`
- Phase 9a/9b outputs (test ids and hero behavior)

## Work
1. Update `z2a/reduced-motion.spec.ts`:
   - Replace the old `hero-agent-loop` assertions with stepper assertions.
   - Confirm transitions are effectively disabled under reduced motion (duration near-zero).
2. Update `z2a/landing.spec.ts`:
   - Add a `@prod-safe` test that clicks a step label and programmatically sets slider value to validate “click + drag” behavior.
3. Run gates:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
   - `npm run test:e2e:prod`
4. Write `docs/planning/phase-9/review.md` summarizing evidence and any residual risk.

## Output
- Updated Playwright specs for the new hero stepper:
  - `z2a/landing.spec.ts` now validates click + drag behavior on the hero stepper.
  - `z2a/reduced-motion.spec.ts` no longer references `hero-agent-loop`; validates reduced-motion transition durations are near-zero.
- Review artifact:
  - `docs/planning/phase-9/review.md`
- Quality gates:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e:prod` — **blocked in this execution environment** (Chromium fails to launch with MachPortRendezvous permission denied; processes cannot be killed: `kill EPERM`).

## Handoff
Run Playwright on a normal local machine/CI runner to close the final gate:
- `npm run test:e2e:prod`

If it still fails on your machine, paste the first failing test output; the code changes in Phase 9 are isolated to hero UI + tests.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Updated landing and reduced-motion Playwright specs to match the new hero stepper.
  - Ran lint/typecheck/build successfully.
  - Attempted Playwright prod-safe run; identified environment-level Chromium launch restriction.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass (Next.js middleware deprecation warning only)
  - `npm run test:e2e:prod` — fail (Chromium launch: MachPortRendezvous permission denied; cannot kill PID)
- Blockers:
  - Playwright/Chromium cannot run in this sandboxed execution environment → run `npm run test:e2e:prod` outside.
- Next concrete steps:
  - Run `npm run test:e2e:prod` outside this sandbox to close the final Success Criteria.
