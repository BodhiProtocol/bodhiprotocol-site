import type { Metadata } from "next";

import { ReconciliationBreakFinder } from "@/components/simulators/reconciliation-break-finder/reconciliation-break-finder";

const description =
  "Compare front-office and back-office trade records, identify reconciliation breaks, and learn how capital markets BAs diagnose real settlement problems.";

export const metadata: Metadata = {
  title: "Reconciliation Break Finder - Simulators",
  description,
  alternates: { canonical: "/simulators/reconciliation-break-finder" },
  openGraph: {
    type: "website",
    title: "Reconciliation Break Finder",
    description,
    url: "/simulators/reconciliation-break-finder",
    images: ["/opengraph-image"],
  },
};

export default function ReconciliationBreakFinderPage() {
  return <ReconciliationBreakFinder />;
}
