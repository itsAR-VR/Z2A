# Impeccable Audit (Baseline) — Public Funnel UI

> Update (2026-02-06): This document was written against an earlier baseline (dark theme + missing focus management).
> The current codebase has since moved to a light-first OKLCH palette, improved focus-visible states, a focus-trapped mobile nav, and clickable speaker profiles with an accessible modal.
> Keep this file as historical context; for current QA evidence, see `docs/planning/phase-5/review.md`.

Evidence captured (Playwright):
- Local: `/Users/AR180/Desktop/Codespace/Z2A/.playwright/local-top.png`
- Local (section viewport shots): `/Users/AR180/Desktop/Codespace/Z2A/.playwright/local-*.png`
- Ref: `/Users/AR180/Desktop/Codespace/Z2A/.playwright/comp-refunnel-desktop-top.png`
- Ref: `/Users/AR180/Desktop/Codespace/Z2A/.playwright/comp-tks-desktop-top.png`

## Anti-Patterns Verdict
Fail. This currently reads as “AI-generated landing page template”:
- Dark theme + neon accent (“AI palette”) instead of a deliberate brand palette. (`/Users/AR180/Desktop/Codespace/Z2A/src/app/globals.css`)
- Repeated identical card grids (icon/title/paragraph) across multiple sections.
- Generic motion: same fade/translate pattern everywhere, no orchestrated hero moment.
- Copy leans “enterprise-grade workflow” without concrete proof, which feels like filler.

## Executive Summary
- Issues found:
  - Critical: 4
  - High: 9
  - Medium: 10
  - Low: 8
- Top problems:
  - Design direction mismatch vs references (Refunnel: airy/premium; TKS: bold/structured).
  - Systemic spacing + hierarchy monotony (everything is the same “section + card grid”).
  - Missing/weak interactive states (keyboard focus, hover/focus consistency).
  - Motion is present but not “designed”; also complicates screenshot/full-page verification due to offscreen hidden content.
- Recommended next steps:
  1. Redefine tokens (light-first palette, typography scale, spacing scale).
  2. Re-layout sections with editorial structure (less cards, stronger hierarchy).
  3. Add purposeful motion: one hero intro + consistent section reveals; respect reduced motion.
  4. Rams pass: keyboard focus states, semantic headings, touch targets.

## Detailed Findings by Severity

### Critical Issues

1. **AI-slop visual direction (palette + layout template repetition)**
   - Location: `src/app/globals.css`, `src/components/Card.tsx`, `src/components/sections/*`
   - Severity: Critical
   - Category: Theming / Anti-patterns
   - Description: Neon-on-black + ubiquitous card grids produce a generic “AI landing page” aesthetic.
   - Impact: Undermines trust and perceived price/value; feels like a template.
   - Recommendation: Switch to light-first tinted neutrals, accent used sparingly; redesign sections to avoid repeating card grids.
   - Suggested command: `/critique`, `/polish`

2. **Keyboard focus visibility gaps**
   - Location: `src/components/Button.tsx`, `src/components/Nav.tsx`, `src/components/Badge.tsx`, multiple anchor links
   - Severity: Critical
   - Category: Accessibility
   - Description: Buttons/links don’t consistently provide visible focus states (`:focus-visible`).
   - Impact: Keyboard users can’t navigate reliably; WCAG 2.4.7 risk.
   - Recommendation: Add focus ring styles and ensure focus order is logical.
   - Suggested command: `/rams`

3. **Motion pattern hides offscreen content (verification + perceived jank)**
   - Location: `src/components/motion/RevealOnScroll.tsx`, `src/hooks/useReveal.ts`
   - Severity: Critical
   - Category: Performance / UX
   - Description: Content is rendered at `opacity: 0` until intersecting; this can make “full page” capture/testing misleading and risks flash/blank states if observer fails.
   - Impact: QA difficulty; users can perceive “missing content” during load on slow devices.
   - Recommendation: Use progressive enhancement defaults (content visible by default) or ensure critical above-the-fold content is visible immediately; add `will-change` and reduce layout-affecting wrappers.
   - Suggested command: `/optimize`, `/polish`

4. **Missing favicon (/favicon.ico 404)**
   - Location: Browser console on `/`
   - Severity: Critical
   - Category: Quality
   - Description: Requests `/favicon.ico` and receives 404.
   - Impact: No brand polish; noisy console.
   - Recommendation: Add `src/app/favicon.ico` or `public/favicon.ico`.
   - Suggested command: `/polish`

### High-Severity Issues

