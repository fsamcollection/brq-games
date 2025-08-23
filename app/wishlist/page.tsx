"use client";

import data from "@/data/products.json";
import type { Product } from "@/types";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = (data as Product[]).filter(p => ids.includes(p.id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">قائمة الأمنيات</h1>
      {products.length === 0 ? (
        <p className="opacity-80">لم تُضِف أي لعبة بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
