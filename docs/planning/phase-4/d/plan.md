# Phase 4d — Public UI Implementation Checklist (`/`, `/apply`, `/apply/success`)

## Focus
Provide an engineer-ready checklist for building the public pages with the agreed IA, copy, and motion mapping.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ia-copy-spec.md` (updated by Phase 4a)
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ui-motion-implementation-playbook.md` (updated by Phase 4a/4c)
- Apply endpoint: `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/apply/route.ts`

## Work
1. Component inventory:
   - layout shell, sticky nav, mobile overlay menu (focus trap)
   - section wrapper + headings
   - button, card, badge
   - accordion (FAQ)
   - speaker card (image + logo + award line)
2. Page structure:
   - `/` is a single scroll page with anchors:
     - `#why`, `#speakers`, `#outcomes`, `#how`, `#agenda`, `#pricing`, `#faq`, `#apply`
3. Apply wiring:
   - `/apply` form posts to `POST /api/apply` and redirects to `checkoutUrl`.
   - network code is hidden behind a toggle reveal (matches IA spec).
4. Assets:
   - use `/public/speakers/*` and `/public/awards/*` paths defined in Phase 4a.
5. Motion mapping:
   - apply Phase 4c motion primitives + playbook mapping to each section, including `#speakers`.

## Output
- A build checklist with:
  - component list
  - per-section rendering responsibilities
  - API wiring details
  - asset path conventions

## Handoff
Phase 4f QA plan must cover anchor nav, reduced motion, and apply redirect behavior end-to-end.

