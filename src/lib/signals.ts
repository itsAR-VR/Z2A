export type SignalStat = {
  value: string;
  label: string;
  detail?: string;
  href?: string;
};

export type SignalQuote = {
  quote: string;
  author: string;
  role?: string;
  href?: string;
  note?: string;
};

export const DEFAULT_SIGNAL_STATS: SignalStat[] = [
  {
    value: "56%",
    label: "AI skill premium in pay",
    detail: "Reported for workers with AI skills vs. similar roles without. That premium reportedly doubled in a year.",
    href: "https://www.pwc.com/gx/en/issues/data-and-analytics/publications/artificial-intelligence-study.html",
  },
  {
    value: "3x",
    label: "Revenue growth per employee",
    detail: "Reported in industries adopting AI faster than peers.",
    href: "https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-jobs-barometer.html",
  },
  {
    value: "44%",
    label: "Received AI training (US)",
    detail: "Cornerstone OnDemand study: only 44% of U.S. employees reported receiving AI training and tools.",
    href: "https://www.cornerstoneondemand.com/company/news-room/press-releases/hidden-ai-lack-of-training-keeps-ai-use-in-the-shadows-despite-ai-usage-encouragement-from-employers/",
  },
  {
    value: "300M",
    label: "Jobs exposed to automation",
    detail: "Goldman Sachs estimate cited widely: up to ~300M full-time jobs exposed to automation.",
    href: "https://www.cnbc.com/2023/03/28/ai-automation-could-impact-300-million-jobs-heres-which-ones.html",
  },
];

export const DEFAULT_SIGNAL_QUOTES: SignalQuote[] = [
  {
    quote: "People who aren't keeping up even over the last 30 days already have a deprecated worldview on this topic.",
    author: "Andrej Karpathy",
    role: "AI researcher",
    href: "https://www.infoworld.com/article/4111829/ais-trust-tax-for-developers.html",
  },
  {
    quote: "The era of humans writing code is over.",
    author: "Ryan Dahl",
    role: "Creator of Node.js",
    href: "https://x.com/rough__sea/status/2013280952370573666",
  },
  {
    quote: "Machines won't replace humans, but humans with machines will replace humans without machines.",
    author: "Karim Lakhani",
    role: "Harvard Business School",
    href: "https://www.cnbc.com/2023/08/02/harvard-ai-guru-on-why-every-main-street-business-should-use-chatgpt.html",
  },
  {
    quote: "The companies that are not set up to be able to adopt AI co-workers very quickly will be at a huge disadvantage.",
    author: "Sam Altman",
    role: "OpenAI",
    href: "https://www.pymnts.com/news/artificial-intelligence/2026/sam-altman-says-full-ai-companies-are-possible-but-businesses-are-not-ready/",
  },
  {
    quote:
      "95% of what marketers use agencies, strategists, and creative professionals for today will be handled by AI at almost no cost.",
    author: "Sam Altman",
    role: "OpenAI",
    note: "Reported second-hand",
    href: "https://www.businessinsider.com/how-advertising-agencies-use-ai-to-pitch-win-business-2025-5",
  },
];

export const SIGNAL_MANIFESTO = {
  heading: "In 10 years, there will be two classes of people.",
  lead: 'Economists call it a \"K-shaped economy\". The next 2-3 years decide which line you are on.',
  middle: "This isn't just coming. It's already happening.",
  bullets: [
    "People who use AI as leverage: automate workflows, build assets, and make decisions faster.",
    "People whose work gets managed by it.",
  ],
  closer:
    "If you have not built systems with AI yet, you are on the wrong line. That's not an insult. You still have agency to change your trajectory.",
  urgency:
    "But six months from now, the gap will be wider. And a year from now, it may not be crossable.",
} as const;
