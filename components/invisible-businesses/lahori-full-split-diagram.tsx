"use client";

import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import {
  allRupeeCuts,
  formatRupees,
  rupeeStops,
  type RupeeCut,
} from "@/components/invisible-businesses/lahori-rupee-split";
import { cn } from "@/lib/utils";

// Cuts taken before the money reaches Lahori (stops 2–4) vs. inside it (5–7).
const beforeLahori = rupeeStops.slice(1, 4).flatMap((stop) => stop.cuts);
const insideLahori = rupeeStops.slice(4).flatMap((stop) => stop.cuts);
const largestCut = Math.max(...allRupeeCuts.map((cut) => cut.amount));

function CutRow({
  cut,
  index,
  played,
  reducedMotion,
}: {
  cut: RupeeCut;
  index: number;
  played: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3 sm:grid-cols-[10rem_1fr_4rem]">
      <span
        className={cn(
          "text-xs leading-tight sm:text-sm",
          cut.profit ? "font-bold text-brand" : "text-muted-foreground",
        )}
      >
        {cut.label}
      </span>
      <div className="h-5 overflow-hidden rounded-md bg-muted/60">
        <motion.div
          className={cn(
            "h-full rounded-md",
            cut.profit ? "bg-brand shadow-sm shadow-brand/40" : "bg-brand/35",
          )}
          initial={{ width: 0 }}
          animate={played ? { width: `${(cut.amount / largestCut) * 100}%` } : {}}
          transition={{
            duration: 0.6,
            delay: reducedMotion ? 0 : 0.08 * index,
            ease: "easeOut",
          }}
        />
      </div>
      <span
        className={cn(
          "text-right font-mono text-xs tabular-nums sm:text-sm",
          cut.profit ? "font-bold text-brand" : "text-foreground",
        )}
      >
        {formatRupees(cut.amount)}
      </span>
    </div>
  );
}

function Group({
  title,
  total,
  cuts,
  offset,
  played,
  reducedMotion,
}: {
  title: string;
  total: string;
  cuts: RupeeCut[];
  offset: number;
  played: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
        <span className="text-sm font-semibold">{title}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">{total}</span>
      </div>
      {cuts.map((cut, index) => (
        <CutRow
          key={cut.label}
          cut={cut}
          index={offset + index}
          played={played}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}

function sum(cuts: RupeeCut[]) {
  return cuts.reduce((total, cut) => total + cut.amount, 0);
}

function LahoriFullSplitDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          One ₹10 Bottle, Fully Split
        </span>
        <span className="text-xs text-muted-foreground">
          Estimates. Bars are scaled to the biggest single cut.
        </span>
      </div>

      <Group
        title="Gone before Lahori sees a paisa"
        total={formatRupees(sum(beforeLahori))}
        cuts={beforeLahori}
        offset={0}
        played={played}
        reducedMotion={reducedMotion}
      />
      <Group
        title="What reaches Lahori, and where it goes"
        total={formatRupees(sum(insideLahori))}
        cuts={insideLahori}
        offset={beforeLahori.length}
        played={played}
        reducedMotion={reducedMotion}
      />

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The shopkeeper keeps about 5× what Lahori does
        </span>
      </div>
    </div>
  );
}

export { LahoriFullSplitDiagram };
