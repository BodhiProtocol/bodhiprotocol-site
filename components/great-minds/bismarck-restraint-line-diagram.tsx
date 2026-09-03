"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Crown, Flame, Globe, ShieldCheck, Swords, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Swords,
  ShieldCheck,
  Crown,
  Globe,
};

const TRACK_Y = 38;
const START_X = 8;
const END_X = 96;
const OFF_LIMITS_X = 78;
// Four stations climb steadily rightward, toward greater force — then the
// fifth snaps back toward the diplomacy end, well short of the permanently
// dimmed "Total Conquest" zone neither one ever reaches. No other Great
// Minds diagram reverses direction partway through; that reversal, not the
// climb itself, is the entire point of Bismarck's page.
const NODE_X = [14, 30, 46, 64, 34];

function BismarckRestraintLineDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => ({ ...node, index, x: NODE_X[index] ?? NODE_X[NODE_X.length - 1] }));

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/60] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.line
            x1={START_X}
            y1={TRACK_Y}
            x2={END_X}
            y2={TRACK_Y}
            strokeWidth={0.8}
            className="stroke-brand/25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeInOut" }}
          />

          {/* The off-limits zone — never activated, never a node, always
              dimmed, exactly the width no station ever reaches. */}
          <motion.rect
            x={OFF_LIMITS_X}
            y={TRACK_Y - 8}
            width={END_X - OFF_LIMITS_X}
            height={16}
            className="fill-muted-foreground/10 stroke-muted-foreground/30"
            strokeWidth={0.4}
            strokeDasharray="1.5 1.5"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.4 }}
          />

          {/* Path connecting the four escalating stations in order, then a
              distinct dashed segment showing the snap back for the fifth. */}
          {points.slice(0, 4).map((point, i) => {
            if (i === 0) return null;
            const prev = points[i - 1];
            return (
              <motion.line
                key={`climb-${point.label}`}
                x1={prev.x}
                y1={TRACK_Y}
                x2={point.x}
                y2={TRACK_Y}
                strokeWidth={1.2}
                className="stroke-brand/50"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.3 + i * 0.25 }}
              />
            );
          })}
          {points.length > 4 ? (
            <motion.line
              x1={points[3].x}
              y1={TRACK_Y}
              x2={points[4].x}
              y2={TRACK_Y}
              strokeWidth={1.2}
              strokeDasharray="2 1.5"
              className="stroke-brand/50"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 1.5 }}
            />
          ) : null}
        </svg>

        <div
          className="absolute flex w-24 -translate-x-1/2 flex-col items-center text-center"
          style={{ left: `${(((OFF_LIMITS_X + END_X) / 2) / 100) * 100}%`, top: `${((TRACK_Y - 18) / 60) * 100}%` }}
        >
          <span className="font-mono text-[7px] leading-tight tracking-[0.08em] text-muted-foreground/70 uppercase sm:text-[8px]">
            Total Conquest
            <br />
            Never Attempted
          </span>
        </div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Swords;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.2 + point.index * 0.15;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${(TRACK_Y / 60) * 100}%` }}
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
              aria-describedby="bismarck-restraint-detail"
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
        id="bismarck-restraint-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to see it — and notice none of them reach the dimmed zone on the right."
          )}
        </p>
      </div>
    </div>
  );
}

export { BismarckRestraintLineDiagram };
