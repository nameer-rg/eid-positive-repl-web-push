
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  images: string[];
  currentImage: number;
  loadedImages: string[];
}

const HeroBackground = ({ images, currentImage, loadedImages }: HeroBackgroundProps) => {
  return (
    <>
      {/* Enhanced loading placeholder */}
      {loadedImages.length === 0 && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
      )}
      
      {images.map((img, index) => (
        <motion.div
          key={img}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentImage && loadedImages.includes(img) ? 1 : 0 
          }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: loadedImages.includes(img) ? `url(${img})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
    </>
  );
};

export default HeroBackground;
