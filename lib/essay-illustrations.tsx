import type { ComponentType } from "react";

import { ConfidenceIllustration } from "@/components/essays/confidence-illustration";
import { OrderBookIllustration } from "@/components/essays/order-book-illustration";
import { RequirementIllustration } from "@/components/essays/requirement-illustration";

export const essayIllustrations: Record<string, ComponentType> = {
  "how-order-books-work": OrderBookIllustration,
  "why-llms-hallucinate": ConfidenceIllustration,
  "writing-requirements-that-survive-contact-with-engineering": RequirementIllustration,
};
