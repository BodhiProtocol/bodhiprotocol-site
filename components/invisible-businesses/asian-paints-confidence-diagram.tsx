"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Home, Paintbrush, Palette, ShieldCheck, Store } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const steps = [
  { label: "Colour anxiety", detail: "Too many shades", icon: Palette },
  { label: "Dealer reassurance", detail: "A trusted counter", icon: Store },
  { label: "Execution confidence", detail: "Painter and service", icon: Paintbrush },
  { label: "Finished room", detail: "A safer next decision", icon: Home },
];

function AsianPaintsConfidenceDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-7 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Confidence Stack
      </span>

      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={played ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.45,
                delay: reducedMotion ? 0 : index * 0.12,
                ease: "easeOut",
              }}
              className="flex min-h-36 flex-col justify-between rounded-2xl border border-border bg-background p-4 shadow-sm"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="size-4" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">{step.label}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{step.detail}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-brand/20 bg-background p-5">
        <motion.div
          className="absolute inset-y-0 left-0 bg-brand/10"
          initial={{ width: "0%" }}
          animate={played ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: reducedMotion ? 0 : 1.1, ease: "easeOut" }}
        />
        <div className="relative flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
            <ShieldCheck className="size-6" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-2xl font-medium">The paint is the receipt.</span>
            <span className="text-sm text-muted-foreground">
              The actual sale happened earlier, when the family felt safe enough to start.
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-center text-xs font-semibold text-brand sm:text-sm">
        <CheckCircle2 className="size-4 shrink-0" />
        Every removed doubt makes the next wall easier to change.
      </div>
    </div>
  );
}

export { AsianPaintsConfidenceDiagram };
