"use client";

import { motion } from "framer-motion";
import { CircleHelp, Landmark, Scale, User, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface ChainNode {
  label: string;
  icon: LucideIcon;
  finalNode?: boolean;
  faded?: boolean;
}

const licChain: ChainNode[] = [
  { label: "Policyholder", icon: User },
  { label: "LIC", icon: Landmark },
  { label: "Government of India", icon: Scale, finalNode: true },
];

const privateChain: ChainNode[] = [
  { label: "Policyholder", icon: User },
  { label: "Private Insurer", icon: Landmark },
  { label: "?", icon: CircleHelp, finalNode: true, faded: true },
];

function Node({ node, played, delay }: { node: ChainNode; played: boolean; delay: number }) {
  const Icon = node.icon;
  return (
    <motion.span
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold sm:text-sm",
        node.finalNode && !node.faded &&
          "bg-brand text-brand-foreground shadow-sm shadow-brand/30",
        node.finalNode && node.faded &&
          "border border-dashed border-muted-foreground/30 text-muted-foreground",
        !node.finalNode && "border border-brand/20 bg-card",
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={played ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.5, delay }}
    >
      <Icon className="size-3.5 shrink-0" />
      {node.label}
    </motion.span>
  );
}

function Connector({
  dashed,
  label,
  played,
  reducedMotion,
  delay,
}: {
  dashed?: boolean;
  label: string;
  played: boolean;
  reducedMotion: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0 }}
      animate={played ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <motion.div
        className={cn(
          "h-6 w-0",
          dashed ? "border-l-2 border-dashed border-muted-foreground/40" : "border-l-2 border-brand/50",
        )}
        animate={played && !reducedMotion ? { y: [0, 3, 0] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
      />
      <span className="text-center font-mono text-[8px] leading-tight text-muted-foreground uppercase">
        {label}
      </span>
    </motion.div>
  );
}

function LicGuaranteeChainDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        Two Promises, One Law
      </span>

      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <Node node={licChain[0]} played={played} delay={reducedMotion ? 0 : 0.1} />
          <Connector
            label="Premium Paid"
            played={played}
            reducedMotion={reducedMotion}
            delay={reducedMotion ? 0 : 0.3}
          />
          <Node node={licChain[1]} played={played} delay={reducedMotion ? 0 : 0.5} />
          <Connector
            label="Section 37"
            played={played}
            reducedMotion={reducedMotion}
            delay={reducedMotion ? 0 : 0.7}
          />
          <Node node={licChain[2]} played={played} delay={reducedMotion ? 0 : 0.9} />
          <span className="mt-1 rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[9px] font-bold tracking-wide text-brand uppercase">
            Guaranteed in cash
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <Node node={privateChain[0]} played={played} delay={reducedMotion ? 0 : 0.1} />
          <Connector
            label="Premium Paid"
            played={played}
            reducedMotion={reducedMotion}
            delay={reducedMotion ? 0 : 0.3}
          />
          <Node node={privateChain[1]} played={played} delay={reducedMotion ? 0 : 0.5} />
          <Connector
            dashed
            label="IRDAI Solvency Margin"
            played={played}
            reducedMotion={reducedMotion}
            delay={reducedMotion ? 0 : 0.7}
          />
          <Node node={privateChain[2]} played={played} delay={reducedMotion ? 0 : 0.9} />
          <span className="mt-1 rounded-full bg-muted px-2.5 py-1 font-mono text-[9px] font-bold tracking-wide text-muted-foreground uppercase">
            No sovereign backstop
          </span>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground sm:text-sm">
        Section 37 of the LIC Act, 1956 guarantees LIC&apos;s payouts through the Government of
        India — a line no private insurer&apos;s policy carries.
      </div>
    </div>
  );
}

export { LicGuaranteeChainDiagram };
