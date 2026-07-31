"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FlaskConical, HelpCircle, Lightbulb, Scissors, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  HelpCircle,
  Scissors,
  FlaskConical,
};

// Percentage-space spiral (viewBox 0-100, same convention as Leonardo's wheel
// and JRD's orbits) so node buttons positioned with left/top percentages stay
// responsive by construction — no runtime layout math beyond this formula.
const CENTER = 50;
const TURNS = 1.15;
const START_RADIUS = 42;
const END_RADIUS = 5;
const PATH_STEPS = 100;
// Slightly front-loaded so the outer arc (where the idea is still raw) has
// more visual room than the tight inner coil near the hub.
const NODE_T = [0.06, 0.36, 0.68, 0.95];
const NODE_SIZE = ["size-11 sm:size-12", "size-10 sm:size-11", "size-9 sm:size-10", "size-8 sm:size-9"];

function pointOnSpiral(t: number) {
  const angle = t * TURNS * Math.PI * 2 - Math.PI / 2;
  const radius = START_RADIUS - (START_RADIUS - END_RADIUS) * t;
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}

function buildSpiralPath() {
  const commands: string[] = [];
  for (let i = 0; i <= PATH_STEPS; i += 1) {
    const { x, y } = pointOnSpiral(i / PATH_STEPS);
    commands.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return commands.join(" ");
}

const SPIRAL_PATH = buildSpiralPath();

function GrahamSpiralDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const points = nodes.map((node, index) => ({ ...node, index, ...pointOnSpiral(NODE_T[index] ?? 0.5) }));
  const active = activeIndex !== null ? points[activeIndex] : null;

  function handleEnter(index: number) {
    setActiveIndex(index);
  }
  function handleLeave() {
    setActiveIndex(null);
  }
  function handleClick(index: number) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d={SPIRAL_PATH}
            fill="none"
            strokeWidth={0.6}
            strokeLinecap="round"
            className="stroke-brand/45"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.6, ease: "easeInOut" }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 1.4, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-20"
        >
          <motion.div
            className="flex flex-col items-center gap-0.5"
            animate={played && !reducedMotion ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          >
            <span className="font-serif text-lg font-medium tracking-tight text-brand sm:text-2xl">PG</span>
            <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
              b. 1964
            </span>
          </motion.div>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Lightbulb;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = reducedMotion ? 0 : 0.3 + point.index * 0.25;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" },
              }}
              onMouseEnter={() => handleEnter(point.index)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(point.index)}
              onBlur={handleLeave}
              onClick={() => handleClick(point.index)}
              aria-pressed={isActive}
              aria-describedby="graham-spiral-detail"
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  NODE_SIZE[point.index],
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors sm:text-[10px]",
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
        id="graham-spiral-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a step to see how it narrows toward the idea."
          )}
        </p>
      </div>
    </div>
  );
}

export { GrahamSpiralDiagram };
