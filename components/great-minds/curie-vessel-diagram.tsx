"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Droplet, FlaskConical, Gem, Pickaxe, Scale, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Pickaxe,
  Droplet,
  FlaskConical,
  Gem,
  Scale,
};

// One consistent flask silhouette across all five vessels — only scale and
// fill-opacity change per Stage 3.5 ("one major visual change per vessel").
// Facet polygons are the one addition, layered on only from Crystallize on.
const VESSEL_SCALE = [1, 0.68, 0.45, 0.27, 0.16];
const FILL_OPACITY = [1, 0.7, 0.45, 0.25, 0.1];
const CRYSTALLIZE = 3;
const ISOLATE = 4;
const BASE_SIZE = 72; // px, before VESSEL_SCALE is applied

function VesselShape({ scale, fillOpacity, showFacets, solidFacet }: {
  scale: number;
  fillOpacity: number;
  showFacets: boolean;
  solidFacet: boolean;
}) {
  const size = BASE_SIZE * scale;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 50"
      aria-hidden="true"
      className="text-brand"
    >
      {/* neck */}
      <rect x="16" y="2" width="8" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* body */}
      <path
        d="M14 12 L10 30 Q10 42 20 42 Q30 42 30 30 L26 12 Z"
        fill="currentColor"
        fillOpacity={fillOpacity}
        stroke="currentColor"
        strokeWidth="1"
      />
      {showFacets ? (
        <g>
          <polygon
            points="16,32 20,27 24,32 20,37"
            fill="currentColor"
            fillOpacity={solidFacet ? 0.95 : 0.4}
          />
          {!solidFacet ? (
            <polygon points="22,35 25,32 27,36 24,39" fill="currentColor" fillOpacity={0.3} />
          ) : null}
        </g>
      ) : null}
    </svg>
  );
}

function CurieVesselDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const active = activeIndex !== null ? nodes[activeIndex] : null;

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full items-end justify-center gap-3 sm:gap-4">
        {nodes.map((node, index) => {
          const Icon = iconMap[node.icon] ?? FlaskConical;
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const delay = 0.15 + index * 0.14;

          return (
            <motion.button
              key={node.label}
              type="button"
              className="flex flex-col items-center gap-2 rounded-lg border border-transparent px-1 py-1.5 outline-none"
              initial={{ opacity: 0, x: -10 }}
              animate={played ? { opacity: isDimmed ? 0.4 : 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(isActive ? null : index)}
              aria-pressed={isActive}
              aria-describedby="curie-vessel-detail"
            >
              <VesselShape
                scale={VESSEL_SCALE[index]}
                fillOpacity={FILL_OPACITY[index]}
                showFacets={index >= CRYSTALLIZE}
                solidFacet={index === ISOLATE}
              />
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4" />
              </span>
              <span
                className={cn(
                  "font-mono text-[10px] font-semibold tracking-[0.08em] uppercase transition-colors sm:text-xs",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex w-full max-w-xs flex-col items-center gap-1.5 opacity-70">
        <svg viewBox="0 0 200 24" className="h-4 w-full max-w-[220px]" aria-hidden="true">
          <path
            d="M10 4 Q100 24 190 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
            className="text-brand/50"
          />
          <motion.circle
            r="2"
            fill="currentColor"
            className="text-brand"
            animate={played && !reducedMotion ? { cx: [10, 190, 10] } : { cx: 100 }}
            cy="12"
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <p className="text-center font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
          Refined over four years
        </p>
      </div>

      <div
        id="curie-vessel-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a vessel to see how it shaped her method."
          )}
        </p>
      </div>
    </div>
  );
}

export { CurieVesselDiagram };
