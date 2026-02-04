# Phase 1e — QA, Performance, and Deployment Readiness

## Focus
Verify the site end-to-end (UX + motion + funnel), ensure it performs well, and prepare for deployment.

## Inputs
- Implemented site from Phases 1b–1d.
- Reference capture patterns for motion review.

## Work
1. Playwright E2E scenarios:
   - page loads without fatal console errors
   - anchor navigation reaches correct sections
   - reduced-motion path works (no broken layout/blocked interaction)
   - Apply form validation + successful submission
   - `/admin` gate + list/detail render
2. Visual review artifacts:
   - screenshots at 375×667, 768×1024, 1440×900
   - short scroll video capture for motion review
3. Performance and accessibility checklist:
   - lazy-load heavy media (hero video), compress assets, avoid scroll jank
   - keyboard navigation and focus states
4. Deployment plan (Vercel):
   - environment variables list
   - Supabase policies checklist
   - smoke-test steps post-deploy

## Output
- Test artifacts and a pass/fail report for acceptance criteria.
- Deployment checklist ready to execute.

## Handoff
If accepted, proceed to implementation execution (Phase 2) or iterate on motion/content based on review feedback.

