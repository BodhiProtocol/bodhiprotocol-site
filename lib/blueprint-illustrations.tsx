import type { ComponentType } from "react";

import { AcceptanceCriteriaIllustration } from "@/components/lighthouse/acceptance-criteria-illustration";
import { AgentIllustration } from "@/components/lighthouse/agent-illustration";
import { AnchoringIllustration } from "@/components/lighthouse/anchoring-illustration";
import { BaseRatesIllustration } from "@/components/lighthouse/base-rates-illustration";
import { BidAskSpreadIllustration } from "@/components/lighthouse/bid-ask-spread-illustration";
import { BusinessCaseIllustration } from "@/components/lighthouse/business-case-illustration";
import { ComparativeAdvantageIllustration } from "@/components/lighthouse/comparative-advantage-illustration";
import { CounterpartyRiskIllustration } from "@/components/lighthouse/counterparty-risk-illustration";
import { DeckIllustration } from "@/components/lighthouse/deck-illustration";
import { DefinitionOfDoneIllustration } from "@/components/lighthouse/definition-of-done-illustration";
import { DiminishingReturnsIllustration } from "@/components/lighthouse/diminishing-returns-illustration";
import { EmbeddingIllustration } from "@/components/lighthouse/embedding-illustration";
import { ExchangesVsOtcIllustration } from "@/components/lighthouse/exchanges-vs-otc-illustration";
import { ExpectedValueIllustration } from "@/components/lighthouse/expected-value-illustration";
import { ExternalitiesIllustration } from "@/components/lighthouse/externalities-illustration";
import { FineTuningVsPromptingIllustration } from "@/components/lighthouse/fine-tuning-vs-prompting-illustration";
import { LongVsShortIllustration } from "@/components/lighthouse/long-vs-short-illustration";
import { MoralHazardIllustration } from "@/components/lighthouse/moral-hazard-illustration";
import { PrioritizationIllustration } from "@/components/lighthouse/prioritization-illustration";
import { PriceDiscoveryIllustration } from "@/components/lighthouse/price-discovery-illustration";
import { ProblemSolutionIllustration } from "@/components/lighthouse/problem-solution-illustration";
import { RagIllustration } from "@/components/lighthouse/rag-illustration";
import { ReversibleDecisionsIllustration } from "@/components/lighthouse/reversible-decisions-illustration";
import { SupplyDemandIllustration } from "@/components/lighthouse/supply-demand-illustration";

export const blueprintIllustrations: Record<string, ComponentType> = {
  "risk-vs-uncertainty": DeckIllustration,
  "supply-and-demand": SupplyDemandIllustration,
  "the-business-case": BusinessCaseIllustration,
  "problem-vs-solution-thinking": ProblemSolutionIllustration,
  "acceptance-criteria": AcceptanceCriteriaIllustration,
  prioritization: PrioritizationIllustration,
  "exchanges-vs-otc": ExchangesVsOtcIllustration,
  "price-discovery": PriceDiscoveryIllustration,
  "counterparty-risk": CounterpartyRiskIllustration,
  "reversible-vs-irreversible-decisions": ReversibleDecisionsIllustration,
  "base-rates": BaseRatesIllustration,
  anchoring: AnchoringIllustration,
  "comparative-advantage": ComparativeAdvantageIllustration,
  "diminishing-returns": DiminishingReturnsIllustration,
  externalities: ExternalitiesIllustration,
  embedding: EmbeddingIllustration,
  rag: RagIllustration,
  agent: AgentIllustration,
  "fine-tuning-vs-prompting": FineTuningVsPromptingIllustration,
  "bid-ask-spread": BidAskSpreadIllustration,
  "long-vs-short": LongVsShortIllustration,
  "definition-of-done": DefinitionOfDoneIllustration,
  "expected-value": ExpectedValueIllustration,
  "moral-hazard": MoralHazardIllustration,
};
