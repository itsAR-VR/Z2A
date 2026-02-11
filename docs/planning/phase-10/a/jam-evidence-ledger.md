# Phase 10a Output — Jam Evidence Ledger (Mobile + Desktop)

## Scope
- Mobile Jam: `39d008ce-ff63-41e4-a1a7-62f023a53933` (390x844, Arc)
- Desktop Jam: `6d76b0f8-80fd-46a7-b5ec-f78d18a82816` (1333x863, Chromium)
- Target site: `https://www.zerotoagent.com/`

## Forensic Summary
- First-party technical reliability appears healthy in captured data (no first-party runtime blocker was observed).
- Dominant issues are UX/copy/trust sequencing and interaction confidence.
- Device split matters:
  - Mobile: menu motion + status copy ambiguity + first-screen scan friction.
  - Desktop: speaker credibility packaging + FAQ confidence burden + CTA feedback ambiguity.

## Evidence Ledger

| ID | Viewport | Funnel Stage | Finding | Evidence | Severity | Confidence | Likely Targets |
|----|----------|--------------|---------|----------|----------|------------|----------------|
| M-01 | Mobile | Navigation/menu | Menu transition feels harsh and repeatedly stress-tested | Repeated open/close cycles (~5 opens + 5 closes in ~30s), voiceover: transition is "a little bit harsh" | High | 0.84 | `src/components/Nav.tsx` |
| M-02 | Mobile | Hero trust | Status wording is ambiguous/inconsistent | Voiceover: "Admissions open here doesn't make sense" + mixed terms in UI (`Admissions live`, `Admissions open`, `Applications open`) | High | 0.88 | `src/components/sections/Hero.tsx`, `src/components/Nav.tsx`, `src/components/StickyApplyBar.tsx` |
| M-03 | Mobile | Hero composition | Vertical alignment concern in top stack | Voiceover indicates an element should be "a little bit higher" | Medium | 0.72 | `src/components/sections/Hero.tsx`, `src/components/Nav.tsx` |
| M-04 | Mobile | Trust scan | Key trust cues require more immediate readability | Repeated menu interaction before committing; trust/status scanning behavior | Medium | 0.70 | `Hero.tsx`, `Nav.tsx`, `StickyApplyBar.tsx` |
| D-01 | Desktop | Credibility/proof | Speaker section perceived as less professional | Voiceover: "some of these don't look professional enough" | High | 0.90 | `src/components/sections/Speakers.tsx` |
| D-02 | Desktop | Credibility/proof | Speaker cards feel uneven in bio depth and signal hierarchy | User commentary on variability and proof salience | High | 0.86 | `src/components/sections/Speakers.tsx` |
| D-03 | Desktop | FAQ confidence | FAQ repeatedly toggled to de-risk decisions | Multiple clicks around "Who is this for", "Do I need to be an engineer", reimbursement-related questions | Medium | 0.79 | `src/components/sections/FAQ.tsx` |
| D-04 | Desktop | CTA confidence | Repeated CTA clicks suggest weak immediate response certainty | Multiple `Apply / Reserve Seat` clicks in short window | High | 0.71 | `src/components/sections/Hero.tsx`, `src/components/sections/Pricing.tsx`, `src/components/sections/CTAFooter.tsx`, `src/components/Nav.tsx` |
| X-01 | Shared | Trust sequencing | Trust details exist but are not optimally sequenced at decision points | Cross-jam pattern: users seek policy/payment confidence before commitment | High | 0.81 | `Hero.tsx`, `Pricing.tsx`, `FAQ.tsx`, `apply/page.tsx` |
| X-02 | Shared | Messaging clarity | Action intent and what-happens-next copy can be clearer | Cross-jam pattern: repeated interactions before commitment | High | 0.80 | Hero/CTA surfaces + apply intro |

## Technical Signal Notes
- Console captures did not show first-party runtime exceptions in the returned corpus.
- Captured first-party requests were predominantly successful (`200`) in both sessions.
- Some noisy failures appeared from unrelated domains/tabs in mobile recording context; no evidence these blocked core site behavior.
- Jam API severity-filtered network views were partially unavailable on desktop Jam (`Not Found` for `error/warn` filter endpoint), so conclusions are based on unfiltered returned traces.

## Prioritized Backlog Seed (for 10b/10c/10e)
1. Unify status language everywhere (`Applications open now` or final canonical term).
2. Smooth mobile menu open/close transitions and clarify state changes.
3. Normalize speaker card credibility structure and proof affordances.
4. Add explicit immediate feedback to CTA clicks.
5. Reduce FAQ cognitive burden by surfacing high-friction answers before accordion depth.
6. Re-sequence trust snippets so payment/refund mechanics are adjacent to commitment actions.

## Open Uncertainties
- Some user-event streams are sparse and not timestamp-complete for every click.
- Full tab-isolated HAR was not available in these extracted reports.
- Screenshot extraction is limited on these video-type Jam responses.
