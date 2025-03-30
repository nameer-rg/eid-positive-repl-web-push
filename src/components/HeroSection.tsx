
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import { Navigation } from './Navigation/Navigation';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import { useImagePreloader } from './hero/useImagePreloader';
import { Link } from 'react-router-dom';

// Optimized image URLs with better quality parameters
const images = [
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHRyYXZlbHxlbnwwfDB8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHRyYXZlbHxlbnwwfDB8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1475688621402-4257c812d6db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHRyYXZlbHxlbnwwfDB8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1714839368898-970c54384f3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHRyYXZlbHxlbnwwfDB8MHx8fDA%3D",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loadedImages, isLoading } = useImagePreloader(images);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    // Preload logo
    const logoImg = new Image();
    logoImg.onload = () => setLogoLoaded(true);
    logoImg.src = "/lovable-uploads/83c68e77-3dd0-4763-a625-9071182b3664.png";

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Logo in top-left corner with placeholder */}
        <div className="absolute top-6 left-6 z-50">
          <Link to="/">
            {!logoLoaded && (
              <div className="h-14 w-40 bg-gray-200 animate-pulse rounded"></div>
            )}
            <img 
              src="/lovable-uploads/83c68e77-3dd0-4763-a625-9071182b3664.png" 
              alt="Positive Travel Logo" 
              className={`h-14 w-auto ${logoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              width="160"
              height="56"
              fetchPriority="high"
              onLoad={() => setLogoLoaded(true)}
            />
          </Link>
        </div>
        
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <HeroBackground 
          images={images} 
          currentImage={currentImage} 
          loadedImages={loadedImages} 
        />
        
        <HeroContent scrollToSection={scrollToSection} />
      </div>
    </>
  );
};
