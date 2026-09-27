import { Eyebrow } from "@/components/ui/typography";

interface IBArticleHeroProps {
  episode: number;
  title: string;
  tagline: string;
  author: string;
  date: string;
  readingTime: string;
  /** Optional series line shown after the episode number (e.g. "The Hidden Economics of Lahori Zeera"). */
  kicker?: string;
}

// Left-aligned hero that lives inside the article column of a bespoke episode
// page, so the sticky sidebar (table of contents + outcome card) aligns with it
// at the top of the grid.
function IBArticleHero({
  episode,
  title,
  tagline,
  author,
  date,
  readingTime,
  kicker,
}: IBArticleHeroProps) {
  return (
    <header className="flex flex-col gap-4">
      <Eyebrow className="text-brand">
        Episode {String(episode).padStart(2, "0")}
        {kicker ? ` · ${kicker}` : null}
      </Eyebrow>
      <h1 className="font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="font-serif text-xl text-brand italic sm:text-2xl">{tagline}</p>
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
          {author.charAt(0)}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {author} · {date} · {readingTime}
        </span>
      </div>
    </header>
  );
}

export { IBArticleHero };
