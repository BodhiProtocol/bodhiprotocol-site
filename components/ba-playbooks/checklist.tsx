import { Square } from "lucide-react";

import { FieldLabel } from "@/components/ba-playbooks/field-label";

interface ChecklistProps {
  items: string[];
  label?: string;
}

function Checklist({ items, label = "Checklist" }: ChecklistProps) {
  return (
    <div className="not-prose flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-foreground/90">
            <Square className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Checklist };
