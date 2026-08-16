"use client";

import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, BookOpen, Brain, HeartHandshake, Lightbulb, Shield, Users, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  HeartHandshake,
  Lightbulb,
  Shield,
  Users,
};

const funnelWidths = ["100%", "88%", "76%", "64%", "52%", "42%"];

function VivekanandaConversionFunnelDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
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
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={played ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="relative flex w-full max-w-md flex-col items-center overflow-hidden rounded-2xl border border-brand/15 bg-card/80 p-5 shadow-2xl shadow-brand/10 backdrop-blur-sm"
      >
        <div className="absolute top-4 right-4 size-20 overflow-hidden rounded-full border border-brand/20 bg-background shadow-lg">
          <Image
            src="/images/great-minds/swami-vivekananda-portrait.png"
            alt="Painterly portrait inspired by Swami Vivekananda"
            fill
            priority
            sizes="80px"
            className="object-cover object-[52%_18%]"
          />
        </div>

        <div className="mb-5 flex w-full flex-col gap-1 pr-24">
          <span className="font-mono text-xs font-semibold tracking-[0.12em] text-brand uppercase">Conversion Funnel</span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Abstract truth compressed into practical action.
          </p>
        </div>

        <div className="flex w-full flex-col items-center">
          {nodes.map((node, index) => {
            const Icon = iconMap[node.icon] ?? Brain;
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <React.Fragment key={node.label}>
                <motion.button
                  type="button"
                  style={{ width: funnelWidths[index] ?? "42%" }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={played ? { opacity: isDimmed ? 0.46 : 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.15 + index * 0.09 }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onFocus={() => setHoverIndex(index)}
                  onBlur={() => setHoverIndex(null)}
                  onClick={() => setPinnedIndex((current) => (current === index ? null : index))}
                  aria-pressed={isActive}
                  aria-describedby="vivekananda-node-detail"
                  className={cn(
                    "group flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-center outline-none transition-colors",
                    isActive
                      ? "border-brand/50 bg-brand/15 text-foreground"
                      : "border-brand/15 bg-background/70 text-muted-foreground hover:border-brand/30 hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isActive ? "border-brand bg-brand text-brand-foreground" : "border-brand/20 bg-card text-brand",
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase">{node.label}</span>
                </motion.button>

                {index < nodes.length - 1 ? (
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={played ? { opacity: isDimmed ? 0.25 : 0.65 } : {}}
                    transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.2 + index * 0.09 }}
                    className="flex h-6 items-center justify-center text-brand"
                  >
                    <ArrowDown className="size-4" />
                  </motion.div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      <div
        id="vivekananda-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a funnel stage to see how Vivekananda compressed philosophy into action."
          )}
        </p>
      </div>
    </div>
  );
}

export { VivekanandaConversionFunnelDiagram };
