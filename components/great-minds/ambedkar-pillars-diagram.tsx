"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Landmark, Scale, ShieldCheck, Users, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  ShieldCheck,
  Compass,
  Landmark,
  Users,
};

const BEAM_Y = 16;
const GROUND_Y = 58;
const START_X = 14;
const END_X = 86;

function pillarX(index: number, count: number) {
  return START_X + ((END_X - START_X) / (count - 1)) * index;
}

// A literal load-bearing structure, not a wheel or a chain: one beam,
// resting on five vertical pillars planted in a common foundation. Every
// other Great Minds diagram traces a sequence or a set of relationships;
// this one exists to show a single structure standing on several
// independent supports at once — remove any one pillar in the copy below
// and the beam above it has nothing left to rest on.
function AmbedkarPillarsDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const pillars = nodes.map((node, index) => ({ ...node, index, x: pillarX(index, nodes.length) }));

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/70] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full overflow-visible">
          {/* Foundation — the Preamble, everything else rests on it. */}
          <motion.line
            x1={START_X - 5}
            y1={GROUND_Y}
            x2={END_X + 5}
            y2={GROUND_Y}
            strokeWidth={1}
            className="stroke-brand/40"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeInOut" }}
          />

          {/* The pillars themselves. */}
          {pillars.map((pillar) => {
            const isActive = activeIndex === pillar.index;
            return (
              <motion.line
                key={`pillar-${pillar.label}`}
                x1={pillar.x}
                y1={BEAM_Y}
                x2={pillar.x}
                y2={GROUND_Y}
                strokeWidth={isActive ? 3 : 2}
                strokeLinecap="round"
                className={cn("transition-[stroke-width] duration-200", isActive ? "stroke-brand" : "stroke-brand/40")}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.5 + pillar.index * 0.15 }}
              />
            );
          })}

          {/* The beam — settles into place once the last pillar has risen,
              a single entrance flourish rather than a continuous loop, since
              the structure is meant to be static once built. */}
          <motion.line
            x1={START_X}
            y1={BEAM_Y}
            x2={END_X}
            y2={BEAM_Y}
            strokeWidth={2.5}
            strokeLinecap="round"
            className="stroke-brand"
            initial={{ opacity: 0, y: -4 }}
            animate={played ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 1.3, ease: "easeOut" }}
          />
        </svg>

        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ top: `${((BEAM_Y - 10) / 70) * 100}%` }}
        >
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            The Constitution
          </span>
        </div>

        {pillars.map((pillar) => {
          const Icon = iconMap[pillar.icon] ?? Scale;
          const isActive = activeIndex === pillar.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.6 + pillar.index * 0.15;
          return (
            <motion.button
              key={pillar.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${pillar.x}%`, top: `${((GROUND_Y - 12) / 70) * 100}%` }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => setHoverIndex(pillar.index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(pillar.index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => handleClick(pillar.index)}
              aria-pressed={isActive}
              aria-describedby="ambedkar-pillars-detail"
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
                  "font-mono text-[7px] leading-tight font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[8px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {pillar.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="ambedkar-pillars-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a pillar to see what the beam above it loses if that pillar isn't there."
          )}
        </p>
      </div>
    </div>
  );
}

export { AmbedkarPillarsDiagram };
