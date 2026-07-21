"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Mounted site-wide, renders nothing. Ctrl/Cmd+Shift+B jumps to /admin -- the
 * route itself is what actually gates access (see middleware.ts), so this is
 * just a shortcut to get there, not a security boundary.
 */
export function AdminShortcut() {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isShortcut =
        (event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "b";
      if (!isShortcut) return;
      event.preventDefault();
      router.push("/admin");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
