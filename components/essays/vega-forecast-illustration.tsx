"use client";

import * as React from "react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Illustrative at-the-money option on a ₹100 stock, 30 days left, no rates.
// The two volatility levels are India VIX either side of 4 June 2024.
const PRICE = 100;
const DAYS = 30;

type Mood = "calm" | "nervous";
const VOL: Record<Mood, number> = { calm: 0.2094, nervous: 0.2674 };

function normCdf(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

// At the money with no rates, Black-Scholes gives the call and put the same price.
function atmPrice(vol: number) {
  const t = DAYS / 365;
  const d1 = (vol * Math.sqrt(t)) / 2;
  return PRICE * (normCdf(d1) - normCdf(-d1));
}

const AUTOPLAY: { mood: Mood; at: number }[] = [
  { mood: "calm", at: 0 },
  { mood: "nervous", at: 1600 },
];

function VegaForecastIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [mood, setMood] = React.useState<Mood>("nervous");
  const timers = React.useRef<number[]>([]);

  const stop = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  React.useEffect(() => {
    if (!played || reducedMotion) return;
    timers.current = AUTOPLAY.map(({ mood: next, at }) => window.setTimeout(() => setMood(next), at));
    return stop;
  }, [played, reducedMotion]);

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  const vol = VOL[mood];
  const option = atmPrice(vol);
  const calm = atmPrice(VOL.calm);
  const change = option - calm;
  const needle = mood === "calm" ? -50 : 35;

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>VEGA · 30-DAY OPTIONS</span>
          <span>PRICED OFF THE FORECAST</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            Nothing moved. Both got pricier.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            Same stock, same price, same day. Only the nerves changed.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card p-2.5" style={reveal(60)}>
          <span className="text-[9px] font-bold tracking-wide text-muted-foreground">STOCK PRICE</span>
          <span className="flex items-center gap-2 text-[9px] font-bold tracking-wide">
            <span className="text-[7px] text-muted-foreground">UNCHANGED</span>
            <span className="text-[15px] text-card-foreground">₹{PRICE}</span>
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3" style={reveal(140)}>
          <svg viewBox="0 0 80 46" className="w-20 shrink-0" aria-hidden="true">
            <path d="M8 42 A32 32 0 0 1 72 42" fill="none" className="stroke-border" strokeWidth={6} strokeLinecap="round" />
            <g
              style={{
                transform: `rotate(${needle}deg)`,
                transformOrigin: "40px 42px",
                transition: reducedMotion ? "none" : "transform 700ms ease",
              }}
            >
              <line x1={40} y1={42} x2={40} y2={16} className="stroke-card-foreground" strokeWidth={2.5} strokeLinecap="round" />
            </g>
            <circle cx={40} cy={42} r={3.5} className="fill-card-foreground" />
          </svg>
          <div className="flex-1">
            <div className="text-[8px] font-bold tracking-wide text-muted-foreground">THE FORECAST (IMPLIED VOLATILITY)</div>
            <div className="mt-1 flex rounded-full border border-border bg-card p-0.5" role="group" aria-label="Market mood">
              {(["calm", "nervous"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={mood === option}
                  onClick={() => {
                    stop();
                    setMood(option);
                  }}
                  className={`flex-1 rounded-full px-2 py-1 text-[9px] font-bold tracking-wide transition-colors ${
                    mood === option ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-card-foreground"
                  }`}
                >
                  {option === "calm" ? "Calm" : "Nervous"} {(VOL[option] * 100).toFixed(1)}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1.5" style={reveal(220)}>
          {["CALL", "PUT"].map((kind) => (
            <div key={kind} className="rounded-lg border border-border bg-card p-2.5 text-center">
              <div className="text-[8px] font-bold tracking-wide text-muted-foreground">{kind} AT ₹100</div>
              <div className="mt-0.5 text-[18px] font-bold tabular-nums text-card-foreground">₹{option.toFixed(2)}</div>
              <div className={`text-[8px] font-bold tracking-wide ${change > 0 ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}`}>
                {change > 0 ? `+₹${change.toFixed(2)} vs calm` : "baseline"}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 text-[8px] font-bold leading-relaxed tracking-wide text-muted-foreground" style={reveal(280)}>
          A call and a put both gain. Neither needed the stock to move, only the market&apos;s estimate of how much it
          might.
        </div>

        <div className="mt-3 space-y-1 rounded-lg border border-border bg-card p-2.5 text-[8px] font-bold leading-relaxed tracking-wide" style={reveal(340)}>
          <div>
            <span className="text-card-foreground">US, 5 FEB 2018:</span>{" "}
            <span className="text-muted-foreground">VIX 17.31 → 37.32. XIV, short volatility, lost about 96%.</span>
          </div>
          <div>
            <span className="text-card-foreground">INDIA, 4 JUN 2024:</span>{" "}
            <span className="text-muted-foreground">India VIX closed up about 28% on counting day.</span>
          </div>
        </div>
        <div className="mt-2 text-[7px] font-bold tracking-wide text-muted-foreground" style={reveal(380)}>
          Illustrative: Black-Scholes, ₹100 stock, 30 days, no interest rate.
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        THE PRICE OF PROTECTION MOVES WITH THE FORECAST, NOT THE STORM.
      </div>
    </div>
  );
}

export { VegaForecastIllustration };
