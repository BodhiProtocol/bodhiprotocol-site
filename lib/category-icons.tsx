import {
  Brain,
  ClipboardList,
  FlaskConical,
  Landmark,
  LineChart,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "Capital Markets": LineChart,
  "Artificial Intelligence": Brain,
  "Business Analysis": ClipboardList,
  UAT: FlaskConical,
  Economics: Landmark,
  Finance: Wallet,
  "Market Abuse": ShieldAlert,
};
