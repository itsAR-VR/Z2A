# Playbook App Building 101+102 - Improvements Document

**Based on:** Karpathy Guidelines + Machines Lab 7-Day Prompt Engineering Course + Adcrate AI Creative Strategist Blueprint + AI Agents Roadmap

**Approach:** Surgical changes that enhance existing content rather than rewriting. Each improvement is designed to be inserted at specific locations.

---

## Overview of Source Material Applied

| Source | Key Concepts Applied |
|--------|---------------------|
| **Karpathy Guidelines** | Think before coding, simplicity first, surgical changes, goal-driven execution |
| **Machines Lab Day 2** | Token economy, context layering, information weighting, context optimization |
| **Machines Lab Day 3** | Ambiguity audit, constraint design, success criteria engineering, instruction sequencing |
| **Machines Lab Day 4** | Strategic example selection, few-shot architecture, zero-shot vs few-shot decisions |
| **Machines Lab Day 5** | Role engineering, expertise intersections, behavioral programming |
| **Adcrate Session 3** | Context engineering for creative tasks |
| **AI Agents Roadmap** | MCP tools, RAG patterns, multi-agent architectures |

---

# SECTION 1: Phase 1 Enhancements

## Location: After "Garbage In = Garbage Out" section, before "The Formula"

### NEW CONTENT TO INSERT:

```markdown
### Understanding Context Windows (The Token Economy)

Before diving into prompt structure, understand this critical concept that most builders ignore: **AI has limited memory called a "context window"**. Everything you write, plus everything it responds with, takes up space. When the window fills up, AI starts "forgetting" earlier information to make room for new content.

**Why this matters for app building:**
- Your PRD and AGENTS.MD compete for context space with generated code
- Bloated prompts can push critical requirements out of memory mid-task
- Front-loaded information has higher retention than later details
- Every word should either provide essential context, guide processing, or specify requirements

**The Token Audit Process (Do This Before Every Major Prompt):**

| Step | Action | Example |
|------|--------|---------|
| 1 | Eliminate fluff words | Remove "please," "comprehensive," "detailed" unless specifying something |
| 2 | Combine redundancy | "professional and business-appropriate" → "professional" |
| 3 | Use precise language | "some marketing work" → "marketing automation" |
| 4 | Front-load critical info | Put non-negotiables in the first 25% of your prompt |

**Example - Bloated vs Token-Efficient:**

❌ *"I would really appreciate it if you could please help me by creating a comprehensive and detailed system architecture that would be appropriate for building a rules-based recruiting engine..."*

✅ *"Create a system architecture for a rules-based recruiting engine. Requirements: GoHighLevel integration, tag-based automation, PandaDoc for agreements."*

Same information. Half the tokens. Clearer instructions.

---
```

---

## Location: After "The Formula" section, as a new subsection

### NEW CONTENT TO INSERT:

```markdown
### The Context Layering System (Advanced Framework)

Your Intent + Context + Process + Outcome formula is solid, but here's how to level it up with **context layering** - a technique that matches how AI naturally processes information.

Think of context in distinct layers that build on each other:

**Layer 1 - Role Context (WHO):** Establish the AI's expertise *before* the task

```
You are a senior full-stack engineer with 10 years of experience building
SaaS applications using Next.js, Supabase, and Prisma ORM. You specialize
in multi-step workflow automation and have built recruiting systems for
companies processing 10,000+ applicants monthly.
```

**Layer 2 - Situation Context (WHAT):** The specific scenario this expert needs to understand

```
We're building a recruiting automation system for Local Commerce Solutions
that recruits, trains, and activates independent sales reps. The system
must integrate with GoHighLevel as the brain, PandaDoc for agreements,
and Gusto for payroll onboarding.
```

**Layer 3 - Task Definition (DO):** What this expert should create

```
Create the database schema and API routes that handle the candidate
journey from application → training → agreement → first sale →
portfolio access.
```

**Layer 4 - Execution Parameters (HOW):** Constraints and approach

```
- Use Prisma ORM with PostgreSQL
- Create atomic, testable functions
- Include comprehensive error handling
- Document each endpoint with JSDoc
```

**Layer 5 - Success Criteria (DONE):** Verifiable completion standards

```
The phase is complete when:
□ All candidate states are tracked via database, not tags
□ API routes handle all state transitions
□ Error states are logged and recoverable
□ Integration tests pass for happy path + 3 edge cases
```

**Why This Works:** The AI establishes expertise first (Layer 1), understands the situation (Layer 2), knows the task (Layer 3), then applies constraints (Layer 4) while aiming for measurable goals (Layer 5). This mirrors how human experts approach problems.

---

### Information Weighting (What Matters Most)

Not all context is created equal. Some shapes the entire approach, some provides background, some just adds flavor.

**Primary Information (Shapes Entire Approach)**
- Use explicit labels: "PRIMARY OBJECTIVE:", "CRITICAL REQUIREMENT:"
- Put this first in your prompt
- *Example:* "Primary objective: Zero manual intervention from application to portfolio access"

**Supporting Information (Necessary Background)**
- Use labels: "Background:", "Context:", "Key Details:"
- *Example:* "Background: Reps only get portfolio access after first sale + Gusto completion"

**Detail Information (Adds Specificity)**
- No special labels needed
- *Example:* "The kanban feature includes drag-and-drop and custom labels"

**Weighted Prompt Example:**

```
PRIMARY OBJECTIVE: Build a candidate state machine that prevents portfolio
access until both conditions are met: first_sale = true AND gusto_complete = true

