
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "./MainLayout";

interface ServiceLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  bgImage: string;
}

const ServiceLayout = ({ children, title, description, bgImage }: ServiceLayoutProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Early setup of placeholder while image loads
    setImageLoaded(false);
    
    // Preload the hero image with priority
    const img = new Image();
    img.src = `${bgImage}?auto=format&fit=crop&w=1200&q=70`;
    img.onload = () => setImageLoaded(true);
    
    window.scrollTo(0, 0);
  }, [bgImage]);

  return (
    <MainLayout>
      <div className="relative h-[50vh] bg-cover bg-center">
        {/* Placeholder before image loads - improved animation */}
        <div className={`absolute inset-0 bg-gray-300 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
        
        {/* Background image with optimized loading */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${bgImage}?auto=format&fit=crop&w=1200&q=70)` }}
          aria-hidden="true"
        ></div>
        
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Centered title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center text-white">
            <h1 className="text-6xl md:text-5xl font-alternate uppercase mb-4 mt-20 tracking-wide">{title}</h1>
            <p className="mt-14 text-2xl text-white/90 font-brandon tracking-tight">{description}</p>
          </div>
        </div>
      </div>
      
      {children}

      <div className="container-custom py-16">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-primary/10 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl uppercase font-semibold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-6">
            Contact us now and let us help you plan your perfect trip.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Get in Touch <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ServiceLayout;
