import type * as React from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow, H1, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.ComponentProps<"div"> {
  eyebrow?: string;
  title: string;
  description?: string;
}

function PageHeader({
  eyebrow,
  title,
  description,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("border-b border-border py-12 sm:py-16", className)} {...props}>
      <Container className="flex flex-col gap-4">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <H1>{title}</H1>
        {description ? <Lead className="max-w-2xl">{description}</Lead> : null}
        {children}
      </Container>
    </div>
  );
}

export { PageHeader };
