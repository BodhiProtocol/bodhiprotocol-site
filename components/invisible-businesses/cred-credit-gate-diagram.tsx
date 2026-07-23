"use client";

import { motion } from "framer-motion";
import { Gift, ShieldCheck } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const loopNodes = [
  { label: "Curated Members" },
  { label: "Brands Pay For Access" },
  { label: "Richer Rewards" },
];

function FloatingArrow({
  played,
  reducedMotion,
  delay = 0,
}: {
  played: boolean;
  reducedMotion: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 12"
      className="h-3 w-8 shrink-0 text-brand/50 sm:w-10"
      animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 1 L34 6 L27 11" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}

function DotGrid({
  count,
  active,
  played,
  reducedMotion,
  baseDelay,
}: {
  count: number;
  active: boolean;
  played: boolean;
  reducedMotion: boolean;
  baseDelay: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <motion.span
          key={index}
          className={
            active
              ? "size-2.5 rounded-full bg-brand"
              : "size-2.5 rounded-full bg-muted-foreground/25"
          }
          initial={{ opacity: 0, scale: 0.5 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.25, delay: reducedMotion ? 0 : baseDelay + index * 0.04 }}
        />
      ))}
    </div>
  );
}

function CredCreditGateDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Credit Gate
      </span>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <div className="flex flex-col items-center gap-2">
          <DotGrid count={9} active={false} played={played} reducedMotion={reducedMotion} baseDelay={0} />
          <span className="text-center text-xs font-semibold sm:text-sm">All Applicants</span>
        </div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0} />

        <motion.div
          className="flex w-24 flex-col items-center gap-1.5 rounded-2xl border border-transparent bg-brand px-3 py-4 text-center text-brand-foreground shadow-lg shadow-brand/25 sm:w-28"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
        >
          <ShieldCheck className="size-6" />
          <span className="text-[11px] font-bold tracking-tight sm:text-xs">740+ Score</span>
        </motion.div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0.3} />

        <div className="flex flex-col items-center gap-2">
          <DotGrid count={4} active played={played} reducedMotion={reducedMotion} baseDelay={0.5} />
          <span className="text-center text-xs font-semibold sm:text-sm">Curated Members</span>
        </div>
      </div>

      <motion.div
        className="flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={played ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.75, ease: "easeOut" }}
      >
        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0.6} />
        <div className="flex items-center gap-2 rounded-2xl bg-background px-4 py-2.5">
          <Gift className="size-4 text-brand" />
          <span className="text-xs font-semibold sm:text-sm">Brand Partners Pay For Access</span>
        </div>
      </motion.div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The users are the product
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4 rounded-2xl bg-background p-4 sm:p-5">
        {loopNodes.map((node, index) => (
          <div key={node.label} className="flex items-center">
            <span className="rounded-full border border-brand/20 bg-card px-3 py-1.5 text-xs font-semibold sm:text-sm">
              {node.label}
            </span>
            {index < loopNodes.length - 1 ? (
              <FloatingArrow played={played} reducedMotion={reducedMotion} delay={index * 0.2} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export { CredCreditGateDiagram };
