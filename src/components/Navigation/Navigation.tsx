
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, MessageCircle, Menu, X } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { Link, useNavigate } from 'react-router-dom';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-30 bg-transparent">
      <div className="container-custom">
        {/* Added mt-6 to move this section down a bit */}
        <div className="flex items-center justify-between py-4 mt-6">
          {/* Wider spacing on the left */}
          <div className="w-1/4"></div>

          {/* Repositioned the Make a Call section more to the right */}
          <div className="hidden md:flex justify-center items-center w-1/3 ml-24">
            <span className="text-white text-lg text-center">
              Make a call: +91 94974 58282
            </span>
          </div>

          <div className="flex justify-end items-center w-1/3">
            <div className="hidden md:flex items-center space-x-8">
              <a href="https://www.facebook.com/share/19rhFzkc4q/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">
                <Facebook className="w-7 h-7" />
              </a>
              <a href="https://www.instagram.com/positivetravelandholidays" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">
                <Instagram className="w-7 h-7" />
              </a>
              <a href="https://wa.me/917593946666" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">
                <MessageCircle className="w-7 h-7" />
              </a>
            </div>
            
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden text-white p-2 z-50 ml-4"
              animate={isMenuOpen ? "open" : "closed"}
              variants={menuIconVariants}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <X className="w-6 h-6" key="close" />
                ) : (
                  <Menu className="w-6 h-6" key="menu" />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Reduced top margin to create less space between logo and nav */}
        <div className="mt-6">
          <div className="h-px bg-white/20 my-4" />

          <div className="hidden md:flex items-center space-x-12 py-2 justify-start">
            <Link to="/" className="text-white hover:text-white/80 transition-colors">Home</Link>
            <button onClick={() => scrollToSection('services')} className="text-white hover:text-white/80 transition-colors">Services</button>
            <button onClick={() => scrollToSection('destinations')} className="text-white hover:text-white/80 transition-colors">Destinations</button>
            <button onClick={() => scrollToSection('about')} className="text-white hover:text-white/80 transition-colors">About Us</button>          
            <Link to="/contact" className="text-white hover:text-white/80 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>

      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};
