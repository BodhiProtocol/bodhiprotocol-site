"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const months = Array.from({ length: 12 }, (_, i) => ({
  index: i + 1,
  signup: i === 0,
}));

function SubscriptionBillingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        ONE DECISION, TWELVE CHARGES
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {months.map((month, i) => (
          <div
            key={month.index}
            className={
              month.signup
                ? "flex flex-col items-center justify-center gap-0.5 rounded-lg border border-brand bg-brand/10 py-2"
                : "flex flex-col items-center justify-center gap-0.5 rounded-lg border border-border bg-card py-2"
            }
            style={{
              opacity: played ? (month.signup ? 1 : 0.55) : 0,
              transform: played ? "translateY(0)" : "translateY(4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 300ms ease ${i * 90}ms, transform 300ms ease ${i * 90}ms`,
            }}
          >
            <span
              className={
                month.signup
                  ? "text-[8px] font-bold text-brand"
                  : "text-[8px] font-semibold text-muted-foreground"
              }
            >
              {month.signup ? "SIGN UP" : `M${month.index}`}
            </span>
            <span
              className={
                month.signup
                  ? "text-[9px] font-bold text-brand"
                  : "text-[9px] font-semibold text-card-foreground"
              }
            >
              $12
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          12 CHARGES, NEVER SEEN TOGETHER
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">= $144, NEVER NOTICED</span>
      </div>
    </div>
  );
}

export { SubscriptionBillingIllustration };
