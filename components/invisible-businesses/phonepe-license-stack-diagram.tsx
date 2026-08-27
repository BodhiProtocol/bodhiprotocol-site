"use client";

import { motion } from "framer-motion";
import { Ban, Landmark, LineChart, ShieldCheck, Smartphone } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const entities = [
  {
    name: "PhonePe Private Limited",
    role: "UPI payments",
    regulator: "Barred by Section 10A",
    charges: "₹0",
    icon: Ban,
    barred: true,
  },
  {
    name: "PhonePe Insurance Broking Services",
    role: "Insurance",
    regulator: "IRDAI direct broker",
    charges: "Commission",
    icon: ShieldCheck,
    barred: false,
  },
  {
    name: "PhonePe Wealth Broking",
    role: "Share.Market",
    regulator: "SEBI-registered broker",
    charges: "Brokerage",
    icon: LineChart,
    barred: false,
  },
  {
    name: "Partner NBFCs & Banks",
    role: "Loans marketplace",
    regulator: "Hold the actual loan",
    charges: "Referral fee",
    icon: Landmark,
    barred: false,
  },
];

function PhonepeLicenseStackDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        One App Icon, Four Companies
      </span>

      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-5 py-3"
          initial={{ opacity: 0, y: -6 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <Smartphone className="size-4 text-muted-foreground" />
          <span className="text-xs font-semibold sm:text-sm">What you see: one app</span>
        </motion.div>
        <motion.span
          className="text-muted-foreground/50"
          animate={played && !reducedMotion ? { y: [0, 4, 0] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide sm:text-[11px]">
          What actually holds the licenses
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {entities.map((entity, index) => {
          const Icon = entity.icon;
          return (
            <motion.div
              key={entity.name}
              className={
                entity.barred
                  ? "flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-background/60 px-4 py-3"
                  : "flex items-center justify-between gap-3 rounded-xl border border-brand/20 bg-background px-4 py-3"
              }
              initial={{ opacity: 0, x: -8 }}
              animate={played ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.25 + index * 0.15 }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={
                    entity.barred
                      ? "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
                      : "flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand"
                  }
                >
                  <Icon className="size-4" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-xs font-semibold sm:text-sm">{entity.name}</span>
                  <span className="text-[10px] text-muted-foreground sm:text-[11px]">
                    {entity.role} · {entity.regulator}
                  </span>
                </div>
              </div>
              <span
                className={
                  entity.barred
                    ? "shrink-0 rounded-full bg-muted px-2.5 py-1 font-mono text-[10px] font-bold text-muted-foreground"
                    : "shrink-0 rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[10px] font-bold text-brand"
                }
              >
                {entity.charges}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          1 of 4 is legally barred from charging you. The other 3 aren&apos;t.
        </span>
      </div>
    </div>
  );
}

export { PhonepeLicenseStackDiagram };
