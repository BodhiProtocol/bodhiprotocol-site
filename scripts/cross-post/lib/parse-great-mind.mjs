import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const GREAT_MINDS_DIR = path.join(process.cwd(), "content/great-minds");

const JSX_TAG_PATTERN = /<[A-Z][a-zA-Z0-9]*[\s/>]/;

/**
 * Reads one Great Minds entry's frontmatter + body. The body is a standalone
 * flowing-prose article, same as an essay -- the wheel/timeline/mental-models
 * fields drive the interactive page only and aren't needed for cross-posting.
 */
export function loadGreatMind(slug) {
  const file = path.join(GREAT_MINDS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    throw new Error(`No Great Minds entry found at content/great-minds/${slug}.mdx`);
  }

  const raw = fs.readFileSync(file, "utf8");
  const { data: frontmatter, content: body } = matter(raw);

  if (JSX_TAG_PATTERN.test(body)) {
    console.warn(
      `Warning: ${slug}.mdx's body contains a custom component (e.g. <SomeComponent />). ` +
        `It won't render on Medium/Substack — check the generated output before publishing.`,
    );
  }

  // Great Minds frontmatter has no `title`/`tags` fields (it has `name`/`roles`) --
  // normalize to the shape publish-essay.mjs already expects from an essay.
  return {
    slug,
    frontmatter: { title: frontmatter.name, tags: frontmatter.roles || [] },
    body,
  };
}
