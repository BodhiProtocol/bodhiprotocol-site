import { getSql } from "./db";
import { getAllEssays } from "@/lib/essays";
import { getAllInvisibleBusinesses } from "@/lib/invisible-businesses";
import { getAllGreatMinds } from "@/lib/great-minds";
import { getAllBlueprints } from "@/lib/blueprints";
import type { ReferrerSource } from "./referrer";

/** Maps a tracked path back to a human-readable title using the site's own content loaders. */
function resolvePageTitle(path: string | null): string | null {
  if (!path) return null;
  const slug = path.split("/").filter(Boolean).pop();
  if (!slug) return path;

  if (path.startsWith("/essays/")) {
    return getAllEssays().find((e) => e.slug === slug)?.title ?? path;
  }
  if (path.startsWith("/invisible-businesses/")) {
    return getAllInvisibleBusinesses().find((e) => e.slug === slug)?.title ?? path;
  }
  if (path.startsWith("/great-minds/")) {
    return getAllGreatMinds().find((e) => e.slug === slug)?.name ?? path;
  }
  if (path.startsWith("/lighthouse/")) {
    return getAllBlueprints().find((b) => b.slug === slug)?.title ?? path;
  }
  return path;
}

export type DashboardStats = {
  visitorsToday: number;
  visitorsWeek: number;
  visitorsMonth: number;
  avgReadingTimeMs: number | null;
  bounceRatePct: number | null;
  topArticle: { title: string; views: number } | null;
  topLearningPath: { title: string; views: number } | null;
  topCountry: { name: string; visitors: number } | null;
  topReferrer: { source: ReferrerSource; count: number } | null;
};

