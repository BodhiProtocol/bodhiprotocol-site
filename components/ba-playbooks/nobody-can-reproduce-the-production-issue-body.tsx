import { FileSearch } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { DownloadCard } from "@/components/ba-playbooks/download-card";

function ChecklistGroup({ label, items }: { label: string; items: string[] }) {
  return <Checklist label={label} items={items} />;
}

// Narrative walkthrough (one failed payment traced through eight investigation
// stages), not standalone tips — same bespoke-prose pattern as the other
// narrative-walkthrough playbooks. See app/ba-playbooks/[slug]/page.tsx's
// customPlaybookBodies registry. The eight PlaybookHack entries in
// nobody-can-reproduce-the-production-issue.ts drive the meta line's
// "8 practices" count and reading time; the actual walkthrough is this prose.
function NobodyCanReproduceTheProductionIssueBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>&ldquo;It works for us&rdquo;</h2>
      <p>A user reports:</p>
      <blockquote>&ldquo;Payments fail randomly.&rdquo;</blockquote>
      <p>Development tries it. Works.</p>
      <p>QA tries it. Works.</p>
      <p>UAT? Works there too.</p>
      <p>Then comes the sentence that can quietly kill an investigation:</p>
      <blockquote>
        <strong>&ldquo;We can&rsquo;t reproduce it.&rdquo;</strong>
      </blockquote>
      <p>That does <strong>not</strong> mean the issue doesn&rsquo;t exist.</p>
      <p>It means:</p>
      <blockquote>
        <strong>We haven&rsquo;t reproduced the conditions that create it yet.</strong>
      </blockquote>
      <p>That is where the investigation begins.</p>

      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/nobody-can-reproduce-the-production-issue-infographic.png"
          alt="Infographic summarising the investigation: why intermittent issues happen (environment, data, timing, hidden dependencies, user-specific conditions), the eight-step investigation path from listen and capture through prove and fix, common root-cause categories, and the before-you-close checklist."
          width={1184}
          height={1328}
          loading="lazy"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full max-w-xl rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          &ldquo;Cannot reproduce&rdquo; is not &ldquo;does not exist&rdquo; — the eight-step path from a vague report to a proven fix.
        </figcaption>
      </figure>

      <h2>Here&rsquo;s the situation</h2>
      <p>Imagine an e-commerce platform.</p>
      <p>A few customers say payments sometimes fail after they click <strong>Pay Now</strong>.</p>
      <p>No obvious pattern.</p>
      <p>QA runs twenty successful payments in UAT.</p>
      <p>Development tries locally. Success.</p>
      <p>Production monitoring shows no major outage.</p>
      <p>So what now?</p>
      <p>The mistake is running the <strong>same test again and again</strong>.</p>
      <p>The better question is:</p>
      <blockquote>
        <strong>What was different when the failure happened?</strong>
      </blockquote>
      <p>Let&rsquo;s follow one failed payment and find out.</p>

      <h2>1. Listen &amp; Capture — get the real story</h2>
      <p>Don&rsquo;t begin with:</p>
      <blockquote>&ldquo;Can you reproduce it again?&rdquo;</blockquote>
      <p>Start with what actually happened. Ask:</p>
      <ul>
        <li>What were you trying to do?</li>
        <li>When did it happen?</li>
        <li>What did you expect?</li>
        <li>What happened instead?</li>
        <li>Has it happened before?</li>
        <li>Did retrying work?</li>
      </ul>
      <p>Capture whatever evidence is available:</p>
      <blockquote>timestamp &rarr; user/reference ID &rarr; transaction/order ID &rarr; error &rarr; screenshot &rarr; sequence</blockquote>
      <p>Compare these two reports:</p>
      <blockquote>&ldquo;Payment failed yesterday.&rdquo;</blockquote>
      <p>versus:</p>
      <blockquote>&ldquo;Order 78431 failed at 14:07 after OTP verification.&rdquo;</blockquote>
      <p>The second one gives the team somewhere to start.</p>
      <p>
        <strong>Our payment case</strong> — we capture: order <strong>78431</strong>, time{" "}
        <strong>14:07</strong>, device <strong>Android</strong>, payment{" "}
        <strong>international card</strong>, failure <strong>after OTP verification</strong>.
      </p>
      <p>Already, &ldquo;random&rdquo; has become slightly less random.</p>

      <h2>2. Collect Evidence — before it disappears</h2>
      <p>Intermittent issues are easiest to investigate while the evidence still exists. Look for:</p>
      <ul>
        <li>application logs</li>
        <li>API responses</li>
        <li>correlation or trace IDs</li>
        <li>timestamps</li>
        <li>audit history</li>
        <li>monitoring</li>
        <li>request/response details where appropriate</li>
      </ul>
      <p>Don&rsquo;t collect sensitive production data casually. Use approved access, masking and security controls.</p>
      <p>The goal isn&rsquo;t <strong>more logs</strong>. The goal is to follow <strong>one failed journey</strong>.</p>
      <p>
        <strong>Our payment case</strong> — the team traces order 78431. The payment request
        reached the application. It passed OTP verification. Then a downstream payment service
        rejected the request. Now we know where to look next.
      </p>

      <h2>3. Understand Context — what was different?</h2>
      <p>The same feature can behave differently depending on its surroundings. Check the conditions around the failure:</p>
      <ul>
        <li>
          <strong>User</strong> — role, permissions, customer type
        </li>
        <li>
          <strong>Device</strong> — browser, app version, operating system
        </li>
        <li>
          <strong>Location</strong> — region, network, timezone
        </li>
        <li>
          <strong>Data</strong> — account state, amount, currency, product
        </li>
        <li>
          <strong>Timing</strong> — peak period, scheduled jobs, batch windows
        </li>
        <li>
          <strong>Sequence</strong> — what happened immediately before the failure?
        </li>
      </ul>
      <p>Maybe the issue affects only:</p>
      <blockquote>Android users on an older app version.</blockquote>
      <p>Or:</p>
      <blockquote>Customers with two addresses.</blockquote>
      <p>Or:</p>
      <blockquote>Transactions above a certain amount.</blockquote>
      <p>Or:</p>
      <blockquote>Requests arriving while a scheduled batch locks a record.</blockquote>
      <p>You are looking for a pattern hiding inside the word <strong>&ldquo;random.&rdquo;</strong></p>
      <p>
        <strong>Our payment case</strong> — the team compares successful and failed transactions. A
        clue appears: most failures involve <strong>international cards</strong>. That becomes the
        next hypothesis.
      </p>

      <h2>4. Compare Environments — don&rsquo;t compare only code</h2>
      <p>A common assumption is:</p>
      <blockquote>&ldquo;Same code, so it should behave the same.&rdquo;</blockquote>
      <p>But production can differ from UAT in:</p>
      <ul>
        <li>data</li>
        <li>configuration</li>
        <li>feature flags</li>
        <li>permissions</li>
        <li>integrations</li>
        <li>service versions</li>
        <li>traffic</li>
        <li>network behaviour</li>
        <li>schedules</li>
        <li>infrastructure</li>
      </ul>
      <p>So compare <strong>UAT vs Production</strong>, not only <strong>code vs code</strong>. Ask:</p>
      <blockquote>
        <strong>What exists in production that our test environment doesn&rsquo;t reproduce?</strong>
      </blockquote>
      <p>
        <strong>Our payment case</strong> — UAT uses a test payment provider. Production routes
        certain international payments through another provider. Same application. Different
        path. Now the investigation is getting narrower.
      </p>

      <h2>5. Replicate Smarter — recreate conditions, not just steps</h2>
      <p>The user followed:</p>
      <blockquote>Login &rarr; Select product &rarr; Pay &rarr; Failure</blockquote>
      <p>Repeating those steps may not recreate the issue. Try to match the surrounding conditions:</p>
      <ul>
        <li>same data</li>
        <li>same user type</li>
        <li>same device/app version</li>
        <li>same configuration</li>
        <li>same integration path</li>
        <li>same sequence</li>
        <li>similar timing/load where safe</li>
      </ul>
      <p>
        The goal isn&rsquo;t to copy production recklessly. It is to recreate the{" "}
        <strong>smallest set of conditions</strong> that triggers the failure.
      </p>
      <p>
        <strong>Our payment case</strong> — QA now tests: international card &rarr; same payment
        route &rarr; similar payload. The failure appears. For the first time, the team can
        reproduce it.
      </p>

      <h2>6. Increase Visibility — when the system isn&rsquo;t telling you enough</h2>
      <p>Sometimes you can&rsquo;t reproduce an issue because the system doesn&rsquo;t expose enough evidence. That itself is useful information. The team may need:</p>
      <ul>
        <li>better structured logging</li>
        <li>correlation IDs</li>
        <li>metrics</li>
        <li>alerts</li>
        <li>audit events</li>
        <li>temporary diagnostics</li>
        <li>safer feature-level monitoring</li>
      </ul>
      <p>A BA doesn&rsquo;t need to design the observability platform. But a BA can ask:</p>
      <blockquote>
        <strong>&ldquo;If this happens again, what evidence will we need to prove where it failed?&rdquo;</strong>
      </blockquote>
      <p>That can become a requirement.</p>

      <h2>7. Isolate &amp; Narrow — change one thing at a time</h2>
      <p>Once you have a hypothesis, narrow it. Suppose international payments look suspicious. Compare:</p>
      <ul>
        <li>Domestic vs international.</li>
        <li>One currency vs another.</li>
        <li>Mobile vs web.</li>
        <li>Existing customer vs new customer.</li>
        <li>Payment provider A vs provider B.</li>
        <li>One configuration vs another.</li>
      </ul>
      <p>Don&rsquo;t change five variables together. You are trying to turn:</p>
      <blockquote>&ldquo;It fails sometimes.&rdquo;</blockquote>
      <p>into:</p>
      <blockquote>
        <strong>&ldquo;It fails when these conditions are true.&rdquo;</strong>
      </blockquote>
      <p>
        <strong>Our payment case</strong> — the team eventually isolates this: international card +
        specific payment provider + address containing a special character. Now the failure is no
        longer random.
      </p>

      <h2>8. Prove &amp; Fix — don&rsquo;t stop at &ldquo;probably&rdquo;</h2>
      <p>
        The root cause is found. A downstream payment service rejects certain address characters
        because of an encoding issue. Now we have:
      </p>
      <blockquote>trigger &rarr; failure point &rarr; root cause</blockquote>
      <p>The team fixes it. But don&rsquo;t stop there. Verify that:</p>
      <ol>
        <li>the original failing condition now succeeds</li>
        <li>related scenarios still work</li>
        <li>the fix behaves correctly under production-like conditions</li>
        <li>monitoring can detect recurrence where appropriate</li>
      </ol>
      <blockquote>
        <strong>&ldquo;Developer says fixed&rdquo; isn&rsquo;t closure.</strong>
      </blockquote>
      <p>
        <strong>Evidence is closure.</strong>
      </p>

      <h2>Common places to investigate</h2>
      <p>When you don&rsquo;t yet have a strong hypothesis, look across a few broad areas.</p>
      <ul>
        <li>
          <strong>Data</strong> — nulls, unexpected formats, boundary values, old or migrated
          records
        </li>
        <li>
          <strong>Configuration</strong> — feature flags, environment variables, thresholds,
          routing rules
        </li>
        <li>
          <strong>Code / Logic</strong> — edge cases, race conditions, error handling, state
          transitions
        </li>
        <li>
          <strong>Dependencies</strong> — third-party services, timeouts, network issues, version
          differences
        </li>
        <li>
          <strong>User / Access</strong> — permissions, roles, entitlements, customer segments
        </li>
        <li>
          <strong>Timing / Load</strong> — peak traffic, scheduled jobs, asynchronous processing,
          concurrency
        </li>
      </ul>
      <p>Don&rsquo;t blindly tick boxes. Use these areas to generate <strong>better hypotheses</strong>.</p>

      <h2>The BA mistake to avoid</h2>
      <p>A user says:</p>
      <blockquote>&ldquo;It failed.&rdquo;</blockquote>
      <p>The team says:</p>
      <blockquote>&ldquo;We tested it and it works.&rdquo;</blockquote>
      <p>Both statements can be true.</p>
      <p>Don&rsquo;t turn the investigation into a debate about who is right. Ask:</p>
      <blockquote>
        <strong>&ldquo;What was different when it failed?&rdquo;</strong>
      </blockquote>
      <p>Stay curious. Not defensive.</p>

      <h2>Before you close the issue</h2>

      <div className="not-prose my-6 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <ChecklistGroup
          label="Readiness"
          items={[
            "Can we explain the root cause?",
            "Can we reproduce the trigger, or prove it from evidence?",
            "Has the original failing condition been verified after the fix?",
            "Have related scenarios been checked?",
            "Is monitoring sufficient if it happens again?",
            "Have affected users or business teams been informed?",
            "Has the learning been documented?",
          ]}
        />
      </div>

      <p>Sometimes an intermittent problem cannot be made perfectly deterministic. That&rsquo;s okay.</p>
      <p>
        Closure should still be based on <strong>evidence&mdash;not exhaustion</strong>.
      </p>

      <h2>The Production Issue Investigation Playbook</h2>
      <ul>
        <li>
          <strong>Listen &amp; Capture</strong> &rarr; Get the exact story.
        </li>
        <li>
          <strong>Collect Evidence</strong> &rarr; Preserve the failed journey.
        </li>
        <li>
          <strong>Understand Context</strong> &rarr; Find the conditions around it.
        </li>
        <li>
          <strong>Compare Environments</strong> &rarr; Identify what differs.
        </li>
        <li>
          <strong>Replicate Smarter</strong> &rarr; Recreate conditions, not merely steps.
        </li>
        <li>
          <strong>Increase Visibility</strong> &rarr; Capture the evidence you&rsquo;re missing.
        </li>
        <li>
          <strong>Isolate &amp; Narrow</strong> &rarr; Find the trigger.
        </li>
        <li>
          <strong>Prove &amp; Fix</strong> &rarr; Confirm, fix and verify.
        </li>
      </ul>

      <h2>Production Issue Investigation Checklist</h2>
      <p>Copy this into Jira, Confluence or your incident notes.</p>

      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <ChecklistGroup
          label="Listen & capture"
          items={[
            "What the user was trying to do captured",
            "Timestamp, user/reference ID and transaction/order ID recorded",
            "Expected vs actual behaviour written down",
            "Screenshot or error captured",
          ]}
        />
        <ChecklistGroup
          label="Collect evidence"
          items={[
            "Application logs pulled",
            "API responses captured",
            "Correlation or trace IDs found",
            "One failed journey followed end to end",
          ]}
        />
        <ChecklistGroup
          label="Understand context"
          items={[
            "User role and permissions checked",
            "Device, browser and app version checked",
            "Location, network and timezone checked",
            "Data and account state checked",
            "Timing (peak period, batch, schedule) checked",
            "Sequence immediately before the failure reviewed",
          ]}
        />
        <ChecklistGroup
          label="Compare environments"
          items={[
            "UAT vs Production data compared",
            "Configuration and feature flags compared",
            "Integrations and service versions compared",
            "Traffic, infrastructure and scheduling compared",
          ]}
        />
        <ChecklistGroup
          label="Replicate smarter"
          items={[
            "Same data, user type and device recreated",
            "Same configuration and integration path recreated",
            "Same sequence and timing recreated",
            "Smallest failing condition reproduced",
          ]}
        />
        <ChecklistGroup
          label="Isolate & narrow"
          items={[
            "One variable changed at a time",
            "Trigger condition documented",
            "“Fails sometimes” turned into “fails when X is true”",
          ]}
        />
        <ChecklistGroup
          label="Prove & fix"
          items={[
            "Root cause explained",
            "Original failing condition verified after the fix",
            "Related scenarios checked",
            "Monitoring updated to detect recurrence",
          ]}
        />
        <ChecklistGroup
          label="Close properly"
          items={["Affected users or business teams informed", "Learning documented"]}
        />
      </div>

      <div className="not-prose my-8 flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
            Take this into your next investigation
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            Production Issue Investigation Checklist
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            A one-page field guide for BAs, QAs, developers and support teams investigating
            intermittent or hard-to-reproduce production issues.
          </p>
        </div>
        <div className="sm:max-w-xs">
          <DownloadCard
            icon={<FileSearch className="size-4.5" aria-hidden="true" />}
            title="Production Issue Investigation Checklist"
            description="Printable A4 · Free resource · No sign-up required"
            href="/downloads/production-issue-investigation-checklist.pdf"
            filename="production-issue-investigation-checklist.pdf"
            meta="PDF · 1 page"
            cta="Download the free PDF"
            analyticsEvent="production_issue_investigation_checklist_downloaded"
          />
        </div>
      </div>

      <h2>The takeaway</h2>
      <p>&ldquo;Cannot reproduce&rdquo; is not a root cause.</p>
      <p>It is an investigation status.</p>
      <blockquote>
        <strong>If the user is facing it, the problem is real&mdash;even when your test passes.</strong>
      </blockquote>
      <p>Don&rsquo;t keep repeating the same test and hoping the bug appears.</p>
      <p>Capture the failed journey. Compare the conditions. Find what changed. Narrow the trigger. Then prove it.</p>
      <blockquote>
        <strong>
          A good investigation turns &ldquo;random&rdquo; into a pattern&mdash;and a pattern into a
          fix.
        </strong>
      </blockquote>
    </div>
  );
}

export { NobodyCanReproduceTheProductionIssueBody };
