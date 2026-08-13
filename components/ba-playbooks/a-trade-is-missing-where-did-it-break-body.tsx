import { ListChecks } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { DownloadCard } from "@/components/ba-playbooks/download-card";
import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";

interface ComparisonRow {
  cells: string[];
}

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
}

// This playbook traces one real trade through several small tables rather
// than standalone tips, so — like the other narrative-walkthrough playbooks
// — it renders as flowing prose instead of numbered hack cards. See
// app/ba-playbooks/[slug]/page.tsx's customPlaybookBodies registry. Not a
// shared component — same small local table used by
// uat-passed-production-failed-body.tsx, kept per-file on purpose.
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

function ATradeIsMissingWhereDidItBreakBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>Front Office says:</p>
      <blockquote>&ldquo;The trade was executed.&rdquo;</blockquote>
      <p>Operations says:</p>
      <blockquote>&ldquo;We never received it.&rdquo;</blockquote>
      <p>
        OMS shows <strong>FILLED</strong>. Settlement shows nothing.
      </p>
      <p>Someone shares a screenshot. Someone forwards a trade ID. Then someone says:</p>
      <blockquote>&ldquo;Must be a downstream issue.&rdquo;</blockquote>
      <p>Maybe. But nobody has proved where the trade travelled — or where it stopped.</p>
      <p>That is where the BA comes in.</p>
      <p>A good BA does not just collect updates. A good BA builds proof across systems.</p>
      <blockquote>
        <strong>Don&rsquo;t ask only, &ldquo;Where is the trade?&rdquo;</strong>
        <br />
        <strong>Ask, &ldquo;What is the last system that can prove it had the trade?&rdquo;</strong>
      </blockquote>
      <p>That question changes everything.</p>

      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/a-trade-is-missing-where-did-it-break-infographic.png"
          alt="Infographic summarising the trade lifecycle from order to clearing and settlement across Front, Middle and Back Office, the last-proven-success-to-root-cause investigation model, and the 8-checkpoint investigation from execution through reconciliation."
          width={1600}
          height={933}
          loading="lazy"
          sizes="(min-width: 1024px) 768px, 100vw"
          className="h-auto w-full rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          A front-to-back investigation playbook for BAs — the trade lifecycle, the handoff model and the 8 checkpoints.
        </figcaption>
      </figure>

      <h2>First, what does &ldquo;missing&rdquo; mean?</h2>
      <p>A trade may be:</p>
      <ol>
        <li>
          <strong>Not created</strong> — no execution happened.
        </li>
        <li>
          <strong>Not captured</strong> — it executed but was not booked.
        </li>
        <li>
          <strong>Rejected</strong> — the next system refused it.
        </li>
        <li>
          <strong>Held</strong> — it is sitting in an exception queue.
        </li>
        <li>
          <strong>Somewhere else</strong> — it exists under another ID, state or business date.
        </li>
      </ol>
      <p>So first ask:</p>
      <ul>
        <li>Missing from which system?</li>
        <li>Since when?</li>
        <li>Which identifier are we using?</li>
        <li>Were we expecting one trade or several?</li>
        <li>Could it have been cancelled, corrected, allocated or netted?</li>
      </ul>
      <blockquote>
        <strong>&ldquo;Missing trade&rdquo; is a symptom — not a diagnosis.</strong>
      </blockquote>

      <h2>Here is the trade</h2>
      <p>
        An institutional client buys <strong>10,000 Reliance Industries shares on NSE</strong>.
      </p>
      <p>It executes in two fills:</p>
      <ComparisonTable
        columns={["Execution", "Quantity", "Price", "Execution ID"]}
        rows={[
          { cells: ["Fill 1", "6,000", "₹2,985.20", "EXE-78421"] },
          { cells: ["Fill 2", "4,000", "₹2,985.60", "EXE-78422"] },
        ]}
      />
      <p>OMS says:</p>
      <blockquote>
        <strong>FILLED — 10,000 shares</strong>
      </blockquote>
      <p>
        Operations can find only <strong>6,000</strong>.
      </p>
      <p>Where are the other 4,000? Let&rsquo;s trace them.</p>

      <h2>Build the trade&rsquo;s identity card</h2>
      <p>Before opening ten systems, freeze the facts.</p>
      <ComparisonTable
        columns={["Field", "Example"]}
        rows={[
          { cells: ["Trade date", "13 August 2026"] },
          { cells: ["Instrument", "Reliance Industries"] },
          { cells: ["Venue", "NSE"] },
          { cells: ["Side", "Buy"] },
          { cells: ["Quantity", "10,000"] },
          { cells: ["Order ID", "ORD-44518"] },
          { cells: ["Execution IDs", "EXE-78421, EXE-78422"] },
          { cells: ["Account", "ACCT-IND-204"] },
        ]}
      />
      <p>Why? Because IDs change as the trade moves.</p>
      <p>
        <strong>Order ID &rarr; Execution ID &rarr; Trade ID &rarr; Clearing reference &rarr; Settlement instruction</strong>
      </p>
      <blockquote>
        <strong>You are not tracing one ID. You are tracing one economic event through changing IDs.</strong>
      </blockquote>

      <h2>The investigation map</h2>
      <p>A simple trade path looks like this:</p>
      <MiniDiagram
        label="The trade path"
        steps={[
          "Order",
          "Execution",
          "Booking",
          "Enrichment",
          "Allocation / Confirmation",
          "Clearing",
          "Settlement",
          "Reconciliation",
        ]}
      />
      <p>At every handoff, ask:</p>
      <ol>
        <li>
          <strong>Did the sender produce the event?</strong>
        </li>
        <li>
          <strong>Did the receiver accept or reject it?</strong>
        </li>
        <li>
          <strong>Did the expected business record get created?</strong>
        </li>
      </ol>

      <h2>Checkpoint 1: Did it actually execute?</h2>
      <p>
        Do not rely only on <strong>FILLED</strong>.
      </p>
      <p>Find proof: execution ID, quantity and price, timestamp, venue or broker reference, cancellation or correction events.</p>
      <p>We find:</p>
      <ComparisonTable
        columns={["Execution ID", "Quantity", "Result"]}
        rows={[
          { cells: ["EXE-78421", "6,000", "Executed"] },
          { cells: ["EXE-78422", "4,000", "Executed"] },
        ]}
      />
      <p>
        All <strong>10,000 shares executed</strong>.
      </p>
      <p>So the break happened after execution.</p>
      <p className="font-medium text-foreground">
        BA question: <em>&ldquo;What proves each execution happened?&rdquo;</em>
      </p>

      <h2>Checkpoint 2: Did every execution become a trade?</h2>
      <p>Compare execution with booking.</p>
      <ComparisonTable
        columns={["Execution ID", "Executed Quantity", "Trade Capture Result"]}
        rows={[
          { cells: ["EXE-78421", "6,000", "TRD-99031"] },
          { cells: ["EXE-78422", "4,000", "No trade created"] },
        ]}
      />
      <p>Now the problem is smaller.</p>
      <blockquote>
        <strong>EXE-78422 executed — but never became the expected booked trade.</strong>
      </blockquote>
      <p>Possible causes: the message was not sent, was not delivered, was rejected by the receiver, had invalid mandatory data, or booked under another identifier.</p>
      <p className="font-medium text-foreground">
        BA question: <em>&ldquo;What is the first expected business record that does not exist?&rdquo;</em>
      </p>

      <h2>Checkpoint 3: Was it rejected?</h2>
      <p>Now we find the clue.</p>
      <p>
        <strong>EXE-78421</strong> had valid account mapping. <strong>EXE-78422</strong> did not.
      </p>
      <p>The receiving system rejected it with:</p>
      <blockquote>
        <strong>ACCOUNT_MAPPING_NOT_FOUND</strong>
      </blockquote>
      <p>
        So: Front Office sees <strong>10,000 executed</strong>. Operations sees <strong>6,000 booked</strong>.
      </p>
      <p>Both teams are correct. They are looking at different lifecycle stages.</p>
      <h3>Break found</h3>
      <blockquote>
        <strong>EXE-78422 executed successfully but failed booking because account enrichment failed.</strong>
      </blockquote>
      <p>That is much better than &ldquo;downstream issue.&rdquo;</p>

      <h2>The mental model</h2>
      <p>Use this pattern:</p>
      <p>
        <strong>Last proven success &rarr; Handoff &rarr; First failed record &rarr; Root cause</strong>
      </p>
      <p>For our trade:</p>
      <ComparisonTable
        columns={["Step", "Finding"]}
        rows={[
          { cells: ["Last proven success", "Execution completed"] },
          { cells: ["Handoff", "Execution → Booking"] },
          { cells: ["First failed record", "Booked trade missing for EXE-78422"] },
          { cells: ["Root cause", "Account mapping rejected"] },
        ]}
      />
      <p>That is the investigation.</p>

      <h2>Checkpoints 4 to 8: Continue the trace</h2>
      <p>If the break is not at booking, keep moving forward.</p>

      <h3>Allocation and confirmation</h3>
      <p>
        Ask: <em>&ldquo;Did the booked trade become the correct downstream obligations?&rdquo;</em>
      </p>
      <p>Check allocations, destination accounts, confirmations and economics.</p>

      <h3>Clearing</h3>
      <p>
        Ask: <em>&ldquo;Am I looking for the original trade — or what it became?&rdquo;</em>
      </p>
      <p>Check accepted, rejected or pending status, clearing reference, validation result and netting outcome.</p>

      <h3>Settlement instruction</h3>
      <p>
        Ask: <em>&ldquo;What tells cash and securities where to move?&rdquo;</em>
      </p>
      <p>Check cash account, securities account, settlement location, settlement date, quantity and instruction status.</p>

      <h3>Settlement</h3>
      <p>
        Ask: <em>&ldquo;What proves cash and securities actually moved?&rdquo;</em>
      </p>
      <p>Instruction sent does not mean settled. Check securities movement, cash movement, settled quantity, fail status and timestamp.</p>
      <p>
        Many cash-equity transactions in India and the US use <strong>T+1</strong>, though exceptions exist. India also
        has optional <strong>T+0</strong> for eligible equity-cash transactions.
      </p>
      <p>Use the trade and market rules — not habit — to confirm the expected settlement date.</p>

      <h3>Reconciliation</h3>
      <p>
        Ask: <em>&ldquo;Is the trade incomplete — or is this view incomplete?&rdquo;</em>
      </p>
      <p>Check position, cash ledger, reconciliation, reporting load, business date and cancel/rebook history.</p>

      <h2>Build one handoff table</h2>
      <p>Do not investigate through 47 Teams messages. Build one table.</p>
      <ComparisonTable
        columns={["Stage", "ID / Reference", "Status", "Evidence", "Result"]}
        rows={[
          { cells: ["Order", "ORD-44518", "Filled", "OMS", "Proven"] },
          { cells: ["Execution", "EXE-78421", "6,000 executed", "Execution report", "Proven"] },
          { cells: ["Execution", "EXE-78422", "4,000 executed", "Execution report", "Proven"] },
          { cells: ["Booking", "TRD-99031", "Booked", "Trade capture", "Proven"] },
          { cells: ["Booking", "Expected record for EXE-78422", "Rejected", "Exception queue", "Break"] },
          { cells: ["Enrichment", "ACCT-IND-204", "Failed", "Validation error", "Root cause"] },
        ]}
      />
      <p>Now everyone can see:</p>
      <p>
        <strong>Last success &rarr; Execution</strong>
        <br />
        <strong>First break &rarr; Booking</strong>
        <br />
        <strong>Cause &rarr; Account mapping</strong>
      </p>
      <p>No guessing.</p>

      <h2>Seven rules worth remembering</h2>
      <h3>1. Freeze the scope</h3>
      <p>Make sure everyone is investigating the same trade.</p>
      <h3>2. Trace events, not screenshots</h3>
      <p>Prefer records, messages, acknowledgements and timestamps.</p>
      <h3>3. Find the last proven point</h3>
      <p>Then inspect the next handoff.</p>
      <h3>4. Reconcile quantities</h3>
      <p>
        Track the full path: <strong>Ordered &rarr; Executed &rarr; Booked &rarr; Allocated &rarr; Cleared &rarr; Instructed &rarr; Settled</strong>
      </p>
      <h3>5. Expect IDs to change</h3>
      <p>Build the cross-reference map.</p>
      <h3>6. Check the unhappy path</h3>
      <p>Where do rejects go? Who owns them? Can replay create duplicates?</p>
      <h3>7. Finish with ownership</h3>
      <p>
        Document: <strong>Failure &rarr; Cause &rarr; Impact &rarr; Repair &rarr; Owner &rarr; Prevention</strong>
      </p>

      <h2>Ask better questions</h2>
      <p>Instead of:</p>
      <blockquote>&ldquo;Which team owns the trade?&rdquo;</blockquote>
      <p>Ask:</p>
      <blockquote>
        <strong>&ldquo;Who owns the first failed handoff?&rdquo;</strong>
      </blockquote>
      <p>Instead of:</p>
      <blockquote>&ldquo;Did the interface work?&rdquo;</blockquote>
      <p>Ask:</p>
      <blockquote>
        <strong>&ldquo;Was the event sent, received and converted into the expected trade?&rdquo;</strong>
      </blockquote>
      <p>Instead of:</p>
      <blockquote>&ldquo;Can you resend it?&rdquo;</blockquote>
      <p>Ask:</p>
      <blockquote>
        <strong>&ldquo;How do we know replay will not create a duplicate?&rdquo;</strong>
      </blockquote>
      <p>Precise questions shorten incidents.</p>

      <h2>India or US — the logic survives</h2>
      <p>
        Take <strong>Reliance on NSE</strong>. Or <strong>Microsoft in the US</strong>.
      </p>
      <p>The market changes. The infrastructure changes. The questions do not.</p>
      <p>
        <strong>Executed? &rarr; Booked? &rarr; Cleared? &rarr; Instructed? &rarr; Settled?</strong>
      </p>
      <blockquote>
        <strong>Carry the questions across — not the assumptions.</strong>
      </blockquote>

      <h2>What should the BA leave behind?</h2>
      <p>Do not just repair today&rsquo;s trade. Leave behind the incident logic.</p>
      <h3>Incident</h3>
      <p>
        <strong>EXE-78422 executed but failed booking because account enrichment could not resolve ACCT-IND-204.</strong>
      </p>
      <h3>Impact</h3>
      <p>
        <strong>4,000 shares were missing from downstream processing.</strong>
      </p>
      <h3>Repair</h3>
      <p>Correct the mapping, safely replay the execution and verify downstream processing.</p>
      <h3>Prevention</h3>
      <p>Add pre-booking validation, alert the exception owner and monitor:</p>
      <blockquote>
        <strong>Executed quantity vs booked quantity</strong>
      </blockquote>
      <p>Repair fixes today&rsquo;s trade. Prevention improves tomorrow&rsquo;s system.</p>

      <h2>The idea to remember</h2>
      <p>When a trade disappears:</p>
      <p>Front Office checks the OMS. Operations checks settlement. Technology checks the interface.</p>
      <p>Everyone can be correct — and the investigation can still go nowhere.</p>
      <p>
        The BA&rsquo;s advantage is following the <strong>business event across system boundaries</strong>.
      </p>
      <p>
        <strong>Map the IDs.</strong>
        <br />
        <strong>Reconcile the quantities.</strong>
        <br />
        <strong>Prove each handoff.</strong>
        <br />
        <strong>Find the last successful record.</strong>
        <br />
        <strong>Then find the first failed one.</strong>
      </p>
      <blockquote>
        <strong>A missing trade is not solved by searching harder in one system.</strong>
        <br />
        <strong>It is solved by finding the first broken handoff between systems.</strong>
      </blockquote>

      <div className="not-prose my-10 flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-brand uppercase">
            Free download
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            Missing Trade Investigation Checklist
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            A printable checklist for production incidents, UAT breaks and reconciliation issues — trade identity,
            identifier mapping, quantity reconciliation, last proven success, first failed handoff, root cause,
            repair, owner and prevention.
          </p>
        </div>
        <div className="max-w-xs">
          <DownloadCard
            icon={<ListChecks className="size-4.5" aria-hidden="true" />}
            title="Missing Trade Investigation Checklist"
            description="No signup required."
            href="/downloads/missing-trade-investigation-checklist.pdf"
            filename="missing-trade-investigation-checklist.pdf"
            meta="PDF · Investigation checklist"
            cta="Download Free PDF"
            analyticsEvent="missing_trade_investigation_checklist_downloaded"
          />
        </div>
      </div>
    </div>
  );
}

export { ATradeIsMissingWhereDidItBreakBody };
