import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How does the AI trip planning work?",
    answer: "Our AI analyzes your preferences, budget, travel dates, and interests to create personalized itineraries. It considers millions of data points including weather patterns, local events, user reviews, and real-time availability to suggest the perfect trip for you."
  },
  {
    question: "Can I modify the suggested itinerary?",
    answer: "Absolutely! Our AI creates a starting point, but you have full control to customize every aspect of your trip. Add, remove, or modify activities, change accommodations, adjust timing, and our AI will adapt the rest of your itinerary accordingly."
  },
  {
    question: "What's included in the trip planning?",
    answer: "We provide comprehensive planning including accommodation recommendations, activity suggestions, restaurant reservations, transportation options, local tips, weather forecasts, and even packing lists. Premium plans also include booking assistance and concierge services."
  },
  {
    question: "How far in advance should I plan my trip?",
    answer: "You can plan trips anywhere from a few days to a year in advance. For popular destinations and peak seasons, we recommend planning 2-3 months ahead for the best availability and prices. Our AI will alert you to optimal booking times."
  },
  {
    question: "Do you handle bookings and reservations?",
    answer: "Yes! Depending on your plan, we can either provide booking links and recommendations (Free plan) or handle all bookings for you (Premium plans). Our concierge service can manage everything from flights to restaurant reservations."
  },
  {
    question: "What if something goes wrong during my trip?",
    answer: "Premium plans include 24/7 support and travel insurance. We provide emergency assistance, help with rebooking, and can adjust your itinerary in real-time if plans change due to weather, closures, or other unforeseen circumstances."
  },
  {
    question: "Can I plan group trips?",
    answer: "Yes! Our group planning feature allows multiple people to collaborate on the same itinerary. Everyone can add preferences, vote on activities, and the AI will find the best options that satisfy the group's collective interests and budget."
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and never share your personal information with third parties. Your travel preferences and data are used solely to improve your trip planning experience and are stored securely on our platform."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked 
            <span className="bg-sunset-gradient bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about AI-powered trip planning
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-0 bg-white/80 backdrop-blur-sm rounded-lg shadow-soft hover:shadow-deep transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/20 rounded-lg">
                  <span className="font-semibold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;