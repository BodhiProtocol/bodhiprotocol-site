"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowDown, CheckCircle2, RotateCw, ShieldCheck, Target, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Target,
  RotateCw,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
};

// Unlike Gates' one-directional funnel, inversion fans a single question OUT
// into every way it could fail, then narrows back down to one surviving
// decision — so the diagram is a lens/diamond (narrow, wide, narrow), not a
// taper. Node widths trace that same narrow-wide-narrow shape.
const CATALOG = 2;
const NODE_WIDTHS = ["50%", "74%", "96%", "74%", "50%"];

function MungerInversionDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  // Hover is ephemeral; a click pins independently of it — reading a click's
  // toggle off the same activeIndex a mouseenter had just set would race,
  // since every click is necessarily preceded by a mouseenter, and the very
  // first click on any node would silently cancel itself back out.
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const isCataloging = activeIndex === CATALOG;
  const stateTransition = { duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" as const };

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md">
        <svg viewBox="0 0 100 110" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {/* Lens outline — narrow top point, wide waist, narrow bottom point */}
          <motion.g
            className="text-brand"
            initial={false}
            animate={{ opacity: played ? 0.3 : 0 }}
            transition={stateTransition}
          >
            <line x1={50} y1={8} x2={92} y2={55} stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 2" />
            <line x1={92} y1={55} x2={50} y2={102} stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 2" />
            <line x1={50} y1={102} x2={8} y2={55} stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 2" />
            <line x1={8} y1={55} x2={50} y2={8} stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 2" />
          </motion.g>

          {/* A ring of failure modes fanning out at the widest point — brightens while Catalog is active */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = 50 + Math.cos(angle) * 20;
            const y = 55 + Math.sin(angle) * 12;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={1.4}
                className="fill-brand"
                initial={false}
                animate={{
                  opacity: played ? (isCataloging ? 0.85 : 0.25) : 0,
                  scale: isCataloging && played ? 1.2 : 1,
                }}
                transition={stateTransition}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-between py-2">
          {nodes.map((node, index) => {
            const Icon = iconMap[node.icon] ?? Target;
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;
            const delay = 0.15 + index * 0.16;

            return (
              <React.Fragment key={node.label}>
                {index > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={played ? { opacity: isDimmed ? 0.2 : 0.6 } : {}}
                    transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay - 0.08 }}
                    className="flex h-5 items-center justify-center text-brand"
                  >
                    <motion.div
                      animate={played && !reducedMotion ? { y: [0, 3, 0] } : {}}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                    >
                      <ArrowDown className="size-3.5" />
                    </motion.div>
                  </motion.div>
                ) : null}

                <motion.button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-full border border-transparent bg-background/70 px-3 py-1.5 outline-none backdrop-blur-sm"
                  style={{ width: NODE_WIDTHS[index] }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onFocus={() => setHoverIndex(index)}
                  onBlur={() => setHoverIndex(null)}
                  onClick={() => setPinnedIndex((current) => (current === index ? null : index))}
                  aria-pressed={isActive}
                  aria-describedby="munger-lens-detail"
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-9",
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
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div
        id="munger-lens-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to trace the question backward, then forward again."
          )}
        </p>
      </div>
    </div>
  );
}

export { MungerInversionDiagram };
