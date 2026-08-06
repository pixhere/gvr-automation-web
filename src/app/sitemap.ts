import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/ai-receptionist",
    "/solutions",
    "/pricing",
    "/about",
    "/faq",
    "/contact",
    "/business-growth-assessment",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/business-growth-assessment" ? 0.9 : 0.7,
  }));
}
