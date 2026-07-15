import * as React from "react";

import { cn } from "@/lib/utils";

const tagClassName = (className?: string) =>
  cn(
    "inline-flex h-6 w-fit shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors",
    "data-[active=true]:border-brand data-[active=true]:bg-brand/10 data-[active=true]:text-brand",
    className,
  );

interface TagProps extends React.ComponentProps<"span"> {
  active?: boolean;
}

function Tag({ className, active, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      data-active={active}
      className={tagClassName(className)}
      {...props}
    />
  );
}

interface TagButtonProps extends React.ComponentProps<"button"> {
  active?: boolean;
}

function TagButton({ className, active, type = "button", ...props }: TagButtonProps) {
  return (
    <button
      data-slot="tag"
      data-active={active}
      type={type}
      className={tagClassName(
        cn("cursor-pointer hover:border-foreground/30 hover:text-foreground", className),
      )}
      {...props}
    />
  );
}

export { Tag, TagButton };
