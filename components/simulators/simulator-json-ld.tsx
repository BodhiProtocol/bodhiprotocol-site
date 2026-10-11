import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/lib/site-config";

// Marks a simulator page as an interactive learning resource for search engines.
function SimulatorJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name,
        description,
        url: `${siteConfig.url}${path}`,
        learningResourceType: "Simulation",
        interactivityType: "active",
        isAccessibleForFree: true,
        inLanguage: "en",
        creator: { "@type": "Person", name: "Surya" },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      }}
    />
  );
}

export { SimulatorJsonLd };
