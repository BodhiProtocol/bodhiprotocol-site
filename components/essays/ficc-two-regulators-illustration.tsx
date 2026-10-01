"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

type Regulator = "rbi" | "sebi";

const regulatorTint: Record<Regulator, string> = {
  rbi: "border-sky-500/50 bg-sky-500/15 text-sky-800 dark:text-sky-200",
  sebi: "border-amber-500/50 bg-amber-500/15 text-amber-800 dark:text-amber-200",
};

const regulatorDot: Record<Regulator, string> = {
  rbi: "bg-sky-500",
  sebi: "bg-amber-500",
};

// The essay's three opening characters, each sitting over their letters.
const people = [
  { letters: "F I", name: "Fixed Income", who: "Grandfather's ₹500 loan", span: "col-span-2" },
  { letters: "C", name: "Currencies", who: "Father's $40", span: "col-span-1" },
  { letters: "C", name: "Commodities", who: "Wheat seller", span: "col-span-1" },
];

const desks: { name: string; what: string; regulator: Regulator }[] = [
  { name: "Rates", what: "Govt bonds", regulator: "rbi" },
  { name: "Credit", what: "Corp bonds", regulator: "sebi" },
  { name: "FX", what: "Currencies", regulator: "rbi" },
  { name: "Commod.", what: "Oil, gold", regulator: "sebi" },
];

const regulators: { key: Regulator; name: string; covers: string }[] = [
  { key: "rbi", name: "RBI", covers: "Government bonds · FX" },
  { key: "sebi", name: "SEBI", covers: "Corporate bonds · Commodities (since 2015)" },
];

function FiccTwoRegulatorsIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  // The regulator colour arrives after the desks, so the reader sees the
  // letters first and only then notices the colours don't follow them.
  const tint = (delay: number) => ({
    opacity: played ? 1 : 0,
    transition: reducedMotion ? "none" : `opacity 500ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>FICC IN INDIA</span>
          <span>ONE ACRONYM, TWO BOSSES</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            The line doesn&apos;t follow the letters.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            Fixed Income alone answers to two regulators.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-1.5">
          {people.map((person, index) => (
            <div key={person.name} className={`${person.span} text-center`} style={reveal(60 + index * 110)}>
              <div className="text-[8px] font-bold leading-tight tracking-wide text-muted-foreground">{person.who}</div>
              <div className="mx-auto mt-1 h-2 w-px bg-border" />
              <div className="rounded-lg border border-border bg-card px-1 py-1.5">
                <div className="text-[20px] font-bold leading-none tracking-tight text-card-foreground">
                  {person.letters}
                </div>
                <div className="mt-1 text-[8px] font-bold tracking-wide text-muted-foreground">{person.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(420)}>
          FOUR DESKS UNDER THREE NAMES
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-1.5">
          {desks.map((desk, index) => (
            <div
              key={desk.name}
              className="relative overflow-hidden rounded-lg border border-border bg-card p-2 text-center"
              style={reveal(480 + index * 90)}
            >
              <div
                className={`absolute inset-0 rounded-lg border ${regulatorTint[desk.regulator]}`}
                style={tint(1000 + index * 140)}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="text-[10px] font-bold tracking-wide text-card-foreground">{desk.name}</div>
                <div className="mt-0.5 text-[8px] font-bold tracking-wide text-muted-foreground">{desk.what}</div>
                <div
                  className={`mx-auto mt-1.5 w-fit rounded-full px-1.5 py-0.5 text-[8px] font-bold tracking-wide ${regulatorTint[desk.regulator]}`}
                  style={tint(1000 + index * 140)}
                >
                  {desk.regulator === "rbi" ? "RBI" : "SEBI"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1.5">
          {regulators.map((regulator, index) => (
            <div
              key={regulator.key}
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-2.5"
              style={reveal(1600 + index * 120)}
            >
              <span className={`size-2 shrink-0 rounded-full ${regulatorDot[regulator.key]}`} />
              <span className="w-9 shrink-0 text-[9px] font-bold tracking-wide text-card-foreground">{regulator.name}</span>
              <span className="text-[8px] font-bold tracking-wide text-muted-foreground">{regulator.covers}</span>
            </div>
          ))}
          <div className="text-right text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(1840)}>
            + IFSCA for business booked in GIFT City
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        LONDON CALLS IT ONE BUSINESS. MUMBAI ANSWERS TO TWO REGULATORS.
      </div>
    </div>
  );
}

export { FiccTwoRegulatorsIllustration };
