import { useEffect, useState } from 'react';

const WelcomeModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenWelcomeModal', 'true');
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
      onClick={() => setIsVisible(false)}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setIsVisible(false)}
          aria-label="Close welcome message"
        >
          &times;
        </button>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-brandonBold uppercase text-gray-800 mb-4">
            Welcome to Positive Travel & Holidays!
          </h2>
          <p className="text-gray-800 leading-relaxed">
            This is our official demo platform. We're currently finalizing 
            our full website - stay tuned for amazing travel experiences!
          </p>
          <button
            className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setIsVisible(false)}
          >
            Got it!
          </button>
        </div>
      </div>

      <style jsx global>{`
        body {
          overflow: ${isVisible ? 'hidden' : 'auto'};
        }
      `}</style>
    </div>
  );
};

export default WelcomeModal;