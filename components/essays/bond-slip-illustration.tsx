"use client";

import * as React from "react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const FACE = 1000;
const COUPON = 70;
const YEARS = 5;

type Rate = 6 | 7 | 8;
const RATES: Rate[] = [6, 7, 8];

// Present value of the frozen cash flows at the going rate.
function priceAt(rate: Rate) {
  const r = rate / 100;
  let value = FACE / (1 + r) ** YEARS;
  for (let year = 1; year <= YEARS; year++) value += COUPON / (1 + r) ** year;
  return Math.round(value);
}

const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function explanation(rate: Rate) {
  const price = priceAt(rate);
  if (rate === 7) return "Issue day: ₹70 is exactly what ₹1,000 buys anywhere, so the price is the face value.";
  if (rate > 7)
    return `₹70 a year + ${rupees(FACE - price)} extra at maturity = the same ${rate}% as a new bond.`;
  return `Your ₹70 beats the ₹${(FACE * rate) / 100} on offer, so buyers pay ${rupees(price - FACE)} more.`;
}

// Played once on reveal so a reader who never taps still sees both directions.
const AUTOPLAY: { rate: Rate; at: number }[] = [
  { rate: 7, at: 0 },
  { rate: 8, at: 1400 },
  { rate: 6, at: 3200 },
  { rate: 8, at: 5000 },
];

function LockIcon({ open = false }: { open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d={open ? "M8 11V7a4 4 0 0 1 7.5-2" : "M8 11V7a4 4 0 0 1 8 0v4"} />
    </svg>
  );
}

function BondSlipIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [rate, setRate] = React.useState<Rate>(8);
  const [pulse, setPulse] = React.useState(0);
  const timers = React.useRef<number[]>([]);

  const stopAutoplay = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  React.useEffect(() => {
    if (!played || reducedMotion) return;
    timers.current = AUTOPLAY.map(({ rate: next, at }) =>
      window.setTimeout(() => {
        setRate(next);
        setPulse((n) => n + 1);
      }, at),
    );
    return stopAutoplay;
  }, [played, reducedMotion]);

  const choose = (next: Rate) => {
    stopAutoplay();
    setRate(next);
    setPulse((n) => n + 1);
  };

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  const price = priceAt(rate);
  const priceTone = price < FACE ? "text-destructive" : price > FACE ? "text-emerald-700 dark:text-emerald-300" : "text-card-foreground";

  const locked = [
    { label: "Coupon", value: "₹70 a year" },
    { label: "Face value", value: "₹1,000" },
    { label: "Matures in", value: "5 years" },
  ];

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>BOND · ₹1,000 AT 7%</span>
          <span>A FIXED DEPOSIT YOU CAN SELL</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            Nothing happened to your bond.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            The number that changed was somebody else&apos;s.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="rounded-lg border-2 border-dashed border-border bg-card p-3" style={reveal(80)}>
          <div className="text-center text-[8px] font-bold tracking-[0.2em] text-muted-foreground">
            I OWE YOU ₹1,000 ON THIS DATE, AND ₹70 EVERY YEAR UNTIL THEN
          </div>
          <div className="mt-2.5 space-y-1.5">
            {locked.map((field) => (
              <div key={field.label} className="flex items-center justify-between gap-2 text-[9px] font-bold tracking-wide">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <LockIcon /> {field.label}
                </span>
                <span className="flex items-center gap-2 text-card-foreground">
                  <span
                    key={pulse}
                    className="text-[7px] text-muted-foreground"
                    style={{
                      animation: reducedMotion || pulse === 0 ? "none" : "bond-unchanged 1100ms ease forwards",
                      opacity: 0,
                    }}
                  >
                    UNCHANGED
                  </span>
                  {field.value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-2 border-t border-dashed border-border pt-2 text-[10px] font-bold tracking-wide">
              <span className="flex items-center gap-1.5 text-brand">
                <LockIcon open /> What someone pays today
              </span>
              <span className={`text-[15px] tabular-nums ${priceTone}`}>{rupees(price)}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2" style={reveal(260)}>
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">GOING RATE TODAY</span>
          <div className="flex rounded-full border border-border bg-card p-0.5" role="group" aria-label="Going interest rate">
            {RATES.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={rate === option}
                onClick={() => choose(option)}
                className={`rounded-full px-3 py-1 text-[9px] font-bold tracking-wide transition-colors ${
                  rate === option ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-card-foreground"
                }`}
              >
                {option}%
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 rounded-lg border border-border bg-card p-2.5" style={reveal(340)}>
          <div className="flex items-center justify-between gap-2 text-[9px] font-bold tracking-wide">
            <span className="text-muted-foreground">Across the street, a new ₹1,000 bond:</span>
            <span className="whitespace-nowrap text-card-foreground">₹{(FACE * rate) / 100} a year</span>
          </div>
          <div className="mt-1.5 text-[8px] font-bold leading-relaxed tracking-wide text-muted-foreground" aria-live="polite">
            {explanation(rate)}
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        A BOND&apos;S PRICE IS RARELY A VERDICT ON THE BORROWER. IT&apos;S A VERDICT ON EVERYBODY ELSE&apos;S RATE.
      </div>

      <style>{`@keyframes bond-unchanged { 0% { opacity: 0 } 20% { opacity: 1 } 75% { opacity: 1 } 100% { opacity: 0 } }`}</style>
    </div>
  );
}

export { BondSlipIllustration };
