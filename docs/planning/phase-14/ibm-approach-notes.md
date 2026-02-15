# IBM approach notes (web research) — translation to `/businesses`

## Sources (Feb 2026 snapshot)
- IBM: multi-agent orchestration overview (enterprise patterns: supervisor/router/planner; governance/observability; AI gateway). Source: `https://www.ibm.com/think/topics/multi-agent-orchestration`
- IBM: watsonx Orchestrate positioning (open, integrated, trusted; orchestrate work across apps/tools). Source: `https://www.ibm.com/products/watsonx-orchestrate`
- IBM: Oct 2025 announcement on agentic workflows + domain agents (theme: shift from “AI that chats” to “systems that work”; agentic workflows described as standardized/reusable, with toolchains, conditional logic, data transparency; focus on predictable/auditable). Source: `https://newsroom.ibm.com/2025-10-07-ibm-unveils-expanded-watsonx-platform-capabilities-to-help-enterprises-scale-ai`

## The “IBM shape” (how they message enterprise AI)
- Business-first framing: value and adoption over novelty.
- Platform + services logic: build + run + improve (not “deploy and leave”).
- “Open + integrated + trusted” posture:
  - works across existing apps/tools (no rip-and-replace),
  - supports multiple models/vendors via an “AI gateway” idea,
  - emphasizes governance and observability (explainability, monitoring, auditability).
- Agentic workflows: repeatable, multi-step work that can take action via tools, not just answer questions.
- Orchestration: a higher-level controller that routes work across agents, tools, and approvals.

## Translation rules for Zero to Agent (so we don’t cosplay IBM)
- Keep the promise the same: managed implementation + ongoing improvement.
- Borrow the structure, not the buzzwords:
  - Say “agentic workflows” but immediately define it in plain language.
  - Use “orchestration” only when paired with an explanation (“a supervisor that routes tasks”).
- Keep focus:
  - IBM can be “for everyone” because they sell platforms. We should still lead with a starving-crowd framing, but do it by **function** (sales/support/finance/procurement/ops) rather than by a single vertical.

## Concrete copy levers to add to `/businesses`
- Above the fold:
  - “AI is moving from answering questions to doing work inside your tools.”
  - “Start with Discovery: map bottlenecks + demo a workflow on your systems.”
- In `#what`:
  - Agentic workflows: repeatable flows with checkpoints, approvals, and tool actions.
  - Orchestration: routing + guardrails for consistency and safety.
  - AgentOps: monitoring + improvements so it keeps getting better.
- In `#who`:
  - Describe the buyer by role/function, not industry.
  - Examples: RevOps/Sales Ops, CS Ops, Finance Ops, Procurement, Ops leaders.
