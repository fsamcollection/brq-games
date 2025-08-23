"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cart/CartContext";

export function Navbar() {
  const { count } = useCart();
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/60 sticky top-0 z-50 backdrop-blur">
      <div className="container py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="برق" width={36} height={36} className="rounded-xl" />
          <span className="text-xl font-extrabold tracking-tight">متجر برق للألعاب</span>
        </Link>

        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/catalog" className="hover:text-brand">المتجر</Link>
          <Link href="/about" className="hover:text-brand">من نحن</Link>
          <Link href="/contact" className="hover:text-brand">تواصل</Link>
          <Link href="/wishlist" className="hover:text-brand">الأمنيات</Link>
          <Link href="/cart" className="btn">السلة ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
