import type { Lab } from "@/types/content";

// The 5 tools with dedicated bodhiprotocol.com subdomains.

export const tools: Lab[] = [
  {
    slug: "jargon-decoder",
    title: "Capital Markets Jargon Decoder",
    description: "Plain-English breakdowns of capital markets terminology with visual diagrams.",
    technology: ["HTML", "JS"],
    status: "live",
    difficulty: "beginner",
    category: "Capital Markets",
    liveUrl: "https://jargon-decoder.bodhiprotocol.com/",
    githubUrl: "https://github.com/BodhiProtocol/jargon-decoder",
  },
  {
    slug: "tech-jargon-decoder",
    title: "Technical Jargon Decoder",
    description: "116 IT, database, and QA terms explained for business analysts and testers.",
    technology: ["HTML", "JS"],
    status: "live",
    difficulty: "beginner",
    category: "Business Analysis",
    liveUrl: "https://tech-jargon-decoder.bodhiprotocol.com/",
    githubUrl: "https://github.com/BodhiProtocol/technical-jargon-decoder",
  },
  {
    slug: "trade-lifecycle-explorer",
    title: "Trade Lifecycle Explorer",
    description: "Interactive walk-through of a trade from execution to settlement.",
    technology: ["HTML", "JS"],
    status: "live",
    difficulty: "intermediate",
    category: "Capital Markets",
    liveUrl: "https://trade-lifecycle-explorer.bodhiprotocol.com/",
    githubUrl: "https://github.com/BodhiProtocol/trade-lifecycle-explorer",
  },
  {
    slug: "layering-spoofing-order-book",
    title: "Layering & Spoofing Order Book Replay",
    description: "Canvas-rendered replay of a simulated layering/spoofing episode, mapped to MAS/CFTC/EU MAR.",
    technology: ["HTML", "JS", "Canvas"],
    status: "live",
    difficulty: "intermediate",
    category: "Capital Markets",
    liveUrl: "https://layering-spoofing-order-book.bodhiprotocol.com/",
    githubUrl: "https://github.com/BodhiProtocol/layering-spoofing-order-book",
  },
  {
    slug: "capital-markets-blueprint-explorer",
    title: "Capital Markets Blueprint Explorer",
    description: "All Capital Markets Lighthouse blueprints in one searchable, filterable view.",
    technology: ["HTML", "JS"],
    status: "live",
    difficulty: "beginner",
    category: "Capital Markets",
    liveUrl: "https://capital-markets-blueprint-explorer.bodhiprotocol.com/",
    githubUrl: "https://github.com/BodhiProtocol/capital-markets-blueprint-explorer",
  },
];

export function getAllTools(): Lab[] {
  return tools;
}
