import { getAllBlueprints } from "@/lib/blueprints";
import { getAllEssays } from "@/lib/essays";
import { getAllGreatMinds } from "@/lib/great-minds";
import { getAllInvisibleBusinesses } from "@/lib/invisible-businesses";
import { getAllTools } from "@/lib/tools";
import { getAllResources } from "@/lib/resources";

export type SearchItemType =
  | "essay"
  | "invisibleBusiness"
  | "greatMind"
  | "blueprint"
  | "tool"
  | "resource"
  | "simulator";

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

  const invisibleBusinesses: SearchItem[] = getAllInvisibleBusinesses().map((episode) => ({
    type: "invisibleBusiness",
    title: episode.title,
    description: episode.description,
    category: "Invisible Businesses",
    tags: [],
    content: episode.content,
    href: `/invisible-businesses/${episode.slug}`,
  }));

  const greatMinds: SearchItem[] = getAllGreatMinds().map((mind) => ({
    type: "greatMind",
    title: mind.name,
    description: mind.positioning,
    category: "Great Minds",
    tags: mind.roles,
    content: mind.content,
    href: `/great-minds/${mind.slug}`,
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

  const tools: SearchItem[] = getAllTools().map((tool) => ({
    type: "tool",
    title: tool.title,
    description: tool.description,
    category: tool.category,
    tags: tool.technology,
    content: "",
    href: "/tools",
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

  const simulators: SearchItem[] = [
    {
      type: "simulator",
      title: "Network Effects",
      description: "Move the sliders and discover why products become more valuable as more people join.",
      category: "Simulators",
      tags: ["network effects", "flywheel", "platform"],
      content: "",
      href: "/simulators/network-effects",
    },
    {
      type: "simulator",
      title: "Supply & Demand",
      description: "See how price is determined by the balance between buyers and sellers.",
      category: "Simulators",
      tags: ["supply and demand", "equilibrium", "economics"],
      content: "",
      href: "/simulators/supply-demand",
    },
  ];

  return [...essays, ...invisibleBusinesses, ...greatMinds, ...blueprints, ...tools, ...resources, ...simulators];
}