CRITICAL CONSTRAINTS:
- No business logic in CC360 - everything in GoHighLevel
- All decisions must be tag-based for auditability
- No manager involvement before training completion

BACKGROUND: Local Commerce Solutions recruits independent sales reps.
Currently using manual processes that don't scale.

TECHNICAL STACK: Supabase + Prisma ORM, Next.js on Vercel, GPT 5-mini for AI features
```

---
```

---

# SECTION 2: The Clarity Framework (New Addition)

## Location: After "Breaking down the prompt engineering process" section

### NEW CONTENT TO INSERT:

```markdown
### The Clarity Framework: Eliminating Ambiguity

Most prompt failures come from words that seem clear to you but mean nothing specific to AI.

**The Ambiguity Epidemic - Words That Mean Nothing:**

| Ambiguous | What It Could Mean | Specific Alternative |
|-----------|-------------------|---------------------|
| "professional" | Formal? Friendly? Direct? Diplomatic? | "Use formal business language, avoid contractions, maintain respectful but confident tone" |
| "engaging" | Questions? Stories? Data? Controversy? | "Open with a pain-point question, include one personal anecdote, end with a call for comments" |
| "comprehensive" | 500 words? 5000 words? Every detail? | "Cover all 5 integration points, maximum 2000 words" |
| "clean code" | Readable? Tested? Documented? Minimal? | "Single-responsibility functions, JSDoc on all exports, no commented-out code" |

**The Ambiguity Audit Process:**

1. **Circle every descriptor** - Go through your prompt, identify words describing qualities/styles
2. **Ask "What does this actually mean?"** - Could this word be interpreted 5 different ways?
3. **Replace with specific criteria** - What behaviors or characteristics do you actually want?
4. **Test the clarity** - Could someone with no context follow these instructions?

**Before Audit:**
*"Create a compelling product description for our new software. Make it engaging and professional while highlighting the key benefits. Keep it concise but comprehensive."*

**After Audit:**
*"Create a product description (under 200 words) for our project management software that:
- Opens with a pain-point question about tool overload
- Lists exactly 3 benefits with quantified outcomes
- Uses second-person language ('you can...')
- Ends with a single clear CTA: 'Start free trial'"*

---

### Constraint Design: Limitations That Improve Results

Counter-intuitive truth: **More freedom = worse results.** Smart constraints focus creativity.

**The Two Types of Constraints:**

| Boundary Constraints | Creative Constraints |
|---------------------|---------------------|
| Define what NOT to do | Define specific requirements that force innovation |
| "Avoid technical jargon" | "Use only analogies from cooking" |
| "Don't exceed 300 words" | "Start each section with a question" |
| "No direct sales language" | "Include exactly one customer quote" |

**Constraint Design for App Building:**

❌ Generic: *"Build the user dashboard"*

✅ Constrained: *"Build the user dashboard with these constraints:
- Maximum 3 API calls on initial load
- All data updates optimistically (assume success, rollback on failure)
- Mobile-first: design for 375px width, then scale up
- Loading states must use skeleton components, not spinners
- Error states must include a retry action, not just a message"*

The constraints force thoughtful decisions instead of default patterns.

---

### Success Criteria Engineering

Don't just define what you want - define what "done" looks like in testable terms.

**The Three Types of Success Criteria:**

**1. Performance Criteria (What It Should Accomplish)**
- "Dashboard loads in under 2 seconds on 3G connection"
- "Form submission success rate > 99%"
- "Zero data loss during state transitions"

**2. Quality Criteria (What It Should Feel Like)**
- "Interactions feel instant (< 100ms response)"
- "Error messages are actionable, not technical"
- "Navigation requires maximum 2 clicks to any feature"

**3. Structural Criteria (What It Should Contain)**
- "Every API route has error handling for auth, validation, and database failures"
- "All components have TypeScript types, no 'any' allowed"
- "Test coverage > 80% for business logic functions"

**Complete Success Criteria Example:**

```markdown
## Phase 3 Success Criteria

