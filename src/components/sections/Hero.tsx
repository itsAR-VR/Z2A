"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/motion-tokens";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const marqueeItems = [
  "Applications open",
  "Feb 28 – Mar 1, 2026",
  "Toronto",
  "50 seats",
  "Pods of 3–4",
  "Live build support",
  "Deposit $100",
];

function Marquee() {
  const prefersReduced = useReducedMotion();
  const row = marqueeItems.join("  •  ");

  return (
    <div className="relative border-y border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-accent)_4%,var(--color-surface))]">
      <div className="container-content">
        <div className="overflow-hidden py-3">
          <div
            className={`inline-flex items-center gap-10 whitespace-nowrap font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-muted)] ${
              prefersReduced ? "" : "animate-[z2a-marquee_18s_linear_infinite]"
            }`}
            data-testid="hero-marquee"
            aria-hidden={!prefersReduced}
          >
            <span>{row}</span>
            {!prefersReduced && <span aria-hidden="true">{row}</span>}
          </div>

          {!prefersReduced && <div className="sr-only">{row}</div>}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const prefersReduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadRef = useRef<HTMLParagraphElement | null>(null);
  const loopRef = useRef<HTMLDivElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (prefersReduced) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } });

      tl.fromTo(
        root.querySelectorAll("[data-hero='badge']"),
        { opacity: 0.95, y: 4 },
        { opacity: 1, y: 0, duration: DURATION.default },
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0.96, y: 6 },
          { opacity: 1, y: 0, duration: DURATION.slow },
          "-=0.2",
        )
        .fromTo(
          subheadRef.current,
          { opacity: 0.96, y: 6 },
          { opacity: 1, y: 0, duration: DURATION.default },
          "-=0.5",
        )
        .fromTo(
          loopRef.current,
          { opacity: 0.96, y: 6 },
          { opacity: 1, y: 0, duration: DURATION.default },
          "-=0.35",
        )
        .fromTo(
          ctasRef.current,
          { opacity: 0.96, y: 6 },
          { opacity: 1, y: 0, duration: DURATION.default },
          "-=0.25",
        )
        .fromTo(
          artRef.current,
          { opacity: 0.96, y: 10, rotate: -0.8 },
          { opacity: 1, y: 0, rotate: 0, duration: DURATION.cinematic },
          "-=0.35",
        );

      // Subtle “agent loop” animation: draw path, then run a dot around the loop.
      const loopRoot = loopRef.current;
      if (!loopRoot) return;

      const drawPath = loopRoot.querySelector<SVGPathElement>(
        "path[data-loop-draw]",
      );
      const runner = loopRoot.querySelector<SVGCircleElement>(
        "circle[data-loop-runner]",
      );
      const pulses = Array.from(
        loopRoot.querySelectorAll<SVGCircleElement>("circle[data-loop-pulse]"),
      );

      if (!drawPath || !runner) return;

      const length = Math.max(1, drawPath.getTotalLength());
      gsap.set(drawPath, {
        opacity: 1,
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.set(runner, { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" });

      const loopIntro = gsap.timeline({
        defaults: { ease: EASE.quint },
        delay: 0.25,
      });
      loopIntro
        .to(drawPath, { strokeDashoffset: 0, duration: 1.05 })
        .to(runner, { opacity: 1, scale: 1, duration: DURATION.fast }, "-=0.55");

      // Runner motion: continuous, transform-only.
      gsap.to(runner, {
        delay: 0.7,
        duration: 5.4,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: drawPath,
          align: drawPath,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      });

      // Node pulses: staggered and restrained (no “bouncy” feel).
      if (pulses.length > 0) {
        pulses.forEach((p) => {
          // Ensure SVG transforms behave predictably.
          p.style.transformBox = "fill-box";
          p.style.transformOrigin = "center";
        });

        const pulseTl = gsap.timeline({ repeat: -1, delay: 0.9 });
        pulses.forEach((p, idx) => {
          const at = idx * 0.75;
          pulseTl
            .to(
              p,
              { opacity: 0.7, scale: 1.12, duration: 0.16, ease: EASE.quart },
              at,
            )
            .to(
              p,
              { opacity: 0.22, scale: 1, duration: 0.55, ease: EASE.expo },
              at + 0.16,
            );
        });
      }
    }, root);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="top"
      className="relative"
    >
      {/* hero background accents (clipped without clipping foreground content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-44 left-1/2 h-[620px] w-[820px] -translate-x-1/2 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_18%,transparent)] blur-[90px] opacity-70" />
        <div className="absolute top-20 -right-40 h-[520px] w-[520px] rounded-full bg-[color-mix(in_oklch,var(--color-accent-2)_16%,transparent)] blur-[90px] opacity-70" />
      </div>

      <div className="container-content relative z-10 pt-32 md:pt-40 pb-14">
        <div ref={rootRef} className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="md:col-span-7">
            <div data-hero="badge" className="flex flex-wrap items-center gap-3 mb-6">
              <Badge>Feb 28 – Mar 1, 2026 · Toronto · 50 seats</Badge>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-muted)] shadow-[var(--shadow-sm)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Admissions live
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="font-heading font-bold tracking-tight text-[clamp(40px,5.2vw,74px)] leading-[0.98] text-[var(--color-text)]"
            >
              Build a working AI agent{" "}
              <span className="text-[var(--color-accent)]">in a weekend</span>.
              <br className="hidden sm:block" /> In person.
            </h1>

            <p
              ref={subheadRef}
              className="mt-5 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[60ch]"
            >
              Two days of guided build time in pods of 3–4. Leave with an agent
              that runs your workflow, a deployment path, and a lightweight
              evaluation loop you can trust.
            </p>

            <div
              ref={loopRef}
              data-testid="hero-agent-loop"
              aria-hidden="true"
              className="mt-7 max-w-[60ch] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_70%,transparent)] backdrop-blur-md shadow-[var(--shadow-sm)] px-4 py-3"
            >
              <svg
                viewBox="0 0 520 72"
                className="h-12 w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="z2a-loop-grad"
                    x1="44"
                    y1="20"
                    x2="476"
                    y2="52"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      stopColor="var(--color-accent)"
                      stopOpacity="0.65"
                    />
                    <stop
                      offset="1"
                      stopColor="var(--color-accent-2)"
                      stopOpacity="0.55"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M70 24H430C450 24 456 30 456 36C456 42 450 48 430 48H70C50 48 44 42 44 36C44 30 50 24 70 24Z"
                  stroke="url(#z2a-loop-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.22"
                />
                <path
                  data-loop-draw
                  d="M70 24H430C450 24 456 30 456 36C456 42 450 48 430 48H70C50 48 44 42 44 36C44 30 50 24 70 24Z"
                  stroke="url(#z2a-loop-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0"
                />

                <circle
                  data-loop-runner
                  cx="44"
                  cy="36"
                  r="4"
                  fill="var(--color-accent)"
                  opacity="0"
                />

                {[
                  { x: 96, label: "Scope" },
                  { x: 216, label: "Build" },
                  { x: 324, label: "Deploy" },
                  { x: 430, label: "Evaluate" },
                ].map((n) => (
                  <g key={n.label}>
                    <circle
                      cx={n.x}
                      cy={36}
                      r={12}
                      fill="var(--color-surface)"
                      stroke="var(--color-border)"
                      opacity="0.95"
                    />
                    <circle
                      data-loop-pulse
                      cx={n.x}
                      cy={36}
                      r={14}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      opacity="0.22"
                    />
                    <circle
                      cx={n.x}
                      cy={36}
                      r={3.5}
                      fill="var(--color-accent)"
                      opacity="0.85"
                    />
                    <text
                      x={n.x}
                      y={17}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.18em"
                      fill="var(--color-text-faint)"
                      opacity="0.8"
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div ref={ctasRef} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/apply">
                Apply / Reserve Seat
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </div>

          <div ref={artRef} className="md:col-span-5 md:pt-14 relative">
            <div className="relative z-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_70%,transparent)] backdrop-blur-md shadow-[var(--shadow-lg)] p-6 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_240px_at_20%_0%,color-mix(in_oklch,var(--color-accent)_14%,transparent),transparent_62%)]" />
              <p className="relative font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                What you leave with
              </p>
              <ul className="relative mt-4 space-y-3">
                {[
                  {
                    title: "A working agent",
                    desc: "Built on your use case, not a toy demo.",
                  },
                  {
                    title: "A deployment path",
                    desc: "A sane way to run it after the weekend.",
                  },
                  {
                    title: "An evaluation loop",
                    desc: "So it stays reliable as you iterate.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_18%,white)] border border-[color-mix(in_oklch,var(--color-accent)_35%,var(--color-border))] flex items-center justify-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="h-3 w-3 text-[var(--color-accent)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-[15px] text-[var(--color-text)]">
                        {item.title}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="relative mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)]">
                <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                  Structure that forces momentum
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Short instruction blocks. Long build blocks. Clear checkpoints.
                </p>
              </div>
            </div>

            {/* small “ticket” cards */}
            <div className="hidden md:block pointer-events-none absolute bottom-3 -left-4 z-20 rotate-[-6deg] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Toronto pilot
              </p>
              <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                50 seats
              </p>
            </div>
            <div className="hidden md:block pointer-events-none absolute top-3 right-2 z-20 rotate-[5deg] rounded-[var(--radius-lg)] border border-[color-mix(in_oklch,var(--color-accent)_28%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] shadow-[var(--shadow-md)] px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Refund
              </p>
              <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                Full refund by end of Day 2
              </p>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
