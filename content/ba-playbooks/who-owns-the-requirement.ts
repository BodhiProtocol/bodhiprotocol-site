import type { Playbook } from "@/types/content";

const requirementOwnershipCheck = `REQUIREMENT OWNERSHIP CHECK

Requirement:

Why does it exist?

Requirement owner:

Requirement steward:

Who approves material changes?

Who makes the final call when people disagree?

Open decision:

Decision owner:

Impact if unresolved:
`;

// Full narrative prose lives in components/ba-playbooks/who-owns-the-requirement-body.tsx
// (rendered via the customPlaybookBodies registry, not from `hacks`). This is a
// plain-text copy of that same prose, used only to compute an accurate reading
// time — see the `bodyText` field doc in types/content.ts.
const bodyText = `Someone asks: "Who owns this requirement?" Product says business owns it. Business says the BA has been managing it. The BA says Risk made the decision. Risk says Operations needs to confirm it. Operations says Compliance should decide. Compliance says isn't this owned by Risk? Six answers later, we still don't have an owner. A requirement can have plenty of people around it and still belong to nobody.

Here's the requirement. REQ-218 — block trades when customer risk data is unavailable. If customer risk information cannot be retrieved, the trade must not proceed. Development starts. Then QA asks what exactly should happen. Should the trade fail completely, go to Manual Review, or continue and be flagged afterwards? Good question. So the BA asks who can decide. That's where the real problem begins.

"Ask the business" is not an answer. Which business — Risk, Operations, Front Office, Compliance, Product? "Business" is a group of people who may want very different things. If the answer to "who decides" is a department name, keep asking.

The BA doesn't automatically own it either. You might have written the story, run the workshops, documented the rules, updated Jira, explained it to development, supported QA — that still doesn't mean you should make the business decision. A BA often owns the clarity of the requirement. Not necessarily the choice behind it.

REQ-218 starts travelling. Risk says Operations needs to confirm the workflow. Operations says Compliance needs to confirm whether Manual Review is acceptable. Compliance says Risk owns the policy. Risk to Operations to Compliance to Risk. Everybody is involved. Nobody is deciding. This is what unclear ownership often looks like. Not silence. Circulation.

Find ownership at the decision point. Here's the simplest test: if two stakeholders disagree, who makes the final call? That question is far more useful than "who is involved." For REQ-218, someone eventually has to choose between reject, Manual Review, or continue. The person with authority to make that choice is much closer to the real owner. Ownership becomes visible when a decision has to be made.

A lot of confusion disappears if we stop calling everyone the owner. Three roles are worth separating. The Requirement Owner is accountable for what the business behaviour should be — they can approve a material change and stand behind the outcome. The Requirement Steward keeps the requirement clear, current and testable — often the BA — making sure everyone understands it without automatically making the business decision. The Decision Owner makes a specific specialist decision: Risk owns risk treatment, Compliance owns regulatory interpretation, Operations owns operational process, Technology owns technical design. These can be different people. That's fine. The problem is when nobody knows which role belongs to whom.

Back to REQ-218. Instead of writing "Owner: Business," we write: Requirement owner — Head of Client Risk Controls. Requirement steward — Business Analyst. Open decision — what happens when customer risk data is unavailable? Decision owner — Head of Client Risk Controls. Consulted — Operations, Compliance, Technology. Impact if unresolved — QA cannot validate the exception flow. We still need the decision. But now we know who must make it. Instead of sending the requirement around the organisation, the BA can take the question straight to the person with authority to resolve it.

Don't confuse expertise with ownership. The SME may know the process better than anyone. That doesn't automatically mean they can change it. The SME can say "this is how the process works today." The owner needs to be able to say "this is how the process should work tomorrow." Knowledge and authority are different things. Both matter. They are not the same.

The five-minute ownership test: pick one important requirement and ask who can explain why it exists, who can approve a material change, who accepts the business outcome, and — the important one — if stakeholders disagree, who makes the final call? If nobody can answer that clearly, you probably haven't found the owner yet.

What happened to REQ-218? The Head of Client Risk Controls finally makes the call: if risk data is unavailable, the trade must not proceed automatically — instead, send it to Manual Review. Business Rule: a trade must not proceed automatically when required customer risk data is unavailable. Acceptance Criterion: given customer risk data cannot be retrieved, when pre-trade validation runs, then automatic processing stops and the trade enters Manual Review. Now we know both what the system should do and who stands behind the decision.

A requirement doesn't have an owner because someone's name appears next to it in Jira. It has an owner when someone can say: "This is the behaviour we want, and I'm accountable for that decision." The BA can make it clear. The SME can make it accurate. Technology can make it feasible. QA can prove it works. But none of them automatically owns the decision. When the requirement reaches a fork in the road, ask one question: who gets to choose? If nobody knows, the requirement doesn't have an owner yet.`;

export const whoOwnsTheRequirement: Omit<Playbook, "readingTime"> = {
  slug: "who-owns-the-requirement",
  title: "Nobody Knows Who Owns the Requirement",
  description: "When everyone is involved, ownership can quietly belong to nobody.",
  summary:
    "A worked example of a requirement that travels from Risk to Operations to Compliance and back without anyone deciding — and the three roles (Owner, Steward, Decision Owner) that stop a requirement from circulating forever.",
  category: "Business Analysis",
  tags: ["Stakeholders", "Requirements", "ownership"],
  author: "Surya",
  date: "2026-08-08",
  audience: [
    "Business Analysts stuck sending a requirement in circles between departments",
    "BAs whose requirement docs say \"Owner: Business\" and nothing more specific",
    "Delivery leads untangling who actually gets to approve a change",
    "Anyone who's heard \"ask the business\" as an answer",
  ],
  bodyText,
  seoTitle: "Nobody Knows Who Owns the Requirement — A BA Diagnostic Guide",
  seoDescription:
    "A practical BA guide to finding real requirement ownership — why 'ask the business' isn't an answer, the three roles worth separating, and a worked example of a requirement that finally gets decided.",
  closingHeading: [
    "A requirement doesn't have an owner because a name is next to it in Jira.",
    "It has an owner when someone says “I’m accountable for that decision.”",
  ],
  closingBody:
    "Next time a requirement reaches a fork in the road, don't send it around the organisation again. Ask one question: who gets to choose? If nobody knows, the requirement doesn't have an owner yet.",
  closingTemplate: requirementOwnershipCheck,
  closingTemplateName: "Requirement Ownership Check",
  relatedPlaybookSlugs: [
    "story-carried-over-four-sprints",
    "acceptance-criteria-playbook",
    "requirement-elicitation-playbook",
  ],
  hacks: [
    {
      number: 1,
      title: "Requirement Owner",
      insight: "Accountable for what the business behaviour should be.",
      explanation: "They can approve a material change and stand behind the outcome. For REQ-218, that's the Head of Client Risk Controls.",
      whyItHelps: "Naming this role stops \"Owner: Business\" from standing in for an actual accountable person.",
    },
    {
      number: 2,
      title: "Requirement Steward",
      insight: "Keeps the requirement clear, current and testable — often the BA.",
      explanation: "The steward makes sure everyone understands the requirement, but does not automatically make the business decision.",
      whyItHelps: "Separating clarity from authority stops the BA from being expected to make calls that aren't theirs to make.",
    },
    {
      number: 3,
      title: "Decision Owner",
      insight: "Makes a specific specialist decision.",
      list: [
        "Risk → risk treatment",
        "Compliance → regulatory interpretation",
        "Operations → operational process",
        "Technology → technical design",
      ],
      whyItHelps: "These can be different people for the same requirement — that's fine, as long as everyone knows which role belongs to whom.",
    },
  ],
};
