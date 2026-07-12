import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type * as React from "react";

function Divider({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator className={cn("my-8", className)} {...props} />;
}

export { Divider };
