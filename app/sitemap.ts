import type { MetadataRoute } from "next";

import { getAllBlueprints } from "@/lib/blueprints";
import {
  getAllCategories,
  getAllEssays,
  getAllTags,
  getEssaysByCategory,
  getEssaysByTag,
  slugifyTerm,
} from "@/lib/essays";
import { getAllPlaybooks } from "@/lib/ba-playbooks";
import { getAllPlaybooksPtBr } from "@/lib/ba-playbooks-pt-br";
import { getAllGreatMinds } from "@/lib/great-minds";
import { getAllInvisibleBusinesses } from "@/lib/invisible-businesses";
import { MIN_INDEXED_TAG_ESSAYS } from "@/lib/seo";
import { seoLearningPages } from "@/lib/seo-learning-pages";
import { siteConfig } from "@/lib/site-config";

// lastModified is only set where a real content date exists. Stamping every
// page with the build time tells Google everything changes on every deploy,
// which teaches it to ignore the field.
function latest(items: { date: string }[]): Date | undefined {
  const times = items.map((item) => new Date(item.date).getTime()).filter(Number.isFinite);
  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}

function entry(route: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  return lastModified
    ? { url: `${siteConfig.url}${route}`, lastModified }
    : { url: `${siteConfig.url}${route}` };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays();
  const episodes = getAllInvisibleBusinesses();
  const minds = getAllGreatMinds();
  const blueprints = getAllBlueprints();
  const playbooks = getAllPlaybooks();
  const playbooksPtBr = getAllPlaybooksPtBr();

  const staticRoutes: MetadataRoute.Sitemap = [
    entry("", latest([...essays, ...episodes, ...minds, ...blueprints, ...playbooks])),
    entry("/essays", latest(essays)),
    entry("/essays/map", latest(essays)),
    entry("/ba-playbooks", latest(playbooks)),
    entry("/pt-br/ba-playbooks", latest(playbooksPtBr)),
    entry("/great-minds", latest(minds)),
    entry("/invisible-businesses", latest(episodes)),
    entry("/lighthouse", latest(blueprints)),
    ...[
      "/simulators",
      "/simulators/network-effects",
      "/simulators/supply-demand",
      "/simulators/inflation",
      "/simulators/switching-costs",
      "/simulators/order-book",
      "/simulators/trade-lifecycle",
      "/simulators/reconciliation-break-finder",
      "/simulators/cad-terminal",
      "/simulators/flywheel",
      "/tools",
      "/library",
      "/about",
    ].map((route) => entry(route)),
  ];

  const seoLearningRoutes = seoLearningPages.map((page) => entry(`/${page.slug}`));

  const essayRoutes = essays.map((essay) =>
    entry(`/essays/${essay.slug}`, new Date(essay.date)),
  );

  const essayTagRoutes = getAllTags().flatMap((tag) => {
    const slug = slugifyTerm(tag);
    const tagged = getEssaysByTag(slug)?.essays ?? [];
    // Thin tag pages are noindexed, so they stay out of the sitemap too.
    return tagged.length >= MIN_INDEXED_TAG_ESSAYS
      ? [entry(`/essays/tag/${slug}`, latest(tagged))]
      : [];
  });

  const essayCategoryRoutes = getAllCategories().map((category) => {
    const slug = slugifyTerm(category);
    return entry(`/essays/category/${slug}`, latest(getEssaysByCategory(slug)?.essays ?? []));
  });

  const invisibleBusinessRoutes = episodes.map((episode) =>
    entry(`/invisible-businesses/${episode.slug}`, new Date(episode.date)),
  );

  const blueprintRoutes = blueprints.map((blueprint) =>
    entry(`/lighthouse/${blueprint.slug}`, new Date(blueprint.date)),
  );

  const playbookRoutes = playbooks.map((guide) =>
    entry(`/ba-playbooks/${guide.slug}`, new Date(guide.date)),
  );

  const playbookPtBrRoutes = playbooksPtBr.map((guide) =>
    entry(`/pt-br/ba-playbooks/${guide.slug}`, new Date(guide.date)),
  );

  const greatMindRoutes = minds.map((mind) =>
    entry(`/great-minds/${mind.slug}`, new Date(mind.date)),
  );

  return [
    ...staticRoutes,
    ...seoLearningRoutes,
    ...essayRoutes,
    ...essayTagRoutes,
    ...essayCategoryRoutes,
    ...invisibleBusinessRoutes,
    ...greatMindRoutes,
    ...blueprintRoutes,
    ...playbookRoutes,
    ...playbookPtBrRoutes,
  ];
}
