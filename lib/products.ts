import data from "@/data/products.json";
import type { Product } from "@/types";

export async function allProducts(): Promise<Product[]> {
  return data as Product[];
}

export async function findBySlug(slug: string): Promise<Product | undefined> {
  return (data as Product[]).find(p => p.slug === slug);
}

export async function findById(id: string): Promise<Product | undefined> {
  return (data as Product[]).find(p => p.id === id);
}
