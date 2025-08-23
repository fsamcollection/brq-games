"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WishCtx = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const Ctx = createContext<WishCtx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const s = typeof window !== "undefined" ? localStorage.getItem("barq-wishlist") : null;
    if (s) setIds(JSON.parse(s));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("barq-wishlist", JSON.stringify(ids));
  }, [ids]);

  const toggle = (id: string) => setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const has = (id: string) => ids.includes(id);

  return <Ctx.Provider value={{ ids, toggle, has }}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
