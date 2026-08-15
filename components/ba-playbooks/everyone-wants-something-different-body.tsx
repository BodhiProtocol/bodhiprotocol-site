import Image from "next/image";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { ComparisonTable } from "@/components/ba-playbooks/comparison-table";

// This playbook walks through one requirements meeting rather than standalone
// tips, so like the other narrative-walkthrough playbooks it renders as
// flowing prose instead of numbered hack cards. See
// app/ba-playbooks/[slug]/page.tsx's customPlaybookBodies registry.
function EveryoneWantsSomethingDifferentBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>You are in a requirements meeting.</p>
      <p>Sales says:</p>
      <blockquote>&ldquo;We need more flexibility.&rdquo;</blockquote>
      <p>Operations says:</p>
      <blockquote>&ldquo;We need tighter controls.&rdquo;</blockquote>
      <p>Compliance says:</p>
      <blockquote>&ldquo;We need fewer exceptions.&rdquo;</blockquote>
      <p>Technology finally asks:</p>
      <blockquote>&ldquo;Can someone just tell us what to build?&rdquo;</blockquote>
      <p>Everyone looks at the BA.</p>
      <p>This is not necessarily a bad meeting.</p>
      <p>It may simply mean each stakeholder is protecting something different.</p>
      <p>Your job is not to find the sentence everyone dislikes equally.</p>
      <p>Your job is to discover:</p>
      <blockquote>
        <strong>What outcome are we trying to achieve, what constraints are real, and what trade-offs are we willing to make?</strong>
      </blockquote>

      <h2>Here&rsquo;s the situation</h2>
      <p>Imagine an e-commerce company changing its refund process.</p>
      <p>Sales wants agents to approve refunds quickly.</p>
      <p>Operations wants controls because refund mistakes are expensive.</p>
      <p>Risk wants large refunds reviewed.</p>
      <p>Technology wants one clear workflow.</p>
      <p>So what is the requirement?</p>
      <p>&ldquo;Make refunds flexible&rdquo;? &ldquo;Require approval&rdquo;? &ldquo;Reduce exceptions&rdquo;?</p>
      <p>None of those is enough.</p>
      <p>They are stakeholder positions.</p>
      <p>
        <strong>The actual requirement sits underneath them.</strong>
      </p>

      <h2>1. LISTEN — what is each stakeholder really protecting?</h2>
      <p>Start by understanding each perspective.</p>
      <p>
        Ask Sales: &ldquo;What problem does more flexibility solve?&rdquo; Maybe customers wait two days for
        simple refunds.
      </p>
      <p>
        Ask Operations: &ldquo;What risk are the controls protecting us from?&rdquo; Maybe agents sometimes
        refund the wrong amount.
      </p>
      <p>
        Ask Risk: &ldquo;Which refunds actually need additional review?&rdquo; Maybe only refunds above a
        certain amount.
      </p>
      <p>Now the disagreement becomes more precise.</p>
      <p>
        Sales may not want <strong>no controls</strong>. Operations may not want <strong>approval on everything</strong>.
      </p>
      <p>Those were positions. The underlying needs may actually be compatible.</p>

      <h2>2. SEPARATE — need or proposed solution?</h2>
      <p>Stakeholders often describe solutions as requirements.</p>
      <blockquote>&ldquo;Add an approval screen.&rdquo;</blockquote>
      <blockquote>&ldquo;Give managers an override button.&rdquo;</blockquote>
      <blockquote>&ldquo;Make everything automatic.&rdquo;</blockquote>
      <p>Before accepting the solution, ask:</p>
      <blockquote>
        <strong>&ldquo;What problem would that solve?&rdquo;</strong>
      </blockquote>
      <p>Maybe &ldquo;approval screen&rdquo; really means: high-value refunds need independent review.</p>
      <p>Maybe &ldquo;override button&rdquo; means: urgent cases need an exception path.</p>
      <p>Maybe &ldquo;automate everything&rdquo; means: low-risk refunds should not wait for manual review.</p>
      <p>Now you can design around the <strong>need</strong>, not the first solution someone suggested.</p>

      <h2>3. CONFLICT — where do the needs genuinely clash?</h2>
      <p>Write the needs plainly.</p>
      <p>
        <strong>Sales:</strong> reduce customer waiting time.
        <br />
        <strong>Operations:</strong> reduce refund mistakes.
        <br />
        <strong>Risk:</strong> control high-value exposure.
        <br />
        <strong>Technology:</strong> keep the workflow maintainable.
      </p>
      <p>Then ask:</p>
      <blockquote>
        <strong>&ldquo;Where do these needs actually conflict?&rdquo;</strong>
      </blockquote>
      <p>Perhaps everyone agrees refunds below a low threshold should be fast.</p>
      <p>The disagreement exists only above that threshold.</p>
      <p>A four-way argument just became one decision.</p>
      <p>
        <strong>That&rsquo;s BA work.</strong>
      </p>

      <h2>4. CONSTRAINTS — what cannot be negotiated away?</h2>
      <p>Some preferences are flexible. Some constraints aren&rsquo;t.</p>
      <p>Look for:</p>
      <ul>
        <li>regulation</li>
        <li>policy</li>
        <li>contractual commitments</li>
        <li>security</li>
        <li>budget</li>
        <li>architecture</li>
        <li>data availability</li>
        <li>delivery dates</li>
        <li>operational capacity</li>
      </ul>
      <p>Suppose Risk says large refunds require independent approval because of company policy.</p>
      <p>That is different from:</p>
      <blockquote>&ldquo;We prefer managers to approve them.&rdquo;</blockquote>
      <p>Make constraints explicit. Otherwise teams debate options that were never viable.</p>

      <h2>5. PRIORITISE — what matters most?</h2>
      <p>When everything is &ldquo;critical,&rdquo; nothing is.</p>
      <p>Ask:</p>
      <p>
        What is must-have? What creates the most business value? What prevents the biggest risk? What can
        wait? What happens if we don&rsquo;t do this?
      </p>
      <p>Rank outcomes rather than stakeholder seniority. For example:</p>
      <ol>
        <li>Prevent unauthorized high-value refunds.</li>
        <li>Reduce customer wait for low-risk refunds.</li>
        <li>Reduce manual work.</li>
        <li>Improve reporting.</li>
      </ol>
      <p>Now design decisions have something to anchor to.</p>

      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/everyone-wants-something-different-infographic.png"
          alt="Infographic summarising the framework: Sales, Operations, Compliance and Technology each wanting something different, the eight-step BA clarity process (Listen, Needs not Solutions, Find Conflict, Identify Constraints, Prioritise, Show Trade-offs, Decide, Document and Confirm), key questions to ask, common traps to avoid, a go / conditional-go / no-go decision framework, and the golden rule: don't find the middle, find the requirement that best serves the outcome within real constraints."
          width={1024}
          height={1536}
          loading="lazy"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full max-w-xl rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          Don&rsquo;t find the middle. Find the requirement that best serves the outcome within the real
          constraints.
        </figcaption>
      </figure>

      <h2>6. TRADE-OFFS — show what each option buys and costs</h2>
      <p>Don&rsquo;t ask:</p>
      <blockquote>&ldquo;Which option do you like?&rdquo;</blockquote>
      <p>Show the consequences.</p>

      <ComparisonTable
        columns={["Option", "Gain", "Cost"]}
        rows={[
          {
            cells: [
              "A — Approval for every refund",
              "Strongest control.",
              "Slower customer experience and more operational work.",
            ],
          },
          {
            cells: [
              "B — No approval",
              "Fastest process.",
              "Higher error and fraud exposure.",
            ],
          },
          {
            cells: [
              "C — Risk-based approval",
              "Speed where risk is low, control where risk is high.",
              "Below a low threshold → automatic. Middle band → agent approval. Above a high threshold → manager review.",
            ],
          },
        ]}
      />

      <p>Now the team isn&rsquo;t arguing about opinions.</p>
      <p>
        <strong>It is choosing a trade-off.</strong>
      </p>

      <h2>7. DECIDE — don&rsquo;t chase perfect consensus</h2>
      <p>A common BA trap is trying to make everyone completely happy.</p>
      <p>Sometimes that isn&rsquo;t possible.</p>
      <p>The goal is not:</p>
      <blockquote>
        <strong>Everyone gets everything.</strong>
      </blockquote>
      <p>The goal is:</p>
      <blockquote>
        <strong>The right decision is made with the trade-offs understood.</strong>
      </blockquote>
      <p>If stakeholders cannot agree, identify the decision owner. Present:</p>
      <p>
        <strong>problem &rarr; options &rarr; constraints &rarr; impact &rarr; recommendation</strong>
      </p>
      <p>Then get a decision.</p>
      <p>Consensus is useful.</p>
      <p>
        <strong>Decision is essential.</strong>
      </p>

      <h2>8. DOCUMENT — turn the decision into buildable behaviour</h2>
      <p>Suppose the team chooses risk-based approval. Now make it precise.</p>
      <blockquote>
        Refunds below the low threshold may be processed by an authorized service agent without additional
        approval.
      </blockquote>
      <blockquote>Refunds in the middle band require agent confirmation and reason capture.</blockquote>
      <blockquote>Refunds above the high threshold require manager approval before processing.</blockquote>
      <p>Then define:</p>
      <ul>
        <li>user roles</li>
        <li>thresholds</li>
        <li>exceptions</li>
        <li>error behaviour</li>
        <li>audit requirements</li>
        <li>notifications</li>
        <li>reporting</li>
        <li>acceptance criteria</li>
      </ul>
      <p>And don&rsquo;t send:</p>
      <blockquote>&ldquo;Please review the requirements.&rdquo;</blockquote>
      <p>Send:</p>
      <blockquote>
        &ldquo;We agreed on risk-based approval. Please confirm these thresholds, roles and exception
        rules.&rdquo;
      </blockquote>
      <p>Specific confirmation produces better feedback.</p>

      <h2>What if the most senior stakeholder disagrees?</h2>
      <p>Seniority may determine decision rights. It does not remove the need to show consequences.</p>
      <p>If the decision-maker chooses approval for every refund, document the impact:</p>
      <blockquote>
        Approval on every refund increases control but is expected to increase handling time and
        operational workload.
      </blockquote>
      <p>Your job isn&rsquo;t to overrule the decision-maker.</p>
      <p>
        <strong>It&rsquo;s to make sure they can see what they&rsquo;re choosing.</strong>
      </p>

      <h2>What if everyone is right?</h2>
      <p>Often they are.</p>
      <p>
        Sales is right about customer experience. Operations is right about control. Risk is right about
        exposure. Technology is right about complexity.
      </p>
      <p>The answer may not be picking one winner.</p>
      <p>It may be:</p>
      <p>
        <strong>thresholds</strong> &middot; <strong>different flows</strong> &middot; <strong>permissions</strong>{" "}
        &middot; <strong>exceptions</strong> &middot; <strong>phased delivery</strong> &middot;{" "}
        <strong>configurable rules</strong>
      </p>
      <p>Conflicting needs sometimes need better design, not compromise.</p>

      <h2>Common traps</h2>
      <h3>Taking sides</h3>
      <blockquote>&ldquo;Business wants this, so Tech needs to build it.&rdquo;</blockquote>
      <p>You become a messenger, not an analyst.</p>
      <h3>Jumping to solutions</h3>
      <blockquote>&ldquo;Let&rsquo;s add an approval button.&rdquo;</blockquote>
      <p>You may solve the wrong problem.</p>
      <h3>Agreeing to everything</h3>
      <p>Every stakeholder request becomes scope. The product becomes expensive and contradictory.</p>
      <h3>Ignoring assumptions</h3>
      <p>Everyone thinks they agreed because nobody stated what they assumed.</p>
      <h3>Chasing consensus forever</h3>
      <p>Meetings continue because nobody identifies the decision owner.</p>
      <h3>Forgetting the trade-off</h3>
      <p>Three months later:</p>
      <blockquote>&ldquo;Why did we choose this?&rdquo;</blockquote>
      <p>Nobody remembers.</p>

      <h2>Before you close the meeting</h2>
      <Checklist
        label="Ten checks"
        items={[
          "The underlying business problem is clear.",
          "Each stakeholder's real need is understood.",
          "Proposed solutions are separated from needs.",
          "Genuine conflicts are visible.",
          "Constraints are documented.",
          "Must-haves are separated from preferences.",
          "Options and trade-offs are understood.",
          "The decision owner is clear.",
          "The chosen approach is documented.",
          "Requirements and acceptance criteria reflect the decision.",
        ]}
      />
      <p>
        If you have ten yeses, Technology should no longer need to ask: &ldquo;So&hellip; what exactly are we
        building?&rdquo;
      </p>

      <h2>The takeaway</h2>
      <p>Stakeholder disagreement is often where the real requirement is hiding.</p>
      <p>
        When Sales asks for flexibility, Operations asks for control, and Risk asks for fewer exceptions,
        don&rsquo;t immediately compromise.
      </p>
      <p>Ask what each person is trying to protect. Expose the real conflict. Make constraints visible.</p>
      <p>Show the trade-offs. Get the decision.</p>
      <blockquote>
        <strong>
          The BA&rsquo;s job isn&rsquo;t to find the middle. It&rsquo;s to find the requirement that best
          serves the outcome within the real constraints.
        </strong>
      </blockquote>
      <p>A good BA doesn&rsquo;t make everyone agree.</p>
      <p>
        <strong>A good BA makes sure everyone understands what was decided — and why.</strong>
      </p>
    </div>
  );
}

export { EveryoneWantsSomethingDifferentBody };
