"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion-tokens";

gsap.registerPlugin(MotionPathPlugin);

const LOOP_NODES = [
  { key: "scope", label: "Pick", x: 96 },
  { key: "enable", label: "Train", x: 216 },
  { key: "deploy", label: "Set up", x: 324 },
  { key: "improve", label: "Improve", x: 430 },
] as const;

type BusinessOrchestrationLoopProps = {
  className?: string;
};

export function BusinessOrchestrationLoop({ className }: BusinessOrchestrationLoopProps) {
  const prefersReduced = useReducedMotion();
  const loopRef = useRef<HTMLDivElement | null>(null);
  const loopSvgRef = useRef<SVGSVGElement | null>(null);

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

      const totalLen = Math.max(1, track.getTotalLength());
      const startX = LOOP_NODES[0].x;

      const pulseAt = (key: string, timeline: gsap.core.Timeline, at: number) => {
        const halo = svg.querySelector<SVGCircleElement>(`[data-loop-node-halo='${key}']`);
        const label = svg.querySelector<SVGTextElement>(`[data-loop-node-label='${key}']`);
        if (!halo || !label) return;

        const haloCx = Number(halo.getAttribute("cx") || 0);
        const haloCy = Number(halo.getAttribute("cy") || 0);
        gsap.set(halo, { transformOrigin: "50% 50%", svgOrigin: `${haloCx} ${haloCy}` });

        timeline
          .to(halo, { opacity: 0.65, scale: 1.16, duration: 0.14, ease: EASE.expo }, at)
          .to(halo, { opacity: 0, scale: 1, duration: 0.36, ease: EASE.expo }, at + 0.08)
          .to(label, { opacity: 1, duration: 0.14, ease: EASE.expo }, at)
          .to(label, { opacity: 0.78, duration: 0.36, ease: EASE.expo }, at + 0.08);
      };

      const lapDuration = 6.4;
      const timeline = gsap.timeline({ repeat: -1, defaults: { ease: "none" }, delay: 0.45 });
      timeline.to(runner, {
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

      for (const node of LOOP_NODES) {
        const distance = Math.max(0, node.x - startX);
        const at = (distance / totalLen) * lapDuration;
        pulseAt(node.key, timeline, at);
      }
    }, loop);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={loopRef} className={className}>
      <svg
        ref={loopSvgRef}
        className="w-full max-w-[640px] h-[92px]"
        viewBox="0 0 520 92"
        fill="none"
        role="img"
        aria-label="Pick, Train, Set up, Improve loop"
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

        {LOOP_NODES.map((node) => (
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
            r={3.75}
            fill="var(--color-accent)"
          />
        </g>
      </svg>
    </div>
  );
}
