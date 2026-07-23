"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const topRow = [
  { label: "Do First", delay: 0 },
  { label: "Plan In", delay: 150 },
];

function PrioritizationIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        VALUE × EFFORT
      </div>

      <div className="grid grid-cols-[3.2rem_1fr_1fr] gap-1.5">
        <div />
        <span className="text-center text-[8px] font-bold tracking-wide text-muted-foreground">
          LOW EFFORT
        </span>
        <span className="text-center text-[8px] font-bold tracking-wide text-muted-foreground">
          HIGH EFFORT
        </span>

        <span className="flex items-center text-[8px] font-bold tracking-wide text-muted-foreground">
          HIGH VALUE
        </span>
        {topRow.map((cell) => (
          <div
            key={cell.label}
            className="rounded-lg border border-brand/30 bg-brand/10 px-2 py-2.5 text-center text-[10px] font-bold text-brand"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "scale(1)" : "scale(0.9)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${cell.delay}ms, transform 350ms cubic-bezier(.34,1.56,.64,1) ${cell.delay}ms`,
            }}
          >
            {cell.label}
          </div>
        ))}

        <span className="flex items-center text-[8px] font-bold tracking-wide text-muted-foreground">
          LOW VALUE
        </span>
        <div
          className="rounded-lg border border-border bg-card px-2 py-2.5 text-center text-[10px] font-bold text-muted-foreground"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "scale(1)" : "scale(0.9)",
            transition: reducedMotion
              ? "none"
              : "opacity 350ms ease 300ms, transform 350ms cubic-bezier(.34,1.56,.64,1) 300ms",
          }}
        >
          Quick Wins
        </div>
        <div
          className="rounded-lg border border-rose-600/30 bg-rose-600/10 px-2 py-2.5 text-center text-[10px] font-bold text-rose-600 dark:text-rose-500"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "scale(1)" : "scale(0.9)",
            transition: reducedMotion
              ? "none"
              : "opacity 350ms ease 450ms, transform 350ms cubic-bezier(.34,1.56,.64,1) 450ms",
          }}
        >
          Avoid
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          ARRIVAL ORDER ≠ PRIORITY
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">TRIAGE, NOT A QUEUE</span>
      </div>
    </div>
  );
}

export { PrioritizationIllustration };
