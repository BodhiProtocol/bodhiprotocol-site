"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  Check,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface FunnelStep {
  label: string;
  description: string;
  visual: ReactNode;
}

function Tile({ children, badge }: { children: ReactNode; badge?: ReactNode }) {
  return (
    <span className="relative flex size-14 items-center justify-center rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 to-transparent text-brand shadow-sm">
      {children}
      {badge ? (
        <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm">
          {badge}
        </span>
      ) : null}
    </span>
  );
}

const steps: FunnelStep[] = [
  {
    label: "Find",
    description: "Millions of options in seconds",
    visual: (
      <Tile>
        <Search className="size-6" />
      </Tile>
    ),
  },
  {
    label: "Learn",
    description: "Reviews & ratings remove guesswork",
    visual: (
      <Tile>
        <span className="flex gap-0.5">
          <Star className="size-3 fill-brand" />
          <Star className="size-3 fill-brand" />
          <Star className="size-3 fill-brand" />
        </span>
      </Tile>
    ),
  },
  {
    label: "Trust",
    description: "Prime promise sets expectations",
    visual: (
      <Tile>
        <Box className="size-6" />
      </Tile>
    ),
  },
  {
    label: "Buy",
    description: "One-click checkout removes friction",
    visual: (
      <Tile badge={<Check className="size-3" />}>
        <ShoppingCart className="size-6" />
      </Tile>
    ),
  },
  {
    label: "Track",
    description: "Real-time tracking reduces anxiety",
    visual: (
      <Tile badge={<MapPin className="size-3" />}>
        <Truck className="size-6" />
      </Tile>
    ),
  },
  {
    label: "Receive",
    description: "On-time delivery builds confidence",
    visual: (
      <Tile>
        <ShieldCheck className="size-6" />
      </Tile>
    ),
  },
];

function AmazonFunnelDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-6">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-start">
            <motion.div
              className="flex w-24 flex-col items-center gap-2 text-center sm:w-28"
              initial={{ opacity: 0, y: 8 }}
              animate={played ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.1, ease: "easeOut" }}
            >
              {step.visual}
              <span className="text-xs font-semibold sm:text-sm">{step.label}</span>
              <span className="text-[10.5px] leading-snug text-muted-foreground sm:text-xs">
                {step.description}
              </span>
            </motion.div>
            {index < steps.length - 1 ? (
              <ArrowRight className="mt-5 hidden size-4 shrink-0 text-muted-foreground/50 sm:block" />
            ) : null}
          </div>
        ))}
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
