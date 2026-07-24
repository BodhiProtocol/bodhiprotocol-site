import type { Metadata } from "next";

import { SwitchingCostsSimulator } from "@/components/simulators/switching-costs/switching-costs-simulator";

const description =
  "Move the sliders and discover why leaving a product gets harder the longer you use it — even when a better alternative exists.";

export const metadata: Metadata = {
  title: "Switching Costs — Simulators",
  description,
  alternates: { canonical: "/simulators/switching-costs" },
  openGraph: {
    type: "website",
    title: "Switching Costs",
    description,
    url: "/simulators/switching-costs",
    images: ["/opengraph-image"],
  },
};

export default function SwitchingCostsPage() {
  return <SwitchingCostsSimulator />;
}
