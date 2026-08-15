import type { Playbook } from "@/types/content";

const stageChecklist = `TRADE LIFECYCLE STAGE CHECKLIST

Requirement / defect / question:

STAGE 1 — ORDER
Does this touch the instruction before it's matched (buy/sell, quantity, order type, account)?

STAGE 2 — EXECUTION
Does this touch the matched trade itself — one order, or one of several partial fills?

STAGE 3 — ENRICHMENT & CONFIRMATION
Does this touch the details added after execution (account, currency, settlement instructions) or the confirmation with the counterparty?

STAGE 4 — CLEARING
Does this touch the obligation after novation — the clearing corporation's side, not the original counterparty's?

STAGE 5 — SETTLEMENT
Does this touch the actual movement of securities and cash on settlement date?

Which stage does this actually belong to?

Is "trade complete" here meant as executed, or settled?
`;

export const tradeLifecyclePlaybook: Omit<Playbook, "readingTime"> = {
  slug: "trade-lifecycle-playbook",
  title: "Trade Lifecycle Playbook",
  description: "The five stages a trade passes through, and what a BA checks at each one.",
  summary:
    "A stage-by-stage walk through a trade from Order to Settlement — Order, Execution, Enrichment & Confirmation, Clearing, Settlement — with what actually happens at each stage, where requirements silently break, and a free stage checklist template.",
  category: "Capital Markets",
  tags: ["Trade Lifecycle", "Capital Markets", "Settlement"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Stage",
  intro: [
    "Your manager says the change is \"in the settlement stage.\" You nod. You don't actually know how many stages come before settlement, or what happens in each one — so you can't tell whether this change even belongs there.",
    "A trade isn't one event. From the moment a client says \"buy\" to the moment securities and cash actually change hands, it physically passes through five distinct stages — each one producing a different record, sitting in a different system, owned by a different team.",
    "Front Office, Middle Office and Back Office tell you who's responsible (see the other playbook for that lens). This one is the mechanics — what enters each stage, what changes inside it, and what you're actually confirming before the trade is allowed to move to the next one.",
  ],
  audience: [
    "Freshers and BAs starting their first Capital Markets or trade lifecycle project",
    "BAs who know Front/Middle/Back Office responsibilities but not what happens inside each stage",
    "QAs and developers trying to work out which stage a defect actually belongs to",
    "Anyone about to write a requirement that touches trade processing",
  ],
  seoTitle: "Trade Lifecycle Playbook — Order to Settlement for BAs | BodhiProtocol",
  seoDescription:
    "The five stages of a trade — Order, Execution, Enrichment & Confirmation, Clearing, Settlement — explained stage by stage for Business Analysts, with a free stage checklist template.",
  closingHeading: ["A trade isn't one event.", "It's five stages, and each one can break on its own."],
  closingBody:
    "Order, Execution, Enrichment & Confirmation, Clearing, Settlement — know which stage a requirement, defect or question actually belongs to, and \"is the trade done yet\" stops being the only question you know how to ask.",
  closingTemplate: stageChecklist,
  closingTemplateName: "Trade Lifecycle Stage Checklist",
  relatedPlaybookSlugs: [
    "front-office-middle-office-back-office",
    "front-to-back-trade-trace-guide",
    "first-time-working-with-an-api",
  ],
  hacks: [
    {
      number: 1,
      title: "Five stages, not one \"trade done\" moment",
      insight: "Every trade, on any exchange, moves through the same five stages in the same order.",
      visual: { steps: ["Order", "Execution", "Enrichment & Confirmation", "Clearing", "Settlement"] },
      explanation:
        "A trader's \"done\" usually means Execution — stage two of five. Three more stages still have to happen correctly before the client actually owns the shares and the seller actually has the cash. Most of the confusion between teams (\"I thought this was already settled\") comes from two people using \"done\" to mean two different stages.",
      whyItHelps: "Once you can name the five stages, \"where does this sit in the lifecycle\" becomes a specific answer instead of a guess.",
    },
    {
      number: 2,
      title: "Order — the instruction, before anything is matched",
      insight: "The lifecycle starts with an instruction, not a trade.",
      explanation:
        "A client tells a broker to buy or sell — instrument, quantity, order type (market or limit), account. That instruction is an order. It hasn't matched with anyone yet, and it might never fully match: it can be partially filled, cancelled, or expire unfilled.",
      compare: {
        leftLabel: "Order",
        left: "An instruction to buy or sell. Not yet executed. Can be partially filled, cancelled or expire.",
        rightLabel: "Trade",
        right: "The actual matched execution. One order can produce several trades if it fills in pieces.",
      },
      whyItHelps: "Knowing an order isn't a trade is why one order can turn into three separate trade records downstream — and why counting orders instead of trades quietly breaks a reconciliation.",
    },
    {
      number: 3,
      title: "Execution — the order becomes one or more trades",
      insight: "The order gets matched against a counterparty at a price and quantity — that match is the trade.",
      explanation:
        "An order for 10,000 shares might not fill all at once — 3,000 here, 4,000 there, 3,000 later, each against a different counterparty at a possibly different price. Each fill is its own trade record with its own execution ID. The order is the request; the trade is what actually happened on the exchange.",
      whyItHelps: "If a requirement assumes \"one order equals one trade,\" it will silently mishandle every partially filled order — which, on an active desk, is most of them.",
    },
    {
      number: 4,
      title: "Enrichment & Confirmation — the trade gets what it needs to settle",
      insight: "A freshly executed trade doesn't yet carry what settlement needs — that gets added right after.",
      explanation:
        "Execution only produces instrument, quantity, price and counterparty. Middle Office enriches that raw trade with reference data — buyer account, currency, standard settlement instructions — then confirms those details match with the counterparty before anyone commits to settling.",
      before: "Trade status: Executed.",
      after: "Trade status: Executed and enriched — account, currency and settlement instruction attached, confirmed with counterparty.",
      whyItHelps: "This is where requirements most often quietly break: execution can be flawless and settlement can still fail because the enrichment step attached a stale or wrong settlement instruction.",
      proTip: "If a settlement is stuck and execution looks clean, check enrichment before you check anything downstream of it.",
    },
    {
      number: 5,
      title: "Clearing — the trade becomes the clearing corporation's obligation",
      insight: "On an exchange, you don't actually settle with your original counterparty — you settle with the clearing corporation.",
      explanation:
        "Through a process called novation, the clearing corporation (NSE Clearing or ICCL in India, DTCC/NSCC in the US) steps into the middle of every trade — becoming the buyer to every seller and the seller to every buyer. It also nets: several buy and sell trades in the same instrument on the same day collapse into one net obligation per member. This is why one counterparty defaulting doesn't take the whole trade down with it.",
      whyItHelps: "Once you know clearing happened, \"who does this trade settle against\" stops being the original counterparty and starts being the clearing corporation — and margin or clearing-member issues become just as relevant to settlement as the trade itself.",
    },
    {
      number: 6,
      title: "Settlement — securities and cash actually change hands",
      insight: "This is the only stage where anything physically moves.",
      explanation:
        "On settlement date, the depository (NSDL or CDSL in India) moves securities from seller to buyer while cash moves the other way — done together, as Delivery versus Payment (DvP), so neither side hands over its half without receiving the other. Settlement date isn't the same day as execution; for Indian cash equities it's typically the next trading day (T+1).",
      before: "Dashboard: \"Trade complete\" (means: executed).",
      after: "Dashboard: \"Trade settled\" (means: securities credited to the buyer's demat account, cash debited and credited across custodians).",
      whyItHelps: "\"Trade complete\" on a front-end screen usually means executed, not settled — and the gap between those two can be a full day or more, which is exactly the window where settlement failures live.",
    },
    {
      number: 7,
      title: "Mistakes new BAs make on their first lifecycle project",
      insight: "The same handful of assumptions cause most of the early confusion.",
      list: [
        "Treating \"trade done\" as \"lifecycle done\" instead of checking which stage \"done\" actually refers to",
        "Assuming one order always equals exactly one trade record",
        "Confusing clearing with settlement — they're two distinct stages, not one",
        "Assuming settlement happens the same day as execution rather than on a separate settlement date",
        "Not checking whether a stuck settlement is actually an enrichment problem (wrong account or instruction) rather than a settlement-stage problem",
      ],
      whyItHelps: "Each of these turns a five-minute lifecycle question into a much longer investigation if it goes unchecked.",
    },
    {
      number: 8,
      title: "Questions to keep in your pocket",
      insight: "These work on almost any trade-processing requirement, defect or investigation.",
      checklist: [
        "Which stage does this actually touch — Order, Execution, Enrichment & Confirmation, Clearing or Settlement?",
        "Is this one trade record, or could it be several (partial fills, netted obligations)?",
        "What's the settlement date for this instrument, and does the requirement assume it's same-day?",
        "After clearing, whose obligation is this — the original counterparty's, or the clearing corporation's?",
        "Does \"trade complete\" in this requirement mean executed, or settled?",
      ],
      whyItHelps: "Asking these before you write or review a requirement catches a scope gap before a developer builds against the wrong stage.",
    },
  ],
};
