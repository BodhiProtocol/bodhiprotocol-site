"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Crown,
  DollarSign,
  Gavel,
  Megaphone,
  MousePointerClick,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface FunnelStep {
  number: number;
  label: string;
  description: string;
  icon: ReactNode;
}

const steps: FunnelStep[] = [
  { number: 1, label: "Query", description: "You type what you want", icon: <Search className="size-5" /> },
  {
    number: 2,
    label: "Intent Revealed",
    description: "Google understands the real intent",
    icon: <Target className="size-5" />,
  },
  {
    number: 3,
    label: "Ad Auction",
    description: "Advertisers bid to reach that intent",
    icon: <Gavel className="size-5" />,
  },
  {
    number: 4,
    label: "Best Ad Wins",
    description: "Most relevant & valuable ads win",
    icon: <Crown className="size-5" />,
  },
  {
    number: 5,
    label: "Relevant Ad",
    description: "Ad is shown above the results",
    icon: <Megaphone className="size-5" />,
  },
  {
    number: 6,
    label: "Click",
    description: "User clicks if it matches intent",
    icon: <MousePointerClick className="size-5" />,
  },
];

interface FlywheelNode {
  label: string;
  description: string;
  icon: ReactNode;
}

const flywheelNodes: FlywheelNode[] = [
  { label: "Revenue", description: "Google earns when intent converts", icon: <DollarSign className="size-4" /> },
  {
    label: "Better Products",
    description: "More data improves search, ads, maps, YouTube & more",
    icon: <TrendingUp className="size-4" />,
  },
  {
    label: "Stronger Intent Signal",
    description: "Better products attract more high-intent users",
    icon: <Sparkles className="size-4" />,
  },
];

function GoogleIntentEngineDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Intent Engine
      </span>

      <div className="flex flex-wrap items-start justify-center gap-x-1 gap-y-6">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-start">
            <motion.div
              className="flex w-20 flex-col items-center gap-1.5 text-center sm:w-24"
              initial={{ opacity: 0, y: 8 }}
              animate={played ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.1, ease: "easeOut" }}
            >
              <span className="relative flex size-11 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand shadow-sm">
                {step.icon}
                <span className="absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground">
                  {step.number}
                </span>
              </span>
              <span className="text-[11px] leading-tight font-semibold sm:text-xs">
                {step.label}
              </span>
              <span className="text-[9.5px] leading-tight text-muted-foreground sm:text-[10.5px]">
                {step.description}
              </span>
            </motion.div>
            {index < steps.length - 1 ? (
              <motion.span
                className="mt-4 hidden shrink-0 sm:block"
                animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }}
              >
                <ArrowRight className="size-3.5 text-muted-foreground/50" />
              </motion.span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The moment is monetized
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 rounded-2xl bg-background p-4 sm:p-5">
        {flywheelNodes.map((node, index) => (
          <div key={node.label} className="flex items-center">
            <div className="flex w-32 flex-col items-center gap-1 text-center sm:w-40">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                {node.icon}
              </span>
              <span className="text-xs font-semibold sm:text-sm">{node.label}</span>
              <span className="text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
                {node.description}
              </span>
            </div>
            {index < flywheelNodes.length - 1 ? (
              <motion.span
                className="shrink-0"
                animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }}
              >
                <ArrowRight className="size-4 text-muted-foreground/50" />
              </motion.span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export { GoogleIntentEngineDiagram };
