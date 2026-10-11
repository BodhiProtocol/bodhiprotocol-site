"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Two independent records of the same trades, row by row. Most match; three break,
// and each kind of break deserves a different level of alarm.
type Status = "match" | "economic" | "reference" | "missing";

const rows: { id: string; desk: string; custodian: string | null; status: Status }[] = [
  { id: "T-101", desk: "INFY · 500", custodian: "INFY · 500", status: "match" },
  { id: "T-102", desk: "TCS · 1,000", custodian: "TCS · 100", status: "economic" },
  { id: "T-103", desk: "ABC Securities", custodian: "ABC Sec Ltd", status: "reference" },
  { id: "T-104", desk: "HDFC · 250", custodian: "HDFC · 250", status: "match" },
  { id: "T-105", desk: "RELI · 800", custodian: null, status: "missing" },
];

const rose = "text-rose-600 dark:text-rose-500";
const amber = "text-amber-600 dark:text-amber-500";

const marker: Record<Status, { symbol: string; className: string }> = {
  match: { symbol: "✓", className: "text-brand" },
  economic: { symbol: "≠", className: rose },
  reference: { symbol: "≈", className: amber },
  missing: { symbol: "?", className: rose },
};

const rowTone: Record<Status, string> = {
  match: "",
  economic: "bg-rose-600/10",
  reference: "bg-amber-500/10",
  missing: "bg-rose-600/15",
};

function ReconciliationBreaksIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        RECONCILIATION · TWO RECORDS, ONE SET OF TRADES
      </div>

      <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-x-2 gap-y-1">
        <span />
        <span className="text-[7px] font-bold tracking-wide text-muted-foreground">DESK BOOK</span>
        <span />
        <span className="text-[7px] font-bold tracking-wide text-muted-foreground">CUSTODIAN</span>

        {rows.map((row, i) => {
          const delay = 150 + i * 160;
          const flagged = row.status !== "match";
          return (
            <div key={row.id} className="contents">
              <span className="text-[7px] font-bold text-muted-foreground" style={fade(delay)}>
                {row.id}
              </span>
              <span
                className={`rounded-[3px] px-1.5 py-1 text-[8px] font-bold ${flagged ? rowTone[row.status] : "bg-card"}`}
                style={fade(delay)}
              >
                {row.desk}
              </span>
              <span
                className={`text-center text-[10px] font-bold ${marker[row.status].className}`}
                style={fade(delay + 900)}
              >
                {marker[row.status].symbol}
              </span>
              {row.custodian ? (
                <span
                  className={`rounded-[3px] px-1.5 py-1 text-[8px] font-bold ${flagged ? rowTone[row.status] : "bg-card"}`}
                  style={fade(delay + 80)}
                >
                  {row.custodian}
                </span>
              ) : (
                <span
                  className="rounded-[3px] border border-dashed border-rose-600/60 px-1.5 py-1 text-[8px] font-bold text-rose-600/70 dark:border-rose-500/60 dark:text-rose-500/70"
                  style={fade(delay + 80)}
                >
                  — nothing —
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5" style={fade(1900)}>
        <div className="flex flex-col items-center rounded-md bg-rose-600/10 px-1 py-1.5 text-center">
          <span className={`text-[8px] font-bold tracking-wide ${rose}`}>≠ ECONOMIC</span>
          <span className="text-[7px] font-bold text-muted-foreground">FIX IT</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-amber-500/10 px-1 py-1.5 text-center">
          <span className={`text-[8px] font-bold tracking-wide ${amber}`}>≈ REFERENCE</span>
          <span className="text-[7px] font-bold text-muted-foreground">SAME THING · CONFIRM</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-rose-600/15 px-1 py-1.5 text-center">
          <span className={`text-[8px] font-bold tracking-wide ${rose}`}>? MISSING</span>
          <span className="text-[7px] font-bold text-muted-foreground">THE LOUDEST</span>
        </div>
      </div>
    </div>
  );
}

export { ReconciliationBreaksIllustration };
