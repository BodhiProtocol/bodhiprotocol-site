import type { ComponentType } from "react";

import { BusinessCaseIllustration } from "@/components/lighthouse/business-case-illustration";
import { DeckIllustration } from "@/components/lighthouse/deck-illustration";
import { SupplyDemandIllustration } from "@/components/lighthouse/supply-demand-illustration";

export const blueprintIllustrations: Record<string, ComponentType> = {
  "risk-vs-uncertainty": DeckIllustration,
  "supply-and-demand": SupplyDemandIllustration,
  "the-business-case": BusinessCaseIllustration,
};
