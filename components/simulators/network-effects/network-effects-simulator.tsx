"use client";

import { ChallengePanel } from "@/components/simulators/challenge-panel";
import { GlassCard } from "@/components/simulators/glass-card";
import { LiveExplanationPanel } from "@/components/simulators/live-explanation-panel";
import { CompletionScreen } from "@/components/simulators/network-effects/completion-screen";
import { EcosystemTimeline } from "@/components/simulators/network-effects/ecosystem-timeline";
import { InsightsPanel } from "@/components/simulators/network-effects/insights-panel";
import { NetworkEffectsControls } from "@/components/simulators/network-effects/network-effects-controls";
import { NetworkEffectsHero } from "@/components/simulators/network-effects/network-effects-hero";
import { NetworkGraph } from "@/components/simulators/network-effects/network-graph";
import { PlatformExamples } from "@/components/simulators/network-effects/platform-examples";
import { PlatformValueMeter } from "@/components/simulators/network-effects/platform-value-meter";
import { useNetworkEffectsSimulator } from "@/components/simulators/network-effects/use-network-effects-simulator";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, H2 } from "@/components/ui/typography";

function NetworkEffectsSimulator() {
  const {
    state,
    platformValue,
    congested,
    explanation,
    insights,
    challenges,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    timelinePresets,
    timelineYear,
    selectedExample,
    setSelectedExample,
    updateField,
    applyTimelineYear,
  } = useNetworkEffectsSimulator();

  return (
    <>
      <NetworkEffectsHero
        diagram={
          <NetworkGraph users={state.users} mode={state.mode} congested={congested} className="max-w-md" />
        }
      />

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <GlassCard className="gap-8 p-6 sm:p-8">
              <NetworkEffectsControls state={state} onChange={updateField} />
            </GlassCard>

            <div className="flex flex-col gap-6">
              <GlassCard className="gap-6 p-6 sm:p-8">
                <NetworkGraph users={state.users} mode={state.mode} congested={congested} />
                <PlatformValueMeter value={platformValue} />
              </GlassCard>
              <LiveExplanationPanel explanation={explanation} />
            </div>
          </div>

          <InsightsPanel
            usersDelta={insights.usersDelta}
            businessesDelta={insights.businessesDelta}
            developersDelta={insights.developersDelta}
            platformValueDelta={insights.platformValueDelta}
            reason={insights.reason}
          />

          <div className="flex flex-col gap-6">
            <Eyebrow className="text-brand">See It in the Real World</Eyebrow>
            <H2>Platforms shaped by network effects</H2>
            <PlatformExamples selectedExample={selectedExample} onSelect={setSelectedExample} />
          </div>

          <ChallengePanel
            challenges={challenges}
            completedChallenges={completedChallenges}
            activeChallengeIndex={activeChallengeIndex}
          />

          <EcosystemTimeline
            presets={timelinePresets}
            activeYear={timelineYear}
            onSelectYear={applyTimelineYear}
          />

          {allChallengesComplete ? <CompletionScreen /> : null}
        </Container>
      </Section>
    </>
  );
}

export { NetworkEffectsSimulator };
