export type Geo = { country: string | null; city: string | null };

/**
 * Vercel populates these headers at the edge for every request in production --
 * no third-party GeoIP service needed. Both are absent in local dev.
 */
export function getGeo(headers: Headers): Geo {
  const country = headers.get("x-vercel-ip-country");
  const cityRaw = headers.get("x-vercel-ip-city");
  return {
    country: country || null,
    city: cityRaw ? decodeURIComponent(cityRaw) : null,
  };
}
