import type { LucideIcon } from "lucide-react";

// Shared small-caps label used above every scannable block (comparisons,
// flows, lists) so an opened hack card can be scanned by label alone.
function FieldLabel({ icon: Icon, children }: { icon?: LucideIcon; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
      {Icon ? <Icon className="size-3.5" /> : null}
      {children}
    </p>
  );
}

export { FieldLabel };
