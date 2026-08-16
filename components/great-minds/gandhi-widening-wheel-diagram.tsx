"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Crown, MapPin, RotateCw, Scale, Sprout, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Scale,
  Sprout,
  RotateCw,
  MapPin,
  Crown,
};

// A thread spinning outward from a charkha, not a wheel of independent
// disciplines (Leonardo) or an idea narrowing to a point (Graham's spiral,
// which this deliberately mirrors in reverse). The path starts small at the
// hub — the private vow, before any public act — and widens with every turn,
// each turn a real campaign run at greater radius on the same underlying
// method. Node icon size grows outward with it, so the diagram's geometry
// carries the same claim the text does: same technique, wider turn.
const CENTER = 50;
const TURNS = 1.35;
const START_RADIUS = 9;
const END_RADIUS = 45;
const PATH_STEPS = 100;
const NODE_T = [0.03, 0.22, 0.42, 0.6, 0.78, 0.96];
const NODE_SIZE = [
  "size-7 sm:size-8",
  "size-8 sm:size-9",
  "size-9 sm:size-10",
  "size-9 sm:size-10",
  "size-10 sm:size-11",
  "size-11 sm:size-12",
];
const HUB_SPOKE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function pointOnSpiral(t: number) {
  const angle = t * TURNS * Math.PI * 2 - Math.PI / 2;
  const radius = START_RADIUS + (END_RADIUS - START_RADIUS) * t;
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

function GandhiWideningWheelDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
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
            transition={{ duration: reducedMotion ? 0 : 1.7, ease: "easeInOut" }}
          />

          <motion.g
            style={{ originX: "50%", originY: "50%" }}
            initial={{ opacity: 0 }}
            animate={
              played
                ? { opacity: 1, rotate: reducedMotion ? 0 : 360 }
                : {}
            }
            transition={{
              opacity: { duration: 0.4 },
              rotate: { duration: 9, repeat: reducedMotion ? 0 : Infinity, ease: "linear" },
            }}
            className="text-brand/40"
          >
            {HUB_SPOKE_ANGLES.map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = CENTER + 6 * Math.cos(rad);
              const y1 = CENTER + 6 * Math.sin(rad);
              const x2 = CENTER + 9 * Math.cos(rad);
              const y2 = CENTER + 9 * Math.sin(rad);
              return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={0.5} />;
            })}
          </motion.g>
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.3, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-16"
        >
          <span className="font-serif text-base font-medium tracking-tight text-brand sm:text-lg">MG</span>
          <span className="font-mono text-[6px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[7px]">
            1869–1948
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Compass;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = reducedMotion ? 0 : 0.3 + point.index * 0.22;

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
              aria-describedby="gandhi-wheel-detail"
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
                <Icon className="size-3.5 sm:size-4" />
              </span>
              <span
                className={cn(
                  "font-mono text-[8px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
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
        id="gandhi-wheel-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a turn of the wheel to see the same method running at a wider radius."
          )}
        </p>
      </div>
    </div>
  );
}

export { GandhiWideningWheelDiagram };
