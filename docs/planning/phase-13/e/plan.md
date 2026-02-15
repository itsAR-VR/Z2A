# Phase 13e - Metadata, Config, and Apply-Flow Alignment

## Focus
Align metadata and supporting configuration with the new multi-entrypoint IA, and preserve funnel continuity from apply back to individuals context.

## Inputs
- `docs/planning/phase-13/plan.md`
- Outputs from `13b`, `13c`, and `13d`
- `docs/planning/phase-14/phase-13-integration.md`
- Current metadata in `src/app/layout.tsx`
- Current apply navigation in `src/app/apply/page.tsx`

## Work
- Update global metadata in `src/app/layout.tsx` to brand-level defaults.
- Add route-level metadata:
  - `src/app/page.tsx` (Home/vision)
  - `src/app/individuals/page.tsx` (workshop/individuals)
  - `src/app/businesses/page.tsx` (managed B2B offer)
- Add configurable business CTA source via `NEXT_PUBLIC_BUSINESS_CALENDLY_URL`.
- Implement deterministic fallback when env var is missing (single defined fallback target `#contact`).
- Update apply-page logo/back-nav target to `/individuals`.

## Output
- Global metadata in `src/app/layout.tsx` is now brand-level (non-Toronto-specific).
- Route-level metadata exists on:
  - `src/app/page.tsx`
  - `src/app/individuals/page.tsx`
  - `src/app/businesses/page.tsx`
- `NEXT_PUBLIC_BUSINESS_CALENDLY_URL` support added via `src/lib/config.ts` with deterministic fallback.
- Apply navigation links now return to `/individuals`.

## Handoff
Subphase `13f` updates automated coverage to validate new routes, nav behavior, and menu-focus expectations.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Updated layout/page metadata split per route intent.
  - Added public business calendly config read path and fallback.
  - Updated apply top-nav links to `/individuals`.
- Commands run:
  - `npm run lint` - pass.
  - `npm run typecheck` - pass.
- Blockers:
  - None.
- Next concrete steps:
  - Complete Playwright suite migration for `/`, `/individuals`, `/businesses`.
