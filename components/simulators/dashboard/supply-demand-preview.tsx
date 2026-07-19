"use client";

import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function SupplyDemandPreview() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const pathLength = 100;

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full max-w-[220px]">
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full overflow-visible">
        <line x1="8" y1="4" x2="8" y2="68" stroke="var(--color-border)" strokeWidth="1" />
        <line x1="8" y1="68" x2="96" y2="68" stroke="var(--color-border)" strokeWidth="1" />

        <line
          x1="10"
          y1="10"
          x2="90"
          y2="60"
          stroke="var(--color-destructive)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: played ? 0 : pathLength,
            transition: reducedMotion
              ? "opacity 300ms ease"
              : `stroke-dashoffset 0.9s cubic-bezier(.16,1,.3,1) 0.1s`,
          }}
        />
        <line
          x1="10"
          y1="60"
          x2="90"
          y2="10"
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: played ? 0 : pathLength,
            transition: reducedMotion
              ? "opacity 300ms ease"
              : `stroke-dashoffset 0.9s cubic-bezier(.16,1,.3,1) 0.3s`,
          }}
        />
        <motion.circle
          cx="50"
          cy="35"
          r="2.5"
          className="fill-brand"
          initial={{ opacity: 0, scale: 0 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 1 }}
          style={{
            transformOrigin: "50px 35px",
            animation: played && !reducedMotion ? "hub-glow 2.6s ease-in-out 1.3s infinite" : "none",
          }}
        />
      </svg>
    </div>
  );
}

export { SupplyDemandPreview };
