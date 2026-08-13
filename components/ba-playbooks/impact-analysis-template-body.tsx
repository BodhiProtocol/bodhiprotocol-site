// This playbook is a framework walked through two full worked examples rather
// than a list of standalone tips, so — like the other narrative playbooks —
// it renders as a bespoke body instead of numbered hack cards. See
// app/ba-playbooks/[slug]/page.tsx's customPlaybookBodies registry. Reuses the
// same FieldLabel / not-prose visual language as HackCard's sub-components
// (Checklist, MiniDiagram, CopyTemplate) since this is meant to be scanned
// section by section, not read as flowing prose.
import { Checklist } from "@/components/ba-playbooks/checklist";
import { CopyTemplate } from "@/components/ba-playbooks/copy-template";
import { FieldLabel } from "@/components/ba-playbooks/field-label";
import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";
import { ToolkitCard } from "@/components/ba-playbooks/toolkit-card";

const copyPasteTemplate = `## Change summary

[Describe the change in one sentence.]

## Business reason

[Why is the change needed?]

## Current behaviour

[What happens today?]

## Expected behaviour

[What should happen after the change?]

## Scope

- In scope:
- Out of scope:

## 1. Business process impact

- Current process:
- New process:
- Steps added, changed or removed:

## 2. User and team impact

- Primary users:
- Secondary users:
- Teams affected:
- Workflow, training or communication changes:

## 3. System and integration impact

- Systems / integrations touched:
- Request or response changes:
- Error handling:
- Retry behaviour:
- Existing consumers affected:

## 4. Data impact

- Data elements (current / new / source / consumer):
- Data ownership:
- Validation:
- Missing or incorrect data behaviour:

## 5. Rules, controls and security

- Existing rule or control:
- New rule or control:
- Approval impact:
- Permissions or privacy impact:
- Audit or regulatory impact:

## 6. Downstream, reporting and reconciliation

- Downstream system or team:
- Reports or dashboards:
- Reconciliation or SLA changes:
- Action required:

## 7. Failure and recovery

- Source unavailable:
- Timeout:
- Partial success:
- Duplicate request:
- Recovery or manual handling:

## 8. Historical data and migration

- Existing in-flight items:
- Historical-data update:
- Backfill or migration:
- Compatibility considerations:

## 9. Performance and operations

- Expected volume:
- Response-time expectation:
- Operational limits:
- Monitoring and alerts:
- Support owner:

## 10. Testing, release and rollback

- New scenarios:
- Regression areas:
- Integration / security / performance testing:
- UAT:
- Release approach:
- Rollback plan:

## Dependencies

-

## Assumptions

-

## Open questions

- Question:
- Owner:
- Due date:

## Decisions

- Decision:
- Decision owner:
- Reason:
- Date:`;

function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-brand/40 pl-3 text-sm font-medium text-foreground/90 italic">
      {children}
    </p>
  );
}

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-semibold text-brand">
        {String(number).padStart(2, "0")}
      </span>
      <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
        {title}
      </h2>
    </div>
  );
}

function LabeledPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 px-3.5 py-3 text-sm">
      <p className="font-mono text-[0.65rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex flex-col gap-1.5 text-foreground/90">{children}</div>
    </div>
  );
}

function TwoPanel({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 text-sm text-foreground/80">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-brand/20 bg-brand/[0.04] px-3.5 py-2.5 text-sm font-medium text-foreground/90">
      {children}
    </p>
  );
}

