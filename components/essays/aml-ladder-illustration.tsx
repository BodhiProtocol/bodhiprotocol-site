"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rungs = [
  { term: "KYC", desc: "Verify identity at onboarding", fine: "Danske Bank · $2.0B" },
  { term: "CDD", desc: "Ongoing risk monitoring", fine: "ING Bank · €775M" },
  { term: "EDD", desc: "Escalated scrutiny — PEP, high-risk", fine: "HSBC · $1.9B" },
  { term: "SAR", desc: "Suspicious activity filed", fine: "US Bancorp · $613M" },
];

function AmlLadderIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        THE KYC ESCALATION LADDER
      </div>

      <div className="flex flex-col">
        {rungs.map((rung, i) => {
          const isLast = i === rungs.length - 1;
          const delay = i * 200;
          return (
            <div key={rung.term} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-brand-foreground"
                  style={{
                    opacity: played ? 1 : 0,
                    transform: played ? "scale(1)" : "scale(0)",
                    transition: reducedMotion
                      ? "none"
                      : `opacity 250ms ease ${delay}ms, transform 250ms cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
                  }}
                >
                  {i + 1}
                </span>
                {!isLast ? (
                  <span
                    className="w-px flex-1 bg-border"
                    style={{
                      opacity: played ? 1 : 0,
                      transition: reducedMotion ? "none" : `opacity 300ms ease ${delay + 120}ms`,
                    }}
                  />
                ) : null}
              </div>
              <div
                className="flex flex-1 items-center justify-between gap-2 pb-3"
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "translateX(0)" : "translateX(-4px)",
                  transition: reducedMotion
                    ? "none"
                    : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-card-foreground">{rung.term}</span>
                  <span className="text-[9px] leading-snug text-muted-foreground">{rung.desc}</span>
                </div>
                <span className="shrink-0 rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
                  {rung.fine}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          4 RUNGS, NOT SYNONYMS
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">REAL FINES, REAL STAKES</span>
      </div>
    </div>
  );
}

export { AmlLadderIllustration };
