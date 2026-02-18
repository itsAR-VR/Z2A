import fs from "node:fs/promises";
import path from "node:path";

// The upstream API list can include scheduled posts. Only generate posts that are
// already published as of generation time.
const NOW_CUTOFF = new Date();
const POSTS_URL = "https://ownerrx.com/api/newsletter/posts?limit=200";

const ANALOGIES = [
  "Netflix did not win because movies got better. It won because distribution got faster and cheaper.",
  "Blockbuster lost when the delivery method changed, not when the catalog changed.",
  "Typewriters did not lose because writing changed. They lost because software changed the interface.",
  "Desktop-only tools looked permanent until cloud delivery rewired buying and deployment speed.",
  "Yellow Pages felt like infrastructure until search collapsed discovery into a single query.",
  "Cable bundles looked immovable until streaming made distribution modular and on-demand.",
];

const WINNER_PATTERNS = [
  "The winners are people who can learn fast, ship small, and improve weekly.",
  "The winners are operators who turn fuzzy work into repeatable systems.",
  "The winners are teams that treat feedback loops as infrastructure, not a nice-to-have.",
  "The winners are leaders who document decisions and remove handoff friction.",
  "The winners are businesses that pair human judgment with disciplined automation.",
  "The winners are builders who can translate outcomes into clear instructions and constraints.",
];

const COURSE_PLAYBOOK_MODULES = [
  "Start by defining the outcome, the context the system needs, and the exact success criteria.",
  "Separate context into three layers: stable foundation, current situation, and the instruction for this run.",
  "Run an ambiguity pass: replace vague adjectives with measurable constraints and examples.",
  "Use constraints intentionally: boundaries (what to avoid) plus creative limits (what must be true).",
  "Add 2-3 examples when format and tone matter; examples teach the boundary of 'good'.",
  "Write a simple evaluation rubric before automation so quality can be measured, not argued about.",
  "Keep human review gates on customer-facing steps until confidence is earned in production.",
  "Capture learnings weekly so workflows compound instead of resetting every quarter.",
  "Do a token audit: remove fluff, compress duplicates, front-load non-negotiables, and keep instructions testable.",
  "Use multi-pass output when quality matters: draft, restructure, then polish with a constrained checklist.",
  "Prefer narrow, operator-owned workflows over generic assistants; narrow scope makes reliability possible.",
  "Track failure modes in plain language (missing constraints, formatting drift, stale context) and fix them one by one.",
  "Design for operators: the workflow must run without the person who designed it in the room.",
  "Treat examples as the behavior boundary: include edge cases that used to break the process.",
];

const SHIFT_SIGNALS = [
  "The interface is changing from clicks to instructions, and that compresses entire job slices.",
  "Execution speed is becoming a competitive advantage, not just a productivity perk.",
  "When work becomes software, the bar shifts from effort to output quality and reliability.",
  "Teams that can document, automate, and iterate will outpace teams that rely on heroics.",
  "Distribution and implementation now matter as much as the underlying capability.",
];

const PSYCH_PATTERNS = [
  "Most people interpret waiting as prudence. In a fast market, it is often just fear with better vocabulary.",
  "Denial feels like strategy until the scoreboard changes.",
  "Comfort looks like competence right up until the bar moves.",
  "Teams rarely lose to better ideas. They lose to faster feedback loops.",
  "If you feel a mild dread reading this, good. That is your intuition noticing the timeline compressing.",
];

const SECTION_HEADING_FRAGMENTS = [
  "the next phase",
  "this job lane",
  "the operating layer",
  "this workflow",
  "the market edge",
  "the work model",
  "your next quarter",
  "the decision surface",
  "the process stack",
  "the execution layer",
];

