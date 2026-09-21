import { cn } from "@/lib/utils";
import type { LogLine } from "./types";

const toneClass: Record<LogLine["tone"], string> = {
  brand: "text-brand",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
};

const kindPrefix: Record<LogLine["kind"], string> = {
  sent: "→",
  received: "←",
  info: "·",
};

function MessageLog({ lines }: { lines: LogLine[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="size-2 rounded-full bg-destructive/40" aria-hidden="true" />
        <span className="size-2 rounded-full bg-amber-500/40" aria-hidden="true" />
        <span className="size-2 rounded-full bg-emerald-500/40" aria-hidden="true" />
        <span className="ml-2 font-mono text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Execution log
        </span>
      </div>
      <div className="min-h-[92px] space-y-1.5 p-4">
        {lines.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground">Awaiting order entry…</p>
        ) : (
          lines.map((line, index) => (
            <div key={index} className="grid grid-cols-[92px_16px_1fr] items-start gap-2 font-mono text-xs">
              <span className="text-muted-foreground tabular-nums">{line.time}</span>
              <span className={cn(toneClass[line.tone])} aria-hidden="true">
                {kindPrefix[line.kind]}
              </span>
              <span className={cn("leading-relaxed", toneClass[line.tone])}>{line.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { MessageLog };
