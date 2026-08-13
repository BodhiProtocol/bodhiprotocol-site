# Impact Analysis — Completed Example Pack

Two worked examples, using the Impact Analysis Template exactly as a Business Analyst would complete it for a real change. Names, systems and figures are illustrative, not any real company's confidential information.

---

# Example 1 — India: Instant refund for an order cancelled before dispatch

## Change summary

If a customer cancels an order before it is dispatched, refund the payment instantly instead of waiting for the standard refund cycle.

## Business reason

Customers who cancel before dispatch already feel they've done the "right" thing, and the current 5–7 day refund wait generates a large share of support contacts and repeat-purchase drop-off. An instant refund removes the wait for the one case where the platform has taken no fulfilment cost yet.

## Current behaviour

Cancellation → a refund request is created in the Refund queue → the queue is processed in a nightly batch → the payment provider initiates the refund → the customer sees the money in 5–7 business days depending on their bank.

## Expected behaviour

If the order is cancelled **before the warehouse marks it dispatched**, the refund is initiated within seconds of cancellation instead of waiting for the nightly batch. Orders cancelled after dispatch continue to use the existing refund flow.

## Scope

- In scope: Prepaid orders cancelled by the customer before the "Dispatched" status is set; instant initiation of the refund to the original payment method.
- Out of scope: Cash-on-delivery orders (nothing was paid yet); orders cancelled after dispatch or during transit; return-driven refunds after delivery; refunds to store credit or alternate accounts.

## 1. Business process impact

- Current process: Cancel → Refund request queued → Nightly batch → Provider initiates refund → Customer waits.
- New process: Cancel → Eligibility check (dispatch status, payment status, fraud flag) → Refund triggered in real time → Customer notified immediately.
- Steps added, changed or removed: New real-time eligibility check added before refund initiation; nightly batch step removed for this specific path; a new "Refund Initiated Instantly" customer notification is added.

## 2. User and team impact

- Primary users: Customers who cancel before dispatch — now see a near-instant refund status instead of "Refund Pending."
- Secondary users: Customer support (fewer "where is my refund" tickets for this case, but new questions about instant-refund edge cases), Warehouse Ops (their dispatch-status update becomes a real-time trigger, not just an internal log), Fraud/Risk (needs visibility into a new high-frequency instant-money-out path).
- Teams affected: Customer Support, Finance/Refund Operations, Fraud, Warehouse Operations, Seller Operations (marketplace sellers see faster settlement adjustments).
- Workflow, training or communication changes: Support macros need a new explanation for "instant refund" cases; Finance needs a short brief before go-live since a reconciliation state disappears from their daily view; a customer-facing FAQ update is needed.

## 3. System and integration impact

| System / integration | Impact | Change required? | Owner |
| --- | --- | --- | --- |
| Order Management System | Must expose dispatch status in real time, not batch | Yes | Order Platform team |
| Refund Service | New real-time trigger path in addition to the batch path | Yes | Payments team |
| Payment Gateway | Receives refund calls in real time instead of in a nightly batch window; rate limits now matter | Yes | Payments team |
| Fraud/Risk Engine | New synchronous check must complete before refund is triggered | Yes | Risk team |
| Finance Reconciliation | "Refund Processing" intermediate state is skipped for this path | Yes | Finance Systems team |
| Customer Notification Service | New "Refund initiated instantly" template and trigger | Yes | Platform Notifications team |
| Seller Settlement | Seller ledger adjustment now happens sooner, not at nightly close | Yes | Marketplace Finance team |

- Request or response changes: Refund Service adds a `refundMode: instant | standard` field, and Order Management must publish a dispatch-status event instead of only a nightly extract.
- Error handling: If the Fraud check fails or times out, the order falls back to the standard (queued) refund path — it must never block the refund entirely.
- Retry behaviour: A refund call that times out must be retried at most twice with idempotency keys, so the customer is never refunded twice for one cancellation.
- Existing consumers affected: Any internal dashboard or job that assumed "refunds only run in the nightly batch" needs to be identified and updated.

## 4. Data impact

