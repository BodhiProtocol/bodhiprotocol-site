// This playbook is a first-30-days narrative walkthrough (one fictional
// insurance project, one global example) rather than a list of standalone
// tips, so — like the other narrative playbooks — it renders as a bespoke
// body instead of numbered hack cards. See app/ba-playbooks/[slug]/page.tsx's
// customPlaybookBodies registry. Reuses the same FieldLabel / not-prose
// visual language as HackCard's sub-components (Checklist, MiniDiagram)
// since this is meant to be scanned section by section, not read as flowing
// prose. The DiscoveryMapDiagram is this playbook's one bespoke visual —
// per CLAUDE.md's "bespoke, not templatized" rule, it's grounded in the
// article's own six-question map, not a reused generic template.
import { Map } from "lucide-react";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { DownloadCard } from "@/components/ba-playbooks/download-card";
import { FieldLabel } from "@/components/ba-playbooks/field-label";
import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";

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

function PhaseDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-4">
      <span className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-brand uppercase">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
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

function DecisionMapTable() {
  const rows = [
    { decision: "What makes a claim complete?", owner: "Claims Operations" },
    { decision: "Which claims require fraud review?", owner: "Fraud Risk" },
    { decision: "What can customers see?", owner: "Product + Compliance" },
    { decision: "When can payment be released?", owner: "Claims + Finance" },
    { decision: "How will the solution be implemented?", owner: "Technology" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[460px] text-left text-sm">
        <caption className="sr-only">AaravCare decision map — decision and the role responsible</caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Decision
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Person or role responsible
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.decision}>
              <td className="px-3 py-2">{row.decision}</td>
              <td className="px-3 py-2 font-medium">{row.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CurrentVsProposedTable() {
  const rows = [
    { statement: "Customers currently submit documents by email", type: "Current state" },
    { statement: "Customers should upload documents through a portal", type: "Proposed change" },
    {
      statement: "The portal must support PDF and JPEG files up to the approved size limit",
      type: "Requirement — once confirmed",
    },
    { statement: "AI will check every medical document automatically", type: "Idea or assumption" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[520px] text-left text-sm">
        <caption className="sr-only">
          AaravCare statements sorted into current state, proposal, requirement or assumption
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Statement
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              What it really is
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.statement}>
              <td className="px-3 py-2">{row.statement}</td>
              <td className="px-3 py-2 font-medium whitespace-nowrap">{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DecisionLogTable() {
  const rows = [
    {
      decision: "Claims can be saved as drafts",
      status: "Approved",
      owner: "Product Owner",
      reason: "Customers may not have every document available",
    },
    {
      decision: "AI will classify documents",
      status: "Proposed",
      owner: "Unassigned",
      reason: "Expected to reduce manual sorting — no approval found",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">AaravCare decision log example entries</caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Decision
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Owner
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Reason
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.decision}>
              <td className="px-3 py-2 font-medium">{row.decision}</td>
              <td className="px-3 py-2">{row.status}</td>
              <td className="px-3 py-2">{row.owner}</td>
              <td className="px-3 py-2">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GlobalExampleTable() {
  const rows = [
    { area: "Why", reveals: "New hires wait too long for accounts and equipment" },
    { area: "People", reveals: "HR, managers, IT, Security, Payroll, Facilities and new employees" },
    {
      area: "Process",
      reveals: "Offer accepted → employee created → checks completed → access and equipment provided",
    },
    { area: "Systems", reveals: "HR platform, identity provider, payroll, service desk and device management" },
    { area: "Data", reveals: "Legal name, location, start date, employment type, manager and access profile" },
    { area: "Decisions", reveals: "Who approves privileged access? What happens when a start date changes?" },
    { area: "Boundary", reveals: "Does the first release create accounts, order equipment or both?" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[540px] text-left text-sm">
        <caption className="sr-only">
          Global SaaS employee onboarding — same discovery map, different project
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Area
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              What discovery reveals
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.area}>
              <td className="px-3 py-2 font-medium whitespace-nowrap">{row.area}</td>
              <td className="px-3 py-2">{row.reveals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The playbook's one bespoke visual metaphor: the six questions discovery has
// to answer, arranged as a map radiating out from the project itself — not a
// reused flywheel or funnel template, grounded in this article's own "Why /
// Who / How / What / Which / Where" structure.
function DiscoveryMapDiagram() {
  const dimensions = [
    { letter: "Why", label: "the project exists" },
    { letter: "Who", label: "is affected, who decides" },
    { letter: "How", label: "the process works today" },
    { letter: "What", label: "is expected to change" },
    { letter: "Which", label: "systems and data make it work" },
    { letter: "Where", label: "the risks and open questions are" },
  ];

  return (
    <div className="not-prose flex flex-col items-center gap-5 rounded-2xl border border-border bg-muted/20 px-4 py-7 sm:px-8 sm:py-9">
      <FieldLabel>The discovery map</FieldLabel>
      <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
        The new project
      </span>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {dimensions.map((dimension) => (
          <div
            key={dimension.letter}
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card px-3 py-3 text-center"
          >
            <span className="font-heading text-sm font-semibold text-brand">{dimension.letter}</span>
            <span className="text-[0.7rem] leading-snug text-muted-foreground">{dimension.label}</span>
          </div>
        ))}
      </div>
      <p className="max-w-md text-center text-xs text-muted-foreground">
        That&rsquo;s enough to start contributing without pretending you know everything.
      </p>
    </div>
  );
}

function MistakeCard({ number, title, body }: { number: number; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 font-mono text-[0.65rem] font-semibold text-destructive">
          {number}
        </span>
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
      <p className="pl-7 text-sm text-foreground/80">{body}</p>
    </div>
  );
}

function NewProjectDiscoveryPlaybookBody() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-foreground/90">
        <p>It&rsquo;s your first week on a new project.</p>
        <p>
          You have Jira access, a 74-page requirements document and a calendar full of meetings
          whose titles contain words you don&rsquo;t understand yet.
        </p>
        <p>Then your manager asks:</p>
        <Quote>&ldquo;Are you comfortable with the project now?&rdquo;</Quote>
        <p>You&rsquo;ve met twelve people, opened six systems and collected seventeen documents.</p>
        <p>But you still can&rsquo;t confidently explain why the project exists.</p>
        <KeyInsight>
          That&rsquo;s normal. The problem is rarely missing information &mdash; it&rsquo;s that the
          information arrives in pieces, and nobody tells you how they connect.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          First, don&rsquo;t try to understand everything
        </h2>
        <p className="text-sm text-foreground/80">
          &ldquo;Understand the project&rdquo; is too large to be useful. Start with a smaller
          target. By the end of discovery, you should be able to explain:
        </p>
      </div>

      <DiscoveryMapDiagram />

      <p className="text-sm text-foreground/80">
        Discovery is not about becoming the expert in ten days. It is about building the map that
        helps you ask better questions on day eleven.
      </p>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Meet our project
        </h2>
        <p className="text-sm text-foreground/80">
          We&rsquo;ll use a fictional Indian insurance company called{" "}
          <span className="font-semibold text-foreground">AaravCare</span>.
        </p>
        <p className="text-sm text-foreground/80">
          Today, customers submit health-insurance claims through email. Operations teams download
          the documents, enter the details into a claims system and contact customers when something
          is missing.
        </p>
        <p className="text-sm text-foreground/80">The project brief says:</p>
        <Quote>&ldquo;Build a digital claims journey to reduce processing time.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">Sounds clear. It isn&rsquo;t.</p>
        <p className="text-sm text-foreground/80">
          Does &ldquo;digital claims journey&rdquo; mean a form for uploading documents&mdash;or
          policy validation, fraud checks, status tracking, automated approval and hospital
          integration too? And does &ldquo;reduce processing time&rdquo; mean faster submission,
          review, approval or payment?
        </p>
        <KeyInsight>
          A project description tells you what people want to build. It may not tell you what
          problem they are trying to solve.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={1} title="Start with why the project exists" />
        <p className="text-sm text-foreground/80">
          Before studying screens, stories or APIs, understand the reason money and people have
          been assigned to this work. Ask what problem we&rsquo;re trying to solve, who experiences
          it, what evidence tells us it&rsquo;s worth solving, why now, what happens if we do
          nothing, and how we&rsquo;ll know the project worked.
        </p>
        <p className="text-sm text-foreground/80">
          At AaravCare, different people give different answers:
        </p>
        <TwoPanel>
          <LabeledPanel label="Customer Service">
            <p>&ldquo;Customers keep calling because they don&rsquo;t know the claim status.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="Operations">
            <p>&ldquo;We spend too much time checking incomplete submissions.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="Finance">
            <p>&ldquo;Manual processing makes payment forecasting unreliable.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="Compliance">
            <p>&ldquo;We need a better record of what was submitted, changed and approved.&rdquo;</p>
          </LabeledPanel>
        </TwoPanel>
        <KeyInsight>
          The project has several related problems wearing the same project name. Your job is to
          make those problems visible before the team treats one feature as the answer to all of
          them.
        </KeyInsight>
        <p className="text-sm text-foreground/80">Write a one-sentence project purpose:</p>
        <LabeledPanel label="The formula">
          <p>
            We are improving <span className="font-semibold text-foreground">[process]</span> for{" "}
            <span className="font-semibold text-foreground">[users]</span> because{" "}
            <span className="font-semibold text-foreground">[current problem]</span>, so that{" "}
            <span className="font-semibold text-foreground">[measurable outcome]</span>.
          </p>
        </LabeledPanel>
        <LabeledPanel label="AaravCare">
          <p>
            We are improving claim submission and initial validation for policyholders and Claims
            Operations because incomplete email submissions create avoidable delays, so that more
            claims arrive ready for assessment and customers can see what happens next.
          </p>
        </LabeledPanel>
        <p className="text-sm text-foreground/80">That sentence may change as you learn more.</p>
        <KeyInsight>Good. Discovery should change your understanding.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={2} title="Find the people behind the org chart" />
        <p className="text-sm text-foreground/80">
          A stakeholder list tells you names and roles. It does not tell you how the project
          actually makes decisions. For each important area, identify who experiences the problem,
          who performs the work today, who owns the business outcome, who makes policy or control
          decisions, who owns the affected systems, who can block the change, who will support it
          after release, and who is missing from the conversation.
        </p>
        <p className="text-sm text-foreground/80">
          At AaravCare, the project sponsor is the Head of Claims Transformation. But the rules for
          accepting a claim belong to Claims Operations. Fraud decides which submissions need
          additional checks. Finance owns payment controls. Technology owns the claims platform.
          Customer Service handles the calls when the journey is unclear.
        </p>
        <KeyInsight>One sponsor does not mean one decision-maker.</KeyInsight>
        <p className="text-sm text-foreground/80">Create a simple decision map:</p>
        <DecisionMapTable />
        <p className="text-sm text-foreground/80">
          If the answer is only &ldquo;the business,&rdquo; keep asking.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={3} title="Follow the work as it happens today" />
        <p className="text-sm text-foreground/80">
          Documents describe the official process. People show you the real one. Ask someone who
          performs the work to walk you through a recent example from beginning to end&mdash;not a
          presentation or an ideal process. An actual case.
        </p>
        <MiniDiagram
          label="The AaravCare claim, today"
          steps={[
            "Email + attachments",
            "Policy number checked",
            "Files downloaded, renamed",
            "Details entered manually",
            "Missing info requested",
            "Fraud checks (maybe)",
            "Assessor decides",
            "Payment released",
            "Customer updated",
          ]}
        />
        <p className="text-sm text-foreground/80">Then ask:</p>
        <BulletList
          items={[
            "Where does the work wait?",
            "What gets copied manually?",
            "What gets checked twice?",
            "Which step depends on one person's knowledge?",
            "Where do people leave the official system and use email or spreadsheets?",
            "What happens when information is missing?",
            "How is the customer informed?",
          ]}
        />
        <KeyInsight>
          That spreadsheet someone calls &ldquo;temporary&rdquo; may be carrying half the process.
          Do not ignore it because it&rsquo;s missing from the architecture diagram.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={4} title="Separate the current state from the promised future" />
        <p className="text-sm text-foreground/80">
          New projects often mix three different things: what happens today, what somebody has
          proposed, and what has actually been approved. Keep them separate.
        </p>
        <CurrentVsProposedTable />
        <p className="text-sm text-foreground/80">
          An impressive slide is not a decision. A prototype is not necessarily approved behaviour.
          A line in an old document may no longer be true.
        </p>
        <p className="text-sm text-foreground/80">For every major statement, ask:</p>
        <Quote>Is this current behaviour, an approved requirement, a proposal or an assumption?</Quote>
        <p className="text-sm text-foreground/80">
          You will prevent a surprising amount of confusion with that one question.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={5} title="Draw the system and data journey" />
        <p className="text-sm text-foreground/80">
          You do not need a perfect architecture diagram on day one. Start with a simple journey:
          who creates the information, where it enters, which systems use it, what comes out.
        </p>
        <MiniDiagram
          label="AaravCare — system and data journey"
          steps={[
            "Customer",
            "Claims Portal",
            "Policy System",
            "Claims Platform",
            "Fraud Service",
            "Finance System",
            "Customer Portal",
          ]}
        />
        <p className="text-sm text-foreground/80">Now ask about the connections:</p>
        <BulletList
          items={[
            "Which system owns each important field?",
            "Which integrations are real-time and which are delayed?",
            "What identifier links the same claim across systems?",
            "What happens if a system does not respond?",
            "Can messages arrive twice or out of order?",
            "Where are validation errors stored?",
            "Who reconciles mismatches?",
            "Which reports consume the data later?",
          ]}
        />
        <KeyInsight>
          The screen is only where the user meets the process. The requirement often lives in what
          happens before and after it.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={6} title="Find the decisions already made — and the ones pretending to be made" />
        <p className="text-sm text-foreground/80">
          New team members often reopen settled questions because they cannot find the original
          decision. They also inherit assumptions that everyone treats as settled because nobody
          remembers questioning them.
        </p>
        <p className="text-sm text-foreground/80">Create a decision log with five fields:</p>
        <DecisionLogTable />
        <p className="text-sm text-foreground/80">
          Useful statuses are Proposed, Approved, Rejected, Superseded and Needs confirmation.
        </p>
        <KeyInsight>
          If nobody can identify who approved something, record that uncertainty. Do not quietly
          convert it into a fact.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={7} title="Make the delivery boundary visible" />
        <p className="text-sm text-foreground/80">
          A project can have a clear vision and still have an unclear release. Ask:
        </p>
        <BulletList
          items={[
            "What is included in the next release?",
            "What is explicitly out of scope?",
            "What is already committed?",
            "Which dates are fixed — and why?",
            "What depends on another team, vendor or approval?",
            "What must be true before development can start?",
            "What would stop UAT or production release?",
            "What work continues manually after launch?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          At AaravCare, &ldquo;digital claims&rdquo; is the vision. The first release may include
          only:
        </p>
        <BulletList
          items={["Claim submission", "Document upload", "Basic policy validation", "Confirmation and status tracking"]}
        />
        <p className="text-sm text-foreground/80">
          Fraud automation and automatic approval may come later.
        </p>
        <KeyInsight>That is not a failure of ambition. It is a usable delivery boundary.</KeyInsight>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          The first-30-days discovery plan
        </h2>
        <p className="text-sm text-foreground/80">
          You do not need to complete discovery before contributing. Use three passes.
        </p>
      </div>

      <PhaseDivider label="Days 1–5 · Orient" />
      <div className="flex flex-col gap-3">
        <p className="text-sm text-foreground/80">
          Understand why the project exists and learn its language.
        </p>
        <BulletList
          items={[
            "Read the project brief, recent decisions and current backlog",
            "Meet the sponsor, Product Owner, operational SME, technology lead and QA lead",
            "Write your first version of the project-purpose statement",
            "Start a glossary",
            "Capture contradictions and open questions",
          ]}
        />
        <LabeledPanel label="Output">
          <p>Purpose statement, stakeholder map and glossary.</p>
        </LabeledPanel>
      </div>

      <PhaseDivider label="Days 6–15 · Trace" />
      <div className="flex flex-col gap-3">
        <p className="text-sm text-foreground/80">Follow one real journey through people, systems and data.</p>
        <BulletList
          items={[
            "Observe the current process",
            "Walk through one normal case and one failed case",
            "Draw the process and system journey",
            "Identify data owners, integrations and manual workarounds",
            "Separate approved decisions from proposals and assumptions",
          ]}
        />
        <LabeledPanel label="Output">
          <p>Current-state flow, system/data map and decision log.</p>
        </LabeledPanel>
      </div>

      <PhaseDivider label="Days 16–30 · Test your understanding" />
      <div className="flex flex-col gap-3">
        <p className="text-sm text-foreground/80">Play your understanding back to the team.</p>
        <BulletList
          items={[
            "Confirm the target outcome and success measures",
            "Validate scope and release boundaries",
            "Surface dependencies and delivery risks",
            "Prioritise unanswered questions",
            "Check whether QA, Operations and Support see anything missing",
            "Agree what you will investigate next",
          ]}
        />
        <LabeledPanel label="Output">
          <p>Validated discovery canvas, risk list and next-action plan.</p>
        </LabeledPanel>
        <KeyInsight>
          Thirty days is not a deadline for knowing everything. It is enough time to stop being
          dependent on whichever person spoke to you last.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          A global example: the same questions, different project
        </h2>
        <p className="text-sm text-foreground/80">
          Imagine joining a global SaaS company that wants to &ldquo;automate employee
          onboarding.&rdquo; The same map works:
        </p>
        <GlobalExampleTable />
        <p className="text-sm text-foreground/80">
          Different country, different industry, same problem: the project name is smaller than
          the system of work behind it.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Questions experienced BAs ask early
        </h2>
        <p className="text-sm text-foreground/80">
          Once you understand the basic journey, ask the less comfortable questions:
        </p>
        <BulletList
          items={[
            "Which success measures could improve while the customer experience gets worse?",
            "Which stakeholder benefits from this change — and who gets more work?",
            "What manual activity is the solution quietly relying on?",
            "Which rule exists because of regulation, and which exists because \"we've always done it this way\"?",
            "What happens to cases already in progress when the change goes live?",
            "Who handles exceptions after launch?",
            "Which downstream team learns about the change last?",
            "What must be monitored on day one?",
            "What is the rollback or fallback if the new journey fails?",
            "Which assumption would be most expensive if it were wrong?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          You will not need every question on every project. Choose the ones that can change
          scope, design, testing or ownership.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Five discovery mistakes to avoid
        </h2>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <MistakeCard
            number={1}
            title="Reading everything before speaking to anyone"
            body="Documents give you history. People give you context. Use both."
          />
          <MistakeCard
            number={2}
            title="Meeting only senior stakeholders"
            body="Leaders explain the intended process. The people doing the work show you where it bends."
          />
          <MistakeCard
            number={3}
            title="Treating access as understanding"
            body="Jira, Confluence and system access don't mean you understand how a case moves through them. Trace one real example."
          />
          <MistakeCard
            number={4}
            title="Hiding what you don't know"
            body="Visible questions make discovery safer. Silent assumptions make it look finished before it is."
          />
          <MistakeCard
            number={5}
            title="Turning discovery into permanent analysis"
            body="You will never remove every unknown. Expose the ones that could change the next decision."
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Before You Say, &ldquo;I Understand the Project&rdquo;
        </h2>
        <p className="text-sm text-foreground/80">Check whether you can answer:</p>
        <Checklist
          label="The understanding check"
          items={[
            "Why does this project exist?",
            "Who experiences the problem?",
            "How does the process work today?",
            "What is expected to change?",
            "Which systems and data are involved?",
            "Who owns the important decisions?",
            "What is included in the next release?",
            "Which assumptions are still unverified?",
            "Where could the change fail?",
            "What should you investigate next?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          If you cannot answer one of these, you have not failed discovery.
        </p>
        <p className="text-sm text-foreground/80">You have found where discovery needs to go next.</p>
      </div>

      <div className="not-prose flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
            Take this into week one
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            New Project Discovery Canvas
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            All nine sections from this playbook in one editable document — project purpose,
            people and decisions, current process, systems and data, scope, risks and your
            first-30-day priorities.
          </p>
        </div>
        <div className="sm:max-w-xs">
          <DownloadCard
            icon={<Map className="size-4.5" aria-hidden="true" />}
            title="New Project Discovery Canvas"
            description="Copy-paste into Confluence, Notion or Word and build it out over your first 30 days."
            href="/downloads/New_Project_Discovery_Canvas.md"
            filename="New_Project_Discovery_Canvas.md"
            meta="Markdown · Copy-paste ready"
            cta="Download the Canvas"
            analyticsEvent="new_project_discovery_canvas_downloaded"
          />
        </div>
      </div>
    </div>
  );
}

export { NewProjectDiscoveryPlaybookBody };
