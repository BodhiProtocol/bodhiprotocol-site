import type { Blueprint, Lab } from "@/types/content";

// Seed content for the homepage until Phases 6-7 wire up the real
// Lighthouse/Labs pipelines. Essays now come from lib/essays.ts.

export const featuredBlueprints: Blueprint[] = [
  {
    slug: "supply-and-demand",
    title: "Supply & Demand",
    summary: "The core mechanism behind every price you've ever paid.",
    tags: ["Economics", "Season 1"],
    readingTime: "4 min",
  },
  {
    slug: "the-business-case",
    title: "The Business Case",
    summary: "How organizations decide what's worth building at all.",
    tags: ["Business Analysis", "Season 1"],
    readingTime: "5 min",
  },
  {
    slug: "risk-vs-uncertainty",
    title: "Risk vs. Uncertainty",
    summary: "The distinction that changes how good decision-makers actually think.",
    tags: ["Decision Making", "Season 1"],
    readingTime: "4 min",
  },
];

export const featuredLabs: Lab[] = [
  {
    slug: "trade-lifecycle-explorer",
    title: "Trade Lifecycle Explorer",
    description: "Interactive walk-through of a trade from execution to settlement.",
    technology: ["HTML", "JS"],
    status: "live",
    difficulty: "intermediate",
    category: "Capital Markets",
    liveUrl: "https://bodhiprotocol.github.io/trade-lifecycle-explorer/",
    githubUrl: "https://github.com/BodhiProtocol/trade-lifecycle-explorer",
  },
  {
    slug: "llm-wiki",
    title: "LLM Wiki",
    description: "24 core LLM concepts — tokens, prompting, RAG, embeddings, agents, MCP.",
    technology: ["HTML", "JS"],
    status: "live",
    difficulty: "beginner",
    category: "Artificial Intelligence",
    liveUrl: "https://bodhiprotocol.github.io/llm-wiki/",
    githubUrl: "https://github.com/BodhiProtocol/llm-wiki",
  },
  {
    slug: "regulatory-acronym-map",
    title: "Regulatory Acronym Map",
    description: "114 capital-markets regulatory terms across 10 categories, region-tagged.",
    technology: ["HTML", "JS"],
    status: "live",
    difficulty: "intermediate",
    category: "Capital Markets",
    liveUrl: "https://bodhiprotocol.github.io/regulatory-acronym-map/",
    githubUrl: "https://github.com/BodhiProtocol/regulatory-acronym-map",
  },
];
