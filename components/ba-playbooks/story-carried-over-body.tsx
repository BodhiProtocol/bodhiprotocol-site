import Image from "next/image";

import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";

// This playbook is a narrative walkthrough of one ticket, not a list of
// standalone tips — so unlike every other BA Playbook it renders as flowing
// prose instead of numbered hack cards. See app/ba-playbooks/[slug]/page.tsx's
// customPlaybookBodies registry.
function StoryCarriedOverBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>Sprint 1: carried over.</p>
      <p>Sprint 2: carried over.</p>
      <p>Sprint 3: carried over.</p>
      <p>Monday morning.</p>
      <p>Sprint 4.</p>
      <p>And there it is again.</p>
      <p>
        <strong>ABC-142.</strong>
      </p>
      <p>Same title.</p>
      <p>Same story points.</p>
      <p>Same slightly uncomfortable feeling when somebody asks:</p>
      <blockquote>&ldquo;What&rsquo;s left on this one?&rdquo;</blockquote>
      <p>Someone says:</p>
      <blockquote>&ldquo;It&rsquo;s almost done.&rdquo;</blockquote>
      <p>Which is interesting.</p>
      <p>Because it was almost done three weeks ago too.</p>
      <p>At this point, I wouldn&rsquo;t ask:</p>
      <p>
        <strong>&ldquo;How do we finish this story?&rdquo;</strong>
      </p>
      <p>I&rsquo;d ask:</p>
      <p>
        <strong>&ldquo;Why has this story survived four sprints?&rdquo;</strong>
      </p>
      <p>Because a story that keeps carrying over is usually telling you something.</p>
      <p>The mistake is treating the carry-over itself as the problem.</p>
      <p>Let&rsquo;s open the ticket.</p>

      <h2>First, stop calling it &ldquo;almost done&rdquo;</h2>
      <p>ABC-142 says:</p>
      <p>
        <strong>Status:</strong> In Progress
      </p>
      <p>The latest comment says:</p>
      <blockquote>&ldquo;Development almost complete. Pending final validation.&rdquo;</blockquote>
      <p>Sounds reasonable.</p>
      <p>But &ldquo;almost done&rdquo; is not particularly useful.</p>
      <p>So ask:</p>
      <p>
        <strong>What exactly is unfinished?</strong>
      </p>
      <p>Not:</p>
      <p>&ldquo;How much is left?&rdquo;</p>
      <p>Not:</p>
      <p>&ldquo;What percentage is complete?&rdquo;</p>
      <p>Actually name the remaining thing.</p>
      <p>We ask the developer.</p>
      <p>Turns out:</p>
      <ul>
        <li>UI is finished.</li>
        <li>Backend changes are finished.</li>
        <li>API integration is finished.</li>
        <li>Unit testing is finished.</li>
      </ul>
      <p>So development isn&rsquo;t really the problem.</p>
      <p>QA is waiting.</p>
      <p>Okay.</p>
      <p>Now we have somewhere to look.</p>

      <h2>The story is not blocked by everything</h2>
      <p>This is a useful distinction.</p>
      <p>A story can look stuck as one big object.</p>
      <p>
        But usually only <strong>one part</strong> is actually stuck.
      </p>
      <p>ABC-142 has been sitting in &ldquo;In Progress&rdquo; for weeks.</p>
      <p>That makes it feel like the whole story is unfinished.</p>
      <p>It isn&rsquo;t.</p>
      <p>Most of it is done.</p>
      <p>The remaining issue is:</p>
      <blockquote>QA cannot complete one test scenario.</blockquote>
      <p>Much better.</p>
      <p>Now ask:</p>
      <p>
        <strong>Why?</strong>
      </p>

      <h2>QA says the expected behaviour is unclear</h2>
      <p>The scenario is simple.</p>
      <p>An upstream service normally returns customer risk data.</p>
      <p>But sometimes the service returns no record.</p>
      <p>QA asks:</p>
      <blockquote>&ldquo;What should happen when no risk record is returned?&rdquo;</blockquote>
      <p>The acceptance criteria say:</p>
      <blockquote>System should handle the response appropriately.</blockquote>
      <p>There&rsquo;s that word.</p>
      <p>
        <strong>Appropriately.</strong>
      </p>
      <p>Development interpreted that as:</p>
      <blockquote>Continue processing.</blockquote>
      <p>QA interpreted it as:</p>
      <blockquote>Stop processing and show an error.</blockquote>
      <p>The business hasn&rsquo;t confirmed either.</p>
      <p>So now we know something important.</p>
      <p>ABC-142 is not really waiting for QA.</p>
      <p>QA is waiting for a requirement.</p>

      <h2>So we check the requirement</h2>
      <p>Maybe the answer is already somewhere.</p>
      <p>We look through the ticket.</p>
      <p>Description.</p>
      <p>Nothing.</p>
      <p>Acceptance criteria.</p>
      <p>Nothing.</p>
      <p>Linked Confluence page.</p>
      <p>Nothing.</p>
      <p>Then we reach the comments.</p>
      <p>Comment #38:</p>
      <blockquote>
        &ldquo;Need business confirmation on expected behaviour when no risk record is
        returned.&rdquo;
      </blockquote>
      <p>Posted 13 days ago.</p>
      <p>No answer.</p>
      <p>There it is.</p>
      <p>Four sprints of carry-over.</p>
      <p>And the actual blocker is one unanswered question sitting inside a Jira comment.</p>
      <p>The story wasn&rsquo;t blocked by development.</p>
      <p>It wasn&rsquo;t really blocked by QA either.</p>
      <p>
        <strong>It was blocked by a decision nobody had made visible.</strong>
      </p>

      <h2>This is why carry-over is useful information</h2>
      <p>It&rsquo;s tempting to treat carry-over as a planning problem.</p>
      <p>Maybe estimation was bad.</p>
      <p>Maybe the team took too much work.</p>
      <p>Maybe velocity is falling.</p>
      <p>Sometimes that is exactly what happened.</p>
      <p>But repeated carry-over deserves a different question.</p>
      <p>Not:</p>
      <blockquote>Why are we slow?</blockquote>
      <p>Ask:</p>
      <p>
        <strong>What kind of unfinished work keeps surviving the sprint boundary?</strong>
      </p>
      <p>Because &ldquo;unfinished&rdquo; can mean very different things.</p>

      <h2>There are at least six kinds of unfinished</h2>
      <p>When I see a story repeatedly carrying over, I try to classify the blocker.</p>

      <h3>1. Technical unfinished</h3>
      <p>There is genuinely more implementation work.</p>
      <p>Code is incomplete.</p>
      <p>Integration is incomplete.</p>
      <p>A technical problem has not been solved.</p>
      <p>Straightforward.</p>

      <h3>2. Requirement unfinished</h3>
      <p>The team does not actually know what the system should do.</p>
      <p>Maybe:</p>
      <ul>
        <li>acceptance criteria are unclear</li>
        <li>an exception wasn&rsquo;t defined</li>
        <li>a rule is missing</li>
        <li>two stakeholders interpret the requirement differently</li>
      </ul>
      <p>The code may be waiting for understanding.</p>

      <h3>3. Dependency unfinished</h3>
      <p>Your team is done with its part.</p>
      <p>But you are waiting for:</p>
      <ul>
        <li>another team</li>
        <li>an API</li>
        <li>infrastructure</li>
        <li>test environment</li>
        <li>vendor</li>
        <li>reference data</li>
        <li>approval</li>
      </ul>
      <p>The story is technically &ldquo;in progress,&rdquo; but the work remaining sits somewhere else.</p>

      <h3>4. Testing unfinished</h3>
      <p>Development may be complete.</p>
      <p>But behaviour hasn&rsquo;t been proven.</p>
      <p>Maybe:</p>
      <ul>
        <li>test data is missing</li>
        <li>QA environment is broken</li>
        <li>test cases are unclear</li>
        <li>defects remain</li>
        <li>business validation hasn&rsquo;t happened</li>
      </ul>
      <p>Different problem.</p>
      <p>Different owner.</p>

      <h3>5. Scope unfinished</h3>
      <p>This one is sneaky.</p>
      <p>Every time somebody touches the story, something else gets added.</p>
      <blockquote>&ldquo;While we&rsquo;re here, can we also&hellip;&rdquo;</blockquote>
      <p>Then:</p>
      <blockquote>&ldquo;This edge case should probably be included.&rdquo;</blockquote>
      <p>Then:</p>
      <blockquote>&ldquo;We should support another market too.&rdquo;</blockquote>
      <p>The story is not finishing because the finish line keeps moving.</p>

      <h3>6. Decision unfinished</h3>
      <p>Someone needs to choose.</p>
      <p>Option A or B.</p>
      <p>Approve or reject.</p>
      <p>Include or exclude.</p>
      <p>Fail or continue.</p>
      <p>But no one has clearly made the decision.</p>
      <p>This is what happened to ABC-142.</p>
      <p>And it&rsquo;s incredibly common.</p>

      <blockquote>If a story keeps coming back, this is the first thing I&rsquo;d try to identify.</blockquote>
      <figure className="not-prose my-10 flex flex-col items-center gap-3">
        <Image
          src="/images/ba-playbooks/story-carried-over-four-sprints-infographic.png"
          alt="Infographic showing ABC-142 carried across four sprints, six possible blocker types, the hidden business decision blocking QA, a five-question carry-over diagnostic, and a before-and-after Jira status example."
          width={1024}
          height={1536}
          loading="lazy"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full max-w-xl rounded-2xl border border-border"
        />
        <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
          Six ways a story can be unfinished — and why &ldquo;carried over&rdquo; does not tell you
          which one.
        </figcaption>
      </figure>

      <h2>Back to ABC-142</h2>
      <p>Now that we know the blocker, the next step becomes obvious.</p>
      <p>Instead of saying:</p>
      <blockquote>&ldquo;Still pending QA.&rdquo;</blockquote>
      <p>we update the story:</p>

      <h4>Blocker</h4>
      <p>Expected behaviour is undefined when the upstream Risk Service returns no customer record.</p>

      <h4>Decision required</h4>
      <p>Should the transaction:</p>
      <p>A. Continue processing without risk data?</p>
      <p>or</p>
      <p>B. Stop processing and display an error?</p>

      <h4>Decision owner</h4>
      <p>Risk Operations</p>

      <h4>Impact</h4>
      <p>QA cannot complete Scenario AC-07 until expected behaviour is confirmed.</p>

      <h4>Owner</h4>
      <p>Business Analyst</p>

      <p>Now the problem is visible.</p>
      <p>That alone is an improvement.</p>
      <p>A vague red status has become a specific decision.</p>

      <h2>Then ask whether this should still be one story</h2>
      <p>There is another question worth asking after multiple carry-overs:</p>
      <p>
        <strong>Is this actually still one coherent piece of work?</strong>
      </p>
      <p>Imagine ABC-142 contains:</p>
      <ul>
        <li>new UI</li>
        <li>backend service</li>
        <li>API integration</li>
        <li>data migration</li>
        <li>reporting change</li>
        <li>audit logging</li>
        <li>five market-specific rules</li>
      </ul>
      <p>And six of those things are finished.</p>
      <p>At some point, keeping everything inside one story stops helping.</p>
      <p>Maybe completed scope can be separated.</p>
      <p>Maybe the unfinished part deserves its own ticket.</p>
      <p>Maybe the original story was simply too large.</p>
      <p>The point isn&rsquo;t to split stories just to improve metrics.</p>
      <p>The question is:</p>
      <p>
        <strong>Does keeping all of this together still help us understand and deliver the work?</strong>
      </p>
      <p>If not, restructure it.</p>

      <h2>Check whether the story changed while people were building it</h2>
      <p>Now look at the history.</p>
      <p>What did ABC-142 look like in Sprint 1?</p>
      <p>What does it look like now?</p>
      <p>Maybe acceptance criteria were added during Sprint 2.</p>
      <p>Another market was added in Sprint 3.</p>
      <p>An exception appeared during QA.</p>
      <p>A reporting change was added last week.</p>
      <p>This is useful because sometimes a story hasn&rsquo;t &ldquo;taken four sprints.&rdquo;</p>
      <p>
        <strong>Four different versions of the story have taken four sprints.</strong>
      </p>
      <p>That is a different problem.</p>
      <p>Look at:</p>
      <ul>
        <li>description history</li>
        <li>acceptance-criteria changes</li>
        <li>newly added scope</li>
        <li>comments containing decisions</li>
        <li>linked defects</li>
        <li>new dependencies</li>
      </ul>
      <p>If the requirement keeps changing after implementation starts, call that out.</p>
      <p>Don&rsquo;t hide it inside the carry-over number.</p>

      <h2>Ask whether QA found a defect or a missing requirement</h2>
      <p>This distinction matters.</p>
      <p>Suppose QA says:</p>
      <blockquote>&ldquo;The system doesn&rsquo;t show a warning when the upstream response is empty.&rdquo;</blockquote>
      <p>Was a warning required?</p>
      <p>If yes:</p>
      <p>
        <strong>Defect.</strong>
      </p>
      <p>The implementation failed to meet an agreed requirement.</p>
      <p>If nobody had ever decided what should happen:</p>
      <p>
        <strong>Requirement gap.</strong>
      </p>
      <p>Those should not be treated as the same thing.</p>
      <p>Otherwise teams end up logging defects against behaviour nobody actually specified.</p>
      <p>And that creates a strange cycle:</p>
      <MiniDiagram
        label="The cycle"
        steps={[
          "Missing requirement",
          "Logged as defect",
          "Developer asks what correct behaviour is",
          "Business decision needed",
          "Story carries over again",
        ]}
      />
      <p>Name the real problem.</p>

      <h2>Find the owner of the blocker</h2>
      <p>&ldquo;Waiting for business&rdquo; is not ownership.</p>
      <p>&ldquo;Blocked by another team&rdquo; is not ownership.</p>
      <p>&ldquo;Pending clarification&rdquo; is not ownership.</p>
      <p>Ask:</p>
      <p>
        <strong>Who is the person responsible for getting the next answer or action?</strong>
      </p>
      <p>Not necessarily the person who must make the decision.</p>
      <p>For ABC-142:</p>
      <p>Risk Operations owns the decision.</p>
      <p>But the BA might own getting that decision.</p>
      <p>That means:</p>
      <dl>
        <dt>Decision owner</dt>
        <dd>Risk Operations</dd>
        <dt>Next-action owner</dt>
        <dd>BA</dd>
        <dt>Next action</dt>
        <dd>Arrange decision with Risk Operations</dd>
        <dt>Due</dt>
        <dd>Tuesday</dd>
      </dl>
      <p>Now something can move.</p>

      <h2>The five-minute carry-over test</h2>
      <p>The next time a story arrives in another sprint, ask these five questions.</p>

      <h3>1. What exactly is unfinished?</h3>
      <p>Be specific.</p>
      <p>Not:</p>
      <blockquote>&ldquo;Testing.&rdquo;</blockquote>
      <p>Instead:</p>
      <blockquote>
        &ldquo;QA cannot complete AC-07 because expected empty-response behaviour is
        undefined.&rdquo;
      </blockquote>

      <h3>2. Why is it unfinished?</h3>
      <p>Find the type of blocker.</p>
      <p>Technical?</p>
      <p>Requirement?</p>
      <p>Dependency?</p>
      <p>Testing?</p>
      <p>Scope?</p>
      <p>Decision?</p>

      <h3>3. Who or what are we waiting for?</h3>
      <p>Name it.</p>
      <p>Person.</p>
      <p>Team.</p>
      <p>System.</p>
      <p>Environment.</p>
      <p>Decision.</p>

      <h3>4. Can the completed part be separated?</h3>
      <p>Maybe yes.</p>
      <p>Maybe no.</p>
      <p>But ask.</p>
      <p>Keeping finished work trapped inside one enormous story may not help anyone.</p>

      <h3>5. What is the next concrete action?</h3>
      <p>Not:</p>
      <blockquote>&ldquo;Follow up.&rdquo;</blockquote>
      <p>Something real.</p>
      <blockquote>&ldquo;Risk Operations to confirm fail-vs-continue behaviour by Tuesday.&rdquo;</blockquote>
      <p>Now you can actually manage it.</p>

      <h2>What happened to ABC-142?</h2>
      <p>Risk Operations eventually confirms:</p>
      <blockquote>
        If no customer risk record is returned, processing must stop and the transaction should
        enter Manual Review.
      </blockquote>
      <p>Good.</p>
      <p>Now we update the requirement.</p>

      <h4>Business Rule</h4>
      <p>Transactions without an available customer risk record must not proceed automatically.</p>

      <h4>Acceptance Criterion</h4>
      <p>
        <strong>Given</strong> no customer risk record is returned
        <br />
        <strong>When</strong> transaction validation runs
        <br />
        <strong>Then</strong> processing stops
        <br />
        <strong>And</strong> the transaction enters Manual Review status.
      </p>

      <p>QA tests it.</p>
      <p>Passes.</p>
      <p>ABC-142 closes.</p>
      <p>The development work wasn&rsquo;t the thing that took four sprints.</p>
      <p>The unanswered behaviour did.</p>
      <p>That distinction matters.</p>

      <h2>A story can be green and still be stuck</h2>
      <p>This is another trap.</p>
      <p>Teams often use Jira status as shorthand for health.</p>
      <p>To Do.</p>
      <p>In Progress.</p>
      <p>Testing.</p>
      <p>Done.</p>
      <p>But the status doesn&rsquo;t tell you whether understanding is moving.</p>
      <p>A story can sit in &ldquo;In Progress&rdquo; while absolutely nothing useful happens for ten days.</p>
      <p>So when something carries over repeatedly, ignore the status for a minute.</p>
      <p>Ask:</p>
      <p>
        <strong>What changed on this story during the last sprint?</strong>
      </p>
      <p>Was a decision made?</p>
      <p>Was a blocker removed?</p>
      <p>Was a dependency delivered?</p>
      <p>Was something tested?</p>
      <p>Was scope clarified?</p>
      <p>If the answer is basically nothing, moving it into another sprint will not magically change that.</p>

      <h2>Don&rsquo;t automatically blame estimation</h2>
      <p>Sometimes the team simply underestimated the work.</p>
      <p>Of course.</p>
      <p>But repeated carry-over can also be a symptom of:</p>
      <ul>
        <li>vague requirements</li>
        <li>hidden dependencies</li>
        <li>delayed decisions</li>
        <li>scope creep</li>
        <li>poor story splitting</li>
        <li>missing test data</li>
        <li>environment issues</li>
        <li>unclear ownership</li>
      </ul>
      <p>
        If you treat every carry-over as &ldquo;bad estimation,&rdquo; you may spend hours adjusting
        story points while the real blocker sits untouched.
      </p>
      <p>That&rsquo;s why diagnosis comes first.</p>
    </div>
  );
}

export { StoryCarriedOverBody };
