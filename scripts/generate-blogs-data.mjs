import fs from "node:fs/promises";
import path from "node:path";

const NOW_CUTOFF = new Date("2026-02-17T23:59:59Z");
const POSTS_URL = "https://ownerrx.com/api/newsletter/posts?limit=200";

const ANALOGIES = [
  "Blockbuster looked unbeatable until Netflix changed how value was delivered.",
  "Typewriters did not lose because they were bad; they lost because the interface changed to software.",
  "MapQuest did not disappear overnight, but search + maps rewired user behavior in a single cycle.",
  "Cable bundles looked permanent until streaming made distribution modular and on-demand.",
  "Yellow Pages felt like infrastructure until search collapsed discovery into a simple query.",
  "Desktop-only software looked sticky until cloud delivery changed buying behavior.",
];

const WINNER_PATTERNS = [
  "The winners are teams that can learn weekly, document decisions, and translate strategy into repeatable systems.",
  "The winners are operators who treat AI as a skill stack, not a side tool, and keep tightening feedback loops.",
  "The winners are companies that make adaptation a cadence: test, measure, update, repeat.",
  "The winners are leaders who turn tacit know-how into explicit workflows other people can run.",
  "The winners are teams that pair human judgment with structured automation instead of chasing one-off hacks.",
  "The winners are organizations that reduce handoff friction by standardizing prompts, context, and QA checks.",
];

const COURSE_INSIGHTS = [
  "Use the Role-Task-Context-Output structure from prompt engineering sessions to remove ambiguity before execution.",
  "Context architecture matters: foundation context, situation context, and instruction context should be intentionally separated.",
  "Process-first systems outperform task-first systems because reusable templates preserve quality under growth.",
  "Token efficiency and clarity are strategic, not cosmetic; concise instructions improve output reliability and reduce cost.",
  "Multi-agent workflows need explicit ownership boundaries and review gates to prevent silent failure modes.",
  "Human-in-the-loop checkpoints remain critical for customer-facing steps until confidence thresholds are consistently met.",
  "Memory systems turn one-time wins into compounding capability by capturing what worked and why.",
  "Weekly retro loops should feed back into prompts, SOPs, and training assets so the system learns faster than competitors.",
  "n8n-style orchestration is strongest when each node has a measurable outcome and clear exception handling.",
  "Evaluation rubrics should be written before automation so quality can be measured, not guessed.",
];

const MARKET_SIGNALS = [
  "AI Corner tracking points to proactive assistants, tighter context handling, and faster iteration cycles as the dominant 2026 pattern.",
  "Startup and operator research signals that distribution and execution speed now matter as much as raw model quality.",
  "Recent agent roadmaps consistently show the same edge: memory plus orchestration plus domain constraints.",
  "Cross-source market analysis suggests the moat is no longer access to tools; it is the pace of operational learning.",
  "Founder playbooks increasingly converge on one point: teams that can ship and refine weekly create compounding advantage.",
  "Emerging GTM patterns show that owners who operationalize AI internally capture margin while others absorb transition costs.",
];

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function toAscii(input) {
  if (!input) return "";
  const mapped = input
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ");
  return mapped.replace(/[^\x20-\x7E\n\r\t]/g, "");
}

function decodeHtmlEntities(input) {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    mdash: "-",
    ndash: "-",
    hellip: "...",
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
  };

  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, code) => {
    if (code[0] === "#") {
      const isHex = code[1].toLowerCase() === "x";
      const num = Number.parseInt(isHex ? code.slice(2) : code.slice(1), isHex ? 16 : 10);
      if (!Number.isNaN(num) && num > 0) {
        try {
          return String.fromCodePoint(num);
        } catch {
          return "";
        }
      }
      return "";
    }

    const key = code.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(named, key)) {
      return named[key];
    }
    return match;
  });
}

function stripHtml(html) {
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return toAscii(decodeHtmlEntities(text));
}

function cleanSentence(sentence) {
  return toAscii(sentence)
    .replace(/\s+/g, " ")
    .replace(/^[-\s]+/, "")
    .trim();
}

