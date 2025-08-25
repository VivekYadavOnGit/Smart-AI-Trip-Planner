import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(/HeroSection.png)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      </div>

     

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Your Next
            <span className="block bg-sunset-gradient bg-clip-text text-transparent">
              Adventure with AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Personalized Trip Planning Made Easy
          </p>
          <Link to="/create-trip">

          <Button 
            size="lg" 
            className="bg-[#ff7e5f] hover:bg-[#feb47b]/90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-glow transform hover:scale-105 transition-all duration-300"
          >
            Create Trip
          </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
