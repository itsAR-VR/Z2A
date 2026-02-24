"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE, STAGGER } from "@/lib/motion-tokens";

const RAIL_STOPS = ["0%", "24%", "49%", "74%", "100%"] as const;

type StageTimelineProps = {
  rootId: string;
};

export function StageTimeline({ rootId }: StageTimelineProps) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const stageItems = Array.from(root.querySelectorAll<HTMLElement>("[data-stage]")).sort((a, b) => {
      const left = Number(a.dataset.stage ?? "0");
      const right = Number(b.dataset.stage ?? "0");
      return left - right;
    });

    const leadItems = stageItems.filter((item) => Number(item.dataset.stage ?? "0") <= 2);
    const supportingItems = stageItems.filter((item) => {
      const stage = Number(item.dataset.stage ?? "0");
      return stage > 2 && stage <= 4.5;
    });
    const cardItems = stageItems.filter((item) => Number(item.dataset.stage ?? "0") > 4.5);

    const railRunner = root.querySelector<HTMLElement>(".signature-rail__runner");
    const railNodes = Array.from(root.querySelectorAll<HTMLElement>(".signature-rail__node"));

    if (reducedMotion) {
      gsap.set(stageItems, { clearProps: "all" });
      gsap.set(railNodes, { clearProps: "all" });
      if (railRunner) {
        gsap.killTweensOf(railRunner);
        gsap.set(railRunner, { left: RAIL_STOPS[0], clearProps: "transform,opacity" });
      }
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      gsap.set(stageItems, {
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        filter: "blur(0px)",
        clearProps: "transform,opacity,filter,willChange,transformPerspective,transformOrigin,force3D",
      });
      if (railRunner) {
        gsap.set(railRunner, { opacity: 1, scale: 1, clearProps: "transform,opacity" });
      }
      gsap.set(railNodes, { scale: 1, clearProps: "transform" });
    }, 2600);

    const ctx = gsap.context(() => {
      if (stageItems.length > 0) {
        gsap.set(stageItems, {
          transformPerspective: 900,
          transformOrigin: "50% 100%",
          willChange: "transform,opacity,filter",
          force3D: true,
        });

        const heroIntro = gsap.timeline({ delay: 0.08 });

        if (leadItems.length > 0) {
          heroIntro.fromTo(
            leadItems,
            { opacity: 0, y: 72, rotateX: 11, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: DURATION.cinematic,
              ease: EASE.quint,
              stagger: STAGGER.step + 0.08,
            },
          );
        }

        if (supportingItems.length > 0) {
          heroIntro.fromTo(
            supportingItems,
            { opacity: 0, y: 46, scale: 0.96, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: DURATION.slow + 0.1,
              ease: EASE.expo,
              stagger: STAGGER.step + 0.05,
            },
            "-=0.56",
          );
        }

        if (cardItems.length > 0) {
          heroIntro.fromTo(
            cardItems,
            { opacity: 0, x: 64, y: 24, rotateY: -7, scale: 0.94, filter: "blur(8px)" },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: DURATION.cinematic,
              ease: EASE.quint,
              stagger: STAGGER.step + 0.07,
            },
            "-=0.48",
          );
        }

        heroIntro.set(stageItems, {
          clearProps: "transform,opacity,filter,willChange,transformPerspective,transformOrigin,force3D",
        });
      }

      if (!railRunner) return;

      const runnerIntro = gsap.timeline({ defaults: { ease: EASE.expo }, delay: 0.65 });
      runnerIntro.fromTo(
        railRunner,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: DURATION.default, clearProps: "transform,opacity" },
      );

      const railLoop = gsap.timeline({ repeat: -1, repeatDelay: 0.2, delay: 1.2 });
      railLoop.set(railRunner, { left: RAIL_STOPS[0] });

      for (let index = 1; index < RAIL_STOPS.length; index += 1) {
        railLoop.to(railRunner, { left: RAIL_STOPS[index], duration: 0.64, ease: "none" });
        const node = railNodes[index];
        if (node) {
          railLoop
            .to(node, { scale: 1.18, duration: 0.12, ease: EASE.quart }, "<")
            .to(node, { scale: 1, duration: 0.28, ease: EASE.expo }, ">");
        }
      }
      for (let index = RAIL_STOPS.length - 2; index >= 0; index -= 1) {
        railLoop.to(railRunner, { left: RAIL_STOPS[index], duration: 0.64, ease: "none" });
      }
    }, root);

    return () => {
      window.clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, [rootId, reducedMotion]);

  return null;
}
