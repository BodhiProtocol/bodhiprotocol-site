import Image from "next/image";

import { H1, Lead } from "@/components/ui/typography";
import type { Blueprint } from "@/types/content";

function BlueprintHero({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div className="flex flex-col gap-6">
      {blueprint.heroImage ? (
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-xl">
          <Image
            src={blueprint.heroImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        <H1>{blueprint.title}</H1>
        <Lead>{blueprint.summary}</Lead>
      </div>
    </div>
  );
}

export { BlueprintHero };
