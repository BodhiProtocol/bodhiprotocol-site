"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Handshake, Mountain, Swords, Users, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Handshake,
  Users,
  Swords,
  Mountain,
};

const HUB = { x: 50, y: 82 };
// Four scattered points across the top of the board — not a ring, not a
// line: separate, unrelated origins, the way 560-odd separate courts
// genuinely had nothing in common except geography. Every one of them has
// its own straight line converging on the single hub below, unlike every
// other Great Minds diagram, which connects nodes to each other rather than
// all of them to one shared destination.
const NODE_POSITIONS = [
  { x: 18, y: 20 },
  { x: 40, y: 11 },
  { x: 63, y: 13 },
  { x: 84, y: 21 },
];

function PatelIntegrationDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;
  const [allArrived, setAllArrived] = React.useState(false);
  const demoFiredRef = React.useRef(false);

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => ({
    ...node,
    index,
    ...(NODE_POSITIONS[index] ?? NODE_POSITIONS[NODE_POSITIONS.length - 1]),
  }));

  React.useEffect(() => {
    if (!played || reducedMotion || demoFiredRef.current) return;
    demoFiredRef.current = true;
    const timer = setTimeout(() => setAllArrived(true), 900 + points.length * 500);
    return () => clearTimeout(timer);
  }, [played, reducedMotion, points.length]);

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {points.map((point) => (
            <motion.line
              key={`line-${point.label}`}
              x1={point.x}
              y1={point.y}
              x2={HUB.x}
              y2={HUB.y}
              strokeWidth={0.4}
              className="stroke-brand/25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.15 + point.index * 0.12 }}
            />
          ))}

          {!reducedMotion
            ? points.map((point) => (
                <motion.circle
                  key={`pulse-${point.label}`}
                  r="1.6"
                  className="fill-brand"
                  initial={{ opacity: 0 }}
                  animate={
                    played
                      ? {
                          cx: [point.x, HUB.x],
                          cy: [point.y, HUB.y],
                          opacity: [0, 1, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.8 + point.index * 0.5,
                    ease: "easeIn",
                  }}
                />
              ))
            : null}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: allArrived ? 1.08 : 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeInOut" }}
          className="absolute z-10 flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card py-3 text-center shadow-lg shadow-brand/10 sm:w-32"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <span className="font-serif text-sm font-medium tracking-tight text-brand sm:text-base">
            Union of India
          </span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            562 States, One Nation
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Users;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.1 + point.index * 0.1;
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
              aria-describedby="patel-integration-detail"
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
        id="patel-integration-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a state to see which lever brought it into the Union."
          )}
        </p>
      </div>
    </div>
  );
}

export { PatelIntegrationDiagram };
