"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
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
import { getTierLabel } from "@/components/simulators/network-effects/platform-value-meter";
import { StatusPanel } from "@/components/simulators/network-effects/status-panel";
import { useNetworkEffectsSimulator } from "@/components/simulators/network-effects/use-network-effects-simulator";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, H2 } from "@/components/ui/typography";

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={played ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

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

  const [pulseTrigger, setPulseTrigger] = React.useState(0);
  const handleHoverExample = React.useCallback(() => {
    setPulseTrigger((n) => n + 1);
  }, []);

  const tierLabel = getTierLabel(platformValue);

  return (
    <>
      <NetworkEffectsHero
        diagram={
          <NetworkGraph users={state.users} mode={state.mode} congested={congested} className="max-w-md" />
        }
      />

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-20 sm:gap-24">
          <div className="flex flex-col gap-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.6fr_0.7fr] lg:items-start">
              <GlassCard className="gap-8 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
                <NetworkEffectsControls state={state} onChange={updateField} />
              </GlassCard>

              <GlassCard className="items-center justify-center gap-6 p-8 sm:p-12">
                <NetworkGraph
                  users={state.users}
                  mode={state.mode}
                  congested={congested}
                  pulseKey={pulseTrigger}
                  className="max-w-xl"
                />
              </GlassCard>

              <StatusPanel value={platformValue} />
            </div>

            <LiveExplanationPanel explanation={explanation} tierLabel={tierLabel} />
          </div>

          <RevealSection>
            <InsightsPanel
              usersDelta={insights.usersDelta}
              businessesDelta={insights.businessesDelta}
              developersDelta={insights.developersDelta}
              platformValueDelta={insights.platformValueDelta}
            />
          </RevealSection>

          <RevealSection>
            <div className="flex flex-col gap-6">
              <Eyebrow className="text-brand">See It in the Real World</Eyebrow>
              <H2>Platforms shaped by network effects</H2>
              <PlatformExamples
                selectedExample={selectedExample}
                onSelect={setSelectedExample}
                onHoverExample={handleHoverExample}
              />
            </div>
          </RevealSection>

          <RevealSection>
            <ChallengePanel
              challenges={challenges}
              completedChallenges={completedChallenges}
              activeChallengeIndex={activeChallengeIndex}
            />
          </RevealSection>

          <RevealSection>
            <EcosystemTimeline presets={timelinePresets} activeYear={timelineYear} onSelectYear={applyTimelineYear} />
          </RevealSection>

          {allChallengesComplete ? (
            <RevealSection>
              <CompletionScreen />
            </RevealSection>
          ) : null}
        </Container>
      </Section>
    </>
  );
}

export { NetworkEffectsSimulator };
