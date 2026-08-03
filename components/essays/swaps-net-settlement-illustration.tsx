"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function SwapsNetSettlementIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 flex items-center justify-between" style={fade(0)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">NOTIONAL ₹10 CR</span>
        <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[8px] font-bold tracking-wide text-muted-foreground">
          NEVER EXCHANGED
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div
          className="flex items-center justify-between rounded-md border border-dashed border-border px-2 py-1.5"
          style={fade(150)}
        >
          <span className="text-[9px] font-semibold text-muted-foreground">PAY FIXED · 7%</span>
          <span className="text-[9px] font-bold text-card-foreground">₹17.5L</span>
        </div>
        <div
          className="flex items-center justify-between rounded-md border border-dashed border-border px-2 py-1.5"
          style={fade(300)}
        >
          <span className="text-[9px] font-semibold text-muted-foreground">RECEIVE FLOATING · 8%</span>
          <span className="text-[9px] font-bold text-card-foreground">₹20L</span>
        </div>
      </div>

      <div className="my-2.5 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wide text-brand" style={fade(450)}>
        NETS TO ↓
      </div>

      <div
        className="flex items-center justify-between rounded-md bg-brand px-2 py-1.5"
        style={fade(600)}
      >
        <span className="text-[9px] font-bold tracking-wide text-brand-foreground">ONLY CASH THAT MOVES</span>
        <span className="text-[10px] font-bold text-brand-foreground">₹2.5L</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(700)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">₹10 CR: REFERENCE ONLY</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">ONLY THE GAP MOVES</span>
      </div>
    </div>
  );
}

export { SwapsNetSettlementIllustration };
