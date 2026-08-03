"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { ChallengePanel } from "@/components/simulators/challenge-panel";
import { GlassCard } from "@/components/simulators/glass-card";
import { LiveExplanationPanel } from "@/components/simulators/live-explanation-panel";
import { CompletionScreen } from "@/components/simulators/flywheel/completion-screen";
import { FlywheelControls } from "@/components/simulators/flywheel/flywheel-controls";
import { FlywheelDiagram } from "@/components/simulators/flywheel/flywheel-diagram";
import { FlywheelHero } from "@/components/simulators/flywheel/flywheel-hero";
import { InsightsPanel } from "@/components/simulators/flywheel/insights-panel";
import { RealWorldExamples } from "@/components/simulators/flywheel/real-world-examples";
import { StatusPanel } from "@/components/simulators/flywheel/status-panel";
import type { SimulatorState } from "@/components/simulators/flywheel/use-flywheel-simulator";
import { useFlywheelSimulator } from "@/components/simulators/flywheel/use-flywheel-simulator";
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

function FlywheelSimulator() {
  const {
    state,
    momentum,
    spinning,
    selfSustaining,
    explanation,
    insights,
    challenges,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    selectedExample,
    setSelectedExample,
    updateField,
  } = useFlywheelSimulator();

  // Lets hovering or focusing a slider light up the exact node it controls —
  // the two panels otherwise never visibly reference each other.
  const [highlightedKey, setHighlightedKey] = React.useState<keyof SimulatorState | null>(null);

  return (
    <>
      <FlywheelHero
        diagram={
          <FlywheelDiagram
            state={state}
            momentum={momentum}
            spinning={spinning}
            selfSustaining={selfSustaining}
            className="max-w-md"
          />
        }
      />

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-20 sm:gap-24">
          <div className="flex flex-col gap-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.6fr_0.7fr] lg:items-start">
              <GlassCard className="gap-8 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
                <FlywheelControls
                  state={state}
                  onChange={updateField}
                  highlightedKey={highlightedKey}
                  onHoverField={setHighlightedKey}
                />
              </GlassCard>

              <GlassCard className="items-center justify-center gap-6 p-8 sm:p-12">
                <FlywheelDiagram
                  state={state}
                  momentum={momentum}
                  spinning={spinning}
                  selfSustaining={selfSustaining}
                  highlightedKey={highlightedKey}
                  className="max-w-xl"
                />
              </GlassCard>

              <StatusPanel momentum={momentum} spinning={spinning} selfSustaining={selfSustaining} />
            </div>

            <LiveExplanationPanel explanation={explanation} />
          </div>

          <RevealSection>
            <InsightsPanel
              investmentDelta={insights.investmentDelta}
              customerValueDelta={insights.customerValueDelta}
              growthLoopDelta={insights.growthLoopDelta}
              frictionDelta={insights.frictionDelta}
            />
          </RevealSection>

          <RevealSection>
            <div className="flex flex-col gap-6">
              <Eyebrow className="text-brand">See It in the Real World</Eyebrow>
              <H2>Companies built on a flywheel</H2>
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

export { FlywheelSimulator };
