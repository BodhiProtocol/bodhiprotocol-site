import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const PLAYBOOKS_DIR = path.join(process.cwd(), "content/ba-playbooks");

/**
 * Playbook content files are plain-data .ts modules (a typed object literal,
 * not MDX) -- no bundler is involved here, so this strips the TypeScript-only
 * syntax that appears in them (a type-only import, one type annotation on the
 * export) and runs the rest as plain JS. Works for any file in this shape;
 * not a general TS-to-JS transform.
 */
function stripTypeScript(source) {
  return source
    .replace(/^import type .*;\s*$/gm, "")
    .replace(/^(export const \w+)\s*:\s*[^=\n]+(\s*=)/m, "$1$2");
}

async function loadPlaybookModule(slug) {
  const file = path.join(PLAYBOOKS_DIR, `${slug}.ts`);
  const source = fs.readFileSync(file, "utf8");
  const tmpFile = path.join(os.tmpdir(), `crosspost-playbook-${slug}-${Date.now()}.mjs`);
  fs.writeFileSync(tmpFile, stripTypeScript(source));
  try {
    const mod = await import(`file://${tmpFile}`);
    const [playbook] = Object.values(mod);
    return playbook;
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

function renderValue(value) {
  if (Array.isArray(value)) return value.map((item) => `- ${item}`).join("\n");
  return value;
}

/** Renders one hack's assorted optional fields (visual/compare/before-after/list/checklist/templates) as Markdown. */
function renderHack(hack) {
  const lines = [`## ${hack.number}. ${hack.title}`, "", `*${hack.insight}*`];

  if (hack.explanation) lines.push("", hack.explanation);
  if (hack.visual?.steps?.length) lines.push("", `**Flow:** ${hack.visual.steps.join(" → ")}`);

  if (hack.compare) {
    lines.push(
      "",
      `**${hack.compare.leftLabel}:** ${hack.compare.left}`,
      "",
      `**${hack.compare.rightLabel}:** ${hack.compare.right}`,
    );
  }

  if (hack.before !== undefined) lines.push("", "**Before:**", renderValue(hack.before));
  if (hack.after !== undefined) lines.push("", "**After:**", renderValue(hack.after));
  if (hack.list?.length) lines.push("", hack.list.map((item) => `- ${item}`).join("\n"));
  if (hack.checklist?.length) lines.push("", hack.checklist.map((item) => `- [ ] ${item}`).join("\n"));

  lines.push("", `**Why it helps:** ${hack.whyItHelps}`);
  if (hack.whenToUse) lines.push("", `**When to use:** ${hack.whenToUse}`);
  if (hack.proTip) lines.push("", `**Pro tip:** ${hack.proTip}`);

  if (hack.template) lines.push("", `**${hack.templateLabel || "Template"}:**`, "```", hack.template, "```");
  for (const t of hack.templates || []) {
    lines.push("", `**${t.label}:**`, "```", t.value, "```");
  }

  return lines.join("\n");
}

/**
 * Reads one BA Playbook and renders its structured hacks/intro/closing
 * fields as flowing Markdown -- there's no article body to lift like an
 * essay has, so this is a real conversion, not a strip-and-pass-through.
 * Only handles hacks-driven playbooks; a playbook whose body is a bespoke
 * narrative React component (no `hacks` array) can't be converted this way.
 */
export async function loadPlaybook(slug) {
  const file = path.join(PLAYBOOKS_DIR, `${slug}.ts`);
  if (!fs.existsSync(file)) {
    throw new Error(`No BA Playbook found at content/ba-playbooks/${slug}.ts`);
  }

  const data = await loadPlaybookModule(slug);

  if (!data.hacks || data.hacks.length === 0) {
    console.warn(
      `Warning: ${slug}.ts has no "hacks" array -- its body is likely a bespoke narrative ` +
        `component this script can't read. The generated file will be incomplete.`,
    );
  }

  const sections = [
    (data.intro || []).join("\n\n"),
    (data.hacks || []).map(renderHack).join("\n\n"),
  ];

  const closingParts = [];
  if (data.closingHeading?.length) closingParts.push(`## ${data.closingHeading.join(" ")}`);
  if (data.closingBody) closingParts.push(data.closingBody);
  if (data.closingTemplate) {
    closingParts.push(`**${data.closingTemplateName || "Template"}:**\n\`\`\`\n${data.closingTemplate}\n\`\`\``);
  }
  sections.push(closingParts.join("\n\n"));

  const body = sections.filter(Boolean).join("\n\n");

  return {
    slug,
    frontmatter: { title: data.title, tags: data.tags || [] },
    body,
    // Playbooks ship their own purpose-built infographic -- prefer it over the generic OG card.
    defaultImage: data.image?.src,
  };
}
