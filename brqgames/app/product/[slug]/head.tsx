import { findBySlug } from "@/lib/products";

export default async function Head({ params }: { params: { slug: string } }) {
  const product = await findBySlug(params.slug);
  if (!product) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.short,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "SAR",
      availability: "https://schema.org/InStock"
    }
  };
  return (
    <>
      <title>{product.title} | متجر برق للألعاب</title>
      <meta name="description" content={product.short} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
