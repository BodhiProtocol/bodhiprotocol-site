"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gem, TriangleAlert } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const CLAIMED_KARAT = 22.0;
const VERIFIED_KARAT = 19.8;

function useCountDown(from: number, to: number, played: boolean, reducedMotion: boolean, duration = 1800) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!played) return;
    if (reducedMotion) {
      setValue(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from - eased * (from - to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [played, reducedMotion, from, to, duration]);

  return value;
}

function TanishqPurityDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const reading = useCountDown(CLAIMED_KARAT, VERIFIED_KARAT, played, reducedMotion);
  const settled = Math.abs(reading - VERIFIED_KARAT) < 0.05;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Karatmeter Reading
      </span>

      <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-5 overflow-hidden rounded-2xl border border-brand/20 bg-card px-6 py-8">
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-brand/25 to-transparent"
          initial={{ top: "-15%" }}
          animate={played ? { top: reducedMotion ? "100%" : ["-15%", "100%"] } : { top: "-15%" }}
          transition={
            played && !reducedMotion
              ? { duration: 1.8, ease: "easeInOut" }
              : { duration: 0 }
          }
        />

        <div className="flex items-center gap-2">
          <Gem className="size-6 text-muted-foreground" />
          <span className="rounded-full border border-dashed border-muted-foreground/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            Sold as 22K
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-baseline gap-1 font-mono">
            <span
              className={`text-5xl font-bold tabular-nums transition-colors ${settled ? "text-brand" : "text-foreground"}`}
            >
              {reading.toFixed(1)}
            </span>
            <span className="text-xl font-semibold text-muted-foreground">K</span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Verified purity — three-minute reading
          </span>
        </div>

        <motion.div
          className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive"
          initial={{ opacity: 0, y: 4 }}
          animate={settled ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.3 }}
        >
          <TriangleAlert className="size-3.5" />
          ~10-12% below what was claimed
        </motion.div>
      </div>

      <div className="text-center text-xs text-muted-foreground sm:text-sm">
        When Tanishq let customers run their own family jewelry through the Karatmeter for free,
        gold sold elsewhere as 22 karat routinely read 19-20 karat — a real gap most owners had
        never had a way to see.
      </div>
    </div>
  );
}

export { TanishqPurityDiagram };
