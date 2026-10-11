"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Call deltas run from 0 to 1. The ends are shown as "≈" because a real
// option only approaches them; 0.5 is the at-the-money midpoint.
const gears = [
  { gear: "Low gear", where: "Far below the strike", delta: 0.05, move: "≈ ₹0.05" },
  { gear: "Middle gear", where: "At the strike", delta: 0.5, move: "₹0.50" },
  { gear: "Top gear", where: "Far above the strike", delta: 0.95, move: "≈ ₹0.95" },
];

const hedge = [
  { leg: "Sold 1 call", value: "−₹0.50", tone: "text-destructive" },
  { leg: "Holds 0.5 of the stock", value: "+₹0.50", tone: "text-emerald-700 dark:text-emerald-300" },
];

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-brand" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function DeltaGearIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  const fill = (width: number, delay: number) => ({
    width: played ? `${width * 100}%` : "0%",
    transition: reducedMotion ? "none" : `width 650ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <GearIcon /> DELTA · CALL OPTION
          </span>
          <span>SAME PEDAL, THREE GEARS</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            ₹1 in. How much out?
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            The stock moves ₹1. The option moves by its delta.
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {gears.map((gear, index) => (
          <div key={gear.gear} style={reveal(80 + index * 140)}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[9px] font-bold tracking-wide text-card-foreground">
                {gear.gear.toUpperCase()} <span className="text-muted-foreground">· {gear.where}</span>
              </span>
              <span className="text-[9px] font-bold tracking-wide text-brand">
                Δ {gear.delta === 0.5 ? "" : "≈"}
                {gear.delta.toFixed(2)}
              </span>
            </div>
            <div className="mt-1.5 grid grid-cols-[52px_1fr] items-center gap-x-2 gap-y-1">
              <span className="text-[8px] font-bold tracking-wide text-muted-foreground">STOCK</span>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-card">
                <div className="absolute inset-y-0 left-0 rounded-full bg-card-foreground/70" style={fill(1, 200 + index * 140)} />
              </div>
              <span className="text-[8px] font-bold tracking-wide text-muted-foreground">OPTION</span>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-card">
                <div className="absolute inset-y-0 left-0 rounded-full bg-brand" style={fill(gear.delta, 450 + index * 140)} />
              </div>
            </div>
            <div className="mt-1 text-right text-[8px] font-bold tracking-wide text-muted-foreground">
              ₹1.00 → <span className="text-card-foreground">{gear.move}</span>
            </div>
          </div>
        ))}

        <div className="rounded-lg border border-border bg-card p-3" style={reveal(900)}>
          <div className="text-[8px] font-bold tracking-wide text-muted-foreground">
            THE DESK ON THE OTHER SIDE · STOCK RISES ₹1
          </div>
          <div className="mt-2 space-y-1">
            {hedge.map((row) => (
              <div key={row.leg} className="flex items-center justify-between gap-2 text-[9px] font-bold tracking-wide">
                <span className="text-card-foreground">{row.leg}</span>
                <span className={row.tone}>{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-2 border-t border-border pt-1 text-[9px] font-bold tracking-wide">
              <span className="text-card-foreground">Net</span>
              <span className="text-brand">₹0</span>
            </div>
          </div>
          <div className="mt-2 text-[8px] font-bold tracking-wide text-muted-foreground">
            No view on direction needed. Rebalance as delta drifts.
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        ALL REBALANCING ONE WAY AT ONCE: BLACK MONDAY 1987.
      </div>
    </div>
  );
}

export { DeltaGearIllustration };
