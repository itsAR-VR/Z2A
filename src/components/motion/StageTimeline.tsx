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

    const ctx = gsap.context(() => {
      if (stageItems.length > 0) {
        gsap.set(stageItems, { willChange: "transform,opacity" });
        gsap.fromTo(
          stageItems,
          { opacity: 0, y: 32, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: DURATION.slow,
            ease: EASE.expo,
            stagger: STAGGER.step + 0.02,
            delay: 0.15,
            clearProps: "transform,opacity,scale,willChange",
          },
        );
      }

      if (!railRunner) return;

      const runnerIntro = gsap.timeline({ defaults: { ease: EASE.expo }, delay: 0.35 });
      runnerIntro.fromTo(
        railRunner,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: DURATION.default, clearProps: "transform,opacity" },
      );

      const railLoop = gsap.timeline({ repeat: -1, repeatDelay: 0.2, delay: 1.0 });
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
      ctx.revert();
    };
  }, [rootId, reducedMotion]);

  return null;
}
