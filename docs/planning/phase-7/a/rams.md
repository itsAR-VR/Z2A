# Phase 7a — Rams (File-by-File Review)

Date: 2026-02-08

Goal: identify high-leverage, file-specific issues that block the “impeccable” standard. This is a review only; fixes land in later subphases.

## Public Funnel

### `src/components/Nav.tsx`

- Motion consistency: overlay transitions use ad-hoc Tailwind utilities instead of shared tokens.
  - Examples: `transition-opacity duration-200 ease-out` (`Nav.tsx:215`), `transition-[transform,opacity] duration-200 ease-out` (`Nav.tsx:224`).
  - Fix: swap to CSS motion tokens in 7b so future nav/menu micro-animations feel consistent.
- Reduced motion handling: already has `motion-reduce:*` on the menu trigger; keep this pattern and expand to overlay transitions when tokenized.

### `src/components/sections/Hero.tsx`

- GSAP choreography is in place and effective, but uses inline easing/durations:
  - `gsap.timeline({ defaults: { ease: "power3.out" } })` (`Hero.tsx:60`) and multiple `fromTo` calls (`Hero.tsx:62+`).
  - Fix: once 7b introduces JS motion tokens, refactor hero timeline to use them (7c).
- Ensure reduced-motion path remains correct (no timeline play / no transforms). Current tests do not cover this.

### `src/app/apply/page.tsx`

- Button motion is consistent and clean (small lift + shadow), but still uses hard-coded `duration-200`:
  - Example: primary pill button has `duration-200` (`apply/page.tsx:123`).
  - Fix: in 7b, replace with CSS token-based transition timing to align the entire system.
- UX hardening opportunities (7d):
  - focus first invalid field on submit
  - aria-live summary for screen readers
  - prevent double-submission
  - clearer “you’ll go to Stripe” explanation

## Admin

### `src/app/admin/page.tsx`

- Tabs: missing ARIA tab semantics (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`).
  - Fix in 7e with arrow-key navigation and proper associations.

### `src/components/admin/AttendeeTable.tsx`

- Row click interaction:
  - Selection is triggered by click handler (`AttendeeTable.tsx:96`).
  - Fix: remove row-level click and add an explicit control in-cell for keyboard access (7e).
- Hard-coded status colors (tokenization gap):
  - `text-green-400`, `text-yellow-400`, `text-red-400` mappings exist (`AttendeeTable.tsx:140-149`).
  - Fix: introduce semantic tokens and map via CSS variables (7b), then use those tokens in admin UI (7e if not fully handled in 7b).

### `src/components/admin/ReferralCodeTable.tsx`

- Hard-coded state colors:
  - Instances in conditional classes (`ReferralCodeTable.tsx:169-170, 198-199`).
  - Fix: same tokenization approach as above (7b).

### `src/components/admin/AuditLogViewer.tsx`

- Hard-coded state colors:
  - `text-green-400 bg-green-400/10` and `text-red-400 bg-red-400/10` (`AuditLogViewer.tsx:78-79`).
  - Fix: semantic tokens (7b).

### `src/components/admin/AttendeeDetail.tsx`

- Bespoke overlay, not a shared dialog:
  - `fixed inset-0 ... bg-black/60` (`AttendeeDetail.tsx:83`).
  - Risks: missing focus trap, scroll lock, ESC close, `role="dialog"` / `aria-modal`, focus restore.
  - Fix: migrate to shared `src/components/Dialog.tsx` (7e).

## Motion Primitive

### `src/components/motion/RevealOnScroll.tsx`

- Hard-coded motion and permanent GPU hint:
  - Permanent `willChange: "transform, opacity"` (`RevealOnScroll.tsx:40`)
  - Hard-coded transition string with `0.72s` + `cubic-bezier(0.16, 1, 0.3, 1)` (`RevealOnScroll.tsx:41`)
  - Fix: move to global CSS motion tokens + variant system and clear `will-change` after reveal (7b).

