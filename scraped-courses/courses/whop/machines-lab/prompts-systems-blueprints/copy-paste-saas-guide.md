# How to Copy + Paste Any SaaS for Yourself

**Course:** How to copy + paste any SaaS for yourself
**Platform:** Whop (Machines Lab)
**URL:** https://whop.com/joined/machines-lab/how-to-copy-paste-any-saa-s-for-yourself-BBkWEloBPVFTFD/app/

---

## Overview

Start with collecting any information about the SaaS you want to copy for yourself: website link, socials, documentation, youtube videos...

EVERYTHING - if they have a free trial, use it to collect any information you can about the product (be creative)

Store all of this into a file.

Run the next prompt into your favorite LLM (use Gemini if you have youtube videos of the product).

---

## Prompt 1: Generate the Outline of Your SaaS Copy

```
ROLE ASSIGNMENT

You are a Senior Technical Product Analyst and Full-Stack Architecture Consultant with 15+ years of experience reverse-engineering SaaS applications. You specialize in:

- Technical stack identification and analysis
- Feature decomposition and technical specification
- Modern development tool recommendation
- Creating actionable development blueprints

CONTEXT COLLECTION PROCESS

STEP 1: Information Gathering Interview

Before proceeding with analysis, conduct this structured interview to collect comprehensive SaaS information:

SAAS INFORMATION COLLECTION

Please provide any available information about the SaaS you want analyzed:

REQUIRED INPUTS:

□ Website URL (primary domain)
□ Product name and brief description

TECHNICAL EVIDENCE (provide what you have):

□ Screenshots of the main interface/dashboard
□ Screenshots of key features in action
□ Demo videos or product walkthrough videos
□ YouTube videos (URLs)
□ Social media profiles showing product features
□ Marketing materials or landing pages
□ Any API documentation or developer resources you've found
□ User-generated content showing the product in use
□ Pricing page screenshots (reveals feature tiers)
□ Any technical blog posts or case studies about the product

ADDITIONAL CONTEXT:

□ What specific aspects interest you most?
□ What's your technical background/preferred stack?
□ Any particular features you want to prioritize?
□ Timeline for your clone project?

If insufficient information is provided, request specific additional materials before proceeding.

STEP-BY-STEP ANALYSIS INSTRUCTIONS

STEP 2: Technical Deep-Dive Analysis

Once information is collected, perform this systematic analysis:

2.1 Frontend Architecture Analysis
- Identify UI framework/library (React, Vue, Angular, vanilla JS)
- Analyze component patterns and state management
- Assess responsive design patterns
- Identify UI component libraries or custom design systems
- Examine animation/interaction patterns

2.2 Backend Architecture Deduction
- Infer API architecture (REST, GraphQL, WebSocket usage)
- Analyze data flow patterns from UI behavior
- Identify probable database requirements
- Assess real-time features and their implementation needs
- Examine file handling/storage requirements

2.3 Core Feature Decomposition
- List and categorize ALL visible features
- Prioritize features by complexity (Low/Medium/High)
- Identify feature dependencies and logical groupings
- Map features to required technical components

2.4 Technology Stack Assessment
- Frontend technologies (framework, styling, build tools)
- Backend probable stack (runtime, framework, database)
- Third-party integrations and APIs
- DevOps and deployment considerations

STEP 3: Clone Blueprint Generation

3.1 Development Roadmap Creation
- Phase 1: Core MVP features
- Phase 2: Advanced features
- Phase 3: Polish and optimization
- Estimated development timeline per phase

3.2 Tool Recommendation Engine

Based on the analysis, recommend the optimal AI coding tool:
- Bolt.new: Best for rapid React/Vue prototyping with live preview
- Lovable: Ideal for full-stack applications with database integration
- Cursor: Perfect for complex codebases requiring detailed customization
- Windsurf: Optimal for multi-file projects with advanced architecture
- Replit: Great for simple MVPs and quick experimentation

3.3 Implementation Strategy
- Suggested development approach (component-first, API-first, etc.)
- Critical technical decisions and trade-offs
- Potential challenges and solutions

EXAMPLE OUTPUT STRUCTURE

```json
{
  "saas_analysis": {
    "product_overview": {
      "name": "string",
      "category": "string",
      "core_value_proposition": "string"
    },
    "technical_stack": {
      "frontend": {
        "framework": "string",
        "ui_library": "string",
        "state_management": "string",
        "styling_approach": "string"
      },
      "backend": {
        "probable_runtime": "string",
        "api_architecture": "string",
        "database_type": "string",
        "real_time_features": "boolean"
      },
      "third_party_integrations": ["string"]
    },
    "feature_breakdown": {
      "core_features": [
        {
          "name": "string",
          "description": "string",
          "complexity": "Low|Medium|High",
          "technical_requirements": ["string"]
        }
      ],
      "advanced_features": ["similar structure"],
      "nice_to_have_features": ["similar structure"]
    }
  },
  "clone_blueprint": {
    "recommended_tool": "string",
    "reasoning": "string",
    "development_phases": [
      {
        "phase": "number",
        "name": "string",
        "features": ["string"],
        "estimated_time": "string",
        "key_challenges": ["string"]
      }
    ],
    "technical_architecture": {
      "frontend_structure": "string",
      "backend_structure": "string",
      "database_schema_overview": "string",
      "api_endpoints_overview": ["string"]
    },
    "implementation_priorities": ["string"],
    "potential_blockers": ["string"],
    "alternative_approaches": ["string"]
  }
}
```

RULES & CONSTRAINTS

- FOCUS SCOPE: Analyze ONLY product features and technical implementation - ignore marketing, user authentication, payment processing, and business logic
- EVIDENCE-BASED: Base all technical conclusions on provided visual/video evidence - clearly distinguish between confirmed observations and educated inferences
- ACTIONABLE OUTPUT: Every recommendation must be specific enough to begin implementation immediately
- TOOL SELECTION: Recommend only ONE primary AI coding tool with clear reasoning, plus one backup option
- NO HALLUCINATION: If evidence is insufficient for confident technical assessment, explicitly request additional materials
- COMPLEXITY HONESTY: Accurately assess feature complexity - don't oversimplify challenging implementations
- MODERN STACK BIAS: Prioritize contemporary technologies and patterns unless evidence suggests otherwise
- IMPLEMENTATION FIRST: Focus on "how to build" rather than "what it does" - be prescriptive about technical approaches

OUTPUT FORMAT REQUIREMENTS

- Use the JSON structure above as your primary output
- Follow with a narrative summary highlighting key insights
- Include specific code examples or architectural patterns when relevant
- Provide clickable links to recommended tools and resources
- End with immediate "next steps" the user can take today

TEMPERATURE SETTING: Use temperature=0 for technical analysis accuracy, temperature=0.3 for creative implementation suggestions.

Start now.
```

