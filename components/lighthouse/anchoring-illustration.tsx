"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const trials = [
  { wheel: "65", estimate: "45%" },
  { wheel: "10", estimate: "25%" },
];

function AnchoringIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 grid grid-cols-[1fr_1fr_1fr] gap-2 text-[9px] font-bold tracking-wide text-muted-foreground">
        <span>GROUP</span>
        <span className="text-center">WHEEL SHOWED</span>
        <span className="text-center text-brand">ESTIMATE GIVEN</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {trials.map((trial, i) => (
          <div
            key={trial.wheel}
            className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 rounded-lg border border-border bg-card px-2 py-2"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 250}ms, transform 350ms ease ${i * 250}ms`,
            }}
          >
            <span className="text-[9px] font-semibold text-card-foreground">
              {i === 0 ? "A" : "B"}
            </span>
            <span className="text-center text-[10px] font-bold text-muted-foreground">
              {trial.wheel}
            </span>
            <span className="text-center text-[10px] font-bold text-brand">{trial.estimate}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          RANDOM NUMBER
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">MOVED THE ANSWER ANYWAY</span>
      </div>
    </div>
  );
}

export { AnchoringIllustration };
