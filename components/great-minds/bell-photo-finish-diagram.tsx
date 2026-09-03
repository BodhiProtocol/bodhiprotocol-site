"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, FileText, Landmark, Phone, Trophy, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  AlertTriangle,
  Phone,
  FileText,
  Trophy,
};

const TRACK_Y = 62;
const START_X = 8;
const END_X = 92;
// The first station is a photo finish, not a simple arrival: two dots race
// in from the left on separate, barely-offset lanes and one arrives a hair
// first. Every other station sits on the single main track that continues
// afterward — except the second, rendered dashed and muted rather than
// solid, because it's a disputed claim the diagram deliberately never
// resolves into fact.
const DISPUTED_INDEX = 1;

function stationX(index: number, count: number) {
  return START_X + ((END_X - START_X) / (count - 1)) * index;
}

function BellPhotoFinishDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => ({ ...node, index, x: stationX(index, nodes.length) }));
  const finishX = points[0]?.x ?? START_X;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/60] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.line
            x1={START_X}
            y1={TRACK_Y}
            x2={END_X}
            y2={TRACK_Y}
            strokeWidth={0.8}
            className="stroke-brand/30"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          />

          {/* The photo finish: Bell's dot (solid, upper lane) and Gray's
              (muted, lower lane) race toward the first station, Bell
              arriving a fraction of a second first. Runs once on reveal. */}
          {!reducedMotion ? (
            <>
              <motion.circle
                r="1.4"
                className="fill-brand"
                initial={{ opacity: 0, cx: START_X, cy: TRACK_Y - 2.2 }}
                animate={played ? { opacity: [0, 1, 1, 0], cx: finishX, cy: TRACK_Y } : {}}
                transition={{ duration: 1.1, delay: 0.2, ease: "easeIn" }}
              />
              <motion.circle
                r="1.4"
                className="fill-muted-foreground/60"
                initial={{ opacity: 0, cx: START_X, cy: TRACK_Y + 2.2 }}
                animate={played ? { opacity: [0, 1, 1, 0], cx: finishX, cy: TRACK_Y } : {}}
                transition={{ duration: 1.3, delay: 0.2, ease: "easeIn" }}
              />
            </>
          ) : null}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? FileText;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const isDisputed = point.index === DISPUTED_INDEX;
          const entranceDelay = point.index === 0 ? 1.4 : 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${((TRACK_Y - 14) / 60) * 100}%` }}
              initial={{ opacity: 0, y: -4 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="bell-finish-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-10",
                  isDisputed && "border-dashed",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isDisputed
                      ? "border-muted-foreground/40 text-muted-foreground"
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
                  isActive ? "text-brand" : isDisputed ? "text-muted-foreground/70" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="bell-finish-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a station — the dashed one is the part historians still can't fully settle."
          )}
        </p>
      </div>
    </div>
  );
}

export { BellPhotoFinishDiagram };
