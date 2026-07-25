"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function RepoIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  const connector = (delay: number, tag: string, sub: string) => (
    <div className="flex flex-col items-center gap-1 py-1.5" style={fade(delay)}>
      <span className="h-2.5 w-px bg-border" />
      <span className="rounded-full bg-brand px-2 py-0.5 text-[8px] font-bold tracking-wide text-brand-foreground">
        {tag}
      </span>
      <span className="text-[8px] font-bold tracking-wide text-muted-foreground">{sub}</span>
      <span className="h-2.5 w-px bg-border" />
    </div>
  );

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        THE OWNERSHIP FLIP
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <div
          className="flex w-full flex-col items-center gap-0.5 rounded-lg border border-border bg-card px-3 py-2 text-center"
          style={fade(0)}
        >
          <span className="text-[10px] font-semibold text-card-foreground">Party A</span>
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">OWNS THE BOND</span>
        </div>

        {connector(150, "DAY 0 · FLIPS", "Bond → · ← Cash")}

        <div
          className="flex w-full flex-col items-center gap-0.5 rounded-lg border border-brand/60 bg-brand/10 px-3 py-2 text-center"
          style={fade(300)}
        >
          <span className="text-[10px] font-semibold text-card-foreground">Party B</span>
          <span className="text-[8px] font-bold tracking-wide text-brand">LEGAL OWNER · DURING REPO</span>
        </div>

        {connector(450, "DAY N · FLIPS BACK", "← Bond · Cash + Rate →")}

        <div
          className="flex w-full flex-col items-center gap-0.5 rounded-lg border border-border bg-card px-3 py-2 text-center"
          style={fade(600)}
        >
          <span className="text-[10px] font-semibold text-card-foreground">Party A</span>
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">OWNS THE BOND AGAIN</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">2 FLIPS, 1 AGREEMENT</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">TITLE MOVES FIRST</span>
      </div>
    </div>
  );
}

export { RepoIllustration };
