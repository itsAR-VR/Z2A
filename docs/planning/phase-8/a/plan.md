# Phase 8a — Landing Hero Cleanup (Remove Header Tiles)

## Focus
Remove the hero header "tiles" (deposit/Stripe/refund/location/instructor/Agent Trace pills) while keeping the hero's scan path and trust posture intact.

## Inputs
- Root plan: `docs/planning/phase-8/plan.md`
- Current hero implementation: `src/components/sections/Hero.tsx`
  - Meta pill row: lines 173–218 (5 info pills + Agent Trace button), attached to `metaRef`
  - Agent Trace dialog: lines 354–429 (uses shared `Dialog` component)
  - Agent Trace state: `traceOpen` (line 56), `traceRef`/`traceVisible`/`traceActive` (lines 57–60)
  - GSAP timeline: lines 62–108 — step at lines 93–97 animates `metaRef.current`
  - Decorative SVG trace: lines 222–273 (separate from the dialog)
  - "Have a network code?" CTA: line 168
- Landing E2E coverage: `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`
- Brand constraints from `AGENTS.md` (premium, grounded, trust-forward).

## Work
1. **Pre-flight conflict check**
   - Run `git status` and confirm Phase 7 changes are committed (or at least that the working tree state is the intended baseline).
   - Read current `Hero.tsx` and `z2a/landing.spec.ts` to confirm they match expectations.
2. **Remove hero meta pill row**
   - Delete the `<div ref={metaRef}>` block (lines 173–218) containing:
     - "Deposit $100 today" pill
     - "Checkout via Stripe" pill
     - "Full refund by end of Day 2" pill
     - "Location: Venue shared after you reserve a seat." pill
     - "Instructor: Aadil Kazmi" pill
     - Agent Trace `<button>` trigger
   - Remove the `metaRef` ref declaration (line 54).
   - Keep existing hero structure: badge row, headline/subhead, CTAs, right-side card, decorative tickets, marquee, background accents.
3. **Remove Agent Trace entry point (dialog + trigger)**
   - Remove `traceOpen` state and any `setTraceOpen` calls.
   - Remove the Agent Trace `<button data-testid="agent-trace-trigger">` from the meta pill row (it should be deleted with the row).
   - Remove the `<Dialog>` block (Agent Trace modal) including its content.
   - Remove the `Dialog` import from this file.
   - Keep the decorative hero trace SVG as a non-interactive accent (still reduced-motion compliant).
4. **Fix GSAP timeline**
   - Remove the `.fromTo(metaRef.current, ...)` step at lines 93–97.
   - Adjust the offset on the next step (`.fromTo(artRef.current, ...)` at line 99) — change `"-=0.5"` to `"-=0.3"` or similar so the art entrance still overlaps naturally with the CTAs step.
   - Verify the timeline still chains correctly with 5 steps (badges → headline → subhead → CTAs → art) instead of 6.
5. **Defer network-code CTA decision**
   - Leave the secondary CTA in place for now; it will be addressed in Phase 8c when the “network code” becomes referral tracking and discounts move to Stripe.
6. **Update landing tests**
   - In `z2a/landing.spec.ts`:
     - Remove assertions that locate `[data-testid="agent-trace-trigger"]`.
     - Remove assertions that open/close the Agent Trace dialog (`[data-testid="agent-trace-dialog"]`).
     - Ensure anchored sections + sticky apply bar behavior assertions remain.
   - In `z2a/reduced-motion.spec.ts`:
     - Verify it doesn't depend on the Agent Trace trigger. It tests marquee + hero GSAP behavior — should still pass. Run to confirm.
7. **Smoke test**
   - `npm run lint && npm run typecheck && npm run build`
   - `npm run test:e2e` (or the landing/reduced-motion subset)

## Validation (RED TEAM)
- `git grep "metaRef"` returns zero results in `Hero.tsx` after removal.
- `git grep "traceOpen"` returns zero results in `Hero.tsx`.
- `git grep "traceRef"` still exists (decorative hero trace stays), but no dialog-trigger selectors remain.
- `git grep "agent-trace-trigger"` returns zero results across `src/` and `z2a/`.
- GSAP timeline has exactly 5 `.fromTo()` calls (down from 6).
- `npm run lint` — no unused imports/variables.
- `npm run test:e2e` — landing + reduced-motion specs pass.

## Output
Hero no longer shows the header tiles or Agent Trace dialog; GSAP timeline is clean; landing Playwright tests updated. Playwright execution is blocked in this environment due to missing Playwright browsers.

## Handoff
- Proceed to Phase 8b to simplify Speakers (remove dialog/bullets/plaque and link to LinkedIn).

## Progress This Turn (Terminus Maximus)
- Work done:
  - Removed hero meta pill row (Deposit/Stripe/Refund/Location/Instructor/Agent Trace).
  - Removed Agent Trace dialog and all related state from the hero.
  - Updated landing Playwright spec to remove Agent Trace assertions/tests.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e:prod` — fail (missing Playwright browser executable; cannot download in this environment)
- Blockers:
  - Playwright browsers are not installed and `npx playwright install` cannot complete in this sandbox → run `npx playwright install` locally and rerun `npm run test:e2e:prod`.
- Next concrete steps:
  - Execute Phase 8b (Speakers simplification + test updates).
