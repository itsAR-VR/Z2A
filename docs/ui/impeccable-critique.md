# Impeccable Critique (Baseline) — Public Funnel UI

> Update (2026-02-06): This critique was written against an earlier baseline. The current implementation has moved to a light-first palette and significantly improved motion + layout structure. Use it as a “what not to regress to,” and see `docs/planning/phase-5/review.md` for current readiness and remaining gaps.

Evidence captured (Playwright):
- Local hero: `/Users/AR180/Desktop/Codespace/Z2A/.playwright/local-top.png`
- Refunnel hero: `/Users/AR180/Desktop/Codespace/Z2A/.playwright/comp-refunnel-desktop-top.png`
- TKS hero: `/Users/AR180/Desktop/Codespace/Z2A/.playwright/comp-tks-desktop-top.png`

## Anti-Patterns Verdict
Fail. If you told someone “AI made this,” they’d believe you immediately:
- Dark theme + neon accent + centered hero + repeated card grids.
- Motion is generic and uniform (fade/translate everywhere) rather than designed.
- Visual hierarchy is flat: sections are similarly shaped and similarly weighted.

## Overall Impression
The content structure is mostly correct (anchored IA, sections present), but the execution feels like an MVP template rather than a premium event funnel. The biggest opportunity is to commit to a clear visual direction (Refunnel-level polish) while preserving the strong narrative structure (TKS-style urgency and structure).

## What’s Working
1. The IA is sensible: Why → Speakers → Outcomes → How → Agenda → Pricing → FAQ → Apply.
2. Reduced-motion support exists and is implemented responsibly.
3. The apply funnel mechanics are straightforward (form → POST → Stripe redirect).

## Priority Issues

1. **The design direction reads “generic AI landing page”**
   - Why it matters: Trust and price perception are the product here. A $1,000–$1,500 event needs premium confidence.
   - Fix: Move to a light-first palette with tinted neutrals; introduce an editorial grid; reduce “card chrome.”
   - Command: `/critique`, `/polish`

2. **Hero composition is centered and timid compared to references**
   - Why it matters: The hero is the decision moment. Refunnel uses space, typographic confidence, and layered visuals; TKS uses impact and urgency.
   - Fix: Create a bolder hero with asymmetry, a marquee/ticker motif, and a single orchestrated intro animation.
   - Command: `/polish`

3. **Section rhythm and hierarchy are monotonous**
   - Why it matters: Users scroll, but they don’t read everything. Rhythm guides scanning and comprehension.
   - Fix: Vary density (tight clusters for “steps,” generous whitespace for “stakes”), introduce 2–3 distinct section layout patterns.
   - Command: `/polish`

4. **Copy feels “enterprise-grade” instead of concrete**
   - Why it matters: Vague claims reduce credibility. This audience wants specifics: what you build, what you leave with, what’s required.
   - Fix: Rewrite key lines to be testable and specific; reduce jargon.
   - Command: `/clarify`

5. **Motion exists but isn’t “designed”**
   - Why it matters: Reference sites use motion to create perceived quality and guide attention. Uniform reveals feel templated.
   - Fix: Define motion primitives + apply section-specific variants; add a hero intro; add reduced-motion equivalents.
   - Command: `/polish` (and a motion spec pass)

## Minor Observations
- Buttons and links need stronger focus-visible states.
- Mobile overlay menu should manage focus and support ESC to close.
- Create/Activate/Deactivate flows in admin feel functional, but copy and modality are heavy.

## Questions to Consider
- What would a “confident” version of this page look like if we removed 50% of the cards and doubled the typography intent?
- Where do we want the user’s eye to land in the first 3 seconds, and what motion supports that?
- What’s the single most concrete “takeaway artifact” we can name in the hero (without overpromising)?
