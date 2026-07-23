"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const cells = [
  { label: "Deserved Win", tone: "brand" as const },
  { label: "Bad Beat", tone: "brand" as const },
  { label: "Dumb Luck", tone: "rose" as const },
  { label: "Deserved Loss", tone: "rose" as const },
];

function DecisionOutcomeGridIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        DECISION QUALITY × OUTCOME
      </div>

      <div className="grid grid-cols-[3.2rem_1fr_1fr] gap-1.5">
        <div />
        <span className="text-center text-[8px] font-bold tracking-wide text-muted-foreground">
          GOOD OUTCOME
        </span>
        <span className="text-center text-[8px] font-bold tracking-wide text-muted-foreground">
          BAD OUTCOME
        </span>

        <span className="flex items-center text-[8px] font-bold tracking-wide text-muted-foreground">
          GOOD CALL
        </span>
        {cells.slice(0, 2).map((cell, i) => (
          <div
            key={cell.label}
            className={
              cell.tone === "brand"
                ? "rounded-lg border border-brand/30 bg-brand/10 px-2 py-2.5 text-center text-[10px] font-bold text-brand"
                : "rounded-lg border border-rose-600/30 bg-rose-600/10 px-2 py-2.5 text-center text-[10px] font-bold text-rose-600 dark:text-rose-500"
            }
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "scale(1)" : "scale(0.9)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 150}ms, transform 350ms cubic-bezier(.34,1.56,.64,1) ${i * 150}ms`,
            }}
          >
            {cell.label}
          </div>
        ))}

        <span className="flex items-center text-[8px] font-bold tracking-wide text-muted-foreground">
          BAD CALL
        </span>
        {cells.slice(2, 4).map((cell, i) => (
          <div
            key={cell.label}
            className={
              cell.tone === "brand"
                ? "rounded-lg border border-brand/30 bg-brand/10 px-2 py-2.5 text-center text-[10px] font-bold text-brand"
                : "rounded-lg border border-rose-600/30 bg-rose-600/10 px-2 py-2.5 text-center text-[10px] font-bold text-rose-600 dark:text-rose-500"
            }
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "scale(1)" : "scale(0.9)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${(i + 2) * 150}ms, transform 350ms cubic-bezier(.34,1.56,.64,1) ${(i + 2) * 150}ms`,
            }}
          >
            {cell.label}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          2 OF 4 GET MISJUDGED
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">GRADE THE PROCESS</span>
      </div>
    </div>
  );
}

export { DecisionOutcomeGridIllustration };
