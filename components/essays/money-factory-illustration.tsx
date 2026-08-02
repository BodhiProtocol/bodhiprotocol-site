"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rounds = [
  {
    bank: "Bank 1",
    deposit: "₹1,000",
    reserve: "₹100",
    loan: "₹900",
    reserveWidth: "w-[10%]",
    loanWidth: "w-[90%]",
  },
  {
    bank: "Bank 2",
    deposit: "₹900",
    reserve: "₹90",
    loan: "₹810",
    reserveWidth: "w-[10%]",
    loanWidth: "w-[81%]",
  },
  {
    bank: "Bank 3",
    deposit: "₹810",
    reserve: "₹81",
    loan: "₹729",
    reserveWidth: "w-[10%]",
    loanWidth: "w-[73%]",
  },
];

function MoneyFactoryIllustration() {
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
          <span>DEPOSIT MULTIPLIER</span>
          <span>10% RESERVE RATIO</span>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-4">
          <div>
            <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
              ₹1,000 walks in.
            </div>
            <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
              How much money exists once the loop runs?
            </div>
          </div>
          <div className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-brand">
            THE LOOP
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4">
        {rounds.map((round, index) => (
          <div
            key={round.bank}
            className="rounded-lg border border-border bg-card p-3 text-card-foreground"
            style={reveal(index * 150)}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold tracking-wide">{round.bank}</span>
              <span className="text-[10px] font-bold tracking-wide text-muted-foreground">
                receives {round.deposit}
              </span>
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-muted">
              <div className={`${round.reserveWidth} h-full bg-muted-foreground/40`} />
              <div className={`${round.loanWidth} h-full bg-brand`} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] font-bold tracking-wide text-muted-foreground">
              <span>keeps {round.reserve}</span>
              <span className="text-brand">lends {round.loan} onward</span>
            </div>
          </div>
        ))}

        <div
          className="rounded-lg border border-dashed border-border p-2.5 text-center text-[9px] font-bold tracking-wide text-muted-foreground"
          style={reveal(rounds.length * 150)}
        >
          ⋯ repeats at Bank 4, Bank 5, and onward ⋯
        </div>
      </div>

      <div
        className="border-t border-border bg-background/70 p-3 text-center"
        style={reveal(rounds.length * 150 + 150)}
      >
        <div className="text-[9px] font-bold tracking-wide text-muted-foreground">
          TOTAL MONEY CREATED FROM ₹1,000 CASH
        </div>
        <div className="mt-1 text-[16px] font-bold tracking-tight text-brand">≈ ₹10,000</div>
      </div>
    </div>
  );
}

export { MoneyFactoryIllustration };
