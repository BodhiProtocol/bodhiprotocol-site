"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Snowflake, Sparkles, Waves, Wrench, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Sparkles,
  Waves,
  GraduationCap,
  Snowflake,
};

const LINE_Y = 34;
const NODE_XS = [8, 29, 50, 71, 92];

type SegmentKind = "fermion" | "photon";
const SEGMENT_KINDS: SegmentKind[] = ["fermion", "photon", "fermion", "photon"];

// A straight arrowed line for a fermion, a sine-wave line for a photon —
// Feynman's own invented notation, not a generic connector. The point isn't
// decorative: this is literally the picture language he built because the
// QED math had gotten too unwieldy to hold in notation he could see.
function photonPath(x1: number, x2: number, y: number) {
  const humps = 3;
  const dx = (x2 - x1) / humps;
  let d = `M ${x1},${y}`;
  for (let i = 0; i < humps; i++) {
    const midX = x1 + dx * (i + 0.5);
    const endX = x1 + dx * (i + 1);
    const sign = i % 2 === 0 ? -1 : 1;
    d += ` Q ${midX},${y + sign * 2.4} ${endX},${y}`;
  }
  return d;
}

function FeynmanPropagatorDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, x: NODE_XS[index] ?? NODE_XS[NODE_XS.length - 1] }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/58] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 58" className="absolute inset-0 h-full w-full overflow-visible">
          {SEGMENT_KINDS.map((kind, i) => {
            const x1 = NODE_XS[i];
            const x2 = NODE_XS[i + 1];
            const isNear = activeIndex === i || activeIndex === i + 1;
            const isWarm = visited.has(i) && visited.has(i + 1);
            const opacityClass = isNear ? "opacity-90" : isWarm ? "opacity-55" : "opacity-25";
            const midX = (x1 + x2) / 2;

            return (
              <g key={`${kind}-${i}`} className={cn("stroke-brand transition-opacity duration-300", opacityClass)}>
                <motion.path
                  d={kind === "photon" ? photonPath(x1, x2, LINE_Y) : `M ${x1},${LINE_Y} L ${x2},${LINE_Y}`}
                  fill="none"
                  strokeWidth={0.6}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={played ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.2 + i * 0.15, ease: "easeInOut" }}
                />
                {kind === "fermion" ? (
                  <motion.polygon
                    points={`${midX - 1.6},${LINE_Y - 1.2} ${midX + 1.6},${LINE_Y} ${midX - 1.6},${LINE_Y + 1.2}`}
                    className="fill-brand stroke-none"
                    initial={{ opacity: 0 }}
                    animate={played ? { opacity: 1 } : {}}
                    transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.9 + i * 0.15 }}
                  />
                ) : null}
              </g>
            );
          })}

          {/* A pulse riding the full chain left to right, ambient and
              continuous — the sense of an interaction propagating forward
              through time, the way a real propagator line is read. */}
          {cycleComplete ? (
            <motion.circle
              r={1.1}
              className="fill-brand"
              initial={false}
              animate={
                played
                  ? reducedMotion
                    ? { cx: NODE_XS[NODE_XS.length - 1], cy: LINE_Y, opacity: 0.85 }
                    : { cx: NODE_XS, cy: LINE_Y, opacity: 0.85 }
                  : { opacity: 0 }
              }
              transition={
                played && !reducedMotion
                  ? { cx: { duration: 5, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
                  : { duration: 0.4 }
              }
            />
          ) : null}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Waves;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
              style={{ left: `${point.x}%`, top: `${(LINE_Y / 58) * 100}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="feynman-vertex-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4" />
              </span>
              <span
                className={cn(
                  "font-mono text-[8px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="feynman-vertex-detail"
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
              Five vertices, one continuous line — the notation he invented to make quantum electrodynamics possible to calculate by hand.
            </span>
          ) : (
            "Tap or hover a vertex — read left to right, the same direction time runs in a real Feynman diagram."
          )}
        </p>
      </div>
    </div>
  );
}

export { FeynmanPropagatorDiagram };
