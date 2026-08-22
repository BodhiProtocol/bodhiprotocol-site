import type { MetadataRoute } from "next";

import { getAllBlueprints } from "@/lib/blueprints";
import { getAllCategories, getAllEssays, getAllTags, slugifyTerm } from "@/lib/essays";
import { getAllPlaybooks } from "@/lib/ba-playbooks";
import { getAllGreatMinds } from "@/lib/great-minds";
import { getAllInvisibleBusinesses } from "@/lib/invisible-businesses";
import { seoLearningPages } from "@/lib/seo-learning-pages";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/essays",
    "/essays/map",
    "/ba-playbooks",
    "/great-minds",
    "/invisible-businesses",
    "/simulators",
    "/simulators/network-effects",
    "/simulators/supply-demand",
    "/simulators/inflation",
    "/simulators/switching-costs",
    "/simulators/order-book",
    "/simulators/trade-lifecycle",
    "/simulators/reconciliation-break-finder",
    "/lighthouse",
    "/tools",
    "/library",
    "/about",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const seoLearningRoutes: MetadataRoute.Sitemap = seoLearningPages.map((page) => ({
    url: `${siteConfig.url}/${page.slug}`,
    lastModified: new Date(),
  }));

  const essayRoutes: MetadataRoute.Sitemap = getAllEssays().map((essay) => ({
    url: `${siteConfig.url}/essays/${essay.slug}`,
    lastModified: new Date(essay.date),
  }));

  const essayTagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${siteConfig.url}/essays/tag/${slugifyTerm(tag)}`,
    lastModified: new Date(),
  }));

  const essayCategoryRoutes: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${siteConfig.url}/essays/category/${slugifyTerm(category)}`,
      lastModified: new Date(),
    }),
  );

  const invisibleBusinessRoutes: MetadataRoute.Sitemap = getAllInvisibleBusinesses().map(
    (episode) => ({
      url: `${siteConfig.url}/invisible-businesses/${episode.slug}`,
      lastModified: new Date(episode.date),
    }),
  );

  const blueprintRoutes: MetadataRoute.Sitemap = getAllBlueprints().map((blueprint) => ({
    url: `${siteConfig.url}/lighthouse/${blueprint.slug}`,
    lastModified: new Date(),
  }));

  const playbookRoutes: MetadataRoute.Sitemap = getAllPlaybooks().map((guide) => ({
    url: `${siteConfig.url}/ba-playbooks/${guide.slug}`,
    lastModified: new Date(guide.date),
  }));

  const greatMindRoutes: MetadataRoute.Sitemap = getAllGreatMinds().map((mind) => ({
    url: `${siteConfig.url}/great-minds/${mind.slug}`,
    lastModified: new Date(mind.date),
  }));

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
  ];
}
