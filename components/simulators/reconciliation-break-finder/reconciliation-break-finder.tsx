"use client";

import * as React from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, RotateCcw, Search } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { SegmentedToggle } from "@/components/simulators/segmented-toggle";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, H2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type BreakId =
  | "price"
  | "settlementDate"
  | "counterparty"
  | "ssi"
  | "quantity"
  | "currency"
  | "valueDate"
  | "amount"
  | "missingTrade";

interface TradeRow {
  label: string;
  frontOffice: string;
  backOffice: string;
  breakId?: BreakId;
}

interface Scenario {
  id: string;
  label: string;
  title: string;
  desk: string;
  setup: string;
  frontSource: string;
  backSource: string;
  rows: TradeRow[];
  answer: BreakId[];
  investigation: string[];
  baLesson: string;
}

const breakOptions: Array<{ id: BreakId; label: string; hint: string }> = [
  { id: "price", label: "Price", hint: "Executed price differs across systems." },
  { id: "quantity", label: "Quantity", hint: "Units, face value, or notional do not agree." },
  { id: "amount", label: "Amount", hint: "Cash consideration, fees, or accrued values diverge." },
  { id: "settlementDate", label: "Settlement date", hint: "One side expects a different settlement day." },
  { id: "valueDate", label: "Value date", hint: "Cash or FX value date differs." },
  { id: "counterparty", label: "Counterparty", hint: "Name, LEI, broker, or account mapping is inconsistent." },
  { id: "ssi", label: "SSI", hint: "Standing settlement instruction or account route is wrong." },
  { id: "currency", label: "Currency", hint: "Payment currency or quote currency does not match." },
  { id: "missingTrade", label: "Missing trade", hint: "One system has no corresponding record." },
];

