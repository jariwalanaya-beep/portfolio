import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";
import MetricsSection from "@/components/MetricsSection";
import ClientsTicker from "@/components/ClientsTicker";
import ServicesSection from "@/components/ServicesSection";
import TerminalSection from "@/components/TerminalSection";
import WorkflowSection from "@/components/WorkflowSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import Mascot from "@/components/Mascot";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <ParticleBackground />
      <Mascot />
      <Navbar />
      <HeroSection />
      <TechStackSection />
      <MetricsSection />
      <ClientsTicker />
      <ServicesSection />
      <TerminalSection />
      <WorkflowSection />
      <TestimonialsSection />
      <TrustSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
