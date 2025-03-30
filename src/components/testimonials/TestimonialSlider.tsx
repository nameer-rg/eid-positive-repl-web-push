
import { useState, useRef } from 'react';
import { Testimonial } from './TestimonialData';
import TestimonialCard from './TestimonialCard';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  onNext: () => void;
  onPrev: () => void;
  currentTestimonial: number;
}

export default function TestimonialSlider({ 
  testimonials, 
  onNext, 
  onPrev, 
  currentTestimonial 
}: TestimonialSliderProps) {
  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Required minimum swipe distance in pixels
  const minSwipeDistance = 50;

  // Handle touch start event
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move event
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end event
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  // Handle mouse drag events for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setEndX(e.clientX);
    }
  };

  const onMouseUp = () => {
    if (isDragging) {
      const distance = startX - endX;
      
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          onNext();
        } else {
          onPrev();
        }
      }
      
      setIsDragging(false);
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="max-w-4xl mx-auto relative overflow-hidden"
      ref={sliderRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
        <TestimonialCard 
          testimonial={testimonials[currentTestimonial]} 
          currentIndex={currentTestimonial} 
        />
      </div>
    </div>
  );
}
