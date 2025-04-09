
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

          {/* Button Group */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button 
              onClick={() => scrollToSection('introduction')}
              className="px-8 py-4 bg-primary text-white rounded-full border-2 border-primary font-medium flex items-center gap-2 hover:bg-transparent transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <motion.a
              href="https://wa.me/917593946666"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[5.25rem] py-4 border-2 border-white text-white rounded-full font-medium flex items-center gap-2 hover:bg-primary/90 hover:border-primary/90 transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              WhatsApp
            </motion.a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroContent;