function DataTable() {
  const rows: { element: string; why: string }[] = [
    { element: "Employee ID", why: "Identifies the employee" },
    { element: "Joining date", why: "Determines when access begins" },
    { element: "Job role", why: "Drives entitlements" },
    { element: "Department", why: "Helps select applications" },
    { element: "Manager", why: "May be required for approval" },
    { element: "Location", why: "Applies country-specific rules" },
    { element: "Employment status", why: "Prevents access for cancelled joiners" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[420px] text-left text-sm">
        <caption className="sr-only">
          Data elements automatic onboarding may depend on, and why each matters
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Data element
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Why it matters
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.element}>
              <td className="px-3 py-2 font-medium">{row.element}</td>
              <td className="px-3 py-2">{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// A tasteful, on-brand recreation of the "blast radius" idea — one change,
// ten places to check — using the site's own numbered-badge language rather
// than an illustrated infographic, so it stays consistent with the rest of
// the page (no imported artwork asset for this playbook).
function BlastRadiusDiagram() {
  const areas = [
    "Business process",
    "Users & teams",
    "Systems & integrations",
    "Data",
    "Rules & controls",
    "Downstream & reporting",
    "Failure & recovery",
    "History & migration",
    "Performance & ops",
    "Testing & release",
  ];

  return (
    <div className="not-prose flex flex-col items-center gap-5 rounded-2xl border border-border bg-muted/20 px-4 py-7 sm:px-8 sm:py-9">
      <FieldLabel>The blast radius</FieldLabel>
      <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
        The change
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-2.5">
        {areas.map((area, index) => (
          <span
            key={area}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground/85"
          >
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[0.6rem] font-semibold text-brand">
              {index + 1}
            </span>
            {area}
          </span>
        ))}
      </div>
      <p className="max-w-md text-center text-xs text-muted-foreground">
        One ticket. Ten places the impact could land — before production finds them for you.
      </p>
    </div>
  );
}

function ImpactAnalysisTemplateBody() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-foreground/90">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          The requirement changed one sentence.
        </h2>
        <p>Somehow five teams are now in the meeting.</p>
        <p>That&rsquo;s impact analysis.</p>
        <p>
          A change can look tiny in Jira and still touch processes, systems, data, users, controls
          and reports around it.
        </p>
        <p>Your job as a BA isn&rsquo;t to predict everything.</p>
        <KeyInsight>It&rsquo;s to make the blast radius visible before production does.</KeyInsight>
        <p>Let&rsquo;s use two changes that sound simple:</p>
        <TwoPanel>
          <LabeledPanel label="🇮🇳 India — E-commerce refund">
            <p>&ldquo;If an order is cancelled before dispatch, refund the customer instantly.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="🌍 Global — Employee onboarding">
            <p>&ldquo;Give new employees system access automatically on their joining date.&rdquo;</p>
          </LabeledPanel>
        </TwoPanel>
        <p>One sentence each. Plenty hiding underneath.</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          What is impact analysis?
        </h2>
        <p className="text-sm text-foreground/80">Impact analysis asks:</p>
        <Quote>If we change this, what else could move?</Quote>
        <p className="text-sm text-foreground/80">Not only:</p>
        <Quote>Which screen changes?</Quote>
        <p className="text-sm text-foreground/80">But also:</p>
        <BulletList
          items={[
            "Which process changes?",
            "Which systems and integrations are involved?",
            "Does any data change?",
            "Who works differently?",
            "Are controls being added or bypassed?",
            "Who consumes the result downstream?",
            "What could fail?",
            "What needs testing, monitoring or communication?",
          ]}
        />
        <p className="text-sm text-foreground/80">A good impact analysis turns:</p>
        <Quote>&ldquo;This looks simple.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">into:</p>
        <Quote>&ldquo;Here&rsquo;s what we checked before calling it simple.&rdquo;</Quote>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Start with the change
        </h2>
        <p className="text-sm text-foreground/80">
          Before tracing the impact, write down four things:
        </p>
        <ol className="flex flex-col gap-1.5 text-sm text-foreground/80">
          <li>1. What happens today?</li>
          <li>2. What should happen after the change?</li>
          <li>3. Why is the change needed?</li>
          <li>4. What is explicitly out of scope?</li>
        </ol>
        <p className="text-sm text-foreground/80">For the refund example:</p>
        <LabeledPanel label="Today">
          <p>
            The customer cancels, a refund request is created, and the payment provider processes
            it later.
          </p>
        </LabeledPanel>
        <LabeledPanel label="After the change">
          <p>An eligible cancellation triggers the refund immediately.</p>
        </LabeledPanel>
        <p className="text-sm text-foreground/80">
          That word&mdash;<span className="font-semibold text-foreground">eligible</span>
          &mdash;already gives us questions.
        </p>
        <p className="text-sm text-foreground/80">
          Which orders qualify? What does &ldquo;before dispatch&rdquo; mean? What if the courier
          status is delayed? Does &ldquo;instant&rdquo; mean initiated instantly or credited
          instantly?
        </p>
        <KeyInsight>
          Impact analysis often begins by discovering that one sentence isn&rsquo;t as settled as
          it sounds.
        </KeyInsight>
        <p className="text-sm text-foreground/80">Now trace it across ten areas.</p>
      </div>

      <BlastRadiusDiagram />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          The 10-Area Impact Check
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={1} title="Business process" />
        <p className="text-sm text-foreground/80">Understand the process before the systems.</p>
        <TwoPanel>
          <div className="flex flex-col gap-2.5">
            <MiniDiagram
              label="🇮🇳 Refund — Today"
              steps={["Cancellation", "Refund requested", "Refund processed", "Customer waits"]}
            />
            <MiniDiagram
              label="🇮🇳 Refund — After"
              steps={["Cancellation", "Eligibility checked", "Refund triggered", "Customer notified"]}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <MiniDiagram
              label="🌍 Onboarding — Today"
              steps={["HR creates employee", "Manager requests access", "IT approves", "Access created"]}
            />
            <MiniDiagram
              label="🌍 Onboarding — After"
              steps={["HR creates employee", "Role is evaluated", "Access created on joining date"]}
            />
          </div>
        </TwoPanel>
        <p className="text-sm text-foreground/80">This could change:</p>
        <BulletList
          items={[
            "refund eligibility",
            "manual refund queues",
            "customer-support handling",
            "seller settlements",
            "finance reconciliation",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Now manager approvals, IT support and security controls may work differently.
        </p>
        <KeyInsight>
          The requirement didn&rsquo;t just change a system. It changed a process.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={2} title="Users and teams" />
        <p className="text-sm text-foreground/80">Ask:</p>
        <Quote>Who does something differently after this change?</Quote>
        <TwoPanel>
          <LabeledPanel label="Refund — may affect">
            <BulletList
              items={["customer support", "refund operations", "finance", "sellers", "fraud teams"]}
            />
          </LabeledPanel>
          <LabeledPanel label="Onboarding — may affect">
            <BulletList
              items={["new employees", "HR", "managers", "IT support", "security", "application owners"]}
            />
          </LabeledPanel>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          For each group, check whether its work, permissions, training or communication must
          change.
        </p>
        <KeyInsight>
          Secondary users are easy to miss. Until they meet the change in production.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={3} title="Systems and integrations" />
        <p className="text-sm text-foreground/80">
          Ask which applications participate in the journey&mdash;not only which application owns
          the screen.
        </p>
        <p className="text-sm text-foreground/80">The refund path might be:</p>
        <MiniDiagram
          label="Refund path"
          steps={["Customer App", "Order Management", "Refund Service", "Payment Gateway", "Finance Reconciliation"]}
        />
        <p className="text-sm text-foreground/80">
          Notifications, reporting and support tools may also consume the result.
        </p>
        <p className="text-sm text-foreground/80">For every integration, ask:</p>
        <BulletList
          items={[
            "Does the request or response change?",
            "Is a new field mandatory?",
            "Are existing consumers affected?",
            "What happens on timeout?",
            "Can the request be retried safely?",
            "Is the change backward-compatible?",
          ]}
        />
        <KeyInsight>
          The requirement may never mention an API. The change can still depend on one.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={4} title="Data" />
        <p className="text-sm text-foreground/80">
          Changes often create data requirements nobody mentioned.
        </p>
        <p className="text-sm text-foreground/80">Ask:</p>
        <BulletList
          items={[
            "Do we need a new field?",
            "Does an existing field change meaning?",
            "Who creates and owns the data?",
            "Who consumes it?",
            "What happens when it is late, missing or wrong?",
          ]}
        />
        <p className="text-sm text-foreground/80">Automatic onboarding may depend on:</p>
        <DataTable />
        <p className="text-sm text-foreground/80">The requirement says:</p>
        <Quote>&ldquo;Create access automatically.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">The real question is:</p>
        <Quote>What trustworthy data tells us which access to create?</Quote>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={5} title="Business rules, controls and security" />
        <p className="text-sm text-foreground/80">Ask:</p>
        <BulletList
          items={[
            "Is an approval changing?",
            "Could a control be bypassed?",
            "Are permissions involved?",
            "Is sensitive data exposed?",
            "Is an audit trail required?",
            "Do regulatory or retention rules apply?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Imagine onboarding employees in Mumbai, London and New York.
        </p>
        <p className="text-sm text-foreground/80">
          Location, employment type and role may change which systems and data they can access. A
          contractor should not receive privileged access simply because a job title was entered
          incorrectly.
        </p>
        <p className="text-sm text-foreground/80">You might need rules such as:</p>
        <BulletList
          items={[
            "Standard access follows the employee's approved role.",
            "Privileged access always requires separate approval.",
            "Contractors receive time-bound access.",
            "Access cannot begin before the joining date.",
            "Access is cancelled if the employee does not join.",
          ]}
        />
        <KeyInsight>Automation doesn&rsquo;t remove controls. It changes where they happen.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={6} title="Downstream, reporting and reconciliation" />
        <p className="text-sm text-foreground/80">One of the best BA questions is:</p>
        <Quote>Who consumes this after us?</Quote>
        <p className="text-sm text-foreground/80">For the refund change:</p>
        <BulletList
          items={[
            "Finance may receive refunds earlier.",
            "Support may see new statuses.",
            "Reporting may calculate turnaround time differently.",
            "Fraud may require new alerts.",
            "Sellers may see settlement adjustments sooner.",
          ]}
        />
        <p className="text-sm text-foreground/80">Suppose Finance tracks:</p>
        <MiniDiagram
          label="Finance tracking"
          steps={["Refund Requested", "Refund Processing", "Refund Completed"]}
        />
        <p className="text-sm text-foreground/80">
          An instant refund may shorten or remove one state. Dashboards, SLA calculations and
          reconciliation rules could then change too.
        </p>
        <KeyInsight>Your system can work perfectly and still break someone else&rsquo;s process.</KeyInsight>
        <p className="text-sm text-foreground/80">Don&rsquo;t stop at:</p>
        <Quote>&ldquo;Our part works.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">Follow the output one step further.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={7} title="Failure and recovery" />
        <p className="text-sm text-foreground/80">
          Happy paths are easy. Failures are where impact analysis earns its keep.
        </p>
        <p className="text-sm text-foreground/80">For the refund change, what happens if:</p>
        <BulletList
          items={[
            "the order is cancelled but the refund fails?",
            "the refund succeeds but the notification fails?",
            "the payment gateway times out?",
            "the system retries the same request?",
            "one part succeeds and another does not?",
          ]}
        />
        <p className="text-sm text-foreground/80">Could the customer receive two refunds?</p>
        <p className="text-sm text-foreground/80">
          For onboarding, what if access is created but the employee&rsquo;s joining date is later
          changed&mdash;or the employee never joins?
        </p>
        <KeyInsight>These aren&rsquo;t only technical questions. They define business behaviour.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={8} title="Historical data and migration" />
        <p className="text-sm text-foreground/80">
          New behaviour raises an easy-to-miss question:
        </p>
        <Quote>What happens to things already in progress?</Quote>
        <p className="text-sm text-foreground/80">For example:</p>
        <BulletList
          items={[
            "Do existing refund requests use the new flow?",
            "Should pending refunds be reprocessed?",
            "Do current employees need their access recalculated?",
            "Does a new field need to be populated for old records?",
            "Can old and new versions coexist during rollout?",
          ]}
        />
        <KeyInsight>
          Sometimes the feature is simple. Moving safely from the old world to the new one isn&rsquo;t.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={9} title="Performance and operational limits" />
        <p className="text-sm text-foreground/80">
          &ldquo;It works&rdquo; is different from &ldquo;it works under real load.&rdquo;
        </p>
        <p className="text-sm text-foreground/80">Ask:</p>
        <BulletList
          items={[
            "How many requests could arrive at once?",
            "Is there a response-time expectation?",
            "Are there payment-provider or API rate limits?",
            "Could automation create a large queue on joining day?",
            "What monitoring or alerting is needed?",
            "Who handles exceptions?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          A refund flow that works for ten requests may behave very differently during a festival
          sale.
        </p>
        <p className="text-sm text-foreground/80">
          An onboarding flow may face hundreds of new joiners after an acquisition.
        </p>
        <KeyInsight>Volume is part of the requirement&mdash;even when Jira forgets to mention it.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={10} title="Testing, release and rollback" />
        <p className="text-sm text-foreground/80">
          Impact analysis gives QA the map. Testing explores the map.
        </p>
        <p className="text-sm text-foreground/80">For onboarding, scenarios might include:</p>
        <BulletList
          items={[
            "employee joins today",
            "employee joins next week",
            "joining date changes",
            "employee record is cancelled",
            "job role or manager is missing",
            "department changes before joining",
            "provisioning partly fails",
            "privileged access requires approval",
            "the same event is received twice",
          ]}
        />
        <p className="text-sm text-foreground/80">Also decide:</p>
        <BulletList
          items={[
            "What requires regression testing?",
            "Do we need integration, security or performance testing?",
            "Can the change be released gradually?",
            "How will we know it is working?",
            "What is the rollback plan?",
            "Who supports it after release?",
          ]}
        />
        <KeyInsight>Release is not the last line of the ticket. It is part of the change.</KeyInsight>
      </div>

      <ToolkitCard />

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          Copy-Paste Impact Analysis Template
        </h2>
        <CopyTemplate template={copyPasteTemplate} label="Copy template" scrollable />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Before You Say &ldquo;No Impact&rdquo;
        </h2>
        <p className="text-sm text-foreground/80">Run through this once:</p>
        <Checklist
          label="No-impact gut check"
          items={[
            "Business process",
            "Users and teams",
            "Systems and integrations",
            "Data",
            "Rules, controls and security",
            "Downstream, reporting and reconciliation",
            "Failure and recovery",
            "Historical data and migration",
            "Performance and operations",
            "Testing, release and rollback",
            "Assumptions, dependencies and open questions",
          ]}
        />
        <p className="text-sm text-foreground/80">
          If you checked all of that and found nothing, great.
        </p>
        <p className="text-sm text-foreground/80">
          Now <span className="font-semibold text-foreground">&ldquo;No impact&rdquo;</span>{" "}
          actually means something.
        </p>
      </div>

      <ToolkitCard compact />
    </div>
  );
}

export { ImpactAnalysisTemplateBody };
