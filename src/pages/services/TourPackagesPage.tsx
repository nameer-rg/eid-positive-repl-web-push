
import { useEffect } from 'react';
import ServiceLayout from "@/components/layouts/ServiceLayout";
import { motion } from "framer-motion";
import { Clock, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Customized Tours",
    description: "Personalized itineraries tailored to your preferences"
  },
  {
    icon: Headphones,
    title: "Expert Guides",
    description: "Professional guides for an enriching experience"
  },
  {
    icon: CreditCard,
    title: "Value Packages",
    description: "Comprehensive tours at competitive prices"
  }
];

const TourPackagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServiceLayout
      title="Tour Packages"
      description="Discover amazing destinations with our curated tour packages"
      bgImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
    >
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-brandonBold uppercase mb-2">{feature.title}</h3>
              <p className="text-muted-foreground font-brandon">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-alternate text-center mb-8 tracking-wide">Explore Our Tour Packages</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground font-brandonBold uppercase">
              Experience the world's most fascinating destinations with our carefully crafted tour packages. Whether you're seeking adventure, culture, or relaxation, we have the perfect itinerary for you.
            </p>
            <p className="text-lg text-muted-foreground font-brandon">
              Our tour packages include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-brandon">
              <li>Expertly planned itineraries</li>
              <li>Professional tour guides</li>
              <li>Quality accommodations</li>
              <li>Transportation arrangements</li>
              <li>Entrance fees and activities</li>
              <li>24/7 on-tour support</li>
            </ul>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default TourPackagesPage;
