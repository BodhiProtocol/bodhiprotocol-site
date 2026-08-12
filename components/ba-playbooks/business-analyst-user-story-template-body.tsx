import { BookOpen, FileText, ListChecks } from "lucide-react";

// This playbook is a template + two full worked examples rather than a list of
// standalone tips, so — like the other narrative playbooks — it renders as a
// bespoke body instead of numbered hack cards. See
// app/ba-playbooks/[slug]/page.tsx's customPlaybookBodies registry. It reuses
// the same FieldLabel / not-prose visual language as HackCard's sub-components
// (Checklist, SideBySide, CopyTemplate) rather than flowing prose, since a
// template guide needs to be scanned, not read start to finish.
import { Checklist } from "@/components/ba-playbooks/checklist";
import { DownloadCard } from "@/components/ba-playbooks/download-card";

function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-brand/40 pl-3 text-sm font-medium text-foreground/90 italic">
      {children}
    </p>
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

function Gwt({ lines }: { lines: { keyword: string; text: string }[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((line, index) => (
        <p key={index}>
          <span className="font-semibold text-foreground">{line.keyword}</span> {line.text}
        </p>
      ))}
    </div>
  );
}

function DataTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="sr-only">
          Data requirements for the Trade Surveillance risk classification example
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Data
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Source
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Required?
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          <tr>
            <td className="px-3 py-2 font-medium">Customer ID</td>
            <td className="px-3 py-2">Surveillance alert</td>
            <td className="px-3 py-2">Yes</td>
            <td className="px-3 py-2">Identifies customer</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-medium">Risk classification</td>
            <td className="px-3 py-2">Risk system</td>
            <td className="px-3 py-2">Yes</td>
            <td className="px-3 py-2">Latest active value</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-medium">Classification date</td>
            <td className="px-3 py-2">Risk system</td>
            <td className="px-3 py-2">Yes</td>
            <td className="px-3 py-2">Determines freshness</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-medium">Risk reason</td>
            <td className="px-3 py-2">Risk system</td>
            <td className="px-3 py-2">No</td>
            <td className="px-3 py-2">Future scope</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function DecisionLogTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="sr-only">Example decision log entry for the UPI example</caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Decision
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
          <tr>
            <td className="px-3 py-2 font-medium">
              Show a customer-friendly message instead of the raw payment error
            </td>
            <td className="px-3 py-2">Payments Product</td>
            <td className="px-3 py-2">
              Customers should not need to understand internal banking codes
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function BusinessAnalystUserStoryTemplateBody() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-foreground/90">
        <p>You open Jira.</p>
        <p>
          Click <strong className="font-semibold text-foreground">Create</strong>.
        </p>
        <p>And suddenly this tiny empty box feels like an exam.</p>
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          Summary · Description · Acceptance Criteria
        </p>
        <p>What exactly are you supposed to put in there?</p>
        <p>A user story doesn&rsquo;t need to be long. It needs to make the next conversation easier.</p>
        <p>Here&rsquo;s a template you can actually use.</p>
        <KeyInsight>
          You won&rsquo;t need every section in every story. Think of this as a toolbox, not a form.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Start with the simple version
        </h2>
        <LabeledPanel label="The skeleton">
          <p>
            <span className="font-semibold text-foreground">As a</span> [user / role]
          </p>
          <p>
            <span className="font-semibold text-foreground">I want</span> [capability / action]
          </p>
          <p>
            <span className="font-semibold text-foreground">So that</span> [business outcome / reason]
          </p>
        </LabeledPanel>
        <TwoPanel>
          <LabeledPanel label="India example — UPI Payments">
            <p>
              <span className="font-semibold text-foreground">As a</span> customer
            </p>
            <p>
              <span className="font-semibold text-foreground">I want</span> to see why my UPI payment
              failed
            </p>
            <p>
              <span className="font-semibold text-foreground">So that</span> I know whether to retry,
              use another account, or contact my bank.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Capital Markets example — Trade Surveillance">
            <p>
              <span className="font-semibold text-foreground">As a</span> Trade Surveillance Analyst
            </p>
            <p>
              <span className="font-semibold text-foreground">I want</span> alerts to show the
              customer&rsquo;s latest risk classification
            </p>
            <p>
              <span className="font-semibold text-foreground">So that</span> I can prioritise
              high-risk cases.
            </p>
          </LabeledPanel>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          Both are valid. But neither is ready to build yet.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          First, look at a bad story
        </h2>
        <LabeledPanel label="Bad story">
          <p>As a user, I want risk information, so that I can use it.</p>
        </LabeledPanel>
        <p className="text-sm text-foreground/80">
          It follows the format. But what does it actually tell us? Which user? What information?
          Where should it appear? How fresh must it be? What happens if it is unavailable?
        </p>
        <KeyInsight>A story can look complete and still contain a lot of ambiguity.</KeyInsight>
        <p className="text-sm text-foreground/80">Let&rsquo;s fix that.</p>
      </div>

      <PhaseDivider label="Understand" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={1} title="Context" />
        <p className="text-sm text-foreground/80">Explain what happens today.</p>
        <TwoPanel>
          <LabeledPanel label="India — UPI">
            <p>
              Customers may receive a generic message when a UPI payment fails and not understand
              what went wrong.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <p>
              Analysts currently open another system to check customer risk classification while
              investigating an alert.
            </p>
          </LabeledPanel>
        </TwoPanel>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={2} title="Problem" />
        <p className="text-sm text-foreground/80">Explain why it matters.</p>
        <TwoPanel>
          <LabeledPanel label="India — UPI">
            <p>
              Customers may retry unnecessarily or contact support because they don&rsquo;t know
              what action to take.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <p>Analysts spend extra time switching systems and may miss relevant risk information.</p>
          </LabeledPanel>
        </TwoPanel>
        <KeyInsight>Context = what happens. Problem = why we care.</KeyInsight>
      </div>

      <PhaseDivider label="Define" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={3} title="Expected Behaviour" />
        <p className="text-sm text-foreground/80">Describe what should happen after the change.</p>
        <TwoPanel>
          <LabeledPanel label="India — UPI">
            <p>
              When a payment fails, show an understandable reason and, where appropriate, guidance
              on what to do next.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <p>
              When an analyst opens an alert, show the latest available customer risk classification
              alongside the customer information.
            </p>
          </LabeledPanel>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          Notice what we haven&rsquo;t written: &ldquo;Call API X using endpoint Y and populate
          column Z.&rdquo; That may be part of the implementation. But first describe the
          behaviour.
        </p>
        <KeyInsight>Don&rsquo;t confuse the solution with the requirement.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={4} title="Acceptance Criteria" />
        <p className="text-sm text-foreground/80">
          Now make the behaviour testable, using{" "}
          <span className="font-semibold text-foreground">Given</span> /{" "}
          <span className="font-semibold text-foreground">When</span> /{" "}
          <span className="font-semibold text-foreground">Then</span>.
        </p>
        <TwoPanel>
          <div className="flex flex-col gap-3">
            <LabeledPanel label="India — Insufficient balance">
              <Gwt
                lines={[
                  { keyword: "Given", text: "the customer initiates a UPI payment" },
                  { keyword: "And", text: "the linked account has insufficient balance" },
                  { keyword: "When", text: "the transaction fails" },
                  { keyword: "Then", text: "the customer should see a clear reason." },
                ]}
              />
            </LabeledPanel>
            <LabeledPanel label="India — Bank unavailable">
              <Gwt
                lines={[
                  { keyword: "Given", text: "the bank is temporarily unavailable" },
                  { keyword: "When", text: "the transaction cannot be completed" },
                  { keyword: "Then", text: "the customer should be informed" },
                  { keyword: "And", text: "advised to try again later." },
                ]}
              />
            </LabeledPanel>
          </div>
          <div className="flex flex-col gap-3">
            <LabeledPanel label="Capital Markets — Risk available">
              <Gwt
                lines={[
                  { keyword: "Given", text: "customer risk information is available" },
                  { keyword: "When", text: "the analyst opens the alert" },
                  { keyword: "Then", text: "the latest risk classification should be displayed." },
                ]}
              />
            </LabeledPanel>
            <LabeledPanel label="Capital Markets — Risk unavailable">
              <Gwt
                lines={[
                  { keyword: "Given", text: "customer risk information cannot be retrieved" },
                  { keyword: "When", text: "the analyst opens the alert" },
                  { keyword: "Then", text: "show “Risk information unavailable”" },
                  { keyword: "And", text: "do not present an older classification as current." },
                ]}
              />
            </LabeledPanel>
          </div>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          Now: QA knows what to test. Development knows what behaviour matters. Business can
          challenge the rule before code exists. That&rsquo;s the point.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={5} title="Business Rules" />
        <p className="text-sm text-foreground/80">Some rules apply across several scenarios. Keep them visible.</p>
        <TwoPanel>
          <LabeledPanel label="India — UPI">
            <BulletList
              items={[
                "BR-01: A failed payment must never appear successful.",
                "BR-02: Customer messages should use understandable language, not internal error codes.",
              ]}
            />
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <BulletList
              items={[
                "BR-01: Only the latest active risk classification should be shown.",
                "BR-02: Expired classifications must not appear current.",
                "BR-03: If no classification exists, make that clear.",
              ]}
            />
          </LabeledPanel>
        </TwoPanel>
      </div>

      <PhaseDivider label="De-risk" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={6} title="Data Requirements" />
        <p className="text-sm text-foreground/80">If behaviour depends on data, make the data visible.</p>
        <DataTable />
        <p className="text-sm text-foreground/80">
          You don&rsquo;t need a huge mapping document for every story. But ask:
        </p>
        <KeyInsight>
          What happens if the data is missing, stale, delayed, duplicated, or inconsistent?
        </KeyInsight>
        <p className="text-sm text-foreground/80">That question often exposes important requirements.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={7} title="Dependencies" />
        <p className="text-sm text-foreground/80">Ask: what has to work before this story can work?</p>
        <LabeledPanel label="India — UPI">
          <BulletList
            items={[
              "Payment platform returns a meaningful failure status.",
              "Failure statuses are mapped to customer-friendly messages.",
              "Mobile app supports the new responses.",
            ]}
          />
        </LabeledPanel>
        <p className="text-sm text-foreground/80">Simple stories often get stuck here. Find dependencies early.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={8} title="Assumptions" />
        <p className="text-sm text-foreground/80">Write down what the team is currently treating as true.</p>
        <LabeledPanel label="Capital Markets — Trade Surveillance">
          <BulletList
            items={[
              "One customer has one active risk classification.",
              "The risk system owns the classification.",
              "Surveillance users can view it.",
            ]}
          />
        </LabeledPanel>
        <p className="text-sm text-foreground/80">
          Assumptions are dangerous when everyone has them but nobody writes them down.
        </p>
        <KeyInsight>An assumption is not a decision.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={9} title="Out of Scope" />
        <p className="text-sm text-foreground/80">Make the boundary visible.</p>
        <LabeledPanel label="India — UPI, out of scope">
          <BulletList
            items={[
              "Payment routing changes",
              "Bank-side processing changes",
              "Refund handling",
              "Card-payment failures",
            ]}
          />
        </LabeledPanel>
        <p className="text-sm text-foreground/80">Clear scope prevents arguments later.</p>
      </div>

      <PhaseDivider label="Preserve" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={10} title="Open Questions" />
        <p className="text-sm text-foreground/80">
          Don&rsquo;t hide unresolved questions in meeting notes. Put them on the story.
        </p>
        <LabeledPanel label="Capital Markets — Trade Surveillance">
          <BulletList
            items={[
              "What happens if the risk service times out?",
              "How old can the classification be before it becomes stale?",
              "Should analysts see the classification timestamp?",
              "Who owns the stale-data decision?",
            ]}
          />
        </LabeledPanel>
        <KeyInsight>An open question is fine. A hidden open question isn&rsquo;t.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={11} title="Decision Log" />
        <p className="text-sm text-foreground/80">When an important question gets answered, preserve it.</p>
        <DecisionLogTable />
        <p className="text-sm text-foreground/80">
          Three weeks later, someone will ask: &ldquo;Why did we do it this way?&rdquo; Now the
          answer isn&rsquo;t trapped in someone&rsquo;s memory.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Before You Move It to Ready
        </h2>
        <Checklist
          label="Readiness check"
          items={[
            "Do we know who needs this?",
            "Do we understand why?",
            "Is expected behaviour clear?",
            "Can QA test it?",
            "Are business rules visible?",
            "Do we know the relevant systems and data?",
            "Are dependencies and assumptions visible?",
            "Is out-of-scope clear?",
            "Are open questions visible?",
            "Do we know who owns key decisions?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          If several answers are no, the story probably isn&rsquo;t ready. And that&rsquo;s okay.
          The goal isn&rsquo;t to make Jira look complete. The goal is to make sure the team
          understands what it is agreeing to build.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            Take This With You
          </h2>
          <p className="text-sm text-foreground/80">
            Don&rsquo;t just read the playbook. Use it in your next refinement session.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <DownloadCard
            icon={<FileText className="size-4.5" aria-hidden="true" />}
            title="BA User Story Template"
            description="A clean copy-paste version of the structure used in this playbook. Keep it beside Jira and use only the sections your story needs."
            href="/downloads/BA_User_Story_Template.md"
            filename="BA_User_Story_Template.md"
            meta="Markdown · Copy-paste ready"
            cta="Download Template"
            analyticsEvent="ba_user_story_template_downloaded"
          />
          <DownloadCard
            icon={<ListChecks className="size-4.5" aria-hidden="true" />}
            title="User Story Readiness Checklist"
            description="A one-page checklist for backlog refinement, BA self-review, developer handover and QA readiness."
            href="/downloads/User_Story_Readiness_Checklist.pdf"
            filename="User_Story_Readiness_Checklist.pdf"
            meta="PDF · 1 page"
            cta="Download Checklist"
            analyticsEvent="user_story_readiness_checklist_downloaded"
          />
          <DownloadCard
            icon={<BookOpen className="size-4.5" aria-hidden="true" />}
            title="Completed Example Pack"
            description="See the template filled in using two realistic examples — UPI Payments and Trade Surveillance."
            href="/downloads/Completed_User_Story_Example_Pack.md"
            filename="Completed_User_Story_Example_Pack.md"
            meta="Markdown · 2 completed stories"
            cta="Download Examples"
            analyticsEvent="completed_example_pack_downloaded"
          />
        </div>
      </div>
    </div>
  );
}

export { BusinessAnalystUserStoryTemplateBody };
