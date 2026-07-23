"use client";

import { Check } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const clauses = [
  { tag: "GIVEN", text: "The account is locked" },
  { tag: "WHEN", text: "The user requests a reset" },
  { tag: "THEN", text: "A link is emailed, lock stays until it's used" },
];

function AcceptanceCriteriaIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-1.5 text-[9px] font-bold tracking-wide text-muted-foreground">
        GIVEN / WHEN / THEN
      </div>

      {clauses.map((clause, i) => (
        <div
          key={clause.tag}
          className="flex items-start gap-2 py-1"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "translateX(0)" : "translateX(-4px)",
            transition: reducedMotion
              ? "none"
              : `opacity 400ms ease ${i * 220}ms, transform 400ms ease ${i * 220}ms`,
          }}
        >
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-600/15">
            <Check className="size-2.5 stroke-[3] text-emerald-600 dark:text-emerald-500" />
          </span>
          <span className="text-[10px] leading-snug text-card-foreground">
            <b className="font-bold text-brand">{clause.tag}</b> {clause.text}
          </span>
        </div>
      ))}

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">HANDSHAKE</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">CONTRACT</span>
      </div>
    </div>
  );
}

export { AcceptanceCriteriaIllustration };
