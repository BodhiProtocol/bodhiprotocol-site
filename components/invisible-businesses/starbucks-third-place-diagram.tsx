"use client";

import { motion } from "framer-motion";
import { Briefcase, Coffee, Home, Star } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function FloatingArrow({
  played,
  reducedMotion,
  delay = 0,
}: {
  played: boolean;
  reducedMotion: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 12"
      className="h-3 w-8 shrink-0 text-brand/50 sm:w-10"
      animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 1 L34 6 L27 11" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}

function StarbucksThirdPlaceDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const starsEarned = 3;
  const starsTotal = 5;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Third Place
      </span>

      <div className="flex items-center justify-center gap-1 sm:gap-3">
        <motion.div
          className="flex w-20 flex-col items-center gap-1.5 text-center sm:w-24"
          initial={{ opacity: 0, y: 8 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand shadow-sm">
            <Home className="size-5" />
          </span>
          <span className="text-xs font-semibold sm:text-sm">Home</span>
        </motion.div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0} />

        <motion.div
          className="flex w-28 flex-col items-center gap-1.5 rounded-2xl border border-transparent bg-brand px-3 py-4 text-center text-brand-foreground shadow-lg shadow-brand/25 sm:w-36"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.15, ease: "easeOut" }}
        >
          <Coffee className="size-6" />
          <span className="text-xs font-bold tracking-tight sm:text-sm">Starbucks</span>
          <span className="text-[10px] text-brand-foreground/80">The consistent ritual</span>
        </motion.div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0.3} />

        <motion.div
          className="flex w-20 flex-col items-center gap-1.5 text-center sm:w-24"
          initial={{ opacity: 0, y: 8 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
        >
          <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand shadow-sm">
            <Briefcase className="size-5" />
          </span>
          <span className="text-xs font-semibold sm:text-sm">Work</span>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Frequency is the product
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-2xl bg-background p-4 sm:p-5">
        <span className="text-xs font-semibold sm:text-sm">2 more visits to your next free drink</span>
        <div className="flex gap-2">
          {Array.from({ length: starsTotal }).map((_, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.5 + index * 0.1 }}
            >
              <Star
                className={
                  index < starsEarned
                    ? "size-6 fill-brand text-brand"
                    : "size-6 text-muted-foreground/30"
                }
              />
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { StarbucksThirdPlaceDiagram };
