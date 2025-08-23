"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cart/CartContext";
import type { Product } from "@/types";
import { useWishlist } from "@/components/wishlist/WishlistContext";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  return (
    <div className="card flex flex-col gap-3">
      <Image src={p.image} alt={p.title} width={600} height={338} className="w-full h-44 object-cover rounded-xl" />
      <div className="flex-1">
        <h3 className="text-lg font-bold">{p.title}</h3>
        <p className="text-xs opacity-80">{p.platform} • {p.genre} • ⭐ {p.rating}</p>
        <p className="mt-2 font-extrabold">{p.price.toFixed(2)} ر.س</p>
      </div>
      <div className="flex items-center gap-2"><button className={"px-3 py-2 rounded-2xl border border-neutral-700 hover:bg-neutral-800 " + (has(p.id) ? "text-brand" : "")} onClick={() => toggle(p.id)}>{has(p.id) ? "★ في الأمنيات" : "☆ أضف للأمنيات"}</button>
        <button className="btn flex-1" onClick={() => add(p.id, 1)}>أضف للسلة</button>
        <Link href={`/product/${p.slug}`} className="px-4 py-2 rounded-2xl border border-neutral-700 hover:bg-neutral-800">تفاصيل</Link>
      </div>
    </div>
  );
}
