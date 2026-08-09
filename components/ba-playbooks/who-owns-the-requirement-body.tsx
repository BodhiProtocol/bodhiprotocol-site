import Image from "next/image";

// This playbook is a narrative walkthrough of one requirement, not a list of
// standalone tips — so unlike most other BA Playbooks it renders as flowing
// prose instead of numbered hack cards. See app/ba-playbooks/[slug]/page.tsx's
// customPlaybookBodies registry.
function WhoOwnsTheRequirementBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>Someone asks:</p>
      <blockquote>&ldquo;Who owns this requirement?&rdquo;</blockquote>
      <p>Product says:</p>
      <blockquote>&ldquo;Business owns it.&rdquo;</blockquote>
      <p>Business says:</p>
      <blockquote>&ldquo;The BA has been managing it.&rdquo;</blockquote>
      <p>The BA says:</p>
      <blockquote>&ldquo;Risk made the decision.&rdquo;</blockquote>
      <p>Risk says:</p>
      <blockquote>&ldquo;Operations needs to confirm it.&rdquo;</blockquote>
      <p>Operations says:</p>
      <blockquote>&ldquo;Compliance should decide.&rdquo;</blockquote>
      <p>Compliance says:</p>
      <blockquote>&ldquo;Isn&rsquo;t this owned by Risk?&rdquo;</blockquote>
      <p>Six answers later, we still don&rsquo;t have an owner.</p>
      <p>That&rsquo;s the strange thing about requirements.</p>
      <p>A requirement can have plenty of people around it and still belong to nobody.</p>

      <h2>Here&rsquo;s the requirement</h2>
      <p>
        <strong>REQ-218 — Block trades when customer risk data is unavailable</strong>
      </p>
      <p>The requirement says:</p>
      <blockquote>If customer risk information cannot be retrieved, the trade must not proceed.</blockquote>
      <p>Development starts.</p>
      <p>Then QA asks:</p>
      <blockquote>&ldquo;What exactly should happen?&rdquo;</blockquote>
      <p>Should the trade:</p>
      <ul>
        <li>Fail completely?</li>
        <li>Go to Manual Review?</li>
        <li>Continue and be flagged afterwards?</li>
      </ul>
      <p>Good question.</p>
      <p>So the BA asks:</p>
      <p>
        <strong>Who can decide?</strong>
      </p>
      <p>That&rsquo;s where the real problem begins.</p>

      <h2>&ldquo;Ask the business&rdquo;</h2>
      <p>You&rsquo;ll hear this a lot.</p>
      <blockquote>&ldquo;Ask the business.&rdquo;</blockquote>
      <p>Okay.</p>
      <p>Which business?</p>
      <p>Risk?</p>
      <p>Operations?</p>
      <p>Front Office?</p>
      <p>Compliance?</p>
      <p>Product?</p>
      <p>&ldquo;Business&rdquo; is not an owner.</p>
      <p>It&rsquo;s a group of people who may want very different things.</p>
      <p>If the answer to &ldquo;who decides?&rdquo; is a department name, keep asking.</p>

      <h2>The BA doesn&rsquo;t automatically own it</h2>
      <p>You might have:</p>
      <ul>
        <li>written the story</li>
        <li>run the workshops</li>
        <li>documented the rules</li>
        <li>updated Jira</li>
        <li>explained it to development</li>
        <li>supported QA</li>
      </ul>
      <p>That still doesn&rsquo;t mean you should make the business decision.</p>
      <p>
        A BA often owns the <strong>clarity</strong> of the requirement.
      </p>
      <p>
        Not necessarily the <strong>choice</strong> behind it.
      </p>
      <p>That difference matters.</p>

      <h2>REQ-218 starts travelling</h2>
      <p>We ask Risk.</p>
      <p>Risk says:</p>
      <blockquote>&ldquo;Operations needs to confirm the workflow.&rdquo;</blockquote>
      <p>Operations says:</p>
      <blockquote>&ldquo;Compliance needs to confirm whether Manual Review is acceptable.&rdquo;</blockquote>
      <p>Compliance says:</p>
      <blockquote>&ldquo;Risk owns the policy.&rdquo;</blockquote>
      <p>Risk &rarr; Operations &rarr; Compliance &rarr; Risk.</p>
      <p>Everybody is involved.</p>
      <p>Nobody is deciding.</p>
      <p>This is what unclear ownership often looks like.</p>
      <p>Not silence.</p>
      <p>
        <strong>Circulation.</strong>
      </p>

      <h2>Find ownership at the decision point</h2>
      <p>Here&rsquo;s the simplest test:</p>
      <blockquote>If two stakeholders disagree, who makes the final call?</blockquote>
      <p>That question is much more useful than:</p>
      <blockquote>&ldquo;Who is involved?&rdquo;</blockquote>
      <p>For REQ-218, someone eventually has to choose:</p>
      <p>
        <strong>Reject</strong> or <strong>Manual Review</strong> or <strong>Continue</strong>.
      </p>
      <p>The person with authority to make that choice is much closer to the real owner.</p>
      <p>Ownership becomes visible when a decision has to be made.</p>

      <h2>Three roles worth separating</h2>
      <p>A lot of confusion disappears if we stop calling everyone the &ldquo;owner.&rdquo;</p>

      <h3>Requirement Owner</h3>
      <p>Accountable for what the business behaviour should be.</p>
      <p>They can approve a material change and stand behind the outcome.</p>

      <h3>Requirement Steward</h3>
      <p>Keeps the requirement clear, current and testable.</p>
      <p>Often the BA.</p>
      <p>The steward makes sure everyone understands the requirement, but does not automatically make the business decision.</p>

      <h3>Decision Owner</h3>
      <p>Makes a specific specialist decision. For example:</p>
      <ul>
        <li>
          <strong>Risk</strong> &rarr; risk treatment
        </li>
        <li>
          <strong>Compliance</strong> &rarr; regulatory interpretation
        </li>
        <li>
          <strong>Operations</strong> &rarr; operational process
        </li>
        <li>
          <strong>Technology</strong> &rarr; technical design
        </li>
      </ul>
      <p>These can be different people.</p>
      <p>That&rsquo;s perfectly fine.</p>
      <p>The problem is when nobody knows which role belongs to whom.</p>

      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/who-owns-the-requirement-infographic.png"
          alt="Infographic showing a requirement circulating from Business to BA to Risk to Operations to Compliance and back, the three roles of Requirement Owner, Requirement Steward and Decision Owner, the five-minute ownership test, and a before-and-after example of naming a requirement's owner."
          width={1024}
          height={1536}
          loading="lazy"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full max-w-xl rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          Three roles worth separating — and why &ldquo;Owner: Business&rdquo; isn&rsquo;t one of them.
        </figcaption>
      </figure>

      <h2>Back to REQ-218</h2>
      <p>Instead of writing:</p>
      <blockquote>Owner: Business</blockquote>
      <p>we write:</p>

      <dl>
        <dt>Requirement owner</dt>
        <dd>Head of Client Risk Controls</dd>
        <dt>Requirement steward</dt>
        <dd>Business Analyst</dd>
        <dt>Open decision</dt>
        <dd>What happens when customer risk data is unavailable?</dd>
        <dt>Decision owner</dt>
        <dd>Head of Client Risk Controls</dd>
        <dt>Consulted</dt>
        <dd>Operations, Compliance, Technology</dd>
        <dt>Impact if unresolved</dt>
        <dd>QA cannot validate the exception flow.</dd>
      </dl>

      <p>We still need the decision.</p>
      <p>But now we know who must make it.</p>
      <p>That alone changes the conversation.</p>
      <p>
        Instead of sending the requirement around the organisation, the BA can take the question to
        the person who actually has authority to resolve it.
      </p>

      <h2>Don&rsquo;t confuse expertise with ownership</h2>
      <p>The SME may know the process better than anyone.</p>
      <p>That doesn&rsquo;t automatically mean they can change it.</p>
      <p>The SME might say:</p>
      <blockquote>&ldquo;This is how the process works today.&rdquo;</blockquote>
      <p>The owner needs to be able to say:</p>
      <blockquote>&ldquo;This is how the process should work tomorrow.&rdquo;</blockquote>
      <p>Knowledge and authority are different things.</p>
      <p>Both matter.</p>
      <p>But they are not the same.</p>

      <h2>The 5-minute ownership test</h2>
      <p>Pick one important requirement.</p>
      <p>Ask:</p>

      <h3>1. Who can explain why it exists?</h3>
      <h3>2. Who can approve a material change?</h3>
      <h3>3. Who accepts the business outcome?</h3>
      <h3>4. If stakeholders disagree, who makes the final call?</h3>

      <p>That last question is the important one.</p>
      <p>If nobody can answer it clearly, you probably haven&rsquo;t found the owner yet.</p>

      <h2>What happened to REQ-218?</h2>
      <p>The Head of Client Risk Controls finally makes the call:</p>
      <blockquote>If risk data is unavailable, the trade must not proceed automatically.</blockquote>
      <p>Instead:</p>
      <blockquote>Send it to Manual Review.</blockquote>
      <p>Now the requirement becomes much clearer.</p>

      <h4>Business Rule</h4>
      <p>A trade must not proceed automatically when required customer risk data is unavailable.</p>

      <h4>Acceptance Criterion</h4>
      <p>
        <strong>Given</strong> customer risk data cannot be retrieved
        <br />
        <strong>When</strong> pre-trade validation runs
        <br />
        <strong>Then</strong> automatic processing stops
        <br />
        <strong>And</strong> the trade enters Manual Review.
      </p>

      <p>Now we know both:</p>
      <p>
        <strong>what the system should do</strong>
      </p>
      <p>and</p>
      <p>
        <strong>who stands behind the decision.</strong>
      </p>
    </div>
  );
}

export { WhoOwnsTheRequirementBody };
