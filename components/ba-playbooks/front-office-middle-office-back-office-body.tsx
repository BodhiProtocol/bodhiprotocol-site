import Image from "next/image";
import { ArrowDown, FileQuestion } from "lucide-react";

import { DownloadCard } from "@/components/ba-playbooks/download-card";

function JourneyStep({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <p className="font-heading text-base font-medium text-foreground">{title}</p>
      {detail ? <p className="text-sm text-muted-foreground">{detail}</p> : null}
    </div>
  );
}

function JourneyArrow() {
  return <ArrowDown className="size-4 shrink-0 text-brand/60" aria-hidden="true" />;
}

// This playbook follows one trade from order to settlement rather than
// listing standalone tips, so — like the other narrative playbooks — it
// renders as flowing prose instead of numbered hack cards. See
// app/ba-playbooks/[slug]/page.tsx's customPlaybookBodies registry.
function FrontOfficeMiddleOfficeBackOfficeBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>You join your first Capital Markets project.</p>
      <p>Within a few meetings:</p>
      <blockquote>&ldquo;That&rsquo;s a Front Office issue.&rdquo;</blockquote>
      <p>Then:</p>
      <blockquote>&ldquo;Middle Office should catch it.&rdquo;</blockquote>
      <p>Later:</p>
      <blockquote>&ldquo;Check with Back Office.&rdquo;</blockquote>
      <p>Everyone moves on.</p>
      <p>You&rsquo;re still thinking:</p>
      <p>
        <strong>What exactly are these offices?</strong>
      </p>
      <p>
        And where do <strong>Market Data, Reference Data and Risk</strong> fit?
      </p>
      <p>Let&rsquo;s use:</p>
      <p>
        🇮🇳 <strong>Reliance Industries in India</strong>
      </p>
      <p>and occasionally:</p>
      <p>
        🌍 <strong>Microsoft in the US</strong>
      </p>
      <p>to see how the same trade journey works across markets.</p>

      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/journey-of-a-trade-infographic.png"
          alt="Infographic explaining the journey of a trade from order to settlement across Market Data, Reference Data, Front Office, Middle Office, Back Office and Risk, with Indian and global examples."
          width={1456}
          height={1090}
          loading="lazy"
          sizes="(min-width: 1024px) 768px, 100vw"
          className="h-auto w-full rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          The journey of a trade — from order to settlement, in India and globally.
        </figcaption>
      </figure>

      <h2>First, forget the word &ldquo;office&rdquo;</h2>
      <p>They&rsquo;re not necessarily physical offices.</p>
      <p>Think of them as broad responsibilities across the trade lifecycle.</p>
      <p>A simple mental model:</p>
      <p>
        <strong>Front Office</strong> &rarr; execute the trade
        <br />
        <strong>Middle Office</strong> &rarr; check and control it
        <br />
        <strong>Back Office</strong> &rarr; process it through settlement
      </p>
      <p>And <strong>Risk</strong>?</p>
      <p>That can cut across the whole journey.</p>
      <p>One thing before we start:</p>
      <blockquote>
        <strong>Don&rsquo;t memorize the org chart. Memorize the responsibility.</strong>
      </blockquote>
      <p>Different firms organise these teams differently.</p>
      <p>The lifecycle is what matters.</p>
      <p>Now let&rsquo;s trade.</p>

      <h2>1. Market Data: What&rsquo;s happening?</h2>
      <p>You&rsquo;re about to buy Reliance on NSE.</p>
      <p>First question:</p>
      <blockquote>&ldquo;What&rsquo;s the market doing?&rdquo;</blockquote>
      <p>You need things like:</p>
      <ul>
        <li>price</li>
        <li>bid and ask</li>
        <li>volume</li>
        <li>order-book data</li>
        <li>indices</li>
        <li>rates</li>
      </ul>
      <p>
        That&rsquo;s <strong>Market Data</strong>.
      </p>
      <p>A trader buying Microsoft needs the same kind of information from the relevant US market.</p>
      <p>Easy way to remember it:</p>
      <blockquote>
        <strong>Market Data = What&rsquo;s happening in the market right now?</strong>
      </blockquote>
      <p>Without it, you&rsquo;re basically trading with the lights off.</p>

      <h2>2. Reference Data: What exactly are we trading?</h2>
      <p>You say:</p>
      <blockquote>&ldquo;Buy Reliance.&rdquo;</blockquote>
      <p>A human understands.</p>
      <p>A system needs more.</p>
      <p>Which instrument?</p>
      <p>Which exchange?</p>
      <p>Which currency?</p>
      <p>Which account?</p>
      <p>Which counterparty?</p>
      <p>
        That&rsquo;s <strong>Reference Data</strong>.
      </p>
      <p>It describes things like:</p>
      <ul>
        <li>instruments</li>
        <li>exchanges</li>
        <li>currencies</li>
        <li>accounts</li>
        <li>legal entities</li>
        <li>settlement instructions</li>
      </ul>
      <p>The distinction is simple:</p>
      <p>
        <strong>Market Data</strong> &rarr; What&rsquo;s happening to it?
      </p>
      <p>
        <strong>Reference Data</strong> &rarr; What is it?
      </p>
      <p>That one distinction will save you a lot of confusion later.</p>

      <h2>3. Front Office: Let&rsquo;s get the order done</h2>
      <p>An institutional client says:</p>
      <blockquote>
        <strong>Buy 10,000 Reliance shares.</strong>
      </blockquote>
      <p>
        The order reaches the <strong>Front Office</strong>.
      </p>
      <p>This is where you&rsquo;ll hear terms like:</p>
      <ul>
        <li>Sales</li>
        <li>Trading</li>
        <li>Execution</li>
        <li>OMS</li>
        <li>EMS</li>
      </ul>
      <p>
        The client sends an <strong>order</strong>.
      </p>
      <p>But 10,000 shares may not execute at once.</p>
      <p>Maybe:</p>
      <p>3,000 execute.</p>
      <p>Then 4,000.</p>
      <p>Then 3,000.</p>
      <p>
        Those are <strong>executions</strong>.
      </p>
      <p>The same idea applies if the client is buying Microsoft in the US.</p>
      <p>Front Office is basically asking:</p>
      <blockquote>&ldquo;Okay, how do we actually get this order done?&rdquo;</blockquote>

      <h2>4. The trade executed. Done?</h2>
      <p>Nope.</p>
      <p>This is one of the most important things to understand:</p>
      <blockquote>
        <strong>Executed doesn&rsquo;t mean finished.</strong>
      </blockquote>
      <p>The Reliance order may show:</p>
      <blockquote>
        <strong>FILLED</strong>
      </blockquote>
      <p>Great.</p>
      <p>But the trade can still have:</p>
      <ul>
        <li>the wrong account</li>
        <li>missing settlement instructions</li>
        <li>a position mismatch</li>
        <li>a reconciliation break</li>
        <li>a settlement failure</li>
      </ul>
      <p>Imagine the execution is perfect.</p>
      <p>But the settlement instruction points to the wrong account.</p>
      <p>Front Office sees:</p>
      <blockquote>&ldquo;Trade done.&rdquo;</blockquote>
      <p>Post-trade teams see:</p>
      <blockquote>&ldquo;We have a problem.&rdquo;</blockquote>
      <p>So remember:</p>
      <p>
        <strong>Execution success &ne; lifecycle complete</strong>
      </p>

      <h2>5. Middle Office: Did we capture it correctly?</h2>
      <p>The trader says:</p>
      <blockquote>&ldquo;Done.&rdquo;</blockquote>
      <p>Middle Office says:</p>
      <blockquote>&ldquo;Cool. Is everything actually right?&rdquo;</blockquote>
      <p>Responsibilities vary by firm, but Middle Office often deals with things like:</p>
      <ul>
        <li>trade validation</li>
        <li>positions</li>
        <li>P&amp;L checks</li>
        <li>reconciliation</li>
        <li>trade enrichment</li>
        <li>exceptions</li>
        <li>controls</li>
      </ul>
      <p>The simplest mental model:</p>
      <p>
        <strong>Front Office</strong>
      </p>
      <blockquote>We traded it.</blockquote>
      <p>
        <strong>Middle Office</strong>
      </p>
      <blockquote>Did we capture and control it correctly?</blockquote>
      <p>That&rsquo;s enough to get started.</p>

      <h2>6. Risk: What did this trade change?</h2>
      <p>Every trade changes something.</p>
      <p>A position.</p>
      <p>An exposure.</p>
      <p>A risk.</p>
      <p>You may hear:</p>

      <h3>Market Risk</h3>
      <p>What if the price moves against us?</p>

      <h3>Credit / Counterparty Risk</h3>
      <p>What if the other party cannot meet its obligation?</p>

      <h3>Liquidity Risk</h3>
      <p>Can we fund or exit the position?</p>

      <h3>Operational Risk</h3>
      <p>What if a system or process fails?</p>

      <p>Here&rsquo;s the important bit:</p>
      <blockquote>
        <strong>Risk doesn&rsquo;t sit neatly at one point in the lifecycle.</strong>
      </blockquote>
      <p>A pre-trade limit check?</p>
      <p>Risk.</p>
      <p>Monitoring exposure after execution?</p>
      <p>Risk.</p>
      <p>Checking whether a counterparty is near its credit limit?</p>
      <p>Also Risk.</p>
      <p>So don&rsquo;t think:</p>
      <p>
        <strong>Front Office &rarr; Risk &rarr; Middle Office</strong>
      </p>
      <p>Think:</p>
      <blockquote>
        <strong>Risk can cut across the whole journey.</strong>
      </blockquote>

      <h2>7. Back Office: Now make the trade complete</h2>
      <p>You bought the Reliance shares.</p>
      <p>Eventually, two things need to happen:</p>
      <p>
        <strong>securities move</strong>
      </p>
      <p>and</p>
      <p>
        <strong>money moves.</strong>
      </p>
      <p>
        That&rsquo;s where <strong>Back Office</strong> comes in.
      </p>
      <p>Depending on the firm, it may cover:</p>
      <ul>
        <li>confirmation</li>
        <li>clearing</li>
        <li>settlement</li>
        <li>cash processing</li>
        <li>securities processing</li>
        <li>reconciliation</li>
        <li>corporate actions</li>
        <li>settlement exceptions</li>
      </ul>
      <p>
        In India, the journey may involve exchanges, clearing corporations, brokers, custodians and
        depositories such as <strong>NSDL or CDSL</strong>.
      </p>
      <p>In the US, the infrastructure is different.</p>
      <p>But the question is the same:</p>
      <blockquote>
        <strong>Did the buyer receive the securities, and did the seller receive the money?</strong>
      </blockquote>
      <p>That&rsquo;s settlement at its simplest.</p>

      <h2>Now look at the whole journey</h2>
      <p>What looked like:</p>
      <blockquote>
        <strong>BUY RELIANCE</strong>
      </blockquote>
      <p>is actually closer to this:</p>

      <div className="not-prose my-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/20 px-6 py-8">
        <JourneyStep title="Market Data" detail="What’s happening?" />
        <JourneyArrow />
        <JourneyStep title="Reference Data" detail="What are we trading?" />
        <JourneyArrow />
        <JourneyStep title="Front Office" detail="Order → Execution → Trade" />
        <JourneyArrow />
        <JourneyStep title="Middle Office" detail="Validate → Enrich → Control" />
        <JourneyArrow />
        <JourneyStep title="Back Office" detail="Confirm → Clear → Settle" />
        <JourneyArrow />
        <JourneyStep title="Cash + Securities move" />
      </div>

      <p>And across the whole journey:</p>
      <p>
        <strong>Risk</strong>
      </p>
      <blockquote>What exposure exists, and are we within our limits?</blockquote>
      <p>Now these stop looking like six unrelated definitions.</p>
      <p>
        They&rsquo;re all helping <strong>one trade move through a system</strong>.
      </p>

      <h2>Why this matters if you&rsquo;re a BA, QA or developer</h2>
      <p>Imagine Development says:</p>
      <blockquote>&ldquo;It&rsquo;s just one new field.&rdquo;</blockquote>
      <p>Sounds harmless. 😄</p>
      <p>Now start asking:</p>
      <p>Where does the field come from?</p>
      <p>Does Front Office create it?</p>
      <p>Does Reference Data supply it?</p>
      <p>Does Risk use it?</p>
      <p>Does Middle Office validate it?</p>
      <p>Does Back Office need it?</p>
      <p>Does another downstream system consume it?</p>
      <p>Suddenly:</p>
      <blockquote>
        <strong>One field isn&rsquo;t one field.</strong>
      </blockquote>
      <p>It&rsquo;s information travelling through a chain.</p>
      <p>
        For a <strong>BA</strong>, that&rsquo;s impact analysis.
      </p>
      <p>
        For a <strong>QA</strong>, it means testing beyond one screen.
      </p>
      <p>
        For a <strong>developer</strong>, it explains why a tiny change can affect several systems.
      </p>
      <p>
        And for a <strong>fresher or analyst</strong>, it gives you the map before you start learning
        every street.
      </p>

      <h2>The six questions to remember</h2>
      <p>When you see a new Capital Markets process, ask:</p>
      <p>
        <strong>Market Data</strong> &mdash; What&rsquo;s happening?
      </p>
      <p>
        <strong>Reference Data</strong> &mdash; What exactly are we dealing with?
      </p>
      <p>
        <strong>Front Office</strong> &mdash; How was it executed?
      </p>
      <p>
        <strong>Risk</strong> &mdash; What exposure did it create?
      </p>
      <p>
        <strong>Middle Office</strong> &mdash; Was it captured and controlled correctly?
      </p>
      <p>
        <strong>Back Office</strong> &mdash; Did the transaction complete?
      </p>
      <p>You don&rsquo;t need to understand every system on day one.</p>
      <p>Start with:</p>
      <blockquote>
        <strong>Where does this sit in the trade journey?</strong>
      </blockquote>

      <h2>The idea to take away</h2>
      <p>When someone says:</p>
      <blockquote>&ldquo;That&rsquo;s a Front Office issue.&rdquo;</blockquote>
      <p>or:</p>
      <blockquote>&ldquo;Middle Office should investigate.&rdquo;</blockquote>
      <p>Don&rsquo;t immediately ask:</p>
      <p>
        <strong>&ldquo;Which department is that?&rdquo;</strong>
      </p>
      <p>Ask:</p>
      <blockquote>
        <strong>&ldquo;What is happening to the trade at this point?&rdquo;</strong>
      </blockquote>
      <p>That question will usually get you much closer to the answer.</p>
      <p>Because a trade isn&rsquo;t just a buy and a sell.</p>
      <blockquote>
        <strong>It&rsquo;s a journey from intent &rarr; execution &rarr; control &rarr; settlement.</strong>
      </blockquote>
      <p>
        And <strong>Market Data, Reference Data and Risk</strong> help that journey work.
      </p>
      <p>Once you see the journey, the jargon starts becoming a map.</p>

      <div className="not-prose my-10 flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-brand uppercase">
            Free download
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            40 Questions Every Capital Markets BA Should Ask
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            A practical question bank for understanding Front Office, Middle Office, Back Office,
            Risk, Market Data and Reference Data — useful during discovery sessions, walkthroughs,
            impact analysis, requirement discussions and system onboarding.
          </p>
        </div>
        <div className="max-w-xs">
          <DownloadCard
            icon={<FileQuestion className="size-4.5" aria-hidden="true" />}
            title="40 Questions Every Capital Markets BA Should Ask"
            description="No signup required."
            href="/downloads/40-questions-capital-markets-ba.pdf"
            filename="40-questions-capital-markets-ba.pdf"
            meta="PDF · Question bank"
            cta="Download Free PDF"
            analyticsEvent="capital_markets_ba_questions_downloaded"
          />
        </div>
      </div>
    </div>
  );
}

export { FrontOfficeMiddleOfficeBackOfficeBody };
