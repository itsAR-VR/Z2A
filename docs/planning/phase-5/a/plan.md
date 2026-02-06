# Phase 5a — Master Handoff Doc (Single Source of Truth)

## Focus
Create one “handoff-ready” document that consolidates Phase 3 and Phase 4 into a single execution plan so a follow-on agent can build the website without context-hunting.

## Inputs
- Phase 3 specs:
  - `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ia-copy-spec.md`
  - `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/design-motion-spec.md`
  - `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/funnel-spec.md`
  - `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/qa-deploy-checklist.md`
  - `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ui-motion-implementation-playbook.md`
- Speaker award image:
  - `/Users/AR180/Desktop/Codespace/Z2A/docs/image2-2-1.jpeg`
- Backend/API reality (Phase 3 scaffold):
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/apply/route.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/stripe/webhook/route.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/route.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/export/route.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/middleware.ts`

## Work
1. Create `docs/planning/phase-5/handoff.md` containing:
   - Summary
   - Current repo state (what already exists)
   - Locked decisions
   - Page deliverables
   - Public API contracts
   - Required env vars
   - Speaker section requirements (`#speakers`, Abdur details, award name transcription rule)
   - Motion stack and micro-animation inventory (Tier 1 + Tier 2)
   - Reduced-motion rules (non-negotiable)
   - File-level implementation steps for public + admin
   - Referral code seeding approach
   - QA/acceptance checklist
2. Ensure the handoff doc explicitly reflects Phase 5 decisions (Lenis ON desktop, admin full, `#speakers` present).

## Output
- `/Users/AR180/Desktop/Codespace/Z2A/docs/planning/phase-5/handoff.md`

## Handoff
Phase 5b updates the canonical IA/motion playbook docs (or appends a Phase 5 delta) to match the handoff.

