# Stuck Story Diagnostic — Completed Example Pack

Two worked diagnoses, using the Stuck Story Diagnostic template exactly as a Business Analyst would fill it in when a story shows up in another sprint.

---

# Example 1 — ABC-142: Customer risk data exception handling

*(The story walked through in the Story Carried Over Four Sprints guide, filled in using the template.)*

## Story

- **Story:** ABC-142 — Validate customer risk data before trade processing
- **Sprint carry-over count:** 4 sprints

## What is actually unfinished?

QA cannot complete Scenario AC-07 because expected behaviour is undefined when the upstream Risk Service returns no customer record — not "testing," specifically this one unresolved scenario.

## Root cause

- [ ] Technical — genuinely more implementation work
- [x] Requirement — the team doesn't know what the system should do
- [ ] Dependency — waiting on another team, API, infrastructure or approval
- [ ] Testing — development's done, but behaviour hasn't been proven
- [ ] Scope — the finish line keeps moving
- [ ] Decision — someone needs to choose, and no one has
- [ ] Other:

*(Requirement and Decision overlap here — the acceptance criteria said "handle appropriately," and nobody had ever decided what "appropriately" means for this case.)*

## Ownership

- **What are we waiting for?** A decision from Risk Operations on whether the transaction should continue processing or stop and enter Manual Review when no risk record is returned.
- **Decision / blocker owner:** Risk Operations
- **Next-action owner:** Business Analyst (to arrange the decision, not to make it)
- **What needs to happen next?** BA schedules a 15-minute call with Risk Operations instead of leaving the question in a 13-day-old unanswered Jira comment.

## Can this story be split?

- **Can completed scope be split or released separately?** No — UI, backend, and API integration are all finished, but they can't ship without the one unresolved scenario, since the risk-check is the story's core purpose.
- **Next concrete action:** Risk Operations to confirm fail-vs-continue behaviour.
- **Due date:** Tuesday

## Definition of actually Done

Risk Operations confirms the behaviour, the acceptance criterion is rewritten to state it explicitly (stop processing, enter Manual Review), QA completes AC-07 against the confirmed behaviour, and the story closes — which is exactly what happened once the decision was made.

---

# Example 2 — INS-88: Auto-renewal reminder for lapsing policies

## Story

- **Story:** INS-88 — Send renewal reminders 30 days before policy expiry
- **Sprint carry-over count:** 3 sprints

## What is actually unfinished?

The reminder logic and notification delivery are both built and tested. What's unfinished: legal sign-off on the exact wording of the reminder message, specifically whether it can mention a "renewal discount" without triggering additional regulatory disclosure requirements.

## Root cause

- [ ] Technical — genuinely more implementation work
- [ ] Requirement — the team doesn't know what the system should do
- [x] Dependency — waiting on another team, API, infrastructure or approval
- [ ] Testing — development's done, but behaviour hasn't been proven
- [ ] Scope — the finish line keeps moving
- [ ] Decision — someone needs to choose, and no one has
- [ ] Other:

## Ownership

- **What are we waiting for?** Legal's approval of the final message copy.
- **Decision / blocker owner:** Legal & Compliance
- **Next-action owner:** Product Owner (Legal review was requested three weeks ago but never escalated after the initial submission)
- **What needs to happen next?** Product Owner follows up directly rather than waiting for Legal to circle back on their own schedule.

## Can this story be split?

- **Can completed scope be split or released separately?** Yes — the reminder without the discount mention needs no Legal sign-off and could ship this sprint. The discount-mention variant can be split into its own follow-up story pending approval.
- **Next concrete action:** Split INS-88 into INS-88a (reminder, no discount mention — ready now) and INS-88b (discount mention — blocked on Legal).
- **Due date:** INS-88a ships this sprint; INS-88b has no due date until Legal responds.

## Definition of actually Done

INS-88a: reminder sends correctly, without discount language, verified in production. INS-88b: remains open and visibly blocked-on-Legal in the backlog, instead of quietly inflating INS-88's carry-over count for a decision that was never going to be made by the delivery team anyway.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks
