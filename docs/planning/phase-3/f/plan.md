# Phase 3f — QA + Deployment Checklist (Playwright, Perf, Vercel)

## Focus
Define test coverage and deployment steps for a stable v1 launch.

## Inputs
- Implemented site + funnel (post Phase 3b–3e).

## Work
1. **Playwright checks**
   - page load + no fatal console errors
   - anchor nav works (desktop + mobile)
   - reduced-motion mode renders correctly
   - CTA → Stripe redirect works in test mode
   - webhook updates DB (smoke test with Stripe CLI)
2. **Visual artifacts**
   - screenshots at 375×667, 768×1024, 1440×900
   - short scroll recording for motion review
3. **Perf + a11y**
   - prevent layout shift on hero/media
   - keyboard nav and focus states verified
4. **Deploy checklist**
   - Vercel env vars
   - Supabase schema + RLS (if used) or Prisma migration
   - Stripe webhook secret + product/price setup

## Output
- A runnable QA plan + deployment checklist for v1 launch.

