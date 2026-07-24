"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rows = [
  { label: "Reversibility", type1: "One-way", type2: "Two-way" },
  { label: "Speed", type1: "Slow, careful", type2: "Fast, delegate" },
  { label: "Who Decides", type1: "Group consensus", type2: "One person" },
];

function ReversibleDecisionsIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 grid grid-cols-[4.2rem_1fr_1fr] gap-2 text-[9px] font-bold tracking-wide">
        <span className="text-muted-foreground">DOOR</span>
        <span className="text-center text-rose-600 dark:text-rose-500">TYPE 1</span>
        <span className="text-center text-brand">TYPE 2</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="grid grid-cols-[4.2rem_1fr_1fr] items-center gap-2 rounded-lg border border-border bg-card px-2 py-2"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 200}ms, transform 350ms ease ${i * 200}ms`,
            }}
          >
            <span className="text-[9px] font-semibold text-card-foreground">{row.label}</span>
            <span className="text-center text-[9px] font-bold text-rose-600 dark:text-rose-500">
              {row.type1}
            </span>
            <span className="text-center text-[9px] font-bold text-brand">{row.type2}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">NO WAY BACK</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">JUST WALK BACK THROUGH</span>
      </div>
    </div>
  );
}

export { ReversibleDecisionsIllustration };
