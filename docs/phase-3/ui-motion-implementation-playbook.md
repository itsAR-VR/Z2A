# Zero-to-Agent — UI + Motion Implementation Playbook (Phase 3)

This document is written for a follow-on agent/engineer to implement the **public landing page UI** and the **motion system** with high polish. The backend/funnel scaffolding exists; this is intentionally focused on UI/motion execution.

References:
- IA + copy spec: `docs/phase-3/ia-copy-spec.md`
- Design + motion spec (tokens/rules): `docs/phase-3/design-motion-spec.md`
- Funnel spec (apply + Stripe): `docs/phase-3/funnel-spec.md`
- QA checklist: `docs/phase-3/qa-deploy-checklist.md`
- Reference captures (for visual/motion validation): `/tmp/site-analysis/`
  - `videos/tks-scroll.webm`, `videos/refunnel-scroll.webm`
  - `screenshots/*`

Note: user mentioned “RudyFunnel.com”; reference captures in this repo are for `refunnel.com`.

---

## 0) Scope and Guardrails

- Do not invent new offer details. Use the exact copy/pricing rules in `docs/phase-3/ia-copy-spec.md`.
- Motion is **progressive enhancement**. The site must be fully usable without JS motion.
- Respect `prefers-reduced-motion` globally.
- Prefer transform/opacity animations (no layout thrash).
- Keep motion “premium, practical, calm”; no playful bounces unless explicitly chosen.

---

## 1) Page/Route Deliverables

### Public
- `/` (single-page landing with anchors)
- `/apply` (application form UI that calls `POST /api/apply`)
- `/apply/success` (confirmation UI)

### Admin (UI deferred unless needed)
- `/admin` (can be simple but usable)
  - Ideally calls:
    - `GET /api/admin/attendees`
    - `GET /api/admin/attendees/export`

---

## 2) Global Layout and Interaction Checklist

### Navigation
- Sticky top nav with:
  - Logo wordmark (simple text is fine)
  - Anchor links: `#why`, `#speakers`, `#outcomes`, `#how`, `#agenda`, `#pricing`, `#faq`, `#apply`
  - Primary CTA button “Apply / Reserve Seat”
- Active-section indication:
  - As user scrolls, highlight current section link (underline, dot, or subtle tint)
- Mobile nav:
  - “Menu” button opens full-screen overlay
  - Close icon animates in/out

### Smooth scroll (Phase 5 — Robust Stack)
- Desktop:
  - **Lenis** for smooth scroll (desktop only; disabled on mobile)
  - **GSAP + ScrollTrigger** for scroll-driven animations (parallax, timeline progress, nav scroll spy)
  - **CSS + IntersectionObserver** for all reveals, hovers, menu, accordion
- Reduced-motion:
  - Lenis OFF — native browser scroll
  - ScrollTrigger OFF — elements at final state immediately
  - All reveals instant
  - Hover effects allowed (user-initiated)

### Typography and spacing
- Implement tokens from `docs/phase-3/design-motion-spec.md`:
  - font sizes, line heights, spacing scale, border radii, shadow/glow rules
- Implement a consistent max-width + gutters strategy.

---

## 3) Micro-Animation Inventory (TKS/Refunnel-Inspired)

Each pattern includes:
- Trigger
- Animation
- Recommended implementation
- Reduced-motion fallback
- Notes/perf

### A) Page Load / First Paint

1. **Hero content stagger in**
   - Trigger: initial mount / first paint
   - Animation: H1 slides up 8–16px + fades in; subhead follows; CTA follows
   - Implementation: CSS keyframes or JS timeline; stagger 60–120ms
   - Reduced motion: no animation; content visible immediately
   - Perf: use opacity + transform only

2. **Subtle background “atmosphere”**
   - Trigger: persistent
   - Animation: slow-moving gradient/noise overlay; extremely low amplitude
   - Implementation: CSS background-position animation OR pseudo-element with opacity modulation
   - Reduced motion: static background
   - Perf: keep it GPU-friendly; avoid large repaints

3. **Logo/nav fade**
   - Trigger: initial mount
   - Animation: nav fades in after hero begins (80–150ms delay)
   - Implementation: CSS transition
   - Reduced motion: none

### B) Scroll-Driven Reveals (Core “premium” feel)

4. **Section reveal on enter**
   - Trigger: section enters viewport (IntersectionObserver)
   - Animation: opacity 0→1 + translateY 12→0 with ease-out
   - Implementation: CSS class toggle + transition; IO threshold 0.15–0.25
   - Reduced motion: show immediately; no transition
   - Perf: keep observers bounded; avoid per-element observers if possible (batch)

5. **Card group stagger**
   - Trigger: card grid enters viewport
   - Animation: each card reveals with 60–90ms stagger
   - Implementation: CSS delay per index or JS timeline
   - Reduced motion: show immediately

6. **Marquee / looping ticker**
   - Trigger: persistent
   - Animation: horizontal loop (“Build → Deploy → Test → Demo”)
   - Implementation: CSS animation on transform; duplicate content for seamless loop
   - Reduced motion: pause marquee or replace with static list
   - Perf: transform only; avoid huge DOM

7. **Sticky “timeline” progress**
   - Trigger: user scroll within “How it works”
   - Animation: left rail line fills; step dots activate; current step text brightens
   - Implementation: scroll progress calculation with requestAnimationFrame, or GSAP ScrollTrigger if allowed
   - Reduced motion: no progress animation; show all steps with static emphasis
   - Perf: avoid reading layout each frame; precompute section bounds

8. **Counter / numeric roll-up (optional, use sparingly)**
   - Trigger: metrics enter viewport
   - Animation: numbers count up (e.g. “50 seats” is constant; do not animate if it feels gimmicky)
   - Implementation: requestAnimationFrame count up; clamp duration 600–900ms
   - Reduced motion: no count animation

