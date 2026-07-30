"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const layers = [
  { label: "1", title: "Defaulter resources", note: "Margin + guaranty fund" },
  { label: "2", title: "CCP skin in game", note: "Clearinghouse contribution" },
  { label: "3", title: "Mutualized fund", note: "Non-defaulting members" },
  { label: "4", title: "Assessments / recovery", note: "Last-resort tools" },
];

function DefaultWaterfallIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        <span>DEFAULT WATERFALL</span>
        <span>WHO PAYS NEXT?</span>
      </div>

      <div className="space-y-2">
        {layers.map((layer, index) => (
          <div
            key={layer.title}
            className="grid grid-cols-[28px_1fr] gap-2 rounded-lg border border-border bg-card p-2.5 text-card-foreground"
            style={reveal(index * 120)}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
              {layer.label}
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-wide">{layer.title}</div>
              <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">{layer.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-dashed border-border bg-background/60 p-2.5 text-[9px] font-bold tracking-wide text-muted-foreground" style={reveal(540)}>
        LOSS GETS A PATH BEFORE PANIC GETS A VOTE
      </div>
    </div>
  );
}

export { DefaultWaterfallIllustration };
