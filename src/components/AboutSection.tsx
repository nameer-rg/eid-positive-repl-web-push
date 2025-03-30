
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AboutSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Preload founder image
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/lovable-uploads/055ed8a5-e784-4b75-a8f7-78a3c59c7b54.png";
  }, []);

  return (
    <section className="section-padding bg-white" id="about">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-alternate uppercase tracking-wider text-5xl">About Us</span>
          <h2 className="mt-10 text-4xl md:text-5xl font-bold tracking-tight font-brandonBold uppercase">
            Our Journey in Travel Excellence!
          </h2>
        </motion.div>

        {/* Use flex-col on mobile, flex-row on larger screens */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Founder's Photo - Centered on mobile, left-aligned on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/4 flex justify-center md:justify-start"
          >
            <div className="w-full max-w-[180px] md:max-w-[280px]">
              {!imageLoaded && (
                <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-xl"></div>
              )}
              <img 
                src="/lovable-uploads/055ed8a5-e784-4b75-a8f7-78a3c59c7b54.png" 
                alt="Nazer EP - Founder" 
                className={`w-full aspect-square object-cover rounded-xl ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                loading="eager"
                width="280"
                height="280"
                decoding="async"
                fetchPriority="high"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="text-center mt-3 pb-2">
                <p className="font-semibold text-gray-800 text-base">Nazer EP</p>
                <p className="text-[#8E9196] font-medium text-sm">Founder, CEO</p>
              </div>
            </div>
          </motion.div>
          
          {/* About Text - Full width on mobile, 3/4 width on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-3/4"
          >
            <h3 className="text-2xl font-semibold font-brandon uppercase mb-4">Welcome to Positive Travel and Holidays</h3>
            <p className="text-muted-foreground mb-4 text-base font-brandon font-medium text-lg">
              Under the visionary leadership of Mr. Nazer EP, Positive Travel and Holidays has emerged as a trusted name in the travel industry. With years of experience and deep industry knowledge, Mr. Nazer EP has built a company dedicated to creating exceptional travel experiences.
            </p>
            <p className="text-muted-foreground mb-6 text-base font-brandon text-lg">
              Our success is built on our commitment to excellence and our dedicated 24/7 support team, ensuring that our customers receive seamless assistance whenever they need it. We take pride in turning travel dreams into reality with personalized service and attention to detail.
            </p>
            
            {/* Mission and Support sections - Full width on mobile, 2-column on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-secondary/30 p-5 rounded-lg">
                <h4 className="text-xl font-medium uppercase  tracking-wide mb-2 ">Our Mission</h4>
                <p className="text-muted-foreground text-base font-brandon text-lg">
                  To provide extraordinary travel experiences while ensuring customer satisfaction through our 24/7 dedicated support and personalized service.
                </p>
              </div>
              
              <div className="bg-secondary/30 p-5 rounded-lg">
                <h4 className="text-xl font-medium uppercase tracking-wide mb-2">24/7 Support</h4>
                <p className="text-muted-foreground text-base font-brandon text-lg">
                  Our team is available round the clock to assist you with any queries or support you need during your journey.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
