# Phase 6d — Hero Upgrade + Micro-Interaction Polish (Premium, Grounded, Fast)

## Focus
Make the page feel **cleaner and more premium** than it is now by:
- strengthening hero impact and scan path (under 60 seconds)
- adding selective TKS-inspired micro-animations
- tightening spacing, hierarchy, and trust cues (refund, deposit, seat cap)

## Inputs
- Current hero + motion components:
  - `src/components/sections/Hero.tsx` (uses GSAP timeline, staggered reveals)
  - `src/components/motion/*` (RevealOnScroll + LenisProvider)
  - `src/hooks/useReducedMotion.ts`
- Competitive references (principles only):
  - TKS: bold structure + menu + urgency motifs + editorial hierarchy
  - Refunnel: airy polish, soft gradients, pill nav patterns

## Current Hero State (from repo audit)
The existing hero already includes:
- Marquee with event details (dates, seats, deposit, pods)
- Main headline: "Build a working AI agent in a weekend. In person."
- 3 "what you leave with" items (working agent, deployment path, evaluation loop)
- Primary CTA: "Apply / Reserve Seat"
- Secondary CTA: "Have a network code?"
- Trust cues: deposit amount, refund info, instructor name, structure description
- Decorative ticket cards with rotation
- GSAP staggered animation (desktop, reduced-motion gated)

## Work
1. **Hero structure review**
   - Ensure 1 clear promise + 1 clear CTA + 3 "what you leave with" are scannable in <60s
   - Make trust cues immediately scannable (refund, deposit, seats)
   - Review whether the two-CTA approach is clear or if "Have a network code?" should be deprioritized visually
2. **Hero visual**
   - Add a non-generic "hero moment" that fits the current OKLCH light palette:
     - subtle gradient field / structured texture / diagrammatic motif
   - No neon/dark "AI vibe", no gradient text gimmicks
   - Review ticket card decoration — keep if it adds personality, simplify if it clutters
3. **Micro-interactions (progressive enhancement)**
   - CTA hover/press (scale + shadow shift)
   - small icon/arrow motions on hover
   - consistent reveal cadence across sections (check RevealOnScroll stagger timings)
   - Ensure GSAP timeline doesn't conflict with RevealOnScroll for below-the-fold sections
4. **Reduced-motion**
   - All of the above must degrade to static/near-static
   - Verify via `reduced-motion.spec.ts` and manual check
5. **Hero animation regression guard** _(RED TEAM F8)_
   - Add a Playwright assertion that hero elements are visible after page load:
     - h1 is visible (opacity > 0)
     - CTA button is visible and clickable
     - This catches GSAP animation regressions where elements stay hidden
6. **Screenshots + comparison**
   - Run snapshot capture before and after changes:
     - `node scripts/snapshot-sites.mjs --out docs/planning/phase-6/snapshots/before http://localhost:3000` (before changes)
     - Same command to `snapshots/after` (after changes)
   - Visual diff to validate cleanliness _(RED TEAM F10)_

## Validation
- [ ] Hero communicates the offer in <60s (manual review)
- [ ] Trust cues (refund, deposit, seats) visible without scrolling
- [ ] CTA hover/press states feel intentional
- [ ] All GSAP animations complete (elements not stuck at opacity:0)
- [ ] Reduced-motion: no animations, all content visible immediately
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` pass
- [ ] `npm run test:e2e` passes (including new hero visibility assertion)
- [ ] Before/after snapshots captured

## Output
- Updated hero trust + semantics:
  - `src/components/sections/Hero.tsx`:
    - Added Stripe + refund trust pills to the hero meta row (mobile-visible).
    - Updated “Have a network code?” CTA to deep-link to `/apply?network=1`.
    - Added `aria-hidden`/`focusable="false"` to decorative SVGs.
    - Tightened location copy (“Venue shared after you reserve a seat.”).
  - `src/app/apply/page.tsx`:
    - Auto-expands the Network code field when `?network=1` is present.
- Captured local-after screenshots:
  - `docs/planning/phase-6/snapshots/local-after/*`

## Handoff
- If you want a “before vs after” visual diff, capture `local-before` using the same script and compare against `snapshots/local-after/`.
