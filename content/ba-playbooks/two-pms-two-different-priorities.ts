import type { Playbook } from "@/types/content";

const capacityReconciliationSheet = `TWO-PM CAPACITY & PRIORITY RECONCILIATION SHEET

SHARED CAPACITY
Sprint / cycle:
Total available capacity (points / hours):

REQUEST A
PM / owner:
Item:
Value if delivered this cycle:
Cost if NOT delivered this cycle:
Size (points / hours):

REQUEST B
PM / owner:
Item:
Value if delivered this cycle:
Cost if NOT delivered this cycle:
Size (points / hours):

IS THIS A REAL CONFLICT?
Do the two items actually compete for the same capacity, team, or system? Y / N
If no — note why they don't actually collide:

SEQUENCING OPTIONS CONSIDERED
Option A (e.g. A this cycle, B next — guaranteed):
Option B (e.g. phased or partial delivery of both):
Option C (escalate — no acceptable sequencing found):

DECISION
Chosen option:
Decision owner, if escalated beyond the BA:
Rationale, shared with both PMs:
Date decided:

STANDING CADENCE
Is this likely to recur every cycle? Y / N
Recurring prioritization sync proposed? Y / N
`;

export const twoPmsTwoDifferentPriorities: Omit<Playbook, "readingTime"> = {
  slug: "two-pms-two-different-priorities",
  title: "Two PMs, Two Different Priorities. Same Sprint.",
  description:
    "Two product managers, one shared team, and both convinced their item is this sprint's most urgent. A practical playbook for turning a capacity fight into a sequencing decision — without the BA becoming the accidental tiebreaker.",
  summary:
    "A practical guide to reconciling two product managers' competing priorities on one shared team — getting both requests into one document, pricing the cost of not doing each, testing whether the conflict is even real, and proposing a sequencing option instead of forcing a binary choice.",
  category: "Business Analysis",
  tags: ["Stakeholders", "Prioritization", "capacity"],
  author: "Surya",
  date: "2026-08-22",
  itemLabel: "Move",
  intro: [
    "Two product managers share the same delivery team. Each has their own backlog, their own stakeholders, and their own item they've decided is this sprint's top priority — and the team only has capacity for one of them, maybe.",
    "Each PM has been talking to the BA separately, in separate meetings, making their own case. Neither has heard the other's. That's usually the actual problem — not that the two priorities are irreconcilable, but that nobody's compared them against the same number, in the same room, at the same time.",
    "The BA sitting between two PMs isn't there to pick a winner. The job is making the trade-off visible enough that the right person — sometimes that's both PMs together, sometimes it's whoever they both report to — can actually make the call.",
  ],
  audience: [
    "Business Analysts supporting two product managers on one shared delivery team",
    "BAs caught relaying two competing priorities instead of reconciling them",
    "Delivery leads watching the same capacity fight resurface every sprint",
    "Anyone who's had two 1:1s this week where each PM called their own item \"the priority\"",
  ],
  seoTitle: "Two PMs, Two Different Priorities — A BA Playbook",
  seoDescription:
    "A practical Business Analyst guide to two product managers competing for the same sprint capacity — comparing both requests against one number, testing whether the conflict is real, and proposing a sequencing option instead of a binary choice.",
  closingHeading: [
    "The BA's job isn't to decide whose priority wins.",
    "It's to make sure the trade-off is visible before anyone has to.",
  ],
  closingBody:
    "Two PMs rarely need a referee — they need their two requests sitting against the same capacity number, in the same conversation, instead of two separate ones. Price the cost of not doing each item, check whether the conflict is even real, and offer a sequencing option before anyone's forced into a binary choice. If it's still genuinely unresolved, escalate to whoever both PMs report to — that's an organizational-priority call, not a BA call.",
  closingTemplate: capacityReconciliationSheet,
  closingTemplateName: "Two-PM Capacity & Priority Reconciliation Sheet",
  relatedPlaybookSlugs: [
    "everyone-wants-something-different",
    "who-owns-the-requirement",
    "requirement-elicitation-playbook",
  ],
  hacks: [
    {
      number: 1,
      title: "Get both priorities in writing, in the same document",
      insight: "Two priorities living in two separate Slack threads can't be compared — only argued about, separately, forever.",
      explanation:
        "Pull both PMs' top asks into one shared document before scheduling any conversation about trade-offs. The document itself usually surfaces whether this is a real conflict or just two requests that never actually needed to be compared.",
      whyItHelps: "You can't reconcile what you can't see side by side.",
    },
    {
      number: 2,
      title: "Ask for the cost of NOT doing it, not just the value of doing it",
      insight: "Every PM can make a case for why their item matters. Fewer can say what actually happens if it waits.",
      compare: {
        leftLabel: "Value framing",
        left: "\"This unlocks a better checkout experience for our biggest segment.\"",
        rightLabel: "Cost-of-delay framing",
        right: "\"If this waits one more sprint, we miss the campaign window and lose the quarter's biggest acquisition push.\"",
      },
      whyItHelps: "Value alone makes every request sound essential. The cost of waiting is what actually distinguishes urgent from merely important.",
    },
    {
      number: 3,
      title: "Check whether the conflict is real before treating it as one",
      insight: "Sometimes two \"competing\" priorities don't even touch the same capacity once you look closely.",
      list: [
        "Do the two items need the same engineers, or different ones?",
        "Do they touch the same system, or genuinely separate ones?",
        "Could one actually run this sprint and the other next, with no real loss to either?",
        "Is the disagreement about sequencing, or about something that only sounds like a resource conflict?",
      ],
      whyItHelps: "A manufactured conflict resolved as if it were real just trains both PMs to escalate harder next time.",
    },
    {
      number: 4,
      title: "Put the capacity constraint in front of both PMs at once",
      insight: "Two separate 1:1s let each PM believe the other's item is essentially free.",
      before: "The BA hears Priority A in one meeting and Priority B in another, then tries to reconcile them alone afterward.",
      after: [
        "One shared conversation, with both PMs present",
        "One capacity number stated plainly: \"This sprint has 40 points. These two backlogs alone ask for 65.\"",
        "Both PMs reacting to the same constraint, not to a BA's secondhand summary of it",
      ],
      whyItHelps: "The trade-off only feels real once both PMs see the same shortfall at the same time — a BA relaying it separately just sounds like an opinion.",
    },
    {
      number: 5,
      title: "Don't let the BA become the tiebreaker by default",
      insight: "If nobody explicitly owns the decision, it quietly becomes whoever sequenced the backlog last.",
      explanation:
        "When the two priorities are genuinely, unavoidably incompatible, escalate to whoever both PMs report to — a shared manager, a delivery lead, a steering group. That's an organizational-priority call, not a scheduling detail.",
      whyItHelps: "A BA who silently ranks two PMs' work is the one who takes the blame later, for a decision that was never actually theirs to make.",
    },
    {
      number: 6,
      title: "Propose a sequencing option, not a binary choice",
      insight: "\"A or B\" is usually the wrong shape for the question. \"A, then B, on this date\" is often the right one.",
      visual: {
        steps: [
          "Option A this sprint, Option B next — with a committed date, not a vague promise",
          "→ or a phased split: the highest-value slice of each, this sprint",
          "→ or escalate, only once real sequencing options have been tried and rejected",
        ],
      },
      whyItHelps: "A guaranteed \"you're next\" converts a zero-sum fight into a scheduling decision most PMs can actually accept.",
    },
    {
      number: 7,
      title: "Write the decision down where both PMs can see it — and why",
      insight: "An undocumented sequencing decision gets silently re-argued the moment either PM forgets the reasoning.",
      whyItHelps: "A short, shared rationale note — what was decided, and why — is what stops the same fight from resurfacing verbatim next sprint.",
      whenToUse: "The moment a sequencing decision is made, before either PM moves on to their next request.",
    },
    {
      number: 8,
      title: "If this keeps happening, build a standing cadence instead of refighting it",
      insight: "A capacity conflict that recurs every sprint isn't eight separate incidents — it's one structural gap.",
      explanation:
        "Two PMs sharing one delivery team is a normal setup, but it needs a normal mechanism: a short, recurring prioritization sync where both backlogs get compared against the same capacity before either PM commits stakeholders to a date.",
      whyItHelps: "Solving this collision once and moving on just guarantees a near-identical one next sprint — a standing cadence solves the pattern, not the instance.",
    },
  ],
};
