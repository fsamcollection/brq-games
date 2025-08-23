import Link from "next/link";
import Image from "next/image";
import gamesData from "@/data/games/index.json";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">اختر اللعبة للشحن</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gamesData.map((g)=> (
          <Link key={g.slug} href={`/games/${g.slug}`} className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
            <div className="relative w-full h-40">
              <Image src={g.image} alt={g.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg group-hover:underline">{g.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
