"use client";

import * as React from "react";
import { Check, Link2, Share2 } from "lucide-react";

import { trackEvent } from "@/lib/analytics/track-event";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  url: string;
  className?: string;
  shareLabel?: string;
  copiedLabel?: string;
  copiedSrLabel?: string;
  eventName?: string;
}

// Uses the Web Share API where the browser supports it (mobile Safari/Chrome);
// falls back to copying the link, since there's no reliable cross-browser
// share sheet otherwise. Never fakes a share it can't actually perform.
function ShareButton({
  title,
  url,
  className,
  shareLabel = "Share playbook",
  copiedLabel = "Link copied",
  copiedSrLabel = "Link copied to clipboard",
  eventName = "ba_playbook_shared",
}: ShareButtonProps) {
  const [state, setState] = React.useState<"idle" | "copied">("idle");
  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  React.useEffect(() => {
    if (state !== "copied") return;
    const timeout = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(timeout);
  }, [state]);

  async function handleClick() {
    if (canNativeShare) {
      try {
        await navigator.share({ title, url });
        trackEvent(eventName, { method: "web-share" });
        return;
      } catch {
        // User cancelled the native share sheet, or it failed — fall through to copy.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
      trackEvent(eventName, { method: "copy-link" });
    } catch {
      // Clipboard permission denied — nothing else to do here.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-foreground/30 hover:bg-muted",
        state === "copied" && "border-brand/40 text-brand hover:border-brand/40",
        className,
      )}
    >
      {state === "copied" ? (
        <Check className="size-3.5" />
      ) : canNativeShare ? (
        <Share2 className="size-3.5" />
      ) : (
        <Link2 className="size-3.5" />
      )}
      {state === "copied" ? copiedLabel : shareLabel}
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? copiedSrLabel : ""}
      </span>
    </button>
  );
}

export { ShareButton };
