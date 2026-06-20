import FeaturesSection from "@/components/FeaturesSection";
import GlobeSection from "@/components/GlobeSection";
import HeroSection from "@/components/HeroSection";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <div style={{ position: "relative", background: "#0f0f1a" }}>
      {/* Particles runs across the full page */}
      <ParticlesBackground />

      <HeroSection />
      <GlobeSection />
      <FeaturesSection />
    </div>
  );
}