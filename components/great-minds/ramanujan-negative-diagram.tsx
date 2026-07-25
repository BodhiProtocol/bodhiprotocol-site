"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Eye, FileImage, Sparkles, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  FileImage,
  Eye,
  Sparkles,
};

// Each frame's grain density is a fixed visual fact, not an animation — the
// point of the metaphor is that comprehension doesn't depend on watching
// something develop, only on comparing three static states. Every stripe is
// mixed toward transparent (never an absolute color like black) so the
// dense-to-sparse progression stays correct in dark mode too, where --brand
// itself is a lighter, not darker, tone than in light mode.
const FRAME_GRAIN = [
  "bg-[repeating-linear-gradient(135deg,color-mix(in_oklab,var(--brand)_90%,transparent)_0px,color-mix(in_oklab,var(--brand)_90%,transparent)_3px,color-mix(in_oklab,var(--brand)_55%,transparent)_3px,color-mix(in_oklab,var(--brand)_55%,transparent)_6px)]",
  "bg-[repeating-linear-gradient(135deg,color-mix(in_oklab,var(--brand)_40%,transparent)_0px,color-mix(in_oklab,var(--brand)_40%,transparent)_6px,color-mix(in_oklab,var(--brand)_15%,transparent)_6px,color-mix(in_oklab,var(--brand)_15%,transparent)_12px)]",
  "bg-brand/10",
];

function RamanujanNegativeDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="grid w-full max-w-md grid-cols-3 gap-3 sm:max-w-lg sm:gap-4">
        {nodes.map((node, index) => {
          const Icon = iconMap[node.icon] ?? Sparkles;
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const isResolved = index === nodes.length - 1;
          const entranceDelay = 0.15 + index * 0.15;

          return (
            <motion.button
              key={node.label}
              type="button"
              className="flex flex-col items-center gap-2 rounded-lg outline-none"
              initial={{ opacity: 0, y: 8 }}
              animate={played ? { opacity: isDimmed ? 0.5 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : entranceDelay, ease: "easeOut" }}
              onMouseEnter={() => markVisited(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(index)}
              aria-pressed={isActive}
              aria-describedby="ramanujan-negative-detail"
            >
              <span
                className={cn(
                  "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border transition-all duration-300",
                  FRAME_GRAIN[index],
                  isActive ? "border-brand shadow-md shadow-brand/20" : "border-brand/20",
                )}
              >
                {isResolved ? <Icon className="size-6 text-brand sm:size-7" /> : null}
              </span>
              <span
                className={cn(
                  "text-center font-mono text-[9px] leading-tight font-semibold tracking-[0.06em] uppercase transition-colors sm:text-[10px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="ramanujan-negative-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : cycleComplete ? (
            <span className="font-semibold text-foreground">
              The image never changed. Only what was visible did.
            </span>
          ) : (
            "Hover or tap a frame to see how legibility, not the image, is what changed."
          )}
        </p>
      </div>
    </div>
  );
}

export { RamanujanNegativeDiagram };
