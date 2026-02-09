# Phase 7 — Impeccable Recursive UX Sweep (TKS-Inspired, Agentic Cinematic)

## Purpose
Recursively apply the "impeccable" quality bar across the entire site (landing, apply, admin) to deliver a premium, builder-first experience with a cohesive motion language and a bolder, more thematic "agentic" motif that demonstrates the power of AI agents without becoming hypey.

## Context
- The product is currently a workshop-first funnel:
  - `/` single-page landing with anchored IA (Nav sections: Why, Speakers, Outcomes, How, Agenda, Pricing, FAQ, Apply).
  - `/apply` application + Stripe deposit redirect.
  - `/admin` ops UI (attendees + referral codes + audit logs).
- The user wants:
  - A recursive, system-wide polish pass (not just the hero).
  - More thematic, more complex motion (still purposeful), inspired heavily by TKS.world structure/energy.
  - A clear proof point that "this site was built by an AI agent" (secondary to the workshop offer).
- Repo reality:
  - Tech: Next.js App Router + React, GSAP present, Lenis provider (desktop only), IntersectionObserver reveal system, global reduced-motion support.
  - Theming: OKLCH tokens in `src/app/globals.css` are used widely on the public site; admin UI still uses some hard-coded Tailwind colors for statuses.

## Concurrent Phases
Overlap detected with Phase 6 (same files/domains).

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 6 | Complete (merged to `main`) | Files: `src/components/Nav.tsx`, `src/components/sections/Hero.tsx`, `src/app/apply/page.tsx`, `src/app/api/stripe/webhook/route.ts`, `z2a/*.spec.ts` | Phase 7 execution starts from the Phase 6 baseline; avoid duplicating Phase 6 work. |
| Phase 5 | Complete | Domain: public site + apply + admin baseline | Treat Phase 5 as baseline constraints/behaviors; Phase 7 is incremental UX + motion cohesion. |

## Objectives
* [x] Run audits first (impeccable-audit + critique + rams) and produce prioritized, file-specific findings.
* [x] Standardize a global motion system (tokens + primitives) that all features use consistently (including reduced-motion path).
* [x] Introduce a bold-cinematic, agentic hero/trace motif and reuse it as a subtle system cue across the site.
* [x] Improve onboarding + clarity in the apply funnel (less friction, clearer next steps, better error recovery).
* [x] Normalize admin theming + a11y behaviors to match the public experience (tokens, dialog patterns, keyboard support).
* [x] Expand Playwright coverage to lock in reduced-motion, mobile nav, dialog focus, and admin tab semantics.
* [x] Complete an optimize + polish pass (perf, spacing, typography, states) and verify all QA gates.
* [x] Close production parity (deploy latest) and verify with prod-safe smokes + Stripe E2E.

## Constraints
- No pixel-perfect cloning of TKS.world; heavy inspiration is allowed but composition/copy/visuals must remain original.
- Brand/voice remains: focused, premium, builder-first; no "AI magic" language.
- Workshop-first messaging stays primary; "AI built this" is a secondary proof point.
- Light-first theme; avoid neon-on-black, generic "AI vibe", glassmorphism, and gradient text.
- Motion is purposeful progressive enhancement:
  - Only animate `transform` and `opacity` (no layout thrash).
  - Must honor `prefers-reduced-motion` (Lenis off, GSAP sequences off/simplified, reveals instant/minimal).
- Do not change Stripe/security mechanics without explicit need; funnel correctness is not negotiable.

## Success Criteria
- UX + motion
  - Motion feels consistent across nav, sections, dialogs, and forms (shared durations/easing; no random timings).
  - One signature hero moment exists and is memorable, but the rest of the site stays restrained and high-trust.
  - Reduced-motion path is correct and validated in E2E.
- A11y
  - Keyboard navigation works for: Nav menu, Speakers dialog, Accordions, Apply form validation, Admin tabs and dialogs.
  - No icon-only buttons without accessible names; no click-only divs; touch targets >= 44px where applicable.
- Theming
  - Admin UI uses semantic tokens (no hard-coded green/yellow/red Tailwind classes for status meaning).
- QA
  - `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e` pass.
  - New Playwright checks cover: reduced-motion hero elements, mobile menu focus/scroll-lock, admin tabs/dialog focus behaviors.

