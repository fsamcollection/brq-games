"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import data from "@/data/products.json";
import { ProductCard } from "@/components/ProductCard";

export default function Catalog() {
  const [q, setQ] = useState("");
  const [platform, setPlatform] = useState("الكل");
  const [genre, setGenre] = useState("الكل");
  const [sort, setSort] = useState("الأحدث");

  const products = data as Product[];

  const platforms = ["الكل", ...Array.from(new Set(products.map(p => p.platform)))];
  const genres = ["الكل", ...Array.from(new Set(products.map(p => p.genre)))];

  const filtered = useMemo(() => {
    const base = products.filter(p =>
      (platform === "الكل" || p.platform === platform) &&
      (genre === "الكل" || p.genre === genre) &&
      (q.trim() === "" || p.title.toLowerCase().includes(q.toLowerCase()))
    );

    let out = [...base];
    if (sort === "السعر: الأقل") out.sort((a,b)=> a.price - b.price);
    if (sort === "السعر: الأعلى") out.sort((a,b)=> b.price - a.price);
    if (sort === "التقييم") out.sort((a,b)=> b.rating - a.rating);
    return out;
  }, [q, platform, genre, sort]);


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">المتجر</h1>

      <div className="card grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="ابحث عن لعبة…"
          className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none"
        />
        <select className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" value={platform} onChange={e=>setPlatform(e.target.value)}>
          {platforms.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <select className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" value={genre} onChange={e=>setGenre(e.target.value)}>
          {genres.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <select className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" value={sort} onChange={e=>setSort(e.target.value)}>
          {["الأحدث", "السعر: الأقل", "السعر: الأعلى", "التقييم"].map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <div className="text-sm opacity-70 self-center">النتائج: {filtered.length}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
