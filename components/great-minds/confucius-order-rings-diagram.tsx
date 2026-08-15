"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, Compass, Globe, Heart, Home, Landmark, Search, User, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Search,
  BookOpen,
  Heart,
  Compass,
  User,
  Home,
  Landmark,
  Globe,
};

// Eight concentric rings, one per stage of the Great Learning's outward
// sequence (格物 investigate things → 平天下 peace under heaven). Radius
// grows with index; angle is spread 45° per ring so all eight labels stay
// legible instead of stacking on one bearing. Unlike Chanakya's mandala
// (independent rival/ally rings, toggled one at a time) or JRD's orbits
// (independent business units at fixed distance), activating a ring here
// fills every ring from the center out to it — the point of the diagram is
// that you cannot reach an outer ring without having already passed through
// the ones inside it.
const RING_RADIUS_MIN = 16;
const RING_RADIUS_MAX = 46;
// Bit-reversed compass order (top, bottom, right, left, upper-right,
// lower-left, lower-right, upper-left) rather than a plain 45°-per-index
// sweep — consecutive indices sit at the closest radii, so they need the
// widest angular separation to keep labels from colliding near the hub.
// Evenly sweeping angle with index instead put ring 0 and ring 1's labels
// on top of each other at the small radii nearest the center.
const RING_ANGLES = [-90, 90, 0, 180, -45, 135, 45, 225];
const DEMO_DELAY_MS = 900;
const DEMO_STEP_MS = 480;

function ConfuciusOrderRingsDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());
  const demoFiredRef = React.useRef(false);

  const center = 50;
  const step = nodes.length > 1 ? (RING_RADIUS_MAX - RING_RADIUS_MIN) / (nodes.length - 1) : 0;

  const rings = nodes.map((node, index) => {
    const radius = RING_RADIUS_MIN + step * index;
    const angle = (RING_ANGLES[index] ?? 0) * (Math.PI / 180);
    return {
      ...node,
      index,
      radius,
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  const active = activeIndex !== null ? rings[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;

  // Auto-demo: once, ~0.9s after entrance, step outward through every ring
  // in sequence so the "order radiates from the self outward" story plays
  // even for a visitor who never hovers or taps anything. Skipped entirely
  // under reduced motion, same as the entrance itself.
  React.useEffect(() => {
    if (!played || reducedMotion || demoFiredRef.current) return;
    demoFiredRef.current = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    nodes.forEach((_, index) => {
      timers.push(setTimeout(() => setActiveIndex(index), DEMO_DELAY_MS + index * DEMO_STEP_MS));
    });
    timers.push(
      setTimeout(
        () => setActiveIndex((current) => (current === nodes.length - 1 ? null : current)),
        DEMO_DELAY_MS + nodes.length * DEMO_STEP_MS + 300,
      ),
    );
    return () => timers.forEach(clearTimeout);
    // nodes is static frontmatter data; only re-run when the reveal/motion state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [played, reducedMotion]);

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="confucius-rings-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={center}
              cy={center}
              r={RING_RADIUS_MAX}
              fill="url(#confucius-rings-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.4 : [0.25, 0.5, 0.25] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {active ? (
            <motion.line
              x1={center}
              y1={center}
              x2={active.x}
              y2={active.y}
              className="stroke-brand/50"
              strokeWidth={0.4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : null}

          {rings.map((ring) => {
            const isFilled = activeIndex !== null && ring.index <= activeIndex;
            const isActive = activeIndex === ring.index;
            return (
              <motion.circle
                key={ring.label}
                cx={center}
                cy={center}
                r={ring.radius}
                fill="none"
                className="stroke-brand"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: !played ? 0 : isFilled ? (isActive ? 0.8 : 0.45) : activeIndex === null ? 0.3 : 0.1,
                  strokeWidth: isActive ? 0.8 : 0.4,
                }}
                transition={{
                  opacity: { duration: 0.35, delay: reducedMotion ? 0 : 0.15 + ring.index * 0.08 },
                  strokeWidth: { duration: 0.2, ease: "easeOut" },
                }}
              />
            );
          })}
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
          <span className="font-serif text-lg font-medium tracking-tight text-brand sm:text-xl">Kong</span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            孔子
          </span>
        </motion.div>

        {rings.map((ring) => {
          const Icon = iconMap[ring.icon] ?? Compass;
          const isActive = activeIndex === ring.index;
          const isFilled = activeIndex !== null && ring.index <= activeIndex;
          const entranceDelay = 0.2 + ring.index * 0.08;
          return (
            <motion.button
              key={ring.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${ring.x}%`, top: `${ring.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: 1, scale: isActive ? 1.12 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => markVisited(ring.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(ring.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(ring.index)}
              aria-pressed={isActive}
              aria-describedby="confucius-rings-detail"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-9",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isFilled
                      ? "border-brand/40 text-brand"
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
                {ring.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="confucius-rings-detail"
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
              Eight rings, one root — order was never imposed from the outside in.
            </span>
          ) : (
            "Tap or hover a ring to see why he believed you can't skip one on the way out."
          )}
        </p>
      </div>
    </div>
  );
}

export { ConfuciusOrderRingsDiagram };
