"use client";

import { motion } from "framer-motion";
import { Repeat } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { Eyebrow } from "@/components/ui/typography";

function FlywheelDiagram({ steps }: { steps: string[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const radius = 38;
  const center = 50;
  const circumference = 2 * Math.PI * radius;

  const points = steps.map((label, index) => {
    const angle = (-90 + (360 / steps.length) * index) * (Math.PI / 180);
    return {
      label,
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return (
    <div ref={ref} className="flex flex-col items-center gap-8">
      <Eyebrow className="text-brand">The Flywheel</Eyebrow>
      <div className="relative aspect-square w-full max-w-md">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <circle cx={center} cy={center} r={radius} fill="none" className="stroke-border" strokeWidth="0.5" />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            className="stroke-brand"
            strokeWidth="0.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: played ? 0 : circumference,
              transition: reducedMotion ? "none" : "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1) 200ms",
            }}
          />
        </svg>

        <motion.div
          className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/30"
          animate={played && !reducedMotion ? { rotate: 360 } : undefined}
          transition={played && !reducedMotion ? { duration: 14, repeat: Infinity, ease: "linear" } : undefined}
        >
          <Repeat className="size-6" />
        </motion.div>

        {points.map((point, index) => (
          <div
            key={point.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.3 + index * 0.12 }}
              className="block w-24 rounded-2xl border border-brand/20 bg-card px-2.5 py-2 text-center text-[11px] leading-tight font-medium shadow-sm sm:text-xs"
            >
              {point.label}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { FlywheelDiagram };
