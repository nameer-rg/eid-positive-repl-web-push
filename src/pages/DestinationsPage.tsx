
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const destinations = [
  {
    region: "Asia",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd",
    description: "Discover the wonders of ancient traditions and modern marvels"
  },
  {
    region: "Europe",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    description: "Explore the rich history and diverse cultures of Europe"
  },
  {
    region: "Middle East",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    description: "Experience the blend of tradition and luxury in the Middle East"
  },
  {
    region: "North America",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74",
    description: "Experience the natural beauty and vibrant cities of North America"
  },
  {
    region: "South America",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
    description: "Adventure through lush rainforests and ancient ruins"
  }
];

const DestinationsPage = () => {
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload hero background
    const bgImg = new Image();
    bgImg.src = "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&w=1200&q=60";
    bgImg.onload = () => setBgLoaded(true);
    
    // Preload logo
    const logo = new Image();
    logo.src = "/lovable-uploads/83c68e77-3dd0-4763-a625-9071182b3664.png";
    logo.onload = () => setLogoLoaded(true);
    
    // Preload first 2 destination images
    destinations.slice(0, 2).forEach((dest, index) => {
      const img = new Image();
      img.src = `${dest.image}?auto=format&w=600&q=75`;
      img.onload = () => setLoadedImages(prev => ({...prev, [dest.region]: true}));
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] bg-cover bg-center">
        {/* Placeholder while image loads */}
        <div className={`absolute inset-0 bg-gray-300 ${bgLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}></div>
        
        {/* Background image */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&w=1200&q=60')" }}
        ></div>
        
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Logo in top-left corner */}
        <div className="absolute top-6 left-6 z-10">
          <Link to="/">
            {!logoLoaded && (
              <div className="h-14 w-40 bg-gray-500/20 animate-pulse rounded"></div>
            )}
            <img 
              src="/lovable-uploads/83c68e77-3dd0-4763-a625-9071182b3664.png" 
              alt="Positive Travel Logo" 
              className={`h-14 w-auto transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
              width="160" 
              height="56"
              onLoad={() => setLogoLoaded(true)}
            />
          </Link>
        </div>
        
        {/* Centered title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Destinations</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing places and create unforgettable memories
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.region}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
            >
              {!loadedImages[destination.region] && (
                <div className="w-full h-full bg-gray-200 animate-pulse absolute inset-0"></div>
              )}
              <img 
                src={`${destination.image}?auto=format&w=600&q=75`} 
                alt={destination.region}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading={index < 2 ? "eager" : "lazy"}
                onLoad={() => setLoadedImages(prev => ({...prev, [destination.region]: true}))}
                style={{opacity: loadedImages[destination.region] ? 1 : 0}}
                width="600"
                height="450"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{destination.region}</h3>
                <p className="text-white/90">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
