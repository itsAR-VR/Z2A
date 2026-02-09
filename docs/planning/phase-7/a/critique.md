# Phase 7a — Impeccable Critique (Design Director Feedback)

Date: 2026-02-08

## What’s Working (keep it)

- **High-trust offer framing**: Deposit via Stripe, seat limit, and refund policy are explicit. This is a conversion asset.
- **Premium light-first system**: The tinted neutrals + restrained accent look more “serious” than most AI workshop funnels.
- **Editorial hierarchy**: Hero + section headers read cleanly and scan fast.

## Top Priorities (do these first)

1. **One motion language, everywhere**
   - Right now there are multiple “micro” motion styles (hard-coded reveal timing, ad-hoc duration utilities, GSAP defaults).
   - This will feel subtly inconsistent as we add more TKS-inspired structure and interaction.
   - Solution: ship motion tokens + reveal variants (7b), then apply to Nav, Hero, Sticky bar, dialogs, apply inputs.

2. **Admin must match the public quality bar**
   - The admin overlay + tabs are the biggest “product smell” for ops users.
   - The public site can be exquisite, but if the admin feels brittle, it undermines trust in the overall program.
   - Solution: migrate to shared `Dialog`, add ARIA tab semantics, remove clickable `<tr>`, replace hard-coded colors (7e after 7b).

3. **A single signature moment, not a bunch of random animations**
   - TKS has a strong “hero moment” and a consistent urgency motif; it’s not animation spam.
   - Solution: one cinematic “agent trace” hero layer (desktop-only) + restrained reveals; everything else stays quiet (7c).

## TKS-Inspired Direction (without cloning)

- **Menu interaction**: A clean Menu control can make the top navigation feel more “intentional” and reduce nav clutter on smaller widths.
- **Urgency motif**: Keep “Admissions live” language as a consistent device (pill + ticker + sticky apply), but avoid hype.
- **Micro-animations**: Use a consistent reveal vocabulary and subtle hover lifts; avoid adding new styles per section.

## Copy / Trust Pass (keep it concrete)

- The speakers section is a major trust lever. Make the details modal feel “profile-grade”:
  - Clear role, relevant proof points, and links that feel “verifiable” (company site + LinkedIn).
  - Keep “100B tokens” phrasing accurate and non-overstated: team recognition, his responsibility, and when he joined.

## Recommended Implementation Order

1. 7b: tokens + primitives
2. 7c: landing + hero signature
3. 7d: apply resilience + clarity
4. 7e: admin a11y + tokenization
5. 7f: optimize + regression coverage

