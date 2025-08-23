"use client";

import Link from "next/link";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { useCart } from "@/components/cart/CartContext";
import { useState } from "react";

const products = productsData as Product[];

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const [coupon, setCoupon] = useState<string>("");
  const enriched = items.map(i => ({ ...i, product: products.find(p => p.id === i.id)! }));
  const subtotal = enriched.reduce((a, b) => a + b.product.price * b.qty, 0);
  let discount = 0;
  if (coupon.trim().toUpperCase() === "BARQ10") discount = Math.round(subtotal * 0.10);
  if (coupon.trim().toUpperCase() === "BARQ25" && subtotal >= 300) discount = 25;
  const total = Math.max(0, subtotal - discount);

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">سلتك فارغة</h1>
        <Link className="btn" href="/catalog">العودة للتسوق</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">السلة</h1>
      <div className="card space-y-3">
        {enriched.map(({ id, qty, product }) => (
          <div key={id} className="flex items-center gap-3 justify-between">
            <div className="flex-1">
              <p className="font-semibold">{product.title}</p>
              <p className="text-xs opacity-70">الكمية: {qty}</p>
            </div>
            <div className="font-bold">{(product.price * qty).toFixed(2)} ر.س</div>
            <button className="px-3 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800" onClick={() => remove(id)}>حذف</button>
          </div>
        ))}
      </div>
      <div className="card grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="كود الخصم (BARQ10 / BARQ25)" className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" />
        <div className="self-center text-sm opacity-80">الخصم: {discount.toFixed(2)} ر.س</div>
        <div className="self-center text-sm opacity-80">المجموع قبل الخصم: {subtotal.toFixed(2)} ر.س</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-extrabold">الإجمالي: {total.toFixed(2)} ر.س</div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-2xl border border-neutral-700 hover:bg-neutral-800" onClick={clear}>تفريغ السلة</button>
          <Link className="btn" href="/checkout">إتمام الشراء</Link>
        </div>
      </div>
    </div>
  );
}
