"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const bars = [
  { day: "DAY 1", label: "+₹2", x: 28, y: 33, height: 12, labelY: 27, positive: true },
  { day: "DAY 2", label: "-₹1", x: 88, y: 45, height: 6, labelY: 58, positive: false },
  { day: "DAY 3", label: "+₹5", x: 148, y: 15, height: 30, labelY: 9, positive: true },
];

function FuturesMarkToMarketIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 text-[9px] font-bold tracking-wide text-muted-foreground">
        LONG 1 FUTURES · ENTRY ₹100 · CUMULATIVE CASH SETTLED
      </div>

      <svg viewBox="0 0 200 90" className="h-[104px] w-full" preserveAspectRatio="none">
        <line x1="4" y1="45" x2="196" y2="45" className="stroke-border" strokeWidth="1" strokeDasharray="2,3" />

        {bars.map((bar, i) => (
          <g key={bar.day}>
            <rect
              x={bar.x}
              y={bar.y}
              width={24}
              height={bar.height}
              rx={1.5}
              className={bar.positive ? "fill-brand" : "fill-muted-foreground"}
              style={{
                opacity: played ? 1 : 0,
                transform: played ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: `${bar.x + 12}px 45px`,
                transition: reducedMotion
                  ? "none"
                  : `opacity 300ms ease ${i * 200}ms, transform 400ms cubic-bezier(.16,1,.3,1) ${i * 200}ms`,
              }}
            />
            <text
              x={bar.x + 12}
              y={bar.labelY}
              textAnchor="middle"
              className={bar.positive ? "fill-brand text-[8px] font-bold" : "fill-muted-foreground text-[8px] font-bold"}
              style={fade(i * 200 + 300)}
            >
              {bar.label}
            </text>
            <text
              x={bar.x + 12}
              y={82}
              textAnchor="middle"
              className="fill-muted-foreground text-[7px] font-bold"
              style={fade(i * 200 + 300)}
            >
              {bar.day}
            </text>
          </g>
        ))}
      </svg>

      <div className="my-2.5 flex items-center justify-between rounded-md bg-brand px-2 py-1.5" style={fade(900)}>
        <span className="text-[9px] font-bold tracking-wide text-brand-foreground">ALREADY SETTLED</span>
        <span className="text-[10px] font-bold text-brand-foreground">+₹5 in cash</span>
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(1000)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">EVERY DAY, NOT AT CLOSE</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">NO PREMIUM · NO CAP</span>
      </div>
    </div>
  );
}

export { FuturesMarkToMarketIllustration };
