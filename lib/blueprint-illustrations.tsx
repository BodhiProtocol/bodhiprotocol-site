import type { ComponentType } from "react";

import { AcceptanceCriteriaIllustration } from "@/components/lighthouse/acceptance-criteria-illustration";
import { BusinessCaseIllustration } from "@/components/lighthouse/business-case-illustration";
import { DeckIllustration } from "@/components/lighthouse/deck-illustration";
import { PrioritizationIllustration } from "@/components/lighthouse/prioritization-illustration";
import { ProblemSolutionIllustration } from "@/components/lighthouse/problem-solution-illustration";
import { SupplyDemandIllustration } from "@/components/lighthouse/supply-demand-illustration";

export const blueprintIllustrations: Record<string, ComponentType> = {
  "risk-vs-uncertainty": DeckIllustration,
  "supply-and-demand": SupplyDemandIllustration,
  "the-business-case": BusinessCaseIllustration,
  "problem-vs-solution-thinking": ProblemSolutionIllustration,
  "acceptance-criteria": AcceptanceCriteriaIllustration,
  prioritization: PrioritizationIllustration,
};
