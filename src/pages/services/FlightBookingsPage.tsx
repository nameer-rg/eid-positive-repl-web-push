
import { useEffect } from 'react';
import ServiceLayout from "@/components/layouts/ServiceLayout";
import { motion } from "framer-motion";
import { Plane, Clock, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Global Coverage",
    description: "Access to all major airlines and routes worldwide"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your flight needs"
  },
  {
    icon: Headphones,
    title: "Expert Guidance",
    description: "Professional advice on the best flight options"
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    description: "Competitive rates and flexible payment options"
  }
];

const FlightBookingsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServiceLayout
      title="Flight Bookings"
      description="Find the perfect flights at the best prices with our expert booking service"
      bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
    >
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <h2 className="text-4xl font-alternate text-4xl tracking-wide text-center mb-8">Why Choose Our Flight Booking Service?</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground font-brandonBold uppercase">
              At Positive Travel & Holidays, we understand that finding the right flight is crucial to your travel experience. Our dedicated team works tirelessly to ensure you get the best options at competitive prices.
            </p>
            <p className="text-lg text-muted-foreground font-brandon">
              We offer comprehensive flight booking services including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-brandon">
              <li>Access to all major airlines worldwide</li>
              <li>Special deals and discounted fares</li>
              <li>Multi-city and round-trip bookings</li>
              <li>Group booking assistance</li>
              <li>24/7 customer support</li>
              <li>Free flight status updates</li>
            </ul>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default FlightBookingsPage;
