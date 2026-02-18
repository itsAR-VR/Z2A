# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Directory Is

A collection of web scraping workflows for extracting educational content, newsletter articles, and digital assets from various platforms. Each subdirectory targets a different source with its own extraction pattern.

## Directory Structure

```
scraping/
├── substack/           # Newsletter article scraper (browser console + Playwright)
├── whop/               # Membership platform course scraper (Playwright + state tracking)
├── Scraper/            # Google Drive batch downloader (Python + GCP APIs)
└── adcrate/            # Placeholder for ad creative scraping
```

## Scraping Workflows

### 1. Substack (`substack/`)

**Purpose:** Extract articles from Substack publications (currently: The AI Corner)

**Key Files:**
- `scraper.js` — Post metadata array (run in browser console to collect URLs)
- `posts.json` — Index of scraped posts with metadata (title, author, date, likes)
- `posts/*.md` — Full article content in markdown with YAML front matter

**Pattern:**
1. Update `scraper.js` with target publication's post list
2. Use Playwright to navigate to each URL
3. Extract article content via `document.querySelector('.post-content')` or similar
4. Write to `posts/YYYY-MM-DD-slug.md` with front matter

**Output naming:** `YYYY-MM-DD-slug.md`

### 2. Whop (`whop/machines-lab/`)

**Purpose:** Extract course content from Whop membership platforms

**Key Files:**
- `SCRAPE-PROMPT.md` — Instructions for 7-day course extraction
- `SCRAPE-COMMUNITY-PROMPT.md` — Instructions for community resources extraction
- `.claude/.ralph-scrape-state.json` — Progress tracking for resumable scraping
- `course.json` — Master index of course structure and linked resources
- `days/*.md` — Daily lesson content
- `courses/n8n-automation-course/*.md` — Full n8n course modules

**Pattern:**
1. Read state file to find next unscraped item
2. Use Playwright `browser_navigate` to course/resource URL
3. Take `browser_snapshot` to understand page structure
4. Click through lesson sidebar, extract via `browser_evaluate`:
   ```javascript
   () => {
     const main = document.querySelector('[role="tabpanel"]') ||
                  document.querySelector('main');
     return main?.innerText || '';
   }
   ```
5. Capture external links (Notion, Google Docs)
6. Update state file with progress

**State Schema:**
```json
{
  "currentDay": 0,
  "completedDays": [],
  "completedLessons": [],
  "resources": []
}
```

**Completion Signal:** `<promise>SCRAPE COMPLETE</promise>`

### 3. Google Drive Downloader (`Scraper/`)

**Purpose:** Batch download assets from Google Drive folders via spreadsheet

**Key Files:**
- `sheet.py` — Main Python script
- `scraper-458904-eef209196d3b.json` — GCP service account credentials
- `download_state.json` — Progress tracking (completed folder IDs)
- `download.log` — Detailed operation history

**Dependencies:**
```bash
pip install gspread google-auth google-api-python-client
```

**Run:**
```bash
cd scraping/Scraper
python sheet.py
```

**Configuration (in sheet.py):**
- `SPREADSHEET_ID` — Google Sheets ID containing folder links
- `SHEET_NAME` — Tab name to read from
- `MAIN_FOLDER` — Local output directory

**Pattern:**
1. Authenticate via service account
2. Read folder URLs from spreadsheet column 5
3. Extract folder IDs via regex
4. Recursively download all files, skipping already-downloaded
5. Save progress to `download_state.json` after each folder

### 4. Adcrate (`adcrate/`)

**Purpose:** Placeholder for ad creative scraping (empty)

## MCP Tools for Scraping

When scraping with Playwright MCP:

```
browser_navigate   → Navigate to URL
browser_snapshot   → Get accessibility tree (better than screenshot for data extraction)
browser_click      → Click elements by ref
browser_evaluate   → Run JS to extract content
browser_type       → Fill forms if needed
```

## Conventions

### State-Based Resumable Scraping
All long-running scrapes should use state files:
- Track progress with JSON in `.claude/` or project root
- Update state after each successful extraction
- Check state on startup to resume from last position

### Output Organization
- **Temporal content:** `YYYY-MM-DD-slug.md`
- **Hierarchical courses:** `course-name/module-N-slug.md` or `days/day-N-slug.md`
- **Metadata indices:** `posts.json`, `course.json`, `community.json`

### Front Matter Standard
```yaml
---
title: "Article Title"
author: "Author Name"
date: "2026-01-15"
url: "https://original-source.com/path"
slug: "article-slug"
---
```

### Content Extraction Selectors (by platform)

**Substack:**
```javascript
document.querySelector('.post-content, .body.markup')
```

**Whop:**
```javascript
document.querySelector('[role="tabpanel"]') || document.querySelector('main')
```

**Generic fallback:**
```javascript
document.querySelector('article, main, [class*="content"]')
```

## Quality Checklist

Before considering a scrape complete:
1. Verify item count matches expected total
2. Check for empty or malformed markdown files
3. Ensure all external links captured in metadata
4. Confirm state file shows completion
5. Index JSON is valid and complete
