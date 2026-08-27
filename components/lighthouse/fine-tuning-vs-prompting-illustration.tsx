"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rows = [
  { label: "Speed", prompting: "Instant", tuning: "Hours to days" },
  { label: "Cost", prompting: "Cheap", tuning: "Expensive" },
  { label: "Reversible", prompting: "Yes, next message", tuning: "No, retrain again" },
];

function FineTuningVsPromptingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 grid grid-cols-[1fr_4.5rem_4.5rem] gap-2 text-[9px] font-bold tracking-wide">
        <span className="text-muted-foreground">CHANGE</span>
        <span className="text-center text-brand">PROMPTING</span>
        <span className="text-center text-muted-foreground">FINE-TUNING</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_4.5rem_4.5rem] items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 200}ms, transform 350ms ease ${i * 200}ms`,
            }}
          >
            <span className="text-[9px] font-semibold text-card-foreground">{row.label}</span>
            <span className="text-center text-[9px] font-bold text-brand">{row.prompting}</span>
            <span className="text-center text-[9px] font-semibold text-muted-foreground">
              {row.tuning}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          SAME MODEL
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">DIFFERENT DURABILITY</span>
      </div>
    </div>
  );
}

export { FineTuningVsPromptingIllustration };
