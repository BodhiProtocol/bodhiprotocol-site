"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Banknote } from "lucide-react";

import {
  allRupeeCuts,
  formatRupees,
  rupeeStops,
} from "@/components/invisible-businesses/lahori-rupee-split";
import { cn } from "@/lib/utils";

// Tracks which stop of the ₹10 note's journey the reader has reached: the last
// stop heading that has scrolled above 40% of the viewport. Reading positions
// directly (rather than an IntersectionObserver band) keeps it right after an
// instant jump from a tracker link, and when scrolling back up.
function useActiveStop() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      let index = 0;
      rupeeStops.forEach((stop, stopIndex) => {
        const node = document.getElementById(stop.id);
        if (node && node.getBoundingClientRect().top < window.innerHeight * 0.4) {
          index = stopIndex;
        }
      });
      setActiveIndex(index);
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return activeIndex;
}

function spentThrough(activeIndex: number) {
  return rupeeStops
    .slice(0, activeIndex + 1)
    .flatMap((stop) => stop.cuts)
    .filter((cut) => !cut.profit)
    .reduce((sum, cut) => sum + cut.amount, 0);
}

// The note itself: ten rupees as one bar. Cuts already taken turn grey from the
// left; whatever is still travelling stays purple. At the last stop, only
// Lahori's 25 paise is left lit.
function NoteBar({ activeIndex, className }: { activeIndex: number; className?: string }) {
  const takenCount = rupeeStops
    .slice(0, activeIndex + 1)
    .reduce((count, stop) => count + stop.cuts.length, 0);

  return (
    <div className={cn("flex h-3 w-full overflow-hidden rounded-full bg-muted", className)}>
      {allRupeeCuts.map((cut, index) => {
        const taken = index < takenCount;
        return (
          <motion.span
            key={cut.label}
            className={cn(
              "h-full border-r border-background last:border-r-0",
              cut.profit
                ? "bg-brand"
                : taken
                  ? "bg-muted-foreground/25"
                  : "bg-brand/70",
            )}
            style={{ width: `${cut.amount * 10}%` }}
            layout
          />
        );
      })}
    </div>
  );
}

function LahoriNoteTracker() {
  const activeIndex = useActiveStop();
  const left = 10 - spentThrough(activeIndex);

  return (
    <nav aria-label="The ₹10 note's journey" className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
        <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.2em] text-brand uppercase">
          <Banknote className="size-3.5" />
          Your ₹10 note
        </p>
        <p className="font-serif text-4xl font-medium tabular-nums">{formatRupees(left)}</p>
        <p className="text-xs text-muted-foreground">
          {activeIndex === rupeeStops.length - 1
            ? "All that's left for the company"
            : "Still travelling"}
        </p>
        <NoteBar activeIndex={activeIndex} />
      </div>

      <ol className="flex flex-col gap-2.5 text-sm">
        {rupeeStops.map((stop, index) => {
          const active = index === activeIndex;
          const passed = index < activeIndex;
          const amount = stop.cuts.reduce((sum, cut) => sum + cut.amount, 0);
          return (
            <li key={stop.id} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold transition-colors",
                  active
                    ? "bg-brand text-brand-foreground"
                    : passed
                      ? "bg-brand/15 text-brand"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {index + 1}
              </span>
              <a
                href={`#${stop.id}`}
                className={cn(
                  "flex-1 transition-colors",
                  active
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {stop.short}
              </a>
              {amount > 0 ? (
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    active ? "text-brand" : "text-muted-foreground",
                  )}
                >
                  {formatRupees(amount)}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Slim version pinned under the navbar on phones, where there's no sidebar.
function LahoriNoteTrackerBar() {
  const activeIndex = useActiveStop();
  const left = 10 - spentThrough(activeIndex);
  const stop = rupeeStops[activeIndex];

  return (
    <div className="sticky top-20 z-30 -mx-2 flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/90 px-4 py-3 shadow-sm backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="truncate text-muted-foreground">
          <span className="font-mono text-brand">Stop {activeIndex + 1}</span> · {stop.short}
        </span>
        <span className="shrink-0 font-mono font-semibold tabular-nums">
          {formatRupees(left)} left
        </span>
      </div>
      <NoteBar activeIndex={activeIndex} className="h-2" />
    </div>
  );
}

export { LahoriNoteTracker, LahoriNoteTrackerBar };
