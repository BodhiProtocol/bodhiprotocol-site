"use client";

import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap, ShieldCheck, UserPlus } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const stages = [
  {
    icon: UserPlus,
    label: "Applicants",
    detail: "Raw applicant pool",
    width: "100%",
  },
  {
    icon: ShieldCheck,
    label: "ID + Police Check",
    detail: "Verification, interviews",
    width: "72%",
  },
  {
    icon: GraduationCap,
    label: "Training Academy",
    detail: "Paid skill assessment",
    width: "48%",
  },
  {
    icon: BadgeCheck,
    label: "Certified",
    detail: "~25–30% make it through",
    width: "28%",
  },
] as const;

function UrbanCompanyCertificationFunnelDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-8 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Certification Funnel
      </span>

      <div className="flex flex-col items-center gap-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isLast = index === stages.length - 1;
          return (
            <div key={stage.label} className="flex w-full flex-col items-center gap-3">
              <motion.div
                className={
                  "flex items-center gap-3 rounded-xl border px-4 py-3 " +
                  (isLast
                    ? "border-brand/30 bg-brand/10"
                    : "border-border bg-background")
                }
                style={{ width: stage.width, maxWidth: "100%" }}
                initial={{ opacity: 0, y: 8 }}
                animate={played ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.1 + index * 0.22 }}
              >
                <Icon className={"size-4 shrink-0 " + (isLast ? "text-brand" : "text-muted-foreground")} />
                <div className="flex min-w-0 flex-col">
                  <span
                    className={
                      "truncate text-xs font-semibold sm:text-sm " +
                      (isLast ? "text-brand" : "text-foreground")
                    }
                  >
                    {stage.label}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
                    {stage.detail}
                  </span>
                </div>
              </motion.div>
              {!isLast ? <span className="text-muted-foreground/50">↓</span> : null}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Roughly 7 In 10 Applicants Never Make It Through
        </span>
      </div>
    </div>
  );
}

export { UrbanCompanyCertificationFunnelDiagram };
