"use client";

import * as React from "react";

import { useReducedMotion } from "@/components/ba-playbooks/use-reduced-motion";
import type { PlaybookHack } from "@/types/content";

// Shared by PlaybookProgress (desktop sidebar) and PlaybookProgressBar (mobile strip):
// tracks which hack is currently in view and exposes a smooth, reduced-motion-aware jump.
function useActiveHack(hacks: Pick<PlaybookHack, "number">[]) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = React.useState(hacks[0]?.number ?? 1);

  React.useEffect(() => {
    const elements = hacks
      .map((hack) => document.getElementById(`hack-${hack.number}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) {
          setActive(Number(visible.target.id.replace("hack-", "")));
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hacks]);

  function jumpTo(number: number) {
    const el = document.getElementById(`hack-${number}`);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    if (el instanceof HTMLDetailsElement) el.open = true;
  }

  return { active, jumpTo };
}

export { useActiveHack };
