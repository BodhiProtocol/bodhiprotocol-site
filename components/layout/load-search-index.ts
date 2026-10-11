import type { SearchItem } from "@/lib/search-index";

let pending: Promise<SearchItem[]> | null = null;

/** Fetches /search-index.json once per page load; later callers share the result. */
export function loadSearchIndex(): Promise<SearchItem[]> {
  pending ??= fetch("/search-index.json")
    .then((response) => (response.ok ? (response.json() as Promise<SearchItem[]>) : []))
    .catch(() => {
      pending = null; // let the next open retry after a network blip
      return [];
    });
  return pending;
}
