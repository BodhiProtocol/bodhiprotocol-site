"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function ImplementationShortfallIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  const rows = [
    { label: "Delay cost", value: "+ ₹1.20" },
    { label: "Execution cost", value: "+ ₹2.80" },
    { label: "Opportunity cost", value: "+ ₹1.60" },
    { label: "Fees & commissions", value: "+ ₹0.40" },
  ];

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="flex items-center justify-between" style={fade(0)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">DECISION PRICE</span>
        <span className="text-[10px] font-bold text-card-foreground">₹1,000.00</span>
      </div>

      <div className="my-2.5 flex flex-col gap-1.5">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-md border border-dashed border-border px-2 py-1"
            style={fade(120 * (i + 1))}
          >
            <span className="text-[9px] font-semibold text-muted-foreground">{row.label}</span>
            <span className="text-[9px] font-bold text-brand">{row.value}</span>
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-between rounded-md bg-brand px-2 py-1.5"
        style={fade(650)}
      >
        <span className="text-[9px] font-bold tracking-wide text-brand-foreground">TOTAL SHORTFALL</span>
        <span className="text-[10px] font-bold text-brand-foreground">₹6.00 / SHARE</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(750)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">DECISION → FILL</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">EVERY COST, ADDED UP</span>
      </div>
    </div>
  );
}

export { ImplementationShortfallIllustration };
