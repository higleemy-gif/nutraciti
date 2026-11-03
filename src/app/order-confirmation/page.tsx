import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import OrderConfirmationClient from "@/components/order/OrderConfirmationClient";
import RecommendedRow from "@/components/product/RecommendedRow";
import { CATALOG } from "@/lib/products";

export const metadata: Metadata = {
  title: "Order Confirmed | Nutraciti International",
  description: "Your Nutraciti order is confirmed. Track delivery and continue your skincare ritual.",
};

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1">
        <OrderConfirmationClient />
        <RecommendedRow heading="Complete Your Routine" products={CATALOG.slice(5, 8)} />
      </main>
      <Footer />
    </>
  );
}
