# BA Jira Story Template — Completed Example Pack

Two worked examples, using the BA Jira Story Template exactly as a Business Analyst would fill it in during backlog refinement. Names, systems and figures are illustrative, not any real company's confidential information.

---

# Example 1 — Insurance: Auto-flagging high-value claims for manual review

## TITLE

Auto-flag claims above ₹5,00,000 for manual underwriter review before payout

## CONTEXT

Today, every motor insurance claim — regardless of size — follows the same automated approval path once documents are verified. A recent audit found two claims above ₹5,00,000 that were auto-approved without a human ever reviewing the supporting documents.

## BUSINESS PROBLEM

High-value claims carry more fraud and error risk, but the system currently treats a ₹8,000 windshield claim and a ₹6,00,000 total-loss claim the same way.

## USER STORY

As a claims underwriter,
I want claims above a configurable value threshold to route to manual review instead of auto-approving,
So that high-value claims get human judgment before payout.

## BUSINESS RULES

- BR-01: The review threshold is ₹5,00,000, configurable by product line without a code change.
- BR-02: A claim that crosses the threshold after a partial payout (e.g. supplement request) also routes to manual review.
- BR-03: Claims already flagged for fraud investigation bypass this rule — they follow the existing fraud workflow instead.

## ACCEPTANCE CRITERIA

### AC1

Given a motor claim with an assessed value of ₹5,00,000 or more
When the claim reaches the auto-approval step
Then it routes to the Manual Review queue instead of auto-approving, and the underwriter sees the reason "Value threshold exceeded"

### AC2

Given a motor claim with an assessed value below ₹5,00,000
When the claim reaches the auto-approval step
Then it continues through auto-approval as it does today, with no behaviour change

## DATA REQUIREMENTS

- **Inputs:** Assessed claim value, product line, current fraud-flag status
- **Outputs:** Routing decision (auto-approve / manual review) and the reason code shown to the underwriter
- **Source systems:** Claims Assessment Engine (assessed value), Policy Admin (product line)
- **Key fields:** `assessed_value`, `product_line`, `fraud_flag`, `routing_decision`, `routing_reason`

## DEPENDENCIES

- **Linked issues:** Depends on CLM-2291 (configurable threshold table), blocks CLM-2305 (underwriter queue UI)
- **Systems:** Claims Assessment Engine, Manual Review Queue service
- **Teams:** Claims Platform (routing logic), Underwriting Ops (queue triage capacity)

## OUT OF SCOPE

- Changing the review threshold for non-motor product lines (health, home) — separate ticket
- Any change to the fraud-investigation workflow itself

## OPEN QUESTIONS

- Does a claim that drops back below the threshold after re-assessment un-flag automatically, or stay in manual review? — Pending Underwriting Ops decision.

## DECISIONS

- Decision: Threshold applies to assessed value, not claimed value, since claimed value is what the customer requests before assessment.
- Reason: Assessed value reflects what the insurer would actually pay, which is the real risk exposure.
- Date: 12 Aug 2026
- Decision owner: Head of Claims Underwriting
- Related requirement: CLM-2287

---

## Definition of Ready

- [x] Business problem understood
- [x] Acceptance criteria written
- [x] Business rules identified
- [x] Dependencies linked
- [x] Data requirements understood
- [ ] Designs available if required — not applicable, no UI change in this ticket
- [x] Open questions resolved
- [x] Test approach understood

---

# Example 2 — Retail: Loyalty points expiry reminder

## TITLE

Send a reminder before loyalty points expire instead of letting them lapse silently

## CONTEXT

Loyalty points expire 12 months after they're earned. Customer support tickets show many customers only discover their points expired after trying to redeem them — there's no reminder before expiry today.

## BUSINESS PROBLEM

Silent expiry damages trust in the loyalty programme and drives avoidable support contacts.

## USER STORY

As a loyalty programme member,
I want a reminder before my points expire,
So that I have a real chance to use them before they lapse.

## BUSINESS RULES

- BR-01: Reminder sends 14 days before the earliest-expiring points batch in a member's balance.
- BR-02: If a member has multiple batches expiring on different dates, only the nearest expiry triggers a reminder — no duplicate reminders for the same window.
- BR-03: Members who redeemed enough points to clear the expiring batch before the 14-day mark do not receive a reminder for that batch.

## ACCEPTANCE CRITERIA

### AC1

Given a member has a points batch expiring in 14 days
When the daily expiry-check job runs
Then the member receives one email and one app notification referencing the expiring amount and the expiry date

### AC2

Given a member redeems enough points to fully clear an expiring batch before the reminder would send
When the daily expiry-check job runs
Then no reminder is sent for that batch

## DATA REQUIREMENTS

- **Inputs:** Points balance by batch with individual expiry dates, member contact preferences (email/app opt-in)
- **Outputs:** Reminder event with member ID, expiring amount, expiry date, channel
- **Source systems:** Loyalty Ledger (batch-level balances), Notification Service (delivery)
- **Key fields:** `member_id`, `batch_id`, `points_amount`, `expiry_date`, `notification_channel`

## DEPENDENCIES

- **Linked issues:** Depends on LOY-1187 (batch-level expiry tracking in the ledger, already live)
- **Systems:** Loyalty Ledger, Notification Service, Email/Push provider
- **Teams:** Loyalty Platform, CRM/Lifecycle Marketing (copy and channel rules)

## OUT OF SCOPE

- A second reminder closer to expiry (e.g. 3 days before) — candidate for a follow-up ticket if the 14-day reminder alone doesn't move redemption rates
- Any change to how or when points are earned or the 12-month expiry rule itself

## OPEN QUESTIONS

- Should members who've opted out of marketing emails still receive this as a transactional notification? — Pending Legal/CRM confirmation on transactional vs. marketing classification.

## DECISIONS

- Decision: Reminder is per expiring batch, not per member per day, even if it means a member could theoretically get more than one reminder in a year.
- Reason: A member-level daily digest would need a separate ticket and delays a fix for the immediate silent-expiry problem.
- Date: 09 Aug 2026
- Decision owner: Loyalty Product Owner
- Related requirement: LOY-1198

---

## Definition of Ready

- [x] Business problem understood
- [x] Acceptance criteria written
- [x] Business rules identified
- [x] Dependencies linked
- [x] Data requirements understood
- [x] Designs available if required — email/app notification copy and layout attached in Figma
- [ ] Open questions resolved — transactional vs. marketing classification pending Legal
- [x] Test approach understood

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks
