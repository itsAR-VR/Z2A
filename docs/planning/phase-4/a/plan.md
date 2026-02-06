# Phase 4a — IA/Copy + Motion Playbook Delta (Speakers + Proof Line)

## Focus
Update the canonical IA/copy + motion implementation guidance to reflect the new `#speakers` section and Abdur’s inclusion, while keeping Phase 3 offer mechanics locked.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ia-copy-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/design-motion-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ui-motion-implementation-playbook.md`
- Award photo to transcribe: `/Users/AR180/Desktop/Codespace/Z2A/docs/image2-2-1.jpeg`
- Speaker link: `https://linkedin.com/in/abdur-sajid`

## Work
1. IA structure update:
   - Add `#speakers` anchor to nav.
   - Insert `#speakers` after `#why`.
2. Copy updates:
   - Replace the current TBD proof line in `#why` with:
     - “Attendees leave knowing how to build a production-ready enterprise-grade workflow that leverages AI agents to repeatably automate work.”
   - Add a new `#speakers` section spec:
     - Two speaker cards (Aadil + Abdur).
     - Abdur label: **Guest speaker · Zero Risk Growth (cold2close.ai)**.
     - Abdur bullets: 20 years old; high school dropout; built first AI startup at 16.
     - Abdur content description: agentic engineering + implementation of AI workflows for production-ready platforms.
     - Abdur participation note: co-host content on Day 1 and Day 2 (also note in agenda section).
   - Award naming:
     - Transcribe the award name from `docs/image2-2-1.jpeg` and include it as a single credibility line in Abdur’s card.
3. Asset requirements:
   - Define the expected public asset paths (to be supplied later by the user):
     - `/public/speakers/abdur-headshot.*`
     - `/public/speakers/cold2close-logo.*`
     - `/public/speakers/aadil-headshot.*` (optional)
     - `/public/awards/openai-award.*` (optional; can be derived from the docs image)
4. Motion playbook updates:
   - Add `#speakers` motion mapping:
     - section reveal + card stagger
     - speaker image reveal (transform/opacity or clip)
     - award badge micro (very subtle; disabled in reduced motion)
   - Add admin UI micro-interactions section (table/filter/toast/modal patterns).

## Output
- Updated IA/copy spec (or a Phase 4 delta doc) containing:
  - section order including `#speakers`
  - Abdur speaker card content requirements
  - updated `#why` proof line
  - explicit asset path expectations
- Updated motion playbook sections for `#speakers` + admin UI motion inventory.

## Handoff
Phase 4b uses the admin UI requirements to define the exact DB/API deltas (internal notes + referral code audit logs).

