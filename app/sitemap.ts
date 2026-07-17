import type { MetadataRoute } from "next";

import { getAllBlueprints } from "@/lib/blueprints";
import { getAllEssays } from "@/lib/essays";
import { getAllGreatMinds } from "@/lib/great-minds";
import { getAllInvisibleBusinesses } from "@/lib/invisible-businesses";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/essays",
    "/great-minds",
    "/invisible-businesses",
    "/lighthouse",
    "/tools",
    "/library",
    "/about",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const essayRoutes: MetadataRoute.Sitemap = getAllEssays().map((essay) => ({
    url: `${siteConfig.url}/essays/${essay.slug}`,
    lastModified: new Date(essay.date),
  }));

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

  const greatMindRoutes: MetadataRoute.Sitemap = getAllGreatMinds().map((mind) => ({
    url: `${siteConfig.url}/great-minds/${mind.slug}`,
    lastModified: new Date(mind.date),
  }));

  return [
    ...staticRoutes,
    ...essayRoutes,
    ...invisibleBusinessRoutes,
    ...greatMindRoutes,
    ...blueprintRoutes,
  ];
}
