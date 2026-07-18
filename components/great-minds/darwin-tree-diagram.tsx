"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Shuffle, Sprout, TreeDeciduous, X, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Shuffle,
  X,
  Sprout,
  TreeDeciduous,
};

function DarwinTreeDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const mainPath = nodes.filter((node) => !node.pruned);
  const prunedNode = nodes.find((node) => node.pruned);
  const prunedIndex = prunedNode ? nodes.indexOf(prunedNode) : -1;

  function renderNode(node: GreatMindWheelNode, index: number, size: "sm" | "lg" = "lg") {
    const Icon = iconMap[node.icon] ?? Sprout;
    const isActive = activeIndex === index;
    const isDimmed = activeIndex !== null && !isActive;
    const delay = 0.15 + index * 0.16;

    return (
      <motion.button
        type="button"
        className="flex flex-col items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 text-center outline-none"
        initial={{ opacity: 0, y: 10 }}
        animate={played ? { opacity: isDimmed ? 0.4 : 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
        onFocus={() => setActiveIndex(index)}
        onBlur={() => setActiveIndex(null)}
        onClick={() => setActiveIndex(isActive ? null : index)}
        aria-pressed={isActive}
        aria-describedby="tree-node-detail"
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
            size === "lg" ? "size-11 sm:size-12" : "size-8 sm:size-9",
            node.pruned
              ? isActive
                ? "border-muted-foreground/40 bg-muted text-muted-foreground shadow-md"
                : "border-dashed border-muted-foreground/30 text-muted-foreground/50"
              : isActive
                ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                : "border-brand/20 text-brand/80",
          )}
        >
          <Icon className={size === "lg" ? "size-5" : "size-4"} />
        </span>
        <span
          className={cn(
            "font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors",
            node.pruned ? "text-muted-foreground/50" : isActive ? "text-brand" : "text-muted-foreground",
          )}
        >
          {node.label}
        </span>
      </motion.button>
    );
  }

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <div className="flex w-full max-w-xs flex-col items-center">
        {mainPath.map((node, mainIndex) => {
          const index = nodes.indexOf(node);
          const isFirst = mainIndex === 0;
          const arrowDelay = 0.15 + index * 0.16 - 0.08;

          return (
            <React.Fragment key={node.label}>
              {!isFirst ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={played ? { opacity: 0.6 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : arrowDelay }}
                  className="flex h-7 items-center justify-center text-brand"
                >
                  <motion.div
                    animate={played && !reducedMotion ? { y: [0, 4, 0] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                  >
                    <ArrowDown className="size-4" />
                  </motion.div>
                </motion.div>
              ) : null}

              {renderNode(node, index)}

              {isFirst && prunedNode ? (
                <div className="relative flex w-full items-start justify-center py-1">
                  <svg
                    viewBox="0 0 120 40"
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-1/2 h-10 w-24 -translate-x-1/2 text-muted-foreground/30"
                  >
                    <path
                      d="M60 0 Q 60 20 100 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </svg>
                  <div className="mt-6 ml-16">{renderNode(prunedNode, prunedIndex, "sm")}</div>
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>

      <div
        id="tree-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a node to see how it shaped his thinking."
          )}
        </p>
      </div>
    </div>
  );
}

export { DarwinTreeDiagram };
