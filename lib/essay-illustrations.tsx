import type { ComponentType } from "react";

import { AmlLadderIllustration } from "@/components/essays/aml-ladder-illustration";
import { ArrivalPriceIllustration } from "@/components/essays/arrival-price-illustration";
import { CapitalMarketPathsIllustration } from "@/components/essays/capital-market-paths-illustration";
import { CarriagePhaseIllustration } from "@/components/essays/carriage-phase-illustration";
import { CobraEffectIllustration } from "@/components/essays/cobra-effect-illustration";
import { ConfidenceIllustration } from "@/components/essays/confidence-illustration";
import { ContextWindowIllustration } from "@/components/essays/context-window-illustration";
import { DecisionOutcomeGridIllustration } from "@/components/essays/decision-outcome-grid-illustration";
import { DefaultWaterfallIllustration } from "@/components/essays/default-waterfall-illustration";
import { FsdPipelineIllustration } from "@/components/essays/fsd-pipeline-illustration";
import { IcebergIllustration } from "@/components/essays/iceberg-illustration";
import { ImplementationShortfallIllustration } from "@/components/essays/implementation-shortfall-illustration";
import { JargonWallIllustration } from "@/components/essays/jargon-wall-illustration";
import { JiraBacklogIllustration } from "@/components/essays/jira-backlog-illustration";
import { LearningDividendIllustration } from "@/components/essays/learning-dividend-illustration";
import { MarginIllustration } from "@/components/essays/margin-illustration";
import { MarketInfrastructureIllustration } from "@/components/essays/market-infrastructure-illustration";
import { NettingIllustration } from "@/components/essays/netting-illustration";
import { NovationIllustration } from "@/components/essays/novation-illustration";
import { OpportunityCostIllustration } from "@/components/essays/opportunity-cost-illustration";
import { OrderBookIllustration } from "@/components/essays/order-book-illustration";
import { PovIllustration } from "@/components/essays/pov-illustration";
import { RepoIllustration } from "@/components/essays/repo-illustration";
import { RequirementIllustration } from "@/components/essays/requirement-illustration";
import { RequirementsTranslatorIllustration } from "@/components/essays/requirements-translator-illustration";
import { SettlementFinalityIllustration } from "@/components/essays/settlement-finality-illustration";
import { SniperIllustration } from "@/components/essays/sniper-illustration";
import { SpoofingTimelineIllustration } from "@/components/essays/spoofing-timeline-illustration";
import { SubscriptionBillingIllustration } from "@/components/essays/subscription-billing-illustration";
import { SunkCostIllustration } from "@/components/essays/sunk-cost-illustration";
import { TradeExecutionCardIllustration } from "@/components/essays/trade-execution-essay";
import { TradeLifecycleIllustration } from "@/components/essays/trade-lifecycle-illustration";
import { TradingDesksIllustration } from "@/components/essays/trading-desks-illustration";
import { TwapIllustration } from "@/components/essays/twap-illustration";
import { VwapIllustration } from "@/components/essays/vwap-illustration";

export const essayIllustrations: Record<string, ComponentType> = {
  "weve-seen-this-movie-before": CarriagePhaseIllustration,
  "how-order-books-work": OrderBookIllustration,
  "why-llms-hallucinate": ConfidenceIllustration,
  "writing-requirements-that-survive-contact-with-engineering": RequirementIllustration,
  "the-learning-dividend": LearningDividendIllustration,
  "why-jira-tickets-rot-in-backlog": JiraBacklogIllustration,
  "what-a-trade-lifecycle-actually-looks-like": TradeLifecycleIllustration,
  "from-stakeholder-sentence-to-acceptance-criteria": RequirementsTranslatorIllustration,
  "why-jargon-is-a-wall": JargonWallIllustration,
  "what-happens-between-a-jira-ticket-and-a-test-case": FsdPipelineIllustration,
  "the-acronym-wall-every-new-banking-ba-hits": AmlLadderIllustration,
  "context-windows-arent-memory": ContextWindowIllustration,
  "what-spoofing-actually-looks-like": SpoofingTimelineIllustration,
  "a-good-decision-can-still-lose": DecisionOutcomeGridIllustration,
  "default-waterfall-who-pays-when-a-clearing-member-fails": DefaultWaterfallIllustration,
  "people-respond-to-incentives-not-instructions": CobraEffectIllustration,
  "opportunity-cost-is-the-only-cost-that-matters": OpportunityCostIllustration,
  "sunk-costs-cant-answer-the-question-youre-asking": SunkCostIllustration,
  "novation-how-a-clearinghouse-becomes-everyones-counterparty": NovationIllustration,
  "margin-how-a-clearinghouse-turns-fear-into-collateral": MarginIllustration,
  "infrastructure-the-nine-systems-behind-every-trade": MarketInfrastructureIllustration,
  "netting-how-finance-cancels-a-mountain-of-debt-into-a-pebble": NettingIllustration,
  "settlement-finality-when-a-trade-stops-being-a-promise":
    SettlementFinalityIllustration,
  "repo-the-overnight-loan-thats-legally-two-trades": RepoIllustration,
  "the-decisions-that-never-stopped-billing": SubscriptionBillingIllustration,
  "capital-market-system-two-paths-one-market": CapitalMarketPathsIllustration,
  "shiv-pressed-buy-trade-execution": TradeExecutionCardIllustration,
  "twap-how-to-buy-a-mountain-without-moving-the-price": TwapIllustration,
  "vwap-the-benchmark-every-trader-is-graded-against": VwapIllustration,
  "pov-the-algorithm-that-never-trades-alone": PovIllustration,
  "iceberg-orders-the-trade-that-hides-its-own-size": IcebergIllustration,
  "sniper-algorithms-waiting-for-the-moment-that-matters": SniperIllustration,
  "arrival-price-the-clock-that-starts-when-you-decide": ArrivalPriceIllustration,
  "implementation-shortfall-the-cost-of-time-between-deciding-and-doing":
    ImplementationShortfallIllustration,
  "a-bank-trading-floor-is-a-marketplace-for-risk": TradingDesksIllustration,
};
