"use client";

import { motion } from "framer-motion";
import { Building2, Eye, Lock, Network, Smartphone } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function FloatingArrow({
  played,
  reducedMotion,
  delay = 0,
  vertical = false,
}: {
  played: boolean;
  reducedMotion: boolean;
  delay?: number;
  vertical?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 12"
      className={
        vertical
          ? "h-8 w-3 shrink-0 rotate-90 text-brand/50 sm:h-10 sm:w-3"
          : "h-3 w-8 shrink-0 text-brand/50 sm:w-10"
      }
      animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 1 L34 6 L27 11" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}

function CitadelOrderForkDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        Two Paths From One Order
      </span>

      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="flex w-32 flex-col items-center gap-1.5 rounded-2xl border border-border bg-card px-3 py-4 text-center shadow-sm sm:w-40"
          initial={{ opacity: 0, y: -6 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Smartphone className="size-5 text-muted-foreground" />
          <span className="text-xs font-semibold sm:text-sm">Your Order</span>
          <span className="text-[10px] leading-tight text-muted-foreground">
            &ldquo;Buy&rdquo;, tapped on a free trading app
          </span>
        </motion.div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0} vertical />

        <div className="grid w-full gap-3 sm:grid-cols-2">
          <motion.div
            className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-background/60 px-3 py-5 text-center opacity-70"
            initial={{ opacity: 0, y: 8 }}
            animate={played ? { opacity: 0.7, y: 0 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <span className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
              <Network className="size-5" />
            </span>
            <span className="text-xs font-semibold sm:text-sm">The Exchange</span>
            <span className="flex items-center gap-1 text-[10px] leading-tight text-muted-foreground">
              <Eye className="size-3 shrink-0" />
              Public book. Anyone can see it, anyone can hit it.
            </span>
            <span className="mt-1 rounded-full bg-muted px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-muted-foreground uppercase">
              The path almost never taken
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-2 rounded-2xl border border-transparent bg-brand px-3 py-5 text-center text-brand-foreground shadow-lg shadow-brand/25"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={played ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-foreground/15">
              <Building2 className="size-5" />
            </span>
            <span className="text-xs font-bold sm:text-sm">Citadel Securities</span>
            <span className="flex items-center gap-1 text-[10px] leading-tight opacity-90">
              <Lock className="size-3 shrink-0" />
              One dealer, one client. No public book.
            </span>
            <span className="mt-1 rounded-full bg-brand-foreground/15 px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-wide uppercase">
              ~40% of retail orders, most days
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The exchange is the road not taken
        </span>
      </div>
    </div>
  );
}

export { CitadelOrderForkDiagram };
