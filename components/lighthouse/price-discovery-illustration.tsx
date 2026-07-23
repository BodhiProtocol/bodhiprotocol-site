"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const votes = [
  { label: "Vote 1", detail: "BUY 500 @ 100.00" },
  { label: "Vote 2", detail: "SELL 200 @ 100.02" },
  { label: "Vote 3", detail: "BUY 800 @ 100.05" },
  { label: "Vote 4", detail: "SELL 300 @ 100.03" },
];

function PriceDiscoveryIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        THE RUNNING POLL
      </div>

      <div className="flex flex-col gap-1">
        {votes.map((vote, i) => (
          <div
            key={vote.label}
            className="flex items-center justify-between gap-2 border-b border-dashed border-border py-1 last:border-b-0"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateX(0)" : "translateX(-4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 200}ms, transform 350ms ease ${i * 200}ms`,
            }}
          >
            <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
              {vote.label}
            </span>
            <span className="text-[10px] font-semibold text-card-foreground">{vote.detail}</span>
          </div>
        ))}
      </div>

      <div
        className="mt-2 flex items-center justify-between rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-2"
        style={{
          opacity: played ? 1 : 0,
          transition: reducedMotion ? "none" : "opacity 350ms ease 900ms",
        }}
      >
        <span className="text-[9px] font-bold tracking-wide text-brand">CURRENT PRICE</span>
        <span className="text-[11px] font-bold text-brand">100.03</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          NO ANNOUNCEMENT
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">JUST THE LATEST VOTE</span>
      </div>
    </div>
  );
}

export { PriceDiscoveryIllustration };