### Performance
□ Candidate list loads < 1s with 1000 records
□ State transitions complete < 500ms
□ No N+1 query problems (verified via Prisma logging)

### Quality
□ All error states have user-friendly messages + retry options
□ Loading states prevent double-submissions
□ Mobile layout works without horizontal scroll

### Structural
□ All database operations use transactions
□ API routes follow REST conventions
□ Webhook handlers are idempotent (safe to retry)

### Verification Steps
1. Run: `npm run test:integration`
2. Check Vercel deployment logs for errors
3. Test mobile view in Chrome DevTools
4. Verify Supabase query performance in dashboard
```

---

### Instruction Sequencing (The Natural Processing Flow)

AI processes instructions sequentially. Wrong order = AI makes early decisions that conflict with later requirements.

**The Optimal Sequence:**

```
Phase 1: IDENTITY    → Who should the AI become?
Phase 2: SITUATION   → What context does it need?
Phase 3: TASK        → What should it create?
Phase 4: EXECUTION   → How should it approach the work?
Phase 5: REFINEMENT  → What quality standards apply?
```

**Badly Sequenced (Common Mistake):**
*"Write it in TypeScript and keep functions small. You're a senior engineer building a recruiting system. Use Prisma for the database. Start by creating the candidate model."*

**Properly Sequenced:**
*"**ROLE:** You are a senior backend engineer specializing in Prisma/PostgreSQL architectures for workflow automation systems.*

*SITUATION: We're building a recruiting automation system where candidates move through states: applied → training → agreement_signed → active_selling → portfolio_access.*

*TASK: Create the Prisma schema and state transition functions for the candidate journey.*

*EXECUTION: Use TypeScript strictly. Keep functions single-responsibility. Include JSDoc comments.*

*SUCCESS: The schema supports all state transitions, functions are tested, no TypeScript errors."*

---
```

---

# SECTION 3: Role Engineering Enhancement

## Location: Insert in "Prompting Principle: Give AI a role" section

### ENHANCED CONTENT:

```markdown
<aside>
💡

**Prompting Principle: Give AI a Role (Advanced Version)**

Generic roles activate shallow knowledge. Specific roles activate deep, precise expertise.

**The Role Specificity Spectrum:**

❌ **Generic (10% expertise activation):**
*"You are a developer"*

⚠️ **Better (40% expertise activation):**
*"You are a senior full-stack developer"*

✅ **Specific (80% expertise activation):**
*"You are a senior full-stack engineer with 10 years building SaaS products. You specialize in Next.js + Supabase architectures, have shipped 3 products with 10K+ users, and are obsessive about type safety and error handling. You prefer composition over inheritance, favor explicit over clever, and always consider the next developer who'll read your code."*

**The Four Layers of Effective Role Definition:**

| Layer | Question | Example |
|-------|----------|---------|
| Domain Expertise | What field/industry? | "SaaS recruiting automation" |
| Functional Expertise | What specific skills? | "Workflow state machines, webhook integrations" |
| Audience Expertise | Who do they serve? | "Non-technical founders building MVPs" |
| Approach Philosophy | What methodology? | "Ship fast, iterate based on user feedback, document decisions" |

**Expertise Intersection Design:**

The most valuable AI advisors combine expertise that rarely exists in single humans:

*"You are a technical architect who studied cognitive psychology. You design database schemas that accommodate how users actually think about their data, not just how engineers would structure it. You've noticed that most recruiting systems fail because they model the company's process, not the candidate's journey."*

This combines: database architecture + cognitive psychology + recruiting domain + user-centered design

**Behavioral Programming (HOW the AI thinks):**

Same expertise, different thinking patterns produce different results:

*Analytical approach:* "You always start with data. Before recommending any architecture, you ask about expected scale, query patterns, and failure modes. You never guess - you measure."*

*Pragmatic approach:* "You optimize for shipping speed. You choose boring technology that works, avoid premature optimization, and always ask 'what's the simplest thing that could work?'"*

*Defensive approach:* "You assume everything will fail. Every function handles errors gracefully. Every integration has a fallback. Every state transition is recoverable."*

</aside>
```

