
import { useState } from 'react';
import { motion } from 'framer-motion';
import { destinations } from './DestinationTypes';
import { DestinationSlider } from './DestinationSlider';
import { SliderControls } from './SliderControls';

export default function DestinationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  return (
    <section className="section-padding bg-white" id="destinations">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-alternate uppercase tracking-wider text-5xl">Our Destinations</span>
          <h2 className="mt-10 text-4xl md:text-5xl font-brandonBold uppercase tracking-tight">
            Explore the World with Us
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg font-brandon tracking-wide">
            Discover incredible destinations and create unforgettable memories
          </p>
        </motion.div>

        <div className="relative">
          <DestinationSlider 
            destinations={destinations} 
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <SliderControls onPrevClick={prevSlide} onNextClick={nextSlide} />
        </div>
      </div>
    </section>
  );
}
