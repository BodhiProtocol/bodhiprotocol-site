"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { ChallengePanel } from "@/components/simulators/challenge-panel";
import { GlassCard } from "@/components/simulators/glass-card";
import { LiveExplanationPanel } from "@/components/simulators/live-explanation-panel";
import { CompletionScreen } from "@/components/simulators/switching-costs/completion-screen";
import { InsightsPanel } from "@/components/simulators/switching-costs/insights-panel";
import { RealWorldExamples } from "@/components/simulators/switching-costs/real-world-examples";
import { StatusPanel } from "@/components/simulators/switching-costs/status-panel";
import { SwitchingCostsControls } from "@/components/simulators/switching-costs/switching-costs-controls";
import { SwitchingCostsHero } from "@/components/simulators/switching-costs/switching-costs-hero";
import type { SimulatorState } from "@/components/simulators/switching-costs/use-switching-costs-simulator";
import { useSwitchingCostsSimulator } from "@/components/simulators/switching-costs/use-switching-costs-simulator";
import { SwitchingWellVisualization } from "@/components/simulators/switching-costs/switching-well-visualization";
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

function SwitchingCostsSimulator() {
  const {
    state,
    switchingCost,
    escaped,
    strainRatio,
    explanation,
    insights,
    challenges,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    selectedExample,
    setSelectedExample,
    updateField,
  } = useSwitchingCostsSimulator();

  // Lets hovering or focusing a slider light up the exact piece of the well it
  // controls — the two panels otherwise never visibly reference each other.
  const [highlightedKey, setHighlightedKey] = React.useState<keyof SimulatorState | null>(null);

  return (
    <>
      <SwitchingCostsHero
        diagram={
          <SwitchingWellVisualization
            state={state}
            switchingCost={switchingCost}
            escaped={escaped}
            strainRatio={strainRatio}
            className="max-w-md"
          />
        }
      />

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-20 sm:gap-24">
          <div className="flex flex-col gap-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.6fr_0.7fr] lg:items-start">
              <GlassCard className="gap-8 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
                <SwitchingCostsControls
                  state={state}
                  onChange={updateField}
                  highlightedKey={highlightedKey}
                  onHoverField={setHighlightedKey}
                />
              </GlassCard>

              <GlassCard className="items-center justify-center gap-6 p-8 sm:p-12">
                <SwitchingWellVisualization
                  state={state}
                  switchingCost={switchingCost}
                  escaped={escaped}
                  strainRatio={strainRatio}
                  highlightedKey={highlightedKey}
                  className="max-w-xl"
                />
              </GlassCard>

              <StatusPanel switchingCost={switchingCost} escaped={escaped} />
            </div>

            <LiveExplanationPanel explanation={explanation} />
          </div>

          <RevealSection>
            <InsightsPanel
              dataToolsDelta={insights.dataToolsDelta}
              peopleHabitDelta={insights.peopleHabitDelta}
              contractDelta={insights.contractDelta}
              alternativeDelta={insights.alternativeDelta}
            />
          </RevealSection>

          <RevealSection>
            <div className="flex flex-col gap-6">
              <Eyebrow className="text-brand">See It in the Real World</Eyebrow>
              <H2>Products shaped by switching costs</H2>
              <RealWorldExamples selectedExample={selectedExample} onSelect={setSelectedExample} />
            </div>
          </RevealSection>

          <RevealSection>
            <ChallengePanel
              challenges={challenges}
              completedChallenges={completedChallenges}
              activeChallengeIndex={activeChallengeIndex}
            />
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

export { SwitchingCostsSimulator };
