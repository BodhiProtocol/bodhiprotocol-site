import { getAllBlueprints } from "@/lib/blueprints";
import { getAllEssays } from "@/lib/essays";
import { getAllLabs } from "@/lib/labs";
import { getAllResources } from "@/lib/resources";

export type SearchItemType = "essay" | "blueprint" | "lab" | "resource";

export interface SearchItem {
  type: SearchItemType;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  href: string;
}

export function getSearchIndex(): SearchItem[] {
  const essays: SearchItem[] = getAllEssays().map((essay) => ({
    type: "essay",
    title: essay.title,
    description: essay.description,
    category: essay.category,
    tags: essay.tags,
    content: essay.content,
    href: `/essays/${essay.slug}`,
  }));

  const blueprints: SearchItem[] = getAllBlueprints().map((blueprint) => ({
    type: "blueprint",
    title: blueprint.title,
    description: blueprint.summary,
    category: blueprint.module,
    tags: [...blueprint.tags, blueprint.season],
    content: blueprint.content,
    href: `/lighthouse/${blueprint.slug}`,
  }));

  const labs: SearchItem[] = getAllLabs().map((lab) => ({
    type: "lab",
    title: lab.title,
    description: lab.description,
    category: lab.category,
    tags: lab.technology,
    content: "",
    href: "/labs",
  }));

  const resources: SearchItem[] = getAllResources().map((resource) => ({
    type: "resource",
    title: resource.title,
    description: resource.why,
    category: resource.category,
    tags: [resource.author, resource.kind],
    content: "",
    href: "/library",
  }));

  return [...essays, ...blueprints, ...labs, ...resources];
}
