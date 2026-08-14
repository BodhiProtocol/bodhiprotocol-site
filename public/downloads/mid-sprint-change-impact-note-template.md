# Mid-Sprint Requirement Change — Impact Note

Use this the moment someone says "it's just one small change" mid-sprint. Fill it in before you touch Jira, not after.

## Change summary

[One sentence: what is changing?]

## 1. CHANGE — What exactly changed?

- Old behaviour:
- New behaviour:
- Thresholds / boundaries (e.g. does "above X" mean `>` or `>=`?):
- Exceptions or edge cases:
- Open questions about the wording itself:

## 2. WHY — Why now?

- Reason for the change (regulatory / defect / new information / stakeholder preference / production risk):
- Is this urgent, or could it wait until next sprint?
- Who is asking for it?

## 3. BLAST RADIUS — What else moves?

| Area | Touched? | What changes | Owner |
| --- | --- | --- | --- |
| Business rules | | | |
| UI | | | |
| API | | | |
| Data | | | |
| Rules / configuration | | | |
| Downstream systems | | | |
| Testing | | | |
| Analytics and documentation | | | |

## 4. EFFORT — What's already built?

- What Development has already completed:
- What must be redone or reworked:
- What QA has already prepared or executed:
- What downstream teams depend on the original behaviour:

## 5. OPTIONS — How should we handle it?

- [ ] Absorb — small, understood, safely fits the sprint
- [ ] Split — keep original scope, new story for the new behaviour
- [ ] Swap — remove something else of similar effort to protect capacity
- [ ] Defer — valid but not urgent enough to disturb current delivery
- [ ] Stop & Rework — new requirement makes current work wrong, unsafe or pointless

Recommendation and reasoning:

## 6. DECISION — Who accepts the consequence?

- Who requested the change:
- Who assessed the impact:
- Who accepts the delivery consequence:
- Decision:
- Date:

## 7. TRACE — Update the source of truth

- [ ] Requirement updated (old and new behaviour unambiguous)
- [ ] Acceptance criteria updated (thresholds, boundaries, exceptions)
- [ ] Test cases updated
- [ ] Dependencies linked (APIs, services, teams, stories)
- [ ] Design / documentation updated
- [ ] Decision record captured (why the change happened, who agreed)

## 8. COMMUNICATE — Tell everyone whose work changed

Who needs to know, and what exactly are you telling them (not just "requirement updated"):

- Developer:
- QA:
- Product:
- Delivery:
- Operations / Support:
- Downstream teams:

## Before you close the conversation

- [ ] Do we know exactly what changed?
- [ ] Do we know why it changed now?
- [ ] Have we checked downstream impact?
- [ ] Have Dev and QA assessed the impact?
- [ ] Has someone explicitly decided how to handle it?
- [ ] Are Jira, acceptance criteria and tests updated?
- [ ] Does everyone affected know?
