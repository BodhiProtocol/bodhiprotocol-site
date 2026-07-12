import * as React from "react";

import { cn } from "@/lib/utils";

interface TagProps extends React.ComponentProps<"span"> {
  active?: boolean;
}

function Tag({ className, active, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      data-active={active}
      className={cn(
        "inline-flex h-6 w-fit shrink-0 items-center rounded-full border border-border px-2.5 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors",
        "data-[active=true]:border-brand data-[active=true]:bg-brand/10 data-[active=true]:text-brand",
        props.onClick &&
          "cursor-pointer hover:border-foreground/30 hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Tag };