| Data element | Current | New | Source | Consumer |
| --- | --- | --- | --- | --- |
| Dispatch status | Updated in OMS, read by nightly batch only | Must be available as a real-time event | Warehouse system | Refund Service, Refund eligibility check |
| Refund mode | Does not exist | New field: instant / standard | Refund Service | Finance reconciliation, Support tooling |
| Refund initiation timestamp | Recorded at batch run time | Recorded at the moment of trigger | Refund Service | Finance, Customer notification |
| Fraud check result | Not applicable to refunds today | Pass / fail / timeout, with reason code | Fraud engine | Refund Service, Risk reporting |
| Idempotency key | Not applicable | Generated per cancellation event | Refund Service | Payment Gateway |

- Data ownership: Refund Service owns `refundMode` and the initiation timestamp; Warehouse system remains the source of truth for dispatch status.
- Validation: Refund must not trigger if dispatch status is missing, stale (older than an agreed freshness window) or ambiguous — those cases fall back to standard refund, not to "no refund."
- Missing or incorrect data behaviour: If dispatch status cannot be confirmed in real time, treat the order as **not eligible for instant refund** and route it to the standard path rather than guessing.

## 5. Rules, controls and security

- Existing rule or control: Refunds today are reviewed in the nightly batch, which doubles as an informal fraud checkpoint.
- New rule or control: An automated real-time fraud/risk check replaces that informal review for the instant path; refund value above a configured threshold (e.g. high-value orders) always falls back to the standard, human-reviewed path regardless of dispatch status.
- Approval impact: No manual approval in the instant path for orders under the threshold; above the threshold, existing manual approval still applies.
- Permissions or privacy impact: None new — same data already visible to Support and Finance, just surfaced sooner.
- Audit or regulatory impact: Every instant refund must still produce the same audit trail as a standard refund (initiator, amount, timestamp, order reference); Finance/Compliance sign-off is required before go-live given real-time money movement.

## 6. Downstream, reporting and reconciliation

- Downstream system or team: Finance reconciliation, Seller settlement, Support reporting, Fraud monitoring dashboards.
- Reports or dashboards: The daily "Refunds Processed" report currently assumes one batch run per day — it needs to handle refunds arriving continuously throughout the day.
- Reconciliation or SLA changes: The "Refund Processing" intermediate state disappears for instant refunds, so any SLA metric measuring time-in-that-state needs to be redefined for this path instead of silently showing zero.
- Action required: Finance updates its reconciliation job to treat instant refunds as a distinct category rather than lumping them into the batch total; Seller settlement confirms sellers are not double-charged when a refund and a settlement run land the same day.

## 7. Failure and recovery

- Source unavailable: If the Payment Gateway is unreachable, queue the refund for retry and fall back to standard processing rather than failing silently.
- Timeout: A gateway call that times out must not be assumed to have failed — check the actual status before retrying, to avoid a duplicate refund.
- Partial success: If the refund is initiated but the customer notification fails, the refund still stands — notification failure is retried separately and never blocks or reverses the refund.
- Duplicate request: The idempotency key prevents the same cancellation event from triggering two refunds if the trigger fires twice (e.g. a retried event).
- Recovery or manual handling: Any refund that falls through automated retries lands in a manual Finance queue with full context, not a generic error log.

## 8. Historical data and migration

- Existing in-flight items: Orders already cancelled and sitting in the batch queue at go-live continue through the existing batch path — they are not force-migrated into the new instant path mid-flight.
- Historical-data update: No backfill of past refunds is needed; `refundMode` simply starts being populated from go-live onward, and is treated as "standard" (implicit) for anything before that date.
- Backfill or migration: None required for existing records; only new cancellations use the new path.
- Compatibility considerations: Reports and dashboards must handle a mix of records with and without `refundMode` populated during the transition period.

## 9. Performance and operations

- Expected volume: Cancellation-before-dispatch volume spikes during sale events — the instant path must handle peak-day volume, not just average daily volume.
- Response-time expectation: Refund initiation should complete within a few seconds of cancellation under normal load.
- Operational limits: Payment Gateway has a per-minute rate limit for refund calls — a large batch of near-simultaneous cancellations (e.g. right after a price-drop cancellation wave) could hit that limit and needs a queue/backoff, not a hard failure.
- Monitoring and alerts: Alert on rising fraud-check timeout rate, rising fallback-to-standard rate, and any spike in failed refund initiations.
- Support owner: Payments team owns production support for the instant path in the first weeks post-launch, with Finance as secondary for reconciliation questions.

## 10. Testing, release and rollback

