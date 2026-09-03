"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, AlertTriangle, PieChart, Wind, Wrench, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Wrench,
  PieChart,
  Wind,
  Award,
};

const CENTER = { x: 50, y: 50 };
// One lopsided pair of wedges, not a full coxcomb of twelve — a deliberate
// simplification that still carries the diagram's real point: the "before"
// wedge and the "after" wedge come from the same center, at the same
// scale, and one dwarfs the other. No other Great Minds diagram is a pie
// wedge; this is the one figure whose actual output was itself a chart.
const BEFORE_RADIUS = 34;
const AFTER_RADIUS = 9;
// Marker angles (degrees) — two sit on the wedges they describe, three sit
// around the remaining space.
const MARKER_ANGLES = [-8, 172, -92, 138, -46];
const MARKER_RADIUS = 45;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function wedgePath(startDeg: number, endDeg: number, radius: number) {
  const start = { x: CENTER.x + radius * Math.cos(toRad(startDeg)), y: CENTER.y + radius * Math.sin(toRad(startDeg)) };
  const end = { x: CENTER.x + radius * Math.cos(toRad(endDeg)), y: CENTER.y + radius * Math.sin(toRad(endDeg)) };
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${CENTER.x},${CENTER.y} L ${start.x},${start.y} A ${radius},${radius} 0 ${largeArc} 1 ${end.x},${end.y} Z`;
}

function NightingaleRoseDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => {
    const angle = MARKER_ANGLES[index] ?? MARKER_ANGLES[MARKER_ANGLES.length - 1];
    return {
      ...node,
      index,
      x: CENTER.x + MARKER_RADIUS * Math.cos(toRad(angle)),
      y: CENTER.y + MARKER_RADIUS * Math.sin(toRad(angle)),
    };
  });

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d={wedgePath(-90, 90, BEFORE_RADIUS)}
            className="fill-brand/25 stroke-brand/50"
            strokeWidth={0.5}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
          />
          <motion.path
            d={wedgePath(90, 270, AFTER_RADIUS)}
            className="fill-brand/50 stroke-brand/70"
            strokeWidth={0.5}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
          />

          <motion.g
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.9 }}
          >
            <text x={CENTER.x + 20} y={CENTER.y - 24} className="fill-muted-foreground" fontSize="4" fontFamily="monospace" textAnchor="middle">
              42.7%
            </text>
            <text x={CENTER.x - 20} y={CENTER.y + 22} className="fill-muted-foreground" fontSize="4" fontFamily="monospace" textAnchor="middle">
              2.2%
            </text>
          </motion.g>
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? PieChart;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.9 + point.index * 0.12;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => setHoverIndex(point.index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(point.index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => handleClick(point.index)}
              aria-pressed={isActive}
              aria-describedby="nightingale-rose-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[7px] leading-tight font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[8px]",
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
        id="nightingale-rose-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a point — the two wedges are the same hospital, before and after."
          )}
        </p>
      </div>
    </div>
  );
}

export { NightingaleRoseDiagram };
