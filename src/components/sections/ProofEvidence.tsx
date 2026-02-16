import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { SectionWrapper } from "@/components/SectionWrapper";

type ProofStat = {
  value: string;
  label: string;
  detail: string;
  sourceHref: string;
  sourceLabel?: string;
};

type ProofQuote = {
  quote: string;
  author: string;
  role: string;
  sourceHref: string;
  sourceLabel?: string;
  note?: string;
};

type ProofEvidenceProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  lead?: string;
  stats: ProofStat[];
  quotes: ProofQuote[];
};

function QuoteCard({ quote }: { quote: ProofQuote }) {
  const content = (
    <>
      <div
        aria-hidden="true"
        className="font-heading text-4xl leading-none tracking-tight text-[color-mix(in_oklch,var(--color-accent)_70%,var(--color-text)_30%)]"
      >
        &quot;
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-[var(--color-text)]">{quote.quote}</blockquote>
      <figcaption className="mt-5">
        <p className="font-heading text-sm font-semibold tracking-tight text-[var(--color-text)]">{quote.author}</p>
        <p className="mt-1 text-xs text-[var(--color-text-faint)]">{quote.role}</p>
        {quote.note ? <p className="mt-2 text-xs text-[var(--color-text-muted)]">{quote.note}</p> : null}
      </figcaption>
    </>
  );

  return (
    <figure className="tilt-hover h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
      {quote.sourceHref ? (
        <a
          href={quote.sourceHref}
          target="_blank"
          rel="noreferrer"
          className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        >
          {content}
          <span className="mt-5 inline-flex text-xs text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1">
            Source
          </span>
        </a>
      ) : (
        content
      )}
    </figure>
  );
}

function StatCard({ stat }: { stat: ProofStat }) {
  return (
    <a
      href={stat.sourceHref}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-expo)] hover:border-[color-mix(in_oklch,var(--color-accent)_26%,var(--color-border))] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
    >
      <p className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">{stat.value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">{stat.label}</p>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.detail}</p>
      <span className="mt-3 inline-flex text-xs text-[var(--color-accent)]">
        {stat.sourceLabel || "Source"} {quoteArrow}
      </span>
    </a>
  );
}

const quoteArrow = "→";

export function ProofEvidence({ id, eyebrow, heading, lead, stats, quotes }: ProofEvidenceProps) {
  return (
    <SectionWrapper id={id} className="pt-12 md:pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">{eyebrow}</p>
            <h2 className="mt-3 font-heading text-[clamp(30px,3.9vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              {heading}
            </h2>
            {lead ? (
              <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                {lead}
              </p>
            ) : null}
          </RevealOnScroll>

          <RevealOnScroll delay={110}>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <StatCard key={`${stat.value}-${stat.label}`} stat={stat} />
              ))}
            </div>
          </RevealOnScroll>
        </div>

        <div className="md:col-span-7">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {quotes.map((quote) => (
                <QuoteCard key={`${quote.author}-${quote.quote.slice(0, 20)}`} quote={quote} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </SectionWrapper>
  );
}
