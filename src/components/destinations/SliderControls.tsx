
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const SliderControls = ({ onPrevClick, onNextClick }: SliderControlsProps) => {
  return (
    <>
      <button
        onClick={onPrevClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors z-10"
        aria-label="Previous destination"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={onNextClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors z-10"
        aria-label="Next destination"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
};
