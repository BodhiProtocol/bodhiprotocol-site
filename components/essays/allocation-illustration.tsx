"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function AllocationIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion
      ? "none"
      : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
  });

  const accounts = [
    { label: "Fund A", pct: "40%" },
    { label: "Fund B", pct: "25%" },
    { label: "Fund C", pct: "20%" },
    { label: "Fund D", pct: "15%" },
  ];

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-muted p-4 font-mono text-[10px] text-foreground sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
        <span className="font-bold uppercase text-muted-foreground">
          One block, many owners
        </span>
        <span className="rounded-full bg-brand px-2.5 py-1 font-bold uppercase text-brand-foreground">
          Allocation
        </span>
      </div>

      <div
        className="grid gap-2 rounded-xl border border-border bg-card p-3"
        style={fade(0)}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase text-muted-foreground">
            1. Instruction — before fills
          </span>
          <span className="text-brand">09:14:02</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {accounts.map((account) => (
            <span
              key={account.label}
              className="rounded-full border border-brand/30 bg-brand/10 px-2 py-1 font-bold text-brand"
            >
              {account.label} {account.pct}
            </span>
          ))}
        </div>
      </div>

      <div className="my-2 flex justify-center text-muted-foreground" style={fade(120)}>
        ↓ proportions locked, prices unknown ↓
      </div>

      <div
        className="grid gap-2 rounded-xl border border-border bg-card p-3"
        style={fade(220)}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase text-muted-foreground">
            2. Block executes — 3 fills
          </span>
          <span className="text-foreground">09:14:41 → 09:18:07</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="rounded-lg bg-background px-2 py-1.5 text-center">
            <span className="block text-muted-foreground">Fill 1</span>
            <strong>$41.20</strong>
          </div>
          <div className="rounded-lg bg-background px-2 py-1.5 text-center">
            <span className="block text-muted-foreground">Fill 2</span>
            <strong>$41.55</strong>
          </div>
          <div className="rounded-lg bg-background px-2 py-1.5 text-center">
            <span className="block text-muted-foreground">Fill 3</span>
            <strong>$42.10</strong>
          </div>
        </div>
      </div>

      <div className="my-2 flex justify-center text-muted-foreground" style={fade(340)}>
        ↓ blended to one average price ↓
      </div>

      <div
        className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
        style={fade(440)}
      >
        {accounts.map((account) => (
          <div
            key={account.label}
            className="rounded-lg border border-border bg-card p-2 text-center"
          >
            <span className="block font-bold text-muted-foreground">
              {account.label}
            </span>
            <strong className="block text-brand">$41.62</strong>
            <span className="block text-muted-foreground">avg price</span>
          </div>
        ))}
      </div>

      <div
        className="mt-3 grid gap-1.5 border-t border-dashed border-border pt-3 sm:grid-cols-2"
        style={fade(560)}
      >
        <div className="rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-2 text-center font-bold text-brand">
          decided before price known → fair
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-2 text-center font-bold text-destructive">
          decided after price known → cherry-picking
        </div>
      </div>
    </div>
  );
}

export { AllocationIllustration };
