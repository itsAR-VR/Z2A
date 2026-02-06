# Phase 5b — Spec Deltas (IA/Copy + Motion Playbook + Speakers)

## Focus
Update the canonical Phase 3 specs to incorporate the Phase 4 requirements (speakers + new proof line + robust motion stack + admin motion inventory) while keeping offer mechanics locked.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ia-copy-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/design-motion-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ui-motion-implementation-playbook.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/image2-2-1.jpeg`

## Work
1. IA/copy:
   - Add `#speakers` after `#why`.
   - Add speakers section copy (two speaker cards):
     - Aadil: existing content.
     - Abdur: “Guest speaker · Zero Risk Growth (cold2close.ai)”, bullets (age/dropout/startup at 16), content description, LinkedIn link.
     - Award name: transcribe from `docs/image2-2-1.jpeg` verbatim.
   - Replace the TBD proof line in `#why` with:
     - “Attendees leave knowing how to build a production-ready enterprise-grade workflow that leverages AI agents to repeatably automate work.”
2. Motion playbook:
   - Update stack guidance: Lenis + GSAP/ScrollTrigger + CSS/IO.
   - Add `#speakers` motion mapping and admin UI motion inventory.
3. Asset path conventions:
   - `/public/speakers/abdur-headshot.*`
   - `/public/speakers/cold2close-logo.*`
   - `/public/speakers/aadil-headshot.*` (optional)

## Output
- Updated spec documents that match Phase 5’s consolidated requirements.

## Handoff
Phase 5c implements the admin foundations implied by the “full ops admin UI” requirement.

