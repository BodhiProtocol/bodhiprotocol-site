"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Building2, FileCode, Frown, Terminal, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Frown,
  Terminal,
  FileCode,
  Building2,
};

const GATE = { x: 50, y: 35 };
const NODE_POSITIONS = [
  { x: 16, y: 14 }, // The Skeptics
  { x: 50, y: 14 }, // The A-0 Compiler
  { x: 22, y: 56 }, // FLOW-MATIC
  { x: 80, y: 56 }, // COBOL
];

// A literal translation gate, not a sequence or a hub: readable text bars on
// the left, machine-code ticks on the right, and a bowtie-shaped compiler
// at the center converting one into the other. No other Great Minds
// diagram represents two different notations meeting at a single
// translating point — that translation is the entire subject of this page.
function HopperCompilerDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => ({
    ...node,
    index,
    ...(NODE_POSITIONS[index] ?? NODE_POSITIONS[NODE_POSITIONS.length - 1]),
  }));

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/70] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full overflow-visible">
          {/* English-like text, as three bars of decreasing length. */}
          {[
            { y: 28, w: 20 },
            { y: 35, w: 15 },
            { y: 42, w: 18 },
          ].map((bar, i) => (
            <motion.line
              key={`text-${i}`}
              x1={10}
              y1={bar.y}
              x2={10 + bar.w}
              y2={bar.y}
              strokeWidth={2}
              strokeLinecap="round"
              className="stroke-brand/40"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2 + i * 0.1 }}
            />
          ))}

          {/* Machine code, as a small grid of filled/unfilled ticks. */}
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 3 }, (_, col) => {
              const filled = (row + col) % 2 === 0;
              return (
                <motion.rect
                  key={`bit-${row}-${col}`}
                  x={72 + col * 6}
                  y={26 + row * 6}
                  width={4}
                  height={4}
                  className={filled ? "fill-brand/50" : "fill-none stroke-brand/30"}
                  strokeWidth={0.5}
                  initial={{ opacity: 0 }}
                  animate={played ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.5 + (row * 3 + col) * 0.03 }}
                />
              );
            }),
          )}

          {/* The compiler itself: a bowtie gate at the center. */}
          <motion.path
            d={`M ${GATE.x - 9},${GATE.y - 8} L ${GATE.x},${GATE.y} L ${GATE.x - 9},${GATE.y + 8} Z M ${GATE.x + 9},${GATE.y - 8} L ${GATE.x},${GATE.y} L ${GATE.x + 9},${GATE.y + 8} Z`}
            className="fill-brand/20 stroke-brand"
            strokeWidth={0.6}
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            style={{ transformOrigin: `${GATE.x}px ${GATE.y}px` }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.7, ease: "easeOut" }}
          />

          {!reducedMotion ? (
            <motion.circle
              r="1.4"
              className="fill-brand"
              initial={{ opacity: 0, cx: 30, cy: GATE.y }}
              animate={played ? { opacity: [0, 1, 1, 0], cx: [30, 70], cy: GATE.y } : {}}
              transition={{ duration: 1.8, delay: 1.4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          ) : null}

          <text x={10} y={16} className="fill-muted-foreground" fontSize="3.6" fontFamily="monospace">
            ENGLISH
          </text>
          <text x={72} y={16} className="fill-muted-foreground" fontSize="3.6" fontFamily="monospace">
            MACHINE CODE
          </text>
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Terminal;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.3 + point.index * 0.15;
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
              aria-describedby="hopper-compiler-detail"
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
        id="hopper-compiler-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a point to see how English-like instructions became machine code."
          )}
        </p>
      </div>
    </div>
  );
}

export { HopperCompilerDiagram };
