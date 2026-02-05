# Phase 3f — QA + Deployment Checklist (Playwright, Perf, Vercel)

## Focus
Define test coverage and deployment steps for a stable v1 launch.

## Inputs
- Implemented site + funnel (post Phase 3b–3e).
- `docs/phase-3/funnel-spec.md` + `docs/phase-3/ops-gtm-assets.md`.

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
   - Supabase Postgres + Prisma schema/migrations
   - Stripe webhook secret + product/price setup

## Output
- `docs/phase-3/qa-deploy-checklist.md` runnable QA plan + deployment checklist for v1 launch.

## Validation (RED TEAM)
- Checklist includes Playwright + Stripe CLI smoke tests and required env vars.
- Screenshot + motion review steps are explicit and reproducible.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Drafted `docs/phase-3/qa-deploy-checklist.md` with QA, Stripe CLI, and deploy requirements.
- Commands run:
  - `cat <<'EOF' > docs/phase-3/qa-deploy-checklist.md` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Run Phase 3 review (lint/build/db:push) once implementation begins.
