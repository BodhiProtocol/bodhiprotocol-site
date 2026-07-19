import type { Metadata } from "next";

import { NetworkEffectsSimulator } from "@/components/simulators/network-effects/network-effects-simulator";

const description =
  "Move the sliders and discover why products like WhatsApp, Visa, LinkedIn, Uber, Airbnb, and YouTube become more valuable as more people join.";

export const metadata: Metadata = {
  title: "Network Effects — Simulators",
  description,
  alternates: { canonical: "/simulators/network-effects" },
  openGraph: {
    type: "website",
    title: "Network Effects",
    description,
    url: "/simulators/network-effects",
    images: ["/opengraph-image"],
  },
};

export default function NetworkEffectsPage() {
  return <NetworkEffectsSimulator />;
}