1. **Section rhythm is flat**
   - Location: `src/components/SectionWrapper.tsx`, `src/app/globals.css` (`.section-padding`)
   - Severity: High
   - Category: Layout
   - Description: Every section uses identical padding and similar layout shapes.
   - Impact: Page feels long and monotonous; weaker scan.
   - Recommendation: Introduce a spacing scale and vary section density intentionally.
   - Suggested command: `/polish`

2. **Typography hierarchy lacks “hero” authority**
   - Location: `src/components/sections/Hero.tsx`, `src/app/globals.css`
   - Severity: High
   - Category: Typography
   - Description: H1 sizing is ok, but composition feels like “centered marketing block.”
   - Impact: Doesn’t match premium references; weak emotional resonance.
   - Recommendation: Stronger editorial layout (asymmetry, typography scale, better line breaks).
   - Suggested command: `/critique`, `/polish`

3. **Copy contains jargon / vague claims**
   - Location: `src/components/sections/Why.tsx` and others
   - Severity: High
   - Category: UX Writing
   - Description: “Production-ready enterprise-grade workflow” is vague and reads as filler.
   - Impact: Reduced credibility; unclear outcomes.
   - Recommendation: Replace with concrete, testable outcomes and constraints.
   - Suggested command: `/clarify`

4. **Mobile menu lacks focus management**
   - Location: `src/components/Nav.tsx`
   - Severity: High
   - Category: Accessibility
   - Description: Overlay opens but focus isn’t moved/contained; ESC close not handled.
   - Impact: Keyboard users can get lost; screen reader experience degrades.
   - Recommendation: Add focus trap + ESC handler + return focus to menu button.
   - Suggested command: `/rams`

5. **Cards look same across sections**
   - Location: `src/components/Card.tsx`, `src/components/sections/Why.tsx`, `Outcomes.tsx`, `Speakers.tsx`, `Pricing.tsx`
   - Severity: High
   - Category: Visual Design
   - Description: Same border, same background, same padding, same hover.
   - Impact: “Template feel”; weak hierarchy.
   - Recommendation: Create distinct section-specific modules; not everything needs a card.
   - Suggested command: `/critique`

### Medium-Severity Issues
- Inconsistent semantics: multiple H2s without a clear page-level structure map (review headings in `src/components/sections/*`).
- Buttons don’t expose disabled semantics when used as links (`<Link>` can’t be disabled); risk for “disabled” variants. (`src/components/Button.tsx`)
- Inputs rely on placeholder for some guidance; could add helper text for clarity on sensitive fields. (`src/app/apply/page.tsx`)
- Pricing/remainder copy is present but could be simplified and made more legible.
- Reveal wrapper adds extra DOM; can interfere with full-height flex/grid fill.

### Low-Severity Issues
- `animate-fade-in` class is referenced but not defined (`src/components/Nav.tsx`).
- Some hover shadows feel heavy for a “premium light” direction; should be subtler after palette shift.
- Scrollbar styling is dark-specific and will need revision in a light-first theme.

## Patterns & Systemic Issues
- “Card grid everywhere” is the main systemic issue; replacing this with 2–3 distinct section layout patterns will yield the biggest quality jump.
- Design tokens are too minimal and too coupled to a dark theme; we need a palette + spacing + radius + shadow scale.
- Motion is applied uniformly; motion should emphasize key moments (hero, primary CTA, and transitions between major sections).

## Positive Findings
- Reduced motion is respected globally. (`src/app/globals.css`, `src/hooks/useReducedMotion.ts`)
- Lenis is disabled on coarse pointer and reduced motion, with safe teardown. (`src/components/motion/LenisProvider.tsx`)
- Accordion uses `grid-template-rows` transitions instead of animating height.

## Recommendations by Priority
1. Immediate
   - Implement focus-visible states for all interactive elements.
   - Add favicon.
2. Short-term
   - Redefine palette + typography + spacing; redesign hero + nav.
   - Replace repeated card grids with editorial layouts.
3. Medium-term
   - Add structured onboarding/trust cues to `/apply` (what happens next, steps, Stripe clarity).
   - Improve motion choreography (hero intro + per-section variants).
4. Long-term
   - Performance/a11y regression checks (Playwright smoke + Lighthouse).

## Suggested Commands for Fixes
- `/critique`: identify the most impactful design changes to stop “template feel.”
- `/clarify`: rewrite vague copy into concrete outcomes.
- `/onboard`: improve `/apply` first-time experience and trust cues.
- `/rams`: accessibility + visual design fixes (focus, semantics, touch targets).
- `/polish`: final spacing/alignment pass once the revamp lands.
