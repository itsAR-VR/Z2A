# Phase 15 — Motion Elevation Pass for `/` + `/businesses` (TKS-Inspired, Brand-Aligned)

## Purpose
Upgrade the Home and Businesses experiences from clean/static to premium/dynamic by shipping a staged hero timeline, stronger menu/nav motion language, and signature page-level animation blocks while preserving accessibility and light-theme brand consistency.

## Context
- Live QA against `https://zerotoagent.com` confirms routing and core nav behavior are working, but the visual/motion layer is still below the target bar compared with `tks.world` and high-quality SaaS references.
- User direction for this phase is explicit:
  - staged timeline heroes,
  - full-canvas desktop menu,
  - perspective-based 3D nav/link hover motion,
  - one signature motion block per page,
  - stronger first-viewport contrast layering,
  - reduced-motion parity.
- Businesses pricing direction has changed to custom pricing only; this phase must preserve `Contact for pricing` language and avoid reintroducing public price ranges.
- Current workspace has uncommitted changes in `src/app/businesses/page.tsx` and `src/components/Nav.tsx`; this phase must build on those edits rather than reverting them.

## Concurrent Phases
| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 13 | Complete | Same files/domain (`src/app/page.tsx`, `src/app/businesses/page.tsx`, `src/components/Nav.tsx`, `z2a/*`) | Build on Phase 13 IA/routing constraints; do not alter route structure or section IDs. |
| Phase 14 | Complete/Recent | Copy/positioning constraints for `/businesses` and mission framing for `/` | Preserve Phase 14 messaging decisions; motion updates cannot dilute plain-language enterprise positioning. |
| Phase 10 | Complete | Prior nav/menu UX conventions and trust-oriented marketing patterns | Keep trust cues/accessibility behaviors while increasing visual ambition. |

## Objectives
* [x] Define a motion blueprint from validated benchmarks (TKS, Webflow exemplars, SaaS references) mapped to current component architecture.
* [x] Implement staged timeline hero choreography on Home and Businesses.
* [x] Replace the current desktop menu card feel with a stronger full-canvas navigation state.
* [x] Upgrade nav/link hover interactions to perspective-based 3D flip behavior.
* [x] Add one signature motion block per page and strengthen first-viewport visual contrast layers.
* [~] Validate desktop/mobile/reduced-motion behavior and ensure no public pricing returns on `/businesses`. (local complete, live parity blocked on deploy lag)

## Constraints
- Keep existing route map and section IDs unchanged:
  - Home: `top`, `vision`, `programs`, `principles`
  - Businesses: `top`, `who`, `what`, `pricing`, `faq`, `contact`
- Preserve menu accessibility behavior:
  - first focus on open,
  - tab focus trap,
  - ESC close and focus restore.
- Maintain light-first, premium, builder-first visual direction from `AGENTS.md`; avoid dark neon aesthetic drift.
- Keep businesses commercial language in custom-pricing mode:
  - no public numeric tiers/ranges,
  - clear `Contact for pricing` CTA.
- Reduced-motion mode must keep semantics and readability with simplified fades/no complex transforms.
- Do not regress existing Individuals page behavior or copy.

## Success Criteria
- [x] Home hero uses staged reveal timing (headline, body, CTA, secondary media) with visible sequencing and no jank.
- [x] Businesses hero uses staged reveal timing plus a signature orchestration/agentic motion block.
- [x] Desktop menu feels full-canvas (not modal-card-first) and remains keyboard accessible.
- [x] Nav/link hover behavior uses perspective/rotate transforms (not translate-only), with deterministic reduced-motion fallback.
- [x] First viewport contrast layering is visibly stronger on Home and Businesses while staying in light theme.
- [x] `/businesses` shows custom pricing workflow only and includes `Contact for pricing` CTA language (verified local).
- [x] Updated Playwright coverage aligns with new menu/nav behavior and passes locally.
- [ ] Playwright MCP live checks on `https://zerotoagent.com` verify core interaction parity on desktop and mobile. (pending deployment parity)

## Subphase Index
* a — Benchmark-to-motion blueprint and implementation map
* b — Home hero choreography + first-viewport visual layering
* c — Businesses hero choreography + signature orchestration block + custom-pricing preservation
* d — Nav/menu interaction overhaul (full-canvas menu + 3D flip link motion)
* e — Regression safeguards + local and live Playwright verification

## Repo Reality Check (RED TEAM)

- What exists today:
  - Motion and IA changes are implemented locally in `src/app/page.tsx`, `src/app/businesses/page.tsx`, `src/components/Nav.tsx`, and `src/app/globals.css`.
  - Regression specs are updated in `z2a/home.spec.ts` and `z2a/businesses.spec.ts`.
  - Local lint/build/e2e quality gates pass.
- What this phase assumed:
  - Live verification depends on production deployment catching up to local changes.
  - Existing section IDs and route map remain stable from Phase 13 constraints.
- Verified touch points:
  - `src/app/page.tsx`
  - `src/app/businesses/page.tsx`
  - `src/components/Nav.tsx`
  - `src/app/globals.css`
  - `z2a/home.spec.ts`
  - `z2a/businesses.spec.ts`

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- Production parity lag can invalidate live MCP conclusions.
  - Mitigation: treat live checks as deployment-gated; rerun MCP immediately after deploy.

### Missing or ambiguous requirements
- Menu link text now uses dual-label visual treatment, which can duplicate accessible text in strict locators.
  - Mitigation: updated test locators to resilient regex/first-match strategy.

### Multi-agent coordination
- Overlap detected with recent phases (`13`/`14`) and pre-existing uncommitted edits in nav/businesses files.
  - Mitigation: merged semantically onto current working tree and preserved Phase 14 custom-pricing direction.

## Assumptions (Agent)
- Assumption: Full-canvas menu implementation can remain within current dialog/focus-trap architecture without introducing a separate layout shell (confidence ~94%).
- Assumption: Production deployment is managed outside this workspace and is the only blocker for final live parity checks (confidence ~92%).

## Open Questions (Need Human Input)
- [ ] Should I run the final live MCP closure pass immediately after your deploy confirms the new build is live? (confidence ~75%)
  - Why it matters: this is the only remaining unchecked success criterion.
  - Current assumption in this plan: yes, rerun MCP and close phase on pass.

## Phase Summary (running)
- 2026-02-16 — Completed motion blueprint and implemented staged hero timelines, full-canvas menu, 3D nav/link motion, signature rails, and reduced-motion fallbacks (files: `docs/planning/phase-15/motion-blueprint.md`, `src/app/page.tsx`, `src/app/businesses/page.tsx`, `src/components/Nav.tsx`, `src/app/globals.css`).
- 2026-02-16 — Updated Playwright coverage for new Home/businesses behavior and custom-pricing assertions; local lint/build/e2e green (files: `z2a/home.spec.ts`, `z2a/businesses.spec.ts`).
- 2026-02-16 — Ran live Playwright MCP desktop/mobile checks against `https://zerotoagent.com`; parity still blocked by production deploy lag on `/businesses`.
