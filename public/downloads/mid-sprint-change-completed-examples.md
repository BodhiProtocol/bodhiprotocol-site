# Mid-Sprint Requirement Change — Completed Example Pack

Two worked examples, using the Mid-Sprint Requirement Change Impact Note exactly as a Business Analyst would complete it mid-sprint. Names, systems and figures are illustrative, not any real company's confidential information.

---

# Example 1 — India: E-commerce order verification threshold

## Change summary

Lower the mandatory customer-verification threshold from orders above ₹50,000 to orders above ₹25,000, and require verification for international customers regardless of order value.

## 1. CHANGE — What exactly changed?

- Old behaviour: Orders above ₹50,000 require additional customer verification before dispatch.
- New behaviour: Orders above ₹25,000 require verification. International customers require verification on every order, regardless of amount.
- Thresholds / boundaries: Confirmed with the business — "above ₹25,000" means strictly greater than ₹25,000; an order of exactly ₹25,000 does not trigger verification.
- Exceptions or edge cases: "International" is defined as billing country ≠ India, not shipping country and not nationality — confirmed with Compliance, since a domestic card billed from an Indian address but shipped internationally should not auto-trigger.
- Open questions about the wording itself: None remaining — both were resolved in the clarification call above.

## 2. WHY — Why now?

- Reason for the change: Compliance flagged a rise in disputed high-value orders just under the old ₹50,000 line, and a below-threshold pattern for international card fraud.
- Is this urgent, or could it wait? Compliance says the international-verification rule is mandatory before the next release; the ₹25,000 threshold change is a preference, not a hard deadline, but the business wants both together.
- Who is asking for it: Compliance (mandatory piece) and the Fraud & Risk product owner (threshold preference).

## 3. BLAST RADIUS — What else moves?

| Area | Touched? | What changes | Owner |
| --- | --- | --- | --- |
| Business rules | Yes | Threshold constant changes; new international rule added | BA / Fraud & Risk PO |
| UI | Yes | Verification prompt copy needs an "international order" variant | Frontend team |
| API | Yes | Order service must pass billing country to the Verification service | Order Platform team |
| Data | Yes | Billing country must be present and reliable at order-creation time — confirmed it already is | Data team |
| Rules / configuration | Yes | Threshold was hardcoded; changing it to a configurable value while we're in the code anyway | Backend team |
| Downstream systems | Yes | Fraud dashboard and CRM both display "verification required" — both consume the same flag, no changes needed on their side | Fraud, CRM teams |
| Testing | Yes | Boundary case (exactly ₹25,000) and international-domestic-card case are new scenarios | QA |
| Analytics and documentation | Yes | Support macro and internal ops guide both reference "₹50,000" by name | Support Ops |

## 4. EFFORT — What's already built?

- What Development has already completed: The original ₹50,000 check was already built and merged; it lives in one place (`VerificationRuleService`), not scattered across services.
- What must be redone or reworked: Threshold value changes (five-minute config change); international check is new logic, roughly half a day including the billing-country lookup.
- What QA has already prepared or executed: Six scenarios were already written and two already executed against the ₹50,000 rule — both need updating for ₹25,000, plus two new international scenarios.
- What downstream teams depend on the original behaviour: None found — Fraud and CRM only consume the resulting flag, not the threshold value itself.

## 5. OPTIONS — How should we handle it?

- [x] Absorb — small, understood, safely fits the sprint
- [ ] Split
- [ ] Swap
- [ ] Defer
- [ ] Stop & Rework

Recommendation and reasoning: The threshold is a configurable five-minute change, and the international rule is new-but-contained logic in one service with no downstream rework. Total added effort is under a day, well inside remaining sprint capacity — absorb both together since Compliance wants them shipped as one release anyway.

## 6. DECISION — Who accepts the consequence?

- Who requested the change: Compliance (international rule), Fraud & Risk PO (threshold).
- Who assessed the impact: BA, with Development and QA leads.
- Who accepts the delivery consequence: Delivery Lead, on behalf of the sprint commitment.
- Decision: Absorb both changes into the current sprint; two already-executed QA scenarios will be re-run.
- Date: Day 3 of the sprint.

## 7. TRACE — Update the source of truth

- [x] Requirement updated (old and new behaviour unambiguous, including the >₹25,000 boundary and the billing-country definition of "international")
- [x] Acceptance criteria updated (boundary case, international case)
- [x] Test cases updated (two revised, two new)
- [x] Dependencies linked (Order service → Verification service API change referenced on both tickets)
- [x] Design / documentation updated (support macro, internal ops guide)
- [x] Decision record captured (this note)

## 8. COMMUNICATE — Tell everyone whose work changed

- Developer: Threshold is now configurable at ₹25,000; new international check added to `VerificationRuleService` — API now requires billing country on the request.
- QA: Two existing scenarios updated to ₹25,000; add boundary case at exactly ₹25,000 and an international-domestic-card case.
- Product: Both changes ship together this sprint, absorbed without displacing other scope.
- Delivery: No change to sprint commitment; two QA scenarios re-run, not re-written from scratch.
- Operations / Support: Support macro and ops guide updated — the "₹50,000" reference is gone.
- Downstream teams: Fraud and CRM notified for awareness only — no change required on their side, since they only consume the resulting flag.

