import type { ComponentType } from "react";

import { OrderBookIllustration } from "@/components/essays/order-book-illustration";

export const essayIllustrations: Record<string, ComponentType> = {
  "how-order-books-work": OrderBookIllustration,
};
