
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisionSection from "@/components/VisionSection";
import ServicesSection from "@/components/ServicesSection";
import DestinationsSection from "@/components/destinations/DestinationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import PartnersSection from "@/components/PartnersSection";
import IntroductionSection from "@/components/IntroductionSection"

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <IntroductionSection />
        <ServicesSection />
        <DestinationsSection />
        <VisionSection />
        <PartnersSection />
        <AboutSection /> 
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
