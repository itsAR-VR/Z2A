## Design Context

### Users
- **Primary**: PMs, operators, and builder-minded teams who want to ship an AI agent quickly and reliably.
- **Context**: Evaluating an in-person weekend workshop; they need to trust the program, understand outcomes, and commit (application + deposit).
- **Job to be done**: Decide “Is this for me?” in under 60 seconds, then apply with minimal friction.
- **Emotional goals**: Confidence, clarity, momentum. Premium and grounded (not hypey).

### Brand Personality
- **Three words**: Focused, premium, builder-first.
- **Voice**: Direct and concrete. No buzzwords. No “AI magic” language.
- **Trust cues**: Refund policy clarity, Stripe payment transparency, seat limit, and speaker credibility.

### Aesthetic Direction
- **References**:
  - `refunnel.com`: airy premium layout, pill navigation, soft gradients, high typographic polish.
  - `tks.world`: bold structure and hero impact, strong editorial hierarchy, “admissions are live” urgency motifs.
- **Anti-references**:
  - Neon-on-black “AI vibe”, generic card grids, glassmorphism, gradient text “for impact”, centered-everything layouts.
- **Theme**: Light-first, tinted neutrals, strong accent used sparingly. Motion is purposeful and progressive-enhancement.
- **Typography (current)**: Space Grotesk for headings, IBM Plex Sans for body, IBM Plex Mono for code (see `src/app/globals.css`).
- **Palette (current)**: Tinted neutrals + indigo accent defined as OKLCH tokens (`--color-bg`, `--color-surface`, `--color-text`, `--color-accent`, etc.) in `src/app/globals.css`.

### Design Principles
1. **Hierarchy beats decoration**: typography and spacing do the work; minimal “card chrome.”
2. **Story-driven motion**: a single orchestrated hero intro + consistent reveal language; no jank; reduced-motion compliant.
3. **Editorial layout**: asymmetric compositions, clear scan paths, and visible structure (not identical repeating blocks).
4. **Trust is a feature**: price mechanics and refund policy are explicit and easy to verify.
5. **Speed and accessibility**: 60fps transforms only, keyboard navigable, WCAG AA contrast, touch targets >= 44px.