const scenarios: Scenario[] = [
  {
    id: "equity-t1",
    label: "Equity T+1",
    title: "Cash Equity Trade Break",
    desk: "Indian equities",
    setup:
      "A front-office trade has reached operations. The back-office record came from the settlement platform. Find what prevents clean settlement.",
    frontSource: "Front Office Trade Capture",
    backSource: "Back Office Settlement Record",
    rows: [
      { label: "Side", frontOffice: "Buy", backOffice: "Buy" },
      { label: "Instrument", frontOffice: "Reliance Industries", backOffice: "Reliance Industries" },
      { label: "Quantity", frontOffice: "1,000 shares", backOffice: "1,000 shares" },
      { label: "Price", frontOffice: "Rs 2,800.00", backOffice: "Rs 2,805.00", breakId: "price" },
      { label: "Trade date", frontOffice: "30-Jul-2026", backOffice: "30-Jul-2026" },
      { label: "Settlement date", frontOffice: "31-Jul-2026", backOffice: "03-Aug-2026", breakId: "settlementDate" },
      { label: "Counterparty", frontOffice: "ABC Securities", backOffice: "ABC Sec Ltd", breakId: "counterparty" },
      { label: "Currency", frontOffice: "INR", backOffice: "INR" },
      { label: "SSI", frontOffice: "HDFC-INR-42", backOffice: "HDFC-INR-42" },
    ],
    answer: ["price", "settlementDate", "counterparty"],
    investigation: [
      "Confirm whether Rs 2,805 is a booking error or includes charges that should sit outside execution price.",
      "Check the exchange settlement calendar and whether the back office loaded an old T+2 convention.",
      "Normalize counterparty using broker code or LEI before treating the name as a true economic break.",
    ],
    baLesson:
      "The BA has to separate economic breaks from reference-data naming breaks. Not every mismatch has the same operational risk.",
  },
  {
    id: "fx-forward",
    label: "FX Forward",
    title: "FX Confirmation Break",
    desk: "Treasury operations",
    setup:
      "A USD/INR forward has been confirmed by the counterparty, but settlement instructions do not line up with the treasury record.",
    frontSource: "Treasury Deal Capture",
    backSource: "Counterparty Confirmation",
    rows: [
      { label: "Product", frontOffice: "USD/INR Forward", backOffice: "USD/INR Forward" },
      { label: "Buy/Sell", frontOffice: "Buy USD / Sell INR", backOffice: "Buy USD / Sell INR" },
      { label: "Notional", frontOffice: "USD 5,000,000", backOffice: "USD 5,000,000" },
      { label: "Forward rate", frontOffice: "83.4200", backOffice: "83.4200" },
      { label: "Value date", frontOffice: "31-Aug-2026", backOffice: "01-Sep-2026", breakId: "valueDate" },
      { label: "Settlement amount", frontOffice: "INR 417,100,000", backOffice: "INR 417,100,000" },
      { label: "USD receive account", frontOffice: "CITI-NY-USD-771", backOffice: "CITI-NY-USD-771" },
      { label: "INR pay account", frontOffice: "HDFC-MUM-INR-184", backOffice: "ICICI-MUM-INR-184", breakId: "ssi" },
      { label: "Counterparty", frontOffice: "Northbank Markets", backOffice: "Northbank Markets" },
    ],
    answer: ["valueDate", "ssi"],
    investigation: [
      "Check holiday calendars and value-date rules for both currencies.",
      "Validate whether the INR account difference is an outdated SSI or a deliberate account amendment.",
      "Confirm cut-off implications because a same-day SSI correction may miss the payment window.",
    ],
    baLesson:
      "In FX, value date and SSI breaks are settlement-risk breaks. A perfect rate does not matter if money goes on the wrong day or to the wrong account.",
  },
  {
    id: "bond-dvp",
    label: "Bond DVP",
    title: "Bond Settlement Break",
    desk: "Fixed income",
    setup:
      "A government bond trade is meant to settle delivery-versus-payment. The custodian record does not match the trade capture record.",
    frontSource: "Fixed Income Booking",
    backSource: "Custodian Instruction",
    rows: [
      { label: "Instrument", frontOffice: "7.18% GOI 2033", backOffice: "7.18% GOI 2033" },
      { label: "Side", frontOffice: "Sell", backOffice: "Sell" },
      { label: "Face value", frontOffice: "Rs 10,000,000", backOffice: "Rs 9,500,000", breakId: "quantity" },
      { label: "Clean price", frontOffice: "101.250", backOffice: "101.250" },
      { label: "Accrued interest", frontOffice: "Rs 184,250", backOffice: "Rs 174,250", breakId: "amount" },
      { label: "Settlement date", frontOffice: "31-Jul-2026", backOffice: "31-Jul-2026" },
      { label: "Currency", frontOffice: "INR", backOffice: "INR" },
      { label: "Counterparty", frontOffice: "Zenith Primary Dealer", backOffice: "Zenith Primary Dealer" },
      { label: "DVP account", frontOffice: "RBI-SGL-920", backOffice: "RBI-SGL-920" },
    ],
    answer: ["quantity", "amount"],
    investigation: [
      "Confirm whether the custodian received a partial allocation or truncated the face value.",
      "Recalculate accrued interest from coupon dates and face value before blaming price.",
      "Check whether the trade was split into multiple settlement instructions.",
    ],
    baLesson:
      "Fixed-income breaks often hide in quantity and accrued interest. The BA needs product math and workflow awareness.",
  },
  {
    id: "missing-custodian",
    label: "Missing",
    title: "Missing Custodian Record",
    desk: "Middle office",
    setup:
      "The front office says the trade is booked. The custodian feed has no corresponding settlement instruction yet.",
    frontSource: "Front Office Trade Capture",
    backSource: "Custodian Feed",
    rows: [
      { label: "Product", frontOffice: "NIFTY Futures", backOffice: "No matching record", breakId: "missingTrade" },
      { label: "Side", frontOffice: "Sell", backOffice: "No matching record", breakId: "missingTrade" },
      { label: "Contracts", frontOffice: "20 lots", backOffice: "No matching record", breakId: "missingTrade" },
      { label: "Trade date", frontOffice: "30-Jul-2026", backOffice: "No matching record", breakId: "missingTrade" },
      { label: "Clearing member", frontOffice: "CM-217", backOffice: "No matching record", breakId: "missingTrade" },
      { label: "Exchange trade ID", frontOffice: "NSEFO-8A92K", backOffice: "No matching record", breakId: "missingTrade" },
    ],
    answer: ["missingTrade"],
    investigation: [
      "Check whether the trade missed downstream publication or was filtered by product/account mapping.",
      "Use exchange trade ID and clearing member ID before relying on trade economics.",
      "Confirm whether the missing record is a timing delay, rejected instruction, or genuine booking gap.",
    ],
    baLesson:
      "A missing trade is the loudest break. The first BA task is to prove whether the record never existed downstream or has not arrived yet.",
  },
];