### C) Hover / Pointer Interactions (Refunnel-style polish)

9. **Primary button hover**
   - Trigger: hover/focus
   - Animation: subtle glow + 1–2px lift; arrow icon shifts 2–4px
   - Implementation: CSS transition; use box-shadow + transform
   - Reduced motion: keep hover state but no movement

10. **Card hover lift**
   - Trigger: hover/focus
   - Animation: translateY -2 to -6px; shadow expands; border tint
   - Implementation: CSS transition
   - Reduced motion: minimal shadow tint only

11. **Link underline “draw”**
   - Trigger: hover/focus
   - Animation: underline animates from left to right
   - Implementation: pseudo-element scaleX transition
   - Reduced motion: static underline

12. **Cursor accent (optional)**
   - Trigger: pointer move over interactive elements
   - Animation: cursor blob expands over CTA/cards
   - Implementation: JS cursor follower (only if perf-safe)
   - Reduced motion: disable cursor follower
   - Perf: gate behind `pointer: fine`; throttle pointer events

### D) Nav / Menu Animations (TKS-style “big” menu)

13. **Mobile menu open**
   - Trigger: menu click
   - Animation: overlay slides/fades in; items stagger in
   - Implementation: CSS transitions; focus trap
   - Reduced motion: instant open/close
   - A11y: ESC closes; focus returns to opener

14. **Active section indicator**
   - Trigger: scroll
   - Animation: indicator moves to active link (subtle)
   - Implementation: CSS class change (no continuous animation) OR translateX with measured bounds
   - Reduced motion: instant state change

### E) FAQ Accordion

15. **Accordion open/close**
   - Trigger: click
   - Animation: content height expands + opacity in; chevron rotates
   - Implementation: CSS grid `grid-template-rows` trick or JS measured height
   - Reduced motion: instant open/close; keep chevron state
   - A11y: correct button semantics + aria-expanded

### F) Form UX (Apply Page)

16. **Input focus**
   - Trigger: focus
   - Animation: border tint + glow; label shifts (optional)
   - Implementation: CSS transition
   - Reduced motion: no movement

17. **Validation feedback**
   - Trigger: invalid submit
   - Animation: error text fades in; field border animates to error color (avoid shaking by default)
   - Implementation: CSS class
   - Reduced motion: instant

18. **Submit loading**
   - Trigger: submit
   - Animation: button shows spinner; text swaps to “Redirecting…”
   - Implementation: UI state; disable double submit

---

## 4) Section-by-Section Motion Mapping (from IA Spec)

Use this as the canonical mapping from anchors to motion patterns.

- `#top` (Hero)
  - Patterns: 1, 2, 3, 9, 6 (optional)
- `#why`
  - Patterns: 4, 5, 10, 11
- `#speakers` (Phase 5 addition)
  - Patterns: 4, 5, 10, 11 (card stagger + hover lift + link underline)
- `#outcomes`
  - Patterns: 4, 5, 10
- `#how`
  - Patterns: 4, 7
- `#agenda`
  - Patterns: 4, 5
- `#pricing`
  - Patterns: 4, 5, 9
- `#faq`
  - Patterns: 4, 15
- `#apply`
  - Patterns: 4, 9

---

## 5) Implementation Steps (UI Agent Checklist)

### Step 1 — Tokens
- Encode color/typography/spacing tokens from `docs/phase-3/design-motion-spec.md` into:
  - `:root` CSS variables
  - tailwind theme mapping (if using Tailwind utilities heavily)
- Build a minimal component base:
  - Button (primary/secondary)
  - Card
  - Section wrapper
  - Accordion
  - Form field

### Step 2 — Page Structure
- Implement `/` with exact anchor structure from `docs/phase-3/ia-copy-spec.md`.
- Keep copy verbatim (pricing/refund/location/instructor quote).
- Add placeholder media blocks (images/video) with lazy loading.

### Step 3 — Motion Infrastructure
- Implement `prefers-reduced-motion` detection.
- Implement IntersectionObserver reveal system:
  - support “reveal once”
  - support stagger groups
- Implement marquee component (with reduced-motion fallback).
- Implement accordion animation approach (CSS-first if possible).

### Step 4 — Apply UI + Wiring
- Build `/apply` form UI that calls `POST /api/apply`.
- Redirect to returned `checkoutUrl`.
- Build `/apply/success` UI (simple, calm).

### Step 5 — Admin UI (Phase 5 — Full Ops Dashboard)
- Build `/admin` UI with:
  - **Attendees tab:** table + search + detail panel + status edits + internal notes + CSV export
  - **Referral Codes tab:** CRUD table + active/inactive toggle (with reason) + audit log viewer
  - Calls new Phase 5c APIs:
    - `PATCH /api/admin/attendees/[id]`
    - `GET/POST /api/admin/referral-codes`
    - `PATCH /api/admin/referral-codes/[id]`
    - `GET /api/admin/referral-codes/[id]/audit`

### Step 6 — QA
- Execute `docs/phase-3/qa-deploy-checklist.md`.
- Pay special attention to:
  - reduced motion
  - anchor navigation
  - mobile nav focus trap
  - no CLS on hero and pricing cards

---

## 6) Performance Budgets and Anti-Jank Rules

- Avoid layout reads in scroll handlers.
- Prefer:
  - `transform`, `opacity`, `filter` (careful with blur)
- Avoid:
  - animating `height` in large blocks (use grid/clip approaches)
  - large continuously animating backgrounds on mobile
- Keep media:
  - below-the-fold lazy-loaded
  - use `next/image` for optimized images where possible

