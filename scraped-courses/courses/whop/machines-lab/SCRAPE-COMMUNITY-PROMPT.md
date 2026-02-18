# Scrape Machines Lab - Full Community Resources

## State Tracking
Read `.claude/.ralph-scrape-community-state.json` for progress. Create if missing:
```json
{
  "currentSection": 0,
  "completedSections": [],
  "completedResources": [],
  "resources": []
}
```

## Output Location
/Users/AR180/Desktop/Codespace/whop/machines-lab/

## Resource Sections to Scrape

### Section 1: Machines Lab - Home
Base: https://whop.com/joined/machines-lab/
- Machines Hub: machines-hub-fH7FtWKgqjtmqR/app/
- Composition AI: composition-ai-HWpSeSHyGCg63n/app/
- Machines Lab AI Mentor: machines-lab-ai-mentor-kTZkWjhsC6QbAQ/app/
- Send me a DM: send-me-a-dm-8pwL0OLWZS244X/app/

### Section 2: The Ultimate n8n Course
- The FULL n8n Automation Course: the-full-n8n-automation-course-qPR2uj0EAxhIOd/app/

### Section 3: Prompts, Systems and Blueprints
- 15 AI SEO Super-prompts: 15-ai-seo-super-prompts-qB5dAmiO5L9Knj/app/
- The system to charge $500 for 45min of work: the-system-to-charge-500-for-45min-of-work-I9FumMGKF4Wu3i/app/
- Building an n8n agency: building-an-n8n-agency-5A2SyWPbzX2OOL/app/
- The automated Fiverr blueprint: the-automated-fiverr-blueprint-to-sell-microserv-XYch3Dc86KFIMj/app/
- +1,000 Perfect Copy Swipe File: 1-000-perfect-copy-swipe-file-fzLtG95wytI9qq/app/
- LinkedIn ghostwriting blueprint: the-blueprint-to-run-an-automated-linkedin-ghost-VP0nStQxg3hx6I/app/
- Prompts to learn n8n: prompts-to-learn-n8n-E64V2v9TNgearL/app/
- How to find clients on X using AI: how-to-find-clients-on-x-using-ai-qaGFdunEnqorYv/app/
- 100+ super-prompts pack: 100-super-prompts-pack-rZK3i3VCxl0EJs/app/
- 10 AI Content creation prompts for Claude 4: 10-ai-content-creation-prompts-for-claude-4-dZgiT6Ikg55PhF/app/
- How to go from zero to $10k/month: how-to-go-from-zero-to-10k-month-kRExB7eUrQ3GHK/app/
- How to copy + paste any SaaS: how-to-copy-paste-any-saa-s-for-yourself-BBkWEloBPVFTFD/app/

## Each Iteration
1. Read state file to find next unscraped resource
2. Use Playwright browser_navigate to the resource URL
3. Take browser_snapshot to understand page structure
4. For COURSE type resources (n8n course):
   - Click course card to enter lessons view
   - For each lesson in sidebar, click and extract content via browser_evaluate
   - Capture any external links (Notion, Google Docs, etc.)
   - Write to courses/[slug]/[lesson-slug].md
5. For CONTENT type resources (prompts, blueprints, guides):
   - Extract main content area via browser_evaluate
   - Capture any downloadable links or external resources
   - Write to resources/[slug].md
6. For TOOL type resources (AI Mentor, Composition AI):
   - Document the tool's purpose and interface
   - Write to tools/[slug].md
7. Update state file with progress
8. Move to next resource

## Content Extraction Pattern
```javascript
() => {
  const main = document.querySelector('[role="tabpanel"]') ||
               document.querySelector('main') ||
               document.querySelector('[class*="content"]');
  const links = Array.from(main?.querySelectorAll('a') || []).map(a => ({
    text: a.textContent.trim(),
    href: a.href
  })).filter(l => l.href?.includes('http'));
  return {
    content: main?.innerText || '',
    links: links
  };
}
```

## Output Structure
```
/Users/AR180/Desktop/Codespace/whop/machines-lab/
├── days/                          # Already done (7-day course)
├── courses/
│   └── n8n-automation-course/
│       ├── index.md
│       └── lessons/
├── resources/
│   ├── 15-ai-seo-super-prompts.md
│   ├── 500-for-45min-system.md
│   ├── n8n-agency-blueprint.md
│   ├── fiverr-automation-blueprint.md
│   ├── perfect-copy-swipe-file.md
│   ├── linkedin-ghostwriting-blueprint.md
│   ├── prompts-to-learn-n8n.md
│   ├── find-clients-on-x.md
│   ├── 100-super-prompts-pack.md
│   ├── claude-4-content-prompts.md
│   ├── zero-to-10k-guide.md
│   └── copy-paste-saas-guide.md
├── tools/
│   ├── machines-hub.md
│   ├── composition-ai.md
│   ├── ai-mentor.md
│   └── send-me-a-dm.md
├── course.json                    # Already done
└── community.json                 # New: full community index
```

## Completion Signal
When all resources scraped and community.json written:
<promise>COMMUNITY SCRAPE COMPLETE</promise>
