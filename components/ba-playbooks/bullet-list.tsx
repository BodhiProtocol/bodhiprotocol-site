import { FieldLabel } from "@/components/ba-playbooks/field-label";

interface BulletListProps {
  items: string[];
  label?: string;
}

function BulletList({ items, label = "At a glance" }: BulletListProps) {
  return (
    <div className="not-prose flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <ul className="flex flex-col gap-1.5 text-sm">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-foreground/90">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { BulletList };
