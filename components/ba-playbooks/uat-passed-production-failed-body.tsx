import { FileSearch } from "lucide-react";
import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { DownloadCard } from "@/components/ba-playbooks/download-card";

interface ComparisonRow {
  cells: string[];
}

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
}

// This playbook traces one real transaction through actual comparison tables,
// not standalone tips — so like the other narrative-walkthrough playbooks it
// renders as flowing prose instead of numbered hack cards. See
// app/ba-playbooks/[slug]/page.tsx's customPlaybookBodies registry. Markdown
// tables from the source article become this small local ComparisonTable
// (not a shared component — no other playbook has real tables yet), wrapped
// in overflow-x-auto so wide rows scroll instead of breaking mobile layout.
function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {columns.map((column) => (
              <th
                key={column}
                className="px-3 py-2.5 font-mono text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index > 0 ? "border-t border-border" : undefined}>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5 align-top text-foreground/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChecklistGroup({ label, items }: { label: string; items: string[] }) {
  return <Checklist label={label} items={items} />;
}

function UatPassedProductionFailedBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>&ldquo;But we tested it&rdquo; is the start of the investigation, not the end</h2>
      <p>Monday morning.</p>
      <p>A message appears in the project group:</p>
      <blockquote>&ldquo;Customers cannot cancel some orders. This worked in UAT. What changed?&rdquo;</blockquote>
      <p>QA says:</p>
      <blockquote>&ldquo;We tested cancellation. It passed.&rdquo;</blockquote>
      <p>Development says:</p>
      <blockquote>&ldquo;The same code went to production.&rdquo;</blockquote>
      <p>Operations says:</p>
      <blockquote>&ldquo;Real customers are still affected.&rdquo;</blockquote>
      <p>Everyone may be telling the truth.</p>
      <p>That is what makes this kind of incident confusing.</p>
      <p>
        The feature can pass UAT and still fail in production&mdash;not because UAT was useless,
        but because production is rarely just UAT with more users.
      </p>
      <p>It has different data, integrations, permissions, configuration, timing and volume.</p>
      <blockquote>
        <strong>Same code does not mean the same system.</strong>
      </blockquote>
      <p>Let&rsquo;s investigate one incident together.</p>

      <h2>Here&rsquo;s the requirement</h2>
      <p>An Indian e-commerce company introduces self-service order cancellation.</p>
      <p>The requirement says:</p>
      <blockquote>A customer can cancel an order until it has been dispatched.</blockquote>
      <p>The team builds the feature.</p>
      <p>In UAT, QA tests orders with these statuses:</p>
      <ul>
        <li>
          <strong>PLACED</strong> &rarr; cancellation allowed
        </li>
        <li>
          <strong>READY_TO_PACK</strong> &rarr; cancellation allowed
        </li>
        <li>
          <strong>DISPATCHED</strong> &rarr; cancellation blocked
        </li>
      </ul>
      <p>Everything passes.</p>
      <p>The feature goes live.</p>
      <p>
        Then a customer tries to cancel a &#8377;2,499 shoe order. The order has not been
        dispatched, but the <strong>Cancel order</strong> button is missing.
      </p>
      <p>So what happened?</p>

      <h2>First, understand what UAT actually proved</h2>
      <p>UAT proved that the feature behaved as expected:</p>
      <ul>
        <li>with the data used in UAT</li>
        <li>against the UAT integrations</li>
        <li>under UAT configuration</li>
        <li>with the tested user roles</li>
        <li>for the scenarios the team knew to test</li>
      </ul>
      <p>That matters.</p>
      <p>But it did not prove that production would send the same data through the same path under the same conditions.</p>
      <blockquote>
        <strong>
          UAT tests expected behaviour in a controlled world. Production introduces the world you
          did not fully control.
        </strong>
      </blockquote>
      <p>That does not automatically make this a testing failure.</p>
      <p>It means the investigation should begin with differences, not blame.</p>

      <h2>Before the investigation: protect the customer</h2>
      <p>
        If the failure is causing financial loss, exposing data, blocking critical work or
        affecting many users, containment comes first.
      </p>
      <p>The team may need to disable the feature, pause processing, roll back the release or provide a temporary workaround.</p>
      <p>The BA can help establish:</p>
      <ul>
        <li>who is affected</li>
        <li>which products, regions and channels are involved</li>
        <li>whether money, data, compliance or customer commitments are at risk</li>
        <li>what behaviour is safe until the cause is understood</li>
      </ul>
      <p>Preserve evidence, but do not keep a harmful feature running just to make the investigation easier.</p>

      <h2>Step 1: Preserve the failing example</h2>
      <p>Before anyone refreshes data, retries the transaction or changes configuration, capture one real failure.</p>
      <p>For our order, record:</p>
      <ul>
        <li>order ID</li>
        <li>customer and account type</li>
        <li>date and exact time</li>
        <li>channel: web, Android, iOS or API</li>
        <li>status shown to the customer</li>
        <li>status received from the warehouse system</li>
        <li>expected behaviour</li>
        <li>actual behaviour</li>
        <li>screenshot or error message</li>
        <li>release and configuration version</li>
      </ul>
      <p>Do not start with:</p>
      <blockquote>&ldquo;Cancellation is broken.&rdquo;</blockquote>
      <p>Start with:</p>
      <blockquote>
        &ldquo;For order IN-48217, at 10:42 IST, the customer could not cancel through the Android
        app even though the order had not been dispatched.&rdquo;
      </blockquote>
      <p>Now the team has something it can trace.</p>
      <p>Without a specific example, every team investigates a slightly different problem.</p>

      <h2>Step 2: Follow the transaction&mdash;not the opinions</h2>
      <p>The customer sees no cancellation button.</p>
      <p>That does not mean the screen is the problem.</p>
      <p>The button may depend on a decision made several systems earlier.</p>
      <p>
        For order <strong>IN-48217</strong>, the team traces the path:
      </p>
      <ol>
        <li>The app requests the latest order details.</li>
        <li>The order service retrieves the fulfilment status.</li>
        <li>
          The warehouse system returns <strong>ALLOCATED</strong>.
        </li>
        <li>The cancellation rule checks whether that status is cancellable.</li>
        <li>
          <strong>ALLOCATED</strong> is not in the permitted-status list.
        </li>
        <li>
          The service returns <code>canCancel: false</code>.
        </li>
        <li>The app hides the button.</li>
      </ol>
      <p>The screen behaved correctly based on the answer it received.</p>
      <p>The first meaningful difference appeared earlier: the production warehouse returned a status nobody had used in UAT.</p>
      <blockquote>
        <strong>Do not ask only where the failure became visible. Ask where the behaviour first became different.</strong>
      </blockquote>

      <h2>Step 3: Compare UAT and production side by side</h2>
      <p>&ldquo;The environments are the same&rdquo; is not evidence.</p>
      <p>Build a small comparison table.</p>
      <ComparisonTable
        columns={["Area", "UAT", "Production", "Difference?"]}
        rows={[
          { cells: ["Order status", "READY_TO_PACK", "ALLOCATED", "Yes"] },
          { cells: ["Warehouse integration", "Test stub", "Live warehouse platform", "Yes"] },
          { cells: ["Cancellation rule", "Known statuses allowed", "Same configured list", "No"] },
          { cells: ["Customer role", "Test customer", "Retail customer", "No"] },
          { cells: ["Channel", "Web and Android", "Android", "No"] },
          { cells: ["Feature flag", "Enabled", "Enabled", "No"] },
          { cells: ["Release version", "5.8.0", "5.8.0", "No"] },
        ]}
      />
      <p>This changes the conversation.</p>
      <p>The team is no longer debating whether &ldquo;the same code&rdquo; was deployed.</p>
      <p>It is looking at the conditions around that code&mdash;because the code is only one part of the behaviour.</p>

      <h2>Step 4: Check the seven places production commonly differs</h2>
      <p>You do not need to inspect everything randomly. Work through seven areas.</p>

      <h3>1. Data</h3>
      <p>
        Look for values that never appeared in UAT, missing fields, historical records, duplicates
        and unexpected formats. In our example, <strong>ALLOCATED</strong> existed in production
        but not in the UAT test set.
      </p>

      <h3>2. Integrations</h3>
      <p>
        UAT may use a stub, simulator or simplified downstream system. Compare API versions,
        fields, mappings, authentication, timeouts and retries. Here, the stub returned three
        clean statuses; the live warehouse returned more.
      </p>

      <h3>3. Configuration and feature flags</h3>
      <p>
        The code can be identical while settings change its behaviour. Compare business-rule
        values, thresholds, country or product settings, feature flags and routing rules.
      </p>

      <h3>4. User roles and permissions</h3>
      <p>
        A feature tested with an administrator account may behave differently for a real customer,
        operations user or branch employee.
      </p>
      <p>Check both what the user can see and what the service account can access.</p>

      <h3>5. Timing</h3>
      <p>
        Some failures exist only at a particular moment: a batch run, stale cache, cut-off time,
        time-zone conversion, event-order problem or concurrent update.
      </p>
      <p>
        An Indian payment processed at 11:58 PM IST and an international payment processed near a
        daylight-saving change can expose timing assumptions that ordinary daytime UAT never touched.
      </p>

      <h3>6. Volume and concurrency</h3>
      <p>One clean test transaction is not the same as thousands of customers acting together.</p>
      <p>Production may introduce queues, locking, delayed messages, duplicate events or timeouts.</p>

      <h3>7. Deployment</h3>
      <p>
        Confirm the application version, database scripts, configuration, reference data,
        scheduled jobs and dependent releases that actually reached production.
      </p>
      <p>&ldquo;It was included in the release&rdquo; and &ldquo;it is active in production&rdquo; are not always the same statement.</p>

      <h2>Step 5: Return to the requirement</h2>
      <p>Now reread the original sentence:</p>
      <blockquote>A customer can cancel an order until it has been dispatched.</blockquote>
      <p>It sounds clear.</p>
      <p>
        But the system did not implement the word <strong>dispatched</strong>. It implemented a
        list of statuses believed to mean &ldquo;not dispatched.&rdquo;
      </p>
      <p>
        That list did not include <strong>ALLOCATED</strong>.
      </p>
      <p>This is the hidden gap:</p>
      <ComparisonTable
        columns={["Business rule", "System interpretation"]}
        rows={[
          {
            cells: [
              "Allow cancellation before dispatch",
              "Allow cancellation only for PLACED and READY_TO_PACK",
            ],
          },
        ]}
      />
      <p>Those statements looked equivalent in UAT.</p>
      <p>Production revealed that they were not.</p>
      <p>The missing question was:</p>
      <blockquote>
        &ldquo;What are all the statuses an order can have before dispatch&mdash;including
        statuses returned only by the live warehouse?&rdquo;
      </blockquote>
      <p>Sometimes production does not invalidate the requirement.</p>
      <p>It reveals an assumption hiding inside it.</p>

      <h2>Step 6: Classify the issue correctly</h2>
      <p>Not every production mismatch is simply &ldquo;a bug.&rdquo;</p>
      <p>Classify it so the right action follows.</p>
      <ComparisonTable
        columns={["Classification", "What it means", "Example"]}
        rows={[
          {
            cells: [
              "Code defect",
              "The system violates an agreed rule",
              "DISPATCHED orders can still be cancelled",
            ],
          },
          {
            cells: [
              "Requirement gap",
              "A scenario or rule was never defined",
              "ALLOCATED was not mapped to cancellable or non-cancellable",
            ],
          },
          {
            cells: [
              "Test coverage gap",
              "The rule existed but the scenario was not tested",
              "ALLOCATED was documented but absent from UAT",
            ],
          },
          {
            cells: [
              "Configuration issue",
              "The correct rule is configured differently",
              "Production feature flag is disabled",
            ],
          },
          {
            cells: [
              "Data issue",
              "Unexpected or incorrect data drives the behaviour",
              "Warehouse sends an invalid status",
            ],
          },
          {
            cells: [
              "Deployment issue",
              "Part of the release is missing or inactive",
              "Reference-data update was not deployed",
            ],
          },
        ]}
      />
      <p>For our incident, the immediate failure is a missing status mapping.</p>
      <p>But the deeper issue is shared:</p>
      <ul>
        <li>the requirement did not enumerate fulfilment states</li>
        <li>the UAT stub did not represent the live status set</li>
        <li>
          the test pack did not include <strong>ALLOCATED</strong>
        </li>
      </ul>
      <p>Calling it only a &ldquo;UI bug&rdquo; would fix the symptom and preserve the conditions that created it.</p>
      <p>One incident can have several contributing causes. Classification is meant to improve the fix, not assign the blame neatly to one team.</p>

      <h2>Step 7: Fix the rule, the test and the environment</h2>
      <p>
        The team decides that <strong>ALLOCATED</strong> still means &ldquo;not dispatched.&rdquo;
      </p>
      <p>So it:</p>
      <ol>
        <li>
          adds <strong>ALLOCATED</strong> to the cancellable mapping
        </li>
        <li>confirms the decision with fulfilment and customer-service owners</li>
        <li>updates the business-rule documentation</li>
        <li>adds the status to the UAT test data</li>
        <li>replaces the simplified stub response set with the complete production status list</li>
        <li>adds monitoring for unknown fulfilment statuses</li>
        <li>retests cancellation across web, Android, iOS and API channels</li>
      </ol>
      <p>Now the fix does more than restore one missing button.</p>
      <p>It makes the same class of failure easier to prevent and detect.</p>

      <h2>The same pattern appears in every industry</h2>
      <p>The nouns change. The investigation does not.</p>
      <ul>
        <li>
          <strong>Banking:</strong> UAT tests ACTIVE and BLOCKED accounts. Production sends
          PENDING_REVIEW.
        </li>
        <li>
          <strong>Insurance:</strong> UAT contains one policy per customer. Production contains
          migrated customers with overlapping policies.
        </li>
        <li>
          <strong>Healthcare:</strong> UAT uses current provider IDs. Production still contains
          claims referencing retired IDs.
        </li>
        <li>
          <strong>International e-commerce:</strong> UAT tests one currency and warehouse.
          Production adds currencies, tax rules, fulfilment partners and time zones.
        </li>
        <li>
          <strong>Capital markets:</strong> UAT tests clean trades in market hours. Production
          introduces late events, amendments, multiple venues and asynchronous confirmations.
        </li>
      </ul>
      <p>In each case, the useful question is not:</p>
      <blockquote>&ldquo;Who missed this?&rdquo;</blockquote>
      <p>It is:</p>
      <blockquote>&ldquo;Which production condition did our UAT model fail to represent?&rdquo;</blockquote>

      <h2>What should the BA actually do?</h2>
      <p>The BA does not need to read every log or diagnose the code alone.</p>
      <p>The BA&rsquo;s job is to keep the investigation connected to business behaviour.</p>
      <p>That means:</p>
      <ul>
        <li>turning &ldquo;it is broken&rdquo; into one traceable example</li>
        <li>stating expected and actual behaviour clearly</li>
        <li>comparing UAT and production conditions</li>
        <li>identifying the first point of divergence</li>
        <li>bringing the correct business and technical owners together</li>
        <li>exposing missing rules and assumptions</li>
        <li>recording the decision</li>
        <li>making sure the requirement and regression tests are updated</li>
      </ul>
      <p>Development may locate the technical failure.</p>
      <p>QA may reproduce it.</p>
      <p>Operations may provide the production evidence.</p>
      <p>The BA helps the team agree on what the system should have done&mdash;and ensures the answer survives beyond the incident call.</p>

      <h2>Eight questions to ask during the incident</h2>
      <ol>
        <li>What exact transaction failed?</li>
        <li>What did the user expect, and what happened instead?</li>
        <li>Is the issue limited to certain users, products, regions or channels?</li>
        <li>Was this exact scenario tested in UAT?</li>
        <li>Did UAT use the same values, mappings and integrations?</li>
        <li>Where did the transaction first behave differently?</li>
        <li>Is this a defect, a missing rule or a new scenario?</li>
        <li>What else depends on the same rule or data value?</li>
      </ol>

      <h2>UAT-to-Production Investigation Checklist</h2>
      <p>Copy this into Jira, Confluence or your incident notes.</p>

      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <ChecklistGroup
          label="Impact and containment"
          items={[
            "Affected users, products, regions and channels identified",
            "Financial, data, regulatory and operational risk assessed",
            "Safe workaround, rollback or feature control considered",
          ]}
        />
        <ChecklistGroup
          label="Failing example"
          items={[
            "Transaction or record ID captured",
            "User, role, channel and region recorded",
            "Exact date and time recorded",
            "Expected behaviour written clearly",
            "Actual behaviour written clearly",
            "Screenshot, response or error captured",
          ]}
        />
        <ChecklistGroup
          label="Compare environments"
          items={[
            "Application version",
            "Configuration and feature flags",
            "Reference data and mappings",
            "User and service permissions",
            "API and integration versions",
            "Test stub versus live integration",
            "Batch jobs, cache and timing",
            "Data shape, history and volume",
          ]}
        />
        <ChecklistGroup
          label="Trace the flow"
          items={[
            "End-to-end transaction path mapped",
            "First point of divergence identified",
            "Upstream and downstream impact checked",
            "Related transactions searched",
          ]}
        />
        <ChecklistGroup
          label="Classify"
          items={[
            "Code defect",
            "Requirement gap",
            "Test coverage gap",
            "Configuration issue",
            "Data issue",
            "Deployment issue",
          ]}
        />
        <ChecklistGroup
          label="Close properly"
          items={[
            "Business decision recorded",
            "Requirement or rule updated",
            "UAT data and regression tests updated",
            "Production-like scenario added",
            "Monitoring or alerting considered",
            "Related features checked for the same assumption",
          ]}
        />
      </div>

      <div className="not-prose my-8 flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
            Take this into your next incident
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            UAT-to-Production Investigation Canvas
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            Capture one failure, compare UAT with production, trace the first point of divergence
            and record the fix&mdash;on one printable page.
          </p>
        </div>
        <div className="sm:max-w-xs">
          <DownloadCard
            icon={<FileSearch className="size-4.5" aria-hidden="true" />}
            title="UAT-to-Production Investigation Canvas"
            description="Printable A4 · Free resource · No sign-up required"
            href="/downloads/uat-to-production-investigation-canvas.pdf"
            filename="uat-to-production-investigation-canvas.pdf"
            meta="PDF · 1 page"
            cta="Download the free PDF"
            analyticsEvent="uat_to_production_investigation_canvas_downloaded"
          />
        </div>
      </div>

      <h2>Before the next release</h2>
      <p>You cannot make UAT identical to production.</p>
      <p>You can make it more representative.</p>
      <p>
        That does <strong>not</strong> mean copying sensitive customer, patient or financial data
        into UAT. Use masked or synthetic data that preserves the important statuses, formats,
        relationships and edge cases.
      </p>
      <p>Before release, ask:</p>
      <ol>
        <li>Which production values do not exist in UAT?</li>
        <li>Which integrations or settings differ?</li>
        <li>Which roles, channels, regions and edge cases remain untested?</li>
        <li>How will the system flag an unknown value instead of silently mishandling it?</li>
      </ol>
      <p>That final question is especially useful.</p>
      <p>
        If the cancellation service had flagged <strong>ALLOCATED</strong> as an unknown status,
        the team could have found the gap before a customer found it.
      </p>

      <h2>The takeaway</h2>
      <p>When something works in UAT and fails in production, resist the quickest explanations:</p>
      <blockquote>&ldquo;QA missed it.&rdquo;</blockquote>
      <blockquote>&ldquo;Development deployed the wrong code.&rdquo;</blockquote>
      <blockquote>&ldquo;Production data is bad.&rdquo;</blockquote>
      <p>Any of those may eventually be true.</p>
      <p>But begin with evidence.</p>
      <p>Preserve one failure. Trace the transaction. Compare the environments. Find the first difference. Return to the business rule.</p>
      <p>Because UAT and production usually disagree for a reason.</p>
      <p>Find the first place where their stories stopped being the same.</p>
      <blockquote>
        <strong>
          UAT did not lie. It answered the question you asked. Production exposed the question
          you forgot to ask.
        </strong>
      </blockquote>
    </div>
  );
}

export { UatPassedProductionFailedBody };
