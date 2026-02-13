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
    const transitionHalfWindow = 0.02;
    const pageBreaks = Array.from(
      { length: Math.max(0, slides.length - 1) },
      (_, index) => (index + 1) / slides.length,
    );

    const normalizedProgress = clamp01(progress);
    let segment = 0;
    let transitionEnabled = false;
    let transitionT = 0;

    for (let i = 0; i < pageBreaks.length; i += 1) {
      const breakPoint = pageBreaks[i];
      const start = breakPoint - transitionHalfWindow;
      const end = breakPoint + transitionHalfWindow;

      if (normalizedProgress < start) {
        segment = i;
        break;
      }

      if (normalizedProgress <= end) {
        segment = i;
        transitionEnabled = true;
        transitionT = clamp01((normalizedProgress - start) / (end - start));
        break;
      }

      segment = i + 1;
    }

    segment = Math.max(0, Math.min(slides.length - 1, segment));

    return {
      segment,
      nextIndex: Math.min(segment + 1, slides.length - 1),
      transitionEnabled,
      transitionT,
    };
  }, [progress]);

  const normalizedProgress = clamp01(progress);
  const titleTravelEm = 1.8;

  let outgoingTitleTranslateEm = 0;
  let incomingTitleTranslateEm = titleTravelEm;

  if (stage.transitionEnabled) {
    outgoingTitleTranslateEm = -stage.transitionT * titleTravelEm;
    incomingTitleTranslateEm = (1 - stage.transitionT) * titleTravelEm;
  } else if (stage.segment === 0) {
    const introWindow = 0.06;
    const introT = clamp01(normalizedProgress / introWindow);
    outgoingTitleTranslateEm = (1 - introT) * 0.8;
  }

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
        className="relative h-[400svh]"
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
            const nextIndex = stage.nextIndex;
            const transitionEnabled = stage.transitionEnabled;
            const transitionT = stage.transitionT;

            let panelShift = 100;
            if (index < currentIndex) {
              panelShift = -100;
            } else if (index === currentIndex) {
              panelShift = transitionEnabled ? -100 * transitionT : 0;
            } else if (index === nextIndex) {
              panelShift = transitionEnabled ? 100 - 100 * transitionT : 100;
            }

            const panelVisible = panelShift > -100 && panelShift < 100;
            const panelZ = index === nextIndex ? 40 : 20 + index;

            return (
              <article
                key={slide.title}
                className="pointer-events-none absolute -top-px -bottom-px inset-x-0"
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

          <div className="pointer-events-none absolute inset-0 z-50">
            <div
              className="absolute left-1/2"
              style={{
                top: "42svh",
                width: "min(90vw, 1200px)",
                transform: "translateX(-50%)",
              }}
            >
              <div
                data-testid="outcomes-title-slot"
                className="relative overflow-hidden text-[clamp(56px,10.5vw,170px)] leading-[0.9]"
                style={{ height: "2.8em" }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 h-px bg-white transition-opacity duration-150 ease-out"
                  style={{
                    opacity: stage.transitionEnabled ? 0.12 : 0,
                    transform: "translateY(-0.5px)",
                  }}
                />

                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate3d(0, ${outgoingTitleTranslateEm}em, 0)`,
                    willChange: "transform",
                  }}
                >
                  <h3 className="w-full text-center font-heading font-bold tracking-tight text-white">
                    {slides[stage.segment]?.title}
                  </h3>
                </div>

                {stage.transitionEnabled ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `translate3d(0, ${incomingTitleTranslateEm}em, 0)`,
                      willChange: "transform",
                    }}
                  >
                    <h3 className="w-full text-center font-heading font-bold tracking-tight text-white">
                      {slides[stage.nextIndex]?.title}
                    </h3>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
