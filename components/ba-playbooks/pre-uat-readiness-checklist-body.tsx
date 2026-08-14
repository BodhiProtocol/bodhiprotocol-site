import { ClipboardCheck } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { DownloadCard } from "@/components/ba-playbooks/download-card";

function ChecklistGroup({ label, items }: { label: string; items: string[] }) {
  return <Checklist label={label} items={items} />;
}

function PreUatReadinessChecklistBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>UAT scheduled is not the same thing as UAT ready</h2>
      <p>The calendar says UAT starts tomorrow.</p>
      <p>Test cases are written.</p>
      <p>Business users have blocked their calendars.</p>
      <p>Everyone says:</p>
      <blockquote>&ldquo;We&rsquo;re ready.&rdquo;</blockquote>
      <p>Monday morning arrives.</p>
      <p>The first tester logs in. Their account doesn&rsquo;t work.</p>
      <p>Another tester discovers the test customer doesn&rsquo;t exist.</p>
      <p>The API points to the wrong service.</p>
      <p>A feature flag is still off.</p>
      <p>By lunchtime, nobody is testing the requirement.</p>
      <p>They&rsquo;re testing whether the <strong>test setup</strong> works.</p>
      <p>That&rsquo;s the difference between:</p>
      <blockquote>
        <strong>UAT scheduled</strong>
      </blockquote>
      <p>and</p>
      <blockquote>
        <strong>UAT ready.</strong>
      </blockquote>

      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/pre-uat-readiness-checklist-infographic.png"
          alt="Infographic summarising the pre-UAT readiness framework: why a one-hour check matters, the eight-part BA pre-UAT checklist (Scope and Build, Test Cases, Test Data, Environment, Access and Roles, Integrations, Configuration, Stakeholder Alignment), common gaps that break UAT, the final checklist before saying 'Start UAT,' and the reminder to check smart, test better, deliver with confidence."
          width={1024}
          height={1536}
          loading="lazy"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full max-w-xl rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          UAT doesn&rsquo;t start on Day 1 — it starts when the BA says &ldquo;we are ready,&rdquo; and can prove it.
        </figcaption>
      </figure>

      <h2>First: what is UAT actually proving?</h2>
      <p>User Acceptance Testing isn&rsquo;t another round of developer testing.</p>
      <p>It answers a business question:</p>
      <blockquote>
        <strong>
          &ldquo;Does this solution support the real business need well enough for us to accept
          it?&rdquo;
        </strong>
      </blockquote>
      <p>That needs more than a working build.</p>
      <p>You need the right scope, scenarios, data, environment, users, integrations and configuration.</p>
      <p>If one is wrong, UAT can tell you the wrong story.</p>

      <h2>Here&rsquo;s the situation</h2>
      <p>Imagine a bank is introducing a new beneficiary-verification flow.</p>
      <p>The requirement says:</p>
      <blockquote>Transfers above &#8377;2 lakh to a new beneficiary require additional verification.</blockquote>
      <p>Development is complete. System testing passed. UAT begins tomorrow.</p>
      <p>Before saying <strong>&ldquo;go,&rdquo;</strong> what should the BA check?</p>

      <h2>1. Scope &amp; Build — are we testing the right thing?</h2>
      <p>Start with the requirement. Ask:</p>
      <ul>
        <li>What exactly is in UAT scope, and what is explicitly out?</li>
        <li>Which stories or requirements are included?</li>
        <li>Are late changes reflected, and does the deployed build actually contain them?</li>
        <li>Are known limitations documented?</li>
      </ul>
      <p>
        Imagine QA tested version 4.8, but UAT accidentally receives 4.7. Every failure after that
        creates noise.
      </p>
      <blockquote>
        <strong>Before UAT: confirm the requirement scope and deployed build match.</strong>
      </blockquote>

      <h2>2. Test Cases — are we testing the business, not just the happy path?</h2>
      <p>Good UAT scenarios represent how people actually use the system.</p>
      <p>For our transfer example, don&rsquo;t test only:</p>
      <blockquote>New beneficiary + &#8377;3 lakh &rarr; verification appears.</blockquote>
      <p>Also test:</p>
      <ul>
        <li>
          <strong>Boundary:</strong> exactly &#8377;2 lakh.
        </li>
        <li>
          <strong>Below threshold:</strong> &#8377;1,99,999.
        </li>
        <li>
          <strong>Existing beneficiary:</strong> should verification apply?
        </li>
        <li>
          <strong>Failure:</strong> verification service unavailable.
        </li>
        <li>
          <strong>Retry:</strong> user fails verification and tries again.
        </li>
        <li>
          <strong>Permissions:</strong> can the right user perform the action?
        </li>
        <li>
          <strong>End-to-end:</strong> does the transfer continue correctly afterwards?
        </li>
      </ul>
      <p>A useful BA question:</p>
      <blockquote>
        <strong>&ldquo;What would make the business refuse to accept this feature?&rdquo;</strong>
      </blockquote>
      <p>Turn those risks into scenarios.</p>

      <h2>3. Test Data — can those scenarios actually be executed?</h2>
      <p>This is one of the biggest UAT killers. The scenario exists. The data doesn&rsquo;t.</p>
      <p>Map important scenarios to the data they require:</p>
      <ul>
        <li>New beneficiary &rarr; customer with no prior beneficiary</li>
        <li>Above threshold &rarr; account with sufficient balance</li>
        <li>Existing beneficiary &rarr; customer with a saved beneficiary</li>
        <li>Failed verification &rarr; test identity that triggers failure</li>
        <li>Permission check &rarr; user with a restricted role</li>
      </ul>
      <p>And verify the data actually works. Not:</p>
      <blockquote>&ldquo;Someone said it was loaded.&rdquo;</blockquote>
      <p>Actually validate it. Use approved masked or synthetic data where required.</p>

      <h2>4. Environment — is it stable enough to trust the result?</h2>
      <p>A bad environment can make a good feature look broken. Check:</p>
      <ul>
        <li>Correct build deployed, environment accessible, database available</li>
        <li>Required services running, no known blocking outage</li>
        <li>Test data refreshed correctly, URLs and endpoints correct</li>
        <li>No uncoordinated changes during critical testing</li>
      </ul>
      <p>The environment doesn&rsquo;t need to be perfect. It needs to be stable enough that:</p>
      <blockquote>
        <strong>failure means something.</strong>
      </blockquote>

      <h2>5. Access &amp; Roles — can the testers actually test?</h2>
      <p>Never assume:</p>
      <blockquote>&ldquo;They had access last time.&rdquo;</blockquote>
      <p>Before Day 1, check:</p>
      <ul>
        <li>Are users created, and can they log in?</li>
        <li>Are roles and permissions correct?</li>
        <li>Can they access dependent systems?</li>
        <li>Is MFA/VPN working, and are segregation-of-duties rules respected?</li>
      </ul>
      <p>Eight business users discovering an access problem during the UAT call is not testing.</p>
      <p>It&rsquo;s troubleshooting.</p>

      <h2>6. Integrations — can the whole journey complete?</h2>
      <p>Your feature may work perfectly. But UAT usually tests a <strong>journey</strong>.</p>
      <p>For example:</p>
      <blockquote>Portal &rarr; Verification API &rarr; Core System &rarr; Notification Service</blockquote>
      <p>If the notification service isn&rsquo;t connected, the journey isn&rsquo;t ready.</p>
      <p>Ask:</p>
      <blockquote>
        <strong>&ldquo;What other system must work for this scenario to finish?&rdquo;</strong>
      </blockquote>
      <p>Check critical upstream and downstream dependencies before testers arrive.</p>

      <h2>7. Configuration — does UAT reflect the intended business setup?</h2>
      <p>Configuration can quietly invalidate otherwise perfect testing. Check:</p>
      <ul>
        <li>Feature flags, thresholds, business rules</li>
        <li>Product configuration, reference data, routing</li>
        <li>Currencies/countries, dates/calendars, user entitlements</li>
      </ul>
      <p>Suppose the requirement says verification above &#8377;2 lakh, but UAT is configured for &#8377;5 lakh.</p>
      <p>The code may be perfect. The test will still tell the wrong story.</p>

      <h2>8. Stakeholders — does everyone know how UAT will work?</h2>
      <p>Technology can be ready while UAT still fails operationally. Before starting, everyone should know:</p>
      <ul>
        <li>What are we testing, and who is testing what?</li>
        <li>Where are results recorded, and how are defects raised?</li>
        <li>Who triages them, and what counts as a blocker?</li>
        <li>Who decides acceptance?</li>
      </ul>
      <p>Also identify the support path: engineering, QA, BA, environment support, data support and integration teams.</p>
      <p>You don&rsquo;t need everyone in every meeting.</p>
      <p>
        You need to know <strong>who to call when something breaks.</strong>
      </p>

      <h2>Don&rsquo;t ask if it&rsquo;s ready. Ask what proves it.</h2>
      <p>This is where the BA can make a big difference.</p>
      <p>Instead of:</p>
      <blockquote>&ldquo;Is the environment ready?&rdquo;</blockquote>
      <p>look for evidence:</p>
      <ul>
        <li>Login tested.</li>
        <li>Build verified.</li>
        <li>Endpoint checked.</li>
        <li>Test data validated.</li>
        <li>Critical scenario executed.</li>
      </ul>
      <p>&ldquo;Someone confirmed it&rdquo; is assurance. &ldquo;Someone demonstrated it&rdquo; is evidence.</p>
      <p>A useful BA habit:</p>
      <blockquote>
        <strong>Don&rsquo;t ask whether something is ready. Ask what proves it is ready.</strong>
      </blockquote>

      <h2>Define the exit before you enter</h2>
      <p>One question teams often leave until too late:</p>
      <blockquote>
        <strong>&ldquo;What does successful UAT look like?&rdquo;</strong>
      </blockquote>
      <p>Agree that before testing starts. Exit criteria might include:</p>
      <ul>
        <li>Critical business scenarios executed</li>
        <li>No open Severity 1 defects</li>
        <li>Agreed treatment for remaining defects</li>
        <li>Required business sign-off obtained</li>
        <li>Evidence stored, known limitations accepted</li>
      </ul>
      <p>Exact rules vary by organisation. But if nobody knows what &ldquo;UAT complete&rdquo; means, sign-off becomes an argument at the end.</p>

      <h2>What should the BA personally own?</h2>
      <p>The BA should not become:</p>
      <blockquote>environment engineer + test-data engineer + access administrator + QA lead + release manager</blockquote>
      <p>That isn&rsquo;t the job. The BA&rsquo;s role is to make readiness visible.</p>
      <p>You may not provision the environment. But you should know whether it&rsquo;s ready.</p>
      <p>You may not create user accounts. But you should know whether testers can log in.</p>
      <p>You may not configure the API. But you should know whether the business journey can execute.</p>
      <p>Think:</p>
      <blockquote>
        <strong>coordinate, verify, expose gaps.</strong>
      </blockquote>
      <p>Not:</p>
      <blockquote>
        <strong>personally do everything.</strong>
      </blockquote>

      <h2>Run a UAT readiness check</h2>
      <p>Before UAT, bring the key people together for a short readiness review. Walk through Scope &amp; Build, Scenarios, Data, Environment, Access, Integrations, Configuration, Business users, Support path and Exit criteria.</p>
      <p>Don&rsquo;t turn this into a two-hour status meeting.</p>
      <p>You&rsquo;re trying to answer one question:</p>
      <blockquote>
        <strong>&ldquo;What could prevent meaningful testing tomorrow?&rdquo;</strong>
      </blockquote>
      <p>Find it today.</p>

      <h2>Go / Conditional Go / No-Go</h2>
      <p>Readiness doesn&rsquo;t always have to be binary.</p>
      <div className="not-prose my-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4">
          <p className="mb-1.5 font-mono text-xs font-bold tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
            GO
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">
            Critical prerequisites are ready. Start UAT.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4">
          <p className="mb-1.5 font-mono text-xs font-bold tracking-[0.08em] text-amber-600 dark:text-amber-400">
            CONDITIONAL GO
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">
            A known gap exists, but meaningful testing can continue safely around it. Document the
            limitation and continue.
          </p>
        </div>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-4">
          <p className="mb-1.5 font-mono text-xs font-bold tracking-[0.08em] text-red-600 dark:text-red-400">
            NO-GO
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">
            A prerequisite prevents meaningful testing — wrong build, unusable test data, a
            critical integration unavailable, testers who can&rsquo;t access the system.
          </p>
        </div>
      </div>
      <p>
        Postponing UAT by a day can be cheaper than wasting ten people&rsquo;s day pretending to
        test.
      </p>

      <h2>Before you say &ldquo;Start UAT&rdquo;</h2>
      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <ChecklistGroup
          label="Scope, scenarios & data"
          items={[
            "Scope is clear and correct build is deployed",
            "Critical business scenarios are covered",
            "Expected results are clear",
            "Test data is available and validated",
          ]}
        />
        <ChecklistGroup
          label="Environment & access"
          items={[
            "Environment is accessible and stable",
            "Test users can log in",
            "Roles and permissions are correct",
            "Critical integrations work",
          ]}
        />
        <ChecklistGroup
          label="Configuration"
          items={["Configuration and feature flags are correct"]}
        />
        <ChecklistGroup
          label="People & process"
          items={[
            "Business testers know their responsibilities",
            "Defect and triage process is understood",
            "UAT exit criteria are agreed",
            "Support contacts are known",
          ]}
        />
      </div>
      <p>If several answers are:</p>
      <blockquote>&ldquo;We think so.&rdquo;</blockquote>
      <p>you&rsquo;re probably not ready.</p>

      <div className="not-prose my-8 flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
            Take this into your next readiness review
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            Pre-UAT Readiness Checklist
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            Scope and build, scenarios, data, environment, access, integrations, configuration and
            stakeholders — on one printable page, ending in a GO / Conditional Go / No-Go call.
          </p>
        </div>
        <div className="sm:max-w-xs">
          <DownloadCard
            icon={<ClipboardCheck className="size-4.5" aria-hidden="true" />}
            title="Pre-UAT Readiness Checklist"
            description="Printable A4 · Free resource · No sign-up required"
            href="/downloads/pre-uat-readiness-checklist.pdf"
            filename="pre-uat-readiness-checklist.pdf"
            meta="PDF · 1 page"
            cta="Download the free PDF"
            analyticsEvent="pre_uat_readiness_checklist_downloaded"
          />
        </div>
      </div>

      <h2>The takeaway</h2>
      <p>Good UAT doesn&rsquo;t begin because the calendar says:</p>
      <blockquote>
        <strong>Day 1</strong>
      </blockquote>
      <p>
        It begins when business users can execute meaningful scenarios and trust what the results
        are telling them.
      </p>
      <p>So before asking:</p>
      <blockquote>&ldquo;Are the business users ready to test?&rdquo;</blockquote>
      <p>ask:</p>
      <blockquote>
        <strong>&ldquo;Have we made it possible for them to test properly?&rdquo;</strong>
      </blockquote>
      <p>That&rsquo;s the BA&rsquo;s job here.</p>
      <p>Not to personally fix every environment, account, API or dataset.</p>
      <p>To make readiness visible before those gaps waste everyone&rsquo;s time.</p>
      <blockquote>
        <strong>
          UAT isn&rsquo;t ready because the test plan exists. It&rsquo;s ready when the business
          can test the right thing, with the right data, in the right conditions — and the team
          has evidence to prove it.
        </strong>
      </blockquote>
    </div>
  );
}

export { PreUatReadinessChecklistBody };
