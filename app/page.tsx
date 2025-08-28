import Link from "next/link";

const games = [
  { name: "Mobile Legends", slug: "mobile-legends", image: "/images/games/mobile-legends.svg" },
  { name: "Genshin Impact", slug: "genshin-impact", image: "/images/games/genshin-impact.svg" },
  { name: "Wuthering Waves", slug: "wuthering-waves", image: "/images/games/wuthering-waves.svg" },
  { name: "Honkai Star Rail", slug: "honkai-star-rail", image: "/images/games/honkai-star-rail.svg" },
  { name: "Black Clover", slug: "black-clover", image: "/images/games/black-clover.svg" },
  { name: "PUBG Mobile", slug: "pubg-mobile", image: "/images/games/pubg-mobile.svg" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">🎮 اختر لعبة للشحن</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}`}>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer flex flex-col items-center">
              <img src={game.image} alt={game.name} className="w-24 h-24 mb-4" />
              <h2 className="text-xl font-semibold">{game.name}</h2>
              <span className="mt-2 text-blue-600 hover:underline">المزيد</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
