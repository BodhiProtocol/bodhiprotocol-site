import { BookOpen } from "lucide-react";

import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindBook } from "@/types/content";

function GreatMindsBooks({ books }: { books: GreatMindBook[] }) {
  return (
    <section id="books" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">Go Deeper</Eyebrow>
        <H2>Books &amp; Resources</H2>
      </div>
      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <div key={book.title} className="flex gap-4 rounded-2xl border border-border p-5">
            <BookOpen className="mt-0.5 size-5 shrink-0 text-brand" />
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-base font-semibold">
                {book.title} <span className="font-sans text-sm font-normal text-muted-foreground">— {book.author}</span>
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{book.why}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { GreatMindsBooks };
