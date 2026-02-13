# Phase 11e — Email Settings, Templates, and Batch Send

## Focus
Admin-editable placeholders (venue address, parking, prework extras) stored in the database, powering 3 email templates that can be previewed and batch-sent to all paid attendees. Solves the "one email then silence" gap.

## Inputs
- `EmailSetting` model from 11a schema migration
- Existing email infrastructure: `src/lib/email.ts` with `sendTransactionalEmail()` helper, `escapeHtml()`, `formatUsd()`, IBM Plex Sans HTML email style
- Existing deposit confirmation email pattern: `sendDepositConfirmationEmail({ firstName, to })`
- Admin page tabs from 11b/11c: `src/app/admin/page.tsx` (now 3 tabs)
- `prisma.attendee.findMany({ where: { depositStatus: 'paid' } })` for recipient list

## Work

### Email Settings API

1. **Create `src/app/api/admin/email-settings/route.ts`**:
   - **GET**: Return all `EmailSetting` rows as `{ settings: { key, value }[] }`
   - **PUT**: Accept `{ settings: { key, value }[] }`, upsert each via `prisma.emailSetting.upsert()`
   - On first GET, if no rows exist, seed default keys with empty values:
     - `venue_address`, `venue_parking`, `venue_start_time`, `prework_extra`, `day1_what_to_bring`

### Email Templates

2. **Create `src/lib/email-templates.ts`** — 3 template builder functions:

   **`buildPreworkEmail(settings, { firstName })`** → `{ subject, text, html }`
   - Subject: "Prework checklist for Zero-to-Agent"
   - Content: Install Node 20+, Python 3.11+, Git, VS Code. Choose one workflow. `{{prework_extra}}`. Bring laptop + charger.

   **`buildVenueEmail(settings, { firstName })`** → `{ subject, text, html }`
   - Subject: "Venue details for Zero-to-Agent — Feb 28"
   - Content: Address: `{{venue_address}}`. Parking: `{{venue_parking}}`. Arrive by: `{{venue_start_time}}`. Bring: `{{day1_what_to_bring}}`.

   **`buildDay1PrepEmail(settings, { firstName })`** → `{ subject, text, html }`
   - Subject: "Tomorrow: Zero-to-Agent starts at {{venue_start_time}}"
   - Content: Quick schedule overview, arrive by time at address, bring laptop + charger + chosen workflow.

   All templates: same HTML style as deposit email (IBM Plex Sans, inline styles, `escapeHtml()` on user data). Settings accessed as `settings.get('venue_address')` from a `Map<string, string>`.

### Batch Send API

3. **Create `src/app/api/admin/email/send-batch/route.ts`** — Admin POST:
   - Accept `{ template: "prework" | "venue" | "day1_prep" }`
   - Fetch all `EmailSetting` rows → build `Map<string, string>`
   - Validate required settings for the chosen template are non-empty → 400 if any missing
   - Query `prisma.attendee.findMany({ where: { depositStatus: 'paid' }, select: { firstName, email } })`
   - Send sequentially (Resend rate limits): `for (const a of attendees) { try { await sendTransactionalEmail(...); sent++; } catch { failed.push(...); } }`
   - Return `{ sent, failed: count, errors: [...] }`

### Add `sendTemplatedEmail` to `src/lib/email.ts`

4. **Modify `src/lib/email.ts`**:
   - Export a generic `sendTemplatedEmail(to: string, template: { subject, text, html }): Promise<SendEmailResult>` that wraps `sendTransactionalEmail`
   - This keeps the existing `sendDepositConfirmationEmail` unchanged and adds a reusable entry point for templated emails

### Admin Email Tab

5. **Create `src/components/admin/EmailSender.tsx`** — two sections:

   **Settings Panel**:
   - Fetches `GET /api/admin/email-settings` on mount
   - Renders form fields for each setting key (label + text input or textarea)
   - "Save Settings" button → `PUT /api/admin/email-settings`
   - Success toast/confirmation after save

   **Send Panel**:
   - Template dropdown: Prework Reminder, Venue Details, Day 1 Prep
   - Live preview: renders chosen template HTML with current settings interpolated. Blank settings show `[Not yet configured]` in red.
   - "Send to all paid attendees" button
     - Disabled if any required settings for chosen template are blank
     - Click → confirmation dialog: "Send {template name} to X paid attendees?"
     - On confirm → `POST /api/admin/email/send-batch`
     - Shows result: "Sent to X attendees. Y failed." with error details if any.

6. **Modify `src/app/admin/page.tsx`**:
   - Add fourth tab: `{ value: "emails", label: "Emails" }`
   - Mount `<EmailSender />` in new tab panel

### Required Settings per Template

| Template | Required Settings |
|----------|-------------------|
| Prework | (none — all content is static + optional `prework_extra`) |
| Venue | `venue_address`, `venue_start_time` |
| Day 1 Prep | `venue_address`, `venue_start_time` |

### Verification
- Visit admin Emails tab → see Settings panel with 5 editable fields
- Fill in venue address + start time → Save → refresh → values persisted
- Select "Venue Details" template → preview shows interpolated content
- Leave venue_address blank → preview shows `[Not yet configured]`, send button disabled
- Fill all required → click Send → confirmation dialog shows attendee count
- Confirm → emails sent → result summary displayed
- Check Resend dashboard or test inbox for receipt
- If `RESEND_API_KEY` not set → batch send returns `{ sent: 0, failed: 0, errors: ["Email not configured"] }`

## Output
- New API: `GET/PUT /api/admin/email-settings`, `POST /api/admin/email/send-batch`
- New files: `email-templates.ts`, `EmailSender.tsx`
- Modified: `email.ts` (add `sendTemplatedEmail`), `admin/page.tsx` (fourth tab)

## Handoff
Email system is complete. 11f (referral performance) is the final subphase and is independent.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added `src/lib/email-templates.ts` with:
    - template builders (`prework`, `venue`, `day1_prep`)
    - required-setting validation helpers
    - template labels and defaults
  - Extended `src/lib/email.ts`:
    - exported `sendTemplatedEmail`
    - added `sendWaitlistSeatOfferEmail`
    - retained deposit confirmation flow
  - Implemented admin email settings API:
    - `GET/PUT /api/admin/email-settings`
  - Implemented batch email API:
    - `POST /api/admin/email/send-batch`
    - dry-run preview path
    - per-recipient timeout + failure summary
    - failed-only retry support
  - Added `EmailSender` admin component and mounted in new Emails tab.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None for subphase e implementation.
- Next concrete steps:
  - Complete referral performance metrics + click-to-filter wiring (11f).
