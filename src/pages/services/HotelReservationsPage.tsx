
import { useEffect } from 'react';
import ServiceLayout from "@/components/layouts/ServiceLayout";
import { motion } from "framer-motion";
import { Clock, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Instant Booking",
    description: "Quick and easy hotel reservations worldwide"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for your stay"
  },
  {
    icon: CreditCard,
    title: "Best Rates",
    description: "Guaranteed best prices and special deals"
  }
];

const HotelReservationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServiceLayout
      title="Hotel Reservations"
      description="Find your perfect stay with our premium hotel booking service"
      bgImage="https://images.unsplash.com/photo-1566073771259-6a8506099945"
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
          <h2 className="text-4xl font-alternate text-center mb-8 tracking-wide">Why Book With Us?</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground font-brandonBold uppercase">
              We partner with the finest hotels worldwide to offer you exceptional accommodations at competitive prices. Our extensive network ensures you'll find the perfect place to stay.
            </p>
            <p className="text-lg text-muted-foreground font-brandon">
              Our hotel booking services include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-brandon">
              <li>Access to luxury and boutique hotels</li>
              <li>Special corporate rates</li>
              <li>Group booking discounts</li>
              <li>Flexible cancellation policies</li>
              <li>24/7 customer support</li>
              <li>Personalized recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default HotelReservationsPage;
