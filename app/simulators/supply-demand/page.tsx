import type { Metadata } from "next";

import { SupplyDemandSimulator } from "@/components/simulators/supply-demand/supply-demand-simulator";
import { SimulatorJsonLd } from "@/components/simulators/simulator-json-ld";

const description =
  "See how price is determined by the balance between buyers and sellers. Move the sliders and watch the equilibrium respond.";

export const metadata: Metadata = {
  title: "Supply & Demand — Simulators",
  description,
  alternates: { canonical: "/simulators/supply-demand" },
  openGraph: {
    type: "website",
    title: "Supply & Demand",
    description,
    url: "/simulators/supply-demand",
    images: ["/opengraph-image"],
  },
};

export default function SupplyDemandPage() {
  return (
    <>
      <SimulatorJsonLd name="Supply & Demand" description={description} path="/simulators/supply-demand" />
      <SupplyDemandSimulator />
    </>
  );
}
