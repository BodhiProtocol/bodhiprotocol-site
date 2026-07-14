const productionUrl = "https://bodhiprotocol.com";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : productionUrl);

export const siteConfig = {
  name: "BodhiProtocol",
  url: siteUrl,
  title: "BodhiProtocol — Understand Complex Systems",
  description:
    "Essays, visual explanations, and interactive learning experiences on AI, capital markets, business analysis, decision making, and economics.",
};
