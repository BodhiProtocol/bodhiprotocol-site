-- Analytics schema for the hidden BodhiProtocol dashboard.
-- Reference only -- these tables are created automatically (CREATE TABLE IF NOT EXISTS)
-- the first time the app talks to the database, via lib/analytics/db.ts. You never need
-- to run this file by hand.

-- One row per anonymous visitor. `id` is a random UUID stored in a first-party cookie,
-- not tied to any personal information.
CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One row per browsing session (a visit that ends after 30 minutes of inactivity).
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
);

CREATE INDEX IF NOT EXISTS sessions_started_at_idx ON sessions (started_at);
CREATE INDEX IF NOT EXISTS sessions_visitor_id_idx ON sessions (visitor_id);

-- One row per page viewed within a session.
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions (id),
  path TEXT NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  duration_ms INTEGER,
  scroll_depth INTEGER
);

CREATE INDEX IF NOT EXISTS page_views_session_id_idx ON page_views (session_id);
CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views (path);
CREATE INDEX IF NOT EXISTS page_views_viewed_at_idx ON page_views (viewed_at);
