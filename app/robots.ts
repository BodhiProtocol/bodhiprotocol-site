import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

// AI *training* crawlers re-crawl every page repeatedly and send no readers back;
// their load helped push the site over the Vercel Hobby quota (Oct 2026). AI
// *search* bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot)
// are left allowed on purpose -- they cite and link the site. Search engines and
// link-preview bots (WhatsApp, LinkedIn, X) fall under the "*" rule.
const AI_TRAINING_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "meta-externalagent",
  "Amazonbot",
  "cohere-training-data-crawler",
  "Diffbot",
  "Omgilibot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: AI_TRAINING_CRAWLERS,
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
