"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Handshake, Shield, Swords, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Swords,
  Handshake,
  Shield,
  HeartHandshake,
};

// Ring radius (SVG viewBox units) and a fixed compass angle per ring index —
// each ring's label sits at a different cardinal point so all four stay
// legible at once instead of stacking on top of each other at one angle.
const RING_RADII = [18, 28, 38, 46];
const RING_ANGLES = [-90, 0, 90, 180]; // top, right, bottom, left

function ChanakyaMandalaDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const center = 50;
  const active = activeIndex !== null ? nodes[activeIndex] : null;

  const rings = nodes.map((node, index) => {
    const radius = RING_RADII[index] ?? RING_RADII[RING_RADII.length - 1];
    const angle = (RING_ANGLES[index] ?? 0) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    // Alternate ring styling between rival (solid) and ally (dashed) —
    // conveyed by stroke pattern, not a second hue, to stay within the
    // site's single-accent brand color.
    const isRival = index % 2 === 0;
    return { ...node, index, radius, x, y, isRival };
  });

  function handleEnter(index: number) {
    setActiveIndex(index);
  }
  function handleLeave() {
    setActiveIndex(null);
  }
  function handleClick(index: number) {
    setActiveIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {rings.map((ring) => {
            const isActive = activeIndex === ring.index;
            const isDimmed = activeIndex !== null && !isActive;
            return (
              <motion.circle
                key={ring.label}
                cx={center}
                cy={center}
                r={ring.radius}
                fill="none"
                strokeDasharray={ring.isRival ? undefined : "2.5 2.5"}
                className="stroke-brand"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: !played ? 0 : isDimmed ? 0.15 : isActive ? 0.7 : 0.35,
                  strokeWidth: isActive ? 0.8 : 0.4,
                }}
                transition={{
                  opacity: { duration: 0.4, delay: reducedMotion ? 0 : 0.15 + ring.index * 0.12 },
                  strokeWidth: { duration: 0.2, ease: "easeOut" },
                }}
              />
            );
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-20"
        >
          <span className="font-serif text-base font-medium tracking-tight text-brand sm:text-xl">CK</span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            Self
          </span>
        </motion.div>

        {rings.map((ring) => {
          const Icon = iconMap[ring.icon] ?? Shield;
          const isActive = activeIndex === ring.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.2 + ring.index * 0.12;
          return (
            <motion.button
              key={ring.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${ring.x}%`, top: `${ring.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => handleEnter(ring.index)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(ring.index)}
              onBlur={handleLeave}
              onClick={() => handleClick(ring.index)}
              aria-pressed={isActive}
              aria-describedby="mandala-ring-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {ring.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="mandala-ring-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a ring to see how it shaped his thinking."
          )}
        </p>
      </div>
    </div>
  );
}

export { ChanakyaMandalaDiagram };
