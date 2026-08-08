import { CopyButton } from "@/components/ba-playbooks/copy-button";
import { FieldLabel } from "@/components/ba-playbooks/field-label";
import type { PlaybookTemplate } from "@/types/content";

interface TemplateListProps {
  templates: PlaybookTemplate[];
  label?: string;
}

// Compact one-line-per-entry layout for several named snippets (e.g. saved JQL
// filters) — avoids stacking a full CopyTemplate preview block per entry.
function TemplateList({ templates, label = "Saved filters" }: TemplateListProps) {
  return (
    <div className="not-prose flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
        {templates.map((template) => (
          <div key={template.label} className="flex items-center gap-3 px-3 py-2">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-xs font-medium text-foreground/90">{template.label}</span>
              <code className="overflow-x-auto font-mono text-xs whitespace-nowrap text-muted-foreground">
                {template.value}
              </code>
            </div>
            <CopyButton value={template.value} label={`Copy ${template.label}`} iconOnly />
          </div>
        ))}
      </div>
    </div>
  );
}

export { TemplateList };
