import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import CartClient from "@/components/cart/CartClient";
import RecommendedRow from "@/components/product/RecommendedRow";
import { CATALOG } from "@/lib/products";

export const metadata: Metadata = {
  title: "Your Cart | Nutraciti International",
  description: "Review your Nutraciti cart, apply offers, and proceed to a secure checkout.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1">
        <CartClient />
        <RecommendedRow heading="You Might Also Like" products={CATALOG.slice(3, 6)} />
      </main>
      <Footer />
    </>
  );
}