## Subphase Index
* a — Platform inventory + impeccable audit/critique/rams (reports + prioritized backlog)
* b — System foundations: motion tokens + semantic status tokens + motion primitives standardization
* c — Landing: TKS-inspired structure pass + bold-cinematic "agent trace" hero + delight
* d — Apply: onboarding + clarify + harden + adapt + motion consistency improvements
* e — Admin: a11y + theming normalization + dialog/table hardening
* f — Optimize + polish + verification (perf, regression tests, final review doc)
* g — Production parity + launch readiness (deploy + prod-safe smoke + Stripe E2E)

## Repo Reality Check (RED TEAM)

- What exists today:
  - **All file paths verified against repo** — every path referenced in subphase plans exists on disk.
  - **GSAP** v3.14.2 installed (confirmed in `package.json`).
  - **Lenis** v1.3.17 installed; `LenisProvider.tsx` exists at `src/components/motion/LenisProvider.tsx`.
  - **RevealOnScroll** uses inline numeric durations (`0.72s`) and a hardcoded easing (`cubic-bezier(0.16, 1, 0.3, 1)`) — no tokenized motion system yet.
  - **Hero GSAP timeline** uses inline `power3.out` easing and hardcoded durations (0.5–0.8s) — not tokenized.
  - **Dialog component** exists at `src/components/Dialog.tsx` — fully featured (focus trap, ESC, scroll lock, focus restore).
  - **AttendeeDetail** at `src/components/admin/AttendeeDetail.tsx` is a **bespoke overlay** (`fixed inset-0 bg-black/60`) — **no** ESC handler, **no** focus trap, **no** scroll lock compensation, **no** `role="dialog"`. Does **not** use the shared `Dialog` component.
  - **Admin tabs** use `<button>` elements but have **no** `role="tablist"` / `role="tab"` / `role="tabpanel"` / `aria-selected` semantics.
  - **Admin clickable rows**: `AttendeeTable.tsx:96` has `<tr onClick>` — not keyboard-accessible.
  - **Semantic tokens**: `globals.css` already has `--color-error` (oklch 58% 0.22 25) and `--color-warning` (oklch 80% 0.17 85) but is **missing** `--color-success` and `--color-info`.
  - **Hard-coded status colors**: 15 instances across 3 admin files use `text-green-400`, `text-yellow-400`, `text-red-400` (raw Tailwind) instead of semantic tokens.
  - **Reduced-motion test**: `z2a/reduced-motion.spec.ts` only covers marquee animation class absence — does **not** test GSAP hero, reveals, or nav transitions.
  - **Nav sections** in IA: Why, Speakers, Outcomes, HowItWorks (id="how"), Agenda, Pricing, FAQ, CTAFooter — matches plan's "How" reference.
- What the plan assumes:
  - GSAP is present → ✅ confirmed.
  - A shared Dialog component exists → ✅ confirmed, but admin detail overlay does **not** use it.
  - Admin tabs lack ARIA semantics → ✅ confirmed, zero `tablist`/`tab` roles found.
  - Admin has hard-coded colors → ✅ confirmed, 15 instances.
  - `RevealOnScroll` uses inline durations → ✅ confirmed.
- Verified touch points:
  - `src/components/motion/RevealOnScroll.tsx` — inline `0.72s` + `cubic-bezier(0.16, 1, 0.3, 1)` + `delay` in ms
  - `src/hooks/useReveal.ts` — `useSyncExternalStore` pattern, `useReducedMotion` gating
  - `src/hooks/useReducedMotion.ts` — exists
  - `src/components/Dialog.tsx` — full a11y (focus trap, ESC, scroll lock, aria-modal, focus restore)
  - `src/components/admin/AttendeeDetail.tsx:83` — raw `fixed inset-0` overlay, no a11y
  - `src/app/admin/page.tsx` — `TabButton` component at line 48, no ARIA tab roles
  - `src/app/globals.css` — has `--color-error`, `--color-warning`; missing `--color-success`, `--color-info`

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- **F1: Phase 6 uncommitted changes** — Phase 6 modified `Nav.tsx`, `Hero.tsx`, `apply/page.tsx`, `webhook/route.ts`, and all test specs. Phase 7 must NOT begin editing these files without first committing/merging Phase 6 work. → **Mitigation**: 7a pre-flight step must confirm `git status` shows clean working tree for all Phase 7 target files, or explicitly diff against committed baseline.
- **F2: AttendeeDetail overlay has zero a11y** — Phase 7e says "replace bespoke overlays with shared Dialog component" but doesn't call out the specific gap: no ESC, no focus trap, no scroll lock, no `role="dialog"`, no `aria-modal`. The rewrite is more involved than a CSS swap. → **Mitigation**: 7e work step 3 must explicitly list: wrap in `<Dialog>`, remove manual `fixed inset-0` wrapper, pass `labelledBy`/`onClose` props, verify ESC + focus restore + scroll lock.
- **F3: Semantic token gap** — `globals.css` already has `--color-error`/`--color-warning` but no `--color-success`/`--color-info`. 7b's "add semantic tokens" step must acknowledge what exists and only add what's missing, to avoid accidental duplication or color-shift. → **Mitigation**: 7b step 3 should read existing tokens first, then add only `--color-success` and `--color-info` (plus surface-mix variants).
- **F4: GSAP timings not tokenizable via CSS variables** — CSS custom properties cannot be read by GSAP's JS timeline. The plan says "replace ad-hoc timings with tokenized variants" for GSAP, but GSAP reads JS values, not CSS. → **Mitigation**: Define motion constants in a shared JS/TS module (e.g., `src/lib/motion-tokens.ts`) exporting duration/easing values. CSS-based motion tokens cover `RevealOnScroll` and CSS transitions; JS tokens cover GSAP. Document both in 7b's `motion-and-tokens.md`.

