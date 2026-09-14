import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const GREAT_MINDS_DIR = path.join(process.cwd(), "content/great-minds");

const JSX_TAG_PATTERN = /<[A-Z][a-zA-Z0-9]*[\s/>]/;

/** Renders the mental-models / big-ideas / thinking-process frontmatter arrays as a Markdown bullet section. */
function renderEntryList(heading, entries, takeaway) {
  if (!entries || entries.length === 0) return "";
  const items = entries.map((entry) => `- **${entry.name || entry.title}** — ${entry.description}`);
  const takeawayLine = takeaway ? `\n\n*${takeaway}*` : "";
  return `\n\n## ${heading}\n\n${items.join("\n")}${takeawayLine}`;
}

/** Renders the core-philosophy paragraph + its optional takeaway line. */
function renderCorePhilosophy(text, takeaway) {
  if (!text) return "";
  const takeawayLine = takeaway ? `\n\n*${takeaway}*` : "";
  return `\n\n## Core Philosophy\n\n${text}${takeawayLine}`;
}

/** Renders the before/after turning-point comparison as a short Markdown section. */
function renderTurningPoint(turningPoint) {
  if (!turningPoint) return "";
  const { heading, before, after, insight } = turningPoint;
  return (
    `\n\n## ${heading}\n\n` +
    `**Before (${before.year}) — ${before.label}:** ${before.description}\n\n` +
    `**After (${after.year}) — ${after.label}:** ${after.description}\n\n` +
    insight
  );
}

/**
 * Reads one Great Minds entry's frontmatter + body, and extends the body
 * with the core philosophy, thinking process, turning point, mental models,
 * big ideas, and closing reflection that otherwise only appear in the
 * interactive page's own sections -- the wheel/timeline data and any
 * bespoke diagram component still aren't included.
 */
export function loadGreatMind(slug) {
  const file = path.join(GREAT_MINDS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    throw new Error(`No Great Minds entry found at content/great-minds/${slug}.mdx`);
  }

  const raw = fs.readFileSync(file, "utf8");
  const { data: frontmatter, content: baseBody } = matter(raw);

  if (JSX_TAG_PATTERN.test(baseBody)) {
    console.warn(
      `Warning: ${slug}.mdx's body contains a custom component (e.g. <SomeComponent />). ` +
        `It won't render on Medium/Substack — check the generated output before publishing.`,
    );
  }

  const body =
    baseBody +
    renderCorePhilosophy(frontmatter.corePhilosophy, frontmatter.corePhilosophyTakeaway) +
    renderEntryList("Thinking Process", frontmatter.thinkingProcess, frontmatter.thinkingProcessTakeaway) +
    renderTurningPoint(frontmatter.turningPoint) +
    renderEntryList("Mental Models", frontmatter.mentalModels, frontmatter.mentalModelsTakeaway) +
    renderEntryList("Big Ideas", frontmatter.bigIdeas) +
    (frontmatter.closingReflection ? `\n\n${frontmatter.closingReflection}` : "");

  // Great Minds frontmatter has no `title`/`tags` fields (it has `name`/`roles`) --
  // normalize to the shape publish-essay.mjs already expects from an essay.
  return {
    slug,
    frontmatter: { title: frontmatter.name, tags: frontmatter.roles || [] },
    body,
  };
}