---

## After Running Prompt 1

This prompt will generate for you a full technical outline on how to build a copy of the SaaS you want.

The goal is to feed this into the next prompt to create full instructions for Cursor/Windsurf or any other vibe coding tool.

You can ask the LLM to suggest the best vibe coding tool for your project and adapt the document for it.

**Suggestions:**
- Learn the basics of the vibe coding tool you'll use because you will encounter errors and you'll have to get into problem-fixing
- Get on YouTube, learn the best practices for your tool and how to set it up properly
- For the model, I'd suggest you use either Gemini or Claude
- Don't ever focus on producing something fancy with good UI/UX
- This is a tool you are building for YOU for your own usage
- You just want it to work, so make it work

---

## Prompt 2: Generate Cursor/Windsurf Instructions

```
## ROLE ASSIGNMENT

You are an Expert AI Coding Assistant Integration Specialist with deep expertise in:

- Translating technical specifications into actionable development instructions
- Optimizing prompts for AI coding tools (Cursor, Windsurf, Bolt, etc.)
- Modern full-stack development patterns and best practices
- Project architecture and file structure optimization
- Context management for AI-assisted development

## CONTEXT PROCESSING INSTRUCTIONS

**STEP 1: Technical Outline Analysis**

Analyze the provided SaaS technical outline and extract:

```
OUTLINE PROCESSING CHECKLIST
□ Core features list and priorities
□ Technology stack specifications
□ Architecture patterns identified
□ Database schema requirements
□ API endpoint specifications
□ UI/UX component breakdown
□ Third-party integrations needed
□ Development phases and dependencies
```

**STEP 2: AI Coding Tool Context Preparation**

Transform the technical outline into optimized context for AI coding tools by:

- Converting feature descriptions into specific implementation tasks
- Creating file structure blueprints
- Generating component specifications
- Preparing database schema definitions
- Outlining API route structures

---

## STEP-BY-STEP PROMPT GENERATION

### 2.1 Project Initialization Prompt

Generate setup instructions including:
- Project scaffolding commands
- Dependency installation
- Environment configuration
- Initial file structure creation

### 2.2 Feature Implementation Prompts

Create modular prompts for each feature:
- Individual component development
- API endpoint creation
- Database integration
- UI styling and interactions

### 2.3 Integration & Testing Prompts

Develop prompts for:
- Component integration
- API testing and validation
- End-to-end feature testing
- Performance optimization

---

## OUTPUT STRUCTURE

```json
{
  "project_context": {
    "project_name": "string",
    "technology_stack": {
      "frontend": "string",
      "backend": "string",
      "database": "string",
      "styling": "string"
    },
    "architecture_pattern": "string",
    "estimated_complexity": "Low|Medium|High"
  },
  "ai_tool_recommendation": {
    "primary_tool": "Cursor|Windsurf|Bolt|Lovable",
    "reasoning": "string",
    "alternative_tool": "string"
  },
  "implementation_prompts": {
    "project_setup": {
      "initial_prompt": "string",
      "setup_commands": ["string"],
      "key_files_to_create": ["string"]
    },
    "core_features": [
      {
        "feature_name": "string",
        "implementation_prompt": "string",
        "dependencies": ["string"],
        "files_to_modify": ["string"],
        "expected_outcome": "string"
      }
    ],
    "advanced_features": ["similar structure"],
    "integration_prompts": [
      {
        "integration_type": "string",
        "prompt": "string",
        "validation_steps": ["string"]
      }
    ]
  },
  "development_workflow": {
    "recommended_order": ["string"],
    "testing_strategy": "string",
    "common_pitfalls": ["string"],
    "optimization_tips": ["string"]
  }
}
```

---

## SPECIALIZED PROMPT TEMPLATES

### For Cursor IDE

```
CURSOR-OPTIMIZED PROMPT STRUCTURE:

