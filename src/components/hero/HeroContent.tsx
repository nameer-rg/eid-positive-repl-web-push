
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface HeroContentProps {
  scrollToSection: (id: string) => void;
}

const HeroContent = ({ scrollToSection }: HeroContentProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center translate-y-16">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white max-w-5xl mx-auto leading-tight tracking-tight">
            Experience the World with Positive Travel and Holidays
          </h1>
          
          <p className="text-2xl md:text-4xl text-white/90 max-w-3xl mx-auto font-light tracking-wide">
            Your Gateway to Extraordinary Adventures
          </p>
          
          <motion.button 
            onClick={() => scrollToSection('services')}
            className="mt-8 px-8 py-4 bg-primary text-white rounded-full font-medium flex items-center gap-2 mx-auto hover:bg-primary/90 transition-colors text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;
