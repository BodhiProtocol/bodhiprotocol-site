import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ESSAYS_DIR = path.join(process.cwd(), "content/essays");

const JSX_TAG_PATTERN = /<[A-Z][a-zA-Z0-9]*[\s/>]/;

/** Reads one essay's frontmatter + body (frontmatter stripped) straight off disk. */
export function loadEssay(slug) {
  const file = path.join(ESSAYS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    throw new Error(`No essay found at content/essays/${slug}.mdx`);
  }

  const raw = fs.readFileSync(file, "utf8");
  const { data: frontmatter, content: body } = matter(raw);

  if (JSX_TAG_PATTERN.test(body)) {
    console.warn(
      `Warning: ${slug}.mdx contains a custom component (e.g. <SomeComponent />). ` +
        `It won't render on Medium/Substack — check the generated output before publishing.`,
    );
  }

  return { slug, frontmatter, body };
}

/** Rewrites the site's own root-relative links (`](/essays/...)`) to absolute URLs. */
export function toAbsoluteLinks(markdown, siteUrl) {
  return markdown.replace(
    /\]\((\/[^)\s]*)\)/g,
    (_match, relativePath) => `](${siteUrl}${relativePath})`,
  );
}
