"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Braces, Calculator, Cog, Eye, Feather, GitBranch, Music, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  Feather,
  Music,
  Braces,
  Cog,
  GitBranch,
  Eye,
};

// Seven fixed warp threads, one per facet of her thinking, hanging from a
// header row rather than radiating from a hub — unlike every wheel/orbit/ring
// diagram elsewhere in this set, nothing here converges on a center. The
// bespoke mechanic is the weft: a shuttle runs a continuous over-under zigzag
// through the warps (the actual Jacquard-loom mechanic Lovelace's own quote
// describes), and each warp it has crossed keeps a small rendered diamond at
// its foot — the pattern resolving one thread at a time, the way Note G
// resolved one operation at a time.
const TOP_Y = 12;
const BOTTOM_Y = 82;
const WEFT_AMPLITUDE = 5;

function LovelaceLoomDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  // Hover is ephemeral; a click pins independently of it — reading a click's
  // toggle off the same activeIndex a mouseenter had just set would race,
  // since every click is necessarily preceded by a mouseenter, and the very
  // first click on any thread would silently cancel itself back out.
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const cycleComplete = nodes.length > 0 && visited.size >= nodes.length;
  const active = activeIndex !== null ? nodes[activeIndex] : null;

  const warps = nodes.map((node, index) => ({
    ...node,
    index,
    x: nodes.length > 1 ? 8 + (84 / (nodes.length - 1)) * index : 50,
  }));

  // The weft path: a triangle wave that crosses every warp x-position,
  // alternating above/below its resting line — over-under, thread by thread.
  const weftPoints = warps.flatMap((warp, index) => {
    const crest = index % 2 === 0 ? -WEFT_AMPLITUDE : WEFT_AMPLITUDE;
    return [`${warp.x},${47 + crest}`];
  });
  const weftPath = weftPoints.length > 0 ? `M ${weftPoints.join(" L ")}` : "";
  const shuttleCx = warps.map((warp) => warp.x);

  function markVisited(index: number) {
    setHoverIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="lovelace-loom-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {/* Warp threads: static verticals, brightening on hover/pin. */}
          {warps.map((warp) => {
            const isActive = activeIndex === warp.index;
            return (
              <line
                key={warp.label}
                x1={warp.x}
                y1={TOP_Y}
                x2={warp.x}
                y2={BOTTOM_Y}
                strokeWidth={isActive ? 1.1 : 0.5}
                className={cn("transition-colors duration-200", isActive ? "stroke-brand" : "stroke-brand/25")}
              />
            );
          })}

          {/* Weft: the decorative over-under weave, drawn in as the diagram
              enters view — echoing the punched-card pattern resolving. */}
          {weftPath ? (
            <motion.path
              d={weftPath}
              fill="none"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand/50"
              stroke="currentColor"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 1.4, ease: "easeInOut" }}
            />
          ) : null}

          {/* Decorative shuttle — continuously runs the weft's zigzag,
              standing in for the loom actually weaving rather than a static
              illustration of the pattern. Speeds up while a thread is being
              read, as if the loom were being worked to explain it. */}
          {shuttleCx.length > 1 ? (
            <motion.circle
              r="1.6"
              className="fill-brand"
              cy={47}
              animate={
                played && !reducedMotion
                  ? {
                      cx: shuttleCx,
                      cy: shuttleCx.map((_, index) => 47 + (index % 2 === 0 ? -WEFT_AMPLITUDE : WEFT_AMPLITUDE)),
                    }
                  : { cx: shuttleCx[0], cy: 47 }
              }
              transition={{ duration: active ? 5 : 2.2, repeat: Infinity, ease: "linear" }}
            />
          ) : null}

          {/* Resolved pattern: a diamond appears at the foot of each visited
              thread, building the finished weave one operation at a time. */}
          {warps.map((warp) => {
            const isVisited = visited.has(warp.index);
            const isActive = activeIndex === warp.index;
            return (
              <motion.rect
                key={`pattern-${warp.label}`}
                x={warp.x - 2.2}
                y={BOTTOM_Y - 2.2}
                width="4.4"
                height="4.4"
                transform={`rotate(45 ${warp.x} ${BOTTOM_Y})`}
                className={cn(isActive ? "fill-brand" : "fill-brand/60")}
                initial={{ scale: 0, opacity: 0 }}
                animate={isVisited ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
                style={{ transformOrigin: `${warp.x}px ${BOTTOM_Y}px` }}
              />
            );
          })}

          <rect x="4" y={BOTTOM_Y + 4} width="92" height="3" rx="1.5" fill="url(#lovelace-loom-fade)" />
        </svg>

        {warps.map((warp) => {
          const Icon = iconMap[warp.icon] ?? Braces;
          const isActive = activeIndex === warp.index;
          const isVisited = visited.has(warp.index);
          const entranceDelay = 0.15 + warp.index * 0.08;
          return (
            <motion.button
              key={warp.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${warp.x}%`, top: `${TOP_Y - 4}%` }}
              initial={{ opacity: 0, y: -6 }}
              animate={played ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(warp.index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => markVisited(warp.index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => handleClick(warp.index)}
              aria-pressed={isActive}
              aria-describedby="lovelace-loom-detail"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-9",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-3.5 sm:size-4" />
              </span>
              <span
                className={cn(
                  "w-14 text-center font-mono text-[8px] font-semibold tracking-[0.06em] uppercase transition-colors sm:w-16 sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {warp.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="lovelace-loom-detail"
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
              Seven threads, one pattern — algebra woven like flowers and leaves.
            </span>
          ) : (
            "Tap or hover a thread to see how it wove into Note G."
          )}
        </p>
      </div>
    </div>
  );
}

export { LovelaceLoomDiagram };
