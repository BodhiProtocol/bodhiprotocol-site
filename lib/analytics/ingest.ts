import { getSql } from "./db";
import { getGeo } from "./geo";
import { parseUserAgent } from "./ua";
import { classifyReferrer } from "./referrer";

export type PageviewParams = {
  visitorIdCookie: string | null;
  sessionIdCookie: string | null;
  path: string;
  referrerRaw: string | null;
  screenSize: string | null;
  requestHost: string;
  userAgent: string | null;
  headers: Headers;
};

export type PageviewResult = {
  visitorId: string;
  sessionId: string;
  pageViewId: string;
};

/** Records one pageview, creating the visitor/session rows on first contact. */
export async function recordPageview(params: PageviewParams): Promise<PageviewResult> {
  const sql = await getSql();

  const visitorId = params.visitorIdCookie ?? crypto.randomUUID();
  await sql`
    INSERT INTO visitors (id) VALUES (${visitorId})
    ON CONFLICT (id) DO UPDATE SET last_seen = now()
  `;

  // A session cookie that's still present is trusted as-is -- its own sliding
  // maxAge (refreshed on every request) is what enforces the 30-minute idle
  // timeout, so no separate staleness check is needed here. The UPDATE below
  // still falls back to creating a new session if the row is somehow missing.
  let sessionId = params.sessionIdCookie;
  let reused = false;
  if (sessionId) {
    const rows = await sql`
      UPDATE sessions SET last_active_at = now(), exit_path = ${params.path}
      WHERE id = ${sessionId}
      RETURNING id
    `;
    reused = rows.length > 0;
  }

  if (!reused) {
    sessionId = crypto.randomUUID();
    const geo = getGeo(params.headers);
    const ua = parseUserAgent(params.userAgent);
    const referrerSource = classifyReferrer(params.referrerRaw, params.requestHost);
    await sql`
      INSERT INTO sessions (
        id, visitor_id, referrer_raw, referrer_source, entry_path, exit_path,
        country, city, device_type, os, browser, screen_size
      ) VALUES (
        ${sessionId}, ${visitorId}, ${params.referrerRaw}, ${referrerSource},
        ${params.path}, ${params.path}, ${geo.country}, ${geo.city},
        ${ua.deviceType}, ${ua.os}, ${ua.browser}, ${params.screenSize}
      )
    `;
  }

  const [pageView] = await sql`
    INSERT INTO page_views (session_id, path) VALUES (${sessionId}, ${params.path})
    RETURNING id
  `;

  return { visitorId, sessionId: sessionId!, pageViewId: String(pageView.id) };
}

export type HeartbeatParams = {
  sessionId: string;
  pageViewId: string;
  scrollDepth: number;
};

/** Keeps a session alive and updates the current page's reading time + scroll depth. */
export async function recordHeartbeat(params: HeartbeatParams): Promise<void> {
  const sql = await getSql();
  await sql`UPDATE sessions SET last_active_at = now() WHERE id = ${params.sessionId}`;
  await sql`
    UPDATE page_views
    SET
      duration_ms = GREATEST(0, EXTRACT(EPOCH FROM (now() - viewed_at)) * 1000)::int,
      scroll_depth = GREATEST(COALESCE(scroll_depth, 0), ${params.scrollDepth})
    WHERE id = ${params.pageViewId}::bigint AND session_id = ${params.sessionId}
  `;
}
