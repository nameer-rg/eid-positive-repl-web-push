
import { useEffect } from 'react';

interface KeyboardNavigationProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function useKeyboardNavigation({ onNext, onPrev }: KeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrev]);
}
