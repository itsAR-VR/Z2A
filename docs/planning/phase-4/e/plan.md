# Phase 4e — Admin UI Implementation Checklist (`/admin` + Referral Codes + Audits)

## Focus
Provide an engineer-ready checklist for building the full ops admin UI on top of Phase 4b’s APIs, with quality motion and safe UX for ops actions.

## Inputs
- Existing admin auth: `/Users/AR180/Desktop/Codespace/Z2A/src/middleware.ts`
- Existing admin list/export endpoints:
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/route.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/export/route.ts`
- Phase 4b output: attendee update API + referral code CRUD + audit endpoints
- Phase 4c output: admin motion micro-interactions

## Work
1. Admin IA:
   - Attendees page:
     - table, search, filters
     - details drawer
     - edit controls: seat status, application status, internal notes
     - CSV export
   - Referral codes page:
     - create code
     - activate/deactivate with required reason
     - audit log viewer (newest first)
2. UX hardening:
   - confirm modals for deactivation
   - optimistic UI only where safe; otherwise show “saving…” states
   - clear error states for duplicates, invalid updates, auth failures
3. Motion:
   - minimal but polished transitions for table interactions and modals
   - reduced-motion: disable movement; keep state changes instant

## Output
- Admin UI build checklist:
  - pages, components, API wiring, validation rules
  - required data columns
  - audit log display conventions

## Handoff
Phase 4f QA must validate admin edits and audit logs end-to-end.

