"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Hand, Heart, HeartHandshake, Home, Scale, Sprout, UserCog, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Heart,
  Hand,
  UserCog,
  Sprout,
  HeartHandshake,
  Home,
  Scale,
};

// Eight fixed spokes, one per principle, evenly spaced around a hub — unlike
// Confucius's rings (which fill from the center outward) or JRD's orbits
// (fixed distance stands for autonomy), every spoke here sits at the same
// radius, because none of Gandhi's principles ranks above another; they turn
// together. The bespoke mechanic is the rim: it's a length of undyed thread
// that fills in as spokes are visited, echoing the charkha (spinning wheel)
// Gandhi made the literal emblem of self-reliance — the diagram doesn't just
// show a wheel, it spins one.
const CENTER = 50;
const RADIUS = 42;
const HUB_TICK_INNER = 8;
const HUB_TICK_OUTER = 15;
const HUB_TICK_COUNT = 12;

function GandhiCharkhaDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const cycleComplete = visited.size >= nodes.length;
  const circumference = 2 * Math.PI * RADIUS;
  const threadFraction = nodes.length > 0 ? visited.size / nodes.length : 0;

  const spokes = nodes.map((node, index) => {
    const angle = (-90 + (360 / nodes.length) * index) * (Math.PI / 180);
    return {
      ...node,
      index,
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    };
  });

  const active = activeIndex !== null ? spokes[activeIndex] : null;

  const hubTicks = Array.from({ length: HUB_TICK_COUNT }, (_, index) => (360 / HUB_TICK_COUNT) * index);

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  function handleClick(index: number) {
    setActiveIndex((current) => (current === index ? null : index));
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="gandhi-charkha-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS - 8}
              fill="url(#gandhi-charkha-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.4 : [0.25, 0.5, 0.25] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {/* The rim: undyed guide circle plus a thread that spins into place as
              spokes are visited, one length per principle learned. */}
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" strokeWidth="0.5" className="stroke-brand/15" />
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            strokeWidth="0.9"
            strokeLinecap="round"
            className="stroke-brand -rotate-90"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: played ? circumference * (1 - threadFraction) : circumference }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeInOut" }}
          />

          {active ? (
            <motion.line
              x1={CENTER}
              y1={CENTER}
              x2={active.x}
              y2={active.y}
              className="stroke-brand/50"
              strokeWidth="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : null}

          {/* Decorative spinning hub — continuous rotation, gated on reduced
              motion, standing in for the charkha actually turning rather than
              a static illustration of one. Speeds up while a spoke is being
              read, as if the wheel is being turned to explain it. */}
          <motion.g
            style={{ originX: 0.5, originY: 0.5 }}
            animate={played && !reducedMotion ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: active ? 4 : 16, repeat: reducedMotion ? 0 : Infinity, ease: "linear" }}
          >
            {hubTicks.map((deg) => {
              const rad = deg * (Math.PI / 180);
              return (
                <line
                  key={deg}
                  x1={CENTER + HUB_TICK_INNER * Math.cos(rad)}
                  y1={CENTER + HUB_TICK_INNER * Math.sin(rad)}
                  x2={CENTER + HUB_TICK_OUTER * Math.cos(rad)}
                  y2={CENTER + HUB_TICK_OUTER * Math.sin(rad)}
                  className="stroke-brand/30"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
              );
            })}
          </motion.g>
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
          className={cn(
            "absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg transition-shadow duration-500 sm:size-20",
            cycleComplete ? "border-brand shadow-brand/25" : "border-brand/25 shadow-brand/10",
          )}
        >
          <span className="font-serif text-lg font-medium tracking-tight text-brand sm:text-xl">Bapu</span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            {cycleComplete ? "Swaraj" : "बापू"}
          </span>
        </motion.div>

        {spokes.map((spoke) => {
          const Icon = iconMap[spoke.icon] ?? Compass;
          const isActive = activeIndex === spoke.index;
          const isVisited = visited.has(spoke.index);
          const entranceDelay = 0.2 + spoke.index * 0.08;
          return (
            <motion.button
              key={spoke.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${spoke.x}%`, top: `${spoke.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: 1, scale: isActive ? 1.12 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => markVisited(spoke.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(spoke.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => handleClick(spoke.index)}
              aria-pressed={isActive}
              aria-describedby="gandhi-charkha-detail"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-9",
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
                  "w-16 text-center font-mono text-[8px] font-semibold tracking-[0.06em] uppercase transition-colors sm:w-20 sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {spoke.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="gandhi-charkha-detail"
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
              Eight spokes, one thread — self-rule spun by hand, principle by principle.
            </span>
          ) : (
            "Tap or hover a spoke to see the principle it turns."
          )}
        </p>
      </div>
    </div>
  );
}

export { GandhiCharkhaDiagram };
