import type * as React from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow, H1, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface HeroProps extends Omit<React.ComponentProps<"div">, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
}

function Hero({
  eyebrow,
  title,
  description,
  actions,
  className,
  ...props
}: HeroProps) {
  return (
    <div className={cn("py-24 sm:py-32", className)} {...props}>
      <Container className="flex flex-col items-center gap-6 text-center">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <H1 className="max-w-3xl">{title}</H1>
        {description ? (
          <Lead className="max-w-xl">{description}</Lead>
        ) : null}
        {actions ? (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export { Hero };
