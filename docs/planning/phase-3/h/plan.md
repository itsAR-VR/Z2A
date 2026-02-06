# Phase 3h — UI + Micro-Animation Implementation Playbook (No UI Build Yet)

## Focus
Produce an execution-ready playbook for a follow-on agent to implement the landing page UI and motion system (inspired by TKS.world and Refunnel/RudyFunnel) without making new product decisions.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/ia-copy-spec.md`
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/design-motion-spec.md`
- Reference captures: `/tmp/site-analysis/`

## Work
1. Enumerate micro animations and motion patterns similar to the reference sites:
   - page-load stagger
   - scroll reveals + stagger groups
   - marquee/ticker loops
   - hover polish (buttons/cards/links)
   - mobile nav overlay transitions
   - accordion open/close
   - form focus/validation/loading states
2. Map motion patterns to the Phase 3 anchor sections (`#top`, `#why`, ...).
3. Provide concrete implementation guidance:
   - triggers, durations, easing, reduced-motion behavior
   - performance budgets and “anti-jank” rules
4. Provide a step-by-step UI agent checklist (tokens → structure → motion infra → apply UI wiring → QA).

## Output
- `docs/phase-3/ui-motion-implementation-playbook.md`

## Handoff
Follow-on agent uses the playbook + Phase 3 specs to implement the public UI and motion system.

## Validation (RED TEAM)
- Playbook contains:
  - explicit micro animation inventory
  - anchor-to-motion mapping
  - reduced motion rules
  - performance constraints
  - an ordered execution checklist

## Progress This Turn (Terminus Maximus)
- Work done:
  - Wrote the UI + motion execution playbook with micro-animation inventory and section mapping.
- Commands run:
  - (docs-only)
- Blockers:
  - None.
- Next concrete steps:
  - Follow-on agent implements `/` and `/apply` UI using this playbook.
