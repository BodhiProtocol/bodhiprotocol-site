"use client";

import { motion } from "framer-motion";
import { Castle, Clapperboard, ShoppingBag, Sparkles, Tv } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const spokes = [
  { label: "Theme Parks", detail: "Outlives the box office by decades", icon: Castle, angle: -45 },
  { label: "Merchandise", detail: "A daily household presence", icon: ShoppingBag, angle: 45 },
  { label: "Sequels", detail: "Franchise maintenance, not just story", icon: Clapperboard, angle: 135 },
  { label: "Streaming", detail: "Keeps old IP earning forever", icon: Tv, angle: 225 },
];

function polarPoint(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
}

function DisneyFranchiseMachineDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const radius = 38;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Franchise Machine
      </span>

      <div className="relative aspect-square w-full max-w-sm self-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {spokes.map((spoke, index) => {
            const point = polarPoint(spoke.angle, radius);
            const length = Math.hypot(point.x - 50, point.y - 50);
            return (
              <line
                key={spoke.label}
                x1="50"
                y1="50"
                x2={point.x}
                y2={point.y}
                className="stroke-brand/40"
                strokeWidth="0.6"
                strokeLinecap="round"
                style={{
                  strokeDasharray: length,
                  strokeDashoffset: played ? 0 : length,
                  opacity: played ? 1 : 0,
                  animation:
                    played && !reducedMotion
                      ? `hub-glow 2.6s ease-in-out ${1.2 + index * 0.1}s infinite`
                      : "none",
                  transition: reducedMotion
                    ? "opacity 300ms ease"
                    : `stroke-dashoffset 0.6s cubic-bezier(.16,1,.3,1) ${0.2 + index * 0.1}s, opacity 300ms ease ${0.2 + index * 0.1}s`,
                }}
              />
            );
          })}
        </svg>

        <motion.div
          className="absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/25 sm:size-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Sparkles className="size-5 sm:size-6" />
          <span className="text-[9px] font-bold tracking-tight sm:text-[10px]">The Character</span>
        </motion.div>

        {spokes.map((spoke, index) => {
          const point = polarPoint(spoke.angle, radius);
          const Icon = spoke.icon;
          return (
            <motion.div
              key={spoke.label}
              className="absolute w-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-brand/20 bg-card px-2.5 py-2 text-center shadow-sm sm:w-28"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.4 + index * 0.12, ease: "easeOut" }}
            >
              <Icon className="mx-auto mb-1 size-4 text-brand" />
              <span className="block text-[10.5px] leading-tight font-semibold sm:text-xs">
                {spoke.label}
              </span>
              <span className="text-[9px] leading-tight text-muted-foreground sm:text-[10px]">
                {spoke.detail}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          One story, decades of revenue
        </span>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-background p-4 sm:p-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold">Box Office Weekend</span>
            <span className="text-muted-foreground">Fades in weeks</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-brand/25"
              initial={{ width: 0 }}
              animate={played ? { width: "18%" } : { width: 0 }}
              transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-brand">Franchise Revenue</span>
            <span className="text-muted-foreground">Compounds for decades</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={{ width: 0 }}
              animate={played ? { width: "95%" } : { width: 0 }}
              transition={{ duration: 0.9, delay: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { DisneyFranchiseMachineDiagram };
