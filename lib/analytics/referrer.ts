export type ReferrerSource = "google" | "linkedin" | "github" | "direct" | "other";

export const REFERRER_LABELS: Record<ReferrerSource, string> = {
  google: "Google",
  linkedin: "LinkedIn",
  github: "GitHub",
  direct: "Direct",
  other: "Other",
};

/** Classifies a raw `document.referrer` value into one of the buckets the dashboard reports on. */
export function classifyReferrer(
  referrerRaw: string | null | undefined,
  requestHost: string,
): ReferrerSource {
  if (!referrerRaw) return "direct";

  let hostname: string;
  try {
    hostname = new URL(referrerRaw).hostname.toLowerCase();
  } catch {
    return "other";
  }

  if (hostname === requestHost.toLowerCase()) return "direct";
  if (hostname.includes("google.")) return "google";
  if (hostname.includes("linkedin.")) return "linkedin";
  if (hostname.includes("github.")) return "github";
  return "other";
}
