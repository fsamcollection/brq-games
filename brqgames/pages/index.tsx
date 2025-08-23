
import Link from "next/link";

export default function Home() {
  const games = [
    { name: "Mobile Legends", slug: "mobile-legends" },
    { name: "Genshin Impact", slug: "genshin-impact" },
    { name: "Wuthering Waves", slug: "wuthering-waves" },
    { name: "Honkai Star Rail", slug: "honkai-star-rail" },
    { name: "Black Clover M", slug: "black-clover" },
    { name: "PUBG Mobile", slug: "pubg-mobile" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">اختر اللعبة للشحن</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link key={game.slug} href={`/${game.slug}`}>
            <div className="bg-white rounded-2xl shadow p-6 text-center cursor-pointer hover:scale-105 transition">
              <h2 className="text-xl font-semibold">{game.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
