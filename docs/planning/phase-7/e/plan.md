# Phase 7e — Admin (A11y + Tokenization + Hardening)

## Focus
Bring `/admin` up to the same premium, accessible, tokenized design system used on the public site. Remove hard-coded status colors, fix keyboard/a11y gaps, and normalize modal/tab patterns.

## Inputs
- 7b semantic + motion tokens
- 7a findings for:
  - `src/app/admin/page.tsx`
  - `src/components/admin/AttendeeTable.tsx`
  - `src/components/admin/AttendeeDetail.tsx`
  - `src/components/admin/ReferralCodeTable.tsx`
  - `src/components/admin/AuditLogViewer.tsx`

## Work
1. A11y: tabs (`src/app/admin/page.tsx`)
   - Refactor `TabButton` component (line 48) to use proper ARIA:
     - Wrap tab buttons in a `<div role="tablist" aria-label="Admin sections">`.
     - Each tab button: `role="tab"`, `aria-selected={active}`, `aria-controls="panel-{id}"`, `id="tab-{id}"`.
     - Tab content areas: `role="tabpanel"`, `aria-labelledby="tab-{id}"`, `id="panel-{id}"`.
   - Add arrow-key navigation between tabs (Left/Right to switch, Home/End for first/last).
2. A11y: tables + row interaction (`src/components/admin/AttendeeTable.tsx`)
   - Remove `onClick` from `<tr>` at line 96.
   - Add an explicit, focusable `<button>` or `<a>` within the first cell (e.g., attendee name as a link/button) that opens the detail view.
   - Ensure keyboard users can Tab to the button and press Enter/Space to open detail.
3. Dialog normalization (`src/components/admin/AttendeeDetail.tsx`)
   - Replace the bespoke overlay (`fixed inset-0 bg-black/60` at line 83) with the shared `<Dialog>` component from `src/components/Dialog.tsx`.
   - This gains: ESC to close, focus trap, scroll lock with scrollbar compensation, `role="dialog"` + `aria-modal="true"`, focus restore on close.
   - Pass `labelledBy` pointing to the "Attendee Details" heading, `onClose` to `props.onClose`.
   - Remove the manual close button X SVG and replace with a close button inside the Dialog panel (or keep, but ensure it's the first focusable element).
4. Tokenization / colorize (already partially done in 7b for tokens; this step uses them)
   - If 7b did not already replace admin status colors, do it here.
   - Verify: zero instances of `text-green-400`, `text-yellow-400`, `text-red-400` in `src/components/admin/`.
   - Ensure status badges include text labels (not color-only meaning). Already present — verify no regression.
5. Harden
   - Add empty state UI for AttendeeTable (no results after search/filter).
   - Add loading state for AttendeeDetail fetch (already has "Loading..." text — upgrade to a skeleton or spinner for consistency).
   - Add error state for AttendeeDetail fetch failure (currently silently swallows errors at line 53 — show user-facing error message with retry button).
   - Long text handling: add `min-w-0` and `truncate`/`break-words` to table cells and detail fields where content could overflow.
6. Verification
   - Playwright admin tests: use `httpCredentials` in test config (read from `process.env.ADMIN_BASIC_AUTH_USER` and `process.env.ADMIN_BASIC_AUTH_PASS` or `process.env.ADMIN_BASIC_AUTH_PASSWORD` via `.env.local`). Do NOT commit credentials.
   - Test tab semantics: verify `role="tablist"` exists, clicking "Referral Codes" tab switches panel.
   - Test dialog: open attendee detail → verify `role="dialog"` exists → ESC closes → focus restores.
   - Auth setup is required — debug `httpCredentials` until it works with the Basic Auth middleware in `src/middleware.ts`.

## Validation (RED TEAM)
- `src/app/admin/page.tsx` contains `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`.
- `src/components/admin/AttendeeTable.tsx` has zero `<tr onClick>` patterns.
- `src/components/admin/AttendeeDetail.tsx` imports and uses `<Dialog>` from `src/components/Dialog.tsx`.
- Zero instances of `text-green-400`/`text-yellow-400`/`text-red-400` in admin components.
- `AttendeeDetail` error state shows a visible error message (not silent catch).
- `npm run lint && npm run typecheck && npm run build` pass.

## Assumptions / Open Questions (RED TEAM)
- Assumption: `httpCredentials` in Playwright will work with the existing Basic Auth middleware in `src/middleware.ts`. (confidence ~92%) — **User confirmed E2E required.**
  - Mitigation: If middleware rejects credentials, debug the auth header format rather than falling back to manual QA.

## Output

Completed artifacts:
- Admin tabs now include proper ARIA tab semantics + keyboard navigation (Left/Right/Home/End).
  - (file: `src/app/admin/page.tsx`)
- Attendee table rows are no longer click-only:
  - Replaced `<tr onClick>` with an explicit Name button that opens details (keyboard accessible).
  - (file: `src/components/admin/AttendeeTable.tsx`)
- Attendee detail overlay now uses the shared `<Dialog>` component:
  - Gains ESC close, focus trap, scroll lock, focus restore, `role="dialog"` semantics.
  - Added visible load/save error states with retry messaging.
  - (file: `src/components/admin/AttendeeDetail.tsx`)
- Added deterministic admin E2E tests (mocked admin API responses) using `httpCredentials` from `.env.local`:
  - Tabs semantics + panel switching
  - Attendee detail dialog open/ESC close/focus restore
  - (file: `z2a/admin.spec.ts`)

## Handoff
Subphase 7f performs a final optimize/polish pass across all surfaces and locks in reduced-motion + nav regression coverage, then writes the final phase review doc.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented admin a11y upgrades (ARIA tabs) and made attendee details keyboard accessible.
  - Migrated attendee detail overlay to shared dialog and added user-visible error handling.
  - Added admin Playwright tests with auth + mocked APIs for determinism.
- Commands run:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — pass
  - `npm run lint && npm run typecheck && npm run build` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Execute 7f: expand reduced-motion coverage, add menu regression tests, and produce `docs/planning/phase-7/review.md`.
