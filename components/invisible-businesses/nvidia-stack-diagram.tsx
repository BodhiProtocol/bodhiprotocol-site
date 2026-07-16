"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";

interface StackLayer {
  name: string;
  detail: string;
  tone: "base" | "moat" | "build";
}

// Ordered bottom -> top. The GPU is the visible base; everything above it is
// the moat that grows taller (and more expensive to leave) over time.
const layers: StackLayer[] = [
  { name: "GPU Hardware", detail: "The visible product — the part rivals can copy", tone: "base" },
  { name: "CUDA", detail: "The platform. Free for 15+ years. The real moat.", tone: "moat" },
  { name: "Libraries", detail: "cuDNN · cuBLAS · TensorRT", tone: "build" },
  { name: "Frameworks", detail: "PyTorch · TensorFlow · JAX", tone: "build" },
  { name: "AI Models", detail: "Every model trained here stays here", tone: "build" },
];

function NvidiaStackDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <div className="flex items-stretch gap-4">
        {/* Switching-cost axis */}
        <div className="flex w-6 shrink-0 flex-col items-center justify-between py-1 sm:w-8">
          <motion.span
            animate={played && !reducedMotion ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="size-4 text-brand" />
          </motion.span>
          <span className="flex-1 text-center font-mono text-[9px] leading-tight font-semibold tracking-[0.15em] text-brand/70 [writing-mode:vertical-rl] rotate-180 uppercase sm:text-[10px]">
            Switching cost grows
          </span>
        </div>

        {/* The stack, built bottom -> top */}
        <div className="flex flex-1 flex-col-reverse gap-2">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={played ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.14, ease: "easeOut" }}
              className={cn(
                "flex flex-col gap-0.5 rounded-xl border px-4 py-3 sm:px-5 sm:py-3.5",
                layer.tone === "moat" &&
                  "border-transparent bg-brand text-brand-foreground shadow-lg shadow-brand/25",
                layer.tone === "base" &&
                  "border-dashed border-border bg-background text-muted-foreground",
                layer.tone === "build" && "border-brand/20 bg-card",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold sm:text-base">{layer.name}</span>
                {layer.tone === "moat" ? (
                  <span className="rounded-full bg-brand-foreground/15 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.15em] uppercase">
                    The Moat
                  </span>
                ) : null}
                {layer.tone === "base" ? (
                  <span className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase">
                    The Chip
                  </span>
                ) : null}
              </div>
              <span
                className={cn(
                  "text-[11px] leading-snug sm:text-xs",
                  layer.tone === "moat" ? "text-brand-foreground/80" : "text-muted-foreground",
                )}
              >
                {layer.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-center font-serif text-lg leading-snug text-balance sm:text-xl">
        Everyone builds up. Nobody wants to rebuild down.
      </p>
    </div>
  );
}

export { NvidiaStackDiagram };
