# Phase 11a — Schema Migration (Waitlist + EmailSetting)

## Focus
Add two new Prisma models required by later subphases: `Waitlist` (for overflow demand capture) and `EmailSetting` (for admin-editable email placeholders). Combined into a single migration to minimize database operations.

## Inputs
- Existing schema: `prisma/schema.prisma` (Attendee, ReferralCode, ReferralCodeAuditLog, StripeEvent)
- Pattern: UUID primary keys, `@map()` for snake_case table/column names, `@default(now())` for timestamps

## Work

### 1. Add Waitlist model to `prisma/schema.prisma`
```prisma
model Waitlist {
  id          String    @id @default(uuid()) @db.Uuid
  createdAt   DateTime  @default(now()) @map("created_at")
  firstName   String    @map("first_name")
  lastName    String    @map("last_name")
  email       String    @unique
  roleTitle   String?   @map("role_title")
  useCase     String?   @db.Text @map("use_case")
  networkCode String?   @map("network_code")
  notified    Boolean   @default(false)
  convertedAt DateTime? @map("converted_at")
  @@map("waitlist")
}
```

### 2. Add EmailSetting model to `prisma/schema.prisma`
```prisma
model EmailSetting {
  id        String   @id @default(uuid()) @db.Uuid
  key       String   @unique
  value     String   @db.Text
  updatedAt DateTime @updatedAt @map("updated_at")
  @@map("email_settings")
}
```

### 3. Apply migration
```bash
npx prisma db push
npx prisma generate
```

### 4. Verify
- `npx prisma generate` completes without error
- `npm run typecheck` passes (generated client includes new models)
- Spot-check: `npx prisma studio` shows `waitlist` and `email_settings` tables

## Output
- Updated `prisma/schema.prisma` with both new models
- Regenerated Prisma client at `src/generated/prisma/` with `Waitlist` and `EmailSetting` types

## Handoff
Schema is ready. Subphases b-f can proceed — all depend on the generated client being up to date.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added `WaitlistStatus` and `WaitlistSource` enums.
  - Added `Waitlist` model with soft-cap/waitlist lifecycle fields (setup intent, seat-offer, conversion metadata).
  - Added `EmailSetting` model for admin-editable email placeholders.
  - Regenerated Prisma client and validated compile compatibility.
- Commands run:
  - `npm run prisma:generate` — pass (client generated to `src/generated/prisma`)
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None for schema/client generation.
- Next concrete steps:
  - Execute API layer consuming new models (`/api/seats`, `/api/waitlist`, admin waitlist + stats + email settings).
