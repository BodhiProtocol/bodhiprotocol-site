"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { DoorOpen, Route, Search, Sunrise, Thermometer, UtensilsCrossed, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  DoorOpen,
  UtensilsCrossed,
  Thermometer,
  Search,
  Sunrise,
  Route,
};

// What each line of the card reads once filled in, in stop order. The first
// two lines are the case history; the last four are the four truths.
const LINE_VALUES = [
  "Prince of the Śākyas · left home at 29",
  "Six years of extreme fasting",
  "Dukkha — life keeps falling short",
  "Taṇhā — craving, 'thirst'",
  "Curable · nirvāṇa, 'blowing out'",
];

const EIGHTFOLD_PATH = ["View", "Intention", "Speech", "Action", "Livelihood", "Effort", "Mindfulness", "Concentration"];

const TRUTH_LABELS: Record<number, string> = { 2: "Truth 1", 3: "Truth 2", 4: "Truth 3", 5: "Truth 4" };
const FAILED_INDEX = 1;
const TREATMENT_INDEX = 5;

// A doctor's prescription card, not a network diagram. Each stop is a line on
// the card, blank until visited: two lines of case history (including the
// failed cure, stamped as such), then the four truths in the order a physician
// works — symptom, cause, prognosis, treatment. The last line writes out the
// Eightfold Path as the prescription itself.
function BuddhaPrescriptionDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const lines = nodes.slice(0, 6);
  const active = activeIndex !== null ? lines[activeIndex] : null;
  const cycleComplete = lines.length > 0 && visited.size >= lines.length;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-brand/20 bg-card/80 shadow-sm backdrop-blur-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={played ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
      >
        {/* Card header. */}
        <div className="flex items-baseline justify-between border-b border-brand/15 px-4 py-2.5">
          <span className="font-serif text-2xl text-brand italic">℞</span>
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            Patient: everyone
          </span>
        </div>

        <ul className="divide-y divide-dashed divide-border">
          {lines.map((node, index) => {
            const Icon = iconMap[node.icon] ?? Thermometer;
            const isActive = activeIndex === index;
            const isVisited = visited.has(index);
            const truth = TRUTH_LABELS[index];
            return (
              <li key={node.label}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-2.5 text-left outline-none transition-colors focus-visible:bg-brand/10",
                    isActive ? "bg-brand/[0.07]" : "hover:bg-brand/[0.04]",
                  )}
                  onMouseEnter={() => markVisited(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => markVisited(index)}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() => markVisited(index)}
                  aria-pressed={isActive}
                  aria-describedby="buddha-rx-detail"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                      isActive
                        ? "border-brand bg-brand text-brand-foreground"
                        : isVisited
                          ? "border-brand/40 text-brand"
                          : "border-brand/20 text-brand/70",
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[0.1em] text-muted-foreground uppercase sm:text-[10px]">
                      {node.label}
                      {truth && <span className="font-normal text-brand/70">· {truth}</span>}
                    </span>
                    {!isVisited ? (
                      <span className="mt-2 block h-px w-full border-b border-dotted border-muted-foreground/40" />
                    ) : index === TREATMENT_INDEX ? (
                      <motion.span
                        className="flex flex-wrap gap-1"
                        initial={reducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {EIGHTFOLD_PATH.map((step) => (
                          <span
                            key={step}
                            className="rounded border border-brand/25 bg-brand/[0.06] px-1.5 py-0.5 text-[11px] text-foreground sm:text-xs"
                          >
                            Right {step.toLowerCase()}
                          </span>
                        ))}
                      </motion.span>
                    ) : (
                      <motion.span
                        className="flex flex-wrap items-center gap-2 font-sans text-sm font-medium text-foreground sm:text-base"
                        initial={reducedMotion ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        {LINE_VALUES[index]}
                        {index === FAILED_INDEX && (
                          <span className="-rotate-3 rounded border border-destructive/60 px-1.5 font-mono text-[9px] font-semibold tracking-[0.1em] text-destructive/80 uppercase">
                            Did not work
                          </span>
                        )}
                      </motion.span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Signature line — appears once the whole card is filled in. */}
        <div className="flex items-center justify-end border-t border-brand/15 px-4 py-2">
          <span
            className={cn(
              "font-sans text-xs italic transition-opacity duration-500 sm:text-sm",
              cycleComplete ? "text-brand opacity-100" : "opacity-0",
            )}
          >
            — prescribed at Sārnāth, to be tested on yourself
          </span>
        </div>
      </motion.div>

      <div
        id="buddha-rx-detail"
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
              Symptom, cause, prognosis, treatment — in that order. He offered it as a regimen to test, not a creed to
              accept.
            </span>
          ) : (
            "Tap or hover each line to fill in the card — the case history first, then the four truths."
          )}
        </p>
      </div>
    </div>
  );
}

export { BuddhaPrescriptionDiagram };
