import type { Metadata } from "next";
import { Lock as LockIcon, RefreshCw } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { InflationPreview } from "@/components/simulators/dashboard/inflation-preview";
import { NetworkEffectsPreview } from "@/components/simulators/dashboard/network-effects-preview";
import { OrderBookPreview } from "@/components/simulators/dashboard/order-book-preview";
import { SupplyDemandPreview } from "@/components/simulators/dashboard/supply-demand-preview";
import { SimulatorCard } from "@/components/simulators/simulator-card";
import { SimulatorPreviewLockedCard } from "@/components/simulators/simulator-preview-locked-card";
import { SimulatorRoadmapCard } from "@/components/simulators/simulator-roadmap-card";

const description =
  "Learn by doing, remember forever. Interactive simulators that let you move the sliders and feel how real-world systems actually work.";

export const metadata: Metadata = {
  title: "Simulators",
  description,
  alternates: { canonical: "/simulators" },
  openGraph: {
    type: "website",
    title: "Simulators",
    description,
    url: "/simulators",
    images: ["/opengraph-image"],
  },
};

export default function SimulatorsPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent)]" />
        <Container className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-32">
          <Eyebrow className="text-brand">Learn by doing. Remember forever.</Eyebrow>
          <h1 className="max-w-3xl font-serif text-5xl font-medium tracking-tight text-balance sm:text-7xl">
            Interactive Simulators
          </h1>
          <p className="max-w-2xl text-lg text-balance text-muted-foreground sm:text-xl">
            Move a slider, watch a system respond, and build real intuition — one concept at a time.
          </p>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SimulatorCard
              href="/simulators/network-effects"
              title="Network Effects"
              description="Why do products like WhatsApp and Visa become more valuable as more people join?"
              preview={<NetworkEffectsPreview />}
            />
            <SimulatorCard
              href="/simulators/supply-demand"
              title="Supply & Demand"
              description="See how price is determined by the balance between buyers and sellers."
              preview={<SupplyDemandPreview />}
            />
            <SimulatorCard
              href="/simulators/inflation"
              title="Inflation"
              description="See how interest rates impact inflation, growth, and unemployment."
              preview={<InflationPreview />}
            />
            <SimulatorPreviewLockedCard
              title="Order Book"
              description="Move orders and see how they affect the market price."
              preview={<OrderBookPreview />}
            />
            <SimulatorRoadmapCard
              title="Switching Costs"
              description="Why leaving a product gets harder the longer you use it."
              icon={LockIcon}
            />
            <SimulatorRoadmapCard
              title="Flywheel"
              description="How reinforcing loops compound small advantages into big ones."
              icon={RefreshCw}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
