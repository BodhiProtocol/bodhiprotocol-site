"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquareText,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface FunnelStep {
  label: string;
  description: string;
  icon: LucideIcon;
}

const steps: FunnelStep[] = [
  { label: "Find", description: "Millions of options in seconds", icon: Search },
  { label: "Learn", description: "Reviews & ratings remove guesswork", icon: MessageSquareText },
  { label: "Trust", description: "Prime promise sets expectations", icon: Package },
  { label: "Buy", description: "One-click checkout removes friction", icon: ShoppingCart },
  { label: "Track", description: "Real-time tracking reduces anxiety", icon: Truck },
  { label: "Receive", description: "On-time delivery builds confidence", icon: ShieldCheck },
];

function AmazonFunnelDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-start">
              <motion.div
                className="flex w-24 flex-col items-center gap-2 text-center sm:w-28"
                initial={{ opacity: 0, y: 8 }}
                animate={played ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.1, ease: "easeOut" }}
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand sm:size-12">
                  <Icon className="size-5 sm:size-5.5" />
                </span>
                <span className="text-xs font-semibold sm:text-sm">{step.label}</span>
                <span className="text-[10.5px] leading-snug text-muted-foreground sm:text-xs">
                  {step.description}
                </span>
              </motion.div>
              {index < steps.length - 1 ? (
                <ArrowRight className="mt-4 hidden size-4 shrink-0 text-muted-foreground/50 sm:block" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Every step reduces uncertainty
        </span>
      </div>

      <p className="text-center text-sm text-muted-foreground sm:text-base">
        Less uncertainty <span aria-hidden>&rarr;</span> More confidence{" "}
        <span aria-hidden>&rarr;</span> More purchases <span aria-hidden>&rarr;</span>{" "}
        <span className="font-semibold text-brand">Stronger loyalty</span>
      </p>
    </div>
  );
}

export { AmazonFunnelDiagram };
