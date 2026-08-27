"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const stalls = [
  { label: "STALL A", prize: "₹500", odds: "10%", ev: "₹50" },
  { label: "STALL B", prize: "₹100", odds: "60%", ev: "₹60" },
];

function ExpectedValueIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 grid grid-cols-[3.5rem_1fr_1fr_1fr] gap-2 text-[9px] font-bold tracking-wide">
        <span className="text-muted-foreground">STALL</span>
        <span className="text-center text-muted-foreground">PRIZE</span>
        <span className="text-center text-muted-foreground">ODDS</span>
        <span className="text-center text-muted-foreground">EV</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {stalls.map((stall, i) => (
          <div
            key={stall.label}
            className="grid grid-cols-[3.5rem_1fr_1fr_1fr] items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 220}ms, transform 350ms ease ${i * 220}ms`,
            }}
          >
            <span className="text-[9px] font-semibold text-card-foreground">{stall.label}</span>
            <span className="text-center text-[10px] font-semibold text-muted-foreground">
              {stall.prize}
            </span>
            <span className="text-center text-[10px] font-semibold text-muted-foreground">
              {stall.odds}
            </span>
            <span className="text-center text-[10px] font-bold text-card-foreground">
              {stall.ev}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-2 flex items-center justify-between rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-2"
        style={{
          opacity: played ? 1 : 0,
          transition: reducedMotion ? "none" : "opacity 350ms ease 700ms",
        }}
      >
        <span className="text-[9px] font-bold tracking-wide text-brand">HIGHER EV</span>
        <span className="text-[11px] font-bold text-brand">STALL B, NOT THE BIG PRIZE</span>
      </div>
    </div>
  );
}

export { ExpectedValueIllustration };