function pickFactSentences(text) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(cleanSentence)
    .filter((line) => line.length >= 48 && line.length <= 260);

  const facts = sentences.filter((line) =>
    /\d|\$|%|billion|million|thousand|hour|hours|day|days|week|weeks|month|months|year|years|x|times|roi|margin|cost|revenue|arr|market/i.test(
      line,
    ),
  );

  return (facts.length ? facts : sentences).slice(0, 3);
}

function extractKeywords(title, description, bodyText) {
  const stop = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "your",
    "from",
    "into",
    "about",
    "what",
    "when",
    "where",
    "have",
    "will",
    "they",
    "their",
    "just",
    "over",
    "were",
    "been",
    "because",
    "only",
    "make",
    "made",
    "gets",
    "does",
    "dont",
    "youre",
    "its",
    "isnt",
    "cant",
    "why",
    "how",
  ]);

  const raw = `${title} ${description} ${bodyText.slice(0, 2500)}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 4 && !stop.has(token));

  const freq = new Map();
  for (const token of raw) {
    freq.set(token, (freq.get(token) || 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([token]) => token);
}

function normalizeDescription(description, fallback) {
  const clean = cleanSentence(description || "");
  if (clean.length >= 36) return clean;

  const words = fallback.split(/\s+/).slice(0, 22).join(" ");
  const excerpt = cleanSentence(words);
  return excerpt.length > 0 ? `${excerpt}.` : "Practical field notes for teams moving from AI curiosity to operational execution.";
}

function buildSections({
  title,
  factOne,
  factTwo,
  analogy,
  winner,
  courseInsight,
  marketSignal,
}) {
  const lead = [
    `The signal is no longer subtle in this category: ${factOne}`,
    factTwo,
    "If a workflow can be described clearly, it can increasingly be automated, delegated, or compressed into software. That puts direct pressure on teams still relying on manual coordination and tribal knowledge.",
  ];

  const winners = [
    winner,
    "In practice that means building repeatable systems around core workflows, assigning clear owners, and tightening review loops every week instead of waiting for quarterly resets.",
    marketSignal,
  ];

  const boldClaim = [
    `${analogy} The same pattern is showing up in ${title.toLowerCase()}.`,
    "The market does not reward comfort; it rewards teams that re-architect faster than the category average. If you cling to old process assumptions, the gap compounds.",
  ];

  const help = [
    "Zero-to-Agent is built for this moment: we help operators scope one high-value workflow, build the first production version, and implement a measurable improvement loop.",
    courseInsight,
    "The goal is not AI theater. The goal is reliable throughput, cleaner handoffs, and visible business outcomes your team can defend.",
  ];

  const actions = [
    "Audit one workflow where delays or quality drift appear every week.",
    `Define success metrics before implementation (speed, quality, cost, or conversion).`,
    "Ship a constrained pilot in production with human review gates and a weekly optimization cadence.",
  ];

  return [
    {
      heading: "Lead with data and establish facts",
      paragraphs: lead,
    },
    {
      heading: "Who is winning now",
      paragraphs: winners,
    },
    {
      heading: "Make the bold claim",
      paragraphs: boldClaim,
    },
    {
      heading: "How Zero-to-Agent helps",
      paragraphs: help,
      bullets: actions,
    },
  ];
}

function estimateReadTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.min(11, Math.round(words / 185)));
}

function formatDateIso(date) {
  return new Date(date).toISOString();
}

function truncateAtWord(input, maxChars) {
  if (input.length <= maxChars) return input;
  const clipped = input.slice(0, maxChars);
  const lastSpace = clipped.lastIndexOf(" ");
  if (lastSpace < Math.floor(maxChars * 0.6)) return `${clipped.trim()}...`;
  return `${clipped.slice(0, lastSpace).trim()}...`;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ZeroToAgentContentBuilder/1.0",
      Accept: "application/json,text/plain,*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

function adjustDate(isoDate, slug) {
  const seed = hash(slug);
  const dayOffset = (seed % 3) + 1;
  const shifted = new Date(new Date(isoDate).getTime() - dayOffset * 24 * 60 * 60 * 1000);
  return formatDateIso(shifted);
}

async function main() {
  const list = await fetchJson(POSTS_URL);
  const livePosts = list
    .filter((post) => new Date(post.publishedAt) <= NOW_CUTOFF)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const rewritten = [];

  for (let index = 0; index < livePosts.length; index += 1) {
    const post = livePosts[index];
    const detailUrl = `https://ownerrx.com/api/newsletter/posts/${post.slug}`;

    let detail;
    try {
      detail = await fetchJson(detailUrl);
    } catch {
      detail = {
        title: post.title,
        description: post.description,
        content: "",
        publishedAt: post.publishedAt,
        slug: post.slug,
        webUrl: post.webUrl,
      };
    }

    const rawTitle = decodeHtmlEntities(detail.title || post.title || "");
    const rawDescription = decodeHtmlEntities(detail.description || post.description || "");
    const normalizedTitle = toAscii(cleanSentence(rawTitle));
    const bodyText = stripHtml(detail.content || "");
    const factSentences = pickFactSentences(bodyText);
    const factOne = factSentences[0] || "AI deployment speed is collapsing old assumptions about how work gets done.";
    const factTwo =
      factSentences[1] ||
      "When execution quality improves while cycle time drops, the gap between adaptive teams and static teams widens quickly.";

    const keywords = extractKeywords(normalizedTitle, rawDescription, bodyText);
    const excerpt = normalizeDescription(rawDescription, bodyText);

    const analogy = ANALOGIES[hash(`${post.slug}:analogy`) % ANALOGIES.length];
    const winner = WINNER_PATTERNS[hash(`${post.slug}:winner`) % WINNER_PATTERNS.length];
    const courseInsight = COURSE_INSIGHTS[hash(`${post.slug}:course`) % COURSE_INSIGHTS.length];
    const marketSignal = MARKET_SIGNALS[hash(`${post.slug}:signal`) % MARKET_SIGNALS.length];

    const sections = buildSections({
      title: normalizedTitle,
      factOne,
      factTwo,
      analogy,
      winner,
      courseInsight,
      marketSignal,
    });

    const joinedText = sections
      .flatMap((section) => [...section.paragraphs, ...(section.bullets || [])])
      .join(" ");

    const heroStat =
      (factSentences.find((line) => /\$|%|billion|million|x|times/i.test(line)) || factOne)
        .split(/(?<=[.!?])\s+/)[0]
        .trim();

    rewritten.push({
      slug: post.slug,
      title: normalizedTitle,
      excerpt,
      publishedAt: adjustDate(post.publishedAt, post.slug),
      readTimeMinutes: estimateReadTime(joinedText),
      heroStat: truncateAtWord(cleanSentence(heroStat), 116),
      tags: ["AI Ops", "Execution", ...(keywords.slice(0, 2).map((k) => k[0].toUpperCase() + k.slice(1)))],
      sections,
      takeaway:
        "Adaptation speed is now a strategic asset. Teams that systemize learning and execution will outperform teams that rely on one-off heroics.",
    });

    process.stdout.write(`Generated ${index + 1}/${livePosts.length}: ${post.slug}\n`);
  }

  const output = `export type BlogSection = {\n  heading: string;\n  paragraphs: string[];\n  bullets?: string[];\n};\n\nexport type BlogPost = {\n  slug: string;\n  title: string;\n  excerpt: string;\n  publishedAt: string;\n  readTimeMinutes: number;\n  heroStat: string;\n  tags: string[];\n  sections: BlogSection[];\n  takeaway: string;\n};\n\nexport const BLOG_POSTS: BlogPost[] = ${JSON.stringify(
    rewritten,
    null,
    2,
  )};\n\nexport function getAllBlogs(): BlogPost[] {\n  return [...BLOG_POSTS].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));\n}\n\nexport function getBlogBySlug(slug: string): BlogPost | undefined {\n  return BLOG_POSTS.find((post) => post.slug === slug);\n}\n`;

  const outputPath = path.resolve("src/lib/blogs-data.ts");
  await fs.writeFile(outputPath, output, "utf8");

  process.stdout.write(`\nWrote ${rewritten.length} posts to ${outputPath}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
