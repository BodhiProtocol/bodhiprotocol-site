import { Sparkles } from "lucide-react";

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex items-start gap-2.5 rounded-lg bg-brand/8 px-3 py-2.5">
      <Sparkles className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-foreground/90">
        <span className="font-medium text-brand">Pro tip — </span>
        {children}
      </p>
    </div>
  );
}

export { ProTip };
