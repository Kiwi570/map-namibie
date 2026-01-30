import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { locations } from '@/data/locations';

// Vehicle SVG
const VehicleSVG = ({ nightMode, isMoving }: { nightMode: boolean; isMoving: boolean }) => (
  <svg 
    width="120" 
    height="140" 
    viewBox="-15 -10 30 40"
    style={{ overflow: 'visible' }}
  >
    {isMoving && (
      <>
        <motion.circle
          cx="0" cy="14"
          r="5"
          fill={nightMode ? 'rgba(232, 200, 114, 0.5)' : 'rgba(139, 115, 85, 0.5)'}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: [0, 4, 8], opacity: [0.8, 0.3, 0], y: [0, 20, 40] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 0 }}
        />
        <motion.circle
          cx="-4" cy="16"
          r="4"
          fill={nightMode ? 'rgba(232, 200, 114, 0.4)' : 'rgba(139, 115, 85, 0.4)'}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 3, 6], opacity: [0.6, 0.2, 0], y: [0, 15, 30] }}
          transition={{ duration: 0.35, repeat: Infinity, delay: 0.05 }}
        />
        <motion.circle
          cx="4" cy="16"
          r="4"
          fill={nightMode ? 'rgba(232, 200, 114, 0.4)' : 'rgba(139, 115, 85, 0.4)'}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 3, 6], opacity: [0.6, 0.2, 0], y: [0, 15, 30] }}
          transition={{ duration: 0.35, repeat: Infinity, delay: 0.1 }}
        />
      </>
    )}
    
    <ellipse cx="0" cy="8" rx="7" ry="2.5" fill="rgba(0,0,0,0.15)" />
    
    <g transform="translate(-6, -7)">
      <rect x="0.5" y="0.5" width="11" height="14" rx="2"
        fill={nightMode ? '#D4A853' : '#B8602A'}
        stroke={nightMode ? '#E8C872' : '#8B4513'}
        strokeWidth="0.5"
      />
      <rect x="1.5" y="2.5" width="9" height="6" rx="0.8" fill={nightMode ? '#1C2431' : '#3D3428'} />
      <line x1="2.5" y1="4" x2="9.5" y2="4" stroke={nightMode ? '#3D4758' : '#5C5347'} strokeWidth="0.4" />
      <line x1="2.5" y1="6.5" x2="9.5" y2="6.5" stroke={nightMode ? '#3D4758' : '#5C5347'} strokeWidth="0.4" />
      <rect x="1.8" y="0.8" width="8.4" height="2" rx="0.4" fill={nightMode ? '#4A6741' : '#5B8A72'} opacity="0.9" />
      <rect x="1.8" y="11.5" width="8.4" height="1.8" rx="0.4" fill={nightMode ? '#4A6741' : '#5B8A72'} opacity="0.9" />
      <circle cx="-0.5" cy="3.5" r="1.8" fill="#1A1A1A" stroke="#333" strokeWidth="0.3" />
      <circle cx="12.5" cy="3.5" r="1.8" fill="#1A1A1A" stroke="#333" strokeWidth="0.3" />
      <circle cx="-0.5" cy="11.5" r="1.8" fill="#1A1A1A" stroke="#333" strokeWidth="0.3" />
      <circle cx="12.5" cy="11.5" r="1.8" fill="#1A1A1A" stroke="#333" strokeWidth="0.3" />
      <circle cx="-0.5" cy="3.5" r="0.6" fill="#555" />
      <circle cx="12.5" cy="3.5" r="0.6" fill="#555" />
      <circle cx="-0.5" cy="11.5" r="0.6" fill="#555" />
      <circle cx="12.5" cy="11.5" r="0.6" fill="#555" />
      <rect x="2.5" y="-0.2" width="1.8" height="0.8" rx="0.2" fill="#FFF8E0" />
      <rect x="7.7" y="-0.2" width="1.8" height="0.8" rx="0.2" fill="#FFF8E0" />
    </g>
  </svg>
);

// Savanna silhouette
const SavannaSilhouette = ({ color }: { color: string }) => (
  <svg 
    className="absolute bottom-0 left-0 w-full pointer-events-none"
    style={{ height: '18vh', minHeight: '80px', maxHeight: '160px' }}
    viewBox="0 0 1400 150"
    preserveAspectRatio="none"
  >
    <path
      d={`
        M0,150 L0,120
        Q30,115 50,120
        L80,120 Q95,75 110,120
        Q130,95 150,120
        L200,120 Q230,55 260,120
        Q280,100 300,120
        L380,120 Q410,70 440,120
        L520,120 Q540,45 560,120
        Q580,90 600,120
        L700,120 Q740,60 780,120
        L860,120 Q890,80 920,120
        L980,120 Q1010,50 1040,120
        Q1060,85 1080,120
        L1150,120 Q1190,65 1230,120
        L1320,120 Q1360,90 1400,120
        L1400,150 Z
      `}
      fill={color}
      opacity="0.12"
    />
    <g fill={color} opacity="0.08">
      {[80, 160, 250, 340, 450, 550, 680, 800, 920, 1050, 1180, 1300].map((x, i) => (
        <path key={i} d={`M${x},150 L${x+6},${125 - (i % 4) * 5} L${x+12},150 Z`} />
      ))}
    </g>
  </svg>
);

