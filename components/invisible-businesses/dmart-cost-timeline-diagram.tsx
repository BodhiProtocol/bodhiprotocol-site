"use client";

import { motion } from "framer-motion";
import { Check, IndianRupee } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const years = ["Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5"] as const;

function DmartCostTimelineDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-8 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Rent Bill That Never Arrives
      </span>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            Leased Competitor
          </span>
          <div className="grid grid-cols-5 gap-2">
            {years.map((year, index) => (
              <motion.div
                key={year}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background px-2 py-3"
                initial={{ opacity: 0, y: 6 }}
                animate={played ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: reducedMotion ? 0 : index * 0.12 }}
              >
                <IndianRupee className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground">{year}</span>
                <span className="text-[9px] text-muted-foreground">Rent Due</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-brand uppercase">
            DMart (Owned)
          </span>
          <div className="grid grid-cols-5 gap-2">
            {years.map((year, index) => {
              const isFirstYear = index === 0;
              return (
                <motion.div
                  key={year}
                  className={
                    "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 " +
                    (isFirstYear ? "border-brand/30 bg-brand/10" : "border-border bg-background")
                  }
                  initial={{ opacity: 0, y: 6 }}
                  animate={played ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.6 + index * 0.12 }}
                >
                  {isFirstYear ? (
                    <>
                      <IndianRupee className="size-4 shrink-0 text-brand" />
                      <span className="text-[10px] font-semibold text-brand">{year}</span>
                      <span className="text-[9px] text-muted-foreground">Bought Outright</span>
                    </>
                  ) : (
                    <>
                      <Check className="size-4 shrink-0 text-muted-foreground/40" />
                      <span className="text-[10px] font-semibold text-muted-foreground">{year}</span>
                      <span className="text-[9px] text-muted-foreground">Nothing Due</span>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          One Bill, Not A Bill Every Year
        </span>
      </div>
    </div>
  );
}

export { DmartCostTimelineDiagram };
