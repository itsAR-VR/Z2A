# Phase 2e — QA + Deploy Checklist (Playwright, Perf, Vercel)

## Focus
Define concrete verification steps so implementation can be tested and shipped quickly.

## Inputs
- Implemented site + funnel (from Phase 2b–2d).

## Work
1. Playwright checks:
   - page loads, no fatal console errors
   - anchor nav works (desktop + mobile)
   - reduced-motion path works
   - checkout start → redirects to Stripe (test mode)
   - webhook updates DB record (smoke test with Stripe CLI forward)
2. Visual artifacts:
   - screenshots across 3 breakpoints
   - short scroll recording for motion review
3. Perf + a11y:
   - ensure smooth scroll does not regress on mid-tier laptops
   - avoid layout shift for hero and key sections
4. Deployment:
   - Vercel env vars list
   - Supabase and Stripe setup checklist
   - post-deploy smoke test steps

## Output
- A runnable QA checklist and deployment checklist that closes the loop.

## Handoff
Once Phase 2e is complete, proceed to implementation execution (Phase 3) using `phase-implement`.

