"use client";

import * as React from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Landmark,
  Network,
  Radio,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { SegmentedToggle } from "@/components/simulators/segmented-toggle";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, H2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type TradeTypeId = "cash-equity" | "fx-forward" | "listed-future";
type ShockId = "none" | "confirmation" | "margin" | "ssi" | "recon";

interface Stage {
  id: string;
  title: string;
  time: string;
  system: string;
  owner: string;
  icon: LucideIcon;
  clean: string;
  issue: Partial<Record<ShockId, string>>;
  baQuestion: string;
  artifact: string;
}

interface TradeType {
  id: TradeTypeId;
  label: string;
  title: string;
  notional: string;
  settlement: string;
  economics: string[];
}

const tradeTypes: TradeType[] = [
  {
    id: "cash-equity",
    label: "Cash Equity",
    title: "Indian Equity Buy Order",
    notional: "Rs 28,00,000",
    settlement: "T+1",
    economics: ["Buy 1,000 Reliance shares", "Price Rs 2,800", "Broker: ABC Securities"],
  },
  {
    id: "fx-forward",
    label: "FX Forward",
    title: "USD/INR Forward",
    notional: "USD 5,000,000",
    settlement: "Value date",
    economics: ["Buy USD / Sell INR", "Rate 83.4200", "Counterparty: Northbank Markets"],
  },
  {
    id: "listed-future",
    label: "Listed Future",
    title: "NIFTY Futures Sell",
    notional: "Rs 46,50,000",
    settlement: "Daily MTM",
    economics: ["Sell 20 lots", "Exchange: NSE", "Clearing member: CM-217"],
  },
];

const shocks: Array<{ id: ShockId; label: string; description: string }> = [
  { id: "none", label: "Clean trade", description: "All systems agree and the trade reaches settlement normally." },
  { id: "confirmation", label: "Confirmation mismatch", description: "Counterparty economics do not match the booking." },
  { id: "margin", label: "Margin shortfall", description: "Clearing asks for collateral before settlement can continue." },
  { id: "ssi", label: "SSI problem", description: "Settlement instructions point to the wrong account or custodian." },
  { id: "recon", label: "Reconciliation break", description: "Post-settlement records disagree across books and statements." },
];

const stages: Stage[] = [
  {
    id: "execution",
    title: "Execution",
    time: "T",
    system: "OMS / EMS",
    owner: "Front office",
    icon: Radio,
    clean: "The trader agrees economics with a venue, broker, or counterparty.",
    issue: {},
    baQuestion: "What is the golden economic record immediately after trade capture?",
    artifact: "Order, fill, execution ID",
  },
  {
    id: "capture",
    title: "Trade Capture",
    time: "T + minutes",
    system: "Trade capture",
    owner: "Middle office",
    icon: ReceiptText,
    clean: "The trade is enriched with book, counterparty, product, settlement, and account data.",
    issue: {
      confirmation: "The booking uses Rs 2,800 while the counterparty confirms Rs 2,805.",
    },
    baQuestion: "Which fields must be mandatory before the trade leaves the source system?",
    artifact: "Trade ticket, product template, enrichment rules",
  },
  {
    id: "confirmation",
    title: "Confirmation",
    time: "T",
    system: "Matching platform",
    owner: "Operations",
    icon: ClipboardCheck,
    clean: "Both sides compare economics and confirm they are talking about the same trade.",
    issue: {
      confirmation: "The trade is unmatched. Operations must decide whether this is a price break or fee treatment.",
    },
    baQuestion: "Is the mismatch economic, reference data, or formatting?",
    artifact: "Confirmation message, match status, exception queue",
  },
  {
    id: "clearing",
    title: "Clearing",
    time: "T / T+1",
    system: "Clearing member / CCP",
    owner: "Clearing ops",
    icon: ShieldCheck,
    clean: "The trade is accepted for clearing, netted, risk checked, and prepared for settlement.",
    issue: {
      margin: "The clearing member has a margin shortfall. The trade cannot move cleanly until collateral arrives.",
    },
    baQuestion: "What stops the trade: eligibility, limit, margin, or account setup?",
    artifact: "Clearing status, margin call, net obligation",
  },
  {
    id: "settlement",
    title: "Settlement",
    time: "T+1 / value date",
    system: "Custodian / depository / payment rail",
    owner: "Settlement ops",
    icon: Landmark,
    clean: "Cash and securities are exchanged through the correct settlement accounts.",
    issue: {
      ssi: "The SSI routes cash to an old account. Settlement moves to exception handling.",
      margin: "Settlement is delayed because collateral was not posted before the cut-off.",
    },
    baQuestion: "Which instruction, account, calendar, or cut-off created settlement risk?",
    artifact: "Settlement instruction, SSI, payment status",
  },
  {
    id: "reconciliation",
    title: "Reconciliation",
    time: "T+1 onward",
    system: "Reconciliation engine",
    owner: "Back office",
    icon: FileSearch,
    clean: "Internal books, custodian statements, cash movements, and confirmations are compared.",
    issue: {
      recon: "The custodian shows settlement, but the internal ledger still shows pending.",
      ssi: "The payment is repaired, but the cash statement needs follow-up evidence.",
    },
    baQuestion: "What proof closes the break: ledger update, custodian statement, or amended instruction?",
    artifact: "Break report, ledger entry, custodian statement",
  },
  {
    id: "reporting",
    title: "Reporting",
    time: "End of day",
    system: "Risk / finance / regulatory reporting",
    owner: "Control teams",
    icon: BadgeCheck,
    clean: "The final trade state feeds risk, P&L, finance, client, and regulatory reports.",
    issue: {
      confirmation: "Unmatched trades need ageing and escalation reporting.",
      margin: "Collateral usage and liquidity impact must be visible to risk.",
      ssi: "Settlement repair creates audit evidence for control reporting.",
      recon: "The open break appears in ageing, ownership, and root-cause reports.",
    },
    baQuestion: "Which downstream report is wrong if this state is not corrected?",
    artifact: "Exception ageing, control dashboard, audit trail",
  },
];

