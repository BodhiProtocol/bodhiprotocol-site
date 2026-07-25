"use client";

import { motion } from "framer-motion";
import { Megaphone, Timer, UtensilsCrossed } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const listingRows = [
  { label: "Corner Kitchen", detail: "Rated 4.6 · 22 min", sponsored: false },
  { label: "Spice Route", detail: "Sponsored · Rated 4.4 · 28 min", sponsored: true },
  { label: "Green Bowl Co.", detail: "Rated 4.7 · 19 min", sponsored: false },
];

const marginBars = [
  { label: "Ride Take Rate", detail: "20-30% of the fare", widthPct: 27, tone: "muted" as const },
  {
    label: "Ad Revenue Margin",
    detail: "Near 100% — the screen already existed",
    widthPct: 92,
    tone: "brand" as const,
  },
];

function UberAdSlotDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-7 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Ad Slot
      </span>

      <div className="flex justify-center">
        <div className="flex w-full max-w-[280px] flex-col gap-3 rounded-[2rem] border border-border bg-background p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <Timer className="size-3.5 text-brand" />
              Arriving in
            </span>
            <span className="font-mono text-xs font-bold text-brand">3 min</span>
          </div>

          <div className="flex flex-col gap-2">
            {listingRows.map((row) => (
              <div
                key={row.label}
                className={
                  row.sponsored
                    ? "relative flex items-center justify-between overflow-hidden rounded-xl border border-brand/30 px-3 py-2"
                    : "flex items-center justify-between rounded-xl px-3 py-2"
                }
              >
                {row.sponsored ? (
                  <motion.span
                    className="absolute inset-0 bg-brand/10"
                    animate={played && !reducedMotion ? { opacity: [0.4, 0.9, 0.4] } : {}}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
                <span className="relative flex items-center gap-1.5 text-xs font-medium sm:text-sm">
                  <UtensilsCrossed className="size-3.5 text-muted-foreground" />
                  {row.label}
                </span>
                <span
                  className={
                    row.sponsored
                      ? "relative flex items-center gap-1 font-mono text-[10px] font-bold text-brand"
                      : "relative font-mono text-[10px] text-muted-foreground"
                  }
                >
                  {row.sponsored ? <Megaphone className="size-3" /> : null}
                  {row.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          A paying brand, same screen, higher position
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-background p-4 sm:p-5">
        {marginBars.map((bar, index) => (
          <div key={bar.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold sm:text-sm">{bar.label}</span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">{bar.detail}</span>
            </div>
            <div className="h-6 w-full overflow-hidden rounded-full bg-muted sm:h-7">
              <motion.div
                className={
                  bar.tone === "brand"
                    ? "h-full rounded-full bg-brand"
                    : "h-full rounded-full bg-brand/25"
                }
                initial={{ width: 0 }}
                animate={played ? { width: `${bar.widthPct}%` } : { width: 0 }}
                transition={{
                  duration: 0.8,
                  delay: reducedMotion ? 0 : 0.2 + index * 0.15,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { UberAdSlotDiagram };
