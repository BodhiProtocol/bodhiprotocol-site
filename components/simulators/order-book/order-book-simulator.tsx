"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { ChallengePanel } from "@/components/simulators/challenge-panel";
import { GlassCard } from "@/components/simulators/glass-card";
import { LiveExplanationPanel } from "@/components/simulators/live-explanation-panel";
import { CompletionScreen } from "@/components/simulators/order-book/completion-screen";
import { MarketScenarios } from "@/components/simulators/order-book/market-scenarios";
import { OrderBookControls } from "@/components/simulators/order-book/order-book-controls";
import { OrderBookHero } from "@/components/simulators/order-book/order-book-hero";
import { OrderBookStatusPanel } from "@/components/simulators/order-book/order-book-status-panel";
import { OrderBookTimeline } from "@/components/simulators/order-book/order-book-timeline";
import { OrderBookVisualization } from "@/components/simulators/order-book/order-book-visualization";
import { RealWorldExamples } from "@/components/simulators/order-book/real-world-examples";
import { useOrderBookSimulator } from "@/components/simulators/order-book/use-order-book-simulator";
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

function OrderBookSimulator() {
  const {
    state,
    book,
    statusLabel,
    explanation,
    challenges,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    scenarios,
    playingScenarioId,
    playedScenarios,
    lastOrderImpact,
    timelinePresets,
    timelineLabel,
    updateField,
    setOrderFireSize,
    fireMarketOrder,
    playScenario,
    applyTimelinePreset,
  } = useOrderBookSimulator();

  const [selectedExample, setSelectedExample] = React.useState<string | null>(null);
  const isPlaying = playingScenarioId !== null;

  return (
    <>
      <OrderBookHero
        diagram={<OrderBookVisualization book={book} statusLabel={statusLabel} lastOrderImpact={null} className="max-w-md" />}
      />

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-20 sm:gap-24">
          <div className="flex flex-col gap-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.6fr_0.7fr] lg:items-start">
              <GlassCard className="gap-8 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
                <OrderBookControls
                  state={state}
                  disabled={isPlaying}
                  onChange={updateField}
                  onOrderFireSizeChange={setOrderFireSize}
                  onFireMarketOrder={fireMarketOrder}
                />
              </GlassCard>

              <GlassCard className="items-center justify-center gap-6 p-8 sm:p-12">
                <OrderBookVisualization book={book} statusLabel={statusLabel} lastOrderImpact={lastOrderImpact} />
              </GlassCard>

              <OrderBookStatusPanel statusLabel={statusLabel} />
            </div>

            <LiveExplanationPanel explanation={explanation} />
          </div>

          <RevealSection>
            <MarketScenarios
              scenarios={scenarios}
              playingScenarioId={playingScenarioId}
              playedScenarios={playedScenarios}
              onPlay={playScenario}
            />
          </RevealSection>

          <RevealSection>
            <div className="flex flex-col gap-6">
              <Eyebrow className="text-brand">See It in the Real World</Eyebrow>
              <H2>Markets shaped by order books</H2>
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

          <RevealSection>
            <OrderBookTimeline
              presets={timelinePresets}
              activeLabel={timelineLabel}
              onSelectLabel={applyTimelinePreset}
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

export { OrderBookSimulator };
