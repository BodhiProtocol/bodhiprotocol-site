import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

function NavigatorFooterCta() {
  return (
    <div className="mx-auto mt-16 max-w-xl border-t border-border py-10 text-center">
      <p className="text-[15px] text-muted-foreground">
        Navigator draws on essays and tools already on this site — start with whichever track is
        least familiar.
      </p>
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/lighthouse" />}
        className="mt-3 h-auto gap-1.5 px-0 text-brand hover:bg-transparent hover:text-brand"
      >
        <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover/button:border-current">
          Back to Lighthouse
        </span>
        <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
      </Button>
    </div>
  );
}

export { NavigatorFooterCta };
