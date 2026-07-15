import type { MetadataRoute } from "next";

import { getAllBlueprints } from "@/lib/blueprints";
import { getAllEssays } from "@/lib/essays";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/essays",
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

  const blueprintRoutes: MetadataRoute.Sitemap = getAllBlueprints().map((blueprint) => ({
    url: `${siteConfig.url}/lighthouse/${blueprint.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...essayRoutes, ...blueprintRoutes];
}
