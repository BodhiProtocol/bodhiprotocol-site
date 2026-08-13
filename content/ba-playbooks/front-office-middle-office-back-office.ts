import type { Playbook } from "@/types/content";

const tradeLifecycleQuickReference = `TRADE LIFECYCLE QUICK REFERENCE

Market Data — What's happening?

Reference Data — What exactly are we dealing with?

Front Office — How was it executed?

Risk — What exposure did it create?

Middle Office — Was it captured and controlled correctly?

Back Office — Did the transaction complete?
`;

// Full narrative prose lives in
// components/ba-playbooks/front-office-middle-office-back-office-body.tsx
// (rendered via the customPlaybookBodies registry, not from `hacks`). This is a
// plain-text copy of that same prose, used only to compute an accurate reading
// time — see the `bodyText` field doc in types/content.ts.
const bodyText = `You join your first Capital Markets project. Within a few meetings: "That's a Front Office issue." Then: "Middle Office should catch it." Later: "Check with Back Office." Everyone moves on. You're still thinking: what exactly are these offices? And where do Market Data, Reference Data and Risk fit? Let's use Reliance Industries in India, and occasionally Microsoft in the US, to see how the same trade journey works across markets.

First, forget the word "office." They're not necessarily physical offices. Think of them as broad responsibilities across the trade lifecycle. A simple mental model: Front Office executes the trade, Middle Office checks and controls it, Back Office processes it through settlement. And Risk can cut across the whole journey. Don't memorize the org chart, memorize the responsibility — different firms organise these teams differently, but the lifecycle is what matters.

Market Data: what's happening? You're about to buy Reliance on NSE. First question: what's the market doing? You need price, bid and ask, volume, order-book data, indices, rates — that's Market Data. A trader buying Microsoft needs the same kind of information from the relevant US market. Market Data is what's happening in the market right now. Without it, you're basically trading with the lights off.

Reference Data: what exactly are we trading? You say "buy Reliance." A human understands. A system needs more — which instrument, which exchange, which currency, which account, which counterparty. That's Reference Data: instruments, exchanges, currencies, accounts, legal entities, settlement instructions. Market Data is what's happening to it. Reference Data is what it is. That one distinction saves a lot of confusion later.

Front Office: let's get the order done. An institutional client says "buy 10,000 Reliance shares." The order reaches the Front Office — Sales, Trading, Execution, OMS, EMS. The client sends an order, but 10,000 shares may not execute at once — maybe 3,000, then 4,000, then 3,000. Those are executions. The same idea applies if the client is buying Microsoft in the US. Front Office is basically asking: okay, how do we actually get this order done?

The trade executed. Done? Nope. Executed doesn't mean finished. The Reliance order may show FILLED, but the trade can still have the wrong account, missing settlement instructions, a position mismatch, a reconciliation break, or a settlement failure. Imagine the execution is perfect, but the settlement instruction points to the wrong account. Front Office sees "trade done." Post-trade teams see "we have a problem." Execution success does not equal lifecycle complete.

Middle Office: did we capture it correctly? The trader says "done." Middle Office says "cool, is everything actually right?" Responsibilities vary by firm, but Middle Office often deals with trade validation, positions, P&L checks, reconciliation, trade enrichment, exceptions and controls. Front Office traded it. Middle Office checks whether it was captured and controlled correctly. That's enough to get started.

Risk: what did this trade change? Every trade changes something — a position, an exposure, a risk. Market Risk: what if the price moves against us? Credit / Counterparty Risk: what if the other party cannot meet its obligation? Liquidity Risk: can we fund or exit the position? Operational Risk: what if a system or process fails? Risk doesn't sit neatly at one point in the lifecycle — a pre-trade limit check is Risk, monitoring exposure after execution is Risk, checking whether a counterparty is near its credit limit is also Risk. Risk can cut across the whole journey.

Back Office: now make the trade complete. You bought the Reliance shares. Eventually two things need to happen: securities move, and money moves. That's where Back Office comes in — confirmation, clearing, settlement, cash processing, securities processing, reconciliation, corporate actions, settlement exceptions. In India, the journey may involve exchanges, clearing corporations, brokers, custodians and depositories such as NSDL or CDSL. In the US, the infrastructure is different, but the question is the same: did the buyer receive the securities, and did the seller receive the money? That's settlement at its simplest.

Now look at the whole journey. What looked like "buy Reliance" is actually: Market Data (what's happening?) leads to Reference Data (what are we trading?) leads to Front Office (order, execution, trade) leads to Middle Office (validate, enrich, control) leads to Back Office (confirm, clear, settle) leads to cash and securities moving. And across the whole journey, Risk asks what exposure exists and whether we're within our limits. These stop looking like six unrelated definitions — they're all helping one trade move through a system.

Why this matters if you're a BA, QA or developer. Imagine Development says "it's just one new field." Sounds harmless. Now start asking: where does the field come from, does Front Office create it, does Reference Data supply it, does Risk use it, does Middle Office validate it, does Back Office need it, does another downstream system consume it? Suddenly one field isn't one field — it's information travelling through a chain. For a BA, that's impact analysis. For a QA, it means testing beyond one screen. For a developer, it explains why a tiny change can affect several systems. And for a fresher or analyst, it gives you the map before you start learning every street.

The six questions to remember: Market Data — what's happening? Reference Data — what exactly are we dealing with? Front Office — how was it executed? Risk — what exposure did it create? Middle Office — was it captured and controlled correctly? Back Office — did the transaction complete? You don't need to understand every system on day one. Start with: where does this sit in the trade journey?

The idea to take away. When someone says "that's a Front Office issue" or "Middle Office should investigate," don't immediately ask "which department is that?" Ask "what is happening to the trade at this point?" That question will usually get you much closer to the answer. Because a trade isn't just a buy and a sell — it's a journey from intent to execution to control to settlement. And Market Data, Reference Data and Risk help that journey work. Once you see the journey, the jargon starts becoming a map.`;

