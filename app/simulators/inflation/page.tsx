import type { Metadata } from "next";

import { InflationSimulator } from "@/components/simulators/inflation/inflation-simulator";

const description =
  "See how interest rates, money supply, and productivity pull inflation, growth, and unemployment in different directions.";

export const metadata: Metadata = {
  title: "Inflation — Simulators",
  description,
  alternates: { canonical: "/simulators/inflation" },
  openGraph: {
    type: "website",
    title: "Inflation",
    description,
    url: "/simulators/inflation",
    images: ["/opengraph-image"],
  },
};

export default function InflationPage() {
  return <InflationSimulator />;
}