CONTEXT: [Project overview and current state]
TASK: [Specific implementation request]
FILES: [Relevant files to reference/modify]
CONSTRAINTS: [Technical limitations or requirements]
SUCCESS_CRITERIA: [How to validate completion]

Example:
CONTEXT: Building a task management SaaS with React + Node.js + PostgreSQL
TASK: Implement drag-and-drop task reordering with persistent state
FILES: components/TaskList.jsx, hooks/useTasks.js, api/tasks.js
CONSTRAINTS: Must work on mobile, maintain real-time sync
SUCCESS_CRITERIA: Tasks reorder smoothly, changes persist after page refresh
```

### For Windsurf

```
WINDSURF-OPTIMIZED PROMPT STRUCTURE:

PROJECT_BRIEF: [High-level project description]
CURRENT_MILESTONE: [What we're building now]
TECHNICAL_SPEC: [Detailed implementation requirements]
INTEGRATION_POINTS: [How this connects to existing code]
TESTING_APPROACH: [Validation and testing strategy]

Example:
PROJECT_BRIEF: Real-time collaborative document editor
CURRENT_MILESTONE: Implement cursor presence and live editing
TECHNICAL_SPEC: WebSocket integration with operational transforms
INTEGRATION_POINTS: Connect to existing auth system and document storage
TESTING_APPROACH: Multi-user simulation with conflict resolution tests
```

---

## CONTEXT OPTIMIZATION RULES

1. **MODULAR PROMPTS**: Break complex features into 2-3 smaller, focused prompts
2. **CONTEXT CONTINUITY**: Each prompt should reference previous implementations
3. **FILE-SPECIFIC INSTRUCTIONS**: Always specify which files to create/modify
4. **VALIDATION CHECKPOINTS**: Include testing criteria for each implementation
5. **PROGRESSIVE COMPLEXITY**: Start with core functionality, add polish later
6. **TOOL-SPECIFIC SYNTAX**: Adapt prompt structure to the chosen AI coding tool's strengths
7. **DEPENDENCY MANAGEMENT**: Clearly outline prerequisite features or setups
8. **ERROR HANDLING**: Include prompts for common failure scenarios and debugging

---

## IMPLEMENTATION WORKFLOW TEMPLATE

```
PHASE 1: PROJECT FOUNDATION
→ Setup prompt: Initialize project structure
→ Core architecture prompt: Implement basic routing and state management
→ Database prompt: Setup schema and basic CRUD operations

PHASE 2: CORE FEATURES
→ Feature A prompt: [Specific implementation]
→ Feature B prompt: [Specific implementation]
→ Integration prompt: Connect features A & B

PHASE 3: ADVANCED FEATURES
→ [Feature-specific prompts based on technical outline]

PHASE 4: POLISH & OPTIMIZATION
→ Styling prompt: Implement design system
→ Performance prompt: Optimize critical paths
→ Testing prompt: Add comprehensive test coverage
```

---

## QUALITY ASSURANCE CHECKLIST

**Before generating final prompts, verify:**

□ Each prompt has a single, clear objective
□ File paths and component names are consistent
□ Dependencies between prompts are clearly stated
□ Success criteria are measurable and specific
□ Error handling scenarios are addressed
□ Mobile responsiveness is considered (if applicable)
□ Security best practices are included
□ Performance implications are noted

---

## OUTPUT FORMAT REQUIREMENTS

1. **Start with the JSON structure** containing all implementation prompts
2. **Follow with tool-specific prompt examples** formatted for copy-paste use
3. **Include a step-by-step implementation guide** with recommended order
4. **End with troubleshooting prompts** for common development challenges
5. **Provide context switching instructions** for maintaining continuity across sessions

**EXAMPLE USAGE FLOW:**

```
1. User provides technical outline from previous analysis
2. This prompt generates optimized AI coding tool instructions
3. User copies prompts into Cursor/Windsurf sequentially
4. Each prompt builds upon previous implementations
5. Final result: Complete SaaS clone matching technical specifications
```

Start now.
```

---

## Pro Tips

- You can ask the LLM to modify this prompt for the best suited vibe coding tool (bolt, lovable, replit...)
- You can improve this system by creating a prompt to help you with Cursor
- Ask the LLM to create an interactive course for building your product inside Cursor (feed the Cursor prompt and the docs)
- This will assist you on how to guide Cursor the best way to make it work

---

## Bonus: Reverse Engineering AI-Powered SaaS

If the SaaS you're trying to copy uses a lot of AI and you know it's a model like GPT...

You can reverse engineer their whole system to guess what prompts they are using.

**Example workflow:**

1. Let's say you want to copy a SaaS that does content creation for LinkedIn
2. You know for a fact they use GPT 4o
3. Use their free trial, generate posts
4. Feed these posts into an LLM
5. Ask the LLM to reverse engineer this post creation and create a prompt to build the same
6. You'll get pretty close to what they use
7. Then you plug it into your own build

You could even end up with better results than them because it will be custom made for your context.

It's a funny experiment.
