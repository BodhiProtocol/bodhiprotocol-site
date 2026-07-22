"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const parts = [
  { field: "ROLE", value: "Compliance analyst", tag: "DETECTED" },
  { field: "GOAL", value: "Flag suspicious trades before end of day", tag: "DETECTED" },
  { field: "BENEFIT", value: "Meets same-day regulatory reporting deadline", tag: "SUGGESTED" },
];

function RequirementsTranslatorIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 rounded-lg border border-border bg-card px-3 py-2.5 text-[11px] leading-snug font-semibold text-card-foreground">
        &ldquo;The compliance team needs a way to flag suspicious trades before end of day.&rdquo;
      </div>

      {parts.map((part, i) => (
        <div
          key={part.field}
          className="flex items-start justify-between gap-2 border-b border-dashed border-border py-1.5 last:border-b-0"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "translateX(0)" : "translateX(-4px)",
            transition: reducedMotion
              ? "none"
              : `opacity 400ms ease ${i * 220}ms, transform 400ms ease ${i * 220}ms`,
          }}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
              {part.field}
            </span>
            <span className="text-[10px] leading-snug text-card-foreground">{part.value}</span>
          </div>
          <span
            className={
              part.tag === "DETECTED"
                ? "shrink-0 rounded-full bg-emerald-600/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-emerald-600 dark:text-emerald-500"
                : "shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-brand"
            }
          >
            {part.tag}
          </span>
        </div>
      ))}

      <div className="mt-3 flex items-center justify-between pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          AS A · I WANT · SO THAT
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">1 / 3 INFERRED</span>
      </div>
    </div>
  );
}

export { RequirementsTranslatorIllustration };
