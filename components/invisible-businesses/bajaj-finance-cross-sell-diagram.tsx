"use client";

import { motion } from "framer-motion";
import { CreditCard, Landmark, ShieldCheck, Smartphone, UserCircle2, Wallet } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const spokes = [
  { icon: Landmark, label: "Personal Loan" },
  { icon: CreditCard, label: "EMI Card" },
  { icon: ShieldCheck, label: "Insurance" },
  { icon: Wallet, label: "Higher Limit" },
] as const;

function BajajFinanceCrossSellDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-8 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        Loan One Buys The Data. Loan Two Is The Business.
      </span>

      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
          initial={{ opacity: 0, y: -6 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <Smartphone className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold sm:text-sm">0% EMI Durables Loan</span>
            <span className="text-[10px] text-muted-foreground sm:text-[11px]">
              Retailer eats the margin, not you
            </span>
          </div>
        </motion.div>

        <motion.span
          className="text-muted-foreground/50"
          animate={played && !reducedMotion ? { y: [0, 4, 0] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>

        <motion.div
          className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand/10 px-5 py-3.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.25 }}
        >
          <UserCircle2 className="size-5 shrink-0 text-brand" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-brand sm:text-sm">Your Credit Profile</span>
            <span className="text-[10px] text-muted-foreground sm:text-[11px]">
              Built from how you repaid loan one
            </span>
          </div>
        </motion.div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {spokes.map((spoke, index) => {
            const Icon = spoke.icon;
            return (
              <motion.div
                key={spoke.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background px-2 py-3 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={played ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.5 + index * 0.12 }}
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-[10px] leading-tight font-semibold sm:text-[11px]">
                  {spoke.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.span
          className="text-[10px] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: reducedMotion ? 0 : 1.05 }}
        >
          Shown: 4 of 26 product lines this data feeds into
        </motion.span>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          2.52 Loan Products Per Customer, On Average
        </span>
      </div>
    </div>
  );
}

export { BajajFinanceCrossSellDiagram };
