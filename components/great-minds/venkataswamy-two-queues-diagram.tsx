"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CircleDot, Columns2, Eye, HandCoins, ListOrdered, Tent, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Tent,
  HandCoins,
  ListOrdered,
  Columns2,
  CircleDot,
  Eye,
};

const VIEW_H = 80;
const MERGE = { x: 36, y: 40 };
const LINE_END_X = 97;
const PAYING_Y = 16;
const FREE_Y = 64;

// Where each stop sits, and whether its label goes above or below. The first
// two stops live on the intake side (the free queue and the money flowing
// between queues); the rest sit on the single shared line.
const STOPS = [
  { x: 30, y: FREE_Y - 4, labelBelow: true },
  { x: 22, y: 40, labelBelow: false },
  { x: 47, y: 40, labelBelow: true },
  { x: 63, y: 40, labelBelow: false },
  { x: 78, y: 40, labelBelow: true },
  { x: 89, y: 40, labelBelow: false },
];

const CAMPS_INDEX = 0;
const SUBSIDY_INDEX = 1;
const AUROLAB_INDEX = 4;

// Patients waiting in each queue.
const QUEUE_XS = [5, 9, 17, 25];

// Two queues of patients — paying and free — merge into one shared line, so
// the drawing itself makes the central claim: there is no separate, lesser
// track for the poor. Each stop lights the piece of the system it explains;
// money visibly crosses from the paying queue to the free one.
function VenkataswamyTwoQueuesDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = nodes.length > 0 && visited.size >= nodes.length;
  const points = nodes.slice(0, STOPS.length).map((node, index) => ({ ...node, index, ...STOPS[index] }));
  const campsOn = visited.has(CAMPS_INDEX);
  const subsidyOn = visited.has(SUBSIDY_INDEX);
  const aurolabOn = visited.has(AUROLAB_INDEX);

  const payingLane = `M 2 ${PAYING_Y} C 22 ${PAYING_Y} 26 ${MERGE.y} ${MERGE.x} ${MERGE.y}`;
  const freeLane = `M 2 ${FREE_Y} C 22 ${FREE_Y} 26 ${MERGE.y} ${MERGE.x} ${MERGE.y}`;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/80] w-full max-w-md sm:max-w-lg">
        <svg viewBox={`0 0 100 ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-visible">
          {/* The two intake queues. */}
          {[payingLane, freeLane].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              strokeWidth={0.8}
              strokeDasharray="1.6 1.2"
              className="stroke-muted-foreground/55"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : i * 0.15 }}
            />
          ))}

          {/* The single shared line — the same for everyone. */}
          <motion.line
            x1={MERGE.x}
            y1={MERGE.y}
            x2={LINE_END_X}
            y2={MERGE.y}
            strokeWidth={1.3}
            strokeLinecap="round"
            className="stroke-brand/70"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.4 }}
          />

          {/* Patients waiting. The free queue only fills once the eye camps go looking for them. */}
          {QUEUE_XS.map((x, i) => (
            <circle key={`p-${x}`} cx={x} cy={PAYING_Y} r={1} className="fill-muted-foreground/60" opacity={i < 3 ? 1 : 0} />
          ))}
          {QUEUE_XS.map((x, i) => (
            <motion.circle
              key={`f-${x}`}
              cx={x}
              cy={FREE_Y}
              r={1}
              className="fill-brand"
              initial={{ opacity: 0, scale: 0 }}
              animate={campsOn && i < 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : i * 0.08 }}
            />
          ))}

          {/* Money crossing from the paying queue to the free one. */}
          <motion.line
            x1={22}
            y1={PAYING_Y + 3}
            x2={22}
            y2={29}
            strokeWidth={0.7}
            strokeDasharray={subsidyOn ? undefined : "1 1"}
            className={cn("transition-colors duration-500", subsidyOn ? "stroke-brand" : "stroke-muted-foreground/30")}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
          />
          <motion.line
            x1={22}
            y1={47}
            x2={22}
            y2={FREE_Y - 3}
            strokeWidth={0.7}
            strokeDasharray={subsidyOn ? undefined : "1 1"}
            className={cn("transition-colors duration-500", subsidyOn ? "stroke-brand" : "stroke-muted-foreground/30")}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
          />
          <path
            d={`M 20.6 ${FREE_Y - 5} L 22 ${FREE_Y - 3} L 23.4 ${FREE_Y - 5}`}
            fill="none"
            strokeWidth={0.7}
            className={cn("transition-opacity duration-500", subsidyOn ? "stroke-brand opacity-100" : "opacity-0")}
          />

          {/* Aurolab feeding cheap lenses into the line from below. */}
          <motion.line
            x1={78}
            y1={74}
            x2={78}
            y2={46}
            strokeWidth={0.7}
            className="stroke-brand"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={aurolabOn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          />

          {/* A patient travelling the shared line, once the system is running. */}
          {played && !reducedMotion && (
            <motion.circle
              cy={MERGE.y}
              r={1.1}
              className="fill-brand"
              initial={{ cx: MERGE.x, opacity: 0 }}
              animate={{ cx: [MERGE.x, LINE_END_X], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.2 }}
            />
          )}
        </svg>

        {/* Queue labels. */}
        <span
          className="absolute font-mono text-[8px] tracking-[0.1em] text-muted-foreground uppercase sm:text-[9px]"
          style={{ left: "1%", top: `${((PAYING_Y - 7) / VIEW_H) * 100}%` }}
        >
          Paying
        </span>
        <span
          className={cn(
            "absolute font-mono text-[8px] tracking-[0.1em] uppercase transition-colors sm:text-[9px]",
            campsOn ? "text-brand" : "text-muted-foreground",
          )}
          style={{ left: "1%", top: `${((FREE_Y + 3) / VIEW_H) * 100}%` }}
        >
          Free
        </span>
        {subsidyOn && (
          <span
            className="absolute -translate-x-1/2 font-mono text-[9px] font-semibold text-brand"
            style={{ left: "27%", top: `${((PAYING_Y + 7) / VIEW_H) * 100}%` }}
          >
            ₹
          </span>
        )}
        {aurolabOn && (
          <span
            className="absolute -translate-x-1/2 font-mono text-[8px] tracking-[0.05em] text-brand uppercase sm:text-[9px]"
            style={{ left: "78%", top: `${(75 / VIEW_H) * 100}%` }}
          >
            Lens &lt;$10
          </span>
        )}

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Eye;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.5 + point.index * 0.1;

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
              aria-describedby="venkataswamy-detail"
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
                  "absolute left-1/2 -translate-x-1/2 font-mono text-[8px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                  point.labelBelow ? "top-full mt-1.5" : "bottom-full mb-1.5",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}

        <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: "0%" }}>
          <span className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "~2,000 vs ~300 Operations per Surgeon a Year" : "Two Queues · One Line"}
          </span>
        </div>
      </div>

      <div
        id="venkataswamy-detail"
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
              Two queues, one line, one standard of surgery — and the paying side funds the free one.
            </span>
          ) : (
            "Tap or hover each stage to see how one hospital line serves paying and free patients alike."
          )}
        </p>
      </div>
    </div>
  );
}

export { VenkataswamyTwoQueuesDiagram };
