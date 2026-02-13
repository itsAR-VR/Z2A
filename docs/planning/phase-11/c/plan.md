# Phase 11c — Waitlist APIs, Admin Tab, and Apply Page Gate

## Focus
Capture overflow demand when 50 seats are filled: public seats API, public waitlist submission, admin waitlist management, and an apply-page gate that swaps to a waitlist form when sold out.

## Inputs
- `Waitlist` model from 11a schema migration
- Existing apply flow: `src/app/apply/page.tsx` → `POST /api/apply` → Stripe Checkout
- Existing admin tabs: `src/app/admin/page.tsx` (2 tabs: Attendees, Referral Codes)
- `SEAT_CAP` from `src/lib/config.ts`
- Pattern for admin tables: `AttendeeTable.tsx`, `ReferralCodeTable.tsx`

## Work

### Public Seats API

1. **Create `src/app/api/seats/route.ts`** — Public GET, no auth:
   ```ts
   const paid = await prisma.attendee.count({ where: { depositStatus: 'paid' } });
   return { total: SEAT_CAP, remaining: SEAT_CAP - paid, soldOut: paid >= SEAT_CAP };
   ```
   - Header: `Cache-Control: no-store` (always fresh)
   - Used by: seat counter (11d), apply page gate, StickyApplyBar

### Public Waitlist API

2. **Create `src/app/api/waitlist/route.ts`** — Public POST, no auth:
   - Zod validation: `{ firstName, lastName, email }` required; `roleTitle`, `useCase`, `networkCode` optional
   - Check email uniqueness: 409 if already on waitlist
   - Also check if email already has a paid deposit: return specific message "You already have a seat reserved"
   - Create `Waitlist` entry
   - Return 201 `{ success: true }`

### Admin Waitlist API

3. **Create `src/app/api/admin/waitlist/route.ts`** — Admin GET:
   - List all waitlist entries ordered by `createdAt` desc
   - Include all fields + computed `isConverted: Boolean` from `convertedAt !== null`

4. **Create `src/app/api/admin/waitlist/[id]/convert/route.ts`** — Admin POST:
   - Validate waitlist entry exists and `convertedAt` is null
   - Recheck seat availability (may have opened via refund)
   - Create Attendee record (mirror `/api/apply` logic: same fields, same defaults)
   - Create Stripe Checkout session for deposit (same as `/api/apply`)
   - Mark `convertedAt = new Date()` on waitlist entry
   - Return `{ checkoutUrl }` for admin to share with the waitlisted person

### Admin Waitlist Tab

5. **Create `src/components/admin/WaitlistTable.tsx`**:
   - Fetches `GET /api/admin/waitlist` on mount
   - Table columns: Name, Email, Role, Network Code, Date, Status (Waiting/Converted)
   - "Convert" button on unconverted rows → calls convert API → opens checkout URL in new tab
   - Follow same styling pattern as `AttendeeTable` and `ReferralCodeTable`

6. **Modify `src/app/admin/page.tsx`**:
   - Add third tab: `{ value: "waitlist", label: "Waitlist" }`
   - Mount `<WaitlistTable />` in new tab panel

### Apply Page Gate

7. **Modify `src/app/apply/page.tsx`**:
   - On mount, fetch `GET /api/seats`
   - If `soldOut === true`: render simplified waitlist form instead of full application
   - Waitlist form: firstName, lastName, email (required) + roleTitle, useCase, networkCode (optional)
   - Submit calls `POST /api/waitlist`
   - Success state: "You're on the waitlist. We'll email you if a seat opens."
   - Reuse existing Field/input styling patterns
   - If seats available: render existing form as-is (no change)

### Verification
- `GET /api/seats` → returns `{ total: 50, remaining: N, soldOut: false }` with correct count
- When all seats filled: `/apply` shows waitlist form instead of application form
- Submit waitlist → entry appears in admin Waitlist tab
- Admin clicks "Convert" → checkout URL generated, waitlist entry marked converted
- 409 on duplicate email submission to waitlist

## Output
- New APIs: `GET /api/seats`, `POST /api/waitlist`, `GET /api/admin/waitlist`, `POST /api/admin/waitlist/[id]/convert`
- New component: `WaitlistTable.tsx`
- Modified: `admin/page.tsx` (third tab), `apply/page.tsx` (sold-out gate)

## Handoff
Public `/api/seats` endpoint is now live. 11d (seat counter) can consume it to display dynamic counts on the landing page.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented public `GET /api/seats` with `remaining`, `soldOut`, and `waitlistCount`.
  - Implemented public `POST /api/waitlist` with validation, paid-seat conflict handling, and upsert semantics.
  - Implemented admin waitlist endpoints:
    - `GET /api/admin/waitlist`
    - `POST /api/admin/waitlist/[id]/convert`
  - Implemented waitlist conversion flow:
    - attendee creation/update from waitlist profile
    - Stripe deposit checkout URL generation
    - waitlist status update to `seat_offered`
    - automatic + manual-fallback email delivery behavior
  - Updated `/api/apply` to soft-cap logic:
    - under cap: existing deposit checkout flow
    - sold out: waitlist upsert + Stripe setup-mode checkout (card-on-file, no immediate charge)
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None for subphase c implementation.
- Next concrete steps:
  - Update landing/apply UI surfaces to consume `/api/seats` sold-out + waitlist states (11d + apply gate integration).

## Progress This Turn (Terminus Maximus)
- Work done:
  - Hardened `POST /api/admin/waitlist/[id]/convert` for race safety:
    - transactional state claim before checkout creation
    - explicit `409` in-progress guard
    - deterministic conflict responses for converted/already-paid/sold-out states
  - Added deterministic conflict behavior in `POST /api/waitlist`:
    - returns `409` for existing `seat_offered` or `converted` entries (prevents public resets of converted/offered rows).
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run db:push` — pass
- Blockers:
  - None for waitlist API hardening.
- Next concrete steps:
  - Run review artifact update and final deployment verification in a Playwright-capable environment.
