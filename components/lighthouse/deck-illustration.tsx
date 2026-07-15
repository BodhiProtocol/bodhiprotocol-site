"use client";

import { Check, X } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function CardStack({ dashed }: { dashed?: boolean }) {
  const rotations = [-6, -2, 2];
  return (
    <div className="relative mb-2.5 h-[52px]">
      {rotations.map((deg, i) => (
        <div
          key={deg}
          className={
            "absolute top-0 left-1/2 h-8 w-11 rounded border-[1.5px]" +
            (dashed
              ? " border-dashed border-rose-600 bg-rose-600/8 dark:border-rose-500 dark:bg-rose-500/10"
              : " border-emerald-600 bg-emerald-600/10 dark:border-emerald-500 dark:bg-emerald-500/10")
          }
          style={{ transform: `translate(-50%, ${(2 - i) * 5}px) rotate(${deg}deg)` }}
        />
      ))}
    </div>
  );
}

function DeckIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fadeStyle = (delayMs: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(3px)",
    transition: reducedMotion ? "none" : `opacity 300ms ease ${delayMs}ms, transform 300ms ease ${delayMs}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-1.5 text-[10px] font-bold tracking-wide text-emerald-600 dark:text-emerald-500">
            RISK
          </div>
          <CardStack />
          <div
            className="mb-0.5 text-lg font-bold text-emerald-600 dark:text-emerald-500"
            style={{ opacity: played ? 1 : 0, transition: reducedMotion ? "none" : "opacity 400ms ease 500ms" }}
          >
            52 / 52
          </div>
          <div className="mb-2 text-[9px] text-muted-foreground">cards labeled · odds known</div>
          <div
            className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-500"
            style={fadeStyle(1100)}
          >
            <Check className="size-3 shrink-0" />
            Trust the math
          </div>
        </div>

        <div>
          <div className="mb-1.5 text-[10px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
            UNCERTAINTY
          </div>
          <CardStack dashed />
          <div
            className={
              "mb-0.5 text-lg font-bold text-rose-600 dark:text-rose-500" +
              (played && !reducedMotion ? " animate-[unc-flicker_1.6s_ease-in-out_0.5s_infinite]" : "")
            }
            style={{ opacity: played ? 1 : 0, transition: reducedMotion ? "none" : "opacity 400ms ease 500ms" }}
          >
            ?? / ??
          </div>
          <div className="mb-2 text-[9px] text-muted-foreground">deck was never labeled</div>
          <div
            className="flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-500"
            style={fadeStyle(1100)}
          >
            <X className="size-3 shrink-0" />
            No odds to trust
          </div>
        </div>
      </div>
    </div>
  );
}

export { DeckIllustration };
