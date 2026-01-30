import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { locations } from '@/data/locations';

// Components
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import MapCanvas from '@/components/organisms/MapCanvas';
import LocationPanel from '@/components/organisms/LocationPanel';
import LandingPage from '@/components/organisms/LandingPage';

function App() {
  const { 
    nightMode, 
    hasStarted, 
    isLoaded, 
    setIsLoaded,
    isTransitioning,
  } = useAppStore();

  // Preload images
  useEffect(() => {
    const imagesToPreload = locations.flatMap(loc => [loc.heroImage, ...loc.images]);
    let loaded = 0;
    const total = imagesToPreload.length;
    
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) {
          setIsLoaded(true);
        }
      };
      img.src = src;
    });
    
    // Fallback timeout
    const timeout = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timeout);
  }, [setIsLoaded]);

  // Handle theme transition class
  useEffect(() => {
    if (nightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [nightMode]);

  // Loading screen
  if (!isLoaded) {
    return (
      <div 
        className="h-screen w-screen flex flex-col items-center justify-center"
        style={{ 
          backgroundColor: nightMode ? '#0D1117' : '#F5EBD9',
        }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Compass loader */}
          <motion.div
            className="w-16 h-16 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 48 48" className="w-full h-full">
              <defs>
                <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8C872" />
                  <stop offset="100%" stopColor="#C9956C" />
                </linearGradient>
              </defs>
              <circle 
                cx="24" cy="24" r="22" 
                fill="none" 
                stroke="url(#loadGrad)" 
                strokeWidth="2"
                strokeDasharray="40 100"
              />
              <polygon 
                points="24,8 27,24 24,40 21,24" 
                fill="url(#loadGrad)"
                fillOpacity="0.6"
              />
            </svg>
          </motion.div>
          
          <p 
            className="font-accent italic text-lg"
            style={{ color: nightMode ? '#E8C872' : '#B8602A' }}
          >
            Préparation du safari...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className={`h-screen w-screen overflow-hidden transition-colors duration-700 ${
        nightMode ? 'dark' : ''
      }`}
      style={{ 
        backgroundColor: nightMode ? '#0D1117' : '#F5EBD9',
      }}
    >
      {/* Theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: nightMode 
                ? 'radial-gradient(circle at center, rgba(232, 200, 114, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(184, 96, 42, 0.1) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Landing Page */}
      <AnimatePresence mode="wait">
        {!hasStarted && (
          <motion.div
            key="landing"
            className="absolute inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            key="app"
            className="h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Header */}
            <Header />
            
            {/* Main content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar - Mini map progression */}
              <Sidebar />
              
              {/* Map */}
              <div className="flex-1 relative overflow-hidden">
                <MapCanvas />
              </div>
              
              {/* Location Panel */}
              <LocationPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
