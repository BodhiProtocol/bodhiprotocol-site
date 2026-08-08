import { Muted } from "@/components/ui/typography";

function joinNaturally(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function AudienceList({ audience }: { audience: string[] }) {
  if (audience.length === 0) return null;

  return (
    <Muted>
      <span className="font-medium text-foreground/80">For </span>
      {joinNaturally(audience)}.
    </Muted>
  );
}

export { AudienceList };
