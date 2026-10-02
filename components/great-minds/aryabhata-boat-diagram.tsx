"use client";

import * as React from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Clock, Eclipse, Moon, Pi, Sailboat, Waves, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Sailboat,
  Pi,
  Eclipse,
  Moon,
  Waves,
  Clock,
};

const VIEW_H = 84;
const CX = 50;
const CY = 44;
const EARTH_R = 8;
const STAR_R = 19;
const STOP_RX = 37;
const STOP_RY = 29;
const STAR_COUNT = 14;
// Degrees per second for whichever body is carrying the motion. The total
// never changes — it only moves from the sky to the Earth.
const SPIN_SPEED = 24;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

// An arc from one angle to another, drawn clockwise or anticlockwise.
function arcPath(r: number, fromDeg: number, toDeg: number, clockwise: boolean) {
  const a = polar(r, fromDeg);
  const b = polar(r, toDeg);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 ${clockwise ? 1 : 0} ${b.x} ${b.y}`;
}

// Static direction arrows show who is carrying the motion even when animation
// is off: the sky's arrow fades out as the Earth's fades in.
const SKY_ARROW = arcPath(STAR_R + 3.2, -72, -28, true);
const EARTH_ARROW = arcPath(EARTH_R + 2.6, 160, 110, false);

function stopPoint(index: number, count: number) {
  const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
  return { x: CX + STOP_RX * Math.cos(angle), y: CY + STOP_RY * Math.sin(angle) };
}

// The same daily motion, seen two ways. Unvisited, the ring of stars wheels
// around a still Earth — how the sky looks. Every stop visited moves a share of
// that motion out of the sky and into the Earth, until the stars stand still
// and only the Earth turns: Aryabhata's boat, with the shore finally still.
function AryabhataBoatDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const skyRef = React.useRef<SVGGElement>(null);
  const earthRef = React.useRef<SVGGElement>(null);
  const skyAngle = React.useRef(0);
  const earthAngle = React.useRef(0);

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const progress = nodes.length ? visited.size / nodes.length : 0;
  const cycleComplete = nodes.length > 0 && visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, ...stopPoint(index, nodes.length) }));

  // Integrate both angles every frame so a change in progress shifts speed
  // smoothly instead of restarting an animation.
  useAnimationFrame((_, delta) => {
    if (!played || reducedMotion) return;
    const seconds = Math.min(delta, 100) / 1000;
    skyAngle.current = (skyAngle.current + SPIN_SPEED * (1 - progress) * seconds) % 360;
    earthAngle.current = (earthAngle.current - SPIN_SPEED * progress * seconds) % 360;
    skyRef.current?.setAttribute("transform", `rotate(${skyAngle.current} ${CX} ${CY})`);
    earthRef.current?.setAttribute("transform", `rotate(${earthAngle.current} ${CX} ${CY})`);
  });

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const angle = (i / STAR_COUNT) * Math.PI * 2;
    return { x: CX + STAR_R * Math.cos(angle), y: CY + STAR_R * Math.sin(angle), big: i % 3 === 0 };
  });

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/84] w-full max-w-md sm:max-w-lg">
        <svg viewBox={`0 0 100 ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-visible">
          {/* The sky's track. */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={STAR_R}
            fill="none"
            strokeWidth={0.4}
            strokeDasharray="0.8 1.4"
            className="stroke-muted-foreground/40"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
          />

          {/* The stars — carrying all the motion at first, none of it at the end. */}
          <g ref={skyRef}>
            {stars.map((star, i) => (
              <motion.circle
                key={i}
                cx={star.x}
                cy={star.y}
                r={star.big ? 0.9 : 0.55}
                className={cn("transition-colors duration-700", cycleComplete ? "fill-brand" : "fill-muted-foreground/70")}
                initial={{ opacity: 0 }}
                animate={played ? { opacity: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.3 + i * 0.03 }}
              />
            ))}
          </g>

          <defs>
            <marker id="aryabhata-arrowhead" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 6 3 L 0 6 Z" className="fill-brand" />
            </marker>
          </defs>
          <motion.path
            d={SKY_ARROW}
            fill="none"
            strokeWidth={0.6}
            strokeLinecap="round"
            className="stroke-brand"
            markerEnd="url(#aryabhata-arrowhead)"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 0.85 * (1 - progress) } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          />
          <motion.path
            d={EARTH_ARROW}
            fill="none"
            strokeWidth={0.6}
            strokeLinecap="round"
            className="stroke-brand"
            markerEnd="url(#aryabhata-arrowhead)"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 0.85 * progress } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          />

          {/* The Earth, with one observer standing on it — the passenger in the boat. */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <circle cx={CX} cy={CY} r={EARTH_R} className="fill-brand/15 stroke-brand" strokeWidth={0.7} />
            <g ref={earthRef}>
              {/* A meridian line so the Earth's own turning is visible. */}
              <line x1={CX} y1={CY - EARTH_R} x2={CX} y2={CY + EARTH_R} strokeWidth={0.4} className="stroke-brand/50" />
              <circle cx={CX} cy={CY - EARTH_R} r={1.2} className="fill-brand" />
            </g>
          </motion.g>
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Sailboat;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.6 + point.index * 0.1;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              style={{ left: `${point.x}%`, top: `${(point.y / VIEW_H) * 100}%` }}
              initial={{ opacity: 0 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="aryabhata-boat-detail"
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
                  "absolute top-full left-1/2 mt-1.5 -translate-x-1/2 font-mono text-[8px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}

        <div className="absolute inset-x-0 flex flex-col items-center gap-0.5" style={{ top: "0%" }}>
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete
              ? "As It Is · The Stars Stand Still, the Earth Turns"
              : visited.size === 0
                ? "As It Looks · The Sky Turns Around Us"
                : "The Motion Is Moving From the Sky to the Earth"}
          </span>
        </div>
      </div>

      <div
        id="aryabhata-boat-detail"
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
              The sky looks exactly the same either way. Aryabhata&apos;s insight was choosing which one to believe is
              moving — and doing the arithmetic to check.
            </span>
          ) : (
            "Tap or hover each idea — every one shifts a little of the sky's motion into the Earth."
          )}
        </p>
      </div>
    </div>
  );
}

export { AryabhataBoatDiagram };
