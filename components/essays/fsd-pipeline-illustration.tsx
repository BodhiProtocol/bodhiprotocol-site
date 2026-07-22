"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface Stage {
  label: string;
  sub?: string[];
  badge?: string;
}

const stages: Stage[] = [
  { label: "Ticket Created" },
  { label: "3 Agents Fan Out", sub: ["Requirement", "Context", "Knowledge"] },
  { label: "FSD Drafted" },
  { label: "Structure + Semantic Review", badge: "≤2 RETRIES" },
  { label: "Test Cases → Jira" },
];

function FsdPipelineIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        TICKET → TESTED · PIPELINE
      </div>

      <div className="flex flex-col">
        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1;
          const delay = i * 200;
          return (
            <div key={stage.label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className="mt-0.5 size-2.5 shrink-0 rounded-full bg-brand"
                  style={{
                    opacity: played ? 1 : 0,
                    transform: played ? "scale(1)" : "scale(0)",
                    transition: reducedMotion
                      ? "none"
                      : `opacity 250ms ease ${delay}ms, transform 250ms cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
                  }}
                />
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
                className="flex flex-1 flex-col gap-1.5 pb-3"
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "translateX(0)" : "translateX(-4px)",
                  transition: reducedMotion
                    ? "none"
                    : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] leading-snug font-semibold text-card-foreground">
                    {stage.label}
                  </span>
                  {stage.badge ? (
                    <span className="shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand">
                      {stage.badge}
                    </span>
                  ) : null}
                </div>
                {stage.sub ? (
                  <div className="flex flex-wrap gap-1.5">
                    {stage.sub.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-border bg-card px-1.5 py-0.5 text-[9px] font-semibold text-card-foreground"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          2 REVIEW GATES
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">SHARED RETRY BUDGET</span>
      </div>
    </div>
  );
}

export { FsdPipelineIllustration };
