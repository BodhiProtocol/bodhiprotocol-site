import { extractToc } from "@/lib/toc";
import { cn } from "@/lib/utils";

function TableOfContents({ content }: { content: string }) {
  const entries = extractToc(content);
  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-2 text-sm">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.slug} className={cn(entry.depth === 3 && "pl-4")}>
            <a
              href={`#${entry.slug}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { TableOfContents };
