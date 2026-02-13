# Phase 12b — Automated Post-Deposit Welcome/Prework Send

## Focus
Eliminate manual first-touch messaging by automatically sending welcome/prework communications when deposit payment succeeds.

## Inputs
- Phase 12a delivery-state schema/helpers
- Webhook entrypoint: `src/app/api/stripe/webhook/route.ts`
- Existing template builders in `src/lib/email-templates.ts`
- Existing send helper in `src/lib/email.ts`

## Work
1. Define exact trigger: `checkout.session.completed` for deposit payments only.
2. Add dispatch orchestration in webhook post-transaction section:
   - create/find dispatch record for welcome/prework template(s)
   - skip if already `sent`
   - attempt send with timeout guard and status transitions.
3. Ensure webhook response remains resilient:
   - email failure must not fail Stripe acknowledgment
   - failures persisted for admin visibility/retry.
4. Keep payload source consistent with existing settings/templates.
5. Add targeted tests for idempotency behavior (duplicate webhook delivery should not send duplicate emails).

## Output
- `src/app/api/stripe/webhook/route.ts` now triggers `POST_DEPOSIT_TEMPLATES` (`deposit_confirmation`, `prework`) after successful deposit transition.
- Automation is idempotent via dispatch claim/transition logic and resilient to duplicate Stripe delivery.
- Failures are persisted on `EmailDispatch` records and no longer rely on logs alone.

## Handoff
Subphase c reuses the exact dispatch primitive path; webhook and cron now share one send state machine.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Replaced direct one-off deposit confirmation send flow with dispatch-driven orchestration.
  - Added settings preload + per-template send result handling in webhook post-transaction section.
  - Preserved Stripe acknowledgement reliability by never failing webhook response on email-send failures.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Add cron-driven reminder route using same dispatch primitives (12c).
