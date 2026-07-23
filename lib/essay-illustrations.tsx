import type { ComponentType } from "react";

import { AmlLadderIllustration } from "@/components/essays/aml-ladder-illustration";
import { ConfidenceIllustration } from "@/components/essays/confidence-illustration";
import { ContextWindowIllustration } from "@/components/essays/context-window-illustration";
import { DecisionOutcomeGridIllustration } from "@/components/essays/decision-outcome-grid-illustration";
import { FsdPipelineIllustration } from "@/components/essays/fsd-pipeline-illustration";
import { JargonWallIllustration } from "@/components/essays/jargon-wall-illustration";
import { JiraBacklogIllustration } from "@/components/essays/jira-backlog-illustration";
import { LearningDividendIllustration } from "@/components/essays/learning-dividend-illustration";
import { OrderBookIllustration } from "@/components/essays/order-book-illustration";
import { RequirementIllustration } from "@/components/essays/requirement-illustration";
import { RequirementsTranslatorIllustration } from "@/components/essays/requirements-translator-illustration";
import { SpoofingTimelineIllustration } from "@/components/essays/spoofing-timeline-illustration";
import { TradeLifecycleIllustration } from "@/components/essays/trade-lifecycle-illustration";

export const essayIllustrations: Record<string, ComponentType> = {
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
};
