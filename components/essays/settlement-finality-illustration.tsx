"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const steps = [
  { label: "T", title: "Execution", note: "Price agreed", state: "Conditional" },
  { label: "T", title: "Clearing", note: "Obligations shaped", state: "Processing" },
  { label: "T+1", title: "Settlement", note: "Funds + securities move", state: "Crossing" },
  { label: "Final", title: "Finality", note: "Irrevocable ledger state", state: "Locked" },
];

function SettlementFinalityIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>SETTLEMENT FINALITY</span>
          <span>PROMISE -&gt; HISTORY</span>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-4">
          <div>
            <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
              The finality line
            </div>
            <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
              Before it: repairable. After it: completed state.
            </div>
          </div>
          <div className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-brand">
            IRREVOCABLE
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <div className="absolute left-[23px] top-8 h-[calc(100%-64px)] border-l border-dashed border-border" />
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={`${step.label}-${step.title}`}
                className="relative grid grid-cols-[46px_1fr] gap-2 rounded-lg border border-border bg-card p-3 text-card-foreground"
                style={reveal(index * 120)}
              >
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground">
                  {step.label}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold tracking-wide">{step.title}</span>
                    <span className="text-[9px] font-bold tracking-wide text-brand">{step.state}</span>
                  </div>
                  <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">{step.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2" style={reveal(560)}>
          <div className="rounded-lg border border-dashed border-border bg-background/60 p-2.5">
            <div className="text-[9px] font-bold tracking-wide text-muted-foreground">BEFORE FINALITY</div>
            <div className="mt-1 text-[10px] font-bold tracking-wide text-card-foreground">Still becoming true</div>
          </div>
          <div className="rounded-lg border border-brand/30 bg-brand/10 p-2.5">
            <div className="text-[9px] font-bold tracking-wide text-brand">AFTER FINALITY</div>
            <div className="mt-1 text-[10px] font-bold tracking-wide text-card-foreground">Now history</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        FINALITY IS THE MARKET&apos;S FULL STOP
      </div>
    </div>
  );
}

export { SettlementFinalityIllustration };
