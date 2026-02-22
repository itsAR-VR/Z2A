"use client";

import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { SeatCounter } from "@/components/SeatCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackEvent } from "@/lib/analytics";
import { DURATION, EASE, STAGGER } from "@/lib/motion-tokens";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export function Hero() {
  const prefersReduced = useReducedMotion();
  const [ctaRedirecting, setCtaRedirecting] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<HTMLDivElement | null>(null);
  const loopSvgRef = useRef<SVGSVGElement | null>(null);

  const onCtaClick = () => {
    if (ctaRedirecting) return;
    setCtaRedirecting(true);
    trackEvent("cta_click", { source: "hero" });
  };

  /* ── Vibemarketer-style staggered intro ── */
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const root = rootRef.current;
    if (!root) return;

    // Collect all stagger targets in order
    const staggerEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hero-stagger]"),
    ).sort(
      (a, b) =>
        Number(a.dataset.heroStagger ?? "0") -
        Number(b.dataset.heroStagger ?? "0"),
    );

    if (staggerEls.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(staggerEls, { opacity: 0, y: 32, scale: 0.97, willChange: "transform,opacity" });

      // Dramatic staggered reveal — clean, fast, Vibemarketer feel
      gsap.to(staggerEls, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.slow,
        ease: EASE.expo,
        stagger: STAGGER.step + 0.02, // ~0.08s between each element
        delay: 0.15,
        clearProps: "transform,opacity,scale,willChange",
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReduced]);

  /* ── Agent loop orbit animation ── */
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const loop = loopRef.current;
    const svg = loopSvgRef.current;
    if (!loop || !svg) return;

    const ctx = gsap.context(() => {
      const runner = svg.querySelector<SVGGElement>("[data-loop-runner='group']");
      const track = svg.querySelector<SVGPathElement>("[data-loop-track='path']");
      if (!runner || !track) return;

      runner.style.willChange = "transform";
      gsap.set(runner, { force3D: true });

      const nodes = [
        { key: "plan", x: 96 },
        { key: "build", x: 216 },
        { key: "deploy", x: 324 },
        { key: "evaluate", x: 430 },
      ] as const;

      const totalLen = Math.max(1, track.getTotalLength());
      const startX = nodes[0].x;

      const pulseAt = (key: string, tl: gsap.core.Timeline, at: number) => {
        const halo = svg.querySelector<SVGCircleElement>(`[data-loop-node-halo='${key}']`);
        const label = svg.querySelector<SVGTextElement>(`[data-loop-node-label='${key}']`);
        if (!halo || !label) return;

        const haloCx = Number(halo.getAttribute("cx") || 0);
        const haloCy = Number(halo.getAttribute("cy") || 0);
        gsap.set(halo, { transformOrigin: "50% 50%", svgOrigin: `${haloCx} ${haloCy}` });

        tl.to(halo, { opacity: 0.65, scale: 1.16, duration: 0.14, ease: EASE.expo }, at)
          .to(halo, { opacity: 0, scale: 1, duration: 0.36, ease: EASE.expo }, at + 0.08)
          .to(label, { opacity: 1, duration: 0.14, ease: EASE.expo }, at)
          .to(label, { opacity: 0.78, duration: 0.36, ease: EASE.expo }, at + 0.08);
      };

      const lapDuration = 6.4;
      const introDelay = 1.05;

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" }, delay: introDelay });
      tl.to(runner, {
        motionPath: {
          path: track,
          align: track,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end: 1,
        },
        duration: lapDuration,
      });

      for (const node of nodes) {
        const distance = Math.max(0, node.x - startX);
        const at = (distance / totalLen) * lapDuration;
        pulseAt(node.key, tl, at);
      }
    }, loop);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="top" className="relative">
      {/* hero background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-orb hero-orb--left animate-drift" />
        <div className="hero-orb hero-orb--right animate-drift-slow" />
        <div className="hero-orb hero-orb--center animate-drift" />
        <div className="hero-plane hero-plane--left animate-drift opacity-70" />
        <div className="hero-plane hero-plane--right animate-drift-slow opacity-62" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <div className="hero-frost-overlay hero-frost-overlay--horizon hero-frost-overlay--soft-bottom" />
      </div>

      <div className="container-content relative z-10 pt-28 md:pt-40 pb-8 md:pb-10">
        <div
          ref={rootRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 md:gap-x-12 md:gap-y-10 items-start"
        >
          {/* ── Left column: badges → headline → subcopy ── */}
          <div className="md:col-span-7 md:col-start-1">
            <div data-hero-stagger="1" className="flex flex-wrap items-center gap-3 mb-6">
              <Badge>
                Feb 28 – Mar 1, 2026 · Toronto · <SeatCounter variant="badge" />
              </Badge>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-muted)] shadow-[var(--shadow-sm)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Applications open now
              </span>
            </div>

            <h1
              data-hero-stagger="2"
              className="font-heading font-bold tracking-tight text-[clamp(40px,5.2vw,74px)] leading-[0.98] text-[var(--color-text)]"
            >
              We simplify AI for{" "}
              <span className="text-[var(--color-accent)]">individuals &amp; business owners</span> who don&apos;t have time to figure it out.
            </h1>

            <p
              data-hero-stagger="3"
              className="mt-5 text-[15px] md:text-lg leading-relaxed text-[color-mix(in_oklch,var(--color-text-muted)_72%,var(--color-text)_28%)] max-w-[60ch]"
            >
              You can learn the basics online. The hard part is finishing. Bring one repeat task from work. In one
              weekend, you&apos;ll build a first version you can run and a simple check to keep it reliable. You&apos;ll
              build in a group of 5 with live help.
            </p>
          </div>

          {/* ── CTA row ── */}
          <div
            data-hero-stagger="4"
            className="flex flex-col gap-3 md:col-span-4 md:col-start-1 md:row-start-2 md:self-end"
          >
            <Button href="/apply" disabled={ctaRedirecting} onClick={onCtaClick}>
              {ctaRedirecting ? "Redirecting..." : "Apply / Reserve Seat"}
              {!ctaRedirecting && (
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
              )}
            </Button>
            <p className="text-sm text-[color-mix(in_oklch,var(--color-text-muted)_72%,var(--color-text)_28%)]">
              Limited to 50 seats in Toronto. Seats are confirmed by deposit.
            </p>
          </div>

          {/* ── Right column: "What you leave with" card ── */}
          <div
            data-hero-stagger="5"
            className="md:col-span-5 md:col-start-8 md:pt-14 md:row-start-1 relative"
          >
            <div className="relative z-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_70%,transparent)] backdrop-blur-md shadow-[var(--shadow-lg)] p-6 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_240px_at_20%_0%,color-mix(in_oklch,var(--color-accent)_14%,transparent),transparent_62%)]" />
              <p className="relative font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                What you leave with
              </p>
              <ul className="relative mt-4 space-y-3">
                {[
                  {
                    title: "A working AI helper",
                    desc: "Built for your use case, not a toy demo.",
                  },
                  {
                    title: "A plan to run it",
                    desc: "A clear way to run it after the weekend.",
                  },
                  {
                    title: "A simple check",
                    desc: "So it stays reliable as you improve it.",
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

              <div
                data-testid="hero-structure-card"
                className="relative mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)]"
              >
                <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                  Structure that keeps you moving
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Short lessons. Long build time. Clear checkpoints.
                </p>
              </div>
            </div>
            <div className="hidden md:block pointer-events-none absolute top-3 right-2 z-20 rotate-[5deg] rounded-[var(--radius-lg)] border border-[color-mix(in_oklch,var(--color-accent)_28%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] shadow-[var(--shadow-md)] px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Refund
              </p>
              <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                100% refund if you aren&apos;t satisfied
              </p>
            </div>
          </div>

          {/* ── Agent loop SVG ── */}
          <div
            ref={loopRef}
            data-hero-stagger="6"
            data-testid="hero-agent-loop"
            className="relative z-10 md:col-span-6 md:col-start-4 md:row-start-2 md:self-end"
          >
            <svg
              ref={loopSvgRef}
              className="w-full max-w-[640px] mx-auto h-[92px]"
              viewBox="0 0 520 92"
              fill="none"
              role="img"
              aria-label="Plan, Build, Launch, Check loop"
            >
              <path
                d="M72 26H448A12 12 0 0 1 448 50H72A12 12 0 0 1 72 26Z"
                stroke="var(--color-border)"
                strokeWidth={1.25}
              />
              <path
                data-loop-track="path"
                d="M96 26H448A12 12 0 0 1 448 50H72A12 12 0 0 1 72 26H96Z"
                fill="none"
                stroke="transparent"
                strokeWidth={1}
                opacity={0}
              />

              {(
                [
                  { key: "plan", label: "Plan", x: 96 },
                  { key: "build", label: "Build", x: 216 },
                  { key: "deploy", label: "Launch", x: 324 },
                  { key: "evaluate", label: "Check", x: 430 },
                ] as const
              ).map((node) => (
                <g key={node.key}>
                  <circle
                    data-loop-node-halo={node.key}
                    cx={node.x}
                    cy={26}
                    r={14}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    opacity={0}
                  />
                  <circle
                    cx={node.x}
                    cy={26}
                    r={8}
                    fill="var(--color-surface)"
                    stroke="var(--color-border)"
                    strokeWidth={1.25}
                  />
                  <text
                    data-loop-node-label={node.key}
                    x={node.x}
                    y={82}
                    textAnchor="middle"
                    fill="var(--color-text-muted)"
                    opacity={0.78}
                    className="font-mono text-[11px] uppercase"
                    letterSpacing="0.18em"
                  >
                    {node.label}
                  </text>
                </g>
              ))}

              <g data-loop-runner="group" transform="translate(96 26)">
                <circle r={9} fill="var(--color-accent)" opacity={0.14} />
                <circle data-testid="hero-agent-loop-runner" r={3.75} fill="var(--color-accent)" />
              </g>
            </svg>
          </div>

          {/* ── Floating "Toronto pilot" ticket ── */}
          <div
            data-hero-stagger="7"
            data-testid="hero-ticket-toronto"
            className="hidden md:block pointer-events-none md:col-span-3 md:col-start-9 md:row-start-2 md:self-end md:justify-self-end relative -bottom-4 md:mr-2 rotate-[-6deg] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] px-4 py-3"
          >
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Toronto pilot
            </p>
            <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
              50 seats
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
