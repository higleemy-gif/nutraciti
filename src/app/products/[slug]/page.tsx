import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ScienceSection from "@/components/product/ScienceSection";
import GoldenRitualSection from "@/components/product/GoldenRitualSection";
import CompleteRitualSection from "@/components/product/CompleteRitualSection";
import ReviewsSection from "@/components/product/ReviewsSection";
import { getProductBySlug } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found | Nutraciti International" };
  return {
    title: product.name + " | Nutraciti International",
    description: (product.tagline ? product.tagline + " " : "") + "Dermatologist-tested, crafted for Indian skin. Free shipping above Rs 499.",
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1 pb-24 lg:pb-0">
        <section className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin py-space-md lg:py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-7"><ProductGallery images={[product.img]} name={product.name} badge={product.badge || undefined} /></div>
            <div className="lg:col-span-5"><ProductInfo product={product} /></div>
          </div>
        </section>
        <ScienceSection />
        <GoldenRitualSection />
        <CompleteRitualSection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
