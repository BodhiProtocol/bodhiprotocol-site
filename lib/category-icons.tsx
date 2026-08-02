import { Brain, ClipboardList, Landmark, LineChart, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "Capital Markets": LineChart,
  "Artificial Intelligence": Brain,
  "Business Analysis": ClipboardList,
  Economics: Landmark,
  Finance: Wallet,
};
