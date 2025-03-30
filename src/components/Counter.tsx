import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Counter = ({ end, duration = 2, title }) => {
  const ref = useRef(null);
  const numberRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView && numberRef.current) {
      controls.start({ opacity: 1, y: 0 });

      let startValue = 0;
      const endValue = parseInt(end, 10);
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(endValue * easeOutQuart);

        if (numberRef.current) {
          numberRef.current.textContent = currentValue;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Ensure we end up with the exact target number
          if (numberRef.current) {
            numberRef.current.textContent = endValue;
          }
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }, [isInView, end, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
    >
      <div className="text-center">
        <div className="text-5xl font-bold text-primary mb-3">
          <span ref={numberRef} className="tabular-nums">0</span>
          {typeof end === 'string' && end.includes('+') && (
            <span className="ml-1">+</span>
          )}
        </div>
        <div className="text-gray-600 font-medium">{title}</div>
      </div>
    </motion.div>
  );
};

export default Counter;