- New scenarios: Cancel immediately after order placement; cancel seconds before dispatch status flips; dispatch status update arrives late/out of order; fraud check times out; refund above the manual-review threshold; gateway rate limit hit; duplicate cancellation event.
- Regression areas: Standard (batch) refund path must continue to work unchanged for orders that fall back to it.
- Integration / security / performance testing: Integration testing with the Payment Gateway sandbox for retries and idempotency; load testing for a simulated sale-day cancellation spike; security review of the new real-time fraud-check call.
- UAT: Finance and Support both sign off using real (sandboxed) cancellation scenarios, not just the happy path.
- Release approach: Roll out to a small percentage of eligible orders first, monitor the fallback rate and refund-failure rate, then expand.
- Rollback plan: A feature flag disables the instant path and routes all cancellations back to the standard batch flow with no data loss, since the refund request is still logged either way.

## Dependencies

- Real-time dispatch-status event from the Warehouse/OMS team must ship before this can go live.
- Fraud engine must support a synchronous, low-latency check (its current API is batch-oriented).

## Assumptions

- The payment gateway can accept individual real-time refund calls at expected peak volume without a contract change.
- "Before dispatch" is defined by the same status the warehouse already uses operationally — no new status is being invented.

## Open questions

- Question: Should instant refunds be capped by daily value per customer to limit fraud exposure? — Owner: Risk team — Due date: before UAT sign-off.
- Question: Do marketplace sellers need to be notified in real time, or is the existing daily settlement summary sufficient? — Owner: Marketplace Finance — Due date: before release approach is finalised.

## Decisions

- Decision: Orders above the high-value threshold always use the standard, manually reviewed refund path, even before dispatch. — Decision owner: Risk & Finance — Reason: Real-time money movement without human review is an unacceptable fraud exposure above that value. — Date: sign-off meeting, prior to release.
- Decision: Cash-on-delivery cancellations are explicitly out of scope. — Decision owner: Product — Reason: No payment has been captured yet, so there is nothing to refund instantly. — Date: scoping meeting.

---

# Example 2 — Global: Automatic access provisioning for new employees in Mumbai, London and New York

## Change summary

When HR creates a new employee record with a joining date, automatically provision that employee's baseline system access on their joining date, instead of requiring a manual IT request after they join.

## Business reason

New joiners currently wait one to three days after their start date for basic system access, which wastes onboarding time and generates a predictable wave of "no access yet" tickets every Monday. Automating baseline access removes that delay for the majority of joiners who need only standard access.

## Current behaviour

HR creates the employee record → the employee's manager raises an access request on or after the joining date → IT reviews and approves it → access is created, typically one to three days later.

## Expected behaviour

Once HR confirms the employee record (role, department, location, employment type) and the joining date arrives, baseline access is created automatically for that employee on their first day, with no manual request needed for standard access. Privileged or non-standard access still requires a manual request and approval.

## Scope

- In scope: Baseline/standard access (email, HR system self-service, department-standard applications) for full-time employees joining in Mumbai, London and New York.
- Out of scope: Privileged or elevated access of any kind; contractor and vendor access (different process, different risk profile); offices/locations not yet covered by this rollout; access changes for existing employees who transfer roles.

## 1. Business process impact

- Current process: HR creates employee → Manager requests access → IT approves → Access created (reactive, days after joining).
- New process: HR creates employee with joining date and role → Role-to-access rules evaluated → Access created automatically at the start of the joining date → Manager and employee notified (proactive, on day one).
- Steps added, changed or removed: A new automated role-evaluation step replaces the manual "manager requests access" step for standard access only; IT approval step is removed for standard access but retained for anything privileged.

## 2. User and team impact

