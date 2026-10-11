import type { Metadata } from "next";

import { SwitchingCostsSimulator } from "@/components/simulators/switching-costs/switching-costs-simulator";
import { SimulatorJsonLd } from "@/components/simulators/simulator-json-ld";

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
  return (
    <>
      <SimulatorJsonLd name="Switching Costs" description={description} path="/simulators/switching-costs" />
      <SwitchingCostsSimulator />
    </>
  );
}
