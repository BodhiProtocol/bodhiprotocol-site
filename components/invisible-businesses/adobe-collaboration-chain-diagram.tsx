"use client";

import { motion } from "framer-motion";
import { Building2, FileText, Lock, Printer, User } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const chain = [
  { label: "Designer", detail: "Creates the file", icon: User },
  { label: "Client", detail: "Needs to open it", icon: User },
  { label: "Print Shop", detail: "Needs it print-ready", icon: Printer },
  { label: "Agency", detail: "Needs it editable", icon: Building2 },
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

function AdobeCollaborationChainDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Collaboration Chain
      </span>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4">
        {chain.map((link, index) => {
          const Icon = link.icon;
          return (
            <div key={link.label} className="flex items-center">
              <motion.div
                className="flex w-20 flex-col items-center gap-1.5 text-center sm:w-24"
                initial={{ opacity: 0, y: 8 }}
                animate={played ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.12, ease: "easeOut" }}
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand shadow-sm">
                  <Icon className="size-5" />
                </span>
                <span className="text-xs font-semibold sm:text-sm">{link.label}</span>
                <span className="text-[10px] leading-tight text-muted-foreground">
                  {link.detail}
                </span>
              </motion.div>
              {index < chain.length - 1 ? (
                <FloatingArrow played={played} reducedMotion={reducedMotion} delay={index * 0.15} />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <motion.div
          className="flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-brand-foreground shadow-lg shadow-brand/25"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
        >
          <FileText className="size-4" />
          <span className="font-mono text-xs font-semibold">design.psd</span>
          <Lock className="size-3.5" />
        </motion.div>
      </div>

      <p className="text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
        Everyone already speaks this format
      </p>
    </div>
  );
}

export { AdobeCollaborationChainDiagram };
