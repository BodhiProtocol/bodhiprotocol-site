import { ScrollText } from "lucide-react";

// Low-key by design: a collapsible disclosure, not a headline section — it
// should increase credibility without competing with the main narrative.
// Renders nothing when a mind's frontmatter doesn't define scholarshipNotes.
function GreatMindsScholarshipNotes({ notes }: { notes?: string[] }) {
  if (!notes || notes.length === 0) return null;

  return (
    <details className="group rounded-2xl border border-border p-5">
      <summary className="flex cursor-pointer items-center gap-2 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase marker:content-none">
        <ScrollText className="size-3.5 text-brand" />
        Scholarship Notes
      </summary>
      <ul className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
        {notes.map((note) => (
          <li key={note} className="text-sm leading-relaxed text-muted-foreground">
            {note}
          </li>
        ))}
      </ul>
    </details>
  );
}

export { GreatMindsScholarshipNotes };
