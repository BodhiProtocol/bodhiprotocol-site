"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Fingerprint, Globe, Shuffle, Sparkles, Waves, Zap, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Waves,
  Sparkles,
  Shuffle,
  Fingerprint,
  Globe,
};

// The physical event itself, not a biography timeline: one incident beam hits
// a molecule and splits into two outcomes at wildly different odds — the
// overwhelming majority scatters back unchanged (Rayleigh), while roughly one
// photon in ten million comes back shifted, carrying the molecule's own
// vibrational signature (Raman). The looping "majority" photon animates every
// cycle; the fainter "shifted" photon only makes the trip once every few
// cycles, so the animation's own rarity mirrors the physics rather than just
// illustrating it. Distinct from Curie's single-track refinement (one sample,
// getting purer) and Bhabha's relay (one pellet, staged handoffs) — here two
// outcomes exist simultaneously from the same event, at very unequal odds.
const MAJORITY_CYCLE = 2.6;
const MINORITY_PERIOD = MAJORITY_CYCLE * 4;

function RamanScatterDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  // Hover is ephemeral; a click pins independently of it — reading a click's
  // toggle off the same activeIndex a mouseenter had just set would race,
  // since every click is necessarily preceded by a mouseenter, and the very
  // first click on any node would silently cancel itself back out.
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative w-full max-w-2xl">
        <svg viewBox="0 0 700 170" className="h-auto w-full overflow-visible" aria-hidden="true">
          {/* incident beam */}
          <line x1="30" y1="70" x2="330" y2="70" strokeWidth="1.5" className="stroke-brand/25" />

          {/* elastic majority ray — unchanged wavelength */}
          <line x1="330" y1="70" x2="650" y2="70" strokeWidth="2" className="stroke-brand/45" />
          <line x1="644" y1="58" x2="644" y2="82" strokeWidth="2" className="stroke-brand/45" />

          {/* shifted minority ray — the Raman line */}
          <line
            x1="330"
            y1="70"
            x2="650"
            y2="132"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            className="stroke-brand/70"
          />
          {/* spectral fingerprint glyph at the shifted ray's end */}
          <g className="stroke-brand/70" strokeWidth="2" strokeLinecap="round">
            <line x1="632" y1="126" x2="632" y2="140" />
            <line x1="639" y1="120" x2="639" y2="144" />
            <line x1="646" y1="129" x2="646" y2="137" />
            <line x1="653" y1="117" x2="653" y2="147" />
          </g>

          {/* molecule at the scattering point */}
          {!reducedMotion ? (
            <motion.circle
              cx="330"
              cy="70"
              r="5"
              className="fill-brand"
              animate={played ? { r: [5, 7, 5] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <circle cx="330" cy="70" r="5" className="fill-brand" />
          )}
          <circle cx="330" cy="70" r="12" fill="none" strokeWidth="1" className="stroke-brand/20" />

          {!reducedMotion ? (
            <>
              {/* frequent particle: incident beam into the elastic majority ray */}
              <motion.circle
                r="3.5"
                className="fill-brand"
                animate={
                  played
                    ? {
                        cx: [30, 330, 330, 650],
                        cy: 70,
                        opacity: [0, 1, 1, 1, 0],
                      }
                    : {}
                }
                transition={{ duration: MAJORITY_CYCLE, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
              />
              {/* rare particle: the same beam, once every few cycles, exits shifted */}
              <motion.circle
                r="3"
                className="fill-brand/70"
                animate={
                  played
                    ? {
                        cx: [30, 330, 330, 650],
                        cy: [70, 70, 70, 132],
                        opacity: [0, 0.9, 0.9, 0.9, 0],
                      }
                    : {}
                }
                transition={{
                  duration: MAJORITY_CYCLE,
                  repeat: Infinity,
                  repeatDelay: MINORITY_PERIOD - MAJORITY_CYCLE,
                  ease: "easeInOut",
                }}
              />
            </>
          ) : null}
        </svg>
      </div>

      <div className="flex w-full flex-wrap items-start justify-center gap-x-1 gap-y-4">
        {nodes.map((node, index) => {
          const Icon = iconMap[node.icon] ?? Sparkles;
          const isActive = activeIndex === index;
          const entranceDelay = 0.15 + index * 0.1;

          return (
            <motion.button
              key={node.label}
              type="button"
              className="flex w-20 flex-col items-center gap-2 rounded-lg border border-transparent px-1 py-1.5 text-center outline-none sm:w-24"
              initial={{ opacity: 0, y: 10 }}
              animate={played ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => setPinnedIndex((current) => (current === index ? null : index))}
              aria-pressed={isActive}
              aria-describedby="raman-scatter-detail"
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/25 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-4.5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] leading-tight font-semibold tracking-[0.05em] uppercase transition-colors",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="raman-scatter-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to follow one photon from incident beam to spectral fingerprint."
          )}
        </p>
      </div>
    </div>
  );
}

export { RamanScatterDiagram };