const TOPIC_STOP_WORDS = new Set([
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
  "were",
  "been",
  "because",
  "only",
  "make",
  "made",
  "gets",
  "did",
  "does",
  "dont",
  "youre",
  "its",
  "isnt",
  "cant",
  "why",
  "how",
  "rebuild",
  "rebuilt",
  "build",
  "building",
  "building:",
  "i",
  "you",
  "me",
  "my",
  "our",
  "we",
  "on",
  "in",
  "an",
  "a",
  "of",
  "to",
  "or",
  "so",
  "as",
  "at",
  "be",
  "if",
  "am",
  "are",
  "is",
  "it",
  "hour",
  "hours",
  "day",
  "days",
  "week",
  "weeks",
  "month",
  "months",
  "year",
  "years",
  "quarter",
  "spot",
  "com",
  "app",
  "company",
  "companies",
  "business",
  "people",
  "owner",
  "owners",
  "agent",
  "ai",
  "ml",
]);

function toTitleCase(text) {
  return text.replace(/\w+/g, (word) => word[0].toUpperCase() + word.slice(1));
}

function buildTopicAnchor(title) {
  const normalized = toAscii(title || "")
    .toLowerCase()
    .replace(/[:|]/g, " : ")
    .replace(/[^a-z0-9\s]/g, " ");

  const parts = normalized
    .split(/\s*:\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => part.length > 4);

  const sourceText = (parts.length > 1 ? parts[0] : normalized).replace(/\s+/g, " ").trim();
  const tokens = sourceText
    .split(/\s+/)
    .filter((token) => token.length >= 4)
    .filter((token) => !TOPIC_STOP_WORDS.has(token))
    .filter((token) => !/^\d/.test(token))
    .slice(0, 3);

  if (tokens.length === 0) {
    return pickFrom(SECTION_HEADING_FRAGMENTS, `${title}:anchor`);
  }

  const finalTokens = [...new Set(tokens)];

  return toTitleCase(finalTokens.slice(0, 2).join(" "));
}

function buildSectionHeadings({ title, seedKey }) {
  const subject = buildTopicAnchor(title);

  const section1 = [
    `${subject}: the stress signals you're not seeing yet`,
    `${subject}: where this lane is already losing speed`,
    `${subject}: the numbers behind the discomfort`,
    `${subject}: the gap between intent and execution`,
  ];

  const section2 = [
    `${subject}: operators who are executing differently`,
    `What moving at ${subject} pace looks like now`,
    `${subject}: the team behaviors that compound`,
    `The adaptive edge inside ${subject}`,
  ];

  const section3 = [
    `${subject}: the reset moment that changes standards`,
    `The ${subject} reset: speed, distribution, and reliability`,
    `${subject}: the historical pattern repeats`,
    `Why ${subject} is no longer a strategy debate`,
  ];

  const section4 = [
    `How we protect ${subject} right now`,
    `${subject}: a practical path to reliable advantage`,
    `What to build this week around ${subject}`,
    `The Zero-to-Agent approach for ${subject}`,
  ];

  return {
    section1: pickFrom(section1, `${seedKey}:sec1`) || section1[0],
    section2: pickFrom(section2, `${seedKey}:sec2`) || section2[0],
    section3: pickFrom(section3, `${seedKey}:sec3`) || section3[0],
    section4: pickFrom(section4, `${seedKey}:sec4`) || section4[0],
  };
}

const LEAD_JOB_RISK_DATA = [
  "A large share of white-collar roles is information processing; those tasks are now automatable at scale.",
  "Recent labor-market signals are already deteriorating for new grads: ~30% find work in their field while underemployment can run above 50%.",
  "When companies can ship the same output with fewer people, hiring slows first, then org charts shrink.",
  "The first visible signal is not a layoff headline. It is fewer openings, smaller teams, and higher expectations per seat.",
];

