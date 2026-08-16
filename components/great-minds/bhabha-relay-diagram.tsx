"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, Factory, FlaskConical, Landmark, Package, Zap, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Package,
  Cpu,
  FlaskConical,
  Factory,
  Zap,
  Landmark,
};

// A horizontal fuel relay, not a wheel or a set of rings — three reactor
// "stages" (rounded-square nodes) alternate with the two fuel handoffs
// between them (round nodes), and a single pellet travels the full track
// left to right on entrance, mirroring what the three-stage program actually
// does: each stage's output becomes the next stage's input. Distinct from
// Newton's plain vertical chain (a sequence of ideas, no material moving
// between them) and from Ambani's reverse chain (integration backward
// through an existing supply chain, not fuel bred forward across three
// still-unfinished reactor generations).
const STAGE_INDICES = new Set([1, 3, 5]);

function BhabhaRelayDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  // Hover is ephemeral; a click pins independently of it — reading a click's
  // toggle off the same activeIndex a mouseenter had just set would race,
  // since every click is necessarily preceded by a mouseenter, and the very
  // first click on any node would silently cancel itself back out.
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;
  const [pelletDone, setPelletDone] = React.useState(false);
  const demoFiredRef = React.useRef(false);

  const active = activeIndex !== null ? nodes[activeIndex] : null;

  React.useEffect(() => {
    if (!played || reducedMotion || demoFiredRef.current) return;
    demoFiredRef.current = true;
    const timer = setTimeout(() => setPelletDone(true), 900 + nodes.length * 550);
    return () => clearTimeout(timer);
  }, [played, reducedMotion, nodes.length]);

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  return (
    // mb-10: the site's HeroSecondaryQuote (rendered as this diagram's next
    // sibling in the hero) only reserves min-h-16 but centers its text
    // absolutely, so a long quote overflows that box both up and down. Tall
    // square diagrams (rings, orbits) leave enough natural clearance to hide
    // that overflow; this track is much shorter, so it needs an explicit
    // margin to keep the quote from bleeding into the detail box below.
    <div ref={ref} className="mb-16 flex w-full flex-col items-center gap-6">
      <div className="relative w-full max-w-2xl">
        <svg viewBox="0 0 700 140" className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
          <line x1="40" y1="70" x2="660" y2="70" strokeWidth="1.5" className="stroke-brand/20" />
          {!reducedMotion ? (
            <motion.circle
              r="4"
              className="fill-brand"
              initial={{ opacity: 0 }}
              animate={
                played
                  ? {
                      cx: [40, 660],
                      cy: 70,
                      opacity: pelletDone ? 0 : [0, 1, 1, 0],
                    }
                  : {}
              }
              transition={{ duration: (nodes.length * 550) / 1000, delay: 0.9, ease: "linear" }}
            />
          ) : null}
        </svg>

        <div className="relative flex items-end justify-between gap-1 pt-2">
          {nodes.map((node, index) => {
            const Icon = iconMap[node.icon] ?? Zap;
            const isStage = STAGE_INDICES.has(index);
            const isActive = activeIndex === index;
            const entranceDelay = 0.15 + index * 0.12;
            return (
              <motion.button
                key={node.label}
                type="button"
                className="relative flex flex-1 flex-col items-center gap-2 outline-none"
                initial={{ opacity: 0, y: 12 }}
                animate={played ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onFocus={() => setHoverIndex(index)}
                onBlur={() => setHoverIndex(null)}
                onClick={() => handleClick(index)}
                aria-pressed={isActive}
                aria-describedby="bhabha-relay-detail"
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center border bg-card shadow-sm transition-colors duration-200 sm:size-14",
                    isStage ? "rounded-lg" : "rounded-full",
                    isActive
                      ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                      : "border-brand/25 text-brand/80",
                  )}
                >
                  <Icon className="size-4 sm:size-5" />
                </span>
                <span
                  className={cn(
                    "font-mono text-[7px] leading-tight font-semibold tracking-[0.05em] uppercase transition-colors sm:text-[9px]",
                    isActive ? "text-brand" : "text-muted-foreground",
                  )}
                >
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div
        id="bhabha-relay-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to see how each one's output becomes the next one's fuel."
          )}
        </p>
      </div>
    </div>
  );
}

export { BhabhaRelayDiagram };
