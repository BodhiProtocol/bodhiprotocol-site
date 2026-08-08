import { ArrowDown, Check, X } from "lucide-react";

import { FieldLabel } from "@/components/ba-playbooks/field-label";

interface BeforeAfterProps {
  before: string | string[];
  after: string | string[];
  label?: string;
}

function BeforeAfter({ before, after, label = "The shift" }: BeforeAfterProps) {
  const beforeLines = Array.isArray(before) ? before : [before];
  const afterLines = Array.isArray(after) ? after : [after];

  return (
    <div className="not-prose flex flex-col items-stretch gap-2">
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <div className="flex flex-col gap-1.5 rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2.5 text-sm">
        {beforeLines.map((line) => (
          <div key={line} className="flex items-start gap-2">
            <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <span className="text-foreground/90">{line}</span>
          </div>
        ))}
      </div>
      <ArrowDown className="mx-auto size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="flex flex-col gap-1.5 rounded-lg border border-brand/25 bg-brand/5 px-3 py-2.5 text-sm">
        {afterLines.map((line) => (
          <div key={line} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <span className="text-foreground/90">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { BeforeAfter };
