import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

// The root layout appends " — BodhiProtocol" to every page title. Google cuts
// titles off at roughly 60 characters, so when a title is already long the
// suffix only pushes the page's own words past the cut. Drop it in that case.
const BRAND_SUFFIX = ` — ${siteConfig.name}`;
const MAX_TITLE_LENGTH = 60;

export function pageTitle(title: string): Metadata["title"] {
  return title.length + BRAND_SUFFIX.length > MAX_TITLE_LENGTH
    ? { absolute: title }
    : title;
}

// Tags with this many essays or fewer are thin listing pages: still reachable
// for readers, but kept out of Google's index and the sitemap.
export const MIN_INDEXED_TAG_ESSAYS = 3;
