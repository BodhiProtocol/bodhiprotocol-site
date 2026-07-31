"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function TwapIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  const clips = ["10:00", "11:00", "12:00", "13:00", "14:00"];

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        10M SHARES · SLICED INTO 5 EQUAL CLIPS
      </div>

      <div className="flex items-end justify-between gap-2" style={fade(0)}>
        {clips.map((time, i) => (
          <div key={time} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[8px] font-bold text-brand">2M</span>
            <div className="h-10 w-full rounded-md bg-brand" style={fade(80 * i)} />
            <span className="text-[8px] font-semibold text-muted-foreground">{time}</span>
          </div>
        ))}
      </div>

      <div className="my-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground" style={fade(450)}>
        SAME SIZE, EVERY CLIP — REGARDLESS OF MARKET VOLUME
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(550)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">BENCHMARK: TIME</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">FOOTPRINT: PREDICTABLE</span>
      </div>
    </div>
  );
}

export { TwapIllustration };