/**
 * One round-trip to Postgres for every Home Dashboard card (all scoped to a rolling
 * 30-day window except the "today"/"week" counts). Uses scalar subqueries so every
 * field comes back on a single row even when a bucket has no data yet.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const sql = await getSql();

  const [row] = await sql`
    WITH today AS (
      SELECT COUNT(DISTINCT visitor_id) AS n FROM sessions
      WHERE last_active_at >= date_trunc('day', now())
    ),
    week AS (
      SELECT COUNT(DISTINCT visitor_id) AS n FROM sessions
      WHERE last_active_at >= now() - interval '7 days'
    ),
    month AS (
      SELECT COUNT(DISTINCT visitor_id) AS n FROM sessions
      WHERE last_active_at >= now() - interval '30 days'
    ),
    reading AS (
      SELECT AVG(duration_ms) AS ms FROM page_views
      WHERE duration_ms IS NOT NULL AND viewed_at >= now() - interval '30 days'
    ),
    session_page_counts AS (
      SELECT session_id, COUNT(*) AS c FROM page_views
      WHERE viewed_at >= now() - interval '30 days'
      GROUP BY session_id
    ),
    bounce AS (
      SELECT
        CASE WHEN COUNT(*) = 0 THEN NULL
        ELSE round(100.0 * SUM(CASE WHEN c = 1 THEN 1 ELSE 0 END) / COUNT(*), 1)
        END AS pct
      FROM session_page_counts
    ),
    top_article AS (
      SELECT path, COUNT(*) AS views FROM page_views
      WHERE viewed_at >= now() - interval '30 days'
        AND (
          path LIKE '/essays/%'
          OR path LIKE '/invisible-businesses/%'
          OR path LIKE '/great-minds/%'
        )
      GROUP BY path ORDER BY views DESC LIMIT 1
    ),
    top_learning_path AS (
      SELECT path, COUNT(*) AS views FROM page_views
      WHERE viewed_at >= now() - interval '30 days' AND path LIKE '/lighthouse/%'
      GROUP BY path ORDER BY views DESC LIMIT 1
    ),
    top_country AS (
      SELECT country, COUNT(DISTINCT visitor_id) AS n FROM sessions
      WHERE last_active_at >= now() - interval '30 days' AND country IS NOT NULL
      GROUP BY country ORDER BY n DESC LIMIT 1
    ),
    top_referrer AS (
      SELECT referrer_source, COUNT(*) AS n FROM sessions
      WHERE started_at >= now() - interval '30 days'
      GROUP BY referrer_source ORDER BY n DESC LIMIT 1
    )
    SELECT
      (SELECT n FROM today) AS visitors_today,
      (SELECT n FROM week) AS visitors_week,
      (SELECT n FROM month) AS visitors_month,
      (SELECT ms FROM reading) AS avg_reading_ms,
      (SELECT pct FROM bounce) AS bounce_rate_pct,
      (SELECT path FROM top_article) AS top_article_path,
      (SELECT views FROM top_article) AS top_article_views,
      (SELECT path FROM top_learning_path) AS top_learning_path_path,
      (SELECT views FROM top_learning_path) AS top_learning_path_views,
      (SELECT country FROM top_country) AS top_country_name,
      (SELECT n FROM top_country) AS top_country_visitors,
      (SELECT referrer_source FROM top_referrer) AS top_referrer_source,
      (SELECT n FROM top_referrer) AS top_referrer_count
  `;

  const topArticleTitle = resolvePageTitle(row.top_article_path as string | null);
  const topLearningPathTitle = resolvePageTitle(row.top_learning_path_path as string | null);

  return {
    visitorsToday: Number(row.visitors_today ?? 0),
    visitorsWeek: Number(row.visitors_week ?? 0),
    visitorsMonth: Number(row.visitors_month ?? 0),
    avgReadingTimeMs: row.avg_reading_ms != null ? Number(row.avg_reading_ms) : null,
    bounceRatePct: row.bounce_rate_pct != null ? Number(row.bounce_rate_pct) : null,
    topArticle:
      topArticleTitle != null
        ? { title: topArticleTitle, views: Number(row.top_article_views) }
        : null,
    topLearningPath:
      topLearningPathTitle != null
        ? { title: topLearningPathTitle, views: Number(row.top_learning_path_views) }
        : null,
    topCountry:
      row.top_country_name != null
        ? { name: row.top_country_name as string, visitors: Number(row.top_country_visitors) }
        : null,
    topReferrer:
      row.top_referrer_source != null
        ? {
            source: row.top_referrer_source as ReferrerSource,
            count: Number(row.top_referrer_count),
          }
        : null,
  };
}

// Matches the KV TTL used for the Home Dashboard's "Visitors Online" count, so
// both agree on what "live" means even though they're read from different stores.
const LIVE_WINDOW_SECONDS = 60;

export type LiveVisitor = {
  sessionId: string;
  location: string | null;
  currentPage: string;
  device: string | null;
  timeOnPageMs: number;
  referrerSource: ReferrerSource;
};

/**
 * Everyone currently active on the site, most-recently-active first. Reads straight
 * from Postgres (not the KV live-count store) since this needs full per-session
 * detail -- a lateral join keeps it to one query no matter how many are online.
 */
export async function getLiveVisitors(): Promise<LiveVisitor[]> {
  const sql = await getSql();

  const rows = await sql`
    SELECT
      s.id AS session_id,
      s.country,
      s.city,
      s.device_type,
      s.os,
      s.browser,
      s.referrer_source,
      pv.path AS current_path,
      EXTRACT(EPOCH FROM (now() - pv.viewed_at)) * 1000 AS time_on_page_ms
    FROM sessions s
    JOIN LATERAL (
      SELECT path, viewed_at FROM page_views
      WHERE session_id = s.id
      ORDER BY viewed_at DESC
      LIMIT 1
    ) pv ON true
    WHERE s.last_active_at >= now() - interval '1 second' * ${LIVE_WINDOW_SECONDS}
    ORDER BY s.last_active_at DESC
  `;

  return rows.map((row) => ({
    sessionId: row.session_id as string,
    location:
      row.city && row.country
        ? `${row.city}, ${row.country}`
        : (row.country as string | null) ?? null,
    currentPage: resolvePageTitle(row.current_path as string) ?? (row.current_path as string),
    device: [row.browser, row.os].filter(Boolean).join(" · ") || (row.device_type as string | null),
    timeOnPageMs: Math.max(0, Number(row.time_on_page_ms)),
    referrerSource: row.referrer_source as ReferrerSource,
  }));
}
