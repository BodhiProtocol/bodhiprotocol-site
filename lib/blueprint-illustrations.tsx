import type { ComponentType } from "react";

import { AcceptanceCriteriaIllustration } from "@/components/lighthouse/acceptance-criteria-illustration";
import { AnchoringIllustration } from "@/components/lighthouse/anchoring-illustration";
import { BaseRatesIllustration } from "@/components/lighthouse/base-rates-illustration";
import { BusinessCaseIllustration } from "@/components/lighthouse/business-case-illustration";
import { ComparativeAdvantageIllustration } from "@/components/lighthouse/comparative-advantage-illustration";
import { CounterpartyRiskIllustration } from "@/components/lighthouse/counterparty-risk-illustration";
import { DeckIllustration } from "@/components/lighthouse/deck-illustration";
import { DiminishingReturnsIllustration } from "@/components/lighthouse/diminishing-returns-illustration";
import { ExchangesVsOtcIllustration } from "@/components/lighthouse/exchanges-vs-otc-illustration";
import { ExternalitiesIllustration } from "@/components/lighthouse/externalities-illustration";
import { PrioritizationIllustration } from "@/components/lighthouse/prioritization-illustration";
import { PriceDiscoveryIllustration } from "@/components/lighthouse/price-discovery-illustration";
import { ProblemSolutionIllustration } from "@/components/lighthouse/problem-solution-illustration";
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
};
