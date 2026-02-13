"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type Slide = {
  title: string;
  imageSrc: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    title: "One weekend",
    imageSrc: "/program/one-weekend.jpg",
    imageAlt: "Participants and instructor building together in a workshop space",
  },
  {
    title: "Pods of 5",
    imageSrc: "/program/pods-of-5.jpg",
    imageAlt: "Small pod collaboration with laptops open during build time",
  },
  {
    title: "Future-ready",
    imageSrc: "/program/future-ready.jpg",
    imageAlt: "Focused participant using a laptop while iterating on a workflow",
  },
];

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function smoothStep(edge0: number, edge1: number, value: number): number {
  if (edge0 === edge1) return value >= edge1 ? 1 : 0;
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function Outcomes() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [imgFailures, setImgFailures] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (prefersReduced) return;

    const update = () => {
      frameRef.current = null;
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      if (scrollRange <= 0) {
        setProgress(0);
        return;
      }

      const traveled = Math.min(Math.max(-rect.top, 0), scrollRange);
      setProgress(traveled / scrollRange);
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [prefersReduced]);

  const stage = useMemo(() => {
    const segmentCount = slides.length - 1;
    const rawPosition = progress * Math.max(segmentCount, 1);
    const segment =
      segmentCount > 0
        ? Math.min(segmentCount - 1, Math.floor(rawPosition))
        : 0;
    const local = segmentCount > 0 ? clamp01(rawPosition - segment) : 0;
    const activeFloat = segment + local;
    const finalRelease = smoothStep(0.965, 0.998, progress);
    const transitionT = smoothStep(0.28, 0.72, local);
    const incomingIn = smoothStep(0.3, 0.55, local);
    const outgoingOut = smoothStep(0.48, 0.78, local);
    const firstEnter = smoothStep(0.04, 0.22, local);

    return {
      segment,
      local,
      activeFloat,
      finalRelease,
      transitionT,
      incomingIn,
      outgoingOut,
      firstEnter,
    };
  }, [progress]);

  if (prefersReduced) {
    return (
      <section id="outcomes" className="relative bg-[var(--color-bg)]">
        {slides.map((slide, index) => {
          const failed = Boolean(imgFailures[index]);
          return (
            <article
              key={slide.title}
              className="relative h-[100svh] overflow-hidden border-b border-[color-mix(in_oklch,var(--color-accent)_20%,var(--color-border))]"
            >
              {!failed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={() =>
                    setImgFailures((prev) => ({ ...prev, [index]: true }))
                  }
                />
              ) : null}

              <div
                aria-hidden="true"
                className={`absolute inset-0 ${
                  failed
                    ? "bg-[linear-gradient(145deg,color-mix(in_oklch,var(--color-accent)_28%,var(--color-surface))_0%,color-mix(in_oklch,var(--color-accent-2)_24%,var(--color-surface))_100%)]"
                    : "bg-[linear-gradient(180deg,color-mix(in_oklch,black_26%,transparent)_0%,color-mix(in_oklch,black_54%,transparent)_100%)]"
                }`}
              />
              <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center md:px-12">
                <h3 className="font-heading font-bold text-white tracking-tight leading-[0.9] text-[clamp(56px,10.5vw,170px)]">
                  {slide.title}
                </h3>
              </div>
            </article>
          );
        })}
      </section>
    );
  }

  return (
    <section id="outcomes" className="relative bg-black">
      <div
        ref={trackRef}
        className="relative h-[360svh] md:h-[380svh]"
        data-testid="outcomes-track"
        aria-label="Program structure sequence"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[25] bg-[linear-gradient(180deg,color-mix(in_oklch,black_18%,transparent)_0%,color-mix(in_oklch,black_54%,transparent)_100%)]"
          />

          {slides.map((slide, index) => {
            const failed = Boolean(imgFailures[index]);
            const currentIndex = stage.segment;
            const nextIndex = Math.min(slides.length - 1, currentIndex + 1);
            const transitionEnabled = currentIndex !== nextIndex;
            const transitionT = stage.transitionT;

            let panelShift = 100;
            if (index < currentIndex) {
              panelShift = -100;
            } else if (index === currentIndex) {
              panelShift = transitionEnabled ? -100 * transitionT : 0;
            } else if (index === nextIndex) {
              panelShift = transitionEnabled ? 100 - 100 * transitionT : 0;
            }

            const delta = index - stage.activeFloat;
            const focus = clamp01(1 - Math.abs(delta));
            const imageShift = delta * 5 + (index - 1) * 2;
            const imageScale = 1.08 - focus * 0.04;

            const panelVisible = panelShift > -100 && panelShift < 100;
            const panelZ = index === nextIndex ? 40 : 20 + index;

            return (
              <article
                key={slide.title}
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: panelVisible ? 1 : 0,
                  zIndex: panelZ,
                  transform: `translate3d(0, ${panelShift}%, 0)`,
                  willChange: "transform, opacity",
                }}
                aria-hidden={!panelVisible}
              >
                {!failed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      transform: `translate3d(0, ${imageShift}%, 0) scale(${imageScale})`,
                      transformOrigin: "50% 50%",
                      willChange: "transform, opacity",
                    }}
                    onError={() =>
                      setImgFailures((prev) => ({ ...prev, [index]: true }))
                    }
                  />
                ) : null}

                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage: failed
                      ? "linear-gradient(145deg, color-mix(in oklch, var(--color-accent) 30%, var(--color-surface)) 0%, color-mix(in oklch, var(--color-accent-2) 24%, var(--color-surface)) 100%)"
                      : "none",
                  }}
                />

              </article>
            );
          })}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-40"
          >
            {(() => {
              const travel = 22;
              const currentIndex = stage.segment;
              const nextIndex = Math.min(slides.length - 1, currentIndex + 1);
              const transitionEnabled = currentIndex !== nextIndex;
              const currentIsFirst = currentIndex === 0;
              const currentIsLast = currentIndex === slides.length - 1;
              const nextIsLast = nextIndex === slides.length - 1;

              let currentOpacity = transitionEnabled
                ? 1 - stage.outgoingOut
                : 1;
              let currentY = transitionEnabled ? -stage.outgoingOut * travel : 0;

              if (currentIsFirst) {
                currentOpacity *= stage.firstEnter;
                currentY += (1 - stage.firstEnter) * travel;
              }

              if (currentIsLast) {
                currentOpacity *= 1 - stage.finalRelease;
                currentY += -stage.finalRelease * (travel * 0.35);
              }

              let nextOpacity = transitionEnabled ? stage.incomingIn : 0;
              let nextY = transitionEnabled ? (1 - stage.incomingIn) * travel : 0;

              if (nextIsLast) {
                nextOpacity *= 1 - stage.finalRelease;
                nextY += -stage.finalRelease * (travel * 0.35);
              }

              return (
                <>
                  <h3
                    data-testid="outcomes-title-current"
                    className="absolute left-1/2 top-1/2 w-[min(90vw,1200px)] text-center font-heading font-bold text-white tracking-tight leading-[0.9] text-[clamp(56px,10.5vw,170px)]"
                    style={{
                      opacity: currentOpacity,
                      transform: `translate3d(-50%, calc(-50% + ${currentY}svh), 0)`,
                      willChange: "transform, opacity",
                    }}
                  >
                    {slides[currentIndex]?.title}
                  </h3>
                  {transitionEnabled ? (
                    <h3
                      data-testid="outcomes-title-next"
                      className="absolute left-1/2 top-1/2 w-[min(90vw,1200px)] text-center font-heading font-bold text-white tracking-tight leading-[0.9] text-[clamp(56px,10.5vw,170px)]"
                      style={{
                        opacity: nextOpacity,
                        transform: `translate3d(-50%, calc(-50% + ${nextY}svh), 0)`,
                        willChange: "transform, opacity",
                      }}
                    >
                      {slides[nextIndex]?.title}
                    </h3>
                  ) : null}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
