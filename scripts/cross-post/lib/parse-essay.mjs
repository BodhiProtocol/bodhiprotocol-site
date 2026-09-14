import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ESSAYS_DIR = path.join(process.cwd(), "content/essays");

const JSX_TAG_PATTERN = /<[A-Z][a-zA-Z0-9]*[\s/>]/;

/**
 * Cross-post-only opening overrides, keyed by slug. An essay's first
 * paragraph on the site is written for a reader already committed to the
 * page; Medium/Substack need a concrete scene or stake to earn the read in
 * the first place. Replaces only the text before the first "## " heading --
 * everything after is untouched. Never changes the live site.
 */
const openingOverrides = {
  "what-happens-between-a-jira-ticket-and-a-test-case":
    "QA marks the ticket \"Passed.\" Three days later it's live, and support is fielding calls about the exact behavior QA just signed off on — because the test case matched the ticket, and the ticket never actually said what it needed to say. Nobody lied. Nobody skipped a step. The gap was invisible the whole time, sitting in a handful of silent decisions nobody wrote down between \"ticket created\" and \"ready to test.\"\n\nA Jira ticket eventually becomes a test case, but the ticket itself was never the spec. Something has to gather context, draft an actual functional spec, check that spec against two different standards, and only then generate test cases from it. Automating that pipeline with agents doesn't change the shape of the work — it just makes a process most BAs already do silently, in their head, visible as a diagram.\n\nFor habits that make the ticket clearer before it ever enters that pipeline, see [Jira Hacks for Business Analysts](/ba-playbooks/jira-hacks-for-business-analysts).",
  "writing-requirements-that-survive-contact-with-engineering":
    "Sprint planning, ten minutes in: an engineer asks what happens if the email doesn't exist. The room goes quiet. The requirement doc is open on the screen — clear, clean, three paragraphs — and it doesn't say. It never occurred to anyone to say, because on paper the requirement looked finished.\n\nMost requirements documents fail exactly this way: they read perfectly clearly to the person who wrote them, and fall apart the moment an engineer asks the first real follow-up question. The gap isn't intelligence or effort — it's that the requirement described the *what* the business wants, without ever forcing a decision on the *edge cases* engineering will hit first.",
  "from-stakeholder-sentence-to-acceptance-criteria":
    '"The compliance team needs a way to flag suspicious trades before end of day." That\'s a real requirement. It\'s also useless to an engineer as written, because nobody has said what "a way to flag" actually means — and if the BA guesses wrong, the desk finds out at end of day, when it\'s too late to fix before the deadline that sentence was actually about.\n\nStakeholders don\'t speak in user stories. They speak in run-on sentences, half-finished asks, and complaints disguised as requirements. Turning a sentence like the one above into `As a [role], I want [goal], so that [benefit]` plus acceptance criteria is a core BA skill, and it\'s usually invisible — done silently in a notebook or a Jira ticket, with none of the reasoning shown.',
};

/** Reads one essay's frontmatter + body (frontmatter stripped) straight off disk. */
export function loadEssay(slug) {
  const file = path.join(ESSAYS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    throw new Error(`No essay found at content/essays/${slug}.mdx`);
  }

  const raw = fs.readFileSync(file, "utf8");
  const { data: frontmatter, content: rawBody } = matter(raw);

  if (JSX_TAG_PATTERN.test(rawBody)) {
    console.warn(
      `Warning: ${slug}.mdx contains a custom component (e.g. <SomeComponent />). ` +
        `It won't render on Medium/Substack — check the generated output before publishing.`,
    );
  }

  const override = openingOverrides[slug];
  const body = override ? rawBody.replace(/^[\s\S]*?(?=\n## )/, override) : rawBody;

  return { slug, frontmatter, body };
}

/** Rewrites the site's own root-relative links (`](/essays/...)`) to absolute URLs. */
export function toAbsoluteLinks(markdown, siteUrl) {
  return markdown.replace(
    /\]\((\/[^)\s]*)\)/g,
    (_match, relativePath) => `](${siteUrl}${relativePath})`,
  );
}
