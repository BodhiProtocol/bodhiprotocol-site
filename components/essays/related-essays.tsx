import { ArticleCard } from "@/components/ui/article-card";
import { H3 } from "@/components/ui/typography";
import type { Essay } from "@/types/content";

function RelatedEssays({ essays }: { essays: Essay[] }) {
  if (essays.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 border-t border-border pt-8">
      <H3>Related essays</H3>
      <div className="grid gap-6 sm:grid-cols-3">
        {essays.map((essay) => (
          <ArticleCard key={essay.slug} essay={essay} />
        ))}
      </div>
    </div>
  );
}

export { RelatedEssays };
