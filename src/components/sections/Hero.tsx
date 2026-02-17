"use client";

import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { SeatCounter } from "@/components/SeatCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackEvent } from "@/lib/analytics";
import { DURATION, EASE } from "@/lib/motion-tokens";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export function Hero() {
  const prefersReduced = useReducedMotion();
  const [ctaRedirecting, setCtaRedirecting] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadRef = useRef<HTMLParagraphElement | null>(null);
  const loopRef = useRef<HTMLDivElement | null>(null);
  const loopSvgRef = useRef<SVGSVGElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<HTMLDivElement | null>(null);

  const onCtaClick = () => {
    if (ctaRedirecting) return;
    setCtaRedirecting(true);
    trackEvent("cta_click", { source: "hero" });
  };

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
    }, root);

    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (prefersReduced) return;
    const loop = loopRef.current;
    const svg = loopSvgRef.current;
    if (!loop || !svg) return;

    const ctx = gsap.context(() => {
      const runner = svg.querySelector<SVGGElement>("[data-loop-runner='group']");
      const track = svg.querySelector<SVGPathElement>("[data-loop-track='path']");
      if (!runner || !track) return;

      // Hint the browser that this element will be transformed every frame.
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

      // Smooth loop: a single constant-velocity lap around the track + scheduled pulses.
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

      // Pulse each node as the runner reaches it on the top rail.
      for (const node of nodes) {
        const distance = Math.max(0, node.x - startX);
        const at = (distance / totalLen) * lapDuration;
        pulseAt(node.key, tl, at);
      }
    }, loop);

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

      <div className="container-content relative z-10 pt-28 md:pt-40 pb-8 md:pb-10">
        <div
          ref={rootRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 md:gap-x-12 md:gap-y-10 items-start"
        >
          <div className="md:col-span-7 md:col-start-1">
            <div data-hero="badge" className="flex flex-wrap items-center gap-3 mb-6">
              <Badge>
                Feb 28 – Mar 1, 2026 · Toronto · <SeatCounter variant="badge" />
              </Badge>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-muted)] shadow-[var(--shadow-sm)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Applications open now
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="font-heading font-bold tracking-tight text-[clamp(40px,5.2vw,74px)] leading-[0.98] text-[var(--color-text)]"
            >
              Automate real work{" "}
              <span className="text-[var(--color-accent)]">in a weekend</span>.
              <br className="hidden sm:block" /> In person, with support.
            </h1>

            <p
              ref={subheadRef}
              className="mt-5 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[60ch]"
            >
              You can learn the pieces online. The hard part is shipping under
              constraints. Bring one recurring workflow and spend one focused
              weekend building a production-ready first version, a deployment
              path, and an evaluation loop in pods of 5.
            </p>
          </div>

          <div
            ref={ctasRef}
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
            <p className="text-sm text-[var(--color-text-muted)]">
              Limited to 50 seats in Toronto. Seats are confirmed by deposit.
            </p>
          </div>

          <div
            ref={artRef}
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

              <div
                data-testid="hero-structure-card"
                className="relative mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)]"
              >
                <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                  Structure that forces momentum
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Short instruction blocks. Long build blocks. Clear checkpoints.
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

          <div
            ref={loopRef}
            data-testid="hero-agent-loop"
            className="relative z-10 md:col-span-6 md:col-start-4 md:row-start-2 md:self-end"
          >
            <svg
              ref={loopSvgRef}
              className="w-full max-w-[640px] mx-auto h-[92px]"
              viewBox="0 0 520 92"
              fill="none"
              role="img"
              aria-label="Plan, Build, Deploy, Evaluate loop"
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
                  { key: "deploy", label: "Deploy", x: 324 },
                  { key: "evaluate", label: "Evaluate", x: 430 },
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
                <circle
                  r={9}
                  fill="var(--color-accent)"
                  opacity={0.14}
                />
                <circle
                  data-testid="hero-agent-loop-runner"
                  r={3.75}
                  fill="var(--color-accent)"
                />
              </g>
            </svg>
          </div>

          <div
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
