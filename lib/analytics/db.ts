import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazily creates the analytics tables on first use (see schema.sql) so there's no
// manual migration step. Cached per lambda instance -- CREATE TABLE IF NOT EXISTS
// only actually runs once per cold start.
let schemaReady: Promise<void> | null = null;

function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql
      .transaction((tx) => [
        tx`
          CREATE TABLE IF NOT EXISTS visitors (
            id TEXT PRIMARY KEY,
            first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
            last_seen TIMESTAMPTZ NOT NULL DEFAULT now()
          )
        `,
        tx`
          CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            visitor_id TEXT NOT NULL REFERENCES visitors (id),
            started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            last_active_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            referrer_raw TEXT,
            referrer_source TEXT NOT NULL DEFAULT 'direct',
            entry_path TEXT NOT NULL,
            exit_path TEXT,
            country TEXT,
            city TEXT,
            device_type TEXT,
            os TEXT,
            browser TEXT,
            screen_size TEXT
          )
        `,
        tx`CREATE INDEX IF NOT EXISTS sessions_started_at_idx ON sessions (started_at)`,
        tx`CREATE INDEX IF NOT EXISTS sessions_visitor_id_idx ON sessions (visitor_id)`,
        tx`
          CREATE TABLE IF NOT EXISTS page_views (
            id BIGSERIAL PRIMARY KEY,
            session_id TEXT NOT NULL REFERENCES sessions (id),
            path TEXT NOT NULL,
            viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            duration_ms INTEGER,
            scroll_depth INTEGER
          )
        `,
        tx`CREATE INDEX IF NOT EXISTS page_views_session_id_idx ON page_views (session_id)`,
        tx`CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views (path)`,
        tx`CREATE INDEX IF NOT EXISTS page_views_viewed_at_idx ON page_views (viewed_at)`,
      ])
      .then(() => undefined)
      .catch((error) => {
        // Let the next call retry instead of caching a permanent failure.
        schemaReady = null;
        throw error;
      });
  }
  return schemaReady;
}

export class AnalyticsNotConfiguredError extends Error {
  constructor() {
    super(
      "DATABASE_URL is not set -- the analytics database hasn't been connected yet.",
    );
    this.name = "AnalyticsNotConfiguredError";
  }
}

/**
 * Returns a ready-to-query Neon `sql` tagged-template function, creating the
 * analytics tables first if they don't exist yet. Throws AnalyticsNotConfiguredError
 * if DATABASE_URL hasn't been set, so callers can render a friendly setup message
 * instead of a stack trace.
 */
export async function getSql(): Promise<NeonQueryFunction<false, false>> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new AnalyticsNotConfiguredError();
  }
  const sql = neon(connectionString);
  await ensureSchema(sql);
  return sql;
}
