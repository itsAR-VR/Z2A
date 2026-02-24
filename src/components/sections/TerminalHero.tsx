"use client";

/**
 * TerminalHero
 * Mac-style terminal window with CSS typewriter animation.
 * Shown in the hero right panel as a "live agent boot" preview.
 * No JS animation lib — pure CSS steps() typewriter.
 */
export function TerminalHero() {
  return (
    <div className="terminal-hero">
      {/* ── Mac window chrome ── */}
      <div className="terminal-hero__header">
        <div className="terminal-hero__dots">
          <span className="terminal-hero__dot terminal-hero__dot--red" />
          <span className="terminal-hero__dot terminal-hero__dot--yellow" />
          <span className="terminal-hero__dot terminal-hero__dot--green" />
        </div>
        <span className="terminal-hero__title">zero-to-agent — setup</span>
        {/* mirror dots for centering */}
        <div className="terminal-hero__dots" aria-hidden style={{ opacity: 0 }}>
          <span className="terminal-hero__dot" />
          <span className="terminal-hero__dot" />
          <span className="terminal-hero__dot" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="terminal-hero__body">
        {/* Command line — typewriter */}
        <div className="terminal-hero__cmd">
          <span className="terminal-hero__prompt">$</span>
          <span className="terminal-hero__typed">openclaw --init first-workflow</span>
          <span className="terminal-hero__cursor" />
        </div>

        {/* Output lines — staggered fade-in */}
        <div className="terminal-hero__output">
          {[
            { delay: "1.9s", text: "Connecting to OpenClaw…", ok: true },
            { delay: "2.4s", text: "Mapping your tools…", ok: true },
            { delay: "2.9s", text: "Building first agent…", ok: true },
            { delay: "3.4s", text: "Wiring workflow steps…", ok: true },
          ].map(({ delay, text, ok }) => (
            <div
              key={text}
              className="terminal-hero__line"
              style={{ animationDelay: delay }}
            >
              <span className="terminal-hero__arrow">›</span>
              <span className="terminal-hero__line-text">{text}</span>
              {ok && <span className="terminal-hero__ok">✓</span>}
            </div>
          ))}

          {/* Final success line */}
          <div
            className="terminal-hero__line terminal-hero__line--success"
            style={{ animationDelay: "4.0s" }}
          >
            <span className="terminal-hero__arrow terminal-hero__arrow--success">›</span>
            <span>Ready. First workflow live by Sunday.</span>
          </div>
        </div>

        {/* Bottom label */}
        <div className="terminal-hero__badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={12} height={12}>
            <path d="M5 12l5 5L20 7" />
          </svg>
          No engineers. No demos. Just working AI.
        </div>
      </div>
    </div>
  );
}
