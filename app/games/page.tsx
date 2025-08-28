// ملف: /app/games/pubg.tsx

import Image from "next/image";

const pubgItems = [
  { name: "منتج 1", image: "/images/pubg/product1.jpg", price: "10 ريال" },
  { name: "منتج 2", image: "/images/pubg/product2.jpg", price: "20 ريال" },
  { name: "منتج 3", image: "/images/pubg/product3.jpg", price: "30 ريال" },
  { name: "منتج 4", image: "/images/pubg/product4.jpg", price: "40 ريال" },
  { name: "منتج 5", image: "/images/pubg/product5.jpg", price: "50 ريال" },
  { name: "منتج 6", image: "/images/pubg/product6.jpg", price: "60 ريال" },
];

export default function PubgPage() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {pubgItems.map((item, index) => (
        <div key={index} className="border rounded-lg p-2 text-center">
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
            quality={100}
            unoptimized={true}
            className="object-contain"
          />
          <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.price}</p>
          <a
            href="رابط_الدفع"
            target="_blank"
            className="mt-2 inline-block bg-blue-500 text-white py-1 px-4 rounded"
          >
            اشترِ الآن
          </a>
        </div>
      ))}
    </div>
  );
}
