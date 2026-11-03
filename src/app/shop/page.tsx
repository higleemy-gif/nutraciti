import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ShopContent from "@/components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Shop All Products | Nutraciti International",
  description: "Shop Nutraciti ayurvedic skincare, hair care and wellness. Serums, sunscreen, night cream, body wash and more. Free shipping above Rs 499.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin pt-space-md">
          <nav aria-label="Breadcrumb" className="font-body-sm text-[13px] text-text-muted flex items-center gap-1.5">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="text-outline-variant">&rsaquo;</span>
            <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
            <span className="text-outline-variant">&rsaquo;</span>
            <span className="text-text-heading">All Products</span>
          </nav>
          <div className="mt-space-md">
            <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Shop All</span>
            <h1 className="font-headline-lg text-headline-lg text-text-heading mt-1">All Products</h1>
            <div className="w-16 h-[2px] bg-gold mt-space-xs"></div>
            <p className="font-body-md text-body-md text-text-muted mt-space-xs">9 Products</p>
          </div>
        </div>
        <ShopContent />
      </main>
      <Footer />
    </>
  );
}
