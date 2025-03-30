
import { motion } from 'framer-motion';
import { useState } from 'react';
import { testimonials } from './testimonials/TestimonialData';
import TestimonialSlider from './testimonials/TestimonialSlider';
import TestimonialSliderControls from './testimonials/TestimonialSliderControls';
import useKeyboardNavigation from './testimonials/useKeyboardNavigation';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const next = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Add keyboard navigation
  useKeyboardNavigation({ onNext: next, onPrev: prev });

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 "
        >
          <span className="text-primary font-alternate text-5xl uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-10 text-4xl md:text-5xl font-brandonBold uppercase tracking-tight">
            What Our Clients Say
          </h2>
        </motion.div>

        <TestimonialSlider 
          testimonials={testimonials}
          onNext={next}
          onPrev={prev}
          currentTestimonial={currentTestimonial}
        />

        <TestimonialSliderControls prev={prev} next={next} />
      </div>
    </section>
  );
}
