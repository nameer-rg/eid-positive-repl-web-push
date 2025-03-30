
import { useState, useEffect } from 'react';

export const useImagePreloader = (images: string[]) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start with a shorter loading time for better perceived performance
    const initialLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    
    // Prioritize loading the first three images
    const imagesToPreloadFirst = images.slice(0, 3);
    
    // Create a promise for each initial image with optimized parameters
    const initialLoads = imagesToPreloadFirst.map(src => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          reject(`Failed to load image: ${src}`);
        };
        // Add fit=crop for better performance with consistent dimensions
        img.src = `${src}&fit=crop`;
      });
    });
    
    // When the first images are loaded, show the hero section
    Promise.all(initialLoads)
      .then(loadedSrcs => {
        setLoadedImages(loadedSrcs);
        clearTimeout(initialLoadingTimeout);
        setIsLoading(false);
        
        // Continue loading the rest in the background with lower priority
        const remainingImages = images.slice(3);
        remainingImages.forEach(src => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => [...prev, src]);
          };
          // Add fit=crop for better performance with consistent dimensions
          img.src = `${src}&fit=crop`;
        });
      })
      .catch(err => {
        console.error("Error preloading images:", err);
        clearTimeout(initialLoadingTimeout);
        setIsLoading(false); // Show hero section anyway if there's an error
      });
      
    return () => clearTimeout(initialLoadingTimeout);
  }, [images]);

  return { loadedImages, isLoading };
};
