
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const ContactPage = () => {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = "/lovable-uploads/a-photo-of-a-white-woman-wearing-a-white_DFLSgLCWRdmVnBoptt_mSA_7BC4wXYOTg2ugoIyUUaDWA.jpeg";
    heroImg.onload = () => setHeroImageLoaded(true);
  }, []);

  return (
    <MainLayout>
      <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/a-photo-of-a-white-woman-wearing-a-white_DFLSgLCWRdmVnBoptt_mSA_7BC4wXYOTg2ugoIyUUaDWA.jpeg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Centered title with support text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center text-white">
            <h1 className="text-4xl md:text-5xl font-alternate text-5xl tracking-wide mb-4 mt-20">Reach out to us!</h1>
            <p className="mt-14 text-xl text-white/90 max-w-2xl mx-auto font-semibold font-brandon tracking-wide">
              Our dedicated team provides 24/7 support to ensure your journey is seamless from start to finish.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.a
            href="tel:+919497458282"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-6 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-brandonBold uppercase mb-2">Call Us</h3>
            <p className="text-muted-foreground font-brandon">+91 94974 58282</p>
            <p className="text-sm text-muted-foreground mt-2 font-brandon ">Available 24/7</p>
          </motion.a>

          <motion.a
            href="mailto:positivetravelandholidays@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-brandonBold uppercase mb-2">Email Us</h3>
            <p className="text-muted-foreground font-brandon">positivetravelandholidays@gmail.com</p>
            <p className="text-sm text-muted-foreground mt-2 font-brandon">Quick response guaranteed</p>
          </motion.a>

          <motion.a
            href="https://wa.me/917593946666"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-6 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-brandonBold uppercase mb-2">WhatsApp</h3>
            <p className="text-muted-foreground font-brandon">+91 75939 46666</p>
            <p className="text-sm text-muted-foreground mt-2 font-brandon">Instant messaging support</p>
          </motion.a>

          <motion.a
            href="https://www.google.com/maps/place/POSITIVE+TRAVEL+AND+HOLIDAYS/@10.877443,75.9829016,17z/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-6 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-brandonBold uppercase mb-2">Visit Us</h3>
            <p className="text-muted-foreground font-brandon">Thirunnavaya, Malappuram, Kerala, India</p>
          </motion.a>

          <motion.a
            href="https://www.facebook.com/share/19rhFzkc4q/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center p-6 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <Facebook className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-brandonBold uppercase mb-2">Facebook</h3>
            <p className="text-muted-foreground font-brandon">Positive Travel and Holidays</p>
          </motion.a>

          <motion.a
            href="https://www.instagram.com/positivetravelandholidays"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center p-6 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <Instagram className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-brandonBold uppercase mb-2">Instagram</h3>
            <p className="text-muted-foreground font-brandon">positivetravelandholidays</p>
          </motion.a>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
