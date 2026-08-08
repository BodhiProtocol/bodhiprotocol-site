import { Muted } from "@/components/ui/typography";

function AudienceList({ audience }: { audience: string[] }) {
  if (audience.length === 0) return null;

  return (
    <Muted>
      <span className="font-medium text-foreground/80">For </span>
      {audience.join(", ")}
    </Muted>
  );
}

export { AudienceList };