---

# SECTION 4: Strategic Example Selection (New Addition)

## Location: After the v0 section

### NEW CONTENT TO INSERT:

```markdown
### Zero-Shot vs Few-Shot: When to Use Examples

Not every prompt needs examples. Sometimes they hurt more than help.

**Use Zero-Shot (Instructions Only) When:**
- Task is straightforward and AI has strong baseline knowledge
- You want maximum flexibility and creativity
- The pattern is hard to demonstrate in a few examples
- Examples might bias AI toward the wrong approach

**Use Few-Shot (With Examples) When:**
- Desired pattern is complex or unusual
- Instructions alone create ambiguity about style
- You need to override AI's default patterns
- Quality depends on subtle nuances hard to describe

**Example: Prompting for Code Comments**

❌ **Zero-shot that fails:**
*"Add helpful comments to this code"*
(AI adds obvious comments like `// increment counter`)

✅ **Few-shot that works:**
*"Add comments that explain WHY, not WHAT. Examples:*

*Bad: `// loop through users`*
*Good: `// Process users in batches of 100 to avoid memory spikes with large teams`*

*Bad: `// check if valid`*
*Good: `// Gusto requires email verification before we can create payroll record`*

*Now add comments to this code following the same pattern..."*

**The Few-Shot Architecture:**

```
1. PATTERN SETUP     → "Here's what I want you to learn..."
2. EXAMPLE SET       → 2-3 examples demonstrating the pattern
3. PATTERN BRIDGE    → "Pattern: [what connects these examples]"
4. NEW TASK          → "Now apply this pattern to..."
```

**When Examples Hurt:**

- If your examples conflict with your instructions (you say "concise" but examples are 200 words)
- If examples show only one approach when many could work
- If examples are mediocre - one perfect example beats three mediocre ones

---
```

---

# SECTION 5: AGENTS.MD Enhancement

## Location: Replace the AGENTS.MD section with enhanced version

### ENHANCED CONTENT:

```markdown
<aside>
❕

