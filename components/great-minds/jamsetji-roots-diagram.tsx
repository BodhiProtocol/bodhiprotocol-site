"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Factory, GraduationCap, Landmark, Zap, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Factory,
  GraduationCap,
  Zap,
};

// He died in 1904. Positioning every node against that single fixed point is
// the entire point of this diagram — three of his four visions land to the
// right of it.
const DEATH_YEAR = 1904;
const DOMAIN_MIN = 1900;
const DOMAIN_MAX = 1912;
const TRACK_START = 8;
const TRACK_END = 92;
const AXIS_Y = 68;
const ICON_Y = 30;

function yearToX(year: number) {
  const pct = (year - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN);
  return TRACK_START + pct * (TRACK_END - TRACK_START);
}

function JamsetjiRootsDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length && nodes.length > 0;
  const deathX = yearToX(DEATH_YEAR);

  const points = nodes.map((node, index) => {
    const year = Number(node.year) || DEATH_YEAR;
    return { ...node, index, year, x: yearToX(year), posthumous: year > DEATH_YEAR };
  });

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
          {/* Lifetime segment of the axis: solid. Posthumous segment: fading dashes. */}
          <motion.line
            x1={TRACK_START}
            y1={AXIS_Y}
            x2={deathX}
            y2={AXIS_Y}
            strokeWidth="0.8"
            className="stroke-brand/50"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeInOut" }}
          />
          <motion.line
            x1={deathX}
            y1={AXIS_Y}
            x2={TRACK_END}
            y2={AXIS_Y}
            strokeWidth="0.6"
            strokeDasharray="2 2.5"
            className="stroke-muted-foreground/30"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5, ease: "easeInOut" }}
          />

          {/* Death marker */}
          <motion.line
            x1={deathX}
            y1={60}
            x2={deathX}
            y2={88}
            strokeWidth="0.6"
            strokeDasharray="1.5 1.5"
            className="stroke-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.9 }}
          />
          <motion.circle
            cx={deathX}
            cy={AXIS_Y}
            r="1.2"
            className="fill-muted-foreground/60"
            initial={{ opacity: 0, scale: 0 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.9 }}
          />

          {points.map((point) => {
            const delay = 1.1 + point.index * 0.18;
            return (
              <motion.line
                key={point.label}
                x1={point.x}
                y1={AXIS_Y}
                x2={point.x}
                y2={ICON_Y + 9}
                strokeWidth="0.6"
                className="stroke-brand/40"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : delay, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        <motion.div
          className="absolute flex -translate-x-1/2 flex-col items-center gap-0.5 text-center"
          style={{ left: `${deathX}%`, top: "92%" }}
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1 }}
        >
          <span className="font-mono text-[8px] font-semibold tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase sm:text-[9px]">
            1904 · dies
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Landmark;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 1.15 + point.index * 0.18;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${ICON_Y}%` }}
              initial={{ opacity: 0, y: -6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="jamsetji-roots-detail"
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors sm:text-[10px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
              <span className="font-mono text-[8px] text-muted-foreground/60 sm:text-[9px]">
                {point.year}
                {point.posthumous ? ` · +${point.year - DEATH_YEAR}` : ""}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="jamsetji-roots-detail"
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
              Three of his four visions only opened after he was gone.
            </span>
          ) : (
            "Tap or hover a node to see whether he ever lived to see it finished."
          )}
        </p>
      </div>
    </div>
  );
}

export { JamsetjiRootsDiagram };
