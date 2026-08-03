import type { Essay } from "@/types/content";

import { getAllEssays } from "@/lib/essays";

const capitalMarketsPath = [
  "shiv-pressed-buy-trade-execution",
  "what-a-trade-lifecycle-actually-looks-like",
  "infrastructure-the-nine-systems-behind-every-trade",
  "how-order-books-work",
  "capital-market-system-two-paths-one-market",
  "options-the-right-to-walk-away",
  "futures-the-bet-that-settles-every-single-day",
  "swaps-the-number-that-never-moves",
  "repo-the-overnight-loan-thats-legally-two-trades",
  "novation-how-a-clearinghouse-becomes-everyones-counterparty",
  "margin-how-a-clearinghouse-turns-fear-into-collateral",
  "netting-how-finance-cancels-a-mountain-of-debt-into-a-pebble",
  "settlement-finality-when-a-trade-stops-being-a-promise",
  "default-waterfall-who-pays-when-a-clearing-member-fails",
];

const businessAnalystPath = [
  "why-jargon-is-a-wall",
  "the-acronym-wall-every-new-banking-ba-hits",
  "from-stakeholder-sentence-to-acceptance-criteria",
  "writing-requirements-that-survive-contact-with-engineering",
  "what-happens-between-a-jira-ticket-and-a-test-case",
  "why-jira-tickets-rot-in-backlog",
];

const mentalModelsPath = [
  "a-good-decision-can-still-lose",
  "the-base-rate-is-usually-the-whole-answer",
  "opportunity-cost-is-the-only-cost-that-matters",
  "sunk-costs-cant-answer-the-question-youre-asking",
  "people-respond-to-incentives-not-instructions",
  "the-decisions-that-never-stopped-billing",
  "weve-seen-this-movie-before",
];

const paths = [capitalMarketsPath, businessAnalystPath, mentalModelsPath];

function pickFromPath(essay: Essay, allEssays: Essay[], limit: number) {
  const path = paths.find((candidate) => candidate.includes(essay.slug));
  if (!path) return [];

  const essayBySlug = new Map(allEssays.map((item) => [item.slug, item]));
  const start = path.indexOf(essay.slug) + 1;
  return path
    .slice(start)
    .map((slug) => essayBySlug.get(slug))
    .filter((item): item is Essay => Boolean(item))
    .slice(0, limit);
}

export function getReadNextEssays(essay: Essay, limit = 3) {
  const allEssays = getAllEssays();
  const pathPicks = pickFromPath(essay, allEssays, limit);
  if (pathPicks.length >= limit) return pathPicks;

  const used = new Set([essay.slug, ...pathPicks.map((item) => item.slug)]);
  const fallback = allEssays
    .filter((candidate) => !used.has(candidate.slug))
    .filter(
      (candidate) =>
        candidate.category === essay.category ||
        candidate.tags.some((tag) => essay.tags.includes(tag)),
    )
    .slice(0, limit - pathPicks.length);

  return [...pathPicks, ...fallback];
}
