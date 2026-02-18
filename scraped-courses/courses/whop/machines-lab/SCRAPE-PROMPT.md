# Scrape Machines Lab 7-Day Prompt Engineering Course

## State Tracking
Read `.claude/.ralph-scrape-state.json` for progress. Create if missing:
- currentDay: 0
- completedDays: []
- completedLessons: []
- resources: []

## Output Location
/Users/AR180/Desktop/Codespace/whop/machines-lab/

## Day URLs (base: https://whop.com/joined/machines-lab/)
- Day 0: day-0-start-here-4X2hjzPCAv6R1k/app/
- Day 1: day-1-the-thinking-revolution-swMXlSW31KPApR/app/
- Day 2: day-2-the-context-architecture-kT1pzD6IpBVgUN/app/
- Day 3: day-3-the-clarity-framework-Zj8g3AcXZShYAj/app/
- Day 4: day-4-the-example-engine-NICVdQfKm0VFCf/app/
- Day 5: day-5-the-role-revolution-PsRfKqARnML3Dy/app/
- Day 6: day-6-the-output-orchestra-3VVbU544mbEdvB/app/
- Day 7: day-7-the-end-EPb5vUSzSbp8wS/app/

## Each Iteration
1. Read state file to find next unscraped day/lesson
2. Use Playwright browser_navigate to the day URL
3. Take browser_snapshot to find course card
4. Click course card to enter lessons view
5. For each lesson in sidebar, click and extract content via browser_evaluate (get tabpanel innerText)
6. Capture any Notion links (machina.notion.site URLs)
7. Write/append to days/day-N-slug.md
8. Update state file with progress
9. Move to next lesson or next day

## Output Files
- days/day-0-start-here.md through day-7-the-end.md
- course.json with metadata and resource links
- resources/ folder for Notion page content

## Completion Signal
When all 8 days scraped and course.json written:
&lt;promise&gt;SCRAPE COMPLETE&lt;/promise&gt;
