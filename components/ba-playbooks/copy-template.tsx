import { CopyButton } from "@/components/ba-playbooks/copy-button";
import { cn } from "@/lib/utils";

interface CopyTemplateProps {
  template: string;
  label?: string;
  /** Caps the preview height with an internal scroll — for long templates, so the card itself stays a reasonable height. */
  scrollable?: boolean;
}

function CopyTemplate({ template, label = "Copy template", scrollable = false }: CopyTemplateProps) {
  return (
    <div className="not-prose flex flex-col gap-2">
      <pre
        className={cn(
          "overflow-x-auto rounded-lg border border-border bg-muted/40 px-3 py-2.5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground/85",
          scrollable && "max-h-56 overflow-y-auto",
        )}
      >
        {template}
      </pre>
      <CopyButton value={template} label={label} />
    </div>
  );
}

export { CopyTemplate };
