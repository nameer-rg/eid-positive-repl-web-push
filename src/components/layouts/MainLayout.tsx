
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Set immediate placeholder state
    setLogoLoaded(false);
    
    // Preload the logo with high priority
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.src = "/lovable-uploads/83c68e77-3dd0-4763-a625-9071182b3664.png";
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Logo in top-left corner with improved loading */}
      <div className="absolute top-6 left-6 z-50">
        <Link to="/">
          {!logoLoaded && (
            <div className="h-14 w-40 bg-gray-200 animate-pulse rounded"></div>
          )}
          <img 
            src="/lovable-uploads/83c68e77-3dd0-4763-a625-9071182b3664.png" 
            alt="Positive Travel Logo" 
            className={`h-14 w-auto transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            width="160" 
            height="56"
            loading="eager"
            onLoad={() => setLogoLoaded(true)}
          />
        </Link>
      </div>
      
      {children}

      {/* Back button with padding - changed color to green to match "Start Your Journey" */}
      <div className="container-custom pb-16 pt-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MainLayout;
