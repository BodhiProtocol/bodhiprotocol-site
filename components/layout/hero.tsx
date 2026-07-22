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
    <div className={cn("py-28 sm:py-40", className)} {...props}>
      <Container className="flex flex-col items-center text-center">
        {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
        <H1 className="max-w-3xl text-5xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-7xl">
          {title}
        </H1>
        {description ? (
          <Lead className="mt-6 max-w-md">{description}</Lead>
        ) : null}
        {actions ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export { Hero };
