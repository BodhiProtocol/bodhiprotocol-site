"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function VwapIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  const clips = [
    { time: "OPEN", h: 40, size: "2.4M" },
    { time: "10:30", h: 20, size: "1.1M" },
    { time: "12:00", h: 12, size: "0.6M" },
    { time: "13:30", h: 20, size: "1.1M" },
    { time: "CLOSE", h: 38, size: "2.3M" },
  ];

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        7.5M SHARES · SIZED TO MATCH THE VOLUME CURVE
      </div>

      <div className="flex h-10 items-end justify-between gap-2" style={fade(0)}>
        {clips.map((clip, i) => (
          <div key={clip.time} className="flex flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[8px] font-bold text-brand">{clip.size}</span>
            <div
              className="w-full rounded-md bg-brand"
              style={{ height: `${clip.h}px`, ...fade(80 * i) }}
            />
            <span className="text-[8px] font-semibold text-muted-foreground">{clip.time}</span>
          </div>
        ))}
      </div>

      <div className="my-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground" style={fade(450)}>
        LARGER CLIPS WHEN THE MARKET TRADES MORE
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(550)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">BENCHMARK: VOLUME</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">GOAL: BLEND IN</span>
      </div>
    </div>
  );
}

export { VwapIllustration };
