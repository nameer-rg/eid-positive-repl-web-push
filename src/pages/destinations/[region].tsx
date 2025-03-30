
import { useParams, Link } from 'react-router-dom';
import ServiceLayout from "@/components/layouts/ServiceLayout";
import { motion } from "framer-motion";
import { Plane, Hotel, FileText, Compass } from "lucide-react";
import { useEffect } from 'react';

const destinationData = {
  lakshadweep: {
    title: "Unwind in Lakshadweep",
    description: "Escape to pristine shores and turquoise waters",
    bgImage: "https://images.unsplash.com/photo-1572025310208-2fd6b91764c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrc2hhZHdlZXB8ZW58MHwwfDB8fHww",
    content: "Discover the untouched beauty of Lakshadweep’s serene islands. Dive into vibrant coral reefs, relax on sun-kissed beaches, and experience a tranquil getaway like no other. A paradise for nature lovers and adventure seekers alike."
  },
  kashmir: {
    title: "Explore Kashmir's Beauty",
    description: "Paradise on Earth awaits you",
    bgImage: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    content: "From the breathtaking valleys of Gulmarg to the peaceful waters of Dal Lake, Kashmir offers an enchanting escape. Revel in snowy mountains, vibrant tulip gardens, and a culture rich with warmth and tradition. Perfect for every soul seeking serenity."
  },
  thailand: {
    title: "Discover Thailand's Charm",
    description: "A land of culture and adventure",
    bgImage: "https://images.unsplash.com/photo-1572529593091-6c05c37cacc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRoYWlsYW5kfGVufDB8MHwwfHx8MA%3D%3D",
    content: "Journey through the heart of Thailand, where golden temples, bustling markets, and tropical beaches await. Savor the world-famous street food, immerse yourself in local festivals, and embrace a vibrant blend of tradition and modernity."
  },
  singapore: {
    title: "Experience Vibrant Singapore",
    description: "Innovation meets culture in one destination",
    bgImage: "https://images.unsplash.com/photo-1580438816338-969175d4b367?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNpbmdhcG9yZXxlbnwwfDB8MHx8fDA%3D",
    content: "Explore Singapore, where futuristic skylines blend seamlessly with lush green spaces. Visit iconic attractions like Marina Bay Sands, Gardens by the Bay, and Chinatown. A city that redefines the perfect balance of modern living and cultural heritage."
  },
  "middle-east": {
  title: "Experience the Middle East",
    description: "Where tradition meets luxury",
    bgImage: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    content: "Immerse yourself in the magical world of Arabian nights, explore ancient civilizations, and experience world-class luxury. From the modern marvels of Dubai to the historic treasures of Petra."
  },
  india: {
  title: "Journey Through Timeless India",
    description: "Country of culture and diversity",
    bgImage: "https://images.unsplash.com/photo-1519998994457-43c1f2c8460b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGluZGlhfGVufDB8MHwwfHx8MA%3D%3D",
    content: "From the majestic Himalayas to the bustling streets of Mumbai, India captivates with its diversity. Explore ancient forts, savor rich cuisines, and immerse yourself in traditions that date back centuries. A destination that truly has it all"    
  }
};

const services = [
  {
    icon: Plane,
    title: "Flight Bookings",
    description: "Direct flights and convenient connections to all major cities",
    link: "/services/flights"
  },
  {
    icon: FileText,
    title: "Visa Services",
    description: "Complete visa processing support",
    link: "/services/visa"
  },
  {
    icon: Hotel,
    title: "Hotel Accommodations",
    description: "Handpicked hotels and resorts for every budget",
    link: "/services/hotels"
  },
  {
    icon: Compass,
    title: "Tour Packages",
    description: "Curated experiences and guided tours",
    link: "/services/tours"
  }
];

const DestinationPage = () => {
  const { region } = useParams();
  const destination = destinationData[region as keyof typeof destinationData];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [region]);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  // Add quality and size parameters to image URL to optimize
  const optimizedBgImage = `${destination.bgImage}?auto=format&w=1200&q=60`;

  return (
    <ServiceLayout
      title={destination.title}
      description={destination.description}
      bgImage={optimizedBgImage}
    >
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed font-brandon tracking-wide">
            {destination.content}
          </p>
        </div>

        <h2 className="text-3xl font-brandonBold uppercase text-center mb-12">Our Services for {destination.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link 
              key={service.title}
              to={service.link}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border rounded-lg hover:bg-secondary/50 transition-colors h-full"
              >
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold font-brandon uppercase tracking-wide mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4 font-brandon text-lg tracking-wide">{service.description}</p>
                <span className="text-primary group-hover:text-primary/80 transition-colors inline-flex items-center">
                  Learn More
                  <span className="inline-block ml-1 relative top-[1px]">→</span>
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </ServiceLayout>
  );
};

export default DestinationPage;
