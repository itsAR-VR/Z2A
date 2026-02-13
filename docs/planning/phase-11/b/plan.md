# Phase 11b — Admin Stats Summary Bar + Attendee Filters

## Focus
Give the admin instant operational visibility: a stats bar showing 6 key metrics and dropdown filters for all status columns. These are the two highest-impact admin features and share the same files.

## Inputs
- Schema from 11a (no new models needed here — queries existing `Attendee` table)
- Existing `GET /api/admin/attendees` at `src/app/api/admin/attendees/route.ts` (search-only, no filters)
- Existing `AttendeeTable` at `src/components/admin/AttendeeTable.tsx` (search bar + table + capture-all)
- Design tokens: `--color-surface`, `--color-border-700`, `--color-bg-800`, `--color-accent-500`, `--color-text-*`, `font-heading`
- Enum values: `DepositStatus`, `RemainderStatus`, `SeatStatus` from `prisma/schema.prisma`

## Work

### Stats Summary Bar

1. **Create `src/app/api/admin/stats/route.ts`** — GET endpoint, no params:
   - `totalRegistrants`: `prisma.attendee.count()`
   - `depositsPaid`: `prisma.attendee.count({ where: { depositStatus: 'paid' } })`
   - `seatsRemaining`: `SEAT_CAP - depositsPaid`
   - `authorized`: `prisma.attendee.count({ where: { remainderStatus: 'authorized' } })`
   - `captured`: `prisma.attendee.count({ where: { remainderStatus: 'captured' } })`
   - `totalRevenueCents`: `SUM(depositAmount WHERE paid) + SUM(remainderAmount WHERE captured)` via `prisma.attendee.aggregate()`
   - Also return `earlyBirdCount`: count where `remainderAmount === EARLY_BIRD_REMAINDER_AMOUNT_CENTS` AND `depositStatus === 'paid'`
   - Return distinct `networkCodes` for the filter dropdown

2. **Create `src/components/admin/StatsBar.tsx`** — client component:
   - Fetches `/api/admin/stats` on mount
   - Renders 6 cards in `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3`
   - Cards: label (small, muted text) + value (large, heading font)
   - Revenue formatted with `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })`
   - Accepts `refreshKey` prop to trigger refetch when attendees list changes

### Attendee Filters

3. **Extend `src/app/api/admin/attendees/route.ts`**:
   - Accept query params: `depositStatus`, `remainderStatus`, `seatStatus`, `networkCode`
   - Build `where` as: `{ AND: [searchClause, depositClause, remainderClause, seatClause, networkClause].filter(Boolean) }`
   - Each filter clause: `param ? { fieldName: param } : null`

4. **Extend `src/components/admin/AttendeeTable.tsx`**:
   - Add state: `depositStatusFilter`, `remainderStatusFilter`, `seatStatusFilter`, `networkCodeFilter`
   - Add `refreshKey` counter state, increment after any fetch
   - Mount `<StatsBar refreshKey={refreshKey} />` above search bar
   - Render filter row below search: 4 `<select>` elements
   - Enum options hardcoded from schema; referral code options fetched from stats endpoint
   - Update `fetchAttendees` URL builder to include all filter params
   - Filters trigger via the same 300ms debounce as search

### Verification
- Visit `/admin` → stats bar shows correct counts (cross-check with CSV export)
- Filter by `depositStatus: paid` → only paid rows shown, count matches stats bar
- Filter by `remainderStatus: authorized` → matches "Capture All" count
- Combine search "john" + filter `depositStatus: paid` → AND intersection
- Clear all filters → full list returns

## Output
- New API: `GET /api/admin/stats`
- New component: `StatsBar.tsx`
- Modified: `GET /api/admin/attendees` (filter params)
- Modified: `AttendeeTable.tsx` (stats bar + filter UI)

## Handoff
Admin dashboard now has operational visibility. Stats endpoint's `seatsRemaining` value is also useful for the public seats API in 11c (can share query pattern). Filter infrastructure enables the referral click-to-filter interaction in 11f.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented `GET /api/admin/stats` with revenue, seat, remainder, early-bird, waitlist, and referral-code option metrics.
  - Extended `GET /api/admin/attendees` to support `depositStatus`, `remainderStatus`, `seatStatus`, and `networkCode` filters plus existing search.
  - Added `StatsBar` UI component and integrated it into `AttendeeTable`.
  - Added admin filter row UI in `AttendeeTable` for all required statuses + referral code.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None for subphase b implementation.
- Next concrete steps:
  - Finish waitlist APIs/admin tab and public seat/over-cap flows (11c) using shared stats/seat-count logic.