---

# Example 2 — Global: SaaS free-trial access window

## Change summary

Shorten the free-trial access window from 14 days to 7 days, and grant enterprise-tagged leads 30 days regardless of the standard trial length.

## 1. CHANGE — What exactly changed?

- Old behaviour: Every new signup gets 14 days of full-feature access before being prompted to convert.
- New behaviour: Standard signups get 7 days. Leads tagged "Enterprise" in the CRM at signup get 30 days, regardless of the standard window.
- Thresholds / boundaries: Confirmed the day count is inclusive — a signup on Day 0 loses access at the start of Day 8 for standard trials, Day 31 for enterprise.
- Exceptions or edge cases: A lead's CRM tag can change mid-trial (e.g. sales manually tags an account as Enterprise after signup) — confirmed with Sales Ops that the extension applies retroactively from the moment the tag is set, not from original signup.
- Open questions about the wording itself: None remaining.

## 2. WHY — Why now?

- Reason for the change: Growth team found trial-to-paid conversion peaks in the first week regardless of trial length, so a shorter default window reduces free-tier infrastructure cost without hurting conversion; enterprise leads need the longer window to clear procurement.
- Is this urgent, or could it wait? Not regulatory — a business preference. Growth wants it in this release to line up with a pricing-page update already scheduled.
- Who is asking for it: Growth PO, with the Enterprise carve-out requested by Sales.

## 3. BLAST RADIUS — What else moves?

| Area | Touched? | What changes | Owner |
| --- | --- | --- | --- |
| Business rules | Yes | Trial-length constant changes; new CRM-tag-based override added | BA / Growth PO |
| UI | Yes | In-app trial countdown banner and expiry email copy both hardcode "14 days" | Frontend, Lifecycle Marketing |
| API | Yes | Billing service must read the CRM Enterprise tag when calculating trial expiry | Billing team |
| Data | Yes | CRM tag must sync to the billing system in near-real-time, not the current nightly sync | Data/Integrations team |
| Rules / configuration | Yes | Trial length was already a config value — good, no hardcoding to fix | Backend team |
| Downstream systems | Yes | Lifecycle email system and in-app messaging both trigger off the expiry date | Lifecycle Marketing, Platform |
| Testing | Yes | Retroactive-tag-change scenario and standard-vs-enterprise boundary are new | QA |
| Analytics and documentation | Yes | Growth dashboard's "trial conversion window" metric is defined as 14 days | Analytics team |

## 4. EFFORT — What's already built?

- What Development has already completed: Trial length is already a config value, so the 7-day change itself is trivial; the Enterprise override and the CRM near-real-time sync are new work.
- What must be redone or reworked: The nightly CRM sync must become event-driven for this one field — the larger piece of the change.
- What QA has already prepared or executed: Three scenarios written for the 14-day flow, none yet executed.
- What downstream teams depend on the original behaviour: Lifecycle Marketing's expiry email is scheduled off a fixed 14-day offset and needs to be reworked to read the dynamic expiry date instead.

## 5. OPTIONS — How should we handle it?

- [ ] Absorb
- [x] Split — keep the 7-day standard change in this sprint, move the Enterprise CRM-sync piece to its own story
- [ ] Swap
- [ ] Defer
- [ ] Stop & Rework

Recommendation and reasoning: The 7-day config change is trivial and safe to ship now. The Enterprise override depends on a near-real-time CRM sync that doesn't exist yet — building it properly (not a rushed workaround) needs its own story and its own QA pass, so it shouldn't share a deadline with the simple part.

## 6. DECISION — Who accepts the consequence?

- Who requested the change: Growth PO (7-day window), Sales (Enterprise carve-out).
- Who assessed the impact: BA, with Billing and Data/Integrations leads.
- Who accepts the delivery consequence: Growth PO accepted the split; Sales agreed the Enterprise carve-out can land next sprint since no enterprise trials are currently active.
- Decision: Ship the 7-day standard trial this sprint; create a new story for the Enterprise override, targeted for next sprint.
- Date: Day 4 of the sprint.

## 7. TRACE — Update the source of truth

- [x] Requirement updated (7-day change unambiguous; Enterprise override moved to its own requirement)
- [x] Acceptance criteria updated (7-day boundary case added; Enterprise scenarios moved to the new story)
- [x] Test cases updated (three revised to 7 days; Enterprise scenarios parked with the new story)
- [x] Dependencies linked (new story references the CRM sync dependency explicitly)
- [x] Design / documentation updated (countdown banner and expiry email copy updated to 7 days)
- [x] Decision record captured (this note)

## 8. COMMUNICATE — Tell everyone whose work changed

- Developer: Ship the 7-day config change now; Enterprise override and CRM sync move to a new story — don't start that work this sprint.
- QA: Update the three existing scenarios to 7 days; Enterprise scenarios move with the new story, not needed this sprint.
- Product: 7-day trial ships on schedule; Enterprise carve-out slips one sprint, with Sales's agreement.
- Delivery: Sprint commitment reduced by the Enterprise piece; capacity freed up, not overcommitted.
- Operations / Support: Lifecycle Marketing needs to update the expiry email before this ships, not after.
- Downstream teams: Analytics team notified that the "14-day conversion window" metric definition will need updating once this ships.
