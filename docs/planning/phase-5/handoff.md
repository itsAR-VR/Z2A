# Phase 5 — Master Handoff Document

> Single source of truth for building the Zero-to-Agent Toronto Pilot website.
> Supersedes all Phase 3 and Phase 4 planning docs.

---

## 1. Summary

Build a high-quality single-page landing experience for a 2-day, in-person AI-agent workshop in Toronto (Feb 28 – Mar 1, 2026). The site collects applications, processes $100 deposits via Stripe, and provides an admin dashboard for ops.

**Deliverables:**
- `/` — Public landing page (anchored IA with 9 sections including `#speakers`)
- `/apply` — Application form → Stripe Checkout redirect
- `/apply/success` — Deposit confirmation
- `/admin` — Ops dashboard (attendees, referral codes, audit logs)

---

## 2. Current Repo State

### Already built (core functionality):
| Artifact | Path | Status |
|----------|------|--------|
| Next.js 16 + App Router | `src/app/` | Working |
| Prisma 7 schema | `prisma/schema.prisma` | 4 models + enums (Attendee, ReferralCode, ReferralCodeAuditLog, StripeEvent) |
| Apply API | `src/app/api/apply/route.ts` | POST → creates attendee + Stripe checkout |
| Stripe webhook | `src/app/api/stripe/webhook/route.ts` | Idempotent handler |
| Admin attendees API | `src/app/api/admin/attendees/route.ts` | GET with search |
| Admin CSV export | `src/app/api/admin/attendees/export/route.ts` | GET → CSV download |
| Basic auth middleware | `src/middleware.ts` | Protects `/admin/*` and `/api/admin/*` |
| Lib modules | `src/lib/{config,db,env,stripe}.ts` | Config, Prisma client, env validation, Stripe client |
| Tailwind CSS v4 | `postcss.config.mjs` + `globals.css` | Configured |
| Public UI (anchored IA) | `src/components/sections/*` + `src/app/page.tsx` | Implemented |
| Speakers modal | `src/components/sections/Speakers.tsx` + `src/components/Dialog.tsx` | Implemented |
| Apply pages | `src/app/apply/*` | Implemented |
| Admin UI | `src/app/admin/*` + `src/components/admin/*` | Implemented |
| Playwright smoke | `playwright.config.ts` + `z2a/*.spec.ts` | Implemented (CLI) |

### Remaining (to fully “close the loop”):
- Run Playwright smoke in an environment that can start a dev server and reach the internet:
  - `docs/planning/phase-5/playwright-cli.md`
- Run Stripe CLI webhook smoke locally/CI:
  - `docs/planning/phase-5/stripe-cli.md`
- Optional: capture fresh competitive screenshots (Refunnel / TKS / Z2A) using `scripts/snapshot-sites.mjs` from a non-restricted machine.

---

## 3. Locked Decisions (Do Not Change)

| Decision | Value |
|----------|-------|
| Seat cap | 50 |
| Deposit amount | $100 USD |
| List remainder | $1,400 USD |
| Network remainder | $900 USD |
| Currency | USD (cents in DB) |
| Location copy | "Please register to see the exact location of this event." |
| Primary persona | PM_ADVANCED (product/ops leaders) |
| Tone | Premium, practical, calm — no hype |
| Motion philosophy | Progressive enhancement; site must work without JS motion |
| Reduced-motion | Non-negotiable compliance (see Section 10) |

---

## 4. Page Deliverables

### 4.1 Landing Page (`/`)

**Anchored IA (9 sections):**

| # | Anchor | Section | Key Content |
|---|--------|---------|-------------|
| 1 | `#top` | Hero | "Build a working agent in a weekend — in person" + event date/location badge + CTA |
| 2 | `#why` | Why In-Person | 3 value cards + proof line |
| 3 | `#speakers` | Speakers | 2 speaker cards (Aadil + Abdur) |
| 4 | `#outcomes` | Outcomes | 3 outcome cards |
| 5 | `#how` | How It Works | 5-step process flow |
| 6 | `#agenda` | Agenda | 2-day timeline |
| 7 | `#pricing` | Pricing | 2 pricing cards (List + Network) |
| 8 | `#faq` | FAQ | 11 questions in accordion |
| 9 | `#apply` | CTA Footer | Final "Apply Now" CTA |

**Navigation:**
- Sticky top nav with anchor links
- Active-section indicator (scroll spy)
- Mobile: full-screen overlay menu

