import type { Metadata } from "next";

import { FlywheelSimulator } from "@/components/simulators/flywheel/flywheel-simulator";
import { SimulatorJsonLd } from "@/components/simulators/simulator-json-ld";

const description =
  "Move the sliders and discover why reinforcing loops either compound into unstoppable momentum or grind to a halt.";

export const metadata: Metadata = {
  title: "Flywheel — Simulators",
  description,
  alternates: { canonical: "/simulators/flywheel" },
  openGraph: {
    type: "website",
    title: "Flywheel",
    description,
    url: "/simulators/flywheel",
    images: ["/opengraph-image"],
  },
};

export default function FlywheelPage() {
  return (
    <>
      <SimulatorJsonLd name="Flywheel" description={description} path="/simulators/flywheel" />
      <FlywheelSimulator />
    </>
  );
}
