"use client";

import { useId, useMemo, useState } from "react";

export type HeroStepKey = "scope" | "build" | "deploy" | "evaluate";

export type HeroStep = {
  readonly key: HeroStepKey;
  readonly label: string;
  readonly description: string;
};

type Props = {
  steps: readonly HeroStep[];
  defaultStepIndex?: number;
};

function clampInt(v: number, min: number, max: number) {
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, Math.round(v)));
}

export function HeroStepper({ steps, defaultStepIndex = 0 }: Props) {
  const count = steps.length;
  const maxIndex = Math.max(0, count - 1);
  const [activeIndex, setActiveIndex] = useState(() =>
    clampInt(defaultStepIndex, 0, maxIndex),
  );
  const [isDragging, setIsDragging] = useState(false);
  const detailsId = useId();

  const active = steps[activeIndex] ?? steps[0];
  const progressPct = useMemo(() => {
    if (maxIndex <= 0) return 0;
    return (activeIndex / maxIndex) * 100;
  }, [activeIndex, maxIndex]);

  return (
    <div data-testid="hero-stepper" className="w-full">
      <div className="relative h-11">
        {steps.map((step, idx) => {
          const left = maxIndex <= 0 ? 0 : (idx / maxIndex) * 100;
          const translate =
            idx === 0 ? "translateX(0)" : idx === maxIndex ? "translateX(-100%)" : "translateX(-50%)";

          const isActive = idx === activeIndex;

          return (
            <button
              key={step.key}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-current={isActive ? "step" : undefined}
              className={`absolute top-0 rounded-[10px] px-2 h-11 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-inset ${
                isActive
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-faint)] hover:text-[color-mix(in_oklch,var(--color-accent)_65%,var(--color-text))]"
              }`}
              style={{ left: `${left}%`, transform: translate }}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-2 h-11">
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px rounded-full bg-[var(--color-border)]"
        />
        <div
          data-testid="hero-stepper-progress"
          aria-hidden="true"
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-px rounded-full bg-[color-mix(in_oklch,var(--color-accent)_75%,var(--color-border))] ${
            isDragging
              ? ""
              : "transition-[width] duration-[var(--duration-default)] ease-[var(--ease-expo)]"
          }`}
          style={{ width: `${progressPct}%` }}
        />

        {steps.map((step, idx) => {
          const left = maxIndex <= 0 ? 0 : (idx / maxIndex) * 100;
          const isCurrent = idx === activeIndex;
          const isReached = idx <= activeIndex;
          return (
            <div
              key={step.key}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2"
              style={{
                left: `${left}%`,
                transform:
                  idx === 0
                    ? "translate(0, -50%)"
                    : idx === maxIndex
                      ? "translate(-100%, -50%)"
                      : "translate(-50%, -50%)",
              }}
            >
              <div
                className={`h-3.5 w-3.5 rounded-full border bg-[var(--color-surface)] shadow-[var(--shadow-sm)] ${
                  isCurrent
                    ? "border-[color-mix(in_oklch,var(--color-accent)_55%,var(--color-border))]"
                    : isReached
                      ? "border-[color-mix(in_oklch,var(--color-accent)_35%,var(--color-border))]"
                      : "border-[var(--color-border)]"
                }`}
              />
            </div>
          );
        })}

        <input
          className="z2a-stepper-range absolute inset-0 w-full"
          type="range"
          min={0}
          max={maxIndex}
          step={1}
          value={clampInt(activeIndex, 0, maxIndex)}
          onChange={(e) => setActiveIndex(clampInt(Number(e.target.value), 0, maxIndex))}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          aria-label="Hero timeline"
          aria-describedby={detailsId}
        />
      </div>

      <div id={detailsId} className="mt-3">
        <p
          data-testid="hero-stepper-active-label"
          className="font-heading font-semibold text-sm text-[var(--color-text)]"
        >
          {active?.label}
        </p>
        <p
          data-testid="hero-stepper-active-description"
          className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]"
        >
          {active?.description}
        </p>
      </div>
    </div>
  );
}
