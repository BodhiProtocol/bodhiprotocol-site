import { cn } from "@/lib/utils";
import type { OrdStatus } from "./types";

const statusStyles: Record<OrdStatus, string> = {
  New: "bg-muted text-muted-foreground",
  PartiallyFilled: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Filled: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  PendingCancel: "bg-brand/10 text-brand",
  Canceled: "bg-destructive/10 text-destructive",
  Settled: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const statusLabels: Record<OrdStatus, string> = {
  New: "New",
  PartiallyFilled: "Partial",
  Filled: "Filled",
  PendingCancel: "Pending Cxl",
  Canceled: "Canceled",
  Settled: "Settled",
};

function StatusBadge({ status, className }: { status: OrdStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-full px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] whitespace-nowrap uppercase",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export { StatusBadge };
