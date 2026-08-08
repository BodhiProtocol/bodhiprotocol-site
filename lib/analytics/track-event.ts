import { track as trackVercelEvent } from "@vercel/analytics";

type EventMetadata = Record<string, string | number | boolean>;

// Client-side helper for the named product events (as opposed to the automatic
// pageview/heartbeat in components/analytics/tracker.tsx). Reports to both
// existing analytics providers -- the first-party /api/collect pipeline (same
// visitor/session data every other event joins against) and Vercel Analytics
// (already installed for pageviews via <Analytics /> in app/layout.tsx, so this
// is not a new vendor, just its existing custom-event API). Fire-and-forget and
// silent on failure -- an analytics hiccup must never affect what a visitor sees.
export function trackEvent(name: string, metadata?: EventMetadata): void {
  if (typeof window === "undefined") return;

  try {
    trackVercelEvent(name, metadata);
  } catch {
    // Ignore -- e.g. Vercel Analytics not active in this environment.
  }

  try {
    fetch("/api/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        type: "event",
        name,
        path: window.location.pathname,
        metadata,
      }),
    }).catch(() => undefined);
  } catch {
    // Ignore -- e.g. fetch unavailable or blocked.
  }
}
