"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function PovIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  const ticks = [
    { market: 18, ours: 1.8 },
    { market: 30, ours: 3 },
    { market: 10, ours: 1 },
    { market: 24, ours: 2.4 },
    { market: 36, ours: 3.6 },
  ];

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        TARGET: 10% OF LIVE MARKET VOLUME
      </div>

      <div className="flex flex-col gap-2" style={fade(0)}>
        <div className="mb-0.5 text-[8px] font-bold tracking-wide text-muted-foreground">MARKET VOLUME</div>
        <div className="flex h-9 items-end justify-between gap-2">
          {ticks.map((t, i) => (
            <div
              key={`m-${i}`}
              className="flex-1 rounded-md border border-border bg-card"
              style={{ height: `${t.market}px`, ...fade(60 * i) }}
            />
          ))}
        </div>
      </div>

      <div className="my-1.5 flex flex-1 justify-center text-[9px] font-bold text-brand" style={fade(300)}>
        ↓ ALWAYS 10% ↓
      </div>

      <div className="flex flex-col gap-2" style={fade(350)}>
        <div className="flex h-9 items-end justify-between gap-2">
          {ticks.map((t, i) => (
            <div
              key={`o-${i}`}
              className="flex-1 rounded-md bg-brand"
              style={{ height: `${Math.max(t.ours, 2)}px`, ...fade(60 * i + 350) }}
            />
          ))}
        </div>
        <div className="mb-0.5 text-[8px] font-bold tracking-wide text-muted-foreground">OUR VOLUME</div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(650)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">RATE: FIXED</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">FINISH TIME: NONE SET</span>
      </div>
    </div>
  );
}

export { PovIllustration };