**[AGENTS.MD](http://AGENTS.MD) / CLAUDE.MD (The OS of your Agent)**

This file is your agent's persistent memory and operating system. It reads this first and uses it to understand your project.

**The Seven Components of an Elite AGENTS.MD:**

**1. Scope + Reading Order**
```markdown
## Project: Local Commerce Solutions Recruiting Engine
## Tech Stack: Next.js 14 + Supabase + Prisma + Vercel
## Read Order:
1. This file (AGENTS.MD)
2. docs/prd.md (requirements)
3. prisma/schema.prisma (data model)
4. src/types/ (TypeScript definitions)
```

**2. Non-Negotiables (Explicit Constraints)**
```markdown
## DO:
- Use TypeScript strictly (no 'any' types)
- Handle all error states explicitly
- Write integration tests for business logic
- Use Prisma transactions for multi-step operations

## DON'T:
- Store secrets in code (use environment variables)
- Make breaking API changes without versioning
- Skip loading/error states in UI components
- Use console.log in production code
```

**3. Commands by Intent (What You'll Actually Ask)**
```markdown
## Common Tasks:
- "Add a new candidate state" → Update Prisma schema, migration, API route
- "Fix failing test" → Check test output, identify cause, fix, verify
- "Deploy to production" → Run tests, build, push to main, verify Vercel
```

**4. CLI's and MCP Tooling**
```markdown
## Required CLI Tools:
- `npx prisma migrate dev` - Database migrations
- `npm run test` - Jest integration tests
- `vercel --prod` - Production deployment

## MCP Tools Enabled:
- Context7 (API documentation lookup)
- Supabase (database queries)
- Playwright (browser testing)
```

**5. Security & Secrets Policy**
```markdown
## Environment Variables (NEVER commit these):
- SUPABASE_URL, SUPABASE_ANON_KEY
- OPENAI_API_KEY
- PANDADOC_API_KEY
- GUSTO_CLIENT_SECRET

## Security Rules:
- All API routes require authentication check
- User input always validated with Zod
- Rate limiting on public endpoints
```

**6. Planning/Execution Loop**
```markdown
## Before Writing Code:
1. Read relevant files to understand current state
2. Identify what needs to change
3. Consider edge cases and error states
4. Write tests first if touching business logic

## After Writing Code:
1. Run type checker: `npm run type-check`
2. Run tests: `npm test`
3. Check for console errors in browser
4. Commit with descriptive message
```

**7. Definition of Done Checklist**
```markdown
## A task is DONE when:
□ Code compiles with no TypeScript errors
□ All existing tests pass
□ New functionality has tests
□ No console errors in browser
□ Mobile responsive (checked at 375px)
□ Loading and error states handled
□ Committed to git with clear message
```

**Pro Tip:** Give your AI agent the AGENTS.MD along with your [prd.md](http://prd.md/) and tell it to tailor the AGENTS.MD specifically for your project context.

</aside>
```

---

# SECTION 6: Context Management Enhancement (102 Section)

## Location: Replace the "Context Management" section in 102

### ENHANCED CONTENT:

```markdown
## Context Management: Get More Out of Limited Context

**The Problem**: AI assistants have limited "memory" in each conversation. Long conversations can exceed context limits, causing the AI to "forget" early requirements.

**Understanding Context Degradation:**

| Warning Sign | What's Happening | Solution |
|--------------|------------------|----------|
| AI repeats questions you answered | Earlier context pushed out | Use /compact or summarize |
| Code style becomes inconsistent | Lost AGENTS.MD context | Re-inject key constraints |
| AI ignores stated requirements | Too much noise in context | Start fresh with focused prompt |
| Responses become generic | Lost domain-specific context | Re-establish role and situation |

**The Four-Skill Context Management System:**

**Skill 1: Phase Planning (`$phase-plan` / `/phase-plan`)**
- Creates structured phases with subphases
- Maintains context across longer tasks
- Provides clear handoff points for context refresh

**Skill 2: Gap Analysis (`$phase-gaps` / `/phase-gaps`)**
- Identifies weak spots in your plan BEFORE implementation
- Surfaces questions that would cause problems later
- Use in a fresh chat to get unbiased review

**Skill 3: Implementation (`$phase-implement` / `/phase-implement`)**
- Executes phase with full context awareness
- Knows where it is in the larger plan
- Can pick up from interruptions

**Skill 4: Review (`$phase-review` / `/phase-review`)**
- Validates implementation against success criteria
- Identifies follow-up tasks
- Documents what was built for future context

**The Dual-Terminal Workflow:**

| Claude Code | Codex |
|-------------|-------|
| Planning (higher quality reasoning) | Gap analysis (fresh perspective) |
| Complex architecture decisions | Implementation (longer context) |
| Code review | Testing and validation |

**Context Optimization Techniques:**

**1. Information Weighting in Context:**
```markdown
## CRITICAL (Read every session):
- Non-negotiable constraints
- Current phase objectives
- Active bugs/blockers

## IMPORTANT (Reference as needed):
- Tech stack decisions
- Integration requirements

## BACKGROUND (Can be summarized):
- Project history
- Alternative approaches considered
```

**2. The Minimal Viable Context Test:**
- Start with bare minimum prompt
- Add one context layer at a time
- Stop when output quality stops improving
- Document what context is actually necessary

**3. Context Refresh Points:**
- After completing a phase
- When you notice quality degradation
- Before starting complex multi-step work
- After any significant interruption

---
```

---

# SECTION 7: New "Debugging with AI" Section

## Location: Add after Phase 4 (Make your app pretty)

### NEW CONTENT TO INSERT:

```markdown
## Phase 4.5: Debug Like a Pro with AI

Most debugging fails because people dump error messages without context. Here's the systematic approach.

### The Bug Report Framework

Don't say: *"It's not working"*

Do say:
```markdown
## Bug Report

**Expected Behavior:**
When a candidate completes training, their status should change to "agreement_pending"
and trigger a PandaDoc webhook.

**Actual Behavior:**
Status changes correctly, but PandaDoc webhook never fires. No errors in console.

**Steps to Reproduce:**
1. Create test candidate via API
2. Complete all training modules
3. Check candidate status (correct: "agreement_pending")
4. Check PandaDoc dashboard (no document created)

**What I've Tried:**
- Verified webhook URL in PandaDoc settings ✓
- Checked Vercel function logs (no invocation) ✓
- Tested webhook manually with curl (works) ✓

**Relevant Code:**
[paste the specific function/route]

**Environment:**
- Local dev / Vercel preview / Production
- Last working: 2 days ago before [specific change]
```

### Using Jam.dev for Bug Reports

Jam captures everything automatically - console logs, network requests, browser info.

**Workflow:**
1. Install Jam browser extension
2. When you hit a bug, click Jam icon
3. It captures: screenshot + console + network + system info
4. Share the Jam link with your AI agent
5. AI has full context to diagnose

### The 5-Why Debugging Technique

When AI gives a fix that doesn't work, go deeper:

```
AI: "Add a null check here"
You: "Why is the value null?"
AI: "The API didn't return the expected field"
You: "Why didn't the API return it?"
AI: "The database query has a filter that excludes this case"
You: "Why does the filter exclude it?"
AI: "The candidate status enum doesn't include the new state we added"
You: "That's the root cause. Fix the enum."
```

---
```

---

# SECTION 8: Agent Architecture Reference (New Addition)

## Location: Add to the 102 section after "Using Codex or Claude Code"

### NEW CONTENT TO INSERT:

```markdown
## Agent Architecture Patterns for Complex Projects

When your project grows beyond single-agent capability, consider these patterns from the AI Agents ecosystem:

### Pattern 1: Specialized Agents with Handoffs
```
Planning Agent → writes PRD and architecture docs
Implementation Agent → writes code following the plan
Review Agent → validates code against requirements
```

Each agent has focused context and expertise. Handoffs happen via documented artifacts (files), not conversation.

### Pattern 2: MCP-Powered Tool Use

Your agent becomes more powerful with external tool access:

| MCP Tool | Capability | Use Case |
|----------|------------|----------|
| Context7 | Fetch live API docs | "How does Supabase handle real-time subscriptions?" |
| Supabase | Query/mutate database | "Check if this user exists" |
| Playwright | Browser automation | "Click through the onboarding flow and verify each step" |
| GitHub | Repo operations | "Create a PR with these changes" |

### Pattern 3: RAG for Project Memory

For large codebases, implement Retrieval Augmented Generation:
- Index your codebase with embeddings
- AI queries relevant files instead of loading everything
- Scales to codebases that exceed context limits

### Pattern 4: The Karpathy Checklist

Before any complex task, verify:

- [ ] **Think Before Coding** - Am I hiding any uncertainty? Have I stated assumptions?
- [ ] **Simplicity First** - Am I adding features not requested? Is this over-engineered?
- [ ] **Surgical Changes** - Is every change directly required by the task?
- [ ] **Goal-Driven** - Can I verify success without asking the user?

**Red Flags to Stop and Reconsider:**
- Adding features not explicitly requested
- Creating abstractions "for future flexibility"
- Refactoring adjacent code "while you're there"
- Guessing at unclear requirements instead of asking
- Writing error handling for impossible scenarios

---
```

---

# Summary: How to Apply These Improvements

## Quick Reference: What Goes Where

| Improvement | Location in Original | Action |
|-------------|---------------------|--------|
| Token Economy | After "Garbage In = Garbage Out" | INSERT new section |
| Context Layering | After "The Formula" | INSERT new subsection |
| Information Weighting | After Context Layering | INSERT new subsection |
| Clarity Framework | After "Breaking down the prompt" | INSERT new section |
| Ambiguity Audit | Part of Clarity Framework | INSERT |
| Constraint Design | Part of Clarity Framework | INSERT |
| Success Criteria | Part of Clarity Framework | INSERT |
| Instruction Sequencing | Part of Clarity Framework | INSERT |
| Enhanced Role Prompting | Replace existing "Give AI a Role" aside | REPLACE |
| Zero-Shot vs Few-Shot | After v0 section | INSERT new section |
| Enhanced AGENTS.MD | Replace existing AGENTS.MD aside | REPLACE |
| Context Management | Replace existing in 102 | REPLACE |
| Debug Like a Pro | After Phase 4 | INSERT new section |
| Agent Patterns | After "Using Codex or Claude Code" | INSERT new section |

---

## Implementation Priority

**High Impact, Easy to Add:**
1. Token Economy section (foundational understanding)
2. Clarity Framework (fixes most prompt failures)
3. Enhanced Role Prompting (immediate quality boost)

**High Impact, Requires Integration:**
4. Context Layering (integrates with existing formula)
5. Success Criteria (integrates with PRD section)
6. Enhanced AGENTS.MD (replaces existing)

**Nice to Have:**
7. Zero-Shot vs Few-Shot decision framework
8. Debug Like a Pro section
9. Agent Architecture Patterns

---

*Document generated applying Karpathy Guidelines: Think Before Coding (analyzed all source material first), Simplicity First (targeted improvements not rewrites), Surgical Changes (specific locations identified), Goal-Driven (each improvement has clear purpose).*