function TradeLifecycleSimulator() {
  const [tradeTypeId, setTradeTypeId] = React.useState<TradeTypeId>("cash-equity");
  const [shockId, setShockId] = React.useState<ShockId>("ssi");
  const [stageIndex, setStageIndex] = React.useState(0);

  const trade = tradeTypes.find((item) => item.id === tradeTypeId) ?? tradeTypes[0];
  const shock = shocks.find((item) => item.id === shockId) ?? shocks[0];
  const currentStage = stages[stageIndex];
  const activeIssue = currentStage.issue[shockId];
  const impactedStages = stages.filter((stage) => stage.issue[shockId]).length;
  const health = shockId === "none" ? 100 : Math.max(38, 100 - impactedStages * 18 - stageIndex * 3);

  const nextStage = () => setStageIndex((current) => Math.min(stages.length - 1, current + 1));
  const previousStage = () => setStageIndex((current) => Math.max(0, current - 1));
  const reset = () => setStageIndex(0);

  const selectTradeType = (id: string) => {
    setTradeTypeId(id as TradeTypeId);
    setStageIndex(0);
  };

  const selectShock = (id: string) => {
    setShockId(id as ShockId);
    setStageIndex(0);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-20%,color-mix(in_oklab,var(--brand)_20%,transparent),transparent)]" />
        <Container className="relative grid gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-28">
          <div className="flex flex-col gap-6">
            <Eyebrow className="text-brand">Capital Markets BA Lab</Eyebrow>
            <h1 className="max-w-3xl font-serif text-5xl leading-none font-medium tracking-tight text-balance sm:text-7xl">
              Trade Lifecycle Simulator
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground sm:text-xl">
              Follow one trade as it moves through the market plumbing, and see exactly where a BA finds risk,
              ownership, evidence, and the next question.
            </p>
          </div>

          <GlassCard className="gap-5 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              <span>Trade state</span>
              <span>{trade.settlement}</span>
            </div>
            <div className="grid gap-3">
              {stages.slice(0, 5).map((stage, index) => {
                const Icon = stage.icon;
                const passed = index < stageIndex;
                const active = index === stageIndex;
                const issue = Boolean(stage.issue[shockId]);
                return (
                  <div
                    key={stage.id}
                    className={cn(
                      "grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-2xl border border-border bg-card p-3",
                      active ? "border-brand bg-brand/10" : "",
                      issue && active ? "border-destructive/40 bg-destructive/10" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground",
                        passed || active ? "bg-brand/10 text-brand" : "",
                        issue && active ? "bg-destructive/10 text-destructive" : "",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-medium text-card-foreground">{stage.title}</div>
                      <div className="text-sm text-muted-foreground">{stage.system}</div>
                    </div>
                    {issue && active ? (
                      <AlertTriangle className="size-4 text-destructive" aria-hidden="true" />
                    ) : passed ? (
                      <CheckCircle2 className="size-4 text-brand" aria-hidden="true" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </Container>
      </section>

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <GlassCard className="gap-5 p-6">
              <div>
                <Eyebrow className="text-brand">Trade type</Eyebrow>
                <SegmentedToggle
                  value={tradeTypeId}
                  options={tradeTypes.map((item) => ({ value: item.id, label: item.label }))}
                  onChange={selectTradeType}
                  aria-label="Select trade type"
                  className="mt-4 w-fit max-w-full overflow-x-auto"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {trade.economics.map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-4">
                    <Banknote className="mb-3 size-5 text-brand" aria-hidden="true" />
                    <div className="text-sm font-medium text-card-foreground">{item}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="gap-5 p-6">
              <div>
                <Eyebrow className="text-brand">Scenario</Eyebrow>
                <SegmentedToggle
                  value={shockId}
                  options={shocks.map((item) => ({ value: item.id, label: item.label }))}
                  onChange={selectShock}
                  aria-label="Select lifecycle scenario"
                  className="mt-4 w-fit max-w-full overflow-x-auto"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{shock.description}</p>
            </GlassCard>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.4fr_0.85fr] lg:items-start">
            <GlassCard className="gap-5 p-6 sm:p-7">
              <Eyebrow className="text-brand">Trade card</Eyebrow>
              <div>
                <h2 className="font-serif text-3xl leading-tight font-medium text-balance">{trade.title}</h2>
                <p className="mt-2 font-mono text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  {trade.notional}
                </p>
              </div>
              <div className="space-y-3">
                <Fact label="Current stage" value={currentStage.title} />
                <Fact label="Owner" value={currentStage.owner} />
                <Fact label="System" value={currentStage.system} />
                <Fact label="Artifact" value={currentStage.artifact} />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={previousStage}
                  disabled={stageIndex === 0}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground hover:border-brand/50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStage}
                  disabled={stageIndex === stages.length - 1}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ArrowRight className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground hover:border-brand/50"
                >
                  <RotateCcw className="size-4" aria-hidden="true" /> Reset
                </button>
              </div>
            </GlassCard>

            <GlassCard className="gap-6 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Eyebrow className="text-brand">Lifecycle map</Eyebrow>
                  <H2>{currentStage.time}</H2>
                </div>
                <div className="rounded-2xl border border-border bg-card px-4 py-3 text-right">
                  <div className="font-mono text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                    Health
                  </div>
                  <div className="font-serif text-3xl font-medium">{health}%</div>
                </div>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[760px]">
                  <div className="relative grid grid-cols-7 gap-3">
                    <div className="absolute top-8 right-8 left-8 h-px bg-border" />
                    {stages.map((stage, index) => {
                      const Icon = stage.icon;
                      const active = index === stageIndex;
                      const passed = index < stageIndex;
                      const issue = Boolean(stage.issue[shockId]);
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          onClick={() => setStageIndex(index)}
                          className="relative flex min-h-36 flex-col items-center gap-3 rounded-2xl border border-border bg-card p-3 text-center transition-colors hover:border-brand/50"
                        >
                          <div
                            className={cn(
                              "flex size-16 items-center justify-center rounded-full border border-border bg-background text-muted-foreground",
                              passed || active ? "border-brand bg-brand/10 text-brand" : "",
                              issue && active ? "border-destructive bg-destructive/10 text-destructive" : "",
                            )}
                          >
                            <Icon className="size-6" aria-hidden="true" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-card-foreground">{stage.title}</div>
                            <div className="mt-1 font-mono text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                              {stage.time}
                            </div>
                          </div>
                          {issue ? (
                            <div className="mt-auto rounded-full bg-destructive/10 px-2 py-1 font-mono text-[9px] font-bold tracking-[0.12em] text-destructive uppercase">
                              Risk
                            </div>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="gap-5 p-6 sm:p-7" aria-live="polite">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Eyebrow className="text-brand">BA lens</Eyebrow>
                  <h2 className="mt-3 font-serif text-3xl leading-tight font-medium">{currentStage.title}</h2>
                </div>
                {activeIssue ? (
                  <AlertTriangle className="size-9 text-destructive" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="size-9 text-brand" aria-hidden="true" />
                )}
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="font-mono text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  What happens
                </div>
                <p className="mt-2 text-sm leading-relaxed text-card-foreground">{activeIssue ?? currentStage.clean}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="font-mono text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  BA question
                </div>
                <p className="mt-2 text-sm leading-relaxed text-card-foreground">{currentStage.baQuestion}</p>
              </div>
            </GlassCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <GlassCard className="gap-4 p-6 sm:p-7">
              <Eyebrow className="text-brand">Control view</Eyebrow>
              <div className="grid gap-3 sm:grid-cols-3">
                <Metric label="Impacted stages" value={impactedStages.toString()} />
                <Metric label="Current owner" value={currentStage.owner} />
                <Metric label="Evidence" value={currentStage.artifact} />
              </div>
            </GlassCard>
            <GlassCard className="gap-4 p-6 sm:p-7">
              <Eyebrow className="text-brand">What this teaches</Eyebrow>
              <H2>A trade lifecycle is a chain of promises</H2>
              <p className="leading-relaxed text-muted-foreground">
                A BA does not just ask where the trade is. The sharper question is what each system believes, who owns
                the next action, what evidence proves the state, and which downstream report becomes wrong if the break
                stays open.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {["State", "Ownership", "Evidence"].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-4">
                    <Network className="mb-3 size-5 text-brand" aria-hidden="true" />
                    <div className="text-sm font-semibold text-card-foreground">{item}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="font-mono text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">{label}</div>
      <div className="mt-1 text-sm font-medium text-card-foreground">{value}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="font-mono text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">{label}</div>
      <div className="mt-2 font-serif text-2xl leading-tight font-medium text-card-foreground">{value}</div>
    </div>
  );
}

export { TradeLifecycleSimulator };
