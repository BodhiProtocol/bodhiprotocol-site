"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function ArrivalPriceIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        DECISION MADE · CLOCK STARTS
      </div>

      <div className="flex items-center justify-between gap-2" style={fade(0)}>
        <div className="flex flex-col items-center gap-1">
          <span className="rounded-full bg-brand px-2.5 py-1 text-[9px] font-bold text-brand-foreground">
            10:02
          </span>
          <span className="text-[9px] font-bold text-card-foreground">₹1,000</span>
          <span className="text-[8px] text-muted-foreground">arrival</span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1" style={fade(200)}>
          <span className="w-full border-t border-dashed border-border" />
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">PRICE DRIFTS WHILE WORKING</span>
        </div>

        <div className="flex flex-col items-center gap-1" style={fade(400)}>
          <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[9px] font-bold text-card-foreground">
            13:40
          </span>
          <span className="text-[9px] font-bold text-card-foreground">₹1,006</span>
          <span className="text-[8px] text-muted-foreground">final fill</span>
        </div>
      </div>

      <div className="my-3 text-center text-[9px] font-bold tracking-wide text-brand" style={fade(550)}>
        SLIPPAGE VS ARRIVAL: ₹6 / SHARE
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(650)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">MEASURES: SPEED</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">NOT JUST FAIRNESS</span>
      </div>
    </div>
  );
}

export { ArrivalPriceIllustration };
