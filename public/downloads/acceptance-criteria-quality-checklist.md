# Acceptance Criteria Quality Checklist

Run every acceptance criterion against this list before calling a story ready. See the [Acceptance Criteria Playbook](https://bodhiprotocol.com/ba-playbooks/acceptance-criteria-playbook) for the rewrite patterns this checklist is built from.

## The test

Could two engineers, working alone, build the same thing from this criterion? If the answer depends on both of them guessing the same way, it isn't finished yet.

## Checklist

- [ ] Observable — describes something that can actually be seen or measured, not a feeling
- [ ] Testable — QA can call a clear pass or fail
- [ ] Specific — no word in it could mean two different things to two different readers
- [ ] Business rule understood — the rule behind the criterion is written down separately, not buried inside it
- [ ] Happy path covered — the normal, successful case is described
- [ ] Negative path covered — at least one failure case is described, not just success
- [ ] Boundary conditions considered — the limit, one above it, one below it, and zero/empty/none
- [ ] Error behaviour defined — not just that an error happens, but what happens: rejected, logged, message shown
- [ ] Data expectations clear — what's mandatory, what's optional, what happens if a mandatory field is missing
- [ ] No vague adjectives — correctly, properly, quickly, appropriately, normally, efficiently, user-friendly
- [ ] No hidden assumptions — read it back to someone who wasn't in the room

## Given / When / Then, one behaviour at a time

```
Given [the starting condition]
When [the triggering action]
Then [the single observable result]
```

If a criterion needs "and" to describe what happens, consider whether it's actually two criteria.

---

Template by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks
