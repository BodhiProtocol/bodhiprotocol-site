"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rows = [
  { label: "If I Scratch It", own: "I pay for it", rental: "Insurance pays" },
  { label: "How I Drive", own: "Careful", rental: "Careless" },
];

function MoralHazardIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 grid grid-cols-[4.2rem_1fr_1fr] gap-2 text-[9px] font-bold tracking-wide">
        <span className="text-muted-foreground">SAME TRIP</span>
        <span className="text-center text-brand">OWN CAR</span>
        <span className="text-center text-rose-600 dark:text-rose-500">RENTAL CAR</span>
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
                : `opacity 350ms ease ${i * 220}ms, transform 350ms ease ${i * 220}ms`,
            }}
          >
            <span className="text-[9px] font-semibold text-card-foreground">{row.label}</span>
            <span className="text-center text-[9px] font-bold text-brand">{row.own}</span>
            <span className="text-center text-[9px] font-bold text-rose-600 dark:text-rose-500">
              {row.rental}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          SAME DRIVER
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">DIFFERENT STAKES</span>
      </div>
    </div>
  );
}

export { MoralHazardIllustration };
