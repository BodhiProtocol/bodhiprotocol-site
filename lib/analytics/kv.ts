import { Redis } from "@upstash/redis";

const LIVE_KEY_PREFIX = "live-session:";
const LIVE_TTL_SECONDS = 60;

export class AnalyticsKvNotConfiguredError extends Error {
  constructor() {
    super(
      "KV_REST_API_URL / KV_REST_API_TOKEN are not set -- the live-visitor store hasn't been connected yet.",
    );
    this.name = "AnalyticsKvNotConfiguredError";
  }
}

function getRedis(): Redis {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new AnalyticsKvNotConfiguredError();
  }
  return new Redis({ url, token });
}

/**
 * Marks a session as "online now". Called on every pageview and heartbeat.
 * The key expires on its own after LIVE_TTL_SECONDS, so a visitor who closes
 * the tab silently drops off the live count without any cleanup job.
 */
// Deliberately minimal for now -- only the Home Dashboard's online count reads this
// in Phase 1. Extend with device/referrer once the Live Visitors page needs them.
export type LiveSession = {
  path: string;
  country: string | null;
};

export async function markSessionLive(
  sessionId: string,
  info: LiveSession,
): Promise<void> {
  const redis = getRedis();
  await redis.set(`${LIVE_KEY_PREFIX}${sessionId}`, info, {
    ex: LIVE_TTL_SECONDS,
  });
}

/** Returns every session currently marked live, for the "online now" count and list. */
export async function getLiveSessions(): Promise<LiveSession[]> {
  const redis = getRedis();
  const keys = await redis.keys(`${LIVE_KEY_PREFIX}*`);
  if (keys.length === 0) return [];
  const values = await redis.mget<LiveSession[]>(...keys);
  return values.filter((v): v is LiveSession => v != null);
}

/** Returns just the live count -- cheaper than getLiveSessions() when the list isn't needed. */
export async function getLiveCount(): Promise<number> {
  const redis = getRedis();
  const keys = await redis.keys(`${LIVE_KEY_PREFIX}*`);
  return keys.length;
}
