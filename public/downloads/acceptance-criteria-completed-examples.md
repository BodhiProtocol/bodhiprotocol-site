# Acceptance Criteria — Bad-to-Better Completed Examples

Three worked rewrites, applying the Acceptance Criteria Quality Checklist to criteria that sound fine on first read and fall apart on the second.

---

## Example 1 — Insurance: Document upload

**First draft:**
> The system should properly validate uploaded claim documents.

**Run against the checklist:** Fails on Observable, Testable, No vague adjectives — "properly" is doing all the work and defining nothing.

**Rewrite:**

**AC1 — Happy path**
Given a claimant uploads a PDF under 10MB,
When the file is submitted,
Then the document is accepted and attached to the claim.

**AC2 — Negative path: wrong file type**
Given a claimant uploads a .exe file,
When the file is submitted,
Then the upload is rejected and the message "Only PDF, JPG and PNG files are accepted" is shown.

**AC3 — Boundary: file size**
Given a claimant uploads a PDF of exactly 10MB,
When the file is submitted,
Then the document is accepted (the limit itself is inclusive, not exclusive).

**AC4 — Boundary: just over the limit**
Given a claimant uploads a PDF of 10.1MB,
When the file is submitted,
Then the upload is rejected and the message "File exceeds the 10MB limit" is shown.

**Business rule vs. acceptance criterion:**
- Business rule: Claim documents must be under 10MB and in PDF, JPG or PNG format.
- Acceptance criteria: the four scenarios above, each provable independently.

---

## Example 2 — Retail: Loyalty points redemption

**First draft:**
> User should be able to redeem points normally.

**Run against the checklist:** Fails on Specific and No vague adjectives — "normally" implies there's an abnormal case nobody described.

**Rewrite:**

**AC1 — Happy path**
Given a member has 500 or more points,
When they redeem 500 points for a ₹500 voucher,
Then the voucher is issued and the member's balance decreases by exactly 500 points.

**AC2 — Negative path: insufficient balance**
Given a member has 200 points,
When they attempt to redeem 500 points,
Then the redemption is rejected and the message "You need 300 more points for this reward" is shown.

**AC3 — Boundary: exact balance**
Given a member has exactly 500 points,
When they redeem 500 points,
Then the redemption succeeds and the balance is 0 (zero balance is a valid post-condition, not an error).

**AC4 — Error behaviour: redemption service unavailable**
Given the rewards service does not respond within 5 seconds,
When a member attempts a redemption,
Then no points are deducted, and the member sees "Redemption is temporarily unavailable — please try again."

**Why the error case matters:** Without AC4, the first production incident is a member whose points vanished but never received a voucher — because nobody decided what happens when the downstream call fails partway through.

---

## Example 3 — API: Request timeout

**First draft:**
> The API call should time out appropriately.

**Run against the checklist:** Fails on Observable and No vague adjectives — "appropriately" doesn't tell development what number to code or what to show the user.

**Rewrite:**

**AC1 — Timeout threshold**
Given the downstream pricing API has not responded within 8 seconds,
When the request is still pending,
Then the request is cancelled and treated as a timeout, not left running indefinitely.

**AC2 — User-facing behaviour**
Given a request has timed out,
When the timeout occurs,
Then the user sees "We couldn't get a live price right now — please try again," not a blank screen or a generic error code.

**AC3 — Retry safety (idempotency)**
Given a timed-out request is retried,
When the retry is sent with the same idempotency key,
Then no duplicate transaction is created, even if the original request eventually completes on the server.

**Business rule vs. acceptance criterion:**
- Business rule: Pricing requests must not block the checkout flow for more than 8 seconds.
- Acceptance criteria: the three scenarios above, each testable independently by QA without needing to understand the underlying implementation.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks
