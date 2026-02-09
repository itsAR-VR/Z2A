# Phase 7d — Apply (Onboarding + Clarify + Harden + Adapt)

## Focus
Reduce friction and increase trust in the apply flow while maintaining conversion speed. Add lightweight onboarding cues, improve error recovery, and ensure the experience is excellent on mobile.

## Inputs
- 7b motion/theming primitives
- 7a findings for apply (`src/app/apply/page.tsx`, `src/app/apply/success/page.tsx`)
- Existing tests: `z2a/apply.spec.ts`

## Work
1. Clarify
   - Tighten microcopy in `src/app/apply/page.tsx` around:
     - Stripe redirect explanation ("You'll be taken to Stripe to complete your $100 deposit.")
     - Refund terms ("Full refund available through end of Day 2.")
     - Network code field helper text
   - Ensure labels and helper text are consistent with landing page copy.
2. Onboard
   - Add an optional "example use cases" helper (clickable chips or expandable examples) near the use case textarea in `src/app/apply/page.tsx`.
   - Keep onboarding skippable and non-blocking — chips insert text, don't lock the field.
3. Harden
   - On submit with errors: programmatically `focus()` the first invalid field and provide an `aria-live="assertive"` form-level error summary for screen readers.
   - Improve network/server error state with a visible retry button (not just a console error).
   - Prevent double-submission: disable submit button + show spinner while request is in-flight.
   - Handle slow network: add a timeout (e.g., 15s) with a user-facing message if Stripe redirect doesn't happen.
4. Adapt (mobile)
   - Verify all touch targets >= 44px, spacing works at 320px width, no horizontal scroll.
   - Ensure the network code deep-link (`?network=1`) reveal and any stepper remain readable on small screens.
5. Motion
   - Keep apply motion minimal: tokenized `RevealOnScroll variant="soft"` for form sections only.
   - No GSAP on the apply page; CSS transitions only.
6. Verification
   - Update `z2a/apply.spec.ts` to cover:
     - Example use case chips (if added): click chip → text appears in textarea.
     - Error summary: submit empty form → error summary visible + first field focused.
     - Double-submit prevention: submit button disabled after first click.

## Validation (RED TEAM)
- No new GSAP imports in `src/app/apply/page.tsx`.
- Form error summary uses `aria-live="assertive"`.
- Submit button is disabled during submission.
- `npm run lint && npm run typecheck && npm run build && npm run test:e2e` pass.

## Assumptions / Open Questions (RED TEAM)
- Assumption: The "example use cases" helper is additive UI only — no backend changes needed. (confidence ~95%)
- Assumption: Stripe redirect timeout (15s) is appropriate. If Stripe is consistently slower, increase to 30s. (confidence ~90%)

## Output

Completed artifacts:
- Apply UX clarity + hardening:
  - Validation summary (`aria-live="assertive"`) + first-invalid focus
  - Example use-case chips (insert text, non-blocking)
  - Double-submit prevention + clearer redirect state + retry affordance
  - Slow network timeout handling
  - Refined microcopy around Stripe deposit + refund terms
  - (file: `src/app/apply/page.tsx`)
- Updated Playwright coverage:
  - Chips insert text
  - Empty submit shows summary + focuses first field
  - Double-submit prevention during in-flight request
  - (file: `z2a/apply.spec.ts`)

## Handoff
Subphase 7e should bring admin UI up to the same quality bar: tokenized semantics, a11y-first behaviors, and consistent dialog/focus patterns.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented apply onboarding chips and hardened submission states (validation summary, focus-first-invalid, timeout/retry, redirect help).
  - Updated Playwright tests to cover chips + focus behavior + double-submit prevention.
- Commands run:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test z2a/apply.spec.ts --reporter=list` — pass
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — pass
  - `npm run lint && npm run typecheck && npm run build` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Execute 7e admin a11y + dialog normalization, then proceed to 7f final polish + review.
