"use client";

import * as React from "react";
import { Terminal } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { SegmentedToggle } from "@/components/simulators/segmented-toggle";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";

import { Blotter } from "./blotter";
import { MessageLog } from "./message-log";
import { OrderTicket } from "./order-ticket";
import { decoyRows, scenarios } from "./scenarios";
import type { LogLine, OutcomeId } from "./types";

function CadTerminalSimulator() {
  const [scenarioId, setScenarioId] = React.useState(scenarios[0].id);
  const [selected, setSelected] = React.useState<OutcomeId | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [log, setLog] = React.useState<LogLine[]>([]);
  const [tally, setTally] = React.useState({ correct: 0, total: 0 });

  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const blotterRows = React.useMemo(
    () => [scenario.record, ...decoyRows].sort((a, b) => a.id.localeCompare(b.id)),
    [scenario],
  );

  const selectScenario = (id: string) => {
    setScenarioId(id);
    setSelected(null);
    setSubmitted(false);
    setLog([]);
  };

  const submit = () => {
    if (!selected) return;
    setSubmitted(true);
    setLog(scenario.log);
    setTally((current) => ({
      correct: current.correct + (selected === scenario.correctOutcome ? 1 : 0),
      total: current.total + 1,
    }));
  };

  const nextScenario = () => {
    const index = scenarios.findIndex((item) => item.id === scenario.id);
    selectScenario(scenarios[(index + 1) % scenarios.length].id);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-15%,color-mix(in_oklab,var(--brand)_20%,transparent),transparent)]" />
        <Container className="relative grid gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-28">
          <div className="flex flex-col gap-6">
            <Eyebrow className="text-brand">Capital Markets BA Lab</Eyebrow>
            <h1 className="max-w-3xl font-serif text-5xl leading-none font-medium tracking-tight text-balance sm:text-7xl">
              Cancel / Amend / Delete Terminal
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground sm:text-xl">
              A live order sits on the blotter. A request comes in. Predict what the engine actually does — accepted,
              rejected, or turned into a flagged correction — before you see the execution report.
            </p>
          </div>

          <GlassCard className="gap-4 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              <span className="flex items-center gap-2">
                <Terminal className="size-3.5 text-brand" aria-hidden="true" /> Session accuracy
              </span>
              <span className="text-brand">
                {tally.total > 0 ? Math.round((tally.correct / tally.total) * 100) : 0}%
              </span>
            </div>
            <div className="grid gap-3">
              {scenarios.slice(0, 4).map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-2xl border border-border bg-card p-3"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-bold text-brand">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-card-foreground">{item.record.id}</div>
                    <div className="text-sm text-muted-foreground">{item.requestType}</div>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                    {item.record.instrument}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Container>
      </section>

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow className="text-brand">Choose a scenario</Eyebrow>
            <SegmentedToggle
              value={scenario.id}
              options={scenarios.map((item) => ({ value: item.id, label: item.label }))}
              onChange={selectScenario}
              aria-label="Select cancel/amend/delete scenario"
              className="w-fit max-w-full overflow-x-auto"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-8">
            <Blotter rows={blotterRows} activeId={scenario.record.id} />

            <div className="grid min-w-0 gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
              <MessageLog lines={log} />

              <OrderTicket
                scenario={scenario}
                selected={selected}
                onSelect={setSelected}
                submitted={submitted}
                onSubmit={submit}
                onNext={nextScenario}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export { CadTerminalSimulator };
