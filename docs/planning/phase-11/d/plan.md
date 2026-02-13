# Phase 11d — Live Seat Counter on Landing Page

## Focus
Replace static "50 seats" text with a dynamic "X of 50 seats remaining" counter in the Hero marquee and StickyApplyBar. Scarcity signal that compounds as seats fill.

## Inputs
- `GET /api/seats` from 11c (returns `{ total, remaining, soldOut }`)
- `src/components/sections/Hero.tsx` — marquee contains "50 seats" text
- `src/components/StickyApplyBar.tsx` — line 99 contains "50 seats"
- Existing badge/chip styling pattern from both components

## Work

### SeatCounter Component

1. **Create `src/components/SeatCounter.tsx`** — small client component (~30 lines):
   - `useState` for `{ remaining, soldOut }`, initially `null`
   - `useEffect` fetches `/api/seats` on mount
   - Render states:
     - Loading: `"-- seats"` (skeleton placeholder, prevents layout shift)
     - Normal: `"X of 50 seats remaining"` or just `"X seats"` depending on context
     - Sold out: `"Sold out"` with different styling
   - Accept `variant` prop: `"inline"` (for marquee text) vs `"badge"` (for StickyApplyBar chip)
   - No SSR — client-side fetch is fine for a count that changes infrequently

### Integration

2. **Modify `src/components/StickyApplyBar.tsx`**:
   - Replace static `50 seats` text in the description span (line 99) with `<SeatCounter variant="inline" />`
   - When `soldOut`: change "Apply now" button to link to `/apply` (waitlist gate handles the rest)
   - Full line becomes: `Feb 28 – Mar 1 · Toronto · <SeatCounter /> · $100 deposit`

3. **Modify `src/components/sections/Hero.tsx`**:
   - Find the marquee text that includes "50 seats"
   - Replace with `<SeatCounter variant="inline" />`
   - Marquee duplicates content for infinite scroll effect — ensure the component renders consistently in both copies (same fetched value, no flicker)

### Verification
- Landing page loads → shows "-- seats" briefly, then "X of 50 seats remaining"
- Number matches `GET /api/seats` response
- Register a new attendee → reload landing page → count decremented by 1
- When sold out → "Sold out" appears in both Hero and StickyApplyBar
- No layout shift on load (skeleton placeholder has same dimensions as final text)

## Output
- New component: `SeatCounter.tsx`
- Modified: `StickyApplyBar.tsx`, `Hero.tsx`

## Handoff
Landing page now shows live scarcity signal. 11e (email sequences) is independent and can proceed in parallel.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added `SeatCounter` component that fetches `/api/seats` and supports sold-out/waitlist-aware states.
  - Integrated seat counter into:
    - `src/components/sections/Hero.tsx`
    - `src/components/StickyApplyBar.tsx`
  - Replaced stale static seat text with dynamic copy (`Sold out · waitlist N` when sold out).
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None for subphase d implementation.
- Next concrete steps:
  - Complete email settings/templates/sender flow and admin tab integration (11e).
