import type { MetadataRoute } from "next";
import data from "@/data/products.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/catalog",
    "/about",
    "/contact",
    "/cart",
    "/checkout",
    "/wishlist"
  ].map(p => ({
    url: base + p,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const products = data.map(product => ({
    url: `${base}/products/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...products];
}
