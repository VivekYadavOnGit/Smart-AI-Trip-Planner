import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, Users, Shield, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Personalization",
    description: "Our advanced AI learns your preferences to create uniquely tailored travel experiences.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Get live updates on weather, events, and local conditions to optimize your trip.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Group Planning",
    description: "Coordinate with friends and family to plan the perfect group adventure together.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive coverage and 24/7 support to keep you safe throughout your journey.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Globe,
    title: "Global Destinations",
    description: "Access insider knowledge for over 10,000 destinations worldwide.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Heart,
    title: "Local Experiences",
    description: "Discover hidden gems and authentic experiences recommended by locals.",
    gradient: "from-rose-500 to-pink-500"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful 
            <span className="bg-sunset-gradient bg-clip-text text-transparent"> Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to plan, book, and enjoy the perfect trip
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-soft transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;