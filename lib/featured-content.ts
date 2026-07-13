import type { Lab } from "@/types/content";

// Seed content for the homepage until Phase 7 wires up the real Labs
// pipeline. Essays and Blueprints now come from lib/essays.ts and
// lib/blueprints.ts.

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
