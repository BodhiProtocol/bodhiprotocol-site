# Requirement Ownership Check — Completed Example Pack

Two worked examples, using the Requirement Ownership Check template exactly as a Business Analyst would fill it in when a requirement is circulating without a clear owner.

---

# Example 1 — REQ-218: Block trades when customer risk data is unavailable

*(The requirement walked through in the Nobody Knows Who Owns the Requirement guide, filled in using the template.)*

## Requirement

- **Requirement:** REQ-218 — If customer risk information cannot be retrieved, the trade must not proceed.
- **Why does it exist?** A regulatory finding requires that trades cannot proceed without a valid risk assessment on file.

## The three roles

- **Requirement owner:** Head of Client Risk Controls — accountable for what happens when risk data is unavailable, and can approve a change to that behaviour.
- **Requirement steward:** Business Analyst — keeps the requirement clear, current and testable; does not make the fail-vs-continue call themselves.
- **Decision owner:** Head of Client Risk Controls (same person as the requirement owner in this case — that's fine; the roles can coincide, they just aren't automatically the same by default).

## The real test

- **Who approves material changes?** Head of Client Risk Controls.
- **Who makes the final call when people disagree?** Head of Client Risk Controls — confirmed only after the requirement had circulated through Risk, Operations and Compliance without anyone claiming this explicitly.

## If there's an open decision

- **Open decision:** Should the trade fail completely, go to Manual Review, or continue and be flagged afterwards?
- **Decision owner:** Head of Client Risk Controls
- **Consulted:** Operations, Compliance, Technology
- **Impact if unresolved:** QA cannot validate the exception flow, and the story blocking on this decision cannot close.

**Resolution:** The Head of Client Risk Controls decided the trade must not proceed automatically — it enters Manual Review instead. Once written down against a named accountable person rather than "Owner: Business," the decision took one conversation instead of another round of circulation.

---

# Example 2 — A retail loyalty programme's points-expiry policy

## Requirement

- **Requirement:** Should loyalty points expire after 12 months, or should the expiry window be extended for high-tier members?
- **Why does it exist?** Customer complaints about points expiring while a member was inactive during a life event (e.g. parental leave, long illness) prompted a request to "make the policy fairer."

## The three roles

- **Requirement owner:** VP of Loyalty & Retention — accountable for the loyalty programme's economics and member experience, and can approve a policy change.
- **Requirement steward:** Business Analyst on the Loyalty Platform team — keeps the requirement clear and drives it to a decision, without personally deciding the policy.
- **Decision owner:** Split across two questions — Finance owns the cost-impact sign-off (points liability on the balance sheet), VP of Loyalty & Retention owns the final policy call informed by that sign-off.

## The real test

- **Who can explain why it exists?** Customer Support, who escalated the complaints, and the BA, who traced them to a pattern.
- **Who can approve a material change?** VP of Loyalty & Retention, but only after Finance confirms the cost impact — this requirement genuinely has two decision owners for two different sub-questions, and conflating them was the first mistake in the original discussion.
- **Who accepts the business outcome?** VP of Loyalty & Retention.
- **If stakeholders disagree, who makes the final call?** VP of Loyalty & Retention, after Finance's cost analysis is on the table — not before.

## If there's an open decision

- **Open decision:** Should the expiry window extend automatically for high-tier members, or only on a documented hardship request?
- **Decision owner:** VP of Loyalty & Retention, pending Finance's cost-impact analysis.
- **Consulted:** Finance (cost), Customer Support (pattern of complaints), Legal (any terms-and-conditions implications of a policy change).
- **Impact if unresolved:** Customer Support continues fielding complaints with no consistent answer, and each case is handled as a one-off exception instead of a documented policy.

**Resolution:** Finance confirmed extending expiry for high-tier members only would cost under 0.3% of loyalty programme revenue — an acceptable trade-off. VP of Loyalty & Retention approved a hardship-request path for all other tiers instead of a blanket extension, balancing fairness against cost. Naming two separate decision owners for two separate sub-questions — instead of one vague "Owner: Loyalty Team" — is what made the decision resolvable in one meeting.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks
