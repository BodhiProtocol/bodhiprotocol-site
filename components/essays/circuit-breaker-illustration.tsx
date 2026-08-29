"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

type Tone = "amber" | "orange" | "destructive";

const toneClasses: Record<Tone, string> = {
  amber: "border-amber-500/40 bg-amber-500/10 text-amber-600",
  orange: "border-orange-500/40 bg-orange-500/10 text-orange-600",
  destructive: "border-destructive/40 bg-destructive/10 text-destructive",
};

const marketWide = [
  {
    place: "India",
    reopens: "Pre-open auction",
    levels: [
      { drop: "10%", pause: "45 min", tone: "amber" as Tone },
      { drop: "15%", pause: "1h 45m", tone: "orange" as Tone },
      { drop: "20%", pause: "Day ends", tone: "destructive" as Tone },
    ],
  },
  {
    place: "United States",
    reopens: "Halts to 3:25pm cutoff",
    levels: [
      { drop: "7%", pause: "15 min", tone: "amber" as Tone },
      { drop: "13%", pause: "15 min", tone: "orange" as Tone },
      { drop: "20%", pause: "Day ends", tone: "destructive" as Tone },
    ],
  },
];

const singleStock = [
  { place: "India", spec: "Price band, 2–20%", note: "Freezes at the band" },
  { place: "United States", spec: "LULD, 5/10/20%", note: "Blocks the trade, then pauses" },
];

function CircuitBreakerIllustration() {
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
          <span>CIRCUIT BREAKER PANEL</span>
          <span>INDEX FALLS -&gt; SWITCHES TRIP</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            One index, three switches
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            Each one buys more time. None of them fix the price.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(60)}>
          MARKET-WIDE — EVERY STOCK PAUSES
        </div>
        {marketWide.map((row, rowIndex) => (
          <div key={row.place} className={rowIndex === 0 ? "mt-1.5" : "mt-3"}>
            <div className="grid grid-cols-3 gap-1.5">
              {row.levels.map((level, index) => (
                <div
                  key={level.drop}
                  className={`rounded-lg border p-2 text-center ${toneClasses[level.tone]}`}
                  style={reveal(100 + rowIndex * 380 + index * 110)}
                >
                  <div className="mt-0.5 text-[10px] font-bold tracking-wide">{level.drop}</div>
                  <div className="mt-0.5 text-[8px] font-bold tracking-wide opacity-80">{level.pause}</div>
                </div>
              ))}
            </div>
            <div
              className="mt-1 flex items-center justify-between gap-2 text-[8px] font-bold tracking-wide text-muted-foreground"
              style={reveal(420 + rowIndex * 380)}
            >
              <span>{row.place}</span>
              <span>{row.reopens}</span>
            </div>
          </div>
        ))}
        <div
          className="mt-1.5 text-center text-[8px] font-bold tracking-wide text-muted-foreground"
          style={reveal(920)}
        >
          THE EARLIER THE BREACH, THE LONGER THE PAUSE
        </div>

        <div className="mt-3 text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(980)}>
          SINGLE-STOCK — ONLY THAT NAME PAUSES
        </div>
        <div className="mt-1.5 space-y-1.5">
          {singleStock.map((row, index) => (
            <div
              key={row.place}
              className="grid grid-cols-[100px_1fr_auto] items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 p-2.5 text-card-foreground"
              style={reveal(1040 + index * 100)}
            >
              <span className="text-[9px] font-bold tracking-wide text-muted-foreground">{row.place}</span>
              <span className="text-[9px] font-bold tracking-wide text-brand">{row.spec}</span>
              <span className="justify-self-end rounded-full border border-brand/30 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-muted-foreground">
                {row.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        A SWITCH DOESN&apos;T FIX THE WIRE. IT BUYS TIME TO LOOK.
      </div>
    </div>
  );
}

export { CircuitBreakerIllustration };