export const frontOfficeMiddleOfficeBackOffice: Omit<Playbook, "readingTime"> = {
  slug: "front-office-middle-office-back-office",
  title: "Front Office, Middle Office & Back Office — What Do They Actually Do?",
  description: "Let's follow one trade from click to settlement.",
  summary:
    "One Reliance trade, followed from order to settlement, to show where Market Data, Reference Data, Front Office, Middle Office, Back Office and Risk actually fit — and why \"just one new field\" is never just one field.",
  category: "Capital Markets",
  tags: ["Capital Markets", "Trade Lifecycle", "Front Office"],
  author: "Surya",
  date: "2026-08-12",
  audience: [
    "Freshers and analysts starting their first Capital Markets project",
    "Business Analysts who've heard \"that's a Middle Office issue\" without a clear definition",
    "QAs and developers trying to understand why a small change touches several systems",
    "Anyone trying to understand how Capital Markets actually work",
  ],
  bodyText,
  seoTitle: "Front Office, Middle Office & Back Office Explained | BodhiProtocol",
  seoDescription:
    "Understand Front Office, Middle Office, Back Office, Market Data, Reference Data and Risk by following one Capital Markets trade from order to settlement.",
  closingHeading: [
    "A trade isn't just a buy and a sell.",
    "It's a journey from intent to execution to control to settlement.",
  ],
  closingBody:
    "Next time someone says \"that's a Front Office issue\" or \"Middle Office should investigate,\" don't ask which department that is. Ask what is happening to the trade at this point — that question gets you a lot closer to the answer.",
  closingTemplate: tradeLifecycleQuickReference,
  closingTemplateName: "Trade Lifecycle Quick Reference",
  relatedPlaybookSlugs: [
    "a-trade-is-missing-where-did-it-break",
    "two-systems-show-different-numbers",
    "business-analyst-user-story-template",
  ],
  hacks: [
    {
      number: 1,
      title: "Market Data",
      insight: "What's happening in the market right now?",
      explanation: "Price, bid and ask, volume, order-book data, indices, rates and volatility.",
      whyItHelps: "Without it, you're basically trading with the lights off.",
    },
    {
      number: 2,
      title: "Reference Data",
      insight: "What exactly are we dealing with?",
      explanation: "Instruments, exchanges, currencies, accounts, legal entities, settlement instructions.",
      whyItHelps: "Market Data tells you what's happening to it. Reference Data tells you what it is.",
    },
    {
      number: 3,
      title: "Front Office",
      insight: "How was it executed?",
      explanation: "Sales, Trading, Execution, OMS, EMS — the order becomes one or more executions, which become a trade.",
      whyItHelps: "Front Office is asking: okay, how do we actually get this order done?",
    },
    {
      number: 4,
      title: "Risk",
      insight: "What exposure did it create?",
      list: ["Market Risk", "Credit / Counterparty Risk", "Liquidity Risk", "Operational Risk"],
      whyItHelps: "Risk doesn't sit neatly at one point in the lifecycle — it cuts across the whole journey.",
    },
    {
      number: 5,
      title: "Middle Office",
      insight: "Was it captured and controlled correctly?",
      explanation: "Trade validation, positions, P&L checks, reconciliation, trade enrichment, exceptions and controls.",
      whyItHelps: "Front Office traded it. Middle Office checks whether it was captured and controlled correctly.",
    },
    {
      number: 6,
      title: "Back Office",
      insight: "Did the transaction complete?",
      explanation: "Confirmation, clearing, settlement, cash and securities processing — did the buyer receive the securities, and did the seller receive the money?",
      whyItHelps: "That's settlement at its simplest, whether the trade happened on NSE/BSE or NASDAQ.",
    },
  ],
};