### 4.2 Apply Page (`/apply`)

- Form fields: firstName, lastName, email, roleTitle, company (optional), linkedinUrl (optional), useCase, networkCode (optional with reveal toggle)
- Client-side validation matching `applySchema` in `src/app/api/apply/route.ts`
- On submit: POST to `/api/apply`, then `window.location.href = checkoutUrl`
- Handle errors: sold out (409), duplicate email (409), validation (400)
- Canceled state: show message when `?canceled=1` query param present

### 4.3 Apply Success (`/apply/success`)

- Confirmation page with:
  - "Your $100 deposit has been received."
  - "You'll receive a confirmation email shortly."
  - Event details reminder (date, location copy)
  - Next steps (prework link, what to expect)

### 4.4 Admin Dashboard (`/admin`)

- **Attendees tab:**
  - Table with: name, email, role, company, deposit status, seat status, network code, created date
  - Search/filter by name or email
  - Click row → detail panel with status editing + internal notes
  - PATCH attendee: seatStatus, applicationStatus, internalNotes
  - CSV export button
- **Referral Codes tab:**
  - Table listing all codes with active/inactive status
  - Create new code form
  - Toggle active/inactive (reason required to deactivate; optional to activate)
  - Click row → audit log viewer
  - All mutations logged to `ReferralCodeAuditLog`

---

## 5. Public API Contracts

### Existing (no changes needed):

```
POST /api/apply
  Body: { firstName, lastName, email, roleTitle, company?, linkedinUrl?, useCase, networkCode? }
  Response: { checkoutUrl: string }
  Errors: 400 (validation), 409 (sold out / duplicate email), 500

POST /api/stripe/webhook
  (Stripe signature verified; handles checkout.session.completed, charge.refunded)

GET /api/admin/attendees?q=searchTerm
  Response: { attendees: [...] }

GET /api/admin/attendees/export
  Response: CSV file download
```

### New (to build in Phase 5c):

```
PATCH /api/admin/attendees/[id]
  Body: { seatStatus?, applicationStatus?, internalNotes? }
  Response: { attendee: {...} }

GET /api/admin/referral-codes
  Response: { referralCodes: [...] }

POST /api/admin/referral-codes
  Body: { code: string }
  Response: { referralCode: {...} }

PATCH /api/admin/referral-codes/[id]
  Body: { active: boolean, reason?: string } // reason required when deactivating
  Response: { referralCode: {...} }

GET /api/admin/referral-codes/[id]/audit
  Response: { auditLogs: [...] }
```

---

## 6. Required Environment Variables

```
APP_URL=https://zerotoagent.com        # Public base URL
STRIPE_SECRET_KEY=sk_...               # Stripe API secret
STRIPE_WEBHOOK_SECRET=whsec_...        # Stripe webhook signing secret
STRIPE_DEPOSIT_PRICE_ID=price_...      # Stripe Price ID for $100 deposit
DATABASE_URL=postgresql://...          # PostgreSQL connection string
DIRECT_URL=postgresql://...            # Direct DB URL (for migrations)
ADMIN_BASIC_AUTH_USER=admin            # Admin username
ADMIN_BASIC_AUTH_PASS=...              # Admin password
```

---

## 7. Speaker Section Requirements

### Section placement: After `#why`, before `#outcomes`

### Speaker 1: Aadil Kazmi (Instructor)
- **Role:** Instructor · Zero-to-Agent
- **Bio:** Head of AI at Infios. Forbes 30 Under 30 Honoree.
- **LinkedIn:** https://www.linkedin.com/in/aadilkazmi/
- **Headshot:** `/public/speakers/aadil-headshot.jpg`

### Speaker 2: Abdur Sajid (Guest Speaker)
- **Role:** Guest Speaker · Zero Risk Growth (cold2close.ai)
- **Bio bullets:**
  - 20 years old, high school dropout
  - Started first AI startup at 16
  - OpenAI award: "Honored for passing 100 Billion Tokens" (transcribed verbatim from `docs/image2-2-1.jpeg`)
- **Content:** Will share insights on scaling AI agent businesses from zero
- **LinkedIn:** https://www.linkedin.com/in/abdur-sajid/
- **Headshot:** `/public/speakers/abdur-headshot.jpg`
- **Award plaque image:** `/public/speakers/openai-award-plaque.jpeg`
- **Company logo:** `/public/speakers/cold2close-logo.svg` (replace with a PNG later if desired)

