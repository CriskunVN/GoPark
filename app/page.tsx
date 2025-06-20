import Header from "@/components/Header";
import { MetconHero, StyleByTeeTeeHero, StyleByJordanLoveHero } from "@/components/HeroSection";
import FeaturedSections from "@/components/FeaturedSections";
import ShopTheClassics from "@/components/ShopTheClassics";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Metcon Hero */}
      <MetconHero />

      {/* Style By Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <StyleByTeeTeeHero />
        <StyleByJordanLoveHero />
      </div>

      {/* Featured Sports Sections */}
      <FeaturedSections />

      {/* Shop The Classics */}
      <ShopTheClassics />

      {/* Footer */}
      <Footer />
    </div>
  );
}
