
import { useEffect } from 'react';
import ServiceLayout from "@/components/layouts/ServiceLayout";
import { motion } from "framer-motion";
import { Clock, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Quick and efficient visa application processing"
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Guidance throughout your visa application process"
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    description: "Clear fee structure with no hidden charges"
  }
];

const VisaServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServiceLayout
      title="Visa Services"
      description="Professional visa assistance for hassle-free travel"
      bgImage="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81"
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
          <h2 className="text-4xl font-alternate text-center mb-8 tracking-wide">Comprehensive Visa Assistance</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground font-brandonBold uppercase">
              Our experienced team provides end-to-end visa assistance for all major destinations. We handle the complexities of visa applications, ensuring a smooth process for our clients.
            </p>
            <p className="text-lg text-muted-foreground font-brandon">
              Our visa services include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-brandon">
              <li>Documentation guidance and verification</li>
              <li>Application form filling assistance</li>
              <li>Interview preparation</li>
              <li>Status tracking</li>
              <li>24/7 support</li>
              <li>Express processing options</li>
            </ul>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default VisaServicesPage;
