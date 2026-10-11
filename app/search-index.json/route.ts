import { getSearchIndex } from "@/lib/search-index";

// The full-text index (every entry's content, ~1.6 MB) is served once as a
// static file and fetched only when someone opens search. It used to be passed
// through the root layout, which embedded it in every page's HTML and every
// prefetch payload -- the main cause of the Oct 2026 Vercel bandwidth overage.
export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchIndex());
}
