
export default function GamePage() {
  const packages = [
    { id: 1, name: "الباقة الصغيرة", price: "5 ريال" },
    { id: 2, name: "الباقة المتوسطة", price: "20 ريال" },
    { id: 3, name: "الباقة الكبيرة", price: "50 ريال" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">شحن Black Clover M</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-lg font-semibold">{pkg.name}</h2>
            <p className="text-gray-600">{pkg.price}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              شراء الآن
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
