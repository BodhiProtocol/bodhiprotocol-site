"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { trackEvent } from "@/lib/analytics/track-event";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  /** Text to write to the clipboard on click. */
  value: string;
  label?: string;
  copiedLabel?: string;
  /** Renders as an icon-only square button (visible label becomes a tooltip/sr-only string) — for compact rows. */
  iconOnly?: boolean;
  className?: string;
}

// Bare copy-to-clipboard button with a timed "Copied" confirmation.
// CopyTemplate wraps this with a preview block; other spots (e.g. the guide's
// closing actions, or TemplateList's compact rows) use it directly.
function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  iconOnly = false,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      trackEvent("ba_playbook_template_copied", { label });
    } catch {
      // Clipboard permission denied — nothing else to do here.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={iconOnly ? label : undefined}
      aria-label={iconOnly ? label : undefined}
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-md border border-border text-xs font-medium transition-colors hover:border-foreground/30 hover:bg-muted",
        iconOnly ? "justify-center p-1.5" : "px-2.5 py-1.5",
        copied && "border-brand/40 text-brand hover:border-brand/40",
        className,
      )}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {iconOnly ? null : copied ? copiedLabel : label}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}

export { CopyButton };
