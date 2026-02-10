# Phase 9a — Hero Ticket Alignment

## Focus
Lower the desktop floating “Toronto pilot / 50 seats” ticket and add stable test ids for hero alignment checks.

## Inputs
- Jam `9440520b-504e-4c64-93d0-1cd1c9acdc4f` complaint about the ticket sitting too high.
- `src/components/sections/Hero.tsx` current overlay ticket implementation.

## Work
1. Update the “Toronto pilot / 50 seats” overlay positioning on md+.
2. Add `data-testid` selectors:
   - `hero-ticket-toronto` on the Toronto/50 seats ticket.
   - `hero-structure-card` on the “Structure that forces momentum” card.
3. Sanity check on desktop width that overlays do not clip or overlap marquee.

## Output
- Updated hero alignment selectors and positioning:
  - Added `data-testid="hero-structure-card"` to the “Structure that forces momentum” card.
  - Added `data-testid="hero-ticket-toronto"` to the Toronto/50 seats floating ticket.
  - Lowered the ticket on desktop by changing `bottom-3` → `-bottom-4`.
- Files:
  - `src/components/sections/Hero.tsx`

## Handoff
Phase 9b should preserve the new hero test ids and ensure the lowered ticket does not overlap the hero stepper or marquee.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Lowered the desktop Toronto/50 seats floating ticket and added stable hero test ids.
- Commands run:
  - `git status --porcelain=v1` — pass (only untracked screenshot + `docs/planning/phase-9/`).
  - `nl -ba src/components/sections/Hero.tsx | sed -n '368,430p'` — pass (confirmed wrapper + ticket classes).
- Blockers:
  - None.
- Next concrete steps:
  - Implement the interactive hero stepper (Phase 9b).
