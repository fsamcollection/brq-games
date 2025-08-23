import Image from "next/image";
import Link from "next/link";
import { findBySlug } from "@/lib/products";
import { AddToCart } from "./parts";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await findBySlug(params.slug);
  if (!product) return <div className="py-10">لم يتم العثور على المنتج.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Image src={product.image} alt={product.title} width={800} height={450} className="w-full h-auto rounded-2xl border border-neutral-800" />
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold">{product.title}</h1>
        <p className="opacity-80">{product.short}</p>
        <p className="text-sm opacity-70">المنصّة: {product.platform} • النوع: {product.genre} • التقييم: ⭐ {product.rating}</p>
        <p className="text-2xl font-extrabold">{product.price.toFixed(2)} ر.س</p>
        <AddToCart id={product.id} />
        <div className="prose prose-invert max-w-none">
          <p>{product.description}</p>
        </div>
        <Link href="/catalog" className="hover:text-brand text-sm">العودة للمتجر</Link>
      </div>
    </div>
  );
}

export const dynamic = "force-static";
