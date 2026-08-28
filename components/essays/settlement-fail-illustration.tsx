"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const responses = [
  { place: "India", move: "Auction, then close-out", tone: "Guaranteed" },
  { place: "United States", move: "Broker must close out — or lose short privileges", tone: "Personal" },
  { place: "European Union", move: "Automatic daily cash penalty", tone: "Priced" },
];

function SettlementFailIllustration() {
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
          <span>SETTLEMENT FAIL</span>
          <span>AGREED -&gt; DELIVERED?</span>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-4">
          <div>
            <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
              One promise, two paths
            </div>
            <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
              Execution never guarantees delivery.
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2" style={reveal(0)}>
          <div className="rounded-lg border border-border bg-card p-2.5 text-center text-card-foreground">
            <div className="text-[9px] font-bold tracking-wide text-muted-foreground">T</div>
            <div className="mt-0.5 text-[10px] font-bold tracking-wide">Execution</div>
          </div>
          <div className="text-muted-foreground" aria-hidden="true">
            &rarr;
          </div>
          <div className="rounded-lg border border-dashed border-border bg-background/60 p-2.5 text-center">
            <div className="text-[9px] font-bold tracking-wide text-muted-foreground">T+1</div>
            <div className="mt-0.5 text-[10px] font-bold tracking-wide text-card-foreground">Settlement due</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div
            className="rounded-lg border border-brand/30 bg-brand/10 p-2.5"
            style={reveal(140)}
          >
            <div className="text-[9px] font-bold tracking-wide text-brand">DELIVERED</div>
            <div className="mt-1 text-[10px] font-bold tracking-wide text-card-foreground">Trade complete</div>
          </div>
          <div
            className="rounded-lg border border-destructive/30 bg-destructive/10 p-2.5"
            style={reveal(220)}
          >
            <div className="text-[9px] font-bold tracking-wide text-destructive">FAIL</div>
            <div className="mt-1 text-[10px] font-bold tracking-wide text-card-foreground">Promise broken</div>
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          {responses.map((row, index) => (
            <div
              key={row.place}
              className="grid grid-cols-[70px_1fr_auto] items-center gap-2 rounded-lg border border-border bg-card p-2.5 text-card-foreground"
              style={reveal(320 + index * 100)}
            >
              <span className="text-[9px] font-bold tracking-wide text-muted-foreground">{row.place}</span>
              <span className="text-[9.5px] font-bold tracking-wide">{row.move}</span>
              <span className="justify-self-end rounded-full border border-border px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-muted-foreground">
                {row.tone}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        EVERY MARKET DECIDES THIS BEFORE IT EVER HAPPENS
      </div>
    </div>
  );
}

export { SettlementFailIllustration };
