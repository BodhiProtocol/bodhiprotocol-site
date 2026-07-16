// Resolution order matters for SEO: canonical URLs, OG tags, and the sitemap must
// point at a stable domain, never at a per-deployment URL.
//
// - NEXT_PUBLIC_SITE_URL:            explicit override (set this once a custom domain exists)
// - VERCEL_PROJECT_PRODUCTION_URL:   the project's stable production domain
// - VERCEL_URL:                      unique per-deployment URL — correct only for previews
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const siteConfig = {
  name: "BodhiProtocol",
  url: siteUrl,
  title: "BodhiProtocol — Understand Complex Systems",
  description:
    "Essays, visual explanations, and interactive learning experiences on AI, capital markets, business analysis, decision making, and economics.",
  sameAs: [
    "https://github.com/BodhiProtocol",
    "https://www.linkedin.com/in/surya-singh-7b6ab144/",
  ],
};
