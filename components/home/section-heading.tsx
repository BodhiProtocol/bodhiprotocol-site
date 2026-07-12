import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { H2 } from "@/components/ui/typography";

interface SectionHeadingProps {
  title: string;
  href: string;
  linkLabel?: string;
}

function SectionHeading({ title, href, linkLabel = "View all" }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <H2>{title}</H2>
      <Link
        href={href}
        className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {linkLabel}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export { SectionHeading };
