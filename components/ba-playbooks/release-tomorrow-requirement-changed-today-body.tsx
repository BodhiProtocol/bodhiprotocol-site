import { ClipboardCheck } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { ComparisonTable } from "@/components/ba-playbooks/comparison-table";
import { DownloadCard } from "@/components/ba-playbooks/download-card";

// This playbook walks through one release-day decision rather than
// standalone tips — so like the other narrative-walkthrough playbooks it
// renders as flowing prose instead of numbered hack cards. See
// app/ba-playbooks/[slug]/page.tsx's customPlaybookBodies registry.
function ReleaseTomorrowRequirementChangedTodayBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>&ldquo;Can we squeeze in one small change?&rdquo;</h2>
      <p>Tomorrow is release day.</p>
      <p>The build is ready. QA has finished testing. Release notes are being prepared.</p>
      <p>Then, at 4:37 PM:</p>
      <blockquote>&ldquo;We need one small requirement change before tomorrow.&rdquo;</blockquote>
      <p>Everyone looks at the BA.</p>
      <p>Do you say yes? No? Postpone the release?</p>
      <p>None should be your first move.</p>
      <blockquote>
        <strong>Pause. Understand the change. Make the risk visible.</strong>
      </blockquote>
      <p>Because when release is tomorrow, you are no longer managing only a requirement.</p>
      <p>You are managing a release decision.</p>

      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/release-tomorrow-requirement-changed-today-infographic.png"
          alt="Infographic summarising the framework: why a late change is risky, the seven-step response (pause, understand, impact fast, effort reality, options, communicate, decide), the five paths to choose from (absorb, scope swap, feature flag, defer, don't do it), and the checklist to run before the green signal."
          width={1183}
          height={1329}
          loading="lazy"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full max-w-lg rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          Late changes don&rsquo;t wait. A good BA doesn&rsquo;t stop them &mdash; a good BA manages the risk, the impact and the decision.
        </figcaption>
      </figure>

      <h2>Here&rsquo;s the situation</h2>
      <p>Imagine an e-commerce checkout flow scheduled for release tomorrow.</p>
      <p>The approved requirement says:</p>
      <blockquote>New customers can place an order after email and mobile verification.</blockquote>
      <p>Today, the business adds:</p>
      <blockquote>&ldquo;We also need address verification for every new customer.&rdquo;</blockquote>
      <p>Sounds small.</p>
      <p>But development and regression are complete, and Operations is ready.</p>
      <p>That &ldquo;small&rdquo; change could touch:</p>
      <blockquote>
        <strong>UI &rarr; API &rarr; customer data &rarr; verification service &rarr; error handling &rarr; tests &rarr; support</strong>
      </blockquote>
      <p>The calendar says one day.</p>
      <p>The system doesn&rsquo;t care.</p>

      <h2>The first mistake: immediately editing Jira</h2>
      <p>Someone asks:</p>
      <blockquote>&ldquo;Can you quickly update the acceptance criteria?&rdquo;</blockquote>
      <p>Don&rsquo;t. Not yet.</p>
      <p>Updating Jira doesn&rsquo;t make the system safe to release.</p>
      <p>First ask:</p>
      <blockquote>
        <strong>What changed, what does it touch, and what happens if we get it wrong?</strong>
      </blockquote>

      <h2>1. Pause &mdash; don&rsquo;t commit under pressure</h2>
      <p>A useful response is:</p>
      <blockquote>&ldquo;Let&rsquo;s quickly assess the impact before we commit this to tomorrow&rsquo;s release.&rdquo;</blockquote>
      <p>That isn&rsquo;t resistance.</p>
      <p>It&rsquo;s responsible delivery.</p>
      <blockquote>
        <strong>Urgency should increase discipline, not remove it.</strong>
      </blockquote>

      <h2>2. Understand &mdash; what actually changed?</h2>
      <p>&ldquo;Add address verification&rdquo; isn&rsquo;t enough.</p>
      <p>Clarify:</p>
      <ComparisonTable
        columns={["Ask", "Confirm"]}
        rows={[
          { cells: ["Scope", "Who/what is affected? What exactly changed?"] },
          { cells: ["Behaviour", "Success, failure, retry and exception behaviour"] },
          { cells: ["Timing", "Why now? Is it mandatory for this release?"] },
          { cells: ["Risk", "What happens if we do not include it?"] },
        ]}
      />
      <p>One vague sentence can hide several business decisions.</p>
      <p>Tomorrow is a terrible day to discover them.</p>

      <h2>3. Impact fast &mdash; what does this touch?</h2>
      <p>You may not have days for analysis.</p>
      <p>You still need analysis.</p>
      <p>Trace the shortest useful path:</p>
      <blockquote>
        <strong>Requirement &rarr; UI &rarr; API &rarr; Data &rarr; Rules &rarr; Integrations &rarr; Tests &rarr; Operations</strong>
      </blockquote>
      <p>Ask the people closest to the impact:</p>
      <ul>
        <li>
          <strong>Engineering:</strong> Which components change?
        </li>
        <li>
          <strong>QA:</strong> Which scenarios must be rerun?
        </li>
        <li>
          <strong>Operations:</strong> Does tomorrow&rsquo;s process change?
        </li>
        <li>
          <strong>Product:</strong> What happens if we leave it out?
        </li>
        <li>
          <strong>Risk/Compliance:</strong> Is it optional, risk-driven or mandatory?
        </li>
      </ul>
      <p>Fast doesn&rsquo;t mean careless.</p>
      <p>
        It means <strong>focused</strong>.
      </p>

      <h2>4. Effort reality &mdash; how long until it is release-ready?</h2>
      <p>&ldquo;We can code it in two hours&rdquo; is not the same as:</p>
      <blockquote>&ldquo;We can safely release it in two hours.&rdquo;</blockquote>
      <p>A change may need:</p>
      <blockquote>
        <strong>development + review + build + deployment + integration testing + regression + sign-off</strong>
      </blockquote>
      <p>Ask:</p>
      <blockquote>
        <strong>&ldquo;How long until this is release-ready, not merely coded?&rdquo;</strong>
      </blockquote>
      <p>A two-hour code change can become an eight-hour release change.</p>

      <h2>5. Options &mdash; don&rsquo;t force a yes/no decision</h2>
      <p>Bring choices.</p>

      <h3>Option A &mdash; Absorb</h3>
      <p>Include the change tomorrow when the impact is small, implementation is understood, testing can finish, and risk is acceptable.</p>

      <h3>Option B &mdash; Scope swap</h3>
      <p>If the change matters but time is fixed, remove or reduce something else.</p>
      <blockquote>
        <strong>Trade scope instead of pretending capacity appeared.</strong>
      </blockquote>

      <h3>Option C &mdash; Feature flag / configuration</h3>
      <p>Implement the capability but keep it controlled or disabled until ready.</p>
      <p>Only use this when the architecture already supports it.</p>

      <h3>Option D &mdash; Defer</h3>
      <p>Keep tomorrow&rsquo;s release stable and move the change to the next release with proper testing.</p>
      <p>Sometimes the safest change is the one you don&rsquo;t rush.</p>

      <h3>Option E &mdash; Do not include it</h3>
      <p>If time cannot support safe implementation and testing, say so clearly:</p>
      <blockquote>&ldquo;We cannot demonstrate that this change can be implemented and tested safely before tomorrow&rsquo;s release.&rdquo;</blockquote>
      <p>That is not &ldquo;the BA rejected it.&rdquo;</p>
      <p>It is a risk-based recommendation.</p>

      <h2>6. Communicate &mdash; get the decision-makers together</h2>
      <p>This is not a BA-only decision.</p>
      <p>Bring together the people who understand:</p>
      <ul>
        <li>
          <strong>Business priority</strong> &rarr; Product / Business
        </li>
        <li>
          <strong>Technical impact</strong> &rarr; Engineering
        </li>
        <li>
          <strong>Quality risk</strong> &rarr; QA
        </li>
        <li>
          <strong>Release impact</strong> &rarr; Delivery / Release Management
        </li>
        <li>
          <strong>Operational impact</strong> &rarr; Operations / Support
        </li>
        <li>
          <strong>Control obligations</strong> &rarr; Risk / Compliance, when relevant
        </li>
      </ul>
      <p>The BA&rsquo;s job is to make sure everyone is deciding from the same facts.</p>
      <p>And one point matters:</p>
      <blockquote>
        <strong>The BA informs the decision. The accountable business/release owner makes the final go/no-go decision.</strong>
      </blockquote>

      <h2>7. Decide &mdash; make the decision explicit</h2>
      <p>Record:</p>
      <blockquote>
        <strong>reason &rarr; impact &rarr; owner &rarr; outcome</strong>
      </blockquote>
      <p>For example:</p>
      <blockquote>
        Address verification was requested one day before release. Engineering estimates four hours
        for implementation and review. QA needs three hours for impacted regression. The team agreed
        to defer because sufficient testing cannot be completed before the release window.
      </blockquote>
      <p>Or:</p>
      <blockquote>
        The change affects configuration only. QA confirmed impacted scenarios can be rerun before
        the release window. Product, Engineering and QA agreed to include it.
      </blockquote>
      <p>Much better than:</p>
      <blockquote>&ldquo;Business said it was urgent.&rdquo;</blockquote>

      <h2>Before giving the green signal</h2>
      <p>If the change is going into tomorrow&rsquo;s release, verify:</p>
      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <Checklist
          label="Requirement and build"
          items={[
            "Requirement and acceptance criteria are updated",
            "Final build is produced",
            "Impacted tests are updated and executed",
            "Critical/high defects are resolved or explicitly accepted",
            "Downstream systems and data are verified",
          ]}
        />
        <Checklist
          label="Operations and sign-off"
          items={[
            "Operations and Support know what changed",
            "Rollback or recovery approach is understood",
            "Business/Product accepts the release decision",
            "Decision owner and any risk exception are recorded",
          ]}
        />
      </div>
      <p>If you cannot explain the <strong>change, impact and decision</strong> clearly, you are probably not ready to release it.</p>

      <div className="not-prose my-8 flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
            Take this into your next release
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            Last-Minute Requirement Change &mdash; Release Decision Checklist
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            The full seven-step framework on one printable page: pause, understand, assess impact,
            check release-ready time, present options, communicate and decide.
          </p>
        </div>
        <div className="sm:max-w-xs">
          <DownloadCard
            icon={<ClipboardCheck className="size-4.5" aria-hidden="true" />}
            title="Release Decision Checklist"
            description="Printable A4 · Free resource · No sign-up required"
            href="/downloads/release-decision-checklist.pdf"
            filename="release-decision-checklist.pdf"
            meta="PDF · 1 page"
            cta="Download the free PDF"
            analyticsEvent="release_decision_checklist_downloaded"
          />
        </div>
      </div>

      <h2>What if Compliance says it is mandatory?</h2>
      <p>Then the constraint changes.</p>
      <p>Imagine a bank releasing a customer onboarding workflow tomorrow.</p>
      <p>Compliance discovers a mandatory screening rule was missed.</p>
      <p>You may not be able to release without it.</p>
      <p>But that does not mean:</p>
      <blockquote>&ldquo;Skip testing because Compliance said it&rsquo;s urgent.&rdquo;</blockquote>
      <p>The options may become:</p>
      <blockquote>
        <strong>fix and test &rarr; delay release &rarr; disable affected functionality</strong>
      </blockquote>
      <p>The constraint changed.</p>
      <p>The need for impact analysis didn&rsquo;t.</p>

      <h2>What if the CEO asks?</h2>
      <p>Same process.</p>
      <p>Seniority changes priority.</p>
      <p>
        <strong>It doesn&rsquo;t change physics.</strong>
      </p>
      <p>Code still has to work. Integrations still have to behave. Tests still have to pass.</p>
      <p>A useful response remains:</p>
      <blockquote>
        <strong>&ldquo;We can absolutely assess it. Here are the impacts, risks and options.&rdquo;</strong>
      </blockquote>

      <h2>The takeaway</h2>
      <p>Last-minute changes will happen.</p>
      <p>The goal isn&rsquo;t to eliminate them.</p>
      <p>It is to stop urgency from turning into chaos.</p>
      <blockquote>
        <strong>The closer you are to release, the more expensive assumptions become.</strong>
      </blockquote>
      <p>So when someone says:</p>
      <blockquote>&ldquo;The release is tomorrow. Can we just add this?&rdquo;</blockquote>
      <p>Don&rsquo;t panic. Don&rsquo;t immediately say no. And don&rsquo;t silently update Jira.</p>
      <blockquote>
        <strong>Understand the change. Expose the risk. Give the team options. Make the decision visible.</strong>
      </blockquote>
      <p>A good BA doesn&rsquo;t stop change.</p>
      <blockquote>
        <strong>A good BA helps the team change safely.</strong>
      </blockquote>
    </div>
  );
}

export { ReleaseTomorrowRequirementChangedTodayBody };
