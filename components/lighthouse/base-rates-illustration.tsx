"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function BaseRatesIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        INSIDE VIEW × OUTSIDE VIEW
      </div>

      <div className="flex flex-col gap-2">
        <div
          className="flex items-center justify-between rounded-lg border border-border bg-card px-2.5 py-2.5"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "translateY(0)" : "translateY(4px)",
            transition: reducedMotion ? "none" : "opacity 350ms ease 0ms, transform 350ms ease 0ms",
          }}
        >
          <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
            YOUR ESTIMATE
          </span>
          <span className="text-[11px] font-bold text-card-foreground">18 months</span>
        </div>

        <div
          className="flex items-center justify-between rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-2.5"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "translateY(0)" : "translateY(4px)",
            transition: reducedMotion ? "none" : "opacity 350ms ease 250ms, transform 350ms ease 250ms",
          }}
        >
          <span className="text-[9px] font-bold tracking-wide text-brand">BASE RATE (SIMILAR PROJECTS)</span>
          <span className="text-[11px] font-bold text-brand">34 months</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          YOUR STORY FEELS DIFFERENT
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">IT USUALLY ISN'T</span>
      </div>
    </div>
  );
}

export { BaseRatesIllustration };
