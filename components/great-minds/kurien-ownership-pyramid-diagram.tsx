"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Factory, Home, Landmark, Sprout, TrendingUp, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  Home,
  Factory,
  Landmark,
  TrendingUp,
};

// A truncated pyramid, not a wheel, chain, or set of rings — five bands
// widening toward the base (the Farmer) and narrowing toward the peak (the
// Market), because the Anand Pattern's actual mechanic is a direction: every
// tier is owned and governed by the tier beneath it, the reverse of a normal
// company where a parent owns its subsidiaries top-down. A single pulse
// travels up the pyramid's spine on entrance to show which way control
// actually flows. Labels live in a fixed column to the right (as absolutely
// positioned HTML, same convention as every other Great Minds diagram —
// not inside the SVG via foreignObject) so text never has to fit inside the
// narrow upper bands.
const WIDTHS = [44, 36, 28, 20, 12]; // percent of container width, widest (Farmer) to narrowest (Market)
const VIEW_SIZE = 100;
const BAND_HEIGHT = 14.5;
const BAND_GAP = 2.5;
const STACK_HEIGHT = WIDTHS.length * BAND_HEIGHT + (WIDTHS.length - 1) * BAND_GAP;
const TOP_MARGIN = (VIEW_SIZE - STACK_HEIGHT) / 2;
const PYRAMID_CENTER_X = 28;
const ICON_COLUMN_X = 64;

function KurienOwnershipPyramidDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const demoFiredRef = React.useRef(false);
  const [pulseDone, setPulseDone] = React.useState(false);

  const active = activeIndex !== null ? nodes[activeIndex] : null;

  const bands = nodes.map((node, index) => {
    const width = WIDTHS[index] ?? WIDTHS[WIDTHS.length - 1];
    const rowFromTop = WIDTHS.length - 1 - index;
    const yTop = TOP_MARGIN + rowFromTop * (BAND_HEIGHT + BAND_GAP);
    return { ...node, index, width, yTop, yCenter: yTop + BAND_HEIGHT / 2 };
  });

  React.useEffect(() => {
    if (!played || reducedMotion || demoFiredRef.current) return;
    demoFiredRef.current = true;
    const timer = setTimeout(() => setPulseDone(true), 2400);
    return () => clearTimeout(timer);
  }, [played, reducedMotion]);

  function handleClick(index: number) {
    setActiveIndex((current) => (current === index ? null : index));
  }

  const bottomY = TOP_MARGIN + STACK_HEIGHT - BAND_HEIGHT / 2;
  const topY = TOP_MARGIN + BAND_HEIGHT / 2;

  return (
    <div ref={ref} className="mb-6 flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md">
        <svg
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {!reducedMotion ? (
            <motion.circle
              r="0.9"
              cx={PYRAMID_CENTER_X}
              className="fill-brand"
              initial={{ opacity: 0 }}
              animate={
                played
                  ? {
                      cy: [bottomY, topY],
                      opacity: pulseDone ? 0 : [0, 1, 1, 0],
                    }
                  : {}
              }
              transition={{ duration: 1.4, delay: 1, ease: "linear" }}
            />
          ) : null}

          {bands.map((band) => {
            const isActive = activeIndex === band.index;
            return (
              <React.Fragment key={band.label}>
                <motion.rect
                  x={PYRAMID_CENTER_X - band.width / 2}
                  y={band.yTop}
                  width={band.width}
                  height={BAND_HEIGHT}
                  rx={2}
                  className={cn("stroke-brand", isActive ? "fill-brand/15" : "fill-card")}
                  strokeWidth={isActive ? 0.6 : 0.4}
                  initial={{ opacity: 0, scaleX: 0.7 }}
                  animate={played ? { opacity: 1, scaleX: 1 } : {}}
                  style={{ transformOrigin: `${PYRAMID_CENTER_X}px ${band.yCenter}px` }}
                  transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.15 + band.index * 0.1 }}
                />
                <motion.line
                  x1={PYRAMID_CENTER_X + band.width / 2}
                  y1={band.yCenter}
                  x2={ICON_COLUMN_X - 4}
                  y2={band.yCenter}
                  strokeWidth={0.3}
                  className="stroke-brand/25"
                  initial={{ opacity: 0 }}
                  animate={played ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.2 + band.index * 0.1 }}
                />
              </React.Fragment>
            );
          })}
        </svg>

        {bands.map((band) => {
          const Icon = iconMap[band.icon] ?? Sprout;
          const isActive = activeIndex === band.index;
          const entranceDelay = 0.25 + band.index * 0.1;
          return (
            <motion.button
              key={band.label}
              type="button"
              className="absolute flex -translate-y-1/2 items-center gap-2 outline-none"
              style={{ left: `${ICON_COLUMN_X}%`, top: `${band.yCenter}%` }}
              initial={{ opacity: 0 }}
              animate={played ? { opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => setActiveIndex(band.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(band.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => handleClick(band.index)}
              aria-pressed={isActive}
              aria-describedby="kurien-pyramid-detail"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-8",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/25 text-brand/80",
                )}
              >
                <Icon className="size-3.5 sm:size-4" />
              </span>
              <span
                className={cn(
                  "w-16 font-mono text-[7px] leading-tight font-semibold tracking-[0.03em] uppercase transition-colors sm:w-20 sm:text-[8px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {band.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="kurien-pyramid-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a tier to see who actually owns the one above it."
          )}
        </p>
      </div>
    </div>
  );
}

export { KurienOwnershipPyramidDiagram };
