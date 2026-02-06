# Phase 5e — UI Implementation Checklist (Public + Admin)

## Focus
Provide a file-level implementation checklist for the follow-on agent to build:
- Public pages (`/`, `/apply`, `/apply/success`)
- Full ops admin UI (`/admin`) including referral code management and audit logs

## Inputs
- Phase 5 handoff doc: `/Users/AR180/Desktop/Codespace/Z2A/docs/planning/phase-5/handoff.md`
- Phase 5c admin APIs
- Phase 5d motion primitives
- Existing apply endpoint: `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/apply/route.ts`

## Work
1. Component inventory (public):
   - Nav + overlay menu, section wrappers, cards, buttons, badges, accordion, speaker cards, forms.
2. Public pages:
   - `/` anchored IA including `#speakers` after `#why`.
   - `/apply` form wired to API and network code hidden toggle.
   - `/apply/success` confirmation.
3. Admin pages:
   - Attendees table + filters + details + status edits + notes + CSV export.
   - Referral codes CRUD + audit log viewer.
4. Assets:
   - Use `/public/speakers/*` and company logo permissions.

## Output
- A checklist that makes UI implementation executable without further clarification.

## Handoff
Phase 5f runs QA and confirms acceptance criteria.

