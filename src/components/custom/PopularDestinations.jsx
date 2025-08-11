import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

const destinations = [
  {
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    rating: 4.8,
    price: "from $899",
    tags: ["Tropical", "Culture", "Beach"],
    description: "Tropical paradise with stunning temples and beaches"
  },
  {
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    rating: 4.9,
    price: "from $1,299",
    tags: ["Culture", "Urban", "Food"],
    description: "Modern metropolis blending tradition and innovation"
  },
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
    rating: 4.7,
    price: "from $1,099",
    tags: ["Romance", "Beach", "Historic"],
    description: "Iconic white-washed buildings and stunning sunsets"
  },
  {
    name: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
    rating: 4.9,
    price: "from $799",
    tags: ["Adventure", "Historic", "Nature"],
    description: "Ancient Incan citadel high in the Andes mountains"
  },
  {
    name: "Iceland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.8,
    price: "from $1,199",
    tags: ["Nature", "Adventure", "Northern Lights"],
    description: "Land of fire and ice with dramatic landscapes"
  },
  {
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    rating: 4.6,
    price: "from $999",
    tags: ["Luxury", "Urban", "Shopping"],
    description: "Futuristic city with luxury and entertainment"
  }
];

const PopularDestinations = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular 
            <span className="bg-sunset-gradient bg-clip-text text-transparent"> Destinations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the world's most beloved travel destinations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-deep transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-secondary hover:bg-white">
                    {destination.price}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-semibold">{destination.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4">{destination.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;