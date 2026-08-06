"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, Feather, Globe, PieChart, Quote, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Feather,
  PieChart,
  Globe,
  Quote,
  BookOpen,
};

const CENTER = 50;
const RADIUS = 38;
const LABEL_RADIUS = 29;
const START_ANGLE = -90;

// A circle divided into equal wedges, like shares of a theater company,
// instead of a loop, ledger, or ruler — the shape is literally what
// "sharer" meant: the Globe's ownership really was divided this way.
function angleFor(index: number, count: number) {
  return START_ANGLE + (360 / count) * index;
}

function pointAt(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

function ShakespeareWoodenODiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const count = nodes.length;

  const points = nodes.map((node, index) => ({
    ...node,
    index,
    ...pointAt(angleFor(index, count) + 360 / count / 2, LABEL_RADIUS),
  }));
  const dividers = Array.from({ length: count }, (_, i) => pointAt(angleFor(i, count), RADIUS));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="shakespeare-o-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS - 8}
              fill="url(#shakespeare-o-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {/* The wooden O itself. */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            strokeWidth={0.8}
            className={cn("transition-colors duration-500", cycleComplete ? "stroke-brand/60" : "stroke-brand/30")}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.2, ease: "easeInOut" }}
          />

          {/* Share dividers, splitting the O into equal wedges. */}
          {dividers.map((point, i) => (
            <motion.line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
              strokeWidth={0.4}
              className="stroke-brand/20"
              initial={{ opacity: 0 }}
              animate={played ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.2 + i * 0.08 }}
            />
          ))}

          {/* A small stage platform at the center of the O. */}
          <motion.rect
            x={CENTER - 6}
            y={CENTER - 3}
            width={12}
            height={6}
            rx={0.8}
            fill="none"
            strokeWidth={0.6}
            className="stroke-brand/40"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.5 }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? PieChart;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.35 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="shakespeare-o-detail"
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
        id="shakespeare-o-detail"
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
              Five shares, one wooden O — everyone in the company owned a piece.
            </span>
          ) : (
            "Tap or hover a share to see what it bought him."
          )}
        </p>
      </div>
    </div>
  );
}

export { ShakespeareWoodenODiagram };
