"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const cooks = [
  { label: "COOK 1", added: 40, width: 100 },
  { label: "COOK 2", added: 32, width: 80 },
  { label: "COOK 3", added: 20, width: 50 },
  { label: "COOK 4", added: 8, width: 20 },
  { label: "COOK 5", added: 2, width: 5 },
];

function DiminishingReturnsIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        MARGINAL OUTPUT ADDED · SAME KITCHEN
      </div>

      <div className="flex flex-col gap-2">
        {cooks.map((cook, i) => (
          <div key={cook.label} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[9px] font-bold tracking-wide text-muted-foreground">
              {cook.label}
            </span>
            <div className="h-4 flex-1 overflow-hidden rounded-sm bg-card">
              <div
                className="h-full rounded-sm bg-brand"
                style={{
                  width: played ? `${cook.width}%` : "0%",
                  transition: reducedMotion
                    ? "none"
                    : `width 500ms cubic-bezier(.16,1,.3,1) ${i * 150}ms`,
                }}
              />
            </div>
            <span
              className="w-8 shrink-0 text-right text-[10px] font-semibold text-card-foreground"
              style={{
                opacity: played ? 1 : 0,
                transition: reducedMotion ? "none" : `opacity 300ms ease ${i * 150 + 300}ms`,
              }}
            >
              +{cook.added}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          SAME INPUT EACH TIME
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">SHRINKING PAYOFF</span>
      </div>
    </div>
  );
}

export { DiminishingReturnsIllustration };
