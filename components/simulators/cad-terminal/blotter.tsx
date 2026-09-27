import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import type { BlotterRecord } from "./types";

const columns = ["ID", "Instrument", "Side", "Qty", "CumQty", "LeavesQty", "Status", "Last Price"];

function Blotter({ rows, activeId }: { rows: BlotterRecord[]; activeId: string }) {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-2xl border border-border">
      <div className="min-w-[720px]">
        <div className="grid grid-cols-[110px_140px_64px_80px_80px_90px_110px_1fr] gap-0 border-b border-border bg-muted/40">
          {columns.map((col) => (
            <div
              key={col}
              className="px-3 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase"
            >
              {col}
            </div>
          ))}
        </div>
        {rows.map((row) => {
          const active = row.id === activeId;
          return (
            <div
              key={row.id}
              className={cn(
                "grid grid-cols-[110px_140px_64px_80px_80px_90px_110px_1fr] items-center gap-0 border-b border-border text-sm last:border-b-0",
                active ? "bg-brand/[0.06] ring-1 ring-inset ring-brand/30" : "bg-card",
              )}
            >
              <div className="px-3 py-2.5">
                <div className="font-mono text-[9px] tracking-[0.1em] text-muted-foreground uppercase">
                  {row.idLabel}
                </div>
                <div className={cn("font-mono text-xs font-semibold", active ? "text-brand" : "text-card-foreground")}>
                  {row.id}
                </div>
              </div>
              <div className="truncate px-3 py-2.5 text-card-foreground">{row.instrument}</div>
              <div
                className={cn(
                  "px-3 py-2.5 font-mono text-xs font-semibold",
                  row.side === "Buy" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
                )}
              >
                {row.side}
              </div>
              <div className="px-3 py-2.5 font-mono text-xs tabular-nums text-card-foreground">
                {row.qty.toLocaleString("en-IN")}
              </div>
              <div className="px-3 py-2.5 font-mono text-xs tabular-nums text-card-foreground">
                {row.cumQty.toLocaleString("en-IN")}
              </div>
              <div className="px-3 py-2.5 font-mono text-xs tabular-nums text-card-foreground">
                {row.leavesQty.toLocaleString("en-IN")}
              </div>
              <div className="px-3 py-2.5">
                <StatusBadge status={row.status} />
              </div>
              <div className="px-3 py-2.5 font-mono text-xs tabular-nums text-card-foreground">{row.lastPrice}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Blotter };