const Z2A_POSITIONING_LINES = [
  "Zero-to-Agent is built for builders and operators who want measurable workflow output, not AI theater.",
  "The point is simple: ship one production workflow, then improve it with real metrics.",
  "Plain language is a requirement. If your team cannot operate the workflow, it does not count.",
  "We optimize for outcomes you can defend: cycle time down, error rate down, quality up, adoption up.",
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

function extractBlocksFromHtml(html) {
  const cleaned = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, " ");

  const blocks = [];
  const rx = /<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = rx.exec(cleaned))) {
    const tag = match[1].toLowerCase();
    const text = stripHtml(match[2]);
    if (!text) continue;

    if (tag === "p") {
      blocks.push({ type: "paragraph", text });
    } else if (tag === "li") {
      blocks.push({ type: "bullet", text });
    } else {
      blocks.push({ type: "heading", text });
    }
  }

  return blocks;
}

function normalizeBlocks(blocks) {
  const out = [];

  for (const block of blocks) {
    const text = cleanSentence(block.text);
    if (!text) continue;

    if (block.type === "paragraph") {
      const trimmed = text.trimStart();
      if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        const bulletText = trimmed.replace(/^[-•]\s+/, "").trim();
        if (bulletText) out.push({ type: "bullet", text: bulletText });
        continue;
      }
    }

    out.push({ type: block.type, text });
  }

  return out;
}

