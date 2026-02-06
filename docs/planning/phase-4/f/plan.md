# Phase 4f — QA + Acceptance Criteria (Public + Admin)

## Focus
Define a runnable QA plan and acceptance criteria that ensures the UI agent ships a polished, accessible, low-jank experience.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/qa-deploy-checklist.md`
- Phase 4a–4e outputs (copy + motion + admin API/UI checklists)

## Work
1. Public QA:
   - reduced motion: no Lenis, no scroll-scrub; content readable and usable
   - anchors: correct scroll targets and active nav highlight
   - mobile nav: focus trap, ESC closes, focus restore
   - apply form: validation + redirect to Stripe Checkout
2. Admin QA:
   - basic auth behavior
   - attendee list loads + filters work
   - edit flows persist and reflect correctly on reload
   - referral code create/deactivate/reactivate writes audit logs with actor + reason
3. Performance + a11y gates:
   - no CLS on hero/speakers/pricing
   - no scroll jank on desktop
   - keyboard navigation for nav/menu/accordion/admin forms
4. Automated smoke (optional but recommended):
   - Playwright smoke suite for:
     - `/` anchors
     - `/apply` submit → expects 200 with checkoutUrl (mock or test env)
     - `/admin` basic auth gate + page loads

## Output
- A concrete QA checklist and acceptance rubric for:
  - public UX
  - admin UX
  - reduced motion
  - performance and accessibility

## Handoff
Once implemented, run `npm run lint`, `npm run typecheck`, `npm run build`, then execute the QA checklist before deploy.

