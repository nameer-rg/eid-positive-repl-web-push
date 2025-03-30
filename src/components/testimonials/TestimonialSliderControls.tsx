
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialSliderControlsProps {
  prev: () => void;
  next: () => void;
}

export default function TestimonialSliderControls({ prev, next }: TestimonialSliderControlsProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={prev}
        className="p-2 rounded-full hover:bg-secondary transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={next}
        className="p-2 rounded-full hover:bg-secondary transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
