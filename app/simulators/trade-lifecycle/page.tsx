import type { Metadata } from "next";

import { TradeLifecycleSimulator } from "@/components/simulators/trade-lifecycle/trade-lifecycle-simulator";
import { SimulatorJsonLd } from "@/components/simulators/simulator-json-ld";

const description =
  "Follow a trade from execution to settlement, see the systems involved, and learn where capital markets BAs catch operational risk.";

export const metadata: Metadata = {
  title: "Trade Lifecycle Simulator - Simulators",
  description,
  alternates: { canonical: "/simulators/trade-lifecycle" },
  openGraph: {
    type: "website",
    title: "Trade Lifecycle Simulator",
    description,
    url: "/simulators/trade-lifecycle",
    images: ["/opengraph-image"],
  },
};

export default function TradeLifecyclePage() {
  return (
    <>
      <SimulatorJsonLd name="Trade Lifecycle Simulator" description={description} path="/simulators/trade-lifecycle" />
      <TradeLifecycleSimulator />
    </>
  );
}
