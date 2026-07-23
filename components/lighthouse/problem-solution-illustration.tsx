"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface Stage {
  label: string;
  sub?: string;
  badge?: string;
}

const stages: Stage[] = [
  { label: "Request Arrives", sub: "“We need a dashboard”" },
  { label: "Ask: What's the Problem?", badge: "OFTEN SKIPPED" },
  { label: "Right Fix Chosen" },
];

function ProblemSolutionIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        REQUEST TO RIGHT FIX
      </div>

      <div className="flex flex-col">
        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1;
          const delay = i * 220;
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
                className="flex flex-1 flex-col gap-1 pb-3"
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
                    <span className="shrink-0 rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
                      {stage.badge}
                    </span>
                  ) : null}
                </div>
                {stage.sub ? (
                  <span className="text-[9px] text-muted-foreground">{stage.sub}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          REQUESTS SKIP THIS STEP
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">PROBLEM FIRST, ALWAYS</span>
      </div>
    </div>
  );
}

export { ProblemSolutionIllustration };
