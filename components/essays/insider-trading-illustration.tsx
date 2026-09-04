"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface Stage {
  label: string;
  badge?: string;
  badgeTone?: "brand" | "rose" | "neutral";
  roles?: { from: string; to: string };
}

const stages: Stage[] = [
  { label: "Board Learns Material Info", badge: "UPSI / MNPI CREATED", badgeTone: "neutral" },
  { label: "Duty Is Broken", roles: { from: "TIPPER", to: "TIPPEE" }, badgeTone: "rose" },
  { label: "Tippee Trades", badge: "BEFORE THE MARKET KNOWS", badgeTone: "rose" },
  { label: "Public Disclosure", badge: "MARKET FINALLY LEARNS", badgeTone: "brand" },
];

function InsiderTradingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        INSIDER TRADING · WHERE THE INFORMATION ACTUALLY WENT
      </div>

      <div className="flex flex-col">
        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1;
          const delay = i * 280;
          return (
            <div key={stage.label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className={
                    stage.badgeTone === "rose"
                      ? "mt-0.5 size-2.5 shrink-0 rounded-full bg-rose-600 dark:bg-rose-500"
                      : stage.badgeTone === "brand"
                        ? "mt-0.5 size-2.5 shrink-0 rounded-full bg-brand"
                        : "mt-0.5 size-2.5 shrink-0 rounded-full bg-card-foreground"
                  }
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
                    className={
                      i === 1 || i === 2
                        ? "w-px flex-1 bg-rose-600/40 dark:bg-rose-500/40"
                        : "w-px flex-1 bg-border"
                    }
                    style={{
                      opacity: played ? 1 : 0,
                      transition: reducedMotion ? "none" : `opacity 300ms ease ${delay + 120}ms`,
                    }}
                  />
                ) : null}
              </div>
              <div
                className="flex flex-1 flex-col gap-1.5 pb-3"
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "translateX(0)" : "translateX(-4px)",
                  transition: reducedMotion
                    ? "none"
                    : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
                }}
              >
                <span className="text-[10px] leading-snug font-semibold text-card-foreground">
                  {stage.label}
                </span>
                {stage.roles ? (
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
                      {stage.roles.from}
                    </span>
                    <span className="text-muted-foreground" aria-hidden="true">
                      →
                    </span>
                    <span className="rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
                      {stage.roles.to}
                    </span>
                  </div>
                ) : null}
                {stage.badge ? (
                  <span
                    className={
                      stage.badgeTone === "rose"
                        ? "w-fit rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500"
                        : stage.badgeTone === "brand"
                          ? "w-fit rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand"
                          : "w-fit rounded-full border border-border px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-muted-foreground"
                    }
                  >
                    {stage.badge}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          MATERIAL + NON-PUBLIC = UPSI/MNPI
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">TIPPER + TIPPEE = BOTH LIABLE</span>
      </div>
    </div>
  );
}

export { InsiderTradingIllustration };
