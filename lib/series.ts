import { Activity, Boxes, Brain, Cpu, Layers, Network, Route, Workflow } from "lucide-react";
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

// Reading order lives here rather than in 42 MDX frontmatter blocks so there is
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
      "how-order-books-work",
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
      "Four contracts that move risk without moving the asset, then the two that move the cash.",
    icon: Layers,
    slugs: [
      "futures-the-bet-that-settles-every-single-day",
      "forwards-the-same-bet-without-the-safety-net",
      "options-the-right-to-walk-away",
      "swaps-the-number-that-never-moves",
      "bonds-the-fixed-deposit-you-can-sell",
      "duration-why-a-30-year-bond-moves-more-than-a-1-year-bond",
      "yield-curve-why-short-rates-and-long-rates-never-move-together",
      "convexity-why-the-bond-fell-less-than-duration-predicted",
      "interest-rate-derivatives-the-cut-the-market-already-priced-in",
      "credit-spread-the-extra-yield-thats-not-about-interest-rates",
      "credit-default-swaps-protection-nobody-has-to-own",
      "currency-derivatives-the-gap-arbitrage-was-supposed-to-close",
      "commodity-derivatives-the-barrel-that-cost-less-than-nothing",
      "securitization-one-pool-of-loans-wearing-different-credit-ratings",
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
      "allocation-one-block-trade-many-owners",
      "novation-how-a-clearinghouse-becomes-everyones-counterparty",
      "margin-how-a-clearinghouse-turns-fear-into-collateral",
      "wrong-way-risk-the-hedge-that-fails-when-you-need-it",
      "netting-how-finance-cancels-a-mountain-of-debt-into-a-pebble",
      "settlement-finality-when-a-trade-stops-being-a-promise",
      "default-waterfall-who-pays-when-a-clearing-member-fails",
      "the-financial-dominoes-why-one-default-rarely-stays-one-default",
    ],
  },
  {
    id: "the-equities-desk",
    title: "The Equities Desk",
    blurb:
      "The pieces inside Equities, one at a time — starting with the asset volatility itself became.",
    icon: Activity,
    slugs: [
      "volatility-the-fear-that-moves-faster-than-the-calm",
      "the-greenshoe-option-the-bank-that-shorts-the-stock-it-just-sold",
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
    ],
  },
  {
    id: "understanding-ai",
    title: "Understanding How AI Actually Works",
    blurb:
      "The historical frame, then three mechanics that explain most of what an LLM gets wrong.",
    icon: Cpu,
    slugs: [
      "weve-seen-this-movie-before",
      "tokens-arent-words",
      "context-windows-arent-memory",
      "why-llms-hallucinate",
      "the-learning-dividend",
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
      "scope-creep-is-a-timing-problem",
    ],
  },
];

/**
 * A cross-arc link between two essays that share a mechanism rather than a
 * reading order. These are hand-authored on purpose — frontmatter tags are far
 * too sparse to infer them (most tag combinations across all essays are
 * singletons).
 *
 * Both endpoints must sit in *different* series: an edge between two parts of
 * the same arc is already drawn by the arc itself. `validateBridges` enforces it.
 */
export interface EssayBridge {
  from: string;
  to: string;
  /** Why the two connect — surfaced on the interchange in the concept map. */
  label: string;
}

export const essayBridges: EssayBridge[] = [
  {
    from: "what-a-trade-lifecycle-actually-looks-like",
    to: "implementation-shortfall-the-cost-of-time-between-deciding-and-doing",
    label: "Implementation Shortfall grades this whole lifecycle",
  },
  {
    from: "what-a-trade-lifecycle-actually-looks-like",
    to: "allocation-one-block-trade-many-owners",
    label: "Client account is the field Capture & Enrichment adds — Allocation is how it gets decided",
  },
  {
    from: "implementation-shortfall-the-cost-of-time-between-deciding-and-doing",
    to: "opportunity-cost-is-the-only-cost-that-matters",
    label:
      "The cost of time between deciding and doing is opportunity cost, priced in basis points",
  },
  {
    from: "what-spoofing-actually-looks-like",
    to: "people-respond-to-incentives-not-instructions",
    label:
      "Manipulation is what happens when the reward attaches to the appearance of intent",
  },
  {
    from: "margin-how-a-clearinghouse-turns-fear-into-collateral",
    to: "futures-the-bet-that-settles-every-single-day",
    label: "Daily mark-to-market is margin collected one day in advance",
  },
  {
    from: "a-good-decision-can-still-lose",
    to: "arrival-price-the-clock-that-starts-when-you-decide",
    label: "A benchmark grades the outcome. This grades the decision.",
  },
  {
    from: "forwards-the-same-bet-without-the-safety-net",
    to: "novation-how-a-clearinghouse-becomes-everyones-counterparty",
    label: "The named counterparty a forward can't escape is exactly what novation removes",
  },
  {
    from: "bonds-the-fixed-deposit-you-can-sell",
    to: "opportunity-cost-is-the-only-cost-that-matters",
    label: "A bond's price is opportunity cost, quoted as a number",
  },
  {
    from: "the-money-factory-how-banks-create-money",
    to: "netting-how-finance-cancels-a-mountain-of-debt-into-a-pebble",
    label: "Same compression logic as Netting: gross numbers rarely move in full",
  },
  {
    from: "why-llms-hallucinate",
    to: "the-base-rate-is-usually-the-whole-answer",
    label: "Same confidence-vs-truth problem as The Base Rate",
  },
  {
    from: "what-happens-between-a-jira-ticket-and-a-test-case",
    to: "the-learning-dividend",
    label: "The pipeline runs whether a human runs it or an agent does",
  },
  {
    from: "credit-default-swaps-protection-nobody-has-to-own",
    to: "wrong-way-risk-the-hedge-that-fails-when-you-need-it",
    label: "AIG is the protection seller whose own credit collapsed with the risk it insured",
  },
  {
    from: "securitization-one-pool-of-loans-wearing-different-credit-ratings",
    to: "default-waterfall-who-pays-when-a-clearing-member-fails",
    label: "Two different waterfalls, same discipline: a pre-written order for who gets paid first",
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

// Fails the build rather than silently drawing a bridge the map can't place.
// A standalone essay has no series id, so it never collides with a real arc.
for (const bridge of essayBridges) {
  const from = seriesBySlug.get(bridge.from);
  const to = seriesBySlug.get(bridge.to);

  if (from && to && from.series.id === to.series.id) {
    throw new Error(
      `Bridge "${bridge.from}" → "${bridge.to}" links two parts of ${from.series.id}. ` +
        `The arc already draws that edge — remove the bridge or move an endpoint.`,
    );
  }
}
