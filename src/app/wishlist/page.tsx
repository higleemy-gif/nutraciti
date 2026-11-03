import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WishlistClient from "@/components/wishlist/WishlistClient";

export const metadata: Metadata = {
  title: "Your Wishlist | Nutraciti International",
  description: "Products you have saved to revisit and buy later.",
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1">
        <WishlistClient />
      </main>
      <Footer />
    </>
  );
}
