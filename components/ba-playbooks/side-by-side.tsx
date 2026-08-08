import { FieldLabel } from "@/components/ba-playbooks/field-label";
import type { PlaybookComparison } from "@/types/content";

// Two distinct-but-related concepts shown neutrally — unlike BeforeAfter, neither
// side is "wrong," so there's no X/check styling, just two labeled panels.
function SideBySide({ leftLabel, left, rightLabel, right }: PlaybookComparison) {
  return (
    <div className="not-prose flex flex-col gap-2">
      <FieldLabel>Compare</FieldLabel>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {leftLabel}
          </p>
          <p className="text-foreground/90">{left}</p>
        </div>
        <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {rightLabel}
          </p>
          <p className="text-foreground/90">{right}</p>
        </div>
      </div>
    </div>
  );
}

export { SideBySide };
