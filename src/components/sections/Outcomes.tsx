"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type Slide = {
  title: string;
  kicker: string;
  imageSrc: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    title: "One weekend",
    kicker: "Format",
    imageSrc: "/program/one-weekend.jpg",
    imageAlt: "Participants and instructor building together in a workshop space",
  },
  {
    title: "Pods of 5",
    kicker: "Build system",
    imageSrc: "/program/pods-of-5.jpg",
    imageAlt: "Small pod collaboration with laptops open during build time",
  },
  {
    title: "Future-ready",
    kicker: "Outcome",
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
    const rawPosition = progress * segmentCount;
    const segment = Math.min(segmentCount - 1, Math.floor(rawPosition));
    const local = clamp01(rawPosition - segment);
    const activeFloat = segment + local;
    const finalRelease = smoothStep(0.965, 0.998, progress);

    return {
      segment,
      local,
      activeFloat,
      finalRelease,
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
              <div className="absolute inset-x-6 bottom-[11svh] z-10 md:inset-x-12 md:bottom-[12svh]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/80">
                  {slide.kicker}
                </p>
                <h3 className="mt-3 font-heading font-bold text-white tracking-tight text-[clamp(58px,18vw,180px)] leading-[0.86]">
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
            const local = stage.local;

            let panelShift = 100;
            if (index < currentIndex) {
              panelShift = -100;
            } else if (index === currentIndex) {
              panelShift = transitionEnabled ? -100 * local : 0;
            } else if (index === nextIndex) {
              panelShift = transitionEnabled ? 100 - 100 * local : 0;
            }

            const delta = index - stage.activeFloat;
            const focus = clamp01(1 - Math.abs(delta));
            const imageShift = delta * 5 + (index - 1) * 2;
            const imageScale = 1.08 - focus * 0.04;
            const isCurrentText = index === currentIndex;
            const isIncomingText = index === nextIndex;

            let textOpacity = 0;
            let textShift = 0;

            if (!transitionEnabled && isCurrentText) {
              textOpacity = 1;
            } else if (transitionEnabled && isCurrentText) {
              const fadeOut = smoothStep(0.4, 0.84, local);
              textOpacity = 1 - fadeOut;
              textShift = -fadeOut * 32;
            } else if (transitionEnabled && isIncomingText) {
              const fadeIn = smoothStep(0.16, 0.58, local);
              textOpacity = fadeIn;
              textShift = (1 - fadeIn) * 32;
            }

            if (index === slides.length - 1) {
              textOpacity *= 1 - stage.finalRelease;
            }

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

                <div
                  className="absolute inset-x-6 bottom-[max(12svh,84px)] z-30 md:inset-x-12 md:bottom-[max(13svh,96px)]"
                  style={{
                    opacity: textOpacity,
                    transform: `translate3d(0, ${textShift}px, 0)`,
                  }}
                >
                  <p className="font-mono text-[11px] md:text-[12px] tracking-[0.14em] uppercase text-white/82">
                    {slide.kicker}
                  </p>
                  <h3 className="mt-3 font-heading font-bold text-white tracking-tight text-[clamp(58px,18vw,200px)] leading-[0.86]">
                    {slide.title}
                  </h3>
                </div>
              </article>
            );
          })}

          <div className="absolute right-5 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-3 md:right-8">
            {slides.map((slide, index) => {
              const activity = clamp01(1 - Math.abs(index - stage.activeFloat));
              return (
                <div
                  key={slide.title}
                  className="h-14 w-1 rounded-full bg-white/20 overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="h-full w-full origin-bottom rounded-full bg-[color-mix(in_oklch,var(--color-accent)_82%,white)]"
                    style={{
                      transform: `scaleY(${Math.max(0.12, activity)})`,
                      opacity: 0.35 + activity * 0.65,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
