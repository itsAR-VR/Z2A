# Phase 14d Artifact - Phase 13 Integration Notes

## Objective
Make Phase 13 implementation deterministic by plugging in refined copy and decision rules from Phase 14 without ad-libbing.

## Canonical inputs Phase 13 must consume
- `docs/planning/phase-14/hormozi-corpus-index.md`
- `docs/planning/phase-14/offer-pricing-rules.md`
- `docs/planning/phase-14/copy-spec.md`

## Phase 13 insertion map

| Phase 13 subphase | Files | Required integration |
|---|---|---|
| `13a` route split | `src/app/page.tsx`, `src/app/individuals/page.tsx` | No copy decisions here beyond preserving existing individuals IDs. |
| `13b` home page | `src/app/page.tsx` | Implement Home `#vision`, `#programs`, `#principles` exactly from `copy-spec.md`. |
| `13c` businesses page | `src/app/businesses/page.tsx` | Implement `#top`, `#who`, `#what`, `#pricing`, `#faq`, `#contact` exactly from `copy-spec.md`; apply tier/order/risk rules from `offer-pricing-rules.md`. |
| `13d` nav refactor | `src/components/Nav.tsx` | Keep page-aware anchors and pages-first menu. Businesses CTA label/target must align with copy spec and fallback behavior. |
| `13e` metadata/config | `src/app/layout.tsx`, `src/lib/config.ts` or equivalent, `src/app/apply/page.tsx` | Add `NEXT_PUBLIC_BUSINESS_CALENDLY_URL` usage with deterministic fallback `#contact`; keep apply logo link to `/individuals`. |
| `13f` test updates | `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`, `z2a/home.spec.ts`, `z2a/businesses.spec.ts` | Lock routing changes and menu focus behavior; assert tier presence and order on `/businesses`. |

## Required copy/behavior assertions for tests
- `/`:
  - Home H1 exists.
  - Pathway links to `/individuals` and `/businesses` exist.
  - Menu includes pages links: Home, Individuals, Businesses.
- `/individuals`:
  - Existing anchor sections still present and scrollable.
  - Menu opens with first focus on first pages link, not section anchor.
- `/businesses`:
  - Sections exist: `#top`, `#who`, `#what`, `#pricing`, `#faq`, `#contact`.
  - Tiers render in anchor order:
    1. Ongoing AI Partnership
    2. Implementation Sprint
    3. Discovery Workshop
  - Refund line uses exact language:
    - `100% refund if you aren't satisfied`
  - Refund scope clarifier renders:
    - `Applies to the Discovery Workshop.`
  - `#who` is function-led (not vertical-led) per IBM-style positioning notes.
  - CTA exists with deterministic target (env URL or `#contact` fallback).

## Acceptance checklist (Phase 13 closeout)
- [ ] Route parity: `/`, `/individuals`, `/businesses` all render intended content.
- [ ] Nav parity: top links are page-local anchors; menu is pages-first cross-page switcher.
- [ ] No About page linked in header/menu.
- [ ] Businesses pricing tiers are present and ordered high-to-low.
- [ ] Refund language uses `100% refund if you aren't satisfied` where applicable.
- [ ] Playwright specs reflect new IA and menu focus behavior.

## Coordination notes
- Overlap expected with active Phase 13 docs and upcoming implementation files.
- Merge policy:
  - Phase 13 owns app/test code edits.
  - Phase 14 owns reasoning and copy specification artifacts.
  - If copy conflicts occur, Phase 14 artifacts are source of truth unless user overrides.
