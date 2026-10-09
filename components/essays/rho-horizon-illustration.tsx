"use client";

import * as React from "react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Illustrative at-the-money call on a ₹100 stock, 25% volatility. The two
// rates are the RBI repo rate before and after its May 2022–Feb 2023 hikes.
const PRICE = 100;
const VOL = 0.25;

type Rate = 4 | 6.5;
const RATES: Rate[] = [4, 6.5];

function normCdf(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

function callPrice(years: number, rate: Rate) {
  const r = rate / 100;
  const d1 = ((r + (VOL * VOL) / 2) * years) / (VOL * Math.sqrt(years));
  const d2 = d1 - VOL * Math.sqrt(years);
  return PRICE * normCdf(d1) - PRICE * Math.exp(-r * years) * normCdf(d2);
}

const horizons = [
  { label: "1 week", sub: "a weekly Nifty option", years: 7 / 365 },
  { label: "1 year", sub: "a long-dated listed option", years: 1 },
  { label: "5 years", sub: "an ESOP grant or structured note", years: 5 },
];

const MAX = callPrice(5, 6.5);

const AUTOPLAY: { rate: Rate; at: number }[] = [
  { rate: 4, at: 0 },
  { rate: 6.5, at: 1500 },
];

function RhoHorizonIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [rate, setRate] = React.useState<Rate>(6.5);
  const timers = React.useRef<number[]>([]);

  const stop = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  React.useEffect(() => {
    if (!played || reducedMotion) return;
    timers.current = AUTOPLAY.map(({ rate: next, at }) => window.setTimeout(() => setRate(next), at));
    return stop;
  }, [played, reducedMotion]);

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>RHO · ₹100 CALL</span>
          <span>THE RATE INSIDE THE PRICE</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            Same rate change. One option barely notices.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            The longer an option has to live, the more the interest rate matters.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2" style={reveal(60)}>
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">INTEREST RATE (RBI REPO)</span>
          <div className="flex rounded-full border border-border bg-card p-0.5" role="group" aria-label="Interest rate">
            {RATES.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={rate === option}
                onClick={() => {
                  stop();
                  setRate(option);
                }}
                className={`rounded-full px-3 py-1 text-[9px] font-bold tracking-wide transition-colors ${
                  rate === option ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-card-foreground"
                }`}
              >
                {option}%
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {horizons.map((horizon, index) => {
            const before = callPrice(horizon.years, 4);
            const now = callPrice(horizon.years, rate);
            const change = now - before;
            return (
              <div key={horizon.label} style={reveal(140 + index * 100)}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[9px] font-bold tracking-wide text-card-foreground">
                    {horizon.label.toUpperCase()} <span className="text-muted-foreground">· {horizon.sub}</span>
                  </span>
                  <span className="text-[9px] font-bold tabular-nums text-card-foreground">₹{now.toFixed(2)}</span>
                </div>
                <div className="relative mt-1 h-2.5 overflow-hidden rounded-full bg-card">
                  <div
                    className="absolute inset-y-0 left-0 rounded-l-full bg-muted-foreground/40"
                    style={{ width: `${(before / MAX) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 rounded-r-full bg-brand"
                    style={{
                      left: `${(before / MAX) * 100}%`,
                      width: `${(change / MAX) * 100}%`,
                      transition: reducedMotion ? "none" : "width 600ms ease",
                    }}
                  />
                </div>
                <div className="mt-1 text-right text-[8px] font-bold tracking-wide text-muted-foreground">
                  {rate === 4 ? (
                    "baseline at 4%"
                  ) : (
                    <>
                      <span className="text-brand">+₹{change.toFixed(2)}</span> (+{((change / before) * 100).toFixed(0)}%) from the
                      rate alone
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 space-y-1 rounded-lg border border-border bg-card p-2.5 text-[8px] font-bold leading-relaxed tracking-wide" style={reveal(460)}>
          <div>
            <span className="text-card-foreground">US, 2022–23:</span>{" "}
            <span className="text-muted-foreground">Fed from near zero to 5.25–5.50%.</span>
          </div>
          <div>
            <span className="text-card-foreground">INDIA, 2022–23:</span>{" "}
            <span className="text-muted-foreground">RBI repo 4% → 6.5% in six hikes.</span>
          </div>
        </div>
        <div className="mt-2 text-[7px] font-bold tracking-wide text-muted-foreground" style={reveal(500)}>
          Illustrative: Black-Scholes, at-the-money ₹100 call, 25% volatility.
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        WEEKLY TRADERS NEVER SEE IT. FIVE-YEAR ESOP VALUATIONS DO.
      </div>
    </div>
  );
}

export { RhoHorizonIllustration };
