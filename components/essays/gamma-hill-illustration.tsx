"use client";

import * as React from "react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Black-Scholes call delta, illustrative: strike ₹100, volatility 25%, no rates.
const STRIKE = 100;
const VOL = 0.25;
const ONE_WEEK = 7 / 365;
const TWO_MONTHS = 60 / 365;

function normCdf(x: number) {
  // Abramowitz–Stegun approximation, accurate to ~1e-7.
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

const delta = (price: number, years: number) =>
  normCdf((Math.log(price / STRIKE) + (VOL * VOL * years) / 2) / (VOL * Math.sqrt(years)));

// Chart space: stock ₹90–110 across, delta 0–1 up.
const W = 300;
const H = 130;
const PAD = { left: 26, right: 10, top: 10, bottom: 20 };
const S_MIN = 90;
const S_MAX = 110;
const sx = (price: number) => PAD.left + ((price - S_MIN) / (S_MAX - S_MIN)) * (W - PAD.left - PAD.right);
const sy = (d: number) => PAD.top + (1 - d) * (H - PAD.top - PAD.bottom);

const curve = (years: number) =>
  Array.from({ length: 81 }, (_, i) => {
    const price = S_MIN + (i / 80) * (S_MAX - S_MIN);
    return `${sx(price).toFixed(1)},${sy(delta(price, years)).toFixed(1)}`;
  }).join(" ");

const WEEK_PATH = curve(ONE_WEEK);
const MONTHS_PATH = curve(TWO_MONTHS);

const START = 94;
const END = 102;

function GammaHillIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [price, setPrice] = React.useState(102);
  const timer = React.useRef<number | null>(null);

  const stop = () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  };

  React.useEffect(() => {
    if (!played || reducedMotion) return;
    let p = START;
    setPrice(p);
    timer.current = window.setInterval(() => {
      p = Math.round((p + 0.25) * 100) / 100;
      setPrice(p);
      if (p >= END) stop();
    }, 70);
    return stop;
  }, [played, reducedMotion]);

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  const d = delta(price, ONE_WEEK);
  const shares = Math.round(d * 100);

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>GAMMA · ₹100 CALL</span>
          <span>HOW FAST DELTA CHANGES</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            The hill gets steep at the strike.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            Same ₹1 move. Near the strike, near expiry, delta jumps.
          </div>
        </div>
      </div>

      <div className="p-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Call delta against stock price. The one-week option's curve is steep around the ₹100 strike: delta 0.29 at ₹98 and 0.72 at ₹102. The two-month curve is gentler: 0.44 to 0.60."
          style={reveal(60)}
        >
          {[0, 0.5, 1].map((level) => (
            <g key={level}>
              <line x1={PAD.left} x2={W - PAD.right} y1={sy(level)} y2={sy(level)} className="stroke-border" strokeWidth={0.75} />
              <text x={PAD.left - 4} y={sy(level) + 3} textAnchor="end" className="fill-muted-foreground text-[7px] font-bold">
                {level === 0.5 ? "0.5" : level}
              </text>
            </g>
          ))}
          <line
            x1={sx(STRIKE)}
            x2={sx(STRIKE)}
            y1={PAD.top}
            y2={H - PAD.bottom}
            className="stroke-muted-foreground"
            strokeWidth={0.75}
            strokeDasharray="3 3"
          />
          <polyline points={MONTHS_PATH} fill="none" className="stroke-muted-foreground/60" strokeWidth={1.5} />
          <polyline points={WEEK_PATH} fill="none" className="stroke-brand" strokeWidth={2} />
          <circle cx={sx(price)} cy={sy(d)} r={4} className="fill-card-foreground" />
          {[90, 95, 100, 105, 110].map((tick) => (
            <text
              key={tick}
              x={sx(tick)}
              y={H - 6}
              textAnchor={tick === 90 ? "start" : tick === 110 ? "end" : "middle"}
              className="fill-muted-foreground text-[7px] font-bold"
            >
              {tick === 100 ? "STRIKE ₹100" : `₹${tick}`}
            </text>
          ))}
        </svg>

        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(160)}>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-3 bg-brand" /> 1 week to expiry
          </span>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-3 bg-muted-foreground/60" /> 2 months to expiry
          </span>
        </div>

        <label className="mt-3 block" style={reveal(220)}>
          <span className="flex items-center justify-between text-[8px] font-bold tracking-wide text-muted-foreground">
            <span>STOCK PRICE</span>
            <span className="text-card-foreground">₹{price.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={S_MIN}
            max={S_MAX}
            step={0.25}
            value={price}
            onChange={(event) => {
              stop();
              setPrice(Number(event.target.value));
            }}
            className="mt-1 w-full accent-[var(--brand)]"
            aria-label="Stock price"
          />
        </label>

        <div className="mt-2 grid grid-cols-2 gap-1.5" style={reveal(280)}>
          <div className="rounded-lg border border-border bg-card p-2.5 text-center">
            <div className="text-[18px] font-bold tabular-nums text-brand">{d.toFixed(2)}</div>
            <div className="mt-0.5 text-[7px] font-bold tracking-wide text-muted-foreground">DELTA (1-WEEK CALL)</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-2.5 text-center">
            <div className="text-[18px] font-bold tabular-nums text-card-foreground">{shares}</div>
            <div className="mt-0.5 text-[7px] font-bold leading-tight tracking-wide text-muted-foreground">
              SHARES A DESK SHORT 100 CALLS MUST HOLD
            </div>
          </div>
        </div>

        <div className="mt-2 text-[8px] font-bold leading-relaxed tracking-wide text-muted-foreground" style={reveal(340)}>
          ₹98 → ₹102: delta 0.29 → 0.72 with a week left, 0.44 → 0.60 with two months. The hedge has to chase the
          price up.
        </div>

        <div className="mt-3 space-y-1 rounded-lg border border-border bg-card p-2.5 text-[8px] font-bold leading-relaxed tracking-wide" style={reveal(400)}>
          <div>
            <span className="text-card-foreground">US, 2021:</span>{" "}
            <span className="text-muted-foreground">GameStop&apos;s run was called a gamma squeeze. The SEC wasn&apos;t convinced.</span>
          </div>
          <div>
            <span className="text-card-foreground">INDIA, 2025:</span>{" "}
            <span className="text-muted-foreground">SEBI&apos;s interim order alleges Jane Street engineered expiry-day moves.</span>
          </div>
        </div>
        <div className="mt-2 text-[7px] font-bold tracking-wide text-muted-foreground" style={reveal(440)}>
          Illustrative: Black-Scholes, 25% volatility, no interest rate.
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        STEEPEST AT THE STRIKE, NEAR EXPIRY: WHERE HEDGING TURNS INTO CHASING.
      </div>
    </div>
  );
}

export { GammaHillIllustration };
