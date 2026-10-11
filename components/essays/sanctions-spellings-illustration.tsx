"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// One listed name, several transliterations arriving on payments. Exact matching lets the
// variants through; fuzzy matching catches them. Spellings are illustrative variants.
const incoming = [
  { name: "DMITRII OVSYANNIKOV", exact: true },
  { name: "DMITRY OVSYANNIKOV", exact: false },
  { name: "DMITRIJ OVSJANNIKOV", exact: false },
];

function SanctionsSpellingsIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  const caught = "text-brand";
  const missed = "text-rose-600 dark:text-rose-500";

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        SANCTIONS SCREENING · ONE NAME, MANY SPELLINGS
      </div>

      <div
        className="mb-3 flex items-center justify-between rounded-md border border-rose-600/40 bg-card px-2 py-1.5 dark:border-rose-500/40"
        style={fade(100)}
      >
        <span className="text-[8px] font-bold tracking-wide text-muted-foreground">ON THE LIST</span>
        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-500">OVSYANNIKOV, Dmitrii</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 gap-y-1.5">
        <span className="text-[7px] font-bold tracking-wide text-muted-foreground">PAYMENT NAME</span>
        <span className="text-center text-[7px] font-bold tracking-wide text-muted-foreground">EXACT</span>
        <span className="text-center text-[7px] font-bold tracking-wide text-muted-foreground" style={fade(1100)}>
          FUZZY
        </span>

        {incoming.map((row, i) => (
          <div key={row.name} className="contents">
            <span className="truncate rounded-[3px] bg-card px-1.5 py-1 text-[8px] font-bold" style={fade(300 + i * 150)}>
              {row.name}
            </span>
            <span
              className={`text-center text-[8px] font-bold ${row.exact ? caught : missed}`}
              style={fade(650 + i * 150)}
            >
              {row.exact ? "✓ HELD" : "✕ PAID"}
            </span>
            <span className={`text-center text-[8px] font-bold ${caught}`} style={fade(1250 + i * 150)}>
              ✓ HELD
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-3 flex items-center justify-between rounded-md bg-rose-600/10 px-2 py-1.5"
        style={fade(1800)}
      >
        <span className="text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
          AND THE OTHER DIRECTION
        </span>
        <span className="text-[8px] font-bold text-rose-600 dark:text-rose-500">DELISTED · STILL FROZEN</span>
      </div>

      <div
        className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5"
        style={fade(1900)}
      >
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">UK: A SPELLING GOT THROUGH</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">INDIA: TWO LISTS, BOTH WAYS</span>
      </div>
    </div>
  );
}

export { SanctionsSpellingsIllustration };
