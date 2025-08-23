"use client";
import { useCart } from "@/components/cart/CartContext";

export function AddToCart({ id }: { id: string }) {
  const { add } = useCart();
  return <button className="btn" onClick={() => add(id, 1)}>أضف للسلة</button>;
}
