"use client";

import { motion } from "framer-motion";
import { Flag, Percent, Search, Tag } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const hurdles = [
  { icon: Search, label: "Win The Search Ranking" },
  { icon: Tag, label: "Buy The Promotional Slot" },
  { icon: Percent, label: "Negotiate The Margin" },
] as const;

function NoiceShelfHurdlesDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-8 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Hurdles Noice Skips
      </span>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            Every Other Brand
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            {hurdles.map((hurdle, index) => {
              const Icon = hurdle.icon;
              return (
                <div key={hurdle.label} className="flex flex-1 items-center gap-2 sm:gap-3">
                  <motion.div
                    className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-border bg-background px-2 py-3 text-center"
                    initial={{ opacity: 0, y: 6 }}
                    animate={played ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.1 + index * 0.25 }}
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <span className="text-[10px] leading-tight font-semibold text-muted-foreground sm:text-[11px]">
                      {hurdle.label}
                    </span>
                  </motion.div>
                  {index < hurdles.length - 1 ? (
                    <span className="hidden text-muted-foreground/50 sm:block">→</span>
                  ) : null}
                </div>
              );
            })}
            <span className="hidden text-muted-foreground/50 sm:block">→</span>
            <div className="flex shrink-0 flex-col items-center gap-1.5 px-1">
              <Flag className="size-5 text-muted-foreground" />
              <span className="text-[10px] font-semibold text-muted-foreground">Listed</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-brand uppercase">
            Noice
          </span>
          <div className="relative flex items-center gap-3">
            <motion.div
              className="flex flex-1 items-center rounded-xl border border-brand/30 bg-brand/10 px-4 py-3.5"
              initial={{ opacity: 0 }}
              animate={played ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.9 }}
            >
              <motion.span
                className="text-xs font-semibold text-brand sm:text-sm"
                initial={{ opacity: 0, x: -8 }}
                animate={played ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : 1.1 }}
              >
                Already ranked, placed, and priced by the platform that owns the shelf
              </motion.span>
            </motion.div>
            <div className="flex shrink-0 flex-col items-center gap-1.5 px-1">
              <Flag className="size-5 text-brand" />
              <span className="text-[10px] font-semibold text-brand">Listed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Same Company, Every Lever
        </span>
      </div>
    </div>
  );
}

export { NoiceShelfHurdlesDiagram };
