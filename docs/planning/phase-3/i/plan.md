# Phase 3i — Apply UI Wiring (Deposit Checkout Backend Already Scaffolded)

## Focus
Implement the application form and create Stripe Checkout sessions for the $100 deposit.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/funnel-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ia-copy-spec.md`

## Work
1. Build the `/apply` UI form with minimum fields (Phase 3d).
2. On submit:
   - call `POST /api/apply`
   - redirect browser to returned `checkoutUrl`
3. Implement `/apply/success` UI (calm confirmation + next steps).
4. Ensure copy and pricing mechanics match `docs/phase-3/ia-copy-spec.md`.

## Output
- Backend scaffold exists:
  - `src/app/api/apply/route.ts` (attendee upsert + Stripe Checkout session creation)
  - `src/app/apply/page.tsx` (placeholder)
  - `src/app/apply/success/page.tsx` (placeholder)
- Follow-on agent implements the actual `/apply` UI and wiring (no backend changes required unless UX expands fields).

## Handoff
Proceed to Phase 3j only for validation (Stripe CLI) and any event-type adjustments.

## Validation (RED TEAM)
- Seat cap guard: block checkout creation if cap reached.
- Form validation blocks obviously invalid submissions (missing email/name).

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented backend deposit checkout creation at `POST /api/apply`.
  - Added placeholder `/apply` and `/apply/success` routes (UI deferred).
- Commands run:
  - `npm run build` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Follow-on agent builds the actual form UI per `docs/phase-3/ui-motion-implementation-playbook.md`.
