"use client";

import { ChallengePanel } from "@/components/simulators/challenge-panel";
import { GlassCard } from "@/components/simulators/glass-card";
import { LiveExplanationPanel } from "@/components/simulators/live-explanation-panel";
import { CompletionScreen } from "@/components/simulators/inflation/completion-screen";
import { InflationChart } from "@/components/simulators/inflation/inflation-chart";
import { InflationControls } from "@/components/simulators/inflation/inflation-controls";
import { InflationHero } from "@/components/simulators/inflation/inflation-hero";
import { useInflationSimulator } from "@/components/simulators/inflation/use-inflation-simulator";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function InflationSimulator() {
  const {
    state,
    history,
    explanation,
    challenges,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    updateField,
  } = useInflationSimulator();

  return (
    <>
      <InflationHero diagram={<InflationChart history={history} />} />

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <GlassCard className="gap-8 p-6 sm:p-8">
              <InflationControls state={state} onChange={updateField} />
            </GlassCard>

            <div className="flex flex-col gap-6">
              <GlassCard className="gap-6 p-6 sm:p-8">
                <InflationChart history={history} />
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

export { InflationSimulator };
