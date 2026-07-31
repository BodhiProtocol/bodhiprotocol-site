"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function SniperIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  const beats = ["WAIT", "WAIT", "WAIT", "WAIT", "FIRE", "WAIT"];

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        DORMANT UNTIL THE TRIGGER CONDITION APPEARS
      </div>

      <div className="flex items-center justify-between gap-1.5" style={fade(0)}>
        {beats.map((beat, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5" style={fade(90 * i)}>
            <div
              className={
                beat === "FIRE"
                  ? "flex h-8 w-full items-center justify-center rounded-md bg-brand text-[9px] font-bold text-brand-foreground"
                  : "flex h-8 w-full items-center justify-center rounded-md border border-dashed border-border text-[8px] font-semibold text-muted-foreground"
              }
            >
              {beat === "FIRE" ? "⚡" : "·"}
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 text-center text-[9px] font-bold tracking-wide text-brand" style={fade(550)}>
        NO FOOTPRINT, THEN ONE DECISIVE FILL
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(650)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">ACTIVITY: DORMANT</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">TIMING: OPPORTUNISTIC</span>
      </div>
    </div>
  );
}

export { SniperIllustration };
