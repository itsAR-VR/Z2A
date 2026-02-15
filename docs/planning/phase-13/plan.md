# Phase 13 - Multi-Entrypoint Public IA (`/`, `/individuals`, `/businesses`)

## Purpose
Restructure the public website into three clear entrypoints (Home, Individuals, Businesses) while preserving the current individuals funnel and adding page-aware navigation that supports both intra-page anchors and cross-page switching.

## Context
- The current marketing experience is fully mounted on `src/app/page.tsx` and functions as the individuals funnel.
- User direction is explicit:
  - `"/"` becomes Home (vision + pathways).
  - `"/individuals"` becomes the existing long-form page.
  - `"/businesses"` becomes a managed-service B2B page.
  - Menu must support cross-page navigation (Home/Individuals/Businesses), and top links must navigate sections for the current page.
  - No About page is needed.
- Positioning and copy constraints for `/businesses` are already grounded in the added material (Sahil thread, Workshop Market Analysis, Hormozi references) and should be implemented as concrete page structure and pricing presentation.
- Phase 14 artifacts are now available and are canonical for copy/pricing decisions:
  - `docs/planning/phase-14/offer-pricing-rules.md`
  - `docs/planning/phase-14/copy-spec.md`
  - `docs/planning/phase-14/phase-13-integration.md`
- Placeholder decision for business CTA is set: use env-configurable Calendly URL with deterministic fallback.

## Concurrent Phases
| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 10 | Complete | Public marketing UI surfaces (`src/components/Nav.tsx`, `src/app/page.tsx`, section components, `z2a/landing.spec.ts`) | Build on existing visual language; do not revert prior trust/copy refinements unless explicitly required by new IA. |
| Phase 12 | Active/Recent | Planning/docs churn in `docs/planning/*` only (no direct route/nav overlap) | Independent implementation paths; avoid touching Phase 12 operational email scope. |

## Objectives
* [x] Establish route split for Home, Individuals, and Businesses.
* [x] Implement a page-aware nav system with both anchor navigation and cross-page menu links.
* [x] Ship business page positioning and pricing tiers with configured CTA behavior.
* [x] Align metadata and apply-flow navigation with the new IA.
* [x] Update Playwright coverage to match route and menu behavior changes.

## Constraints
- Preserve existing individuals section IDs and composition for anchor continuity:
  - `top`, `why`, `speakers`, `how`, `agenda`, `pricing`, `faq`, `apply`.
- Home must include section IDs:
  - `top`, `vision`, `programs`, `principles`.
- Businesses must include section IDs:
  - `top`, `who`, `what`, `pricing`, `faq`, `contact`.
- Menu must prioritize page switching and include `Home`, `Individuals`, `Businesses`; no About link.
- Businesses pricing must render in high-to-low order:
  - `Ongoing AI Partnership` -> `Implementation Sprint` -> `Discovery Workshop`.
- CTA behavior by page:
  - Individuals: `Apply` -> `/apply`
  - Home: `Explore Individuals` -> `/individuals`
  - Businesses: `Book a call` -> `NEXT_PUBLIC_BUSINESS_CALENDLY_URL` with deterministic fallback `#contact`.
- Metadata must be route-specific and no longer Toronto-specific at global layout level.
- Preserve existing accessibility behavior in Nav (focus management, ESC close, focus trap, reduced-motion compatibility).

## Success Criteria
- Visiting routes:
  - [x] `"/"` renders Home with vision and two pathway links.
  - [x] `"/individuals"` renders the current individuals flow and anchor sections.
  - [x] `"/businesses"` renders B2B content with tiered pricing and CTA.
- Nav behavior:
  - [x] Top nav links are scoped to current page section anchors.
  - [x] Menu overlay includes cross-page links and current-page anchors.
  - [x] First focused menu link is in the Pages group.
- Funnel continuity:
  - [x] Apply page brand link returns to `/individuals` context.
- Test coverage:
  - [x] Existing landing specs target `/individuals`.
  - [x] New specs cover `/` and `/businesses`.
  - [x] Menu-focus assertions reflect Pages-first behavior.

## Subphase Index
* a - Route split and individuals migration scaffold
* b - Home page implementation (`/`)
* c - Businesses page implementation (`/businesses`)
* d - Page-aware navigation refactor
* e - Metadata/config/apply-flow alignment
* f - Playwright coverage and assertion updates

## RED TEAM Findings (Gaps / Weak Spots)
- Default Playwright base URL points to production (`https://zerotoagent.com`), so route/test changes fail until deployment.
  - Mitigation: local validation path standardized in `13f` using:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- <specs>`

## Phase Summary (running)
- 2026-02-15 — Executed Phase 13 route split, page-aware nav/menu refactor, metadata/config alignment, and Playwright migration for Home/Individuals/Businesses (files: `src/app/page.tsx`, `src/app/individuals/page.tsx`, `src/app/businesses/page.tsx`, `src/components/Nav.tsx`, `src/lib/config.ts`, `src/app/layout.tsx`, `src/app/apply/page.tsx`, `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`, `z2a/speakers.spec.ts`, `z2a/home.spec.ts`, `z2a/businesses.spec.ts`).
- 2026-02-15 — Completed Phase 13 review with lint/typecheck/build passing and full local Playwright route suite passing (files: `docs/planning/phase-13/review.md`).
