"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Combine, ListPlus, Replace, Sprout, Tag, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  Clock,
  Replace,
  ListPlus,
  Tag,
  Combine,
};

// One piece of the word at a given step. `tag` letters are never pronounced —
// they're Pāṇini's silent markers, shown small and dimmed. `placeholder` is an
// abstract marker that stands for a category, not a sound. `changed` marks the
// piece the current rule just altered.
type Segment =
  | { kind: "sound"; text: string; changed?: boolean }
  | { kind: "tag"; text: string }
  | { kind: "placeholder"; text: string }
  | { kind: "plus" };

const sound = (text: string, changed = false): Segment => ({ kind: "sound", text, changed });
const tag = (text: string): Segment => ({ kind: "tag", text });
const plus: Segment = { kind: "plus" };

// The real derivation of bhavati, one rule per stop. Tags are kept visible to
// the end so their effect can be seen (traditionally they drop immediately).
const STEPS: { segments: Segment[]; rule: string }[] = [
  { segments: [sound("bhū", true)], rule: "1.3.1" },
  { segments: [sound("bhū"), plus, { kind: "placeholder", text: "laṭ" }], rule: "3.2.123" },
  { segments: [sound("bhū"), plus, sound("ti", true), tag("p")], rule: "3.4.78" },
  { segments: [sound("bhū"), plus, tag("ś"), sound("a", true), tag("p"), plus, sound("ti"), tag("p")], rule: "3.1.68" },
  { segments: [sound("bho", true), plus, tag("ś"), sound("a"), tag("p"), plus, sound("ti"), tag("p")], rule: "7.3.84" },
  { segments: [sound("bhav", true), plus, tag("ś"), sound("a"), tag("p"), plus, sound("ti"), tag("p")], rule: "6.1.78" },
];

const FINAL_WORD = "bhavati";

function WordPieces({ segments }: { segments: Segment[] }) {
  return (
    <span className="inline-flex flex-wrap items-baseline justify-center gap-x-1.5 font-sans">
      {segments.map((segment, i) => {
        if (segment.kind === "plus") {
          return (
            <span key={i} className="px-1 text-lg text-muted-foreground/60 sm:text-xl">
              +
            </span>
          );
        }
        if (segment.kind === "tag") {
          return (
            <sup
              key={i}
              className="-ml-1 font-mono text-xs text-muted-foreground/80 underline decoration-dashed underline-offset-2 sm:text-sm"
              title="Silent tag letter — never pronounced"
            >
              {segment.text}
            </sup>
          );
        }
        if (segment.kind === "placeholder") {
          return (
            <span
              key={i}
              className="rounded border border-dashed border-brand/50 px-1.5 text-xl text-brand/80 italic sm:text-2xl"
              title="Abstract placeholder — means only 'present tense'"
            >
              {segment.text}
            </span>
          );
        }
        return (
          <span
            key={i}
            className={cn(
              "text-2xl font-medium transition-colors duration-300 sm:text-3xl",
              segment.changed ? "text-brand" : "text-foreground",
            )}
          >
            {segment.text}
          </span>
        );
      })}
    </span>
  );
}

// A production line, not a network: a word sits in the slot and every stop
// applies one real rule of the Aṣṭādhyāyī to it, so the diagram's state is
// literally the word at that point in the derivation. Silent tag letters stay
// visible (small, dashed) so you can watch a letter nobody pronounces switch
// on a rule elsewhere in the word.
function PaniniRuleEngineDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const stops = nodes.slice(0, STEPS.length);
  const active = activeIndex !== null ? stops[activeIndex] : null;
  const cycleComplete = stops.length > 0 && visited.size >= stops.length;
  const furthest = visited.size ? Math.max(...visited) : null;
  const shownIndex = activeIndex ?? furthest;
  const showFinal = (cycleComplete && activeIndex === null) || shownIndex === STEPS.length - 1;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  const rows = [stops.slice(0, 3), stops.slice(3, 6)];

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
        {cycleComplete ? "Six Rules · One Word" : "Feed in a Root · Apply the Rules in Order"}
      </span>

      {/* The word slot — the diagram's whole state. */}
      <motion.div
        className="flex min-h-28 w-full max-w-md flex-col items-center justify-center gap-1.5 rounded-xl border border-brand/20 bg-card/70 px-4 py-4 shadow-sm backdrop-blur-sm"
        initial={{ opacity: 0, y: 6 }}
        animate={played ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
      >
        {shownIndex === null ? (
          <span className="font-serif text-2xl text-muted-foreground/50 italic sm:text-3xl">?</span>
        ) : (
          <motion.div
            key={shownIndex}
            initial={reducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-1"
          >
            <WordPieces segments={STEPS[shownIndex].segments} />
            {showFinal && (
              <span className="font-sans text-xl text-brand sm:text-2xl">
                = <span className="font-semibold">{FINAL_WORD}</span>
              </span>
            )}
          </motion.div>
        )}
        <span className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase sm:text-[10px]">
          {shownIndex === null
            ? "Tap rule 1 to load the root"
            : showFinal
              ? "'he is' · 'she becomes'"
              : `Rule ${STEPS[shownIndex].rule}`}
        </span>
      </motion.div>

      {/* The production line: two rows of three stops, in rule order. */}
      <div className="flex w-full max-w-md flex-col gap-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-start justify-center">
            {row.map((node, i) => {
              const index = rowIndex * 3 + i;
              const Icon = iconMap[node.icon] ?? Sprout;
              const isActive = activeIndex === index;
              const isDimmed = activeIndex !== null && !isActive;
              const isVisited = visited.has(index);
              return (
                <React.Fragment key={node.label}>
                  {i > 0 && (
                    <motion.span
                      aria-hidden="true"
                      className="mt-3 text-brand/40"
                      animate={played && !reducedMotion ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                    >
                      <ChevronRight className="size-4" />
                    </motion.span>
                  )}
                  <motion.button
                    type="button"
                    className="flex w-24 flex-col items-center gap-1.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand/50 sm:w-28"
                    initial={{ opacity: 0, y: 4 }}
                    animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
                    transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.3 + index * 0.08 }}
                    onMouseEnter={() => markVisited(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => markVisited(index)}
                    onBlur={() => setActiveIndex(null)}
                    onClick={() => markVisited(index)}
                    aria-pressed={isActive}
                    aria-describedby="panini-rule-detail"
                  >
                    <span
                      className={cn(
                        "relative flex size-10 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                        isActive
                          ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                          : isVisited
                            ? "border-brand/40 text-brand"
                            : "border-brand/20 text-brand/80",
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-background font-mono text-[9px] text-muted-foreground ring-1 ring-border">
                        {index + 1}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[8px] font-semibold tracking-[0.05em] uppercase transition-colors sm:text-[9px]",
                        isActive ? "text-brand" : "text-muted-foreground",
                      )}
                    >
                      {node.label}
                    </span>
                  </motion.button>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      <div
        id="panini-rule-detail"
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
              Six rules turned a root into a word. The small dashed letters were never spoken — but they switched rules
              on.
            </span>
          ) : (
            "Tap or hover each rule in order and watch the word change. The small dashed letters are silent tags."
          )}
        </p>
      </div>
    </div>
  );
}

export { PaniniRuleEngineDiagram };
