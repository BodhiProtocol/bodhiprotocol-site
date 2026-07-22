import type { ComponentType } from "react";

import { ConfidenceIllustration } from "@/components/essays/confidence-illustration";
import { JiraBacklogIllustration } from "@/components/essays/jira-backlog-illustration";
import { LearningDividendIllustration } from "@/components/essays/learning-dividend-illustration";
import { OrderBookIllustration } from "@/components/essays/order-book-illustration";
import { RequirementIllustration } from "@/components/essays/requirement-illustration";
import { RequirementsTranslatorIllustration } from "@/components/essays/requirements-translator-illustration";
import { TradeLifecycleIllustration } from "@/components/essays/trade-lifecycle-illustration";

export const essayIllustrations: Record<string, ComponentType> = {
  "how-order-books-work": OrderBookIllustration,
  "why-llms-hallucinate": ConfidenceIllustration,
  "writing-requirements-that-survive-contact-with-engineering": RequirementIllustration,
  "the-learning-dividend": LearningDividendIllustration,
  "why-jira-tickets-rot-in-backlog": JiraBacklogIllustration,
  "what-a-trade-lifecycle-actually-looks-like": TradeLifecycleIllustration,
  "from-stakeholder-sentence-to-acceptance-criteria": RequirementsTranslatorIllustration,
};
