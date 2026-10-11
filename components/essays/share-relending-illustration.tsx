"use client";

import * as React from "react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// A ten-share teaching model of the essay's chain: lent, sold, re-lent, sold again.
const FLOAT = 10;

type Step = 0 | 1 | 2;

const steps: { label: string; note: string }[] = [
  { label: "Start", note: "One lender owns all 10 shares." },
  { label: "Round 1", note: "Lent to a short seller, who sells all 10 to Buyer A." },
  { label: "Round 2", note: "Buyer A's broker re-lends 4. A second short seller sells them to Buyer B." },
];

// Shares held per owner at each step; `onLoan` marks how many of them are lent out.
const holders: { name: string; held: number[]; onLoan: number[] }[] = [
  { name: "Lender", held: [10, 10, 10], onLoan: [0, 10, 10] },
  { name: "Buyer A", held: [0, 10, 10], onLoan: [0, 0, 4] },
  { name: "Buyer B", held: [0, 0, 4], onLoan: [0, 0, 0] },
];

const owed = [0, 10, 14];

const AUTOPLAY: { step: Step; at: number }[] = [
  { step: 0, at: 0 },
  { step: 1, at: 1300 },
  { step: 2, at: 3100 },
];

// The 100% frame takes 70% of the track so 140% still fits inside the card.
const FRAME = 70;

function ShareRelendingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [step, setStep] = React.useState<Step>(2);
  const timers = React.useRef<number[]>([]);

  const stopAutoplay = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  React.useEffect(() => {
    if (!played || reducedMotion) return;
    timers.current = AUTOPLAY.map(({ step: next, at }) => window.setTimeout(() => setStep(next), at));
    return stopAutoplay;
  }, [played, reducedMotion]);

  const choose = (next: Step) => {
    stopAutoplay();
    setStep(next);
  };

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  const short = owed[step];
  const counted = holders.reduce((sum, holder) => sum + holder.held[step], 0);
  const shortPct = (short / FLOAT) * 100;
  const smooth = reducedMotion ? "none" : "width 700ms ease, background-color 300ms ease";

  const counters = [
    { label: "Shares that exist", value: FLOAT, tone: "text-card-foreground" },
    { label: "Sold short, owed back", value: short, tone: short > FLOAT ? "text-destructive" : "text-card-foreground" },
    { label: "Counted as owned", value: counted, tone: "text-brand" },
  ];

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>SECURITIES LENDING</span>
          <span>ONE BOOK, LENT ON TWICE</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            10 shares. 14 sold short.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            Every loan is legal. The count still passes 100%.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex rounded-full border border-border bg-card p-0.5" role="group" aria-label="Lending round" style={reveal(60)}>
          {steps.map((option, index) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={step === index}
              onClick={() => choose(index as Step)}
              className={`flex-1 rounded-full px-2 py-1 text-[9px] font-bold tracking-wide transition-colors ${
                step === index ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="mt-2 min-h-[3.25em] text-[8px] font-bold leading-relaxed tracking-wide text-muted-foreground" aria-live="polite">
          {steps[step].note}
        </div>

        <div className="mt-2 space-y-2" style={reveal(160)}>
          {holders.map((holder) => (
            <div key={holder.name} className="grid grid-cols-[56px_1fr] items-center gap-2">
              <span className="text-[9px] font-bold tracking-wide text-card-foreground">{holder.name}</span>
              <div className="flex flex-wrap gap-1" aria-label={`${holder.name}: ${holder.held[step]} shares, ${holder.onLoan[step]} lent out`}>
                {Array.from({ length: FLOAT }, (_, index) => {
                  const held = index < holder.held[step];
                  const lent = index < holder.onLoan[step];
                  return (
                    <span
                      key={index}
                      className={`size-3.5 rounded-full border transition-all duration-500 ${
                        !held
                          ? "border-transparent bg-transparent"
                          : lent
                            ? "border-dashed border-brand bg-transparent"
                            : "border-brand bg-brand"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-end gap-3 text-[7px] font-bold tracking-wide text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-brand" /> holds the share
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full border border-dashed border-brand" /> lent out, still counted
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5" style={reveal(260)}>
          {counters.map((counter) => (
            <div key={counter.label} className="rounded-lg border border-border bg-card p-2 text-center">
              <div className={`text-[18px] font-bold tabular-nums ${counter.tone}`}>{counter.value}</div>
              <div className="mt-0.5 text-[7px] font-bold leading-tight tracking-wide text-muted-foreground">
                {counter.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3" style={reveal(340)}>
          <div className="flex items-center justify-between text-[8px] font-bold tracking-wide text-muted-foreground">
            <span>SHORT INTEREST, % OF FLOAT</span>
            <span className={short > FLOAT ? "text-destructive" : "text-card-foreground"}>{shortPct}%</span>
          </div>
          <div className="relative mt-1.5 h-4">
            <div
              className="absolute inset-y-0 left-0 rounded-sm border-2 border-card-foreground/60"
              style={{ width: `${FRAME}%` }}
              aria-hidden="true"
            />
            <div
              className={`absolute bottom-1 left-1 top-1 rounded-sm ${short > FLOAT ? "bg-destructive" : "bg-brand"}`}
              style={{ width: `calc(${(shortPct / 100) * FRAME}% - 8px)`, transition: smooth, minWidth: 0 }}
            />
          </div>
          <div className="relative mt-1 h-3 text-[7px] font-bold text-muted-foreground">
            <span className="absolute left-0">0%</span>
            <span className="absolute -translate-x-full whitespace-nowrap" style={{ left: `${FRAME}%` }}>
              100% = ALL SHARES THAT EXIST
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-1 rounded-lg border border-border bg-card p-2.5 text-[8px] font-bold leading-relaxed tracking-wide" style={reveal(420)}>
          <div>
            <span className="text-card-foreground">INDIA (SLB):</span>{" "}
            <span className="text-muted-foreground">every loan through a clearing corporation, visible to the exchange live.</span>
          </div>
          <div>
            <span className="text-card-foreground">US:</span>{" "}
            <span className="text-muted-foreground">private two-party loans; short interest published twice a month.</span>
          </div>
        </div>

        <div className="mt-2 text-[7px] font-bold tracking-wide text-muted-foreground" style={reveal(480)}>
          Illustrative: 10 shares. GameStop&apos;s real chain ran through millions.
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        NOBODY BROKE A RULE. ORDINARY LENDING, RUN TWICE.
      </div>
    </div>
  );
}

export { ShareRelendingIllustration };
