"use client";

import { TagButton } from "@/components/ui/tag";

interface CategoryFilterProps {
  active: string;
  /** Real category values in use, e.g. from getPlaybookCategories(). "All" is prepended automatically. */
  categories: string[];
  onChange: (category: string) => void;
}

function CategoryFilter({ active, categories, onChange }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter playbooks by category" className="flex flex-wrap gap-2">
      {["All", ...categories].map((category) => (
        <TagButton key={category} active={active === category} onClick={() => onChange(category)}>
          {category}
        </TagButton>
      ))}
    </div>
  );
}

export { CategoryFilter };
