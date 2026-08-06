import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazily creates the newsletter table on first use, same pattern as
// lib/analytics/db.ts. Cached per lambda instance.
let schemaReady: Promise<void> | null = null;

function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id BIGSERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        source TEXT,
        subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
      .then(() => undefined)
      .catch((error) => {
        schemaReady = null;
        throw error;
      });
  }
  return schemaReady;
}

export class NewsletterNotConfiguredError extends Error {
  constructor() {
    super(
      "DATABASE_URL is not set -- the newsletter database hasn't been connected yet.",
    );
    this.name = "NewsletterNotConfiguredError";
  }
}

async function getSql(): Promise<NeonQueryFunction<false, false>> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new NewsletterNotConfiguredError();
  }
  const sql = neon(connectionString);
  await ensureSchema(sql);
  return sql;
}

export type SubscribeResult = "subscribed" | "already_subscribed";

/** Inserts an email into the subscriber list. Idempotent -- re-subscribing is a no-op. */
export async function subscribeToNewsletter(
  email: string,
  source: string | null,
): Promise<SubscribeResult> {
  const sql = await getSql();
  const rows = await sql`
    INSERT INTO newsletter_subscribers (email, source)
    VALUES (${email}, ${source})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `;
  return rows.length > 0 ? "subscribed" : "already_subscribed";
}
