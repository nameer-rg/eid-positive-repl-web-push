import { useState, useRef, useEffect } from 'react';
import { DestinationType } from './DestinationTypes';
import { DestinationCard } from './DestinationCard';

interface DestinationSliderProps {
  destinations: DestinationType[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const DestinationSlider = ({ destinations, currentIndex, setCurrentIndex }: DestinationSliderProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse drag handlers
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
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      setIsDragging(false);
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Preload adjacent images
  useEffect(() => {
    const preloadImages = () => {
      // Load current, next and previous images
      const indexesToLoad = [
        currentIndex,
        (currentIndex + 1) % destinations.length,
        (currentIndex - 1 + destinations.length) % destinations.length
      ];
      
      indexesToLoad.forEach(index => {
        const img = new Image();
        img.src = `${destinations[index].image}?auto=format&w=600&q=75`;
      });
    };
    
    preloadImages();
  }, [currentIndex, destinations]);

  return (
    <div 
      className="overflow-hidden touch-pan-y"
      ref={sliderRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={`flex transition-transform duration-500 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {destinations.map((destination, index) => (
          <div key={destination.region} className="w-full flex-shrink-0">
            <DestinationCard destination={destination} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