### Missing or ambiguous requirements
- **M1: "Agent Trace" dialog content** — 7c work step 2 says "add an Agent Trace affordance that opens a premium dialog with a short build log narrative." The content of this dialog is unspecified. What does the build log say? How many entries? Is it static or dynamic? → **Open question** (see below).
- **M2: RevealOnScroll "variant system" API** — 7b step 2 adds `soft`/`snappy`/`cinematic` variants. These need concrete definitions (durations, easings, translate offsets). The plan leaves them abstract. → **Mitigation**: Define in 7b plan: `soft` = 0.72s quart, 18px; `snappy` = 0.4s expo, 10px; `cinematic` = 1.0s quint, 24px (or similar). Document in `motion-and-tokens.md`.
- **M3: Nav IA mismatch** — The root plan Context says nav sections include "Apply" but the actual nav links in `Nav.tsx` are: Why, Speakers, Outcomes, How, Agenda, Pricing, FAQ (no "Apply" in the nav link list — "Apply" is a CTA button). Minor but could cause confusion. → **Mitigation**: Corrected in Context section above.
- **M4: Admin Playwright testing feasibility** — 7e step 6 and 7f step 3 mention admin Playwright tests but the admin is behind Basic Auth (`src/middleware.ts`). Tests need `httpCredentials` or the auth middleware must be bypassed for test runs. → **Mitigation**: Add a note to 7e/7f that Playwright admin tests must use `httpCredentials` in the test config (already supported in Playwright's `use` block) or use manual QA steps.

### Repo mismatches (fix the plan)
- **R1**: Root plan Context says "GSAP present" — confirmed, `gsap@3.14.2` in `package.json`. ✅ No fix needed.
- **R2**: 7a Inputs references `AGENTS.md` for brand/context rules — file exists at repo root. ✅ No fix needed.
- **R3**: 7c references "existing hero GSAP choreography" — confirmed at `Hero.tsx:59-96` as a `gsap.timeline` with 6 `fromTo` calls. ✅ Accurate.
- **R4**: 7e work step 2 says "Replace clickable `<tr onClick>` with an explicit, focusable control" — confirmed at `AttendeeTable.tsx:96`. ✅ Accurate.
- **R5**: 7e Inputs lists `src/components/admin/AttendeeDetail.tsx` — exists. But the plan doesn't note it's a **bespoke overlay** (see F2 above). Plan updated.

### Performance / timeouts
- **P1: GSAP bundle size** — GSAP is ~27kB min+gz. If the hero trace SVG animation adds complexity (ScrollTrigger, MorphSVG, DrawSVG plugins), bundle could grow. → **Mitigation**: 7c should use only core GSAP (no paid plugins). If stroke reveal is needed, use CSS `stroke-dashoffset` animation driven by IntersectionObserver, not GSAP DrawSVGPlugin.
- **P2: RevealOnScroll `will-change` always set** — `RevealOnScroll.tsx:42` sets `willChange: "transform, opacity"` permanently. This allocates GPU layers even after animation completes. → **Mitigation**: 7b should remove `will-change` after reveal completes (or let CSS `will-change: auto` reset via a class toggle).

### Security / permissions
- **S1: Admin Basic Auth in tests** — Admin tests must not expose credentials in CI/committed code. → **Mitigation**: Use `process.env.ADMIN_BASIC_AUTH_USER` and `process.env.ADMIN_BASIC_AUTH_PASS` (or `process.env.ADMIN_BASIC_AUTH_PASSWORD`) in Playwright `httpCredentials`, sourced from `.env.local`.
- **S2: No new security surface** — Phase 7 is UX-only; no new API routes or auth changes planned. ✅ Low risk.

### Testing / validation
- **T1: Reduced-motion coverage is thin** — Only tests marquee class absence. Does not test: GSAP hero skipped, `RevealOnScroll` instant visibility, Lenis disabled, nav transitions disabled. → **Mitigation**: 7f step 3 must add specific assertions for each motion system under `reducedMotion: "reduce"`.
- **T2: Admin tests behind auth** — Plan mentions admin Playwright tests but doesn't specify auth mechanism. → **Mitigation**: See M4.
- **T3: "Agent Trace" dialog testability** — If 7c adds a new dialog, tests need stable selectors (`data-testid`) and focus/ESC assertions. Plan doesn't mention this. → **Mitigation**: 7c step 5 should include: add `data-testid="agent-trace-dialog"`, test ESC close + focus restore.

## Assumptions (Agent)

- **Phase 6 changes will be committed before Phase 7 execution begins** (confidence ~95%)
  - Mitigation: If Phase 6 is still in-flight, 7a's pre-flight step will detect uncommitted changes and halt until resolved.
- **GSAP core (no paid plugins) is sufficient for the hero "agent trace" animation** (confidence ~90%)
  - Mitigation: If SVG stroke-draw is needed, use CSS `stroke-dashoffset` + IntersectionObserver instead of GSAP DrawSVGPlugin (which requires a paid GreenSock license).
- **Admin Playwright tests are feasible with `httpCredentials`** (confidence ~92%) — **CONFIRMED: user chose E2E.**
  - Mitigation: If auth middleware blocks credentials in test, debug the middleware rather than falling back to manual QA.
- **The "agent trace" SVG is a static, decorative element — not data-driven** (confidence ~85%) — **CONFIRMED: user chose static curated narrative.**

## Open Questions — RESOLVED

- [x] **Agent Trace dialog content** → **Static curated narrative** (3-5 bullet points, e.g., "12,000+ lines", "6 planning phases", "Stripe verified end-to-end"). No API or live data needed.
- [x] **Agent trace SVG scope** → **Hero only**. No recurring motif, no reusable SVG component needed. Can be inlined in `Hero.tsx`.
- [x] **Admin tests** → **E2E with Playwright** using `httpCredentials` for Basic Auth. Invest in proper test setup, no manual QA fallback.

## Phase Summary (running)
- 2026-02-08 — Completed 7a audit artifacts (files: `docs/planning/phase-7/a/audit.md`, `docs/planning/phase-7/a/critique.md`, `docs/planning/phase-7/a/rams.md`, `docs/planning/phase-7/a/backlog.md`)
- 2026-02-08 — Implemented 7b motion + semantic token foundations (files: `src/app/globals.css`, `src/lib/motion-tokens.ts`, `src/components/motion/RevealOnScroll.tsx`, `src/components/Nav.tsx`, `src/components/admin/AttendeeTable.tsx`, `src/components/admin/AuditLogViewer.tsx`, `src/components/admin/ReferralCodeTable.tsx`, `docs/planning/phase-7/b/motion-and-tokens.md`)
- 2026-02-08 — Implemented 7c landing hero “agent trace” signature moment + dialog + tests (files: `src/app/globals.css`, `src/components/sections/Hero.tsx`, `src/components/Dialog.tsx`, `src/components/Nav.tsx`, `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`)
- 2026-02-08 — Implemented 7d apply hardening (chips, first-invalid focus, retry/timeout states) + tests (files: `src/app/apply/page.tsx`, `z2a/apply.spec.ts`)
- 2026-02-08 — Implemented 7e admin a11y normalization (ARIA tabs + Dialog migration) + deterministic E2E (files: `src/app/admin/page.tsx`, `src/components/admin/AttendeeTable.tsx`, `src/components/admin/AttendeeDetail.tsx`, `z2a/admin.spec.ts`)
- 2026-02-08 — Implemented 7f reduced-motion + nav regression coverage and reran QA gates (files: `src/components/motion/LenisProvider.tsx`, `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`)
- 2026-02-08 — Deployed Phase 7 to production, verified prod-safe smokes, and verified Stripe prod E2E (files: `src/app/layout.tsx`, `docs/planning/phase-7/review.md`, `docs/planning/phase-7/g/plan.md`)
