import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";

export const metadata: Metadata = {
  title: "متجر برق للألعاب",
  description: "متجر ألعاب عربي سريع وخفيف – اشترِ أحدث الألعاب الرقمية والكلاسيكية.",
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CartProvider><WishlistProvider>
          <Navbar />
          <main className="container py-6">{children}</main>
          <Footer />
        </WishlistProvider></CartProvider>
      </body>
    </html>
  );
}
