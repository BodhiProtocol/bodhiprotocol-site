"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function IcebergIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        ORDER: 500,000 SHARES · VISIBLE SLICE: 5,000
      </div>

      <div className="flex flex-col items-center" style={fade(0)}>
        <div className="w-24 rounded-t-md border border-border bg-brand px-2 py-2 text-center text-[9px] font-bold text-brand-foreground">
          5,000 VISIBLE
        </div>
        <div className="h-px w-full border-t border-dashed border-border" />
        <div
          className="flex w-40 flex-col items-center gap-1 rounded-b-md border border-t-0 border-border bg-card px-2 py-3 text-center"
          style={fade(200)}
        >
          <span className="text-[9px] font-bold text-card-foreground">495,000 HIDDEN</span>
          <span className="text-[8px] text-muted-foreground">refills the tip on every fill</span>
        </div>
      </div>

      <div className="my-3 text-center text-[9px] font-bold tracking-wide text-brand" style={fade(400)}>
        FILL → REFILL → FILL → REFILL
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(550)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">BOOK SEES: 5,000</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">TRUE SIZE: 500,000</span>
      </div>
    </div>
  );
}

export { IcebergIllustration };
