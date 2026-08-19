"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function CdsProtectionIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 flex items-center justify-between" style={fade(0)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          REFERENCE: NBFC BOND · ₹50CR
        </span>
        <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[8px] font-bold tracking-wide text-muted-foreground">
          SPREAD 280BPS
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {["Q1", "Q2", "Q3"].map((q, i) => (
          <div
            key={q}
            className="flex items-center justify-between rounded-md border border-dashed border-border px-2 py-1.5"
            style={fade(150 + i * 120)}
          >
            <span className="text-[9px] font-semibold text-muted-foreground">
              {q} PREMIUM · BUYER → SELLER
            </span>
            <span className="text-[9px] font-bold text-card-foreground">₹35L</span>
          </div>
        ))}
      </div>

      <div
        className="my-2.5 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wide text-muted-foreground"
        style={fade(600)}
      >
        NO CREDIT EVENT → NOTHING ELSE EVER MOVES
      </div>

      <div className="border-t border-dashed border-border pt-2.5" style={fade(750)}>
        <div className="mb-1.5 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wide text-brand">
          IF CREDIT EVENT ↓
        </div>
        <div className="flex items-center justify-between rounded-md bg-brand px-2 py-1.5">
          <span className="text-[9px] font-bold tracking-wide text-brand-foreground">
            SELLER → BUYER · ONE PAYMENT
          </span>
          <span className="text-[10px] font-bold text-brand-foreground">₹30CR</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5" style={fade(900)}>
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">BOND: NEVER SOLD</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">RISK: TRANSFERRED ANYWAY</span>
      </div>
    </div>
  );
}

export { CdsProtectionIllustration };
