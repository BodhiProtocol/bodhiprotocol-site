"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function MarginIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const rise = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        <span>MARGIN ENGINE</span>
        <span>FEAR -&gt; COLLATERAL</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2" style={rise(0)}>
        <div className="rounded-lg border border-border bg-card px-3 py-2 text-center font-semibold text-card-foreground">
          Trader
        </div>
        <div className="h-px w-8 border-t border-dashed border-border" />
        <div className="rounded-lg border border-border bg-card px-3 py-2 text-center font-semibold text-card-foreground">
          Market
        </div>
      </div>

      <div className="my-3 rounded-lg border border-brand/30 bg-brand/10 p-3" style={rise(130)}>
        <div className="mb-2 flex items-center justify-between text-[9px] font-bold tracking-wide text-brand">
          <span>POSTED CUSHION</span>
          <span>RS 100,000</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-background">
          <div className="h-full w-[82%] rounded-full bg-brand" />
        </div>
      </div>

      <div className="grid gap-2" style={rise(260)}>
        <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
          <span className="font-bold tracking-wide text-muted-foreground">MARKED LOSS</span>
          <span className="font-bold text-destructive">RS 18,000</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
          <span className="font-bold tracking-wide text-muted-foreground">ACTION</span>
          <span className="font-bold text-brand">RESTORE CUSHION</span>
        </div>
      </div>

      <div className="mt-3 border-t border-dashed border-border pt-2.5 text-[9px] font-bold tracking-wide text-muted-foreground" style={rise(390)}>
        LOSS IS FUNDED BEFORE IT CAN TRAVEL
      </div>
    </div>
  );
}

export { MarginIllustration };
