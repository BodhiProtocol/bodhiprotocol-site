"use client";

import * as React from "react";
import { Bookmark } from "lucide-react";

import { cn } from "@/lib/utils";

interface SavePlaybookButtonProps {
  className?: string;
  label?: string;
  hintPrefix?: string;
  hintSuffix?: string;
}

// Browsers don't expose a JS API to add a bookmark, so "saving" is a real,
// honest hint at the native shortcut rather than a fake action.
function SavePlaybookButton({
  className,
  label = "Save this BA Playbook",
  hintPrefix = "Press ",
  hintSuffix = " to bookmark this page",
}: SavePlaybookButtonProps) {
  const [showHint, setShowHint] = React.useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform ?? "");
  const shortcut = isMac ? "⌘D" : "Ctrl+D";

  React.useEffect(() => {
    if (!showHint) return;
    const timeout = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timeout);
  }, [showHint]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowHint(true)}
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-foreground/30 hover:bg-muted",
          className,
        )}
      >
        <Bookmark className="size-3.5" />
        {label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {showHint ? `${hintPrefix}${shortcut}${hintSuffix}` : ""}
      </span>
      {showHint ? (
        <div className="absolute top-full left-0 z-10 mt-2 w-max rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md">
          {hintPrefix}
          <span className="font-mono font-medium">{shortcut}</span>
          {hintSuffix}
        </div>
      ) : null}
    </div>
  );
}

export { SavePlaybookButton };
