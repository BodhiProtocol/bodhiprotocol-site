"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const desks = [
  { name: "FX", client: "Currency risk" },
  { name: "Equities", client: "Shares & size" },
  { name: "Rates", client: "Bonds & swaps" },
  { name: "Credit", client: "Default risk" },
  { name: "Commodities", client: "Oil, metals" },
  { name: "Prime Brokerage", client: "Financing" },
];

function TradingDesksIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          BANK TRADING DESKS
        </span>
        <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand">
          6 SPECIALTIES
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {desks.map((desk, i) => (
          <div
            key={desk.name}
            className="rounded-lg border border-border bg-card px-2.5 py-2"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(6px)",
              transition: reducedMotion
                ? "none"
                : `opacity 320ms ease ${i * 100}ms, transform 320ms ease ${i * 100}ms`,
            }}
          >
            <div className="text-[10px] font-semibold text-card-foreground">{desk.name}</div>
            <div className="mt-0.5 text-[9px] text-muted-foreground">{desk.client}</div>
          </div>
        ))}
      </div>

      <div
        className="mt-3 rounded-lg border border-dashed border-border bg-card px-2.5 py-2"
        style={{
          opacity: played ? 1 : 0,
          transition: reducedMotion ? "none" : `opacity 380ms ease ${desks.length * 100 + 100}ms`,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-blue-600 dark:text-blue-300">
            SALES
          </span>
          <span className="text-[9px] font-bold text-muted-foreground">owns the client</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-emerald-700 dark:text-emerald-300">
            TRADING
          </span>
          <span className="text-[9px] font-bold text-muted-foreground">owns the price</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          CLIENT NEED
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">MARKET PRICE</span>
      </div>
    </div>
  );
}

export { TradingDesksIllustration };
