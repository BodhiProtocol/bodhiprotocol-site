import type { ReactNode } from "react";

import { Eyebrow, Muted } from "@/components/ui/typography";
import { ShareButton } from "@/components/shared/share-button";
import { cn } from "@/lib/utils";

interface IBHeroProps {
  episode: number;
  title: string;
  tagline: string;
  author: string;
  date: string;
  readingTime: string;
  url: string;
  illustration?: ReactNode;
  illustrationWide?: boolean;
}

function IBHero({
  episode,
  title,
  tagline,
  author,
  date,
  readingTime,
  url,
  illustration,
  illustrationWide,
}: IBHeroProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center sm:py-24">
      <Eyebrow className="text-brand">Episode {String(episode).padStart(2, "0")}</Eyebrow>
      <h1 className="max-w-3xl font-serif text-4xl font-medium tracking-tight text-balance sm:text-6xl">
        {title}
      </h1>
      <p className="max-w-xl text-xl text-balance text-muted-foreground italic sm:text-2xl">
        {tagline}
      </p>
      <Muted className="font-mono text-xs">
        {author} · {date} · {readingTime}
      </Muted>
      <ShareButton
        title={title}
        url={url}
        shareLabel="Share this episode"
        eventName="invisible_business_shared"
      />
      {illustration ? (
        <div className={cn("mt-6 w-full", illustrationWide ? "max-w-2xl" : "max-w-xs sm:max-w-sm")}>
          {illustration}
        </div>
      ) : null}
    </div>
  );
}

export { IBHero };
