import type { Essay } from "@/types/content";

const essayHooks: Record<string, string> = {
  "shiv-pressed-buy-trade-execution":
    "One order. Two markets. The hidden machinery behind every trade.",
  "capital-market-system-two-paths-one-market": "Same stock. Different game.",
  "repo-the-overnight-loan-thats-legally-two-trades":
    "It looks like borrowing. Legally, ownership flips twice.",
  "netting-how-finance-cancels-a-mountain-of-debt-into-a-pebble":
    "The market does not settle every promise. It compresses the mess.",
  "margin-how-a-clearinghouse-turns-fear-into-collateral":
    "A clearinghouse turns future fear into collateral today.",
  "novation-how-a-clearinghouse-becomes-everyones-counterparty":
    "Two strangers trade. One institution becomes the promise.",
  "settlement-finality-when-a-trade-stops-being-a-promise":
    "At some point, a trade must stop being reversible.",
  "default-waterfall-who-pays-when-a-clearing-member-fails":
    "When a member fails, losses travel through a pre-built staircase.",
  "how-order-books-work":
    "A market price is not discovered by magic. It is negotiated in public.",
  "what-a-trade-lifecycle-actually-looks-like":
    "A trade is not done when two people agree on price.",
  "infrastructure-the-nine-systems-behind-every-trade":
    "Nobody sees the machines that turn a click into a trade.",
  "what-spoofing-actually-looks-like":
    "The fake order is the bait. The real trade happens elsewhere.",
  "a-good-decision-can-still-lose":
    "Good process and good outcome are not the same thing.",
  "the-base-rate-is-usually-the-whole-answer":
    "Before the story, ask what usually happens.",
  "people-respond-to-incentives-not-instructions":
    "People follow the scoreboard, not the slogan.",
  "opportunity-cost-is-the-only-cost-that-matters":
    "Every yes quietly spends the best no.",
  "sunk-costs-cant-answer-the-question-youre-asking":
    "Money already spent cannot vote on what happens next.",
  "why-jargon-is-a-wall": "Every unexplained acronym charges an entry fee.",
  "the-acronym-wall-every-new-banking-ba-hits":
    "Acronyms are not knowledge. They are locked doors.",
  "from-stakeholder-sentence-to-acceptance-criteria":
    "A vague request becomes useful only when behavior becomes testable.",
  "writing-requirements-that-survive-contact-with-engineering":
    "A good requirement still works after the meeting ends.",
  "what-happens-between-a-jira-ticket-and-a-test-case":
    "The gap between idea and test is where defects are born.",
  "why-jira-tickets-rot-in-backlog": "A backlog is not storage. It is a decay chamber.",
  "the-learning-dividend": "Learning compounds when explanations become reusable.",
  "context-windows-arent-memory": "A larger window is not the same as remembering.",
  "why-llms-hallucinate": "Confidence is not the same as truth.",
  "the-decisions-that-never-stopped-billing":
    "Some choices keep charging long after the purchase.",
  "weve-seen-this-movie-before": "New technology often repeats an old adoption pattern.",
};

function firstSentence(text: string) {
  const [sentence] = text.split(/(?<=[.!?])\s+/);
  return sentence || text;
}

export function getEssayHook(essay: Essay) {
  return essayHooks[essay.slug] ?? firstSentence(essay.description);
}