function scrubAttributionTerms(input) {
  return toAscii(input || "")
    .replace(/\bOwnerRx\b/gi, "")
    .replace(/\bownerrx\.com\b/gi, "")
    .replace(/\bnewsletter\.ownerrx\.com\b/gi, "")
    .replace(/\bbeehiiv\b/gi, "")
    .replace(/\bAlan Pentz\b/gi, "")
    .replace(/\bAbdur Sajid\b/gi, "")
    .replace(/\bWispr\b/gi, "")
    .replace(/\bChatGPT\b/gi, "")
    .replace(/\bCustom GPT\b/gi, "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\bwww\.\S+/gi, "")
    .replace(/\S+@\S+\.\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanSentence(sentence) {
  return toAscii(sentence)
    .replace(/\s+/g, " ")
    .replace(/^[-\s]+/, "")
    .trim();
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function wordOverlapRatio(a, b) {
  const toSet = (str) =>
    new Set(
      str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length >= 4),
    );

  const aSet = toSet(a);
  const bSet = toSet(b);
  if (aSet.size === 0 || bSet.size === 0) return 0;

  let overlap = 0;
  for (const token of aSet) {
    if (bSet.has(token)) overlap += 1;
  }

  return overlap / Math.min(aSet.size, bSet.size);
}

function extractNumericTokens(text) {
  const tokens = [];
  const patterns = [
    /\$\s?\d+(?:\.\d+)?(?:,\d{3})*(?:\s?(?:b|m|bn|mm|billion|million))?/gi,
    /\b\d+(?:\.\d+)?%\b/g,
    /\b\d+(?:,\d{3})+\b/g,
    /\b\d+(?:\.\d+)?x\b/gi,
    /\b(19|20)\d{2}\b/g,
  ];

  for (const rx of patterns) {
    const matches = text.match(rx);
    if (!matches) continue;
    for (const m of matches) {
      const normalized = m.replace(/\s+/g, "");
      if (!tokens.includes(normalized)) tokens.push(normalized);
    }
  }

  return tokens;
}

function extractTimePhrase(text) {
  const lower = text.toLowerCase();
  const patterns = [
    /\bin (?:a|one)\s+(day|week|month|year)\b/i,
    /\bover\s+(?:a|one)\s+(day|week|month|year)\b/i,
    /\bwithin\s+\d+\s+(days|weeks|months|years)\b/i,
    /\bin\s+\d+\s+(days|weeks|months|years)\b/i,
    /\bby end of\s+\d{4}\b/i,
    /\bby\s+\d{4}\b/i,
  ];

  for (const rx of patterns) {
    const match = lower.match(rx);
    if (!match) continue;
    return match[0].replace(/\s+/g, " ").trim();
  }

  return null;
}

function extractEntityCandidates(text) {
  const stop = new Set([
    "The",
    "A",
    "An",
    "And",
    "But",
    "If",
    "In",
    "On",
    "Of",
    "To",
    "For",
    "With",
    "From",
    "This",
    "That",
    "These",
    "Those",
    "Last",
    "Week",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "AI",
    "CEO",
    "CTO",
    "CFO",
    "VP",
    "SVP",
    "GM",
    "Tech",
    "Support",
    "Team",
    "Teams",
    "Business",
    "Businesses",
    "Owner",
    "Owners",
    "Ops",
    "ET",
  ]);

  const candidates = [];
  for (const raw of text.split(/\s+/)) {
    const token = raw.replace(/[^\w.%-]/g, "");
    if (!token) continue;
    if (token.length < 3) continue;
    const normalized = token.replace(/\.$/, "");
    if (!normalized) continue;
    if (stop.has(normalized)) continue;

    const looksLikeDomain = /^[A-Za-z0-9-]+\.(?:com|io|ai|dev|app|net|org|co)$/i.test(normalized);
    const looksLikeName = /^[A-Z][A-Za-z0-9-]+$/.test(normalized);
    if (looksLikeDomain || looksLikeName) candidates.push(normalized);
  }

  const unique = [];
  for (const c of candidates) {
    if (!unique.includes(c)) unique.push(c);
  }

  return unique.slice(0, 6);
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

function pickFrom(list, seedKey) {
  if (list.length === 0) return "";
  return list[hash(seedKey) % list.length];
}

function ensureTerminalPunctuation(text) {
  if (!text) return text;
  const trimmed = text.trim();
  if (/[.!?]$/.test(trimmed)) return trimmed;
  return `${trimmed}.`;
}

function rewriteDataBullet(raw, seedKey, index) {
  const cleaned = scrubAttributionTerms(raw);
  const numbers = extractNumericTokens(cleaned);
  const entities = extractEntityCandidates(cleaned);
  const timeframe = extractTimePhrase(cleaned);

  const money = numbers.find((t) => t.startsWith("$"));
  const percent = numbers.find((t) => t.endsWith("%"));
  const year = numbers.find((t) => /^\d{4}$/.test(t));

  const templates = [
    () => {
      if (money) return `Market repricing: roughly ${money} moved in a short window.`;
      if (percent) return `A visible percentage swing hit the category: ~${percent}.`;
      if (year) return `Timeline pressure: the planning horizon is now measured in months, not years (${year}).`;
      return `The numbers are moving fast in this category.`;
    },
    () => {
      if (entities.length > 0 && percent && timeframe) return `${entities[0]} moved about ${percent} ${timeframe}.`;
      if (entities.length > 0 && percent) return `${entities[0]} moved about ${percent} on the repricing.`;
      if (entities.length > 0 && money) return `${entities[0]} was tied to a ${money}-scale shift.`;
      if (money && timeframe) return `${money} moved ${timeframe} across the space.`;
      return `This is no longer theoretical; it is showing up in the numbers.`;
    },
    () => {
      if (entities.length > 1 && percent) return `Multiple incumbents took hits (e.g., ${entities[0]} and ${entities[1]} around ${percent}).`;
      if (entities.length > 0 && timeframe) return `The cycle time is compressing: ${entities[0]} shifted ${timeframe}.`;
      if (money) return `This is a capital reallocation event, not a minor feature update (${money}).`;
      return `Execution is getting repriced in public, in real time.`;
    },
  ];

  const template = templates[hash(`${seedKey}:data:${index}`) % templates.length];
  const bullet = ensureTerminalPunctuation(template());

  if (cleaned.length > 70 && wordOverlapRatio(bullet, cleaned) > 0.78) {
    return ensureTerminalPunctuation(`Data point: ${numbers.slice(0, 2).join(", ") || "rapid repricing"} with compressed timelines.`);
  }

  return bullet;
}

function buildDataBullets(blocks, seedKey, title) {
  const candidates = [];

  for (const block of blocks) {
    if (block.type === "heading") continue;
    const numbers = extractNumericTokens(block.text);
    if (numbers.length === 0) continue;
    candidates.push({ text: block.text, numbers });
  }

  const deduped = [];
  const seen = new Set();
  for (const c of candidates) {
    const key = c.text.toLowerCase().slice(0, 120);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(c);
  }

  deduped.sort((a, b) => b.numbers.length - a.numbers.length || b.text.length - a.text.length);

  const bullets = [];
  const titleTokens = extractNumericTokens(title || "");
  const titleMoney = titleTokens.find((t) => t.startsWith("$"));
  const titlePercent = titleTokens.find((t) => t.endsWith("%"));
  const titleYear = titleTokens.find((t) => /^\d{4}$/.test(t));
  const lowerTitle = (title || "").toLowerCase();

  const titleLine = (() => {
    if (titleMoney) {
      if (/\b(wiped|off|lost|erased|cut)\b/i.test(lowerTitle)) return `Market cap repricing headline: ~${titleMoney}.`;
      if (/\b(made|earned|profit|revenue|arr|ebitda)\b/i.test(lowerTitle)) return `Top-line headline: ${titleMoney}.`;
      return `Headline figure: ${titleMoney}.`;
    }
    if (titlePercent) return `Headline percentage: ${titlePercent}.`;
    if (titleYear) return `Timeline marker: ${titleYear}.`;
    return null;
  })();

  if (titleLine) bullets.push(ensureTerminalPunctuation(titleLine));

  // Keep a slot for a labor-market line so every post connects facts to job displacement.
  const maxBullets = 7;
  const reserveLabor = 1;
  const maxFromBlocks = Math.max(0, maxBullets - reserveLabor - bullets.length);

  for (let i = 0; i < Math.min(maxFromBlocks, deduped.length); i += 1) {
    bullets.push(rewriteDataBullet(deduped[i].text, seedKey, i));
  }

  // Always include one labor-market data line to connect facts to job displacement.
  const laborLine = pickFrom(LEAD_JOB_RISK_DATA, `${seedKey}:labor`);
  if (laborLine) bullets.push(ensureTerminalPunctuation(laborLine));

  return bullets.slice(0, maxBullets);
}

function buildLeadParagraphs({ title, blocks, seedKey, dataBullets }) {
  const shiftSignal = pickFrom(SHIFT_SIGNALS, `${seedKey}:shift`);
  const psych = pickFrom(PSYCH_PATTERNS, `${seedKey}:psych`);
  const body = blocks.map((b) => scrubAttributionTerms(b.text)).join(" ");
  const entities = extractEntityCandidates(body);

  const titleNums = extractNumericTokens(title);
  const primaryData =
    (dataBullets || []).find((b) => /\d|\$|%/i.test(b)) ||
    (titleNums.length > 0 ? `Data point: ${titleNums.slice(0, 2).join(", ")}.` : null) ||
    (dataBullets || [])[0] ||
    null;

  const hook = primaryData
    ? `Facts first: ${ensureTerminalPunctuation(primaryData)}`
    : `Facts first: execution is being repriced in ${title.toLowerCase()}.`;

  const groundedTemplates = [
    "This is not a 'future of work' debate. It is a present-tense change in how work gets delivered and measured.",
    "This is not about perfect tools. It is about whether your workflow can produce output reliably under time pressure.",
    "This is not about hype. It is about what happens when the interface becomes instructions and cycle time collapses.",
  ];
  const grounded = pickFrom(groundedTemplates, `${seedKey}:grounded`);

  const threat = `Jobs are threatened when work becomes software. ${ensureTerminalPunctuation(shiftSignal)}`;

  const entityLine =
    entities.length > 0
      ? `This is already showing up in day-to-day tooling: ${entities
          .slice(0, 3)
          .map((e) => e.replace(/\.com$/i, ""))
          .join(", ")}.`
      : null;

  const bridge =
    "If you are an individual, the risk is being outpaced by someone who can ship the same outcome faster and cheaper. If you are running a business, the risk is margin compression plus competitors learning weekly while you learn quarterly.";

  const fear =
    "If your day-to-day job is mostly routing, summarizing, formatting, coordinating, or generating first drafts, you are in the blast radius. The safe ground is owning the system that runs the workflow, not just completing tasks inside it.";

  const preview = `What follows is a practical breakdown of ${title.toLowerCase()} and the operator moves that keep you ahead through execution, standards, and reliable shipping.`;

  return [hook, grounded, threat, psych, entityLine, bridge, fear, preview]
    .filter(Boolean)
    .map((p) => ensureTerminalPunctuation(p));
}

function buildWinnersSection({ seedKey }) {
  const winner = pickFrom(WINNER_PATTERNS, `${seedKey}:winner`);
  const signal = pickFrom(SHIFT_SIGNALS, `${seedKey}:signal2`);

  const paragraphs = [
    ensureTerminalPunctuation(winner),
    "In today's market, the winners are the ones who can adapt and learn new skills quickly. Not someday. Weekly.",
    ensureTerminalPunctuation(signal),
    "That is true whether you are trying to keep your role safe or trying to keep your business compounding. The common denominator is disciplined execution in the workflows that pay your salary.",
    "They turn vague intent into a spec, a checklist, and a measurable loop. Then they run it until it becomes an advantage.",
  ];

  const bullets = [
    "Individuals: pick one workflow you own and make it faster, cleaner, and more measurable.",
    "Individuals: learn one tool deeply enough to ship output weekly (not just experiment).",
    "Individuals: document your best prompts, checklists, and QA rules so your work compounds.",
    "Businesses: pick one high-friction workflow and assign a single owner with clear success metrics.",
    "Businesses: build review gates so automation increases quality instead of creating silent failures.",
    "Businesses: standardize context and examples so outputs stay consistent across operators.",
    ...COURSE_PLAYBOOK_MODULES.slice(0, 10).map((line) => `Playbook: ${ensureTerminalPunctuation(line)}`),
  ].map((b) => ensureTerminalPunctuation(b));

  return { paragraphs, bullets };
}

function buildBoldClaimParagraphs({ title, seedKey, keywords }) {
  const analogy = pickFrom(ANALOGIES, `${seedKey}:analogy`);
  const topic = keywords.length ? keywords.slice(0, 2).join(" + ") : "implementation + distribution";

  const claimVariants = [
    "The next internet-shaped wave is not about having access to AI. It is about how quickly you can deploy it into real work.",
    "The moat is shifting away from knowledge and toward implementation: who can ship, measure, and iterate faster.",
    "The winners will not be the people with the fanciest tools. They will be the people with the fastest feedback loops.",
  ];

  const consequenceVariants = [
    "If you wait for consensus, your competitor will ship version 1, collect feedback, and already be on version 5 while you are still in planning.",
    "The risk is not that AI will replace you overnight. The risk is that someone using AI will deliver the same outcome faster and cheaper, and the market will reward them.",
    "This is why fear is rational here: the timeline is shrinking, and the gap compounds once one side starts learning weekly.",
  ];

  return [
    ensureTerminalPunctuation(analogy),
    `That is the frame for ${title.toLowerCase()}: the method of offering work is changing. Speed and implementation beat comfort.`,
    ensureTerminalPunctuation(pickFrom(claimVariants, `${seedKey}:claim`)),
    ensureTerminalPunctuation(pickFrom(consequenceVariants, `${seedKey}:consequence`)),
    `Even if everyone has access to similar models, not everyone can run ${topic} as a reliable system. Operational maturity becomes the differentiator.`,
    "Netflix did not need a better movie catalog. It needed a better delivery method. The same dynamic is now showing up in knowledge work.",
  ];
}

function buildHelpSection({ seedKey }) {
  const positioning = pickFrom(Z2A_POSITIONING_LINES, `${seedKey}:z2a`);

  const paragraphs = [
    ensureTerminalPunctuation(positioning),
    "We do not teach 'AI'. We help you install one workflow that runs reliably, then show you how to improve it without guessing.",
    "For individuals, that means leaving with a shipped workflow you can point to and defend. For businesses, it means leaving with operators enabled inside your existing stack.",
    "This is how you turn fear into leverage: narrow scope, clear success criteria, tight feedback loops, and visible output by the end of the week.",
  ];

  const bullets = [
    "Step 1: Choose one workflow where speed and quality matter (support, ops, sales, recruiting, reporting).",
    "Step 2: Define success upfront (time saved, error rate, conversion lift, SLA improvement).",
    "Step 3: Write the workflow spec in plain language so a non-expert can run it.",
    "Step 4: Build prompts with layered context and concrete constraints.",
    "Step 5: Add examples for tone and formatting so outputs stay stable.",
    "Step 6: Add evaluation checks and a review gate before anything customer-facing ships.",
    "Step 7: Deploy the smallest working version and measure it in production.",
    "Step 8: Run a weekly improvement loop: fix one failure mode at a time and track the delta.",
    "Individuals: keep a personal library of prompts, checklists, and rubrics you can reuse across roles.",
    "Businesses: train operators so the workflow does not depend on one person or one vendor.",
    "Operators: treat every new workflow like a product launch: scope, ship, instrument, iterate.",
    "Leaders: reward measurable output and reliability, not performative experimentation.",
  ].map((b) => ensureTerminalPunctuation(b));

  return { paragraphs, bullets };
}

function buildSections({ title, blocks, seedKey, keywords }) {
  const dataBullets = buildDataBullets(blocks, seedKey, title);
  const sectionHeadings = buildSectionHeadings({ title, seedKey });

  const leadParagraphs = buildLeadParagraphs({ title, blocks, seedKey, dataBullets });
  const winners = buildWinnersSection({ seedKey });
  const boldClaimParagraphs = buildBoldClaimParagraphs({ title, seedKey, keywords });
  const help = buildHelpSection({ seedKey });

  const sections = [
    {
      heading: sectionHeadings.section1,
      paragraphs: leadParagraphs,
      bullets: dataBullets,
    },
    {
      heading: sectionHeadings.section2,
      paragraphs: winners.paragraphs,
      bullets: winners.bullets,
    },
    {
      heading: sectionHeadings.section3,
      paragraphs: boldClaimParagraphs,
    },
    {
      heading: sectionHeadings.section4,
      paragraphs: help.paragraphs,
      bullets: help.bullets,
    },
  ];

  const used = new Set(
    sections
      .flatMap((s) => [...s.paragraphs, ...(s.bullets || [])])
      .map((t) => String(t || "").toLowerCase().trim())
      .filter(Boolean),
  );

  // Iteratively enforce depth and specificity without leaking source text.
  const targetMinWords = 1200;
  for (let i = 0; i < 50; i += 1) {
    const totalWords = sections
      .flatMap((s) => [...s.paragraphs, ...(s.bullets || [])])
      .map((t) => wordCount(t))
      .reduce((a, b) => a + b, 0);

    if (totalWords >= targetMinWords) break;

    const which = hash(`${seedKey}:expand:${i}`) % sections.length;

    const pool = [
      pickFrom(SHIFT_SIGNALS, `${seedKey}:extra:${i}`),
      pickFrom(PSYCH_PATTERNS, `${seedKey}:psychExtra:${i}`),
      pickFrom(COURSE_PLAYBOOK_MODULES, `${seedKey}:module:${i}`),
      pickFrom(Z2A_POSITIONING_LINES, `${seedKey}:pos:${i}`),
      "Operator loop: plan, locate, extract, solve, verify, then synthesize into a reusable checklist.",
      "Practical move: turn this workflow into a spec with inputs, outputs, constraints, and a failure-mode list.",
    ].filter(Boolean);

    let extra = null;
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const candidate = pickFrom(pool, `${seedKey}:extraPick:${i}:${attempt}`);
      if (!candidate) continue;
      const cleaned = ensureTerminalPunctuation(candidate);
      const key = cleaned.toLowerCase().trim();
      if (!key) continue;
      if (used.has(key)) continue;
      used.add(key);
      extra = cleaned;
      break;
    }

    if (extra) {
      sections[which].paragraphs.push(extra);
    } else {
      const fallback =
        "The point is not to sound smart. The point is to ship a workflow that works, measure it, and improve it until it becomes an advantage.";
      const fallbackKey = fallback.toLowerCase().trim();
      if (!used.has(fallbackKey)) {
        used.add(fallbackKey);
        sections[which].paragraphs.push(fallback);
      }
    }
  }

  // Final scrub pass to eliminate links/attribution and keep text consistently formatted.
  return sections.map((section) => {
    const cleanedParagraphs = section.paragraphs
      .map((p) => ensureTerminalPunctuation(cleanSentence(scrubAttributionTerms(p))))
      .filter(Boolean);

    const uniqParagraphs = [];
    const seenParagraphs = new Set();
    for (const p of cleanedParagraphs) {
      const key = p.toLowerCase().trim();
      if (seenParagraphs.has(key)) continue;
      seenParagraphs.add(key);
      uniqParagraphs.push(p);
    }

    const cleanedBullets = section.bullets
      ? section.bullets.map((b) => ensureTerminalPunctuation(cleanSentence(scrubAttributionTerms(b)))).filter(Boolean)
      : undefined;

    const uniqBullets = cleanedBullets
      ? (() => {
          const out = [];
          const seen = new Set();
          for (const b of cleanedBullets) {
            const key = b.toLowerCase().trim();
            if (seen.has(key)) continue;
            seen.add(key);
            out.push(b);
          }
          return out;
        })()
      : undefined;

    return {
      ...section,
      heading: cleanSentence(section.heading),
      paragraphs: uniqParagraphs,
      bullets: uniqBullets,
    };
  });
}

function estimateReadTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.min(24, Math.round(words / 200)));
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

function capitalizeTag(tag) {
  if (!tag) return tag;
  return tag[0].toUpperCase() + tag.slice(1);
}

function uniq(list) {
  const out = [];
  const seen = new Set();
  for (const item of list) {
    if (!item) continue;
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
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
      };
    }

    const rawTitle = decodeHtmlEntities(detail.title || post.title || "");
    const rawDescription = decodeHtmlEntities(detail.description || post.description || "");
    const normalizedTitle = toAscii(cleanSentence(rawTitle));
    const blocks = normalizeBlocks(extractBlocksFromHtml(detail.content || ""));
    const bodyText = blocks.map((b) => b.text).join(" ");
    const keywords = extractKeywords(
      normalizedTitle,
      scrubAttributionTerms(rawDescription),
      scrubAttributionTerms(bodyText),
    );

    const sections = buildSections({
      title: normalizedTitle,
      blocks,
      seedKey: post.slug,
      keywords,
    });

    const joinedText = sections
      .flatMap((section) => [...section.paragraphs, ...(section.bullets || [])])
      .join(" ");

    const excerptCandidate =
      sections[0]?.paragraphs.find((p) => p.length >= 80 && !/^facts first:/i.test(p)) ||
      sections[0]?.paragraphs.find((p) => p.length >= 80) ||
      sections[1]?.paragraphs.find((p) => p.length >= 80) ||
      joinedText;

    const excerpt = truncateAtWord(excerptCandidate, 180);

    const heroStatCandidate =
      sections[0]?.bullets?.find((b) => /\d|\$|%/i.test(b)) ||
      sections[0]?.bullets?.[0] ||
      sections[0]?.paragraphs?.[0] ||
      excerptCandidate;

    rewritten.push({
      slug: post.slug,
      title: normalizedTitle,
      excerpt,
      publishedAt: adjustDate(post.publishedAt, post.slug),
      readTimeMinutes: estimateReadTime(joinedText),
      heroStat: truncateAtWord(cleanSentence(heroStatCandidate), 116),
      tags: uniq(["AI Ops", "Execution", "Job Security", ...keywords.slice(0, 2).map(capitalizeTag)]).slice(0, 5),
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
