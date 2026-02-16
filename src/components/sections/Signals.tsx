import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Button } from "@/components/Button";
import { BUSINESS_CALENDLY_URL } from "@/lib/config";
import {
  DEFAULT_SIGNAL_QUOTES,
  DEFAULT_SIGNAL_STATS,
  SIGNAL_MANIFESTO,
  type SignalQuote,
  type SignalStat,
} from "@/lib/signals";

type SignalsVariant = "home" | "individuals" | "businesses";

type SignalsProps = {
  variant: SignalsVariant;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  stats?: SignalStat[];
  quotes?: SignalQuote[];
};

function QuoteCard({ quote }: { quote: SignalQuote }) {
  const inner = (
    <figure className="tilt-hover h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
      <div
        aria-hidden="true"
        className="font-heading text-[46px] leading-none tracking-tight text-[color-mix(in_oklch,var(--color-accent)_72%,var(--color-text)_28%)]"
      >
        &quot;
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-[var(--color-text)]">
        {quote.quote}
      </blockquote>
      <figcaption className="mt-6">
        <p className="font-heading text-sm font-semibold tracking-tight text-[var(--color-text)]">
          {quote.author}
        </p>
        {quote.role ? (
          <p className="mt-1 text-xs text-[var(--color-text-faint)]">{quote.role}</p>
        ) : null}
        {quote.note ? (
          <p className="mt-2 text-xs text-[var(--color-text-faint)]">{quote.note}</p>
        ) : null}
      </figcaption>
    </figure>
  );

  if (!quote.href) return inner;

  return (
    <a
      href={quote.href}
      target="_blank"
      rel="noreferrer"
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
    >
      {inner}
      <span className="sr-only">Open source link for {quote.author}</span>
    </a>
  );
}

function StatCard({ stat }: { stat: SignalStat }) {
  const card = (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-[var(--shadow-sm)]">
      <p className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">{stat.value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">{stat.label}</p>
      {stat.detail ? <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.detail}</p> : null}
    </div>
  );

  if (!stat.href) return card;

  return (
    <a
      href={stat.href}
      target="_blank"
      rel="noreferrer"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
    >
      {card}
      <span className="sr-only">Open source link for {stat.label}</span>
    </a>
  );
}

function getVariantCopy(variant: SignalsVariant) {
  if (variant === "individuals") {
    return {
      eyebrow: "Signal",
      heading: "This is already a filter.",
      lead: "The next 2-3 years decide your slope. Learn to ship with AI, or get managed by those who do.",
      primaryCtaLabel: "Apply",
      primaryCtaHref: "/apply",
      secondaryCtaLabel: "Explore Home",
      secondaryCtaHref: "/",
    };
  }

  if (variant === "businesses") {
    return {
      eyebrow: "Signal",
      heading: "This is already a competitive gap.",
      lead: "The next 2-3 years decide which teams ship faster. AI is leverage when it is operational, governed, and continuously improved.",
      primaryCtaLabel: "Book a call",
      primaryCtaHref: BUSINESS_CALENDLY_URL || "#contact",
      secondaryCtaLabel: "See engagement",
      secondaryCtaHref: "#pricing",
    };
  }

  return {
    eyebrow: "Signal",
    heading: "This is already a filter.",
    lead: "The next 2-3 years decide who compounds output and who falls behind. We build systems that ship.",
    primaryCtaLabel: "Explore Individuals",
    primaryCtaHref: "/individuals",
    secondaryCtaLabel: "Explore Businesses",
    secondaryCtaHref: "/businesses",
  };
}

export function Signals({
  variant,
  eyebrow,
  heading,
  lead,
  stats = DEFAULT_SIGNAL_STATS,
  quotes = DEFAULT_SIGNAL_QUOTES,
}: SignalsProps) {
  const variantCopy = getVariantCopy(variant);
  const resolvedEyebrow = eyebrow ?? variantCopy.eyebrow;
  const resolvedHeading = heading ?? variantCopy.heading;
  const resolvedLead = lead ?? variantCopy.lead;

  return (
    <SectionWrapper alt className="pt-12 md:pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
              {resolvedEyebrow}
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,3.9vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              {resolvedHeading}
            </h2>
            <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              {resolvedLead}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={90}>
            <div className="mt-7 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_34%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))] p-6 shadow-[var(--shadow-md)]">
              <p className="font-heading text-xl font-semibold tracking-tight text-[var(--color-text)]">
                {SIGNAL_MANIFESTO.heading}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{SIGNAL_MANIFESTO.lead}</p>
              {"middle" in SIGNAL_MANIFESTO && SIGNAL_MANIFESTO.middle ? (
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{SIGNAL_MANIFESTO.middle}</p>
              ) : null}
              <ul className="mt-4 space-y-2">
                {SIGNAL_MANIFESTO.bullets.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{SIGNAL_MANIFESTO.closer}</p>
              {"urgency" in SIGNAL_MANIFESTO && SIGNAL_MANIFESTO.urgency ? (
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{SIGNAL_MANIFESTO.urgency}</p>
              ) : null}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <StatCard key={`${stat.value}-${stat.label}`} stat={stat} />
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={220}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href={variantCopy.primaryCtaHref}>{variantCopy.primaryCtaLabel}</Button>
              <Button href={variantCopy.secondaryCtaHref} variant="secondary">
                {variantCopy.secondaryCtaLabel}
              </Button>
            </div>
          </RevealOnScroll>
        </div>

        <div className="md:col-span-7">
          <RevealOnScroll className="h-full">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {quotes.map((quote) => (
                <QuoteCard key={`${quote.author}-${quote.quote.slice(0, 18)}`} quote={quote} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </SectionWrapper>
  );
}
