"use client";

import { ChallengePanel } from "@/components/simulators/challenge-panel";
import { GlassCard } from "@/components/simulators/glass-card";
import { LiveExplanationPanel } from "@/components/simulators/live-explanation-panel";
import { CompletionScreen } from "@/components/simulators/supply-demand/completion-screen";
import { SupplyDemandChart } from "@/components/simulators/supply-demand/supply-demand-chart";
import { SupplyDemandControls } from "@/components/simulators/supply-demand/supply-demand-controls";
import { SupplyDemandHero } from "@/components/simulators/supply-demand/supply-demand-hero";
import { useSupplyDemandSimulator } from "@/components/simulators/supply-demand/use-supply-demand-simulator";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function SupplyDemandSimulator() {
  const {
    state,
    equilibrium,
    explanation,
    challenges,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    updateField,
  } = useSupplyDemandSimulator();

  return (
    <>
      <SupplyDemandHero
        diagram={
          <SupplyDemandChart
            demandP0={equilibrium.demandP0}
            supplyP0={equilibrium.supplyP0}
            maxQ={equilibrium.maxQ}
            price={equilibrium.price}
            quantity={equilibrium.quantity}
          />
        }
      />

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <GlassCard className="gap-8 p-6 sm:p-8">
              <SupplyDemandControls state={state} onChange={updateField} />
            </GlassCard>

            <div className="flex flex-col gap-6">
              <GlassCard className="gap-6 p-6 sm:p-8">
                <SupplyDemandChart
                  demandP0={equilibrium.demandP0}
                  supplyP0={equilibrium.supplyP0}
                  maxQ={equilibrium.maxQ}
                  price={equilibrium.price}
                  quantity={equilibrium.quantity}
                />
              </GlassCard>
              <LiveExplanationPanel explanation={explanation} />
            </div>
          </div>

          <ChallengePanel
            challenges={challenges}
            completedChallenges={completedChallenges}
            activeChallengeIndex={activeChallengeIndex}
          />

          {allChallengesComplete ? <CompletionScreen /> : null}
        </Container>
      </Section>
    </>
  );
}

export { SupplyDemandSimulator };
