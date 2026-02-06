# Phase 5f — QA + Launch Readiness

## Focus
Validate that the website is correct, polished, and safe to deploy.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/qa-deploy-checklist.md`
- Phase 5 handoff doc: `/Users/AR180/Desktop/Codespace/Z2A/docs/planning/phase-5/handoff.md`

## Work
1. Engineering checks:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
2. Stripe:
   - Stripe CLI smoke for webhook events (checkout.session.completed, charge.refunded).
3. Playwright smoke (recommended minimum):
   - Landing loads; anchors exist.
   - Reduced motion renders correctly.
   - Apply form validation and submit behavior (mock/test env).
   - Admin auth gate + page loads.
4. Performance + accessibility:
   - No CLS on hero/speakers/pricing.
   - No scroll jank on desktop.
   - Keyboard navigability (nav/menu/accordion/admin forms).

## Output
- A checklist with pass/fail evidence and a go/no-go decision for deploy.

