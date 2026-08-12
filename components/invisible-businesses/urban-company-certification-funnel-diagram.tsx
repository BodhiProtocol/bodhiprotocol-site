"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, GraduationCap, ShieldCheck, UserPlus, X } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const gates = [
  {
    icon: UserPlus,
    label: "Applicants",
    detail: "Raw applicant pool",
    rejects: false,
  },
  {
    icon: ShieldCheck,
    label: "Verification",
    detail: "ID checks, police record, interviews",
    rejects: true,
  },
  {
    icon: GraduationCap,
    label: "Training Academy",
    detail: "Paid skill assessment",
    rejects: true,
  },
  {
    icon: BadgeCheck,
    label: "Certified",
    detail: "~25–30% of the original pool",
    rejects: false,
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

      <div className="flex flex-wrap items-start justify-center gap-x-1 gap-y-8 sm:flex-nowrap">
        {gates.map((gate, index) => {
          const Icon = gate.icon;
          const isLast = index === gates.length - 1;
          return (
            <div key={gate.label} className="flex items-start">
              <div className="flex w-24 flex-col items-center gap-2 sm:w-28">
                <motion.div
                  className={
                    "flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center " +
                    (isLast ? "border-brand/30 bg-brand/10" : "border-border bg-background")
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={played ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.22, ease: "easeOut" }}
                >
                  <Icon className={"size-5 shrink-0 " + (isLast ? "text-brand" : "text-muted-foreground")} />
                  <span className={"text-xs font-semibold sm:text-sm " + (isLast ? "text-brand" : "")}>
                    {gate.label}
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
                    {gate.detail}
                  </span>
                </motion.div>

                {gate.rejects ? (
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: -4 }}
                    animate={played ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.35 + index * 0.22 }}
                  >
                    <span className="h-3 w-px bg-border" aria-hidden />
                    <span className="flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[9px] font-semibold text-muted-foreground uppercase">
                      <X className="size-2.5" />
                      Filtered out
                    </span>
                  </motion.div>
                ) : null}
              </div>

              {!isLast ? (
                <motion.span
                  className="mt-5 hidden shrink-0 px-1 sm:block"
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
