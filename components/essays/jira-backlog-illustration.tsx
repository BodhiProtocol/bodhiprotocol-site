"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const stages = [
  { label: "BACKLOG", count: 240, width: 100 },
  { label: "GROOMED", count: 90, width: 62 },
  { label: "READY", count: 22, width: 30 },
  { label: "IN SPRINT", count: 18, width: 24 },
  { label: "DONE", count: 14, width: 18 },
];

const bottleneckIndex = 1;

function JiraBacklogIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        TICKET FUNNEL · ONE SPRINT
      </div>

      <div className="flex flex-col gap-2">
        {stages.map((stage, i) => {
          const isBottleneck = i === bottleneckIndex;
          return (
            <div key={stage.label} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-[9px] font-bold tracking-wide text-muted-foreground">
                {stage.label}
              </span>
              <div className="h-4 flex-1 overflow-hidden rounded-sm bg-card">
                <div
                  className={
                    isBottleneck ? "h-full rounded-sm bg-brand" : "h-full rounded-sm bg-brand/30"
                  }
                  style={{
                    width: played ? `${stage.width}%` : "0%",
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
                {stage.count}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">240 ENTERED</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">
          76% STALL AT GROOMED → READY
        </span>
      </div>
    </div>
  );
}

export { JiraBacklogIllustration };
