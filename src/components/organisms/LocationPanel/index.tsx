import { memo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { months, locations, rarityLabels, animalEmojis, getBudgetLabel } from '@/data/locations';
import Icon from '@/components/atoms/Icon';

// Animation variants pour les sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

export const LocationPanel = memo(function LocationPanel() {
  const { 
    nightMode, 
    selectedLocation, 
    setSelectedLocation,
    isPanelOpen,
    currentTourIndex,
    tourOrder,
    goToNextStop,
    goToPrevStop,
    isVehicleMoving,
  } = useAppStore();
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const isLastStop = currentTourIndex === tourOrder.length - 1;
  const isFirstStop = currentTourIndex === 0;
  
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setCurrentImageIndex(0);
  }, [selectedLocation?.id]);
  
  const handleClose = useCallback(() => {
    setSelectedLocation(null);
  }, [setSelectedLocation]);
  
  const handlePrev = useCallback(() => {
    if (!isVehicleMoving && !isFirstStop) {
      goToPrevStop(locations);
    }
  }, [isVehicleMoving, isFirstStop, goToPrevStop]);
  
  const handleNext = useCallback(() => {
    if (!isVehicleMoving && !isLastStop) {
      goToNextStop(locations);
    }
  }, [isVehicleMoving, isLastStop, goToNextStop]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedLocation) return;
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
        else handleClose();
      }
      if (e.key === 'ArrowRight' && !lightboxOpen) handleNext();
      if (e.key === 'ArrowLeft' && !lightboxOpen) handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLocation, handleClose, lightboxOpen, handleNext, handlePrev]);
  
  // Hero image carousel
  const heroImages = selectedLocation?.images || [];
  const nextHeroImage = () => {
    if (heroImages.length > 1) setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };
  const prevHeroImage = () => {
    if (heroImages.length > 1) setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  
  // Lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  if (!isPanelOpen || !selectedLocation) return null;
  
  // Couleur du lieu pour les accents
  const accentColor = selectedLocation.color;
  
  return (
    <>
      <motion.div
        className={`w-full sm:w-[400px] md:w-[420px] flex-shrink-0 h-full overflow-hidden border-l ${
          nightMode 
            ? 'bg-night-surface border-night-primary/20' 
            : 'bg-day-surface border-day-primary/20'
        }`}
        style={{ 
          boxShadow: nightMode 
            ? '-8px 0 30px rgba(0, 0, 0, 0.3)' 
            : '-8px 0 30px rgba(0, 0, 0, 0.08)',
          maxWidth: '100vw',
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 'auto', opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`location-${selectedLocation.id}`}
            className="w-full sm:w-[400px] md:w-[420px] h-full flex flex-col relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <motion.button
              className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-colors ${
                nightMode 
                  ? 'bg-black/50 text-white hover:bg-black/70' 
                  : 'bg-white/80 text-gray-800 hover:bg-white'
              } backdrop-blur-md shadow-lg`}
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Fermer"
            >
              <Icon name="close" size={18} />
            </motion.button>
            
            {/* Step badge */}
            <motion.div 
              className="absolute top-3 left-3 z-20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md shadow-lg"
              style={{ backgroundColor: accentColor, color: '#FFF' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              {currentTourIndex + 1} / {tourOrder.length}
            </motion.div>
            
            {/* FIXED Hero image */}
            <div className="relative h-40 sm:h-44 flex-shrink-0 overflow-hidden group">
              {!imageLoaded && !imageError && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  nightMode ? 'bg-night-background' : 'bg-day-background'
                }`}>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} 
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-5xl opacity-30">
                      {animalEmojis[selectedLocation.fauna[0]?.id] || '🦁'}
                    </span>
                  </motion.div>
                </div>
              )}
              
              {imageError && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  nightMode ? 'bg-night-background' : 'bg-day-background'
                }`}>
                  <div className="text-center">
                    <span className="text-4xl opacity-30">📷</span>
                    <p className={`text-sm mt-2 ${nightMode ? 'text-night-text-muted' : 'text-day-text-muted'}`}>
                      Image non disponible
                    </p>
                  </div>
                </div>
              )}
              
              <motion.img
                key={currentImageIndex}
                src={heroImages[currentImageIndex] || selectedLocation.heroImage}
                alt={selectedLocation.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Image carousel controls */}
              {heroImages.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
                    onClick={(e) => { e.stopPropagation(); prevHeroImage(); }}
                  >
                    <Icon name="chevronLeft" size={18} />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
                    onClick={(e) => { e.stopPropagation(); nextHeroImage(); }}
                  >
                    <Icon name="chevronRight" size={18} />
                  </button>
                  
                  {/* Dots */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroImages.map((_, i) => (
                      <button
                        key={i}
                        className={`h-2 rounded-full transition-all ${
                          i === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                        }`}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Location name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sm text-white/80 mb-1 font-medium">{selectedLocation.region}</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedLocation.name}
                </h2>
              </div>
            </div>
            
            {/* ========== SCROLLABLE CONTENT ========== */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="px-5 py-5 space-y-6">
                
                {/* ===== CITATION PULL-QUOTE ===== */}
                <motion.div 
                  className="relative rounded-2xl p-5"
                  style={{ backgroundColor: `${accentColor}15` }}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  {/* Guillemet décorative */}
                  <span 
                    className="absolute -top-2 left-4 text-6xl font-serif leading-none opacity-30"
                    style={{ color: accentColor }}
                  >
                    "
                  </span>
                  <p 
                    className="font-accent italic text-lg sm:text-xl leading-relaxed pt-4"
                    style={{ color: nightMode ? '#F0E6D3' : '#2A2520' }}
                  >
                    {selectedLocation.quote}
                  </p>
                </motion.div>
                
                {/* ===== DESCRIPTION ===== */}
                <motion.p 
                  className={`text-base leading-relaxed ${
                    nightMode ? 'text-night-text-secondary' : 'text-day-text-secondary'
                  }`}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  {selectedLocation.description}
                </motion.p>
                
                {/* ===== HIGHLIGHTS - Emojis XXL ===== */}
                <motion.div 
                  className="space-y-3"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${
                    nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                  }`}>
                    À ne pas manquer
                  </h3>
                  <div className="space-y-2">
                    {selectedLocation.highlights.map((highlight, i) => (
                      <motion.div 
                        key={i} 
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                          nightMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                        }`}
                        style={{ borderLeft: `4px solid ${accentColor}` }}
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-3xl sm:text-4xl">{highlight.icon}</span>
                        <span className={`text-base font-medium ${
                          nightMode ? 'text-night-text' : 'text-day-text'
                        }`}>
                          {highlight.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* ===== FAUNE - Plus visible ===== */}
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                    nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                  }`}>
                    🦁 Faune observable
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.fauna.map((animal) => (
                      <motion.div 
                        key={animal.id}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full ${
                          nightMode ? 'bg-white/10' : 'bg-black/5'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">{animalEmojis[animal.id]}</span>
                        <span className={`text-sm font-medium ${
                          nightMode ? 'text-night-text' : 'text-day-text'
                        }`}>
                          {animal.name}
                        </span>
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ 
                            backgroundColor: `${rarityLabels[animal.rarity].color}25`,
                            color: rarityLabels[animal.rarity].color,
                          }}
                        >
                          {rarityLabels[animal.rarity].label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* ===== INFOS PRATIQUES - Grid avec icônes ===== */}
                <motion.div 
                  className={`grid grid-cols-2 gap-3 p-4 rounded-2xl ${
                    nightMode ? 'bg-white/5' : 'bg-black/5'
                  }`}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  {/* Durée */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      ⏱
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-wide ${
                        nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                      }`}>Durée</p>
                      <p className={`text-sm font-bold ${
                        nightMode ? 'text-night-text' : 'text-day-text'
                      }`}>{selectedLocation.duration}</p>
                    </div>
                  </div>
                  
                  {/* Budget */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      💰
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-wide ${
                        nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                      }`}>Budget</p>
                      <p className="text-sm font-bold" style={{ color: accentColor }}>
                        {getBudgetLabel(selectedLocation.budget)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Distance */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      📍
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-wide ${
                        nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                      }`}>Distance</p>
                      <p className={`text-sm font-bold ${
                        nightMode ? 'text-night-text' : 'text-day-text'
                      }`}>{selectedLocation.distance}</p>
                    </div>
                  </div>
                  
                  {/* Accès */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      <Icon name={selectedLocation.safariIcon} size={20} style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-wide ${
                        nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                      }`}>Accès</p>
                      <p className={`text-sm font-bold ${
                        nightMode ? 'text-night-text' : 'text-day-text'
                      }`}>{selectedLocation.accessLabel}</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* ===== MEILLEURE PÉRIODE ===== */}
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                    nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                  }`}>
                    📅 Meilleure période
                  </h3>
                  <div className="flex gap-1">
                    {months.map((month) => {
                      const isInPeriod = month.index >= selectedLocation.bestPeriod.start && 
                                        month.index <= selectedLocation.bestPeriod.end;
                      return (
                        <motion.div
                          key={month.index}
                          className={`flex-1 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            isInPeriod 
                              ? 'text-white shadow-md' 
                              : nightMode 
                                ? 'bg-white/5 text-white/30' 
                                : 'bg-black/5 text-black/30'
                          }`}
                          style={{ backgroundColor: isInPeriod ? accentColor : undefined }}
                          title={month.full}
                          whileHover={{ scale: 1.1 }}
                        >
                          {month.short}
                        </motion.div>
                      );
                    })}
                  </div>
                  <p className={`text-sm mt-2 font-medium ${
                    nightMode ? 'text-night-text-secondary' : 'text-day-text-secondary'
                  }`}>
                    {selectedLocation.periodLabel}
                  </p>
                </motion.div>
                
                {/* ===== GALERIE ===== */}
                {selectedLocation.images && selectedLocation.images.length > 1 && (
                  <motion.div 
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={6}
                  >
                    <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                      nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                    }`}>
                      📷 Galerie
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedLocation.images.map((img, i) => (
                        <motion.div 
                          key={i} 
                          className="aspect-square rounded-xl overflow-hidden cursor-pointer relative group"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => openLightbox(i)}
                        >
                          <img 
                            src={img} 
                            alt={`${selectedLocation.name} ${i + 1}`} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <Icon name="zoomIn" size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* ===== SAFARI TERMINÉ ===== */}
                {isLastStop && (
                  <motion.div 
                    className="p-6 rounded-2xl text-center"
                    style={{ backgroundColor: `${accentColor}15` }}
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <motion.p 
                      className="text-5xl mb-3"
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      🎉
                    </motion.p>
                    <p className="text-xl font-bold" style={{ color: accentColor }}>
                      Safari terminé !
                    </p>
                    <p className={`text-sm mt-2 ${
                      nightMode ? 'text-night-text-muted' : 'text-day-text-muted'
                    }`}>
                      Vous avez exploré les 10 territoires de Namibie
                    </p>
                  </motion.div>
                )}
                
                {/* Spacer pour le scroll */}
                <div className="h-2" />
              </div>
            </div>
            
            {/* ========== NAVIGATION BUTTONS ========== */}
            <div 
              className="flex-shrink-0 px-5 py-3 border-t"
              style={{ 
                backgroundColor: nightMode ? '#0D1117' : '#1A1814',
                borderColor: nightMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex gap-3">
                <motion.button
                  onClick={handlePrev}
                  disabled={isFirstStop || isVehicleMoving}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isFirstStop || isVehicleMoving
                      ? 'opacity-40 cursor-not-allowed'
                      : ''
                  }`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#F0E6D3',
                  }}
                  whileHover={!isFirstStop && !isVehicleMoving ? { scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' } : {}}
                  whileTap={!isFirstStop && !isVehicleMoving ? { scale: 0.98 } : {}}
                >
                  <Icon name="chevronLeft" size={18} />
                  Précédent
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  disabled={isLastStop || isVehicleMoving}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isLastStop || isVehicleMoving
                      ? 'opacity-40 cursor-not-allowed'
                      : ''
                  }`}
                  style={{ 
                    backgroundColor: isLastStop || isVehicleMoving ? 'rgba(255, 255, 255, 0.1)' : accentColor,
                    color: isLastStop || isVehicleMoving ? '#F0E6D3' : '#0D1117',
                  }}
                  whileHover={!isLastStop && !isVehicleMoving ? { scale: 1.02 } : {}}
                  whileTap={!isLastStop && !isVehicleMoving ? { scale: 0.98 } : {}}
                >
                  Suivant
                  <Icon name="chevronRight" size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      {/* ========== LIGHTBOX ========== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <Icon name="close" size={24} />
            </button>
            
            <div className="absolute top-4 left-4 text-white/70 text-base font-medium">
              {lightboxIndex + 1} / {selectedLocation.images.length}
            </div>
            
            <motion.img
              key={lightboxIndex}
              src={selectedLocation.images[lightboxIndex]}
              alt={`${selectedLocation.name} ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            
            {selectedLocation.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev - 1 + selectedLocation.images.length) % selectedLocation.images.length);
                  }}
                >
                  <Icon name="chevronLeft" size={28} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev + 1) % selectedLocation.images.length);
                  }}
                >
                  <Icon name="chevronRight" size={28} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default LocationPanel;
