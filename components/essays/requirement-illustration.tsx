"use client";

import { Check } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const edgeCases = [
  "Email doesn't exist — reveal it, or fail silently?",
  "How long is the reset link valid before it expires?",
  "Second request before the first link is used — invalidate it?",
  "Rate limit hit — what does the user actually see?",
];

function RequirementIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]"
    >
      <div className="mb-3 rounded-lg border border-border bg-card px-3 py-2.5 text-[11px] leading-snug font-semibold text-card-foreground">
        &ldquo;Users can reset their password via email.&rdquo;
      </div>

      <div className="mb-1.5 text-[9px] font-bold tracking-wide text-muted-foreground">
        EDGE CASES SURFACED
      </div>

      {edgeCases.map((text, i) => (
        <div
          key={text}
          className="flex items-start gap-2 py-1"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "translateX(0)" : "translateX(-4px)",
            transition: reducedMotion ? "none" : `opacity 400ms ease ${i * 200}ms, transform 400ms ease ${i * 200}ms`,
          }}
        >
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-600/15">
            <Check className="size-2.5 stroke-[3] text-emerald-600 dark:text-emerald-500" />
          </span>
          <span className="text-[10px] leading-snug text-card-foreground">{text}</span>
        </div>
      ))}

      <div className="mt-3 flex items-center justify-end border-t border-dashed border-border pt-2.5">
        <span
          className="text-[9px] font-bold tracking-wide text-brand"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : `opacity 300ms ease ${edgeCases.length * 200 + 300}ms`,
          }}
        >
          4 / 4 RESOLVED
        </span>
      </div>
    </div>
  );
}

export { RequirementIllustration };
