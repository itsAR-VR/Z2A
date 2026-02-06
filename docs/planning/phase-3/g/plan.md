# Phase 3g — App Scaffold (Next.js + Tailwind + Prisma + Stripe)

## Focus
Create the minimum production-grade app scaffold needed to implement the Phase 3 site + funnel in subsequent subphases.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ia-copy-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/design-motion-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/funnel-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/qa-deploy-checklist.md`
- `/Users/AR180/Desktop/Codespace/Z2A/.env.local` (already configured)
- `/Users/AR180/Desktop/Codespace/Z2A/.vercel/project.json` (already linked)

## Work
1. Scaffold Next.js App Router project in-repo (TypeScript).
2. Add styling baseline:
   - Tailwind (or equivalent) + CSS variables for the Phase 3 token system.
   - `prefers-reduced-motion` hook/utility (global).
3. Add Prisma:
   - `prisma/schema.prisma` models per Phase 3d.
   - Prisma ORM v7 config (`prisma.config.ts`) and generated client output path.
   - `src/lib/db.ts` Prisma client (server-only) using `@prisma/adapter-pg`.
4. Add Stripe SDK + server helper:
   - `src/lib/stripe.ts` (server-only client).
5. Add route structure (no UI polish yet):
   - `POST /api/apply` (creates attendee + returns Checkout URL)
   - `POST /api/stripe/webhook` (signature verify + idempotent updates)
   - `/api/admin/*` list/export endpoints (basic auth)
5. Add repo hygiene:
   - Expand `.gitignore` for Node/Next/Prisma artifacts.
   - Add `.env.example` documenting required env vars (no secrets).
6. Add baseline scripts:
   - `lint`, `build`, `dev`, `start`, `prisma:*` helpers.

## Output
- A working Next.js scaffold that builds and can be extended for the landing/apply/admin flows.
- Implemented backend/funnel foundations (no UI polish).
  - Key files:
    - `package.json`, `next.config.ts`, `src/app/*`
    - `prisma/schema.prisma`, `prisma.config.ts`
    - `src/lib/env.ts`, `src/lib/db.ts`, `src/lib/stripe.ts`
    - `src/app/api/apply/route.ts`
    - `src/app/api/stripe/webhook/route.ts`
    - `src/app/api/admin/attendees/route.ts`
    - `src/app/api/admin/attendees/export/route.ts`

## Handoff
Proceed to Phase 3h to produce an in-depth UI + micro-animation playbook for the follow-on UI agent.

## Validation (RED TEAM)
- `npm run lint` runs (pass expected).
- `npm run build` runs (pass expected).
- `npx prisma validate` passes.
- If DB connectivity is available: `npx prisma db push` succeeds.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Bootstrapped Next.js scaffold and added foundational routes for apply, Stripe webhook, and admin APIs (UI deferred).
  - Implemented Prisma ORM v7 configuration (`prisma.config.ts`) and generated client output.
  - Validated lint, typecheck, build, and DB sync.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass (warnings: workspace-root inference; middleware deprecation)
  - `npm run prisma:generate` — pass
  - `npm run db:push` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Produce UI + motion execution playbook (Phase 3h) for follow-on agent.
