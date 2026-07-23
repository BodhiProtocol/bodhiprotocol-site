import { Quote } from "lucide-react";

// Shared static callout used across Great Minds sections. No JS/animation —
// keeps section components server-rendered, consistent with the rest of the
// series. Renders nothing when `text` is omitted.
function GreatMindsTakeaway({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-brand/20 bg-brand/[0.06] px-5 py-4">
      <Quote className="mt-0.5 size-4 shrink-0 text-brand" />
      <p className="text-sm leading-relaxed font-medium text-foreground">{text}</p>
    </div>
  );
}

export { GreatMindsTakeaway };
