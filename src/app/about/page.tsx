import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Nutraciti International",
  description: "Nutraciti International is a beauty, wellness and personal-care company blending traditional wellness with modern science. Science-led, nature-inspired.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
