import HeroSection from "@/components/HeroSection";
import InvestmentCards from "@/components/InvestmentCards";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";

export default function Dashboard() {
  return (
    <div className="font-inter text-gray-900">
      <main>
        <HeroSection />
        <InvestmentCards />
      </main>
      
      <Footer />
      <LiveChat />
      
      {/* Bottom padding for mobile navigation */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
}
