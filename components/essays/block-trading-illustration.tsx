"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function BlockTradingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion
      ? "none"
      : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
  });

  const openBookFills = [
    { label: "Fill 1", price: "₹100.00" },
    { label: "Fill 2", price: "₹100.40" },
    { label: "Fill 3", price: "₹100.85" },
    { label: "Fill 4", price: "₹101.30" },
  ];

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-muted p-4 font-mono text-[10px] text-foreground sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
        <span className="font-bold uppercase text-muted-foreground">
          Same 50,00,000 shares, two paths
        </span>
        <span className="rounded-full bg-brand px-2.5 py-1 font-bold uppercase text-brand-foreground">
          Block trading
        </span>
      </div>

      <div
        className="grid gap-2 rounded-xl border border-border bg-card p-3"
        style={fade(0)}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase text-muted-foreground">
            Path A — worked in the open book
          </span>
          <span className="text-destructive">visible the whole way</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {openBookFills.map((fill) => (
            <div
              key={fill.label}
              className="rounded-lg bg-background px-1.5 py-1.5 text-center"
            >
              <span className="block text-muted-foreground">{fill.label}</span>
              <strong>{fill.price}</strong>
            </div>
          ))}
        </div>
        <div className="text-center font-bold text-destructive">
          each fill tips off the next seller → +1.3% market impact
        </div>
      </div>

      <div className="my-2 flex justify-center text-muted-foreground" style={fade(120)}>
        ↓ vs ↓
      </div>

      <div
        className="grid gap-2 rounded-xl border border-border bg-card p-3"
        style={fade(220)}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase text-muted-foreground">
            Path B — negotiated as a block
          </span>
          <span className="text-brand">private until it prints</span>
        </div>
        <div className="grid grid-cols-3 items-center gap-1.5">
          <div className="rounded-lg bg-background px-1.5 py-2 text-center text-muted-foreground">
            two sides agree, full size
          </div>
          <div className="rounded-lg border border-brand/30 bg-brand/10 px-1.5 py-2 text-center font-bold text-brand">
            ONE PRINT
          </div>
          <div className="rounded-lg bg-background px-1.5 py-2 text-center">
            <strong>₹100.15</strong>
            <span className="block text-muted-foreground">full 50,00,000</span>
          </div>
        </div>
      </div>

      <div className="my-2 flex justify-center text-muted-foreground" style={fade(340)}>
        ↓ becomes public only once it is done ↓
      </div>

      <div
        className="mt-1 grid gap-1.5 border-t border-dashed border-border pt-3 sm:grid-cols-2"
        style={fade(440)}
      >
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-2 text-center font-bold text-destructive">
          negotiated in public → price moves against you
        </div>
        <div className="rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-2 text-center font-bold text-brand">
          negotiated in private, reported after → one clean price
        </div>
      </div>
    </div>
  );
}

export { BlockTradingIllustration };
