"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const HEARTBEAT_INTERVAL_MS = 15_000;

function currentScrollDepthPct(): number {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  if (scrollable <= 0) return 100;
  return Math.min(100, Math.round((window.scrollY / scrollable) * 100));
}

/**
 * Invisible first-party visit tracker. Fires a pageview on every route change
 * (including client-side App Router navigation) and a periodic heartbeat while
 * the tab is visible, so reading time and scroll depth stay roughly accurate
 * without a network call on every scroll/frame.
 */
export function Tracker() {
  const pathname = usePathname();
  const pageViewIdRef = useRef<string | null>(null);
  const maxScrollRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    pageViewIdRef.current = null;
    maxScrollRef.current = currentScrollDepthPct();

    fetch("/api/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        type: "pageview",
        path: pathname,
        referrer: document.referrer,
        screenSize: `${window.screen.width}x${window.screen.height}`,
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { pageViewId?: string } | null) => {
        if (!cancelled && data?.pageViewId) {
          pageViewIdRef.current = data.pageViewId;
        }
      })
      .catch(() => undefined);

    const onScroll = () => {
      maxScrollRef.current = Math.max(maxScrollRef.current, currentScrollDepthPct());
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const sendHeartbeat = (useBeacon: boolean) => {
      const pageViewId = pageViewIdRef.current;
      if (!pageViewId) return;
      const payload = JSON.stringify({
        type: "heartbeat",
        pageViewId,
        path: pathname,
        scrollDepth: maxScrollRef.current,
      });
      if (useBeacon) {
        navigator.sendBeacon?.("/api/collect", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/collect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: payload,
        }).catch(() => undefined);
      }
    };

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") sendHeartbeat(false);
    }, HEARTBEAT_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendHeartbeat(true);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onVisibilityChange);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onVisibilityChange);
      // Client-side route changes don't fire pagehide/visibilitychange, so flush
      // this page's final reading time + scroll depth here instead.
      sendHeartbeat(false);
    };
  }, [pathname]);

  return null;
}
