import { Boxes, Brain, Layers, Network, Route, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface EssaySeries {
  id: string;
  title: string;
  /** One line explaining the arc — shown under the series title on the rail. */
  blurb: string;
  icon: LucideIcon;
  /** Reading order. This array is the single source of truth for series membership. */
  slugs: string[];
  /** Where a reader goes after finishing this series, if anywhere. */
  nextSeriesId?: string;
  /** Marks the entry point for a reader new to the whole body of work. */
  recommendedStart?: boolean;
}

// Reading order lives here rather than in 34 MDX frontmatter blocks so there is
// exactly one place to reorder a series — and no way for the two to drift.
export const essaySeries: EssaySeries[] = [
  {
    id: "how-a-trade-moves",
    title: "How a Trade Moves",
    blurb:
      "Zooming in from the trading floor to the nine systems behind a single click.",
    icon: Route,
    slugs: [
      "shiv-pressed-buy-trade-execution",
      "what-a-trade-lifecycle-actually-looks-like",
      "infrastructure-the-nine-systems-behind-every-trade",
      "a-bank-trading-floor-is-a-marketplace-for-risk",
      "capital-market-system-two-paths-one-market",
    ],
    nextSeriesId: "execution-algorithms",
    recommendedStart: true,
  },
  {
    id: "execution-algorithms",
    title: "Execution Algorithms",
    blurb:
      "The benchmarks a trader is graded against, then the algorithms built to beat them.",
    icon: Workflow,
    slugs: [
      "how-order-books-work",
      "vwap-the-benchmark-every-trader-is-graded-against",
      "arrival-price-the-clock-that-starts-when-you-decide",
      "implementation-shortfall-the-cost-of-time-between-deciding-and-doing",
      "twap-how-to-buy-a-mountain-without-moving-the-price",
      "pov-the-algorithm-that-never-trades-alone",
      "iceberg-orders-the-trade-that-hides-its-own-size",
      "sniper-algorithms-waiting-for-the-moment-that-matters",
      "what-spoofing-actually-looks-like",
    ],
    nextSeriesId: "derivatives-and-funding",
  },
  {
    id: "derivatives-and-funding",
    title: "Derivatives & Funding",
    blurb:
      "Five contracts that move risk and cash without moving the asset — then a closer look at what makes a bond's price move at all.",
    icon: Layers,
    slugs: [
      "options-the-right-to-walk-away",
      "futures-the-bet-that-settles-every-single-day",
      "forwards-the-same-bet-without-the-safety-net",
      "swaps-the-number-that-never-moves",
      "bonds-the-fixed-deposit-you-can-sell",
      "duration-why-a-30-year-bond-moves-more-than-a-1-year-bond",
      "yield-curve-why-short-rates-and-long-rates-never-move-together",
      "convexity-why-the-bond-fell-less-than-duration-predicted",
      "credit-spread-the-extra-yield-thats-not-about-interest-rates",
      "repo-the-overnight-loan-thats-legally-two-trades",
    ],
    nextSeriesId: "clearing-and-counterparty-risk",
  },
  {
    id: "clearing-and-counterparty-risk",
    title: "Clearing & Counterparty Risk",
    blurb:
      "A clearinghouse steps in, takes collateral, declares it final — and what happens when a member fails anyway.",
    icon: Network,
    slugs: [
      "novation-how-a-clearinghouse-becomes-everyones-counterparty",
      "margin-how-a-clearinghouse-turns-fear-into-collateral",
      "netting-how-finance-cancels-a-mountain-of-debt-into-a-pebble",
      "settlement-finality-when-a-trade-stops-being-a-promise",
      "default-waterfall-who-pays-when-a-clearing-member-fails",
      "the-financial-dominoes-why-one-default-rarely-stays-one-default",
    ],
  },
  {
    id: "decisions-under-uncertainty",
    title: "Decisions Under Uncertainty",
    blurb: "The mental models that separate a good decision from a good outcome.",
    icon: Brain,
    slugs: [
      "a-good-decision-can-still-lose",
      "the-base-rate-is-usually-the-whole-answer",
      "opportunity-cost-is-the-only-cost-that-matters",
      "sunk-costs-cant-answer-the-question-youre-asking",
      "people-respond-to-incentives-not-instructions",
      "the-decisions-that-never-stopped-billing",
      "weve-seen-this-movie-before",
    ],
  },
  {
    id: "the-analysts-craft",
    title: "The Analyst's Craft",
    blurb:
      "From a stakeholder's vague sentence to a test case an engineer can actually build against.",
    icon: Boxes,
    slugs: [
      "why-jargon-is-a-wall",
      "the-acronym-wall-every-new-banking-ba-hits",
      "from-stakeholder-sentence-to-acceptance-criteria",
      "writing-requirements-that-survive-contact-with-engineering",
      "what-happens-between-a-jira-ticket-and-a-test-case",
      "why-jira-tickets-rot-in-backlog",
    ],
  },
];

const seriesBySlug = new Map<string, { series: EssaySeries; order: number }>();
for (const series of essaySeries) {
  series.slugs.forEach((slug, index) => {
    seriesBySlug.set(slug, { series, order: index + 1 });
  });
}

/** Series membership for an essay slug, or undefined if it stands alone. */
export function getSeriesForSlug(slug: string) {
  return seriesBySlug.get(slug);
}

export function getSeriesById(id: string) {
  return essaySeries.find((series) => series.id === id);
}
