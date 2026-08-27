"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const steps = [
  { label: "Code Complete", badge: "FEELS DONE HERE" },
  { label: "Unit Tested" },
  { label: "Peer Reviewed" },
  { label: "Documented" },
  { label: "Deployable", badge: "ACTUALLY DONE HERE" },
];

function DefinitionOfDoneIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        ONE STORY, ONE CHECKLIST
      </div>

      <div className="flex flex-col">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const delay = i * 180;
          return (
            <div key={step.label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className="mt-0.5 flex size-2.5 shrink-0 items-center justify-center rounded-full bg-brand"
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
                      transition: reducedMotion ? "none" : `opacity 300ms ease ${delay + 100}ms`,
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
                <span className="text-[10px] leading-snug font-semibold text-card-foreground">
                  {step.label}
                </span>
                {step.badge ? (
                  <span className="shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand">
                    {step.badge}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          SAME BAR
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">EVERY STORY</span>
      </div>
    </div>
  );
}

export { DefinitionOfDoneIllustration };
