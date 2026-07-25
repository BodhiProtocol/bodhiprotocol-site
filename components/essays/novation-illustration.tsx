"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function NovationIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        ONE TRADE · BEFORE & AFTER NOVATION
      </div>

      <div className="flex flex-col gap-2" style={fade(0)}>
        <div className="mb-1 text-[9px] font-bold tracking-wide text-muted-foreground">BEFORE</div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[10px] font-semibold text-card-foreground">
            Buyer
          </span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 text-[8px] font-bold tracking-wide text-muted-foreground">
            BILATERAL RISK
          </span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[10px] font-semibold text-card-foreground">
            Seller
          </span>
        </div>
      </div>

      <div className="my-3 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wide text-brand" style={fade(150)}>
        CLEARINGHOUSE STEPS IN ↓
      </div>

      <div className="flex flex-col gap-2" style={fade(300)}>
        <div className="mb-1 text-[9px] font-bold tracking-wide text-muted-foreground">AFTER</div>
        <div className="flex items-center justify-between gap-1.5">
          <span className="rounded-lg border border-border bg-card px-2 py-1.5 text-[10px] font-semibold text-card-foreground">
            Buyer
          </span>
          <span className="flex-1 border-t border-border" />
          <span className="shrink-0 rounded-full bg-brand px-2 py-1 text-[9px] font-bold tracking-wide text-brand-foreground">
            Clearinghouse
          </span>
          <span className="flex-1 border-t border-border" />
          <span className="rounded-lg border border-border bg-card px-2 py-1.5 text-[10px] font-semibold text-card-foreground">
            Seller
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">1 CONTRACT → 2</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">RISK: MUTUALIZED</span>
      </div>
    </div>
  );
}

export { NovationIllustration };
