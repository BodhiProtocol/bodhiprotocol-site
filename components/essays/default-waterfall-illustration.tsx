"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const layers = [
  {
    label: "01",
    title: "Defaulter margin",
    amount: "Rs 35 cr",
    note: "First loss stays with the member that failed",
    width: "w-[100%]",
  },
  {
    label: "02",
    title: "Own fund contribution",
    amount: "Rs 5 cr",
    note: "The defaulter's pre-funded share is consumed next",
    width: "w-[68%]",
  },
  {
    label: "03",
    title: "CCP skin in game",
    amount: "Rs 10 cr",
    note: "Institutional capital absorbs the remaining hole",
    width: "w-[82%]",
  },
  {
    label: "04",
    title: "Mutualized resources",
    amount: "Not touched",
    note: "Surviving members remain protected in this scenario",
    width: "w-[42%]",
  },
];

function DefaultWaterfallIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(10px)",
    transition: reducedMotion ? "none" : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>DEFAULT WATERFALL</span>
          <span>RS 50 CR LOSS</span>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-4">
          <div>
            <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">Who pays?</div>
            <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
              A clearing member fails. The waterfall gives the loss a path.
            </div>
          </div>
          <div className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-brand">
            PRE-WRITTEN
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4">
        {layers.map((layer, index) => (
          <div
            key={layer.title}
            className="rounded-lg border border-border bg-card p-3 text-card-foreground"
            style={reveal(index * 120)}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground">
                  {layer.label}
                </span>
                <span className="text-[10px] font-bold tracking-wide">{layer.title}</span>
              </div>
              <span className="text-[10px] font-bold tracking-wide text-brand">{layer.amount}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className={`${layer.width} h-full rounded-full bg-brand`} />
            </div>
            <div className="mt-2 text-[9px] font-bold leading-snug tracking-wide text-muted-foreground">
              {layer.note}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground" style={reveal(560)}>
        LOSS GETS A STAIRCASE BEFORE PANIC GETS A VOTE
      </div>
    </div>
  );
}

export { DefaultWaterfallIllustration };
