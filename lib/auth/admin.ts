// Admin auth for the hidden analytics dashboard. No user accounts -- a single
// shared password (env var) unlocks a signed session cookie. Uses the Web Crypto
// API exclusively (not Node's `crypto` module) so the same code runs both in
// middleware.ts (Edge runtime) and in the admin API routes (Node runtime).

export const ADMIN_COOKIE_NAME = "bp_admin";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function toBase64Url(bytes: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toBase64Url(digest);
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toBase64Url(signature);
}

/** Compares against ADMIN_PASSWORD via fixed-size digests instead of the raw strings. */
export async function verifyAdminPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const [a, b] = await Promise.all([sha256(candidate), sha256(expected)]);
  return a === b;
}

/** Issues a session token: `<expiresAt>.<hmac signature>`, valid for 30 days. */
export async function createAdminSessionToken(): Promise<string | null> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const signature = await hmac(secret, `admin.${expiresAt}`);
  return `${expiresAt}.${signature}`;
}

/** Verifies a session token's signature and expiry. */
export async function verifyAdminSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const separatorIndex = token.indexOf(".");
  if (separatorIndex === -1) return false;
  const expiresAtRaw = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expectedSignature = await hmac(secret, `admin.${expiresAt}`);
  return expectedSignature === signature;
}