> Note: The award plaque image (`docs/image2-2-1.jpeg`) also contains the name "Teddy Joseph".
> Only treat this as text on the plaque unless you have explicit confirmation you want it presented as Abdur's name.

---

## 8. Design Tokens

### Colors
Light-first tinted neutrals + indigo accent (OKLCH), defined in `src/app/globals.css`.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `oklch(98% 0.01 280)` | Page background |
| `--color-bg-2` | `oklch(99% 0.015 75)` | Secondary background tint |
| `--color-surface` | `oklch(100% 0.01 280)` | Surface (cards, pills) |
| `--color-surface-2` | `oklch(97% 0.015 280)` | Subtle surface tint |
| `--color-text` | `oklch(22% 0.03 280)` | Primary text |
| `--color-text-muted` | `oklch(45% 0.03 280)` | Secondary text |
| `--color-text-faint` | `oklch(60% 0.02 280)` | Tertiary text |
| `--color-border` | `oklch(88% 0.02 280)` | Borders/dividers |
| `--color-border-strong` | `oklch(80% 0.03 280)` | Strong borders |
| `--color-accent` | `oklch(55% 0.22 280)` | CTAs/highlights |
| `--color-accent-2` | `oklch(60% 0.19 250)` | Secondary accent glow |
| `--color-accent-ink` | `oklch(99% 0.01 280)` | Text on accent |
| `--color-focus` | `oklch(63% 0.22 280)` | Focus ring |

### Typography
| Element | Font | Weight | Size (desktop) | Size (mobile) | Line Height |
|---------|------|--------|----------------|---------------|-------------|
| Headings | Space Grotesk | 600–700 | clamp-based | clamp-based | ~1.0–1.1 |
| Body | IBM Plex Sans | 400–500 | 18px | 15–16px | 1.6 |
| Labels | IBM Plex Mono | 400–500 | 11–12px | 11px | 1.3 |

### Spacing
- Base unit: `--spacing: 0.25rem` (Tailwind v4)
- Section padding: `clamp(72px, 7vw, 124px)` (see `.section-padding`)
- Content max-width: 1200px with `clamp(16px, 3vw, 28px)` gutters (see `.container-content`)

---

## 9. Motion Stack

### Architecture
| Layer | Technology | Scope |
|-------|-----------|-------|
| Smooth scroll | Lenis | Desktop only; disabled on mobile + reduced-motion |
| Scroll-driven | GSAP + ScrollTrigger | Hero parallax, timeline progress, nav active state |
| Reveals | CSS + IntersectionObserver | Section fade-ups, card staggers, text reveals |
| Interactions | CSS | Button hovers, card lifts, link underlines, accordion, menu |

### Micro-animation Inventory (Tier 1 — Must Have)
1. Hero text stagger (fade-up + slide, 0.6s, power3.out)
2. Section reveal (fade-up 30px, 0.6s, triggered at 20% viewport)
3. Card stagger (0.1s delay between siblings)
4. Button hover (scale 1.02 + shadow, 0.2s ease-out)
5. Card hover lift (translateY -4px + shadow, 0.2s)
6. FAQ accordion expand/collapse (max-height + opacity, 0.3s)
7. Nav active section indicator (underline slide)
8. Mobile menu overlay (fade + slide-down, 0.3s)

### Micro-animation Inventory (Tier 2 — Nice to Have)
9. Background atmospheric glow (CSS radial gradient pulse)
10. Marquee/ticker strip (CSS animation, paused on reduced-motion)
11. Timeline progress line (scroll-driven, GSAP)
12. Pricing card hover tilt (subtle 3D, CSS perspective)
13. Link underline expand (width 0→100%, 0.2s)

---

## 10. Reduced-Motion Rules (Non-Negotiable)

When `prefers-reduced-motion: reduce` is active:

| Feature | Behavior |
|---------|----------|
| Lenis smooth scroll | OFF — native scroll |
| ScrollTrigger animations | OFF — elements at final state |
| Parallax effects | OFF |
| Marquee/ticker | Static (no movement) |
| Reveal animations | Instant (opacity: 1 immediately) or minimal opacity fade only |
| Hover effects | Allowed (user-initiated) |
| Accordion | Allowed (user-initiated, instant transition) |
| Menu transitions | Instant show/hide |

