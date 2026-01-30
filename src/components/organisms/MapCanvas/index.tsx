import { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { locations, filterLocations, animalEmojis } from '@/data/locations';
import type { Location } from '@/types';
import { SPRING } from '@/constants';

// Marker config V10 - Plus grand pour mobile
const MARKER = {
  radius: 5.5,
  radiusHover: 6,
  pulseMax: 8,
  strokeWidth: 0.6,
  strokeWidthSelected: 0.8,
};

// Label offsets - V10 optimisés
const getLabelOffset = (position: string) => {
  switch (position) {
    case 'top': return { x: 0, y: -5.5 };
    case 'bottom': return { x: 0, y: 6 };
    case 'left': return { x: -5.5, y: 0.5 };
    case 'right': return { x: 5.5, y: 0.5 };
    default: return { x: 0, y: 6 };
  }
};

const getLabelAnchor = (position: string) => {
  switch (position) {
    case 'left': return 'end';
    case 'right': return 'start';
    default: return 'middle';
  }
};

// Get main animal emoji
const getMainAnimalEmoji = (location: Location): string => {
  const mainAnimal = location.fauna[0];
  if (mainAnimal && animalEmojis[mainAnimal.id]) {
    return animalEmojis[mainAnimal.id];
  }
  return '🦁';
};

export const MapCanvas = memo(function MapCanvas() {
  const { 
    nightMode, 
    activeFilter, 
    accessFilter,
    selectedLocation,
    hasStarted,
    vehiclePosition,
    vehicleRotation,
    isVehicleMoving,
    goToLocationById,
  } = useAppStore();
  
  const filteredLocations = useMemo(() => 
    filterLocations(activeFilter, accessFilter),
    [activeFilter, accessFilter]
  );
  
  const colors = useMemo(() => ({
    ocean: nightMode ? '#0D1117' : '#3D7A9E',
    oceanLight: nightMode ? '#161B22' : '#5A9BBE',
    land: nightMode ? '#1C2431' : '#F5EBD9',
    landMid: nightMode ? '#161B22' : '#E8DCC8',
    landDark: nightMode ? '#0D1117' : '#DDD0BA',
    border: nightMode ? '#E8C872' : '#A89070',
    borderLight: nightMode ? 'rgba(232, 200, 114, 0.3)' : 'rgba(168, 144, 112, 0.5)',
    desert: nightMode ? 'rgba(201, 149, 108, 0.15)' : 'rgba(218, 165, 100, 0.25)',
    text: nightMode ? 'rgba(232, 200, 114, 0.7)' : 'rgba(139, 115, 85, 0.8)',
    textLight: nightMode ? 'rgba(232, 200, 114, 0.4)' : 'rgba(139, 115, 85, 0.5)',
    wave: nightMode ? 'rgba(232, 200, 114, 0.1)' : 'rgba(255, 255, 255, 0.4)',
  }), [nightMode]);
  
  const handleMarkerClick = useCallback((location: Location) => {
    if (!isVehicleMoving) {
      goToLocationById(location.id, locations);
    }
  }, [isVehicleMoving, goToLocationById]);

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Noise overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <svg viewBox="0 0 100 75" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.land} />
              <stop offset="50%" stopColor={colors.landMid} />
              <stop offset="100%" stopColor={colors.landDark} />
            </linearGradient>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.oceanLight} />
              <stop offset="100%" stopColor={colors.ocean} />
            </linearGradient>
            <linearGradient id="desertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.desert} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            <pattern id="wavePattern" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3 Q1.5 1.5, 3 3 Q4.5 4.5, 6 3" fill="none" stroke={colors.wave} strokeWidth="0.4" />
            </pattern>
            <pattern id="sandTexture" width="3" height="3" patternUnits="userSpaceOnUse">
              <circle cx="0.5" cy="0.5" r="0.15" fill={colors.textLight} opacity="0.4" />
              <circle cx="2" cy="2" r="0.1" fill={colors.textLight} opacity="0.3" />
            </pattern>
            
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0.3" dy="0.3" stdDeviation="0.8" floodOpacity="0.2" />
            </filter>
            <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          
          {/* Background */}
          <rect x="0" y="0" width="100" height="75" fill={colors.landMid} />
          
          {/* Ocean */}
          <rect x="0" y="0" width="16" height="75" fill="url(#oceanGradient)" />
          <rect x="0" y="0" width="16" height="75" fill="url(#wavePattern)" opacity="0.6" />
          
          {/* Ocean label */}
          <text 
            x="8" y="45" 
            fill={nightMode ? 'rgba(232, 200, 114, 0.4)' : 'rgba(255, 255, 255, 0.6)'} 
            fontSize="2.2" 
            fontFamily="Cormorant Garamond, serif" 
            fontStyle="italic" 
            fontWeight="500" 
            textAnchor="middle" 
            transform="rotate(-90, 8, 45)"
          >
            Océan Atlantique
          </text>
          
          {/* Namibia shape */}
          <motion.path
            d="M 16 8 L 52 8 L 55 10 L 57 8 L 60 10 L 63 10 L 66 8 L 96 8 L 98 10 L 98 18 L 96 20 L 91 18 L 86 18 L 81 20 L 76 18 L 71 20 L 68 18 L 66 20 L 63 18 L 61 22 L 63 28 L 66 35 L 66 45 L 63 52 L 59 60 L 53 68 L 46 72 L 36 72 L 26 68 L 16 58 L 16 8 Z"
            fill="url(#landGradient)"
            stroke={colors.border}
            strokeWidth="0.4"
            filter="url(#dropShadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          
          {/* Sand texture */}
          <path 
            d="M 16 8 L 52 8 L 55 10 L 57 8 L 60 10 L 63 10 L 66 8 L 96 8 L 98 10 L 98 18 L 96 20 L 91 18 L 86 18 L 81 20 L 76 18 L 71 20 L 68 18 L 66 20 L 63 18 L 61 22 L 63 28 L 66 35 L 66 45 L 63 52 L 59 60 L 53 68 L 46 72 L 36 72 L 26 68 L 16 58 L 16 8 Z" 
            fill="url(#sandTexture)" 
            opacity="0.5" 
          />
          
          {/* Desert regions */}
          <ellipse cx="25" cy="50" rx="12" ry="15" fill="url(#desertGradient)" opacity="0.6" />
          <ellipse cx="35" cy="35" rx="18" ry="12" fill="url(#desertGradient)" opacity="0.4" />
          
          {/* Etosha Pan */}
          <ellipse cx="50" cy="18" rx="12" ry="4" fill={nightMode ? 'rgba(232, 200, 114, 0.08)' : 'rgba(255, 255, 255, 0.3)'} />
          <text x="50" y="19" textAnchor="middle" fill={colors.textLight} fontSize="1.2" fontFamily="Cormorant Garamond, serif" fontStyle="italic">
            Etosha Pan
          </text>
          
          {/* Neighboring countries */}
          <text x="50" y="4" textAnchor="middle" fill={colors.textLight} fontSize="1.4" fontFamily="DM Sans, sans-serif" letterSpacing="0.15">
            ANGOLA
          </text>
          <text x="90" y="4" textAnchor="middle" fill={colors.textLight} fontSize="1.2" fontFamily="DM Sans, sans-serif" letterSpacing="0.1">
            ZAMBIE
          </text>
          <text x="85" y="25" textAnchor="middle" fill={colors.textLight} fontSize="1.2" fontFamily="DM Sans, sans-serif" letterSpacing="0.1" transform="rotate(90, 85, 25)">
            BOTSWANA
          </text>
          <text x="50" y="74" textAnchor="middle" fill={colors.textLight} fontSize="1.2" fontFamily="DM Sans, sans-serif" letterSpacing="0.1">
            AFRIQUE DU SUD
          </text>
          
          {/* Location markers */}
          {locations.map((location, index) => {
            const isSelected = selectedLocation?.id === location.id;
            const isFiltered = !filteredLocations.some(l => l.id === location.id);
            const labelOffset = getLabelOffset(location.labelPosition);
            const labelAnchor = getLabelAnchor(location.labelPosition);
            const emoji = getMainAnimalEmoji(location);
            
            return (
              <g 
                key={location.id}
                transform={`translate(${location.position.x}, ${location.position.y})`}
                style={{ cursor: isVehicleMoving ? 'wait' : 'pointer' }}
                onClick={() => handleMarkerClick(location)}
              >
                {/* Pulse animation for selected */}
                {isSelected && (
                  <motion.circle
                    cx="0" cy="0"
                    r={MARKER.pulseMax}
                    fill="none"
                    stroke={location.color}
                    strokeWidth="0.3"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                
                {/* Main marker circle */}
                <motion.circle
                  cx="0" cy="0"
                  r={isSelected ? MARKER.radiusHover : MARKER.radius}
                  fill={nightMode ? '#161B22' : '#FFFDF7'}
                  stroke={location.color}
                  strokeWidth={isSelected ? MARKER.strokeWidthSelected : MARKER.strokeWidth}
                  filter={isSelected ? 'url(#markerGlow)' : undefined}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: isFiltered ? 0.6 : 1, 
                    opacity: isFiltered ? 0.3 : 1 
                  }}
                  transition={{ ...SPRING.bouncy, delay: index * 0.05 }}
                  style={{ filter: isFiltered ? 'grayscale(1)' : 'none' }}
                />
                
                {/* Animal emoji */}
                <text
                  x="0"
                  y="1"
                  textAnchor="middle"
                  fontSize="4"
                  style={{ pointerEvents: 'none' }}
                  opacity={isFiltered ? 0.3 : 1}
                >
                  {emoji}
                </text>
                
                {/* Label */}
                <text
                  x={labelOffset.x} 
                  y={labelOffset.y}
                  textAnchor={labelAnchor}
                  fontSize="1.8"
                  fontFamily="DM Sans, sans-serif"
                  fontWeight="700"
                  fill={nightMode ? '#F0E6D3' : '#2A2520'}
                  opacity={isFiltered ? 0.3 : 1}
                  stroke={nightMode ? '#0D1117' : '#FFFDF7'}
                  strokeWidth="0.5"
                  paintOrder="stroke"
                  style={{ pointerEvents: 'none' }}
                >
                  {location.shortName}
                </text>
              </g>
            );
          })}
          
          {/* Safari Vehicle */}
          <motion.g
            initial={false}
            animate={{
              x: vehiclePosition.x,
              y: vehiclePosition.y,
              rotate: vehicleRotation,
            }}
            transition={{
              x: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
              rotate: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            {/* Dust trail */}
            {isVehicleMoving && (
              <>
                <motion.circle
                  cx="0" cy="2.5"
                  r="2"
                  fill={nightMode ? 'rgba(232, 200, 114, 0.25)' : 'rgba(139, 115, 85, 0.25)'}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: [0, 2.5, 4], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.15 }}
                />
                <motion.circle
                  cx="-1.2" cy="3"
                  r="1.2"
                  fill={nightMode ? 'rgba(232, 200, 114, 0.2)' : 'rgba(139, 115, 85, 0.2)'}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: [0, 2, 3], opacity: [0.5, 0.2, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.1 }}
                />
                <motion.circle
                  cx="1.2" cy="3"
                  r="1.2"
                  fill={nightMode ? 'rgba(232, 200, 114, 0.2)' : 'rgba(139, 115, 85, 0.2)'}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: [0, 2, 3], opacity: [0.5, 0.2, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.15 }}
                />
              </>
            )}
            
            {/* Vehicle shadow */}
            <ellipse cx="0.3" cy="0.6" rx="2.5" ry="1.2" fill="rgba(0,0,0,0.2)" />
            
            {/* 4x4 Vehicle body */}
            <g transform="translate(-3, -4)">
              <rect x="0.5" y="0.5" width="5" height="7" rx="1.2"
                fill={nightMode ? '#D4A853' : '#B8602A'}
                stroke={nightMode ? '#E8C872' : '#8B4513'}
                strokeWidth="0.25"
              />
              <rect x="1" y="2" width="4" height="3" rx="0.4" fill={nightMode ? '#1C2431' : '#3D3428'} />
              <rect x="1.2" y="1" width="3.6" height="1.2" rx="0.3" fill={nightMode ? '#4A6741' : '#5B8A72'} opacity="0.85" />
              <rect x="1.2" y="6" width="3.6" height="1" rx="0.3" fill={nightMode ? '#4A6741' : '#5B8A72'} opacity="0.85" />
              <circle cx="0" cy="2" r="0.8" fill="#1A1A1A" />
              <circle cx="6" cy="2" r="0.8" fill="#1A1A1A" />
              <circle cx="0" cy="6.5" r="0.8" fill="#1A1A1A" />
              <circle cx="6" cy="6.5" r="0.8" fill="#1A1A1A" />
              <rect x="1.5" y="0" width="0.8" height="0.4" rx="0.15" fill="#F5E6D3" opacity="0.9" />
              <rect x="3.7" y="0" width="0.8" height="0.4" rx="0.15" fill="#F5E6D3" opacity="0.9" />
            </g>
            
            {/* Moving indicator */}
            {isVehicleMoving && (
              <motion.circle
                cx="0" cy="0"
                r="5"
                fill="none"
                stroke={nightMode ? '#E8C872' : '#B8602A'}
                strokeWidth="0.35"
                strokeDasharray="2.5 1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.3, 1.6] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.g>
          
          {/* Frame corners */}
          <g stroke={colors.borderLight} strokeWidth="0.25" fill="none">
            <path d="M 2 8 L 2 2 L 8 2" />
            <path d="M 92 2 L 98 2 L 98 8" />
            <path d="M 2 67 L 2 73 L 8 73" />
            <path d="M 92 73 L 98 73 L 98 67" />
          </g>
          
          {/* Scale bar */}
          <g transform="translate(75, 68)">
            <line x1="0" y1="0" x2="15" y2="0" stroke={colors.border} strokeWidth="0.25" />
            <line x1="0" y1="-0.8" x2="0" y2="0.8" stroke={colors.border} strokeWidth="0.25" />
            <line x1="15" y1="-0.8" x2="15" y2="0.8" stroke={colors.border} strokeWidth="0.25" />
            <text x="7.5" y="2.5" textAnchor="middle" fill={colors.textLight} fontSize="1" fontFamily="DM Sans, sans-serif">200 km</text>
          </g>
        </svg>
        
        {/* Night mode glow */}
        {nightMode && (
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              background: 'radial-gradient(ellipse at 60% 30%, rgba(232, 200, 114, 0.08) 0%, transparent 50%)' 
            }} 
          />
        )}
      </motion.div>
    </div>
  );
});

export default MapCanvas;
