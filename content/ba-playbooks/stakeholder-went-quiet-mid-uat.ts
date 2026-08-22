import type { Playbook } from "@/types/content";

const escalationRiskLog = `UAT SIGN-OFF ESCALATION & RISK LOG

STAKEHOLDER
Name and role:
Last confirmed contact (date):
Reason for unavailability, if known:

DELEGATE
Named delegate sign-off authority:
Delegate confirmed in writing? Y / N
Escalated to (name, role):
Escalation date:

SCOPE STATUS
Test scenarios / defects requiring THIS stakeholder's judgment:
Test scenarios / defects already agreed and unblocked:
Can the unblocked scope proceed independently? Y / N

IF THE DEADLINE CANNOT MOVE
Proceeding without formal sign-off? Y / N
Risk of proceeding, in plain language:
Risk accepted by (name, role — not the BA alone):
Date accepted:

CLOSE THE LOOP
Retroactive sign-off received? Y / N — date:
Delegate added to RACI for next cycle? Y / N
`;

export const stakeholderWentQuietMidUat: Omit<Playbook, "readingTime"> = {
  slug: "stakeholder-went-quiet-mid-uat",
  title: "The Stakeholder Went Quiet Mid-UAT. Now What?",
  description:
    "UAT sign-off needs one person's word, and that person stopped replying three days before go-live. A practical playbook for keeping a release moving without a decision-maker in the room — without quietly letting silence become approval.",
  summary:
    "A practical guide to a stalled UAT sign-off — finding out why the stakeholder actually went quiet, locating a named delegate, separating scope that genuinely needs their judgment from scope that doesn't, escalating with a decision ready to approve, and documenting who accepted the risk if the release has to move without a signature.",
  category: "UAT",
  tags: ["UAT", "Stakeholders", "sign-off"],
  author: "Surya",
  date: "2026-08-22",
  itemLabel: "Move",
  intro: [
    "Testing is done. Defects are triaged and closed. The only thing standing between the team and go-live is one email: the business stakeholder's formal UAT sign-off. That person hasn't replied in three days, and the release date isn't moving for anyone's inbox.",
    "This isn't a testing problem, and chasing it like one — another reminder email, another \"just following up\" — usually just delays finding out why they've actually gone quiet. It's an availability problem wearing a sign-off request, and it needs a different kind of move.",
    "None of this means skipping the sign-off. It means getting a real decision out of the situation, made by someone with the authority to make it, documented well enough that nobody has to guess later why the release went out the way it did.",
  ],
  audience: [
    "Business Analysts holding a release that's blocked on one unresponsive stakeholder",
    "BAs deciding whether \"no response\" is safe to treat as approval",
    "Delivery leads managing a go-live date that isn't moving",
    "Anyone who's sent a third reminder email and gotten the same silence back",
  ],
  seoTitle: "The Stakeholder Went Quiet Mid-UAT — A BA Playbook",
  seoDescription:
    "A practical Business Analyst guide to a stalled UAT sign-off — finding a delegate, separating genuinely blocked scope from scope that isn't, escalating with a ready decision, and documenting the risk if the release has to move without a signature.",
  closingHeading: [
    "A release doesn't wait for someone to check their inbox.",
    "But it shouldn't quietly happen just because they didn't.",
  ],
  closingBody:
    "A quiet stakeholder is an availability problem, not a testing problem — and it needs an escalation path, a named delegate, and a documented decision, not a fourth reminder email. Find out why they've gone quiet, separate what's actually blocked from what only feels blocked, and if the deadline truly can't wait, make sure the risk of proceeding without a signature was accepted by someone with the authority to accept it.",
  closingTemplate: escalationRiskLog,
  closingTemplateName: "UAT Sign-off Escalation & Risk Log",
  relatedPlaybookSlugs: [
    "pre-uat-readiness-checklist",
    "who-owns-the-requirement",
    "uat-passed-production-failed",
  ],
  hacks: [
    {
      number: 1,
      title: "Don't chase harder — check the escalation path first",
      insight: "A fourth reminder email doesn't fix an availability problem. An escalation path does.",
      explanation:
        "Before sending another \"just following up,\" check whether an escalation path was ever defined for this sign-off — a named backup, a manager, a project sponsor. Most teams have one and forget to use it until it's this late.",
      whyItHelps: "Repeating the same request into the same silence just burns the days you don't have left before go-live.",
    },
    {
      number: 2,
      title: "Find out why they're quiet before assuming they're ignoring you",
      insight: "\"On leave,\" \"reassigned,\" \"overloaded,\" and \"doesn't understand what they're signing off on\" are four different problems.",
      list: [
        "On leave or genuinely unavailable — needs a delegate, not persistence",
        "Reassigned or no longer the right owner — needs the sign-off routed to whoever replaced them",
        "Buried under other priorities — needs a shorter, easier decision to make",
        "Unsure what they're actually approving — needs a clearer, more specific ask, not a faster one",
      ],
      whyItHelps: "Persistence only solves the third cause. Applied to the other three, it just wastes the days you have left.",
    },
    {
      number: 3,
      title: "Find the delegate before you need one",
      insight: "Check whether a deputy sign-off authority was named at project kickoff — most RACIs have one, unused until now.",
      explanation:
        "If no delegate was ever named, that's the actual gap: escalate to the stakeholder's manager and ask them to name one in writing, today, rather than continuing to wait on the original person.",
      whyItHelps: "A named, confirmed delegate turns an open-ended wait into a decision someone can actually make this week.",
    },
    {
      number: 4,
      title: "Never let silence quietly become approval",
      insight: "\"We'll assume sign-off if we don't hear back by Friday\" feels efficient. It's actually a decision nobody agreed to.",
      before: "An implicit sign-off-by-silence deadline, set unilaterally and never confirmed with anyone who has the authority to set it.",
      after: [
        "An explicit escalation, sent to a named decision-maker",
        "A stated deadline for a real response — approval, rejection, or delegation",
        "A documented default only if that default was itself approved by someone senior enough to own it",
      ],
      whyItHelps: "If something breaks in production, \"we assumed silence meant yes\" is not a sign-off anyone can point to.",
    },
    {
      number: 5,
      title: "Separate what's actually blocked from what only feels blocked",
      insight: "Not every test scenario needs this specific person's judgment call.",
      checklist: [
        "Which test scenarios or defects genuinely need this stakeholder's business judgment?",
        "Which ones were already agreed and are just waiting on a formality?",
        "Can the already-agreed scope proceed, or go live in a phased release, on its own?",
        "Is the blocked portion small enough to hold back separately, rather than delaying everything?",
      ],
      whyItHelps: "A release doesn't have to be all-or-nothing just because one person is unreachable — often only a fraction of the scope actually needs them.",
    },
    {
      number: 6,
      title: "Escalate with a decision ready to approve, not a question to answer",
      insight: "A busy or absent stakeholder responds faster to \"reply APPROVE, or tell us why not\" than to an open-ended request.",
      compare: {
        leftLabel: "Open-ended ask",
        left: "\"Can you please review and confirm sign-off on UAT when you get a chance?\"",
        rightLabel: "Decision-ready ask",
        right:
          "\"Based on the completed UAT results, we recommend proceeding to go-live on Thursday. Reply APPROVE, or tell us what's blocking it, by end of day tomorrow.\"",
      },
      whyItHelps: "A yes/no decision against a stated deadline gets answered. A general review request gets postponed.",
    },
    {
      number: 7,
      title: "If the deadline truly can't move, document who accepted the risk",
      insight: "Releasing without formal sign-off can be the right call — but only when someone senior explicitly owns that call.",
      visual: {
        steps: [
          "State the risk of proceeding without sign-off, in plain business language",
          "→ Present it to someone with the authority to accept it — not the BA alone",
          "→ Get their acceptance dated and in writing",
        ],
      },
      whyItHelps: "A BA quietly deciding to ship without sign-off is a single point of blame waiting to happen. A documented, senior-accepted risk is a business decision.",
      proTip: "Write the risk in terms of business impact, not process — \"customers may see X in scenario Y\" lands faster with a decision-maker than \"UAT sign-off is outstanding.\"",
    },
    {
      number: 8,
      title: "Close the loop after go-live, not just before",
      insight: "The stakeholder resurfacing after the release isn't the end of the story — it's when the sign-off gets made real.",
      explanation:
        "Get a retroactive confirmation logged the moment they're back, and use the gap you just lived through to add a named delegate to the RACI so the next release isn't blocked on one person's calendar again.",
      whyItHelps: "Without this step, the exact same escalation happens again next release — nothing about the gap that caused it actually got fixed.",
    },
  ],
};