export const LandingPage = memo(function LandingPage() {
  const { nightMode, startExploration, tourOrder } = useAppStore();
  const [isLeaving, setIsLeaving] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleStart = () => {
    setIsLeaving(true);
    setTimeout(() => {
      startExploration(locations);
    }, 1000);
  };
  
  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!isLeaving) handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLeaving]);
  
  const firstLocation = locations.find(l => l.id === tourOrder[0]);
  
  const colors = {
    text: nightMode ? '#F0E6D3' : '#3D3428',
    textMuted: nightMode ? '#8B949E' : '#8B8578',
    primary: nightMode ? '#E8C872' : '#B8602A',
    border: nightMode ? '#E8C872' : '#B8602A',
  };
  
  if (!isReady) return null;
  
  return (
    <div 
      className="min-h-screen h-screen overflow-hidden flex flex-col items-center justify-between py-6 sm:py-8 px-4 relative"
      style={{ 
        background: nightMode 
          ? 'linear-gradient(180deg, #0D1117 0%, #161B22 40%, #1C2431 100%)'
          : 'linear-gradient(180deg, #F5EBD9 0%, #EDE0C8 40%, #E5D4B8 100%)',
      }}
    >
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Savanna silhouette */}
      <SavannaSilhouette color={colors.primary} />
      
      {/* TOP */}
      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLeaving ? 0 : 1, y: isLeaving ? -30 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Flag */}
        <motion.div 
          className="mx-auto mb-3"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.6, delay: 0.1 }}
        >
          <div 
            className="w-14 h-10 sm:w-16 sm:h-11 rounded-md overflow-hidden shadow-lg border mx-auto"
            style={{ borderColor: `${colors.border}30` }}
          >
            <div className="h-full flex flex-col relative">
              <div className="flex-1 bg-[#003580]" />
              <div className="h-[2px] bg-white" />
              <div className="flex-1 bg-[#D21034]" />
              <div className="h-[2px] bg-white" />
              <div className="flex-1 bg-[#009A44]" />
              <div className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full bg-[#FFD100] shadow" />
            </div>
          </div>
        </motion.div>
        
        {/* Title */}
        <motion.h1 
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          style={{ color: colors.text }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Namibie
        </motion.h1>
        
        {/* Tagline */}
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl font-accent italic mt-1"
          style={{ color: colors.primary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          L'Afrique dans sa forme la plus pure
        </motion.p>
      </motion.div>
      
      {/* MIDDLE */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center z-10 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLeaving ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="text-center mb-6 px-2">
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: colors.textMuted }}>
            Là où les dunes rouges rencontrent l'océan Atlantique,
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>
            où les éléphants du désert parcourent des terres ancestrales.
          </p>
          <p className="text-sm sm:text-base mt-3 font-medium" style={{ color: colors.text }}>
            Explorez <span style={{ color: colors.primary }}>10 territoires sauvages</span> en safari interactif.
          </p>
        </div>
        
        {/* Vehicle */}
        <motion.div 
          animate={isLeaving ? { 
            y: [0, 500],
            scale: [1, 0.6],
            opacity: [1, 0],
          } : {
            y: [0, -6, 0],
          }}
          transition={isLeaving ? {
            duration: 0.9,
            ease: [0.4, 0, 1, 1],
          } : {
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <VehicleSVG nightMode={nightMode} isMoving={isLeaving} />
        </motion.div>
      </motion.div>
      
      {/* BOTTOM */}
      <div className="text-center z-10 pb-2">
        <AnimatePresence mode="wait">
          {!isLeaving ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={handleStart}
                className="relative px-10 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl overflow-hidden shadow-xl border-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  backgroundColor: colors.primary,
                  borderColor: nightMode ? '#C9956C' : '#8B4513',
                  color: nightMode ? '#0D1117' : '#FFF',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(0,0,0,0.25)' }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  🦁 Démarrer le Safari
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
              
              <p className="text-xs sm:text-sm mt-3" style={{ color: colors.textMuted }}>
                10 étapes • ~5 min • Appuyez sur Entrée ⏎
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              className="py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg sm:text-xl font-semibold" style={{ color: colors.primary }}>
                🚙 En route vers {firstLocation?.shortName || 'Sossusvlei'}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Corner decorations */}
      {[
        'top-4 left-4 border-l-2 border-t-2',
        'top-4 right-4 border-r-2 border-t-2',
        'bottom-4 left-4 border-l-2 border-b-2',
        'bottom-4 right-4 border-r-2 border-b-2',
      ].map((classes, i) => (
        <div 
          key={i}
          className={`absolute w-8 h-8 sm:w-10 sm:h-10 ${classes}`}
          style={{ borderColor: `${colors.border}25` }}
        />
      ))}
    </div>
  );
});

export default LandingPage;
