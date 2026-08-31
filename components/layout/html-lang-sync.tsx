"use client";

import { useEffect } from "react";

// The single root layout owns the one <html> tag for the whole app and stays
// statically rendered (lang="en") so every page keeps build-time static
// generation. This syncs the attribute client-side for the one subtree that
// needs a different value, restoring "en" on unmount so navigating back out
// of /pt-br doesn't leave the wrong lang behind.
function HtmlLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}

export { HtmlLangSync };