### Implementation pattern:
```tsx
// Hook: useReducedMotion()
const prefersReduced = useReducedMotion();

// CSS: @media (prefers-reduced-motion: reduce) { ... }
// Lenis: only initialize if !prefersReduced && isDesktop
// GSAP: wrap in if (!prefersReduced) { ... }
```

---

## 11. File-Level Implementation Steps

### Step 1: Design Tokens + Global Styles
- `src/app/globals.css` — CSS custom properties, font imports, base reset, Tailwind config

### Step 2: Motion Infrastructure
- `src/hooks/useReducedMotion.ts` — Media query hook
- `src/hooks/useReveal.ts` — IntersectionObserver reveal hook
- `src/hooks/useScrollSpy.ts` — Active section detection
- `src/components/motion/LenisProvider.tsx` — Lenis wrapper (desktop-only)
- `src/components/motion/RevealOnScroll.tsx` — Reusable reveal wrapper

### Step 3: Shared Components
- `src/components/Nav.tsx` — Sticky nav + mobile menu
- `src/components/SectionWrapper.tsx` — Consistent section layout
- `src/components/Button.tsx` — CTA button with variants
- `src/components/Card.tsx` — Content card with hover
- `src/components/Badge.tsx` — Event/label badges
- `src/components/Accordion.tsx` — FAQ accordion

### Step 4: Landing Page Sections
- `src/components/sections/Hero.tsx`
- `src/components/sections/Why.tsx`
- `src/components/sections/Speakers.tsx`
- `src/components/sections/Outcomes.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/sections/Agenda.tsx`
- `src/components/sections/Pricing.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/CTAFooter.tsx`

### Step 5: Landing Page Assembly
- `src/app/page.tsx` — Compose all sections with LenisProvider

### Step 6: Apply Pages
- `src/app/apply/page.tsx` — Form UI wired to POST /api/apply
- `src/app/apply/success/page.tsx` — Confirmation page

### Step 7: Admin DB + APIs (Phase 5c)
- `prisma/schema.prisma` — Add `internalNotes`, `ReferralCodeAuditLog`
- `src/app/api/admin/attendees/[id]/route.ts` — PATCH endpoint
- `src/app/api/admin/referral-codes/route.ts` — GET + POST
- `src/app/api/admin/referral-codes/[id]/route.ts` — PATCH
- `src/app/api/admin/referral-codes/[id]/audit/route.ts` — GET audit log

### Step 8: Admin UI
- `src/app/admin/page.tsx` — Dashboard with tabs
- `src/components/admin/AttendeeTable.tsx`
- `src/components/admin/AttendeeDetail.tsx`
- `src/components/admin/ReferralCodeTable.tsx`
- `src/components/admin/AuditLogViewer.tsx`

### Step 9: QA
- `npm run lint && npm run typecheck && npm run build`
- Visual verification of all sections
- Reduced-motion testing
- Admin auth gate verification

---

## 12. Referral Code Seeding

Referral codes should be created via the admin UI or API. For development/testing, seed at least one active network code:

```sql
INSERT INTO referral_codes (id, code, type, active, created_at)
VALUES (gen_random_uuid(), 'NETWORK2026', 'network', true, now());
```

Or via the new POST `/api/admin/referral-codes` endpoint.

---

## 13. QA / Acceptance Checklist

### Engineering
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes

### Public Site
- [ ] `/` loads with all 9 anchored sections
- [ ] Navigation anchors work (click → smooth scroll)
- [ ] Mobile menu opens/closes
- [ ] Active section indicator works
- [ ] All content matches IA/copy spec
- [ ] `#speakers` section shows both speaker cards
- [ ] Reduced-motion: no scroll hijacking, no parallax, reveals instant
- [ ] `/apply` form validates and submits
- [ ] `/apply` handles sold-out and duplicate-email errors
- [ ] `/apply/success` shows confirmation

### Admin
- [ ] `/admin` requires basic auth (401 without credentials)
- [ ] Attendees table loads with search
- [ ] Attendee detail: status edits + notes save
- [ ] CSV export downloads
- [ ] Referral code CRUD works
- [ ] Audit log shows mutation history

### Performance
- [ ] No CLS on hero, speakers, pricing sections
- [ ] No scroll jank on desktop
- [ ] Keyboard navigable (nav, menu, accordion, admin forms)
