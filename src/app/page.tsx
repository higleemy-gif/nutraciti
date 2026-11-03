import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CategoryCards from "@/components/home/CategoryCards";
import Bestsellers from "@/components/home/Bestsellers";
import IngredientStory from "@/components/home/IngredientStory";
import SkinQuizCTA from "@/components/home/SkinQuizCTA";
import Reviews from "@/components/home/Reviews";
import PressLogos from "@/components/home/PressLogos";
import InstagramGrid from "@/components/home/InstagramGrid";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="w-full bg-background-base flex-1">
        <div className="flex flex-col w-full">
          <Hero />
          <TrustStrip />
          <CategoryCards />
          <Bestsellers />
          <IngredientStory />
          <SkinQuizCTA />
          <Reviews />
          <PressLogos />
          <InstagramGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
