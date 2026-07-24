import { Brain, ClipboardList, GitFork, Landmark, LineChart, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "Capital Markets": LineChart,
  "Artificial Intelligence": Brain,
  "Business Analysis": ClipboardList,
  "Decision Making": GitFork,
  Economics: Landmark,
  Finance: Wallet,
};
