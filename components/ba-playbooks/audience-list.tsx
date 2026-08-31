import { Muted } from "@/components/ui/typography";

function joinNaturally(items: string[], andWord: string): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} ${andWord} ${items[items.length - 1]}`;
}

interface AudienceListProps {
  audience: string[];
  prefix?: string;
  andWord?: string;
}

function AudienceList({ audience, prefix = "For ", andWord = "and" }: AudienceListProps) {
  if (audience.length === 0) return null;

  return (
    <Muted>
      <span className="font-medium text-foreground/80">{prefix}</span>
      {joinNaturally(audience, andWord)}.
    </Muted>
  );
}

export { AudienceList };
