# Phase 11f — Referral Code Performance View

## Focus
Make the referral code system actionable by showing registration counts per code in the admin Referral Codes tab. Optional: clicking a count filters the Attendees tab to that code.

## Inputs
- Existing `ReferralCodeTable` at `src/components/admin/ReferralCodeTable.tsx`
- Existing `GET /api/admin/referral-codes` at `src/app/api/admin/referral-codes/route.ts`
- Attendee `networkCode` field stores the referral code used at registration
- Attendee filters from 11b (optional: click-to-filter integration)
- Admin page tab state from `src/app/admin/page.tsx`

## Work

### API Enhancement

1. **Modify `src/app/api/admin/referral-codes/route.ts`**:
   - In the GET handler, add a second query:
     ```ts
     const attendeeCounts = await prisma.attendee.groupBy({
       by: ['networkCode'],
       _count: { id: true },
       where: { networkCode: { not: null } },
     });
     ```
   - Convert to `Map<string, number>`: `networkCode → count`
   - Merge into each referral code response object as `registrationCount`
   - Also return `totalReferralRegistrations` (sum of all counts) in the response

### Table Enhancement

2. **Modify `src/components/admin/ReferralCodeTable.tsx`**:
   - Update `ReferralCode` interface: add `registrationCount: number`
   - Add "Registrations" column header between "Audit Logs" and "Created"
   - Render count in cell. If count > 0, style as accent-colored link text
   - Add summary text above table: "X total registrants via referral codes"

### Click-to-Filter (Optional Enhancement)

3. **Modify `src/app/admin/page.tsx`**:
   - Lift `networkCodeFilter` state to admin page level (or use a callback prop)
   - When referral count is clicked in `ReferralCodeTable`:
     - Switch active tab to "attendees"
     - Set `networkCodeFilter` to the clicked code
   - Pass `onFilterByCode` callback to `ReferralCodeTable`
   - Pass `initialNetworkCodeFilter` to `AttendeeTable`

### Verification
- Visit admin Referral Codes tab → each code shows registration count
- Code with no attendees → shows 0
- Code used by 3 attendees → shows 3
- Summary text: "3 total registrants via referral codes"
- Click count → switches to Attendees tab filtered by that code (if click-to-filter implemented)
- Create new code → shows 0 registrations
- Register attendee with that code → refresh → shows 1

## Output
- Modified: `GET /api/admin/referral-codes` (adds registration counts)
- Modified: `ReferralCodeTable.tsx` (Registrations column + summary)
- Modified (optional): `admin/page.tsx` (cross-tab filter wiring)

## Handoff
Phase 11 is complete. Run final verification:
```bash
npm run lint && npm run typecheck && npm run build
npx playwright test
```
All 6 features are production-ready. Commit and deploy.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Enhanced `GET /api/admin/referral-codes` with:
    - `registeredCount` (all attendees with code)
    - `paidCount` (paid deposits with code)
    - totals: `totalReferralRegistrations`, `totalReferralPaid`
  - Updated `ReferralCodeTable`:
    - Added Registered + Paid columns
    - Added totals summary line
    - Added click-to-filter callback wiring for attendee tab
  - Updated `AdminPage` to pass referral filter callback and include new Waitlist + Emails tabs.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e` — fail (environment: DNS + Chromium launch permission issues in this sandbox)
- Blockers:
  - Playwright E2E is blocked in this environment by:
    - DNS failure resolving `https://zerotoagent.com` in prod-safe tests
    - Chromium launch failure (`bootstrap_check_in ... Permission denied (1100)`)
- Next concrete steps:
  - Re-run E2E in a host with functional DNS and browser launch permissions.
