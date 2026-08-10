import type { MetadataRoute } from "next";
import { serviceAreas } from "@/app/_data/serviceAreas";
import { SITE_URL } from "@/app/_config/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/puppies", changeFrequency: "weekly", priority: 0.95 },
    { path: "/reserve", changeFrequency: "weekly", priority: 0.9 },
    { path: "/dogs/breed", changeFrequency: "monthly", priority: 0.9 },
    { path: "/dogs/working", changeFrequency: "monthly", priority: 0.8 },
    { path: "/dogs/care", changeFrequency: "monthly", priority: 0.8 },
    { path: "/dogs/faq", changeFrequency: "monthly", priority: 0.8 },
    { path: "/dogs/gallery", changeFrequency: "weekly", priority: 0.75 },
    { path: "/buying/process", changeFrequency: "monthly", priority: 0.8 },
    { path: "/buying/policy", changeFrequency: "monthly", priority: 0.6 },
    { path: "/buying/transport", changeFrequency: "monthly", priority: 0.6 },
    { path: "/guardian-dogs-for-sale", changeFrequency: "monthly", priority: 0.8 },
    ...serviceAreas.map((area) => ({
      path: `/guardian-dogs-for-sale/${area.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
