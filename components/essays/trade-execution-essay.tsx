"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  Boxes,
  Building2,
  Check,
  CircleDollarSign,
  Clock3,
  Landmark,
  ListChecks,
  Repeat2,
  RotateCcw,
  Route,
  Scale,
  ShieldCheck,
  Shuffle,
  Smartphone,
  Split,
  UserRound,
  WalletCards,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const panelClass =
  "not-prose rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5";

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose border-brand/25 bg-brand/10 font-heading text-foreground rounded-2xl border p-4 text-lg leading-snug font-medium">
      {children}
    </div>
  );
}

function DisclosureNote() {
  return (
    <div className="text-foreground rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-relaxed">
      <strong>Educational simulation only.</strong> Reliance Industries and Apple are used
      as familiar examples. All prices, quantities, timestamps, order-book levels and
      executions are fictional. This is not live market data or investment advice.
    </div>
  );
}

export function TradeExecutionHero() {
  const flow = ["Buy", "Broker", "Order book", "Match", "Trade", "Settlement"];

  return (
    <header className="not-prose border-border overflow-hidden rounded-3xl border bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--brand)_18%,transparent),transparent_34%),linear-gradient(135deg,var(--card),var(--muted))] p-5 shadow-sm sm:p-7 lg:p-8">
      <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-5">
          <div className="text-brand font-mono text-xs font-bold tracking-[0.22em] uppercase">
            Capital Markets · Trade Execution
          </div>
          <h1 className="font-heading text-foreground text-4xl leading-[1.03] font-medium text-balance sm:text-5xl">
            Shiv Pressed Buy. <br />
            Then an Entire Market Went to Work.
          </h1>
          <p className="font-heading text-foreground/85 max-w-2xl text-xl leading-snug font-medium text-balance">
            One order. Two markets. The hidden machinery behind every trade.
          </p>
          <p className="text-muted-foreground max-w-2xl text-base leading-7">
            Shiv saw one button. Behind it, a broker validated his instruction, an
            exchange organised a queue, a matching engine found sellers, and post-trade
            systems prepared the movement of money and ownership.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              India · Shiv · Reliance · ₹
            </span>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300">
              United States · Maya · Apple · $
            </span>
          </div>
          <DisclosureNote />
        </div>
        <div className="border-border bg-background/80 rounded-2xl border p-4 shadow-sm backdrop-blur">
          <div className="border-border mb-4 flex items-center justify-between gap-3 border-b pb-3">
            <span className="text-muted-foreground font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
              One button, many systems
            </span>
            <BadgeCheck className="text-brand size-5" aria-hidden="true" />
          </div>
          <div className="grid gap-2.5">
            {flow.map((item, index) => (
              <div key={item} className="grid grid-cols-[auto_1fr] items-center gap-3">
                <span className="bg-brand text-brand-foreground grid size-9 place-items-center rounded-full text-xs font-bold">
                  {index + 1}
                </span>
                <div className="border-border bg-card rounded-xl border px-4 py-2.5 font-mono text-sm font-bold tracking-wide uppercase">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export function TradeExecutionCardIllustration() {
  const flow = ["Buy", "Broker", "Book", "Match", "Trade"];

  return (
    <div className="border-border bg-muted rounded-2xl border p-4">
      <div className="border-brand/25 bg-card mb-4 rounded-xl border p-3 text-center">
        <div className="text-brand font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
          One order · two markets
        </div>
        <div className="mt-2 grid gap-2 text-[11px] font-bold sm:grid-cols-2">
          <span className="rounded-lg bg-emerald-500/10 px-2 py-1.5 text-emerald-700 dark:text-emerald-300">
            Shiv → Reliance → ₹
          </span>
          <span className="rounded-lg bg-blue-500/10 px-2 py-1.5 text-blue-700 dark:text-blue-300">
            Maya → Apple → $
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        {flow.map((item, index) => (
          <div key={item} className="grid grid-cols-[auto_1fr] items-center gap-2">
            <span className="bg-background text-muted-foreground grid size-7 place-items-center rounded-full font-mono text-[10px] font-bold">
              {index + 1}
            </span>
            <span className="border-border bg-card rounded-lg border px-3 py-2 font-mono text-[11px] font-bold uppercase">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderTicketCard({ market = "india" }: { market?: "india" | "us" }) {
  const isIndia = market === "india";
  const rows = isIndia
    ? [
        ["Company", "Reliance Industries"],
        ["Symbol", "RELIANCE"],
        ["Side", "Buy"],
        ["Quantity", "10 shares"],
        ["Order type", "Limit"],
        ["Limit price", "₹1,500"],
        ["Estimated value", "₹15,000"],
        ["Status", "Order placed"],
      ]
    : [
        ["Company", "Apple"],
        ["Symbol", "AAPL"],
        ["Side", "Buy"],
        ["Quantity", "10 shares"],
        ["Order type", "Limit"],
        ["Limit price", "$200"],
        ["Estimated value", "$2,000"],
        ["Status", "Waiting"],
      ];

  return (
    <div
      className={panelClass}
      aria-label={`${isIndia ? "Shiv" : "Maya"} fictional order ticket`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
            Illustrative fictional order
          </p>
          <h3 className="font-heading mt-1 text-2xl font-medium">
            {isIndia ? "Shiv's order ticket" : "Maya's order ticket"}
          </h3>
        </div>
        <span className="bg-brand/10 text-brand grid size-11 place-items-center rounded-2xl">
          <Smartphone className="size-5" aria-hidden="true" />
        </span>
      </div>
      <div className="border-border bg-muted rounded-2xl border p-3">
        <div className="grid gap-2">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="bg-card grid grid-cols-[minmax(7rem,0.9fr)_1fr] gap-3 rounded-xl px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground">{label}</span>
              <span className="text-foreground text-right font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrderAnatomyCard() {
  const fields = [
    ["Instrument", "Reliance Industries shares"],
    ["Side", "Buy"],
    ["Quantity", "10 shares"],
    ["Order type", "Limit"],
    ["Limit price", "₹1,500"],
  ];

  return (
    <div className={panelClass}>
      <div className="mb-4 flex items-center gap-3">
        <ListChecks className="text-brand size-5" aria-hidden="true" />
        <h3 className="font-heading text-xl font-medium">Order anatomy</h3>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        {fields.map(([term, detail]) => (
          <div key={term} className="border-border bg-muted rounded-xl border p-3">
            <dt className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
              {term}
            </dt>
            <dd className="mt-1 font-medium">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function OrderTypeToggle() {
  const [type, setType] = React.useState<"market" | "limit">("limit");
  const isMarket = type === "market";

  return (
    <div className={panelClass}>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-heading text-xl font-medium">Market order or limit order?</h3>
        <div
          className="border-border bg-muted inline-flex rounded-xl border p-1"
          role="group"
          aria-label="Choose order type"
        >
          <button
            type="button"
            onClick={() => setType("market")}
            className="focus-visible:ring-ring data-[active=true]:bg-card data-[active=true]:text-brand rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2"
            data-active={isMarket}
          >
            Market order
          </button>
          <button
            type="button"
            onClick={() => setType("limit")}
            className="focus-visible:ring-ring data-[active=true]:bg-card data-[active=true]:text-brand rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2"
            data-active={!isMarket}
          >
            Limit order
          </button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-border bg-muted rounded-xl border p-4">
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
            Plain-English instruction
          </p>
          <p className="font-heading mt-2 text-lg font-medium">
            {isMarket
              ? "Buy now at the best available price."
              : "Buy only at my price or better."}
          </p>
        </div>
        <div className="border-border bg-muted rounded-xl border p-4">
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
            Trade-off
          </p>
          <p className="mt-2 text-sm leading-6">
            {isMarket
              ? "Priority: speed. Price certainty: lower."
              : "Priority: price control. Execution certainty: lower."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BrokerValidationFlow() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const checks = [
    "Account active",
    "Sufficient buying power",
    "Instrument available",
    "Quantity valid",
    "Price valid",
    "Risk controls passed",
    "Market accepting orders",
  ];
  const states = ["Created", "Validating", "Accepted", "Sent to market"];

  return (
    <div ref={ref} className={panelClass}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
            Simplified educational view
          </p>
          <h3 className="font-heading mt-1 text-xl font-medium">Broker checkpoint</h3>
        </div>
        <Route className="text-brand size-5" aria-hidden="true" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {checks.map((check, index) => (
          <div
            key={check}
            className="border-border bg-muted flex items-center gap-3 rounded-xl border p-3"
            style={{
              opacity: played ? 1 : 0.35,
              transform: played ? "translateY(0)" : "translateY(6px)",
              transition: reducedMotion
                ? "none"
                : `opacity 360ms ease ${index * 90}ms, transform 360ms ease ${index * 90}ms`,
            }}
          >
            <span className="grid size-7 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <Check className="size-4" aria-hidden="true" />
            </span>
            <span className="font-medium">{check}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-4">
        {states.map((state, index) => (
          <div
            key={state}
            className="border-border bg-card rounded-xl border px-3 py-3 text-center"
          >
            <div className="bg-brand/10 text-brand mx-auto mb-2 grid size-7 place-items-center rounded-full font-mono text-xs font-bold">
              {index + 1}
            </div>
            <span className="text-sm font-medium">{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type BookRow = {
  price: string;
  quantity: string;
  width: number;
};

const indiaBuyRows: BookRow[] = [
  { price: "₹1,500", quantity: "25 shares", width: 42 },
  { price: "₹1,499", quantity: "40 shares", width: 67 },
  { price: "₹1,498", quantity: "60 shares", width: 100 },
];

const indiaSellRows: BookRow[] = [
  { price: "₹1,501", quantity: "8 shares", width: 27 },
  { price: "₹1,502", quantity: "15 shares", width: 50 },
  { price: "₹1,503", quantity: "30 shares", width: 100 },
];

const usBuyRows: BookRow[] = [
  { price: "$200.00", quantity: "70 shares", width: 58 },
  { price: "$199.90", quantity: "90 shares", width: 75 },
  { price: "$199.80", quantity: "120 shares", width: 100 },
];

const usSellRows: BookRow[] = [
  { price: "$200.10", quantity: "30 shares", width: 38 },
  { price: "$200.20", quantity: "45 shares", width: 56 },
  { price: "$200.30", quantity: "80 shares", width: 100 },
];

function BookSide({
  title,
  rows,
  tone,
}: {
  title: string;
  rows: BookRow[];
  tone: "buy" | "sell";
}) {
  const toneClass =
    tone === "buy"
      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
      : "bg-rose-500/15 text-rose-800 dark:text-rose-200";

  return (
    <div className="border-border bg-muted rounded-2xl border p-3">
      <div className="text-muted-foreground mb-3 grid grid-cols-[1fr_auto] gap-3 font-mono text-[11px] font-bold tracking-wide uppercase">
        <span>{title}</span>
        <span>Quantity</span>
      </div>
      <div className="grid gap-2">
        {rows.map((row) => (
          <div
            key={row.price}
            className="grid grid-cols-[5.4rem_1fr] items-center gap-3 text-sm"
          >
            <span className="font-mono font-bold">{row.price}</span>
            <div className="border-border bg-card relative min-h-9 overflow-hidden rounded-lg border">
              <span
                className={`absolute inset-y-0 left-0 ${toneClass}`}
                style={{ width: `${row.width}%` }}
                aria-hidden="true"
              />
              <span className="relative flex min-h-9 items-center justify-end px-3 font-medium">
                {row.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderBookVisual({ market = "india" }: { market?: "india" | "us" }) {
  const isIndia = market === "india";
  const buyRows = isIndia ? indiaBuyRows : usBuyRows;
  const sellRows = isIndia ? indiaSellRows : usSellRows;
  const bestBid = isIndia ? "₹1,500" : "$200.00";
  const bestAsk = isIndia ? "₹1,501" : "$200.10";
  const spread = isIndia ? "₹1" : "$0.10";

  return (
    <div className={panelClass}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
            Fictional educational order book
          </p>
          <h3 className="font-heading mt-1 text-xl font-medium">
            {isIndia ? "Reliance order book snapshot" : "Apple order book snapshot"}
          </h3>
        </div>
        <Boxes className="text-brand size-5" aria-hidden="true" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <BookSide title="Buy side" rows={buyRows} tone="buy" />
        <BookSide title="Sell side" rows={sellRows} tone="sell" />
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Best bid", bestBid],
          ["Best ask", bestAsk],
          ["Spread", spread],
        ].map(([term, detail]) => (
          <div
            key={term}
            className="border-border bg-muted rounded-xl border px-4 py-3 text-center"
          >
            <dt className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
              {term}
            </dt>
            <dd className="font-heading mt-1 text-xl font-medium">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function QueuePriorityChallenge() {
  const [choice, setChoice] = React.useState<string | null>(null);
  const options = [
    "Shiv, because his quantity is smaller",
    "The earlier buyer",
    "Both at exactly the same time",
  ];
  const correct = "The earlier buyer";

  return (
    <div className={panelClass}>
      <h3 className="font-heading text-xl font-medium">Who receives shares first?</h3>
      <div className="border-border bg-muted mt-4 grid gap-3 rounded-2xl border p-3">
        <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="bg-card rounded-xl p-3">
            <p className="text-muted-foreground font-mono text-xs font-bold">10:01:02</p>
            <p className="mt-1 font-medium">Buy 15 at ₹1,500</p>
          </div>
          <ArrowRight
            className="text-muted-foreground hidden size-5 sm:block"
            aria-hidden="true"
          />
          <div className="border-brand/30 bg-brand/10 rounded-xl border p-3">
            <p className="text-brand font-mono text-xs font-bold">10:01:05 · Shiv</p>
            <p className="mt-1 font-medium">Buy 10 at ₹1,500</p>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-sm">
        If a seller arrives at ₹1,500, which order has priority?
      </p>
      <div className="mt-3 grid gap-2">
        {options.map((option) => {
          const selected = choice === option;
          const isCorrect = option === correct;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setChoice(option)}
              className="border-border bg-muted hover:border-brand focus-visible:ring-ring data-[selected=true]:border-brand data-[selected=true]:bg-brand/10 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:ring-2"
              data-selected={selected}
              aria-pressed={selected}
            >
              {option}
              {selected ? (
                <span
                  className={
                    isCorrect
                      ? "ml-2 text-emerald-700 dark:text-emerald-300"
                      : "ml-2 text-rose-700 dark:text-rose-300"
                  }
                >
                  {isCorrect ? "Correct" : "Try again"}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div
        className="border-border bg-muted mt-4 rounded-xl border p-3 text-sm"
        aria-live="polite"
      >
        {choice
          ? choice === correct
            ? "Correct. Both buyers offered the same price, so the earlier order keeps the better place in line."
            : "Not quite. Smaller quantity does not jump the queue when price is the same."
          : "Choose an answer to reveal the priority rule."}
      </div>
      <button
        type="button"
        onClick={() => setChoice(null)}
        className="border-border bg-background hover:border-brand focus-visible:ring-ring mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium focus-visible:ring-2"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Reset
      </button>
    </div>
  );
}

export function MatchingSequence() {
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      title: "Neha's sell order arrives",
      body: "Neha wants to sell 20 Reliance shares at ₹1,500. Named participants are used only to make the mechanics understandable.",
      aarav: "Waiting",
    },
    {
      title: "The earlier buyer trades first",
      body: "The earlier buyer wants 15 shares at ₹1,500. Neha sells 15 shares to that buyer first.",
      aarav: "Waiting",
    },
    {
      title: "Shiv receives the remainder",
      body: "Neha has 5 shares remaining. Shiv is next at the same price, so Shiv receives 5 shares.",
      aarav: "Partially filled · 5 of 10 shares executed",
    },
  ];
  const current = steps[step];

  return (
    <div className={panelClass}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-heading text-xl font-medium">A seller arrives</h3>
        <div className="flex gap-2" role="group" aria-label="Matching sequence steps">
          {steps.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setStep(index)}
              className="border-border bg-muted focus-visible:ring-ring data-[active=true]:bg-brand data-[active=true]:text-brand-foreground grid size-9 place-items-center rounded-full border font-mono text-xs font-bold focus-visible:ring-2"
              data-active={step === index}
              aria-label={`Show step ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-border bg-muted rounded-2xl border p-4">
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
            Current step
          </p>
          <h4 className="font-heading mt-2 text-lg font-medium">{current.title}</h4>
          <p className="text-muted-foreground mt-2 text-sm leading-6">{current.body}</p>
          <div className="border-border bg-card mt-4 rounded-xl border p-3">
            <p className="text-muted-foreground font-mono text-[11px] font-bold">
              Shiv status
            </p>
            <p className="text-brand mt-1 font-medium">{current.aarav}</p>
          </div>
        </div>
        <div className="grid gap-3">
          {[
            [
              "Trade 1",
              "Buyer: Earlier buyer",
              "Seller: Neha",
              "Quantity: 15",
              "Price: ₹1,500",
            ],
            ["Trade 2", "Buyer: Shiv", "Seller: Neha", "Quantity: 5", "Price: ₹1,500"],
          ].map((trade, index) => (
            <div
              key={trade[0]}
              className="border-border bg-muted rounded-2xl border p-4"
              style={{ opacity: step > index ? 1 : 0.45 }}
            >
              <p className="text-brand font-mono text-[11px] font-bold tracking-wide uppercase">
                {trade[0]}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {trade.slice(1).map((line) => (
                  <span
                    key={line}
                    className="bg-card rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrderProgressCard() {
  const statuses = [
    "New",
    "Accepted",
    "Waiting",
    "Partially filled",
    "Filled",
    "Cancelled",
    "Rejected",
    "Expired",
  ];

  return (
    <div className={panelClass}>
      <div className="mb-4 flex items-center gap-3">
        <Split className="text-brand size-5" aria-hidden="true" />
        <h3 className="font-heading text-xl font-medium">
          One order can complete in pieces
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <span
            key={status}
            className="border-border bg-muted data-[active=true]:border-brand data-[active=true]:bg-brand/10 data-[active=true]:text-brand rounded-full border px-3 py-1.5 text-xs font-medium"
            data-active={status === "Partially filled" || status === "Filled"}
          >
            {status}
          </span>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="border-border bg-muted rounded-2xl border p-4 text-center">
          <p className="text-muted-foreground font-mono text-xs font-bold uppercase">
            Partial fill
          </p>
          <div className="font-heading mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-2xl font-medium">
            <span>10</span>
            <span>=</span>
            <span>5</span>
            <span>+</span>
            <span>5</span>
          </div>
          <div className="text-muted-foreground mt-2 grid grid-cols-3 gap-2 text-xs">
            <span>Order quantity</span>
            <span>Cumulative quantity</span>
            <span>Leaves quantity</span>
          </div>
        </div>
        <ArrowRight
          className="text-muted-foreground mx-auto hidden size-5 lg:block"
          aria-hidden="true"
        />
        <div className="border-border bg-muted rounded-2xl border p-4 text-center">
          <p className="text-muted-foreground font-mono text-xs font-bold uppercase">
            Final fill
          </p>
          <div className="font-heading mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-2xl font-medium">
            <span>10</span>
            <span>=</span>
            <span>10</span>
            <span>+</span>
            <span>0</span>
          </div>
          <div className="text-muted-foreground mt-2 grid grid-cols-3 gap-2 text-xs">
            <span>Order quantity</span>
            <span>Cumulative quantity</span>
            <span>Leaves quantity</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="border-border bg-muted rounded-xl border p-4">
          <p className="text-muted-foreground font-mono text-[11px] font-bold uppercase">
            Status card
          </p>
          <dl className="mt-2 grid gap-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt>Original order</dt>
              <dd className="font-semibold">10</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Executed</dt>
              <dd className="font-semibold">5</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Remaining</dt>
              <dd className="font-semibold">5</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Status</dt>
              <dd className="text-brand font-semibold">Partially filled</dd>
            </div>
          </dl>
        </div>
        <div className="border-border bg-muted rounded-xl border p-4">
          <p className="text-muted-foreground font-mono text-[11px] font-bold uppercase">
            {"Shiv's executions"}
          </p>
          <div className="mt-3 grid gap-2">
            <span className="bg-card rounded-lg px-3 py-2 text-sm font-medium">
              Execution 1: 5 shares
            </span>
            <span className="bg-card rounded-lg px-3 py-2 text-sm font-medium">
              Execution 2: 5 shares
            </span>
            <span className="bg-brand/10 text-brand rounded-lg px-3 py-2 text-sm font-bold">
              Status: Filled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CounterpartyNetwork() {
  const roles = [
    "Individual investor",
    "Mutual fund",
    "Pension fund",
    "Insurance company",
    "Asset manager",
    "Hedge fund",
    "Bank",
    "Proprietary trading firm",
    "Market maker",
  ];

  return (
    <div className={panelClass}>
      <div className="mb-4 flex items-center gap-3">
        <Shuffle className="text-brand size-5" aria-hidden="true" />
        <h3 className="font-heading text-xl font-medium">Possible counterparties</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <span
            key={role}
            className="border-border bg-muted rounded-full border px-3 py-1.5 text-sm font-medium"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarketMakerQuote() {
  return (
    <div className={panelClass}>
      <div className="mb-4 flex items-center gap-3">
        <Landmark className="text-brand size-5" aria-hidden="true" />
        <h3 className="font-heading text-xl font-medium">Fictional two-way quote</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-center">
          <p className="font-mono text-xs font-bold text-emerald-700 uppercase dark:text-emerald-300">
            Bid
          </p>
          <p className="font-heading mt-2 text-3xl font-medium">₹1,500</p>
          <p className="text-muted-foreground mt-2 text-sm">Willing to buy</p>
        </div>
        <div className="border-border bg-muted text-muted-foreground rounded-full border px-4 py-2 text-center font-mono text-xs font-bold uppercase">
          Spread ₹1
        </div>
        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-5 text-center">
          <p className="font-mono text-xs font-bold text-rose-700 uppercase dark:text-rose-300">
            Ask
          </p>
          <p className="font-heading mt-2 text-3xl font-medium">₹1,501</p>
          <p className="text-muted-foreground mt-2 text-sm">Willing to sell</p>
        </div>
      </div>
    </div>
  );
}

export function LifecycleRail() {
  const stages = [
    ["Order", "The instruction to buy or sell", Smartphone],
    ["Execution", "A compatible buyer and seller have been matched", Repeat2],
    ["Confirmation", "The trade details are recorded and communicated", BadgeCheck],
    ["Clearing", "Obligations are calculated and managed", Scale],
    ["Settlement", "Money and shares formally move", Banknote],
  ] as const;

  return (
    <div className={panelClass}>
      <div className="grid gap-3 md:grid-cols-5">
        {stages.map(([stage, detail, Icon], index) => (
          <div
            key={stage}
            className="border-border bg-muted relative rounded-2xl border p-4"
          >
            {index < stages.length - 1 ? (
              <ArrowRight
                className="text-muted-foreground absolute top-1/2 -right-4 hidden size-5 -translate-y-1/2 md:block"
                aria-hidden="true"
              />
            ) : null}
            <Icon className="text-brand mb-3 size-5" aria-hidden="true" />
            <h3 className="font-heading text-lg font-medium">{stage}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarketMirrorChallenge() {
  const [choice, setChoice] = React.useState<string | null>(null);
  const options = [
    "Her order executes immediately",
    "Her order waits",
    "Her broker changes the price",
    "Apple creates new shares for her",
  ];
  const correct = "Her order waits";

  return (
    <div className={panelClass}>
      <h3 className="font-heading text-xl font-medium">{"Maya's mirror question"}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-6">
        Maya will pay no more than $200. The lowest seller wants $200.10. What happens?
      </p>
      <div className="mt-4 grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setChoice(option)}
            className="border-border bg-muted hover:border-brand focus-visible:ring-ring data-[selected=true]:border-brand data-[selected=true]:bg-brand/10 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:ring-2"
            data-selected={choice === option}
            aria-pressed={choice === option}
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className="border-border bg-muted mt-4 rounded-xl border p-3 text-sm"
        aria-live="polite"
      >
        {choice
          ? choice === correct
            ? "Correct. Her limit price and the best available ask do not meet, so the order waits."
            : "Not quite. A broker does not simply change a limit price, and the company is not creating new shares for this trade."
          : "Choose an answer to reveal what the market does."}
      </div>
      <button
        type="button"
        onClick={() => setChoice(null)}
        className="border-border bg-background hover:border-brand focus-visible:ring-ring mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium focus-visible:ring-2"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}

export function MarketComparisonTable() {
  const rows = [
    ["Character", "Shiv", "Maya"],
    ["Company", "Reliance Industries", "Apple"],
    ["Symbol", "RELIANCE", "AAPL"],
    ["Currency", "₹", "$"],
    ["Order", "Buy 10", "Buy 10"],
    ["Type", "Limit", "Limit"],
    ["Maximum price", "₹1,500", "$200"],
    ["Initial result", "Waits", "Waits"],
  ];
  const shared = [
    "broker receives the order",
    "order is validated",
    "order reaches a venue",
    "available prices are checked",
    "eligible orders are prioritised",
    "compatible orders match",
    "partial or full execution may occur",
    "post-trade processing follows",
  ];

  return (
    <div className={panelClass}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="border-border bg-muted rounded-tl-xl border p-3 text-left">
                Dimension
              </th>
              <th className="border-border bg-muted border-y border-r p-3 text-left">
                India
              </th>
              <th className="border-border bg-muted rounded-tr-xl border-y border-r p-3 text-left">
                United States
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, india, us]) => (
              <tr key={label}>
                <th className="border-border text-muted-foreground border-x border-b p-3 text-left font-medium">
                  {label}
                </th>
                <td className="border-border border-r border-b p-3 font-medium">
                  {india}
                </td>
                <td className="border-border border-r border-b p-3 font-medium">{us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-border bg-muted mt-4 rounded-2xl border p-4">
        <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
          Shared logic
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shared.map((item) => (
            <span
              key={item}
              className="bg-card rounded-full px-3 py-1.5 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SawVsMarketVisual() {
  const aarav = ["Buy", "Order placed", "Order executed"];
  const market = [
    "Investment decision",
    "Order created",
    "Broker validation",
    "Order transmitted",
    "Venue acknowledgement",
    "Order-book entry",
    "Price-time priority",
    "Partial execution",
    "Quantity update",
    "Second execution",
    "Filled",
    "Confirmation",
    "Clearing",
    "Settlement",
  ];

  return (
    <div className={panelClass}>
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="bg-muted border-border rounded-2xl border p-4 text-center">
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
            Screen version
          </p>
          <p className="font-heading mt-1 text-3xl font-medium">3 states</p>
        </div>
        <div className="border-brand/30 bg-brand/10 text-brand mx-auto rounded-full border px-4 py-2 font-mono text-xs font-bold uppercase">
          compressed
        </div>
        <div className="bg-muted border-border rounded-2xl border p-4 text-center">
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
            Market version
          </p>
          <p className="font-heading mt-1 text-3xl font-medium">14 events</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="border-border bg-muted rounded-2xl border p-4">
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
            What Shiv saw
          </p>
          <div className="mt-4 grid gap-3">
            {aarav.map((item) => (
              <div
                key={item}
                className="bg-card font-heading rounded-xl px-4 py-3 text-lg font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="border-brand/25 bg-brand/10 rounded-2xl border p-4">
          <p className="text-brand font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
            What the market saw
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {market.map((item, index) => (
              <div
                key={item}
                className="bg-card grid grid-cols-[auto_1fr] items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium"
              >
                <span className="bg-muted text-muted-foreground grid size-6 place-items-center rounded-full font-mono text-[10px] font-bold">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-brand/25 bg-brand/10 mt-4 rounded-2xl border p-5 text-center">
        <p className="font-heading text-foreground text-2xl leading-snug font-medium text-balance">
          One button compressed an entire system into a single gesture.
        </p>
      </div>
    </div>
  );
}

export function PractitionerLayer() {
  const sections = [
    [
      "Order management",
      [
        "capture",
        "validation",
        "submission",
        "amendment",
        "cancellation",
        "status management",
      ],
    ],
    [
      "Execution",
      [
        "routing",
        "book placement",
        "matching",
        "partial fills",
        "execution reporting",
        "average execution price",
      ],
    ],
    [
      "Post-trade",
      ["confirmation", "allocation", "clearing", "settlement", "reconciliation"],
    ],
  ];
  const dictionary = [
    ["Client Order ID", "Identifies the client-side instruction"],
    ["Exchange Order ID", "Identifies the order at the venue"],
    ["Execution ID", "Identifies one individual match"],
    ["Symbol", "The traded instrument"],
    ["Side", "Buy or sell"],
    ["Order Quantity", "Original requested quantity"],
    ["Limit Price", "Maximum buy price or minimum sell price"],
    ["Cumulative Quantity", "Quantity executed so far"],
    ["Leaves Quantity", "Quantity still open"],
    ["Average Price", "Average price across executions"],
    ["Order Status", "Current state of the order"],
    ["Timestamp", "When an event occurred"],
    ["Venue", "Where the event was processed or executed"],
  ];
  const record = [
    ["Client Order ID", "CL-IND-48271"],
    ["Exchange Order ID", "EX-917205"],
    ["Symbol", "RELIANCE"],
    ["Side", "BUY"],
    ["Order Quantity", "10"],
    ["Limit Price", "₹1,500"],
    ["Cumulative Quantity", "10"],
    ["Leaves Quantity", "0"],
    ["Average Price", "₹1,500"],
    ["Status", "FILLED"],
  ];

  return (
    <details className={`${panelClass} group`}>
      <summary className="font-heading focus-visible:ring-ring flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-medium focus-visible:ring-2">
        For the Entry-Level Professional
        <span className="border-border bg-muted text-muted-foreground group-open:text-brand rounded-full border px-3 py-1 font-mono text-xs font-bold">
          Open
        </span>
      </summary>
      <div className="mt-5 grid gap-5">
        <div className="grid gap-3 md:grid-cols-3">
          {sections.map(([title, items]) => (
            <div
              key={title as string}
              className="border-border bg-muted rounded-2xl border p-4"
            >
              <h3 className="font-heading text-lg font-medium">{title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {(items as string[]).map((item) => (
                  <span
                    key={item}
                    className="bg-card rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-border bg-muted rounded-2xl border p-4">
          <h3 className="font-heading text-lg font-medium">Compact data dictionary</h3>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {dictionary.map(([term, detail]) => (
              <div key={term} className="bg-card rounded-xl p-3">
                <dt className="text-brand font-mono text-[11px] font-bold uppercase">
                  {term}
                </dt>
                <dd className="text-muted-foreground mt-1 text-sm">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="border-border bg-muted rounded-2xl border p-4">
          <p className="text-muted-foreground font-mono text-[11px] font-bold tracking-wide uppercase">
            Simplified fictional practitioner record
          </p>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            {record.map(([term, detail]) => (
              <div
                key={term}
                className="bg-card flex justify-between gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <dt className="text-muted-foreground">{term}</dt>
                <dd className="font-mono font-bold">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </details>
  );
}

export function FiveTakeaways() {
  const cards = [
    [
      "1",
      "An order is not a trade.",
      "An order expresses intent. A trade records a successful match.",
    ],
    ["2", "A limit order may wait.", "Price control comes with execution uncertainty."],
    [
      "3",
      "Price comes before time.",
      "Better prices receive priority. Equal prices are ordered by arrival time.",
    ],
    [
      "4",
      "One order can create multiple executions.",
      "Partial fills allow an order to complete in pieces.",
    ],
    [
      "5",
      "Execution is not settlement.",
      "Matching creates the transaction. Settlement completes the exchange.",
    ],
  ];

  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {cards.map(([number, title, body]) => (
        <div
          key={number}
          className="border-border bg-card rounded-2xl border p-5 shadow-sm"
        >
          <div className="bg-brand text-brand-foreground mb-4 grid size-9 place-items-center rounded-full font-mono text-sm font-bold">
            {number}
          </div>
          <h3 className="font-heading text-xl font-medium">{title}</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6">{body}</p>
        </div>
      ))}
    </div>
  );
}

export function ContinueLearning() {
  const links = [
    ["Explore the Order Book Simulator", "/simulators/order-book", Boxes],
    ["Read How Order Books Actually Work", "/essays/how-order-books-work", BookOpen],
    [
      "Follow the Trade Lifecycle",
      "/essays/what-a-trade-lifecycle-actually-looks-like",
      Route,
    ],
    [
      "Understand Clearinghouse Novation",
      "/essays/novation-how-a-clearinghouse-becomes-everyones-counterparty",
      ShieldCheck,
    ],
  ] as const;

  return (
    <div className={panelClass}>
      <h2 className="font-heading text-2xl font-medium">Continue learning</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map(([label, href, Icon]) => (
          <Link
            key={href}
            href={href}
            className="group border-border bg-muted hover:border-brand focus-visible:ring-ring rounded-2xl border p-4 transition-colors focus-visible:ring-2"
          >
            <Icon className="text-brand mb-3 size-5" aria-hidden="true" />
            <span className="group-hover:text-brand font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function StoryBridge({
  children,
  icon = "wallet",
}: {
  children: React.ReactNode;
  icon?: "wallet" | "clock" | "user" | "money" | "building";
}) {
  const icons = {
    wallet: WalletCards,
    clock: Clock3,
    user: UserRound,
    money: CircleDollarSign,
    building: Building2,
  };
  const Icon = icons[icon];

  return (
    <div className="not-prose border-brand/25 bg-brand/10 rounded-2xl border p-5">
      <div className="flex gap-4">
        <span className="bg-card text-brand grid size-10 shrink-0 place-items-center rounded-2xl">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="font-heading text-foreground text-lg leading-snug font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}

export function HorizontalJourney() {
  const steps = ["Shiv's app", "Broker systems", "Market"];

  return (
    <div className={panelClass}>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="border-border bg-muted font-heading rounded-2xl border p-4 text-center text-lg font-medium">
              {step}
            </div>
            {index < steps.length - 1 ? (
              <ArrowRight
                className="text-muted-foreground mx-auto hidden size-5 sm:block"
                aria-hidden="true"
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3 flex justify-center sm:hidden" aria-hidden="true">
        <ArrowDown className="text-muted-foreground size-5" />
      </div>
    </div>
  );
}

export { Insight };