function ReconciliationBreakFinder() {
  const [scenarioId, setScenarioId] = React.useState(scenarios[0].id);
  const [selectedBreaks, setSelectedBreaks] = React.useState<BreakId[]>([]);
  const [revealed, setRevealed] = React.useState(false);

  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const answerSet = React.useMemo(() => new Set(scenario.answer), [scenario.answer]);
  const selectedSet = React.useMemo(() => new Set(selectedBreaks), [selectedBreaks]);

  const correct = selectedBreaks.filter((item) => answerSet.has(item)).length;
  const falsePositives = selectedBreaks.filter((item) => !answerSet.has(item));
  const missed = scenario.answer.filter((item) => !selectedSet.has(item));
  const score = Math.round((correct / scenario.answer.length) * 100);
  const perfect = revealed && falsePositives.length === 0 && missed.length === 0;

  const toggleBreak = (id: BreakId) => {
    setSelectedBreaks((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const selectScenario = (id: string) => {
    setScenarioId(id);
    setSelectedBreaks([]);
    setRevealed(false);
  };

  const reset = () => {
    setSelectedBreaks([]);
    setRevealed(false);
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
              Reconciliation Break Finder
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground sm:text-xl">
              Compare trade records, spot what does not match, and learn how real BAs turn messy breaks into clear
              investigation paths.
            </p>
          </div>

          <GlassCard className="gap-4 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              <span>Today's queue</span>
              <span>4 cases</span>
            </div>
            <div className="grid gap-3">
              {scenarios.map((item, index) => (
                <div key={item.id} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-2xl border border-border bg-card p-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-bold text-brand">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-card-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.answer.length} break type{item.answer.length > 1 ? "s" : ""}</div>
                  </div>
                  <Search className="size-4 text-brand" aria-hidden="true" />
                </div>
              ))}
            </div>
          </GlassCard>
        </Container>
      </section>

      <Section id="simulator" className="scroll-mt-20">
        <Container className="flex min-w-0 flex-col gap-14">
          <div className="flex flex-col gap-4">
            <Eyebrow className="text-brand">Choose a case</Eyebrow>
            <SegmentedToggle
              value={scenario.id}
              options={scenarios.map((item) => ({ value: item.id, label: item.label }))}
              onChange={selectScenario}
              aria-label="Select reconciliation case"
              className="w-fit max-w-full overflow-x-auto"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.4fr_0.8fr] lg:items-start">
            <GlassCard className="gap-6 p-6 sm:p-7">
              <div>
                <Eyebrow className="text-brand">{scenario.desk}</Eyebrow>
                <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-balance">{scenario.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{scenario.setup}</p>
              </div>

              <div className="grid gap-3">
                {breakOptions.map((option) => {
                  const selected = selectedSet.has(option.id);
                  const isAnswer = answerSet.has(option.id);
                  const stateClass = revealed
                    ? isAnswer
                      ? "border-brand bg-brand/10 text-brand"
                      : selected
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : ""
                    : selected
                      ? "border-brand bg-brand/10 text-brand"
                      : "";

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleBreak(option.id)}
                      className={cn(
                        "rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        stateClass,
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">{option.label}</span>
                        {selected ? <CheckCircle2 className="size-4" aria-hidden="true" /> : null}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{option.hint}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Review answer <ArrowRight className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground hover:border-brand/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Reset <RotateCcw className="size-4" aria-hidden="true" />
                </button>
              </div>
            </GlassCard>

            <GlassCard className="gap-5 p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <RecordHeader title={scenario.frontSource} />
                <RecordHeader title={scenario.backSource} />
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                {scenario.rows.map((row) => {
                  const isBreak = row.breakId ? answerSet.has(row.breakId) : false;
                  const selected = row.breakId ? selectedSet.has(row.breakId) : false;
                  return (
                    <div
                      key={row.label}
                      className={cn(
                        "grid gap-0 border-b border-border last:border-b-0 sm:grid-cols-[0.7fr_1fr_1fr]",
                        revealed && isBreak ? "bg-brand/10" : selected ? "bg-brand/5" : "bg-card",
                      )}
                    >
                      <div className="border-b border-border px-4 py-3 font-mono text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase sm:border-r sm:border-b-0">
                        {row.label}
                      </div>
                      <div className="border-b border-border px-4 py-3 text-sm text-card-foreground sm:border-r sm:border-b-0">
                        {row.frontOffice}
                      </div>
                      <div className="px-4 py-3 text-sm text-card-foreground">{row.backOffice}</div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="gap-5 p-6 sm:p-7" aria-live="polite">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Eyebrow className="text-brand">Break score</Eyebrow>
                  <div className="mt-2 font-serif text-5xl font-medium">{revealed ? score : selectedBreaks.length}</div>
                </div>
                {revealed ? (
                  perfect ? (
                    <CheckCircle2 className="size-10 text-brand" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="size-10 text-destructive" aria-hidden="true" />
                  )
                ) : (
                  <Search className="size-10 text-brand" aria-hidden="true" />
                )}
              </div>

              {!revealed ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Select every break type you believe exists in the records. Then review the answer like an operations BA.
                </p>
              ) : (
                <div className="space-y-4">
                  <ResultLine label="Correct" value={`${correct}/${scenario.answer.length}`} tone="brand" />
                  <ResultLine label="False positives" value={falsePositives.length.toString()} tone="destructive" />
                  <ResultLine label="Missed" value={missed.length.toString()} tone="destructive" />
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="font-mono text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
                      BA lesson
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-card-foreground">{scenario.baLesson}</p>
                  </div>
                </div>
              )}

              {revealed ? (
                <button
                  type="button"
                  onClick={nextScenario}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground hover:border-brand/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Next case <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </GlassCard>
          </div>

          {revealed ? (
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <GlassCard className="gap-4 p-6 sm:p-7">
                <Eyebrow className="text-brand">Investigation path</Eyebrow>
                <div className="space-y-3">
                  {scenario.investigation.map((item, index) => (
                    <div key={item} className="grid grid-cols-[28px_1fr] gap-3 rounded-2xl border border-border bg-card p-3">
                      <div className="flex size-7 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-bold text-brand">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-card-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="gap-4 p-6 sm:p-7">
                <Eyebrow className="text-brand">What this teaches</Eyebrow>
                <H2>Reconciliation is structured disagreement</H2>
                <p className="leading-relaxed text-muted-foreground">
                  A break is not just a mismatch. It is a clue about where two systems stopped agreeing:
                  economics, reference data, settlement instructions, timing, or downstream publication.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Economic truth", "Reference data", "Settlement readiness"].map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-card p-4">
                      <CheckCircle2 className="mb-3 size-5 text-brand" aria-hidden="true" />
                      <div className="text-sm font-semibold text-card-foreground">{item}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}

function RecordHeader({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="font-mono text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">{title}</div>
    </div>
  );
}

function ResultLine({ label, value, tone }: { label: string; value: string; tone: "brand" | "destructive" }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("font-mono text-sm font-bold", tone === "brand" ? "text-brand" : "text-destructive")}>
        {value}
      </span>
    </div>
  );
}

export { ReconciliationBreakFinder };
