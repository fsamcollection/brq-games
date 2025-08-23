"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";

type CartItem = { id: string; qty: number };
type CartCtx = {
  items: CartItem[];
  count: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const s = typeof window !== "undefined" ? window.localStorage.getItem("barq-cart") : null;
    if (s) setItems(JSON.parse(s));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem("barq-cart", JSON.stringify(items));
  }, [items]);

  const add = (id: string, qty = 1) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === id);
      if (ex) return prev.map(i => i.id === id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id, qty }];
    });
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id != id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);

  return <Ctx.Provider value={{ items, count, add, remove, clear }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
