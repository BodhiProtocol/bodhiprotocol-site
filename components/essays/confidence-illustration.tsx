"use client";

import { Check, X } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface Answer {
  text: string;
  verdict: "verified" | "fabricated";
}

const answers: Answer[] = [
  { text: '"The Treaty was signed in 1998."', verdict: "fabricated" },
  { text: '"The Treaty was signed in 1995."', verdict: "verified" },
];

function ConfidenceIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]"
    >
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer) => {
          const isOk = answer.verdict === "verified";
          return (
            <div key={answer.text}>
              <div className="mb-1.5 text-[9px] font-bold tracking-wide text-muted-foreground">
                MODEL OUTPUT
              </div>
              <p className="mb-2.5 text-[11px] leading-snug font-semibold text-card-foreground">
                {answer.text}
              </p>
              <div className="mb-1 h-2 overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{
                    width: played ? "94%" : "0%",
                    transition: reducedMotion ? "none" : "width 700ms cubic-bezier(.16,1,.3,1) 100ms",
                  }}
                />
              </div>
              <div className="mb-2.5 text-[9px] text-muted-foreground">94% confidence</div>
              <div
                className={
                  "flex items-center gap-1.5 text-[10px] font-bold " +
                  (isOk ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500")
                }
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "translateY(0)" : "translateY(3px)",
                  transition: reducedMotion ? "none" : "opacity 300ms ease 900ms, transform 300ms ease 900ms",
                }}
              >
                {isOk ? <Check className="size-3.5 shrink-0" /> : <X className="size-3.5 shrink-0" />}
                {isOk ? "Verified" : "Fabricated"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 border-t border-dashed border-border pt-3 text-center text-[9px] font-bold tracking-wide text-brand">
        CONFIDENCE&nbsp;≠&nbsp;TRUTH
      </div>
    </div>
  );
}

export { ConfidenceIllustration };
