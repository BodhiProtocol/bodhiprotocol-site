"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const steps = [
  { label: "01", title: "Execution", note: "Price agreed", state: "Promise born" },
  { label: "02", title: "Clearing", note: "Obligations shaped", state: "Still conditional" },
  { label: "03", title: "Settlement", note: "Money and securities move", state: "Almost done" },
  { label: "04", title: "Finality", note: "Irrevocable state", state: "History" },
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
        <div className="mt-3 text-[22px] font-bold leading-none tracking-tight text-card-foreground">
          When is it really done?
        </div>
      </div>

      <div className="space-y-2 p-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="grid grid-cols-[30px_1fr] gap-2 rounded-lg border border-border bg-card p-3 text-card-foreground"
            style={reveal(index * 120)}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground">
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

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground" style={reveal(560)}>
        FINALITY IS THE MARKET&apos;S FULL STOP
      </div>
    </div>
  );
}

export { SettlementFinalityIllustration };
