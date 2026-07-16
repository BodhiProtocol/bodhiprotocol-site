"use client";

import { motion } from "framer-motion";
import { CircleCheck, Fingerprint, Lock, ShieldCheck, Store, User } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const networkChecks = [
  { label: "Authorize", icon: Fingerprint },
  { label: "Guarantee", icon: Lock },
  { label: "Settle", icon: CircleCheck },
];

const loopNodes = [
  { label: "More Cardholders" },
  { label: "More Merchant Acceptance" },
  { label: "More Network Value" },
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

function VisaTrustNetworkDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Trust Network
      </span>

      <div className="flex items-center justify-center gap-1 sm:gap-3">
        <motion.div
          className="flex w-20 flex-col items-center gap-1.5 text-center sm:w-24"
          initial={{ opacity: 0, y: 8 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand shadow-sm">
            <User className="size-5" />
          </span>
          <span className="text-xs font-semibold sm:text-sm">Cardholder</span>
          <span className="text-[10px] leading-tight text-muted-foreground">A stranger to the merchant</span>
        </motion.div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0} />

        <motion.div
          className="flex w-28 flex-col items-center gap-2 rounded-2xl border border-transparent bg-brand px-3 py-4 text-center text-brand-foreground shadow-lg shadow-brand/25 sm:w-36"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.15, ease: "easeOut" }}
        >
          <ShieldCheck className="size-6" />
          <span className="text-xs font-bold tracking-tight sm:text-sm">Visa Network</span>
          <div className="flex gap-1.5">
            {networkChecks.map((check) => {
              const Icon = check.icon;
              return (
                <span
                  key={check.label}
                  className="flex size-6 items-center justify-center rounded-full bg-brand-foreground/15"
                  title={check.label}
                >
                  <Icon className="size-3" />
                </span>
              );
            })}
          </div>
        </motion.div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0.3} />

        <motion.div
          className="flex w-20 flex-col items-center gap-1.5 text-center sm:w-24"
          initial={{ opacity: 0, y: 8 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
        >
          <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand shadow-sm">
            <Store className="size-5" />
          </span>
          <span className="text-xs font-semibold sm:text-sm">Merchant</span>
          <span className="text-[10px] leading-tight text-muted-foreground">A stranger to the cardholder</span>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The guarantee is the product
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

export { VisaTrustNetworkDiagram };
