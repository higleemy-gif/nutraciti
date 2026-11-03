import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Nutraciti International",
  description: "Secure checkout with UPI, Card, Net Banking, and Cash on Delivery. Powered by Razorpay.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1">
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}