- Primary users: New employees — access is ready on day one instead of being requested after arrival.
- Secondary users: Managers (no longer file a standard access request, but must ensure the HR record — especially role and location — is correct before joining day), IT Support (fewer manual provisioning tickets, but new exception-handling work when automation can't confidently determine access), Security (needs visibility into what automation is granting and why).
- Teams affected: HR, IT Provisioning, Security/IAM, Application Owners (whose apps are now granted automatically instead of on individual request), Facilities (badge/building access in some offices follows the same joining-date trigger).
- Workflow, training or communication changes: HR must be trained that the joining date and role fields now drive real access decisions, not just payroll; managers need a short brief that "no request needed" replaces the old process for standard access; a rollback communication path is needed for the (expected) early cases where automation gets it wrong.

## 3. System and integration impact

| System / integration | Impact | Change required? | Owner |
| --- | --- | --- | --- |
| HR System | Must publish a reliable "employee confirmed, joining date set" event | Yes | HRIS team |
| Identity & Access Management (IAM) | New rules engine mapping role + department + location to a standard access bundle | Yes | Security/IAM team |
| Application Owners (email, collaboration, department apps) | Must accept automated provisioning calls instead of only manual admin actions | Yes (per app) | Individual app owners |
| Manager Self-Service Portal | Standard-access request option removed/relabelled; privileged-access request remains | Yes | IT Provisioning team |
| Badge/Facilities System (per office) | Optionally triggered by the same joining-date event for building access | Optional, phased | Facilities/Security |

- Request or response changes: HR System must include role, department, location and employment type on the event — today some of these are optional fields.
- Error handling: If the HR record is incomplete (e.g. missing role), automation must not guess — it falls back to a manual IT queue with a clear reason, not a silent skip.
- Retry behaviour: If an application's provisioning API is temporarily unavailable, retry with backoff; if it keeps failing, alert IT Provisioning rather than leaving the employee without access indefinitely.
- Existing consumers affected: Any report that counted "access requests" as a proxy for new joiners will undercount once standard access stops generating a request.

## 4. Data impact

| Data element | Current | New | Source | Consumer |
| --- | --- | --- | --- | --- |
| Employee ID | Exists | Unchanged — used as the provisioning key | HR System | IAM, all target applications |
| Joining date | Exists, used for payroll | Now also drives the access-creation trigger | HR System | IAM |
| Job role | Exists, often entered loosely | Must map cleanly to a defined access bundle | HR System | IAM rules engine |
| Department | Exists | Used to select department-standard applications | HR System | IAM rules engine |
| Location (Mumbai / London / New York) | Exists | Applies location-specific rules (e.g. data residency, badge system) | HR System | IAM rules engine |
| Employment status | Exists | Must be "Confirmed," not "Draft" or "Offer Pending," before access is created | HR System | IAM |
| Manager | Exists | Used for the day-one notification, not for approval anymore (standard access only) | HR System | Notification service |

- Data ownership: HR System remains the source of truth for role, department, location and joining date; IAM owns the mapping rules from those fields to an access bundle.
- Validation: Role and location must match a known value in the mapping table — an unrecognised combination routes to manual handling instead of a best guess.
- Missing or incorrect data behaviour: If joining date changes after access has already been created, access timing must follow the updated date (delay or accelerate accordingly), and if the employee record is later marked "did not join," access must be revoked automatically, not left active.

## 5. Rules, controls and security

- Existing rule or control: Manual IT approval was the control point for every access grant, standard or privileged.
- New rule or control: Standard access follows the employee's approved role automatically; privileged access always requires separate, explicit approval; contractors receive time-bound access only, never the standard full-time bundle; access cannot begin before the confirmed joining date; access is automatically revoked if the employee does not join or their status changes to cancelled.
- Approval impact: Manual approval is removed for standard access (replaced by the rules engine + audit logging) and unchanged for privileged access.
- Permissions or privacy impact: A contractor must never receive privileged access because of a mistyped job title — the rules engine treats employment type as a hard gate, not a soft signal.
- Audit or regulatory impact: Every automated grant must log which rule fired and why, since Security and Audit need to reconstruct "why did this person get this access" without a human approval record to point to; London and New York locations may carry additional regulatory constraints (e.g. financial-services entitlement rules) that must be encoded into the rules engine, not left to individual judgement.

## 6. Downstream, reporting and reconciliation

- Downstream system or team: Security/IAM access reviews, Facilities (badge provisioning), IT asset management, Compliance reporting.
- Reports or dashboards: The quarterly access-review report currently assumes every grant has a linked approval ticket — it needs a new "automated, rule-based" category alongside "manually approved."
- Reconciliation or SLA changes: The "time to provision access" SLA effectively becomes same-day for standard access — dashboards tracking that SLA need their baseline redefined, or the improvement will look like a data anomaly rather than a real gain.
- Action required: Compliance confirms the new automated-grant audit trail satisfies existing access-review requirements before go-live in each location.

## 7. Failure and recovery

- Source unavailable: If the IAM rules engine is unavailable when a joining-date trigger fires, queue the request and process it as soon as the engine recovers — do not silently drop it.
- Timeout: If an individual application's provisioning call times out, that application is retried independently; a slow app must not block access to the others.
- Partial success: If 4 of 5 standard applications provision successfully and one fails, the employee still gets partial day-one access, and IT Provisioning is alerted to complete the fifth manually.
- Duplicate request: If the joining-date event fires twice (e.g. HR corrects a typo and re-saves the record), provisioning must be idempotent — it should not attempt to create access that already exists.
- Recovery or manual handling: Any employee record missing a required field for the rules engine falls into a manual IT Provisioning queue with the specific missing field flagged.

## 8. Historical data and migration

- Existing in-flight items: Employees who joined shortly before go-live and are still working through the manual process finish through the old process; they are not retroactively run through automation.
- Historical-data update: No backfill of access for existing employees — the rules engine only acts on new joining-date events from go-live onward.
- Backfill or migration: Not required, since this changes a process trigger, not historical records.
- Compatibility considerations: During rollout, Mumbai, London and New York go live in phases — the rules engine must only auto-provision for locations that have been explicitly enabled, and treat every other location as manual by default.

## 9. Performance and operations

- Expected volume: Volume is uneven — a normal week is a handful of joiners per location, but a post-acquisition or graduate-intake week could bring dozens on the same date.
- Response-time expectation: Access should be available at the start of the employee's first working day in their local time zone, not "sometime that day" server time.
- Operational limits: A large batch of same-day joiners must not overwhelm any single application's provisioning API — bulk joining-day events need to be throttled, not fired all at once.
- Monitoring and alerts: Alert on any employee whose confirmed joining date has arrived but who has no access created within an agreed window; alert on a rising manual-fallback rate, which usually signals a data-quality problem in HR records.
- Support owner: IT Provisioning owns first-line support for provisioning failures; Security/IAM owns the rules engine itself.

## 10. Testing, release and rollback

- New scenarios: Employee joins today; employee joins next week; joining date is moved earlier or later after the record is created; employee record is cancelled before joining; job role or manager field is missing; department changes shortly before joining; provisioning partially fails; privileged access is requested alongside standard access; the same joining-date event is received twice; a contractor is mistakenly tagged with a full-time role.
- Regression areas: The existing manual request path for privileged access must continue to work unchanged.
- Integration / security / performance testing: Security testing specifically targeting the "contractor mistagged as full-time" and "privileged access via automation" failure modes; load testing for a simulated large joining-day batch (e.g. graduate intake).
- UAT: HR, a sample of hiring managers, and Security/IAM all sign off using real (sandboxed) joiner records across all three locations before go-live.
- Release approach: Phased by location — Mumbai first, then London, then New York — each with a short monitoring window before expanding.
- Rollback plan: A location-level kill switch reverts that location to the manual request process immediately; any access already granted automatically is reviewed, not silently revoked, to avoid disrupting employees already working.

## Dependencies

- HR System must be able to mark an employee record "Confirmed" (not just "Draft") before automation can safely trust it.
- Each application owner must expose a provisioning API automation can call — a handful of legacy department tools may need a manual bridge in the interim.

## Assumptions

- One employee has one active role/location combination at a time, and the HR System is the single source of truth for it.
- "Standard access" is the same for every employee in a given role and department, with no undocumented local exceptions.

## Open questions

- Question: Should badge/building access be included in the automated trigger, or remain a separate Facilities process for now? — Owner: Facilities & Security — Due date: before the London phase begins.
- Question: What is the maximum acceptable delay between "joining date arrives" and "access exists" before it counts as an incident? — Owner: IT Provisioning — Due date: before UAT sign-off.

## Decisions

- Decision: Privileged access is never included in automated provisioning, regardless of role. — Decision owner: Security/IAM — Reason: Privileged entitlements require a human approval step as a deliberate control, not an efficiency trade-off. — Date: design review, prior to build.
- Decision: Contractors are explicitly excluded from the standard-access rules engine and always follow the existing time-bound manual process. — Decision owner: Security/IAM & Legal — Reason: Contractor access carries different contractual and compliance obligations that the rules engine is not designed to encode. — Date: scoping meeting.

---

Completed Example Pack by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks
