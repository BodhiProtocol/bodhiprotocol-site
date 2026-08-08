"use client";

import { TagButton } from "@/components/ui/tag";

const PLAYBOOK_CATEGORIES = [
  "All",
  "Jira",
  "Requirements",
  "UAT",
  "APIs",
  "Data",
  "Stakeholders",
  "Delivery",
  "Capital Markets",
];

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter playbooks by category" className="flex flex-wrap gap-2">
      {PLAYBOOK_CATEGORIES.map((category) => (
        <TagButton key={category} active={active === category} onClick={() => onChange(category)}>
          {category}
        </TagButton>
      ))}
    </div>
  );
}

export { CategoryFilter, PLAYBOOK_CATEGORIES };
