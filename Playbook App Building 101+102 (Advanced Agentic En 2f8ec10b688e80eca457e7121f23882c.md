# Playbook: App Building 101+102 (Advanced Agentic Engineering)

Made with ❤️ by Abdur Sajid

This guide teaches you **how to build real software projects using AI**, even if you’re new to coding environments. 

You might hear other people call similar techniques “Vibe Coding”, however we are not building off of vibes, I am giving you enterprise-grade development techniques and frameworks that are being used by the best engineers across the world and Silicon Valley. And some that are ahead of the curve.

***To be very clear here; this is not vibe coding. This is Agentic Engineering.

NOTE: This guide is not a one and done. I will be updating it as I improve my own framework and I already iterated multiple times just in the initial creation.
If you have access, you will receive the latest and greatest information all in one document. No context switching and going to multiple sources, I got you.*** 

You are not expected to understand everything upfront. But you are expected to follow a repeatable process.

By the end of this guide, you’ll know how to:

- Ship a real, working web app
- Collaborate with AI as a serious building partner
- Reuse the same workflow for future projects

We’ll recreate CourseCreator360 as our running example. The actual app matters less, the building principles and the process matters most.

This guide will have a fundamentals section (101) then an advanced section (102) for those that are looking to take their AI agent skills to another level

<aside>
❗

**Don’t just read the guide.** Actually implement the guide step by step. Reading along will not help you learn. Put 90 minutes on the clock, and finish this end to end. Read every line intentionally.

I recommend skimming first to understand the structure, then implementing and following along. The video guide will go into all the items here in the same/similar order and you can refer back to this document to fill in any gaps. 

</aside>

## Phase 1: Get really good at providing instructions (Prompt Engineering)

<aside>
🔧

**What we’re building:
A clone of CourseCreator360** an all-in-one platform for building courses, coaching programs, funnels, websites, automated messaging (email, SMS, voicemail), payment processing, sales pipelines, forms, surveys, calendar tools, reviews, and more.

</aside>

Before building this app, we have to get a really clear idea on what it is that we want to build. 

AI is ridiculously good at execution. However, in order for it to be really good at executing, **you need to be really good at giving it good instructions**.

***Higher quality input = Higher quality output. 
Garbage In = Garbage Out

Low Reasoning Effort = Less TIme but More Gaps 
High Reasoning Effort = More Time but Less Gaps

NOTE: Whenever doing planning or foundational work, use the best model with the highest reasoning effort. Use these leaderboard [1](https://livebench.ai/#/) and [2](https://llm-stats.com/leaderboards/llm-leaderboard) to see the best models.***

---

### Understanding Context Windows (The Token Economy)

Before diving into prompt structure, understand this critical concept that most builders ignore: **AI has limited memory called a "context window"**. Everything you write, plus everything it responds with, takes up space. When the window fills up, AI starts "forgetting" earlier information to make room for new content.

**Why this matters for app building:**

- Your PRD and [AGENTS.MD](http://AGENTS.MD) compete for context space with generated code
- Bloated prompts can push critical requirements out of memory mid-task
- Front-loaded information has higher retention than later details
- Every word should either provide essential context, guide processing, or specify requirements

**The Token Audit Process (Do This Before Every Major Prompt):**

| Step | Action | Example |
| --- | --- | --- |
| 1 | Eliminate fluff words | Remove "please," "comprehensive," "detailed" unless specifying something |
| 2 | Combine redundancy | "professional and business-appropriate" → "professional" |
| 3 | Use precise language | "some marketing work" → "marketing automation" |
| 4 | Front-load critical info | Put non-negotiables in the first 25% of your prompt |

**Example - Bloated vs Token-Efficient:**

❌ *"I would really appreciate it if you could please help me by creating a comprehensive and detailed system architecture that would be appropriate for building a rules-based recruiting engine..."*

✅ *"Create a system architecture for a rules-based recruiting engine. Requirements: GoHighLevel integration, tag-based automation, PandaDoc for agreements."*

Same information. Half the tokens. Clearer instructions.

---

All good prompts have the following format.

### The Formula: Intent + Context + Process + Outcome = Effective Prompt

1. **Intent**: Why do you want to build what you want to build? For a personal project for learning purposes? Or a product that you can ship for people to use? Get super clear here.
2. **Context**: What do you want to build? How do you want the user experience to be when people are clicking through your product? 
3. **Process:** How do you want GPT to interact with you to get to your outcome?
4. **Outcome**: What do you want the output from GPT to look like?

---

### The Context Layering System (Advanced Framework)

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
journey from application → training → agreement → first sale →x
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

<aside>
‼️

***BIGGEST HACK IN THIS ENTIRE GUIDE: To help with giving as much context as possible + anytime I type anything, I use this tool called Wispr Flow. It allows you to talk to your computer like you are speaking to a friend, allowing you to give more detail in less time AND structuring it for you. I have an average WPM of 140 (more than 3x typing speed average) + more than 250,000 words in the past few months allowing me to do 3x more work than you on solely manual work. Combine this with AI agents and you are doing 10-30x more than your competitors.

[Here’s a free month of Wispr to get started.](https://wisprflow.ai/r?TEAM14)*** 

</aside>

[***For quick prompt generation and structure use this Custom GPT I built.](https://chatgpt.com/g/g-68f0e88217888191bb503658f38c0007-prompt-generator)*** 
(over 2+ years it’s been trained on the greatest prompting techniques and refined little by little along with being constantly updated with the latest cookbooks) 

### Follow along: The Initial Prompt (You can use the Custom GPT to build your own initial prompt for your own project)

- ***Initial Prompt***
    
    ```
    I want to create a clone, of CourseCreator360. It will be a rules-based recruiting and onboarding engine in a GoHighLevel instance, branded as: Local Commerce Solutions This system recruits, trains, and activates independent sales reps who sell local payment processing solutions.
    It is not a traditional HR system and not a community.
    It is a distribution engine for the Local POS / payments offering. All actual implementation must live in our own GoHighLevel account (Local Commerce Solutions).
    
    What the Business Actually Is
    Local Commerce Solutions recruits individuals who want to sell payment processing services to local businesses.
    Each rep:
    Goes through structured onboarding and training
    2. Signs a sales rep agreement
    3. Sells payment processing solutions
    4. Builds a payment portfolio that generates residual income
    This system exists to scale that model without manual hiring, onboarding, or training overhead.
    
    Key Downstream System: Payment Portfolio
    The Payment Portfolio is a separate, external system (not built in GHL).
    Access to the payment portfolio is granted only when BOTH conditions are met:
    The rep has made their first sale
    The rep has signed the agreement and completed onboarding in Gusto
    This is a hard gate.
    No first sale = no portfolio access
    No Gusto agreement = no portfolio access
    
    System Design Philosophy
    Core Mental Model
    GoHighLevel = the brain
    - Contacts
    - Tags
    - Custom fields
    - Pipelines
    - Workflows
    - Emails/SMS
    - Calendars
    We will use CC360 = reference only for Templates, Bootcamp guidance, and Structural inspiration.
    
    External systems
    PandaDoc → agreement signature (pre-sale)
    Gusto → onboarding + contractor agreement (post-sale)
    Payment Portfolio → access granted post-sale + Gusto completion
    
    Why This System Exists
    Historically, recruiting and onboarding were: Manual, Inconsistent, Costly, and Hard to scale
    This system is designed to: Filter for commitment, not resumes, Delay human involvement until training is complete, Delay payroll and portfolio access until revenue is proven, Enforce rules via automation, not judgment
    
    Key principle:
    We only invest time, tools, or access after behavior proves intent.
    
    We will use Supabase Prisma for the Backend and use Next.js hosted on Vercel for front end. Using GPT 5-mini for any AI features.
    
    High-Level Flow
    - Candidate applies
    - GHL auto-filters application
    - Qualified candidates complete onboarding training
    - Training completion unlocks agreement (PandaDoc)
    - Signed agreement unlocks active selling phase
    - First sale submitted
    - Gusto onboarding completed
    - Payment portfolio access granted
    - Every step is controlled via tags and workflows in GHL.
    
    What “Done” Means
    From a development standpoint, this system is complete when:
    • CC360 is no longer required for operation
    • All logic exists inside GHL
    • No manual routing is required
    • Portfolio access is impossible without:
    First sale tag
    Gusto completed tag
    • The system can scale to:
    • More reps
    • More training tracks
    • More partner products
     Without rework
    Non-Negotiable Constraints
    No business logic lives in CC360
    No portfolio access before first sale
    No payroll onboarding before revenue
    No manager involvement before training completion
    All decisions are tag-based
    ```
    

### Breaking down the prompt engineering process:

- ***Intent***
    
    > I want to create a clone, of CourseCreator360. It will be a rules-based recruiting and onboarding engine in a GoHighLevel instance, branded as: Local Commerce Solutions This system recruits, trains, and activates independent sales reps who sell local payment processing solutions.
    It is not a traditional HR system and not a community.
    It is a distribution engine for the Local POS / payments offering. All actual implementation must live in our own GoHighLevel account (Local Commerce Solutions).
    > 

This is the **intention** part of the prompt, where I explicitly talk about what the app looks like. The more detail I have about it, the better. 

---

- ***Context***
    
    > What the Business Actually Is
    Local Commerce Solutions recruits individuals who want to sell payment processing services to local businesses.
    Each rep:
    Goes through structured onboarding and training
    2. Signs a sales rep agreement
    3. Sells payment processing solutions
    4. Builds a payment portfolio that generates residual income
    This system exists to scale that model without manual hiring, onboarding, or training overhead.
    
    Key Downstream System: Payment Portfolio
    The Payment Portfolio is a separate, external system (not built in GHL).
    Access to the payment portfolio is granted only when BOTH conditions are met:
    The rep has made their first sale
    The rep has signed the agreement and completed onboarding in Gusto
    This is a hard gate.
    No first sale = no portfolio access
    No Gusto agreement = no portfolio access
    
    System Design Philosophy
    Core Mental Model
    GoHighLevel = the brain
    - Contacts
    - Tags
    - Custom fields
    - Pipelines
    - Workflows
    - Emails/SMS
    - Calendars
    We will use CC360 = reference only for Templates, Bootcamp guidance, and Structural inspiration.
    
    External systems
    PandaDoc → agreement signature (pre-sale)
    Gusto → onboarding + contractor agreement (post-sale)
    Payment Portfolio → access granted post-sale + Gusto completion
    
    Why This System Exists
    Historically, recruiting and onboarding were: Manual, Inconsistent, Costly, and Hard to scale
    This system is designed to: Filter for commitment, not resumes, Delay human involvement until training is complete, Delay payroll and portfolio access until revenue is proven, Enforce rules via automation, not judgment
    
    Key principle:
    We only invest time, tools, or access after behavior proves intent.
    
    We will use Supabase with a Prisma ORM for the Backend and use Next.js hosted on Vercel for front end. Using GPT 5-mini for any AI features.
    > 

This is the **context** part of the prompt. I give it as much information as possible on what I want the project to look like. 

<aside>
💡

**Quick Tip:** using Supabase with a Prisma ORM is the best structure to use for most projects. (an ORM is a bridge between your code and the database) Ask ChatGPT if it makes sense for your specific project. 

In most cases, it is the best option.

</aside>

- ***Process***
    
    > High-Level Flow
    - Candidate applies
    - GHL auto-filters application
    - Qualified candidates complete onboarding training
    - Training completion unlocks agreement (PandaDoc)
    - Signed agreement unlocks active selling phase
    - First sale submitted
    - Gusto onboarding completed
    - Payment portfolio access granted
    - Every step is controlled via tags and workflows in GHL.
    > 

This is the **process** part of the prompt. Highlighting what I want to see from the platform and what the process would be in a working state/ideal outcome from building this.

<aside>
💡

**Prompting principle: Treat AI as a brainstorming buddy**

Once you give it the initial prompt, and it builds a plan for you. Ask it to identify potential gaps and identify weak spots. In this context, this is key so you can give the AI more information so it builds more accurately. You can also apply this to things beyond coding projects.

Trying to make a decision about anything? Ask it to ask you questions one by one along with its recommendation.

Unsure about how you want the project to look like? Ask it to ask you questions one by one

</aside>

- ***Outcome***
    
    > What “Done” Means
    From a development standpoint, this system is complete when:
    • CC360 is no longer required for operation
    • All logic exists inside GHL
    • No manual routing is required
    • Portfolio access is impossible without:
    First sale tag
    Gusto completed tag
    • The system can scale to:
    • More reps
    • More training tracks
    • More partner products
    Without rework
    Non-Negotiable Constraints
    No business logic lives in CC360
    No portfolio access before first sale
    No payroll onboarding before revenue
    No manager involvement before training completion
    All decisions are tag-based
    > 
    > 
    > I want to document this all for a project I am building within Codex. Give me a Phase by Phase PRD to use.
    > 

This is the **outcome** part of the prompt. 

---

### The Clarity Framework: Eliminating Ambiguity

Most prompt failures come from words that seem clear to you but mean nothing specific to AI.

**The Ambiguity Epidemic - Words That Mean Nothing:**

| Ambiguous | What It Could Mean | Specific Alternative |
| --- | --- | --- |
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
| --- | --- |
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

*"ROLE:** You are a senior backend engineer specializing in Prisma/PostgreSQL architectures for workflow automation systems.

**SITUATION:** We're building a recruiting automation system where candidates move through states: applied → training → agreement_signed → active_selling → portfolio_access.

**TASK:** Create the Prisma schema and state transition functions for the candidate journey.

**EXECUTION:** Use TypeScript strictly. Keep functions single-responsibility. Include JSDoc comments.

**SUCCESS:** The schema supports all state transitions, functions are tested, no TypeScript errors."*

---

It's important to define what "done" means because then the AI can thoroughly test and ensure that the build is complete. I’m telling it I want the output to be a “PRD / build plan” A PRD is a product requirements document, that is often given to engineers that includes specific instructions on what to build.

Certain tools, for example, like Claude Code, require you to chunk up information and build one phase at a time. The reason I love Codex is because it can one-shot massive tasks. I’ve gotten it to run hours on end with limited usage taken (I am on a Pro Plan) whereas with Claude Code it will be shorter likely taking up a lot of your weekly usage and potentially cutting you off early (depends on the plan but this is the general experience unless you are on Max x20) 

Regardless of the tool you use it is very useful to have your plan structured in phases and we will use a “Skill” to help us create a repeatable system to use phases in all our workflows to one-shot tasks with greater depth.

***NOTE: Once you have gotten the prompt, ask GPT/Claude/Gemini to “identify potential gaps and identify weak spots and ask me questions to refine the plan and to make it rock solid and ready for implementation”***

<aside>
💡

A Skill is **a reusable package of instructions, scripts, and resources that lets you extend the capabilities of AI agents like [](https://www.google.com/search?q=OpenAI%27s+Codex&sourceid=chrome&ie=UTF-8&mstk=AUtExfDHmcLTZNgOyArH2hNxtlpf2NIiDwGCzJOrpACXDecuvwDC0IRuN2Qii3u7F_SbJARUrVIMUvTS3fPTSqNf0x5g0IA8rSn2pxOSUcgoyWzoE5lnwfu1xP2yOF_ENYcnk0C4GR6pLCq7EUWa4js6NfpoKRMIvvEUL4V_mgjIpur_8xC-6tXrog3FuLcOXJLphGKOEp3X123sauouKC4fHIHNWQIu_uvo1YqOsYVJOGXFSn5HNO7NO4SMTvlNuZhUYmKjJQ4h8Xxc-dt297RYS2e3&csui=3&ved=2ahUKEwjWrZTRgYuSAxX1TqQEHddkIkQQgK4QegQIARAC)Codex, or Claude Code** allowing them to perform specific, complex workflows (like Planning, Execution, using certain MCP tools reliably without constantly rewriting prompts), acting like custom expertise or habits the AI learns. These skills are often defined in Markdown (SKILL.md) and follow an open standard, making them shareable and adaptable for different tasks, from code generation to system integration. 

***NOTE: The AI can call it or you can invoke it by typing “$” into the codex window and “/” into the Claude Code window.***

</aside>

### Final point: Build the kickoff prompt for v0 to build the frontend

After you’ve used ChatGPT or Claude to go through the entire process above (and have answered the questions fixing all gaps and weak spots), it should output a file. Name it prd.md and save it. We will use this later.

Next we prompt the same chat window with this.

```
Essentially, what I want now is a prompt for v0 by Vercel, and I want to build the frontend of this platform with all the features that we've listed. I want it to be very comprehensive prompt that leverages all the information that's here, and I wanted to make sure that we're using proper development techniques and frameworks and proper responsiveness as well within the platform. So I want you to make sure that you are incorporating proper elements of Next.js, and you will be acting as a very experienced senior engineer that's been prompting with AI agents extensively.
```

### Use v0

Out of Replit, v0, Cursor and Lovable, I’ve found v0 to have the best inherent aesthetic + has best connections. So my usual workflow is I first design the app I want on v0. When I do it on v0, **I** **use the same chat we were working in previously to create a prompt for v0.** 

Now what? 

We need to kickstart the building process. The way to think about this part is, the [prd.md](http://prd.md) includes the guide on how to build. We now have to build the front end of our platform using v0 to kickstart the building process using the prompt we just received for the inital v0 prompt. 

***NOTE: Enable the Context7 MCP tool (this allows the agent to dynamically search up documentation reference information related to the API integrations)***

This gives us an initial look into the UI/UX of our platform and then once we are satisfied we open the GitHub repo of what v0 did, rename it, upload the [prd.md](http://prd.md) and index the GitHub repo. (to index just search something in the search bar within the GitHub Repo) 

**Important pointers here:**

- There might be build errors or tiny little bugs with v0/Lovable, but once you give that main prompt, you're going to have it work through the entire platform and iterate on it. Once it's done and you have the design that you want. (This should take less than 2 minutes of manual work, however the AI will work longer obvi)
- Follow the prompting principle below

---

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

<aside>
💡

**Prompting Principle: Give AI a Role (Advanced Version)**

Generic roles activate shallow knowledge. Specific roles activate deep, precise expertise.

**The Role Specificity Spectrum:**
❌ **Generic (10% expertise activation):** *"You are a developer"*
⚠️ **Better (40% expertise activation):** *"You are a senior full-stack developer"*
✅ **Specific (80% expertise activation):** *"You are a senior full-stack engineer with 10 years building SaaS products. You specialize in Next.js + Supabase architectures, have shipped 3 products with 10K+ users, and are obsessive about type safety and error handling. You prefer composition over inheritance, favor explicit over clever, and always consider the next developer who'll read your code."*

**The Four Layers of Effective Role Definition:**
1. **Domain Expertise** - What field/industry? (e.g., "SaaS recruiting automation")
2. **Functional Expertise** - What specific skills? (e.g., "Workflow state machines, webhook integrations")
3. **Audience Expertise** - Who do they serve? (e.g., "Non-technical founders building MVPs")
4. **Approach Philosophy** - What methodology? (e.g., "Ship fast, iterate based on user feedback")

**Expertise Intersection Design:**
The most valuable AI advisors combine expertise that rarely exists in single humans:
*"You are a technical architect who studied cognitive psychology. You design database schemas that accommodate how users actually think about their data, not just how engineers would structure it."*
This combines: database architecture + cognitive psychology + recruiting domain + user-centered design

**Behavioral Programming (HOW the AI thinks):**
• *Analytical approach:* "You always start with data. Before recommending any architecture, you ask about expected scale, query patterns, and failure modes."
• *Pragmatic approach:* "You optimize for shipping speed. You choose boring technology that works, avoid premature optimization."
• *Defensive approach:* "You assume everything will fail. Every function handles errors gracefully. Every integration has a fallback."

</aside>

<aside>
💡

**Prompt Principle (Advanced): Commit to Git at every chunk**

We’ll dive into this a bit more in the advanced section. For now, after every phase that’s executed by our agent, type in the chat box “commit to github” to save a checkpoint or “push to github” in order to see the changes pushed on the Vercel Instance. Again, a deeper explanation will be available in the 102 version of the guide below

</aside>

If you have gotten to this point, **this is 80% of it.**

Getting the instructions right is THE most important part of the process. Everything from here is just tactical details. 

## Phase 2: Setting up the Agent

<aside>
❕

[**AGENTS.MD](http://AGENTS.MD) / [CLAUDE.MD](http://CLAUDE.MD) (The OS of your Agent)**

This file is your agent's persistent memory and operating system. It reads this first and uses it to understand your project.

[AGENTS.MD](Playbook%20App%20Building%20101+102%20(Advanced%20Agentic%20En/AGENTS%20MD%202f8ec10b688e80d1a2cdc6645073b869.md)

**The Seven Components of an Elite [AGENTS.MD](http://AGENTS.MD):**

**1. Scope + Reading Order**

`## Project: Local Commerce Solutions Recruiting Engine
## Tech Stack: Next.js 14 + Supabase + Prisma + Vercel
## Read Order:
1. This file ([AGENTS.MD](http://AGENTS.MD))
2. docs/[prd.md](http://prd.md) (requirements)
3. prisma/schema.prisma (data model)
4. src/types/ (TypeScript definitions)`

**2. Non-Negotiables (Explicit Constraints)**

`## DO:
- Use TypeScript strictly (no 'any' types)
- Handle all error states explicitly
- Write integration tests for business logic
- Use Prisma transactions for multi-step operations

## DON'T:
- Store secrets in code (use environment variables)
- Make breaking API changes without versioning
- Skip loading/error states in UI components
- Use console.log in production code`

**3. Commands by Intent (What You'll Actually Ask)**

`## Common Tasks:
- "Add a new candidate state" → Update Prisma schema, migration, API route
- "Fix failing test" → Check test output, identify cause, fix, verify
- "Deploy to production" → Run tests, build, push to main, verify Vercel`

**4. CLI's and MCP Tooling**

`## Required CLI Tools:
-` npx prisma migrate dev `- Database migrations
-` npm run test `- Jest integration tests
-` vercel --prod `- Production deployment

## MCP Tools Enabled:
- Context7 (API documentation lookup)
- Supabase (database queries)
- Playwright (browser testing)`

**5. Security & Secrets Policy**

`## Environment Variables (NEVER commit these):
- SUPABASE_URL, SUPABASE_ANON_KEY
- OPENAI_API_KEY
- PANDADOC_API_KEY
- GUSTO_CLIENT_SECRET

## Security Rules:
- All API routes require authentication check
- User input always validated with Zod
- Rate limiting on public endpoints`

**6. Planning/Execution Loop**

`## Before Writing Code:
1. Read relevant files to understand current state
2. Identify what needs to change
3. Consider edge cases and error states
4. Write tests first if touching business logic

## After Writing Code:
1. Run type checker:` npm run type-check
`2. Run tests:` npm test
`3. Check for console errors in browser
4. Commit with descriptive message`

**7. Definition of Done Checklist**

`## A task is DONE when:
□ Code compiles with no TypeScript errors
□ All existing tests pass
□ New functionality has tests
□ No console errors in browser
□ Mobile responsive (checked at 375px)
□ Loading and error states handled
□ Committed to git with clear message`

**Pro Tip:** Give your AI agent the [AGENTS.MD](http://AGENTS.MD) along with your [prd.md](http://prd.md) and tell it to tailor the [AGENTS.MD](http://AGENTS.MD) specifically for your project context.

</aside>

<aside>
❗

**MCP Tools**

We’ll dive into this a bit more in the advanced section. But the MCP tools that you want to use off the bat are:

(HIGHLY RECOMMENDED) 
1. [Context7](https://context7.com/) (pulls latest API documentation
2. [Supabase](https://supabase.com/blog/mcp-server) (allows the AI to search the database if needed)
3. [Jam](https://jam.dev/docs/debug-a-jam/mcp) (allows you to take screenshots and screen recordings capturing console logs, network settings ***THE GOAT FOR BUG FIXES***)

(RECOMMENDED)
4. [Playwright](https://github.com/microsoft/playwright-mcp) (browser automation tool that allows you the AI to control a browser) - easy set up with Claude Code via plugin, [for Codex watch this](https://youtu.be/EG5ZbiDpA9k?si=AcMnko3E5acVphgd)

</aside>

<aside>
‼️

**SKILLS (THE MOST IMPORTANT PIECE)**

I use a variety of different skills to make coding more efficient. Here are a few repo’s that contain a library of skills to use. Along with the ones I have personally created + refined in order to make planning, reviewing, and implementation as robust and easy as possible. 

You can just install the ones I have installed (they have heavy overlap with the ones mentioned below + more)
[https://github.com/itsAR-VR/goatedskills](https://github.com/itsAR-VR/goatedskills)
In order to install use $skill-installer on Codex or just pasting in the GitHub repo into Claude Code and telling it to “install all these skills”. 

[https://github.com/skillcreatorai/Ai-Agent-Skills](https://github.com/skillcreatorai/Ai-Agent-Skills)

[https://github.com/muratcankoylan/agent-skills-for-context-engineering](http://github.com/muratcankoylan/agent-skills-for-context-engineering)

[https://github.com/agentskills/agentskills](https://github.com/agentskills/agentskills/tree/main/skills-ref)

</aside>

<aside>
🔌

**Plugins (For Claude Code)**

Plugins are like skills but packages that you can install from the plugin marketplace in Claude Code, they are also useful to set up MCP tools for supported items as well. They also allow you to download packages of skills from other people. To open up the interface you just need to enter /plugins

Here is a list of the ones I use:

context7 Plugin · claude-plugins-official · ✔ enabled

explanatory-output-style Plugin · claude-plugins-official · ✔ enabled

frontend-design Plugin · claude-plugins-official · ✔ enabled

github Plugin · claude-plugins-official · ✔ enabled

greptile Plugin · claude-plugins-official · ✔ enabled

impeccable Plugin · impeccable · ✔ enabled

playwright Plugin · claude-plugins-official · ✔ enabled

ralph-loop Plugin · claude-plugins-official · ✔ enabled

supabase Plugin · claude-plugins-official · ✔ enabled

superpowers Plugin · claude-plugins-official · ✔ enabled

vercel Plugin · claude-plugins-official · ✔ enabled

There is 1 plugin here you won’t see within the marketplace which is the impeccable plugin, I will detail how you can download this along with a few other packages related to making your apps look pretty in the Phase 4 section.

</aside>

## Phase 2.1: Building with our Agent

After you set up the GitHub Repo, clone the repo within cursor or your IDE of choice, and then go back to the initial chat and connect to the GitHub (using the built-in connectors). 

Tell it:

```markdown
We've created the initial UI/UX with v0, (you can see the structure via the github connector tool) and now we need to go ahead and wire everything in and make sure that the app will be production ready. 

I need you to do two things:
1. Tell me all the environment variables that I need to enter/have in the project prior to starting the build process.
2. Give me a prompt for my AI agent that will allow me to one-shot the initial phase and all P0 tasks so that we can get everything wired in, all the APIs connected and get the project working with initial functionality
```

Go ahead and add the environment variables that it tells you into the settings within Vercel. Then go to your terminal and [install + run the Vercel CLI.](https://vercel.com/docs/cli) This allows your variables to stay synced locally as well. Along with providing a way for your Agent to look at the logs handling any errors if they do occur. 

Here are some principles to remember when building:

1. When you give a feature request, a plan you want built out, or any multi step instruction. Use the `$phase-plan` or `/phase-plan` skill in conjunction with the plan mode within Codex/Claude Code. This creates a phase plan with subphases to be completed that help’s your agent retain context and work on a task longer term.

2. When you have created your plan. Go ahead and use a fresh chat to do `$phase-gaps` or `/phase-gaps`(I like to switch between Codex and Claude Code, Claude for planning, Codex for gaps, Claude for implementation, and Codex for review)

3. Now just go back to the chat you used to plan, use /compact, then go ahead and use the `$phase-implement` or `/phase-implement` skill. 
(***BONUS: use the karpathy-guidelines skill to level the agent up!)***

4. Once your AI Agent has finished the build, I highly recommend putting in the following prompt. Along with using the`$phase-review` or `/phase-review` skill. This will give you “Next steps” or “Follow-Up” tasks that you’ll have to complete in order to get the phase production ready. 

```markdown
Assume I'm a begineer and have no context around the next steps you've provided. 

Please explain it to me simply as if i'm a beginner that requires accurate step-by-step instrution to complete the tasks you've listed. 
```

<aside>
💡

**Prompting Principles: Ask AI how to use AI**

****When in doubt, if you don’t know where to go, or if AI instructions seem confusing, simply ask the AI on what the instructions mean, and it will help guide you. Use terms like “explain it to me simply”, “explain like i’m 5” to make instructions simpler. 
****

</aside>

Once you’ve followed through all the steps and completed the prd.md  — you should have a fully functioning app!

<aside>
❗

**Experiment between Plan Mode and Code Mode on Codex/Claude Code**

When on plan mode, it won’t take any agent action, it will just act as a chat interface that asks you questions to lock in the plan. I use this when I want to create a solid phase plan. I use the Agent function when i’m ready for it to execute code. (To ask questions you can use either mode)
****

</aside>

## Phase 3: Understanding the different components of your app

This is good mental model to understand how everything fits together.

For basic apps, you need the following fundamental things.

1. **A server to host the app** — so it’s always running. This can be locally on your laptop or on a hosting service. 
2. **A database service —** to store all your data 
3. **Github** — to store your code. Think of this as the google drive of your code

My go to setup for any app I’m looking to build:

1. **Hosting my app** — Vercel. It’s super quick and easy to setup. It’s also free
2. **A database service** — Supabase with a Prisma ORM. Also quick, free and easy to setup. It is a PostgreSQL system, the Prisma ORM allows a bridge between our code and the database.

<aside>
💡

**Prompting Principle: Declare your stack right off the bat**

I often just tell AI at the very beginning, when i’m designing my app, that I want to use this tech stack. Makes everything much simpler

</aside>

## Phase 4: Make your app pretty

Here are my two go to ways for this

### Use existing UI frameworks.

Google the following UI Frameworks and find what kind of vibe you like the most:

1. ShadCN
2. HeadlessUI
3. Daisy UI
4. Primefaces
5. Preline

### Use the following skills/plugins

1. [Impeccable Design](Playbook%20App%20Building%20101+102%20(Advanced%20Agentic%20En%202f8ec10b688e80eca457e7121f23882c.md)
2. [RAMS](https://rams.ai/)
3. [ui-skills](https://www.ui-skills.com/)

Google the following UI Frameworks and find what kind of vibe you like the most:

Once you find the framework you like, simply tell the AI when you're prompting what UI framework you'd like, and maybe toss in the link to the UI website, so it explicitly knows what you're talking about. And AI will handle the rest. 

***NOTE: The skills/plugins are the most useful part of this entire set-up for better UI design.*** 

---

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

### Using [Jam.dev](http://Jam.dev) for Bug Reports

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

### Common Debugging Patterns

| Symptom | Likely Cause | Debug Approach |
| --- | --- | --- |
| Works locally, fails on Vercel | Environment variables missing | Check Vercel settings, run `vercel env pull` |
| Works once, then fails | Race condition or stale state | Add logging, check for async issues |
| Silent failure (no errors) | Swallowed exception or wrong branch | Add explicit error logging, trace execution path |
| Intermittent failures | External service rate limits or timeouts | Check API logs, add retry logic |

---

## Phase 5: Level up in AI by levelling up your Information diet

Here’s how I stay on top of all things AI

1. Be chronically on X. And Reddit. Follow these folks and your feed will be super AI forward quite instantly:
    1. **Andrej Karpathy** (@karpathy) - Former Tesla AI director
    2. **Sam Altman** (@sama) - CEO of OpenAI
    3. **Greg Brockman** (@gdb) - Co-founder of OpenAI
    4. **Boris Cherny** (@bcherny) - Created Claude Code
    5. **Thariq** (@trq212) - Works at Anthropic
    6. **Machine** (@EXM7777) - Amazing info + Forward thinking
    
    Join the r/codex and r/ClaudeCode subreddits (I have found codex to have really good stuff like skills, frameworks, tips, and issues that are going on) and they will make your reddit more AI-Forward as well.
2. Sign up to [AlphaSignal.ai](http://AlphaSignal.ai). It’s a daily AI newsletter. They include top AI research papers (I have a folder with a bunch of scraped resources available here)
3. Keep building stuff. You get much better at coding stuff the more you use it

**That’s it! This brings is to the end of the 101 section. If you’d like to dig deeper, proceed to 102.**

# App Building 102 (Advanced Vibe Coding Principles)

Before we explore some of the more advanced techniques for Agentic Engineering, here are some fundamental things you need to know. 

## Understanding the Terminal (CLI)

**What is the Terminal?**
The terminal (also called Command Line Interface or CLI) is a text-based way to talk to your computer. Instead of clicking buttons, you type commands.

**Why it matters:**

- This is how you execute files like python scripts
- AI coding assistants can execute commands directly via the terminal
- Many development tools work better through the terminal
    - (Claude Code, Codex CLI, other tools like Supabase CLI, Vercel CLI, etc…)

**Try this out: (if Mac)**

1. Search for terminal
2. Goal: Try to find the folder where you built your earlier project using the following commands. Experiment by entering them one at a time and hit enter:
    - `pwd` - Shows where you are
    - `ls` - Shows files in current folder
    - `cd folder-name` - Move into a folder (use `cd ..` to go back)

**Try this out: (if Windows)**

1. Search for **Command Prompt** (or **PowerShell**)
2. Type the following commands one at a time and hit enter
    - `cd` – Shows where you are (current directory)
    - `dir` – Shows files and folders in the current directory
    - `cd folder-name` – Move into a folder (use `cd ..` to go back)

## Using [Codex](https://openai.com/codex/) or [Claude Code](https://code.claude.com/docs/en/overview)

It’s super worthwhile learning how to use it. ***(this is the frontier of agentic engineering at the moment)***

Now I’m not going to go into how to download this. You can figure this out pretty easily via a quick google search or clicking the hyper links in the title. I’m going to write out some more best practices on how to use it. You can download the IDE extensions for either one for a similar experience to using ChatGPT / Claude / Gemini.

### Use Codex/Claude Code instead of ChatGPT for architecturing projects

**How do you know whether to use Cursor or CLI tools like Codex/Claude?**

If you’re building personal projects, it simply comes down to preference. Folks that choose Cursor do so because it still gives the IDE feel, which basically means they’ll be able to look at the code that is also being generated in real time. It’s also a flat, $20/month fee. (with some free usage on top of that but very limited compared to Codex & Claude Code)

Others, exclusively prefer Codex / Claude Code because:

1. Super easy to use right from the command line/IDE extension
2. It’s what most developers use
3. Can handle more complex reasoning tasks
4. Has more usage per dollar. Or you can use the API (imo just get a subscription and if you are a power user thats maxing out plans then upgrade to a larger plan, if you’re hitting higher than that just DM me).
5. **For Codex:** If you are a ChatGPT Plus user, you already have Codex usage you can use to get started (5 hour limits + weekly limits)

My take, people that argue about which one is better, are just poor.  The true power is in using both and I will cover that framework as well. 

If you have to choose one I would go with Codex at the moment because of higher limits and better quality of work but Claude Code is a faster agentic tool with a great harness but it often makes mistakes unfortunately although this will occur less as the models get better. 

---

## Agent Architecture Patterns for Complex Projects

When your project grows beyond single-agent capability, consider these patterns from the AI Agents ecosystem:

### Pattern 1: Specialized Agents with Handoffs

```jsx
Planning Agent → writes PRD and architecture docs
Implementation Agent → writes code following the plan
Review Agent → validates code against requirements
```

Each agent has focused context and expertise. Handoffs happen via documented artifacts (files), not conversation.

### Pattern 2: MCP-Powered Tool Use

Your agent becomes more powerful with external tool access:

| MCP Tool | Capability | Use Case |
| --- | --- | --- |
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

- [ ]  **Think Before Coding** - Am I hiding any uncertainty? Have I stated assumptions?
- [ ]  **Simplicity First** - Am I adding features not requested? Is this over-engineered?
- [ ]  **Surgical Changes** - Is every change directly required by the task?
- [ ]  **Goal-Driven** - Can I verify success without asking the user?

**Red Flags to Stop and Reconsider:**

- Adding features not explicitly requested
- Creating abstractions "for future flexibility"
- Refactoring adjacent code "while you're there"
- Guessing at unclear requirements instead of asking
- Writing error handling for impossible scenarios

---

### Best way to stay up to date on Codex is simply the Codex Subreddit [r/Codex.](https://www.reddit.com/r/codex/)

### Follow Boris’ (Founder of Claude Code) on CC best practices

![Screenshot 2026-01-03 at 7.00.41 PM.png](Playbook%20App%20Building%20101+102%20(Advanced%20Agentic%20En/Screenshot_2026-01-03_at_7.00.41_PM.png)

[Link to X thread](https://x.com/bcherny/status/2007179832300581177/?s=12&t=umeOwd2dxztVtbVMVQtu8w&rw_tt_thread=True&__readwiseLocation=)

## Github Best Practices

The best way to think about GitHub is like a Google Drive for your code. If Github didn’t exist, all you code would be on your laptop. This is fine for a simple project, however, when you start to build serious projects, you want to start leveraging Github so it’s cleaner and easier to build out your codebase and connect other services to it.

**At an ultra basic level, I use it for the following reasons:**

- Safety net: If something breaks, revert to a working version
- Collaboration: Multiple people can work on the same project
- Deployment: Services like Vercel can automatically deploy from Git

### Best Practice #1: Create a Git Repo

This is basically creating the Google Drive for your code. This is super easy to do. Simply go to github and follow instructions. If stuck, ask GPT for help.

### Best Practice #2: Commit after every chunk of work done.

Think of this practice like playing a video game. You make sure to save at checkpoints so if you die later, you can come back to the checkpoint.

Same idea here, if at any point you code goes haywire, you can always revert back to a checkpoint. The simplest way to do this is to either ask Claude/Cursor to make a commit. You literally just say it verbatim “Commit to GitHub”.

### Best Practice #3: Push when ready

When you’re ready to push your updates live, ask the agent to “Push to GitHub”

These are the basics of what you need to know when building basic projects just for yourself. There are other concepts like branching that are helpful. I recommend watching this video to brush up on your git basics.

https://www.youtube.com/watch?v=hwP7WQkmECE&t=9s

## Context Management: Get More Out of Limited Context

**The Problem**: AI assistants have limited "memory" in each conversation. Long conversations can exceed context limits, causing the AI to "forget" early requirements. (GPT 5.2 retains context better than every other model, see benchmarks)

![image.png](Playbook%20App%20Building%20101+102%20(Advanced%20Agentic%20En/image.png)

**Understanding Context Degradation:**

| Warning Sign | What's Happening | Solution |
| --- | --- | --- |
| AI repeats questions you answered | Earlier context pushed out | Use /compact or summarize |
| Code style becomes inconsistent | Lost [AGENTS.MD](http://AGENTS.MD) context | Re-inject key constraints |
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

### How to build with Codex AND Claude Code dual-terminal system

This is the biggest unfair advantage you can have in the current state of agentic development/vibe coding

**The Dual-Terminal Workflow:**

| Claude Code | Codex |
| --- | --- |
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

**How to use it (Step-by-Step):**

1. When you give a feature request, a plan you want built out, or any multi step instruction. Use the `$phase-plan` or `/phase-plan` skill in conjunction with the plan mode within Codex/Claude Code. This creates a phase plan with subphases to be completed that help's your agent retain context and work on a task longer term.

2. When you have created your plan. Go ahead and use a fresh chat to do `$phase-gaps` or `/phase-gaps`(I like to switch between Codex and Claude Code, Claude for planning, Codex for gaps, Claude for implementation, and Codex for review)

3. Now just go back to the chat you used to plan, use /compact, then go ahead and use the `$phase-implement` or `/phase-implement` skill. 
(***BONUS: use the karpathy-guidelines skill to level the agent up!)***

4. Once your AI Agent has finished the build, I highly recommend putting in the following prompt. Along with using the`$phase-review` or `/phase-review` skill. This will give you "Next steps" or "Follow-Up" tasks that you'll have to complete in order to get the phase production ready. 

## Structuring your frontend and backend

**For small projects (like this CourseCreator360 Clone):**

- Keep frontend and backend together in one codebase
- Use Next.js API routes for backend logic
- Simpler to manage and deploy
- Perfect for single-person or small team projects

**For larger projects:**

- Separate frontend and backend repositories
- Better for teams with specialized roles
- Easier to scale individual services
- More complex deployment and management

**Rule of thumb**: Start simple. You can always split later if needed. Do the larger project method if you’re serious about shipping your product to customers 

### ❗SUPER important note on security

As soon as your app talks to anything external, a database, an AI model, a payment provider — you’re dealing with credentials that should *never* live in your code. `.env.local` is where those values belong and if you put these variables within Vercel, they will be loaded automatically during development via the Vercel CLI, staying out of Git by default, and giving you a clean separation between code and configuration.

This is where things like:

- API keys
- Database connection strings
- Any sensitive or environment-specific configuration

should always go. Think of `.env.local` as the boundary between “things I ship” and “things I protect.”

---

**Critical security practices**

These aren’t “best practices” in the abstract — they’re how most accidental breaches actually get avoided.

1. ✅ **Never commit `.env.local` to Git**
    
    It should already be in `.gitignore`. If it isn’t, fix that immediately. Once a secret is in Git history, assume it’s compromised.
    
2. ✅ **Never share API keys in screenshots, demos, or chat**
    
    This includes Slack, Notion, screenshots for decks, and screen recordings. Keys leak far more often through humans than through hacks.
    
3. ✅ **Set usage limits on OpenAI API keys**
    
    Do this directly in the OpenAI dashboard. Rate limits and spend caps turn “oops” moments into minor inconveniences instead of expensive incidents.
    
4. ✅ **Use different keys for development vs. production**
    
    This limits blast radius. If something leaks locally, your production system shouldn’t be affected.
    

---

**Common environment variables**

Here’s a typical setup you’ll see in a Next.js-style app:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
OPENAI_API_KEY=your_openai_key
```

The key detail to understand here is **scope**.

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
    
    Use these only when the client *must* know the value.
    
- Variables without that prefix are server-side only.
    
    Secrets like `OPENAI_API_KEY` should *always* stay here.
    

If you remember nothing else: anything the browser can see should be treated as public.

---

**Protecting against vulnerabilities (the practical way)**

Even if you handle secrets correctly, vulnerabilities can still creep in through logic errors, dependencies, or unsafe patterns. One of the simplest, highest-leverage moves you can make is to **ask Claude Code to analyze your codebase for security issues**.

A prompt as simple as:

> “Review this repository for common web application vulnerabilities, insecure patterns, and dependency risks. Suggest fixes.”
> 

will often catch things humans miss — especially in fast-moving AI projects.

This doesn’t replace real security audits, but it’s an extremely strong baseline for solo builders and small teams.

**For those who want to go deeper**

If you’re genuinely interested in cybersecurity — not just avoiding mistakes, but understanding *how* vulnerabilities are found — this write-up is excellent:

[https://alexschapiro.com/security/vulnerability/2025/11/20/avelo-airline-reservation-api-vulnerability](https://alexschapiro.com/security/vulnerability/2025/11/20/avelo-airline-reservation-api-vulnerability)

It walks through a real-world API vulnerability end to end, and it’s exactly the kind of thinking that sharpens your instincts as a builder.

[Playbook: App Building 101+102 (Advanced Vibe Coding guide) (1)](Playbook%20App%20Building%20101+102%20(Advanced%20Agentic%20En/Playbook%20App%20Building%20101+102%20(Advanced%20Vibe%20Codin%202f8ec10b688e806aa8cdfafadd64da94.md)