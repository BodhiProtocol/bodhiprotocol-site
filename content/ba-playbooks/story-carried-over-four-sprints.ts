import type { Playbook } from "@/types/content";

const stuckStoryDiagnostic = `STUCK STORY DIAGNOSTIC

Story:

Sprint carry-over count:

What is actually unfinished?

Root cause:
[ ] Technical
[ ] Requirement
[ ] Dependency
[ ] Testing
[ ] Scope
[ ] Decision
[ ] Other

What are we waiting for?

Decision / blocker owner:

Next-action owner:

What needs to happen next?

Can completed scope be split or released separately?

Next concrete action:

Due date:

What would make this story genuinely Done?
`;

// Full narrative prose lives in components/ba-playbooks/story-carried-over-body.tsx
// (rendered via the customPlaybookBodies registry, not from `hacks`). This is a
// plain-text copy of that same prose, used only to compute an accurate reading
// time — see the `bodyText` field doc in types/content.ts.
const bodyText = `Sprint 1: carried over. Sprint 2: carried over. Sprint 3: carried over. Monday morning. Sprint 4. And there it is again. ABC-142. Same title. Same story points. Same slightly uncomfortable feeling when somebody asks "What's left on this one?" Someone says "It's almost done." Which is interesting, because it was almost done three weeks ago too. At this point, I wouldn't ask "How do we finish this story?" I'd ask "Why has this story survived four sprints?" Because a story that keeps carrying over is usually telling you something. The mistake is treating the carry-over itself as the problem.

First, stop calling it "almost done." ABC-142's status is In Progress. The latest comment says "Development almost complete. Pending final validation." Sounds reasonable, but "almost done" is not particularly useful. So ask: what exactly is unfinished? Not how much is left, not what percentage is complete — actually name the remaining thing. We ask the developer. Turns out UI is finished, backend changes are finished, API integration is finished, unit testing is finished. So development isn't really the problem. QA is waiting. Now we have somewhere to look.

The story is not blocked by everything. A story can look stuck as one big object, but usually only one part is actually stuck. ABC-142 has been sitting in "In Progress" for weeks, which makes it feel like the whole story is unfinished. It isn't. Most of it is done. The remaining issue is that QA cannot complete one test scenario. Now ask why.

QA says the expected behaviour is unclear. An upstream service normally returns customer risk data, but sometimes the service returns no record. QA asks what should happen when no risk record is returned. The acceptance criteria say the system should handle the response "appropriately." Development interpreted that as continue processing. QA interpreted it as stop processing and show an error. The business hasn't confirmed either. ABC-142 is not really waiting for QA — QA is waiting for a requirement.

So we check the requirement. Description, nothing. Acceptance criteria, nothing. Linked Confluence page, nothing. Then we reach the comments. Comment #38 says "Need business confirmation on expected behaviour when no risk record is returned," posted 13 days ago, with no answer. There it is: four sprints of carry-over, and the actual blocker is one unanswered question sitting inside a Jira comment. The story wasn't blocked by development. It wasn't really blocked by QA either. It was blocked by a decision nobody had made visible.

This is why carry-over is useful information. It's tempting to treat carry-over as a planning problem — bad estimation, too much work taken on, falling velocity. Sometimes that is exactly what happened. But repeated carry-over deserves a different question, not "why are we slow" but "what kind of unfinished work keeps surviving the sprint boundary." Because "unfinished" can mean very different things.

There are at least six kinds of unfinished. Technical unfinished means there is genuinely more implementation work — code or integration is incomplete, a technical problem hasn't been solved. Requirement unfinished means the team does not actually know what the system should do — acceptance criteria are unclear, an exception wasn't defined, a rule is missing, or two stakeholders interpret the requirement differently. Dependency unfinished means your team is done with its part but is waiting on another team, an API, infrastructure, a test environment, a vendor, reference data, or approval. Testing unfinished means development may be complete but behaviour hasn't been proven — test data is missing, the QA environment is broken, test cases are unclear, defects remain, or business validation hasn't happened. Scope unfinished is sneaky — every time somebody touches the story, something else gets added, so the story isn't finishing because the finish line keeps moving. Decision unfinished means someone needs to choose — option A or B, approve or reject, include or exclude, fail or continue — but no one has clearly made the decision. This is what happened to ABC-142, and it's incredibly common.

Back to ABC-142. Now that we know the blocker, instead of saying "still pending QA," we update the story with a Blocker, a Decision required, a Decision owner, an Impact, and an Owner. Now the problem is visible. A vague red status has become a specific decision.

Then ask whether this should still be one story. Is this actually still one coherent piece of work? At some point, keeping everything inside one story stops helping. Maybe completed scope can be separated, maybe the unfinished part deserves its own ticket, maybe the original story was simply too large. The question is whether keeping all of this together still helps deliver the work.

Check whether the story changed while people were building it. Sometimes a story hasn't taken four sprints — four different versions of the story have taken four sprints. Look at description history, acceptance-criteria changes, newly added scope, comments containing decisions, linked defects, and new dependencies. If the requirement keeps changing after implementation starts, call that out instead of hiding it inside the carry-over number.

Ask whether QA found a defect or a missing requirement. If a warning was required and missing, that's a defect. If nobody had ever decided what should happen, that's a requirement gap. Otherwise teams end up logging defects against behaviour nobody actually specified, creating a cycle: missing requirement, logged as defect, developer asks what correct behaviour is, business decision needed, story carries over again. Name the real problem.

Find the owner of the blocker. "Waiting for business" is not ownership. Ask who is responsible for getting the next answer or action — not necessarily the person who must make the decision. For ABC-142, Risk Operations owns the decision, but the BA owns getting that decision, with a due date. Now something can move.

The five-minute carry-over test: what exactly is unfinished, why is it unfinished, who or what are we waiting for, can the completed part be separated, and what is the next concrete action.

What happened to ABC-142? Risk Operations eventually confirms that if no customer risk record is returned, processing must stop and the transaction should enter Manual Review. We update the business rule and acceptance criterion, QA tests it, it passes, and ABC-142 closes. The development work wasn't the thing that took four sprints — the unanswered behaviour did.

A story can be green and still be stuck. Teams often use Jira status as shorthand for health, but the status doesn't tell you whether understanding is moving. When something carries over repeatedly, ask what changed on this story during the last sprint. Was a decision made, a blocker removed, a dependency delivered, something tested, scope clarified? If the answer is basically nothing, moving it into another sprint will not magically change that.

Don't automatically blame estimation. Sometimes the team simply underestimated the work. But repeated carry-over can also be a symptom of vague requirements, hidden dependencies, delayed decisions, scope creep, poor story splitting, missing test data, environment issues, or unclear ownership. If you treat every carry-over as bad estimation, you may spend hours adjusting story points while the real blocker sits untouched. That's why diagnosis comes first.`;

export const storyCarriedOverFourSprints: Omit<Playbook, "readingTime"> = {
  slug: "story-carried-over-four-sprints",
  title: "The Story Has Been Carried Over for Four Sprints",
  description: "How to find out what is actually stopping a story from getting done.",
  summary:
    "A worked example of diagnosing a story that keeps surviving sprint boundaries — the six kinds of \"unfinished,\" the five-question carry-over test, and how one unanswered Jira comment held up four sprints of work.",
  category: "Business Analysis",
  tags: ["Delivery", "Jira", "root cause"],
  author: "Surya",
  date: "2026-08-08",
  audience: [
    "Business Analysts investigating a story that keeps carrying over",
    "Scrum Masters and delivery leads triaging sprint carry-over",
    "Product Owners deciding whether to re-scope a stuck story",
    "Anyone who's said \"it's almost done\" three sprints in a row",
  ],
  bodyText,
  seoTitle: "Why a Story Keeps Carrying Over — A BA Diagnostic Guide",
  seoDescription:
    "A practical BA guide to diagnosing a story that keeps carrying over sprints — the six kinds of unfinished work, the five-minute carry-over test, and a real worked example.",
  closingHeading: [
    "The thing being carried from sprint to sprint usually isn't the story.",
    "It's an unanswered question.",
  ],
  closingBody:
    "Next time a story appears in its third or fourth sprint, don't immediately move it again. Open it. Ask what is actually unfinished. Ask why. Ask who owns that answer.",
  closingTemplate: stuckStoryDiagnostic,
  closingTemplateName: "Stuck Story Diagnostic",
  relatedPlaybookSlugs: [
    "first-time-writing-a-user-story",
    "acceptance-criteria-playbook",
    "jira-hacks-for-business-analysts",
    "who-owns-the-requirement",
  ],
  hacks: [
    {
      number: 1,
      title: "Technical unfinished",
      insight: "There is genuinely more implementation work.",
      explanation: "Code is incomplete. Integration is incomplete. A technical problem has not been solved. Straightforward.",
      whyItHelps: "Naming this early confirms the fix is still in development's hands, not waiting on anyone else.",
    },
    {
      number: 2,
      title: "Requirement unfinished",
      insight: "The team does not actually know what the system should do.",
      list: ["Acceptance criteria are unclear", "An exception wasn't defined", "A rule is missing", "Two stakeholders interpret the requirement differently"],
      whyItHelps: "The code may be waiting for understanding, not for more code — that changes who needs to act next.",
    },
    {
      number: 3,
      title: "Dependency unfinished",
      insight: "Your team is done with its part, but the remaining work sits somewhere else.",
      list: ["Another team", "An API", "Infrastructure", "Test environment", "Vendor", "Reference data", "Approval"],
      whyItHelps: "The story is technically \"in progress,\" but nothing your team does will move it until the dependency clears.",
    },
    {
      number: 4,
      title: "Testing unfinished",
      insight: "Development may be complete, but behaviour hasn't been proven.",
      list: ["Test data is missing", "QA environment is broken", "Test cases are unclear", "Defects remain", "Business validation hasn't happened"],
      whyItHelps: "Different problem, different owner — treating a broken environment like a coding gap sends the fix to the wrong person.",
    },
    {
      number: 5,
      title: "Scope unfinished",
      insight: "Every time somebody touches the story, something else gets added.",
      explanation: "\"While we're here, can we also...\" Then \"this edge case should probably be included.\" Then \"we should support another market too.\"",
      whyItHelps: "The story is not finishing because the finish line keeps moving — naming that stops it from being blamed on the team's pace instead.",
    },
    {
      number: 6,
      title: "Decision unfinished",
      insight: "Someone needs to choose, and no one has.",
      list: ["Option A or B", "Approve or reject", "Include or exclude", "Fail or continue"],
      whyItHelps: "This is what happened to ABC-142 — and it's incredibly common, so it's worth checking first, not last.",
    },
  ],
};
