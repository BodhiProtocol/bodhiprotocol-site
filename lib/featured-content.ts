import type { Blueprint, Essay, Lab } from "@/types/content";

// Seed content for the homepage until Phases 5-7 wire up the real
// MDX-backed Essays/Lighthouse/Labs pipelines.

export const featuredEssays: Essay[] = [
  {
    slug: "how-order-books-work",
    title: "How Order Books Actually Work",
    description:
      "A visual walk-through of bid/ask spreads, market depth, and why price moves the way it does.",
    category: "Capital Markets",
    tags: ["markets", "trading"],
    author: "Surya",
    date: "Jul 2026",
    readingTime: "6 min",
  },
  {
    slug: "why-llms-hallucinate",
    title: "Why LLMs Hallucinate",
    description:
      "The mechanics behind confident, wrong answers — and what that implies for how you use AI tools.",
    category: "Artificial Intelligence",
    tags: ["ai", "llm"],
    author: "Surya",
    date: "Jul 2026",
    readingTime: "5 min",
  },
  {
    slug: "writing-requirements-that-survive-contact",
    title: "Writing Requirements That Survive Contact With Engineering",
    description:
      "Why most business requirements fall apart in sprint planning, and how to write ones that don't.",
    category: "Business Analysis",
    tags: ["requirements", "process"],
    author: "Surya",
    date: "Jun 2026",
    readingTime: "7 min",
  },
];

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
