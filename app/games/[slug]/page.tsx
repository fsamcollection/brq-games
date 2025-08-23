import Image from "next/image";
import fs from "fs";
import path from "path";

type GameData = {
  slug: string;
  title: string;
  image: string;
  currency: string;
  products: Array<{ id: string; label: string; price: number; amount_halalas: number; description: string; }>;
};

function getGameData(slug: string): GameData {
  const file = path.join(process.cwd(), "data", "games", `${slug}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw);
}

export function generateStaticParams() {
  const slugs = ["mobile-legends","genshin-impact","wuthering-waves","honkai-star-rail","black-clover","pubg-mobile"];
  return slugs.map(slug => ({ slug }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGameData(params.slug);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-24 h-14">
          <Image src={game.image} alt={game.title} fill className="object-cover rounded-lg" />
        </div>
        <h1 className="text-2xl font-bold">شحن {game.title}</h1>
      </div>

      <div className="space-y-4">
        {game.products.map(p => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-900 shadow">
            <div>
              <div className="font-semibold">{p.label}</div>
              <div className="text-sm text-gray-500">{p.description}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-bold">{p.price} ر.س</div>
              <a href={`/checkout?slug=${game.slug}&sku=${p.id}`} className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">شراء</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
