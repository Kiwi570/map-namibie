import { memo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import Icon from '@/components/atoms/Icon';

export const Header = memo(function Header() {
  const { nightMode, toggleNightMode, hasStarted, showFilters, toggleShowFilters } = useAppStore();
  
  const colors = {
    text: '#F0E6D3',
    textMuted: '#8B949E',
    primary: '#E8C872',
    buttonBg: 'rgba(232, 200, 114, 0.15)',
    buttonHover: 'rgba(232, 200, 114, 0.25)',
  };
  
  return (
    <motion.header
      className="relative z-20 flex items-center justify-between px-3 sm:px-4 md:px-6 py-3"
      style={{ 
        backgroundColor: '#0D1117',
        color: '#F0E6D3',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo & Title */}
      <div className="flex items-center gap-2">
        <motion.div
          className="relative w-6 h-6 sm:w-7 sm:h-7"
          animate={{ rotate: nightMode ? 180 : 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 48 48" className="w-full h-full">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8C872" />
                <stop offset="100%" stopColor="#C9956C" />
              </linearGradient>
            </defs>
            <circle 
              cx="24" cy="24" r="22" 
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <polygon 
              points="24,6 27,24 24,42 21,24" 
              fill="url(#logoGradient)"
              fillOpacity="0.4"
              stroke="url(#logoGradient)"
              strokeWidth="1.5"
            />
            <circle cx="24" cy="24" r="3" fill="url(#logoGradient)" />
          </svg>
        </motion.div>
        
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <h1 className="font-display text-sm sm:text-base md:text-lg font-semibold tracking-tight">
            Safari Namibie
          </h1>
          <p 
            className="hidden sm:block text-[10px] sm:text-xs font-accent italic"
            style={{ color: colors.textMuted }}
          >
            Dix territoires sauvages
          </p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Filter toggle (only when started) */}
        {hasStarted && (
          <motion.button
            onClick={toggleShowFilters}
            className="relative p-1.5 sm:p-2 rounded-full transition-colors"
            style={{ 
              backgroundColor: showFilters ? colors.buttonHover : colors.buttonBg,
              color: colors.primary,
            }}
            whileHover={{ scale: 1.1, backgroundColor: colors.buttonHover }}
            whileTap={{ scale: 0.9 }}
            aria-label="Filtres"
          >
            <Icon name="filter" size={16} />
          </motion.button>
        )}
        
        {/* Day/Night Toggle */}
        <motion.button
          onClick={toggleNightMode}
          className="relative p-1.5 sm:p-2 rounded-full transition-colors"
          style={{ 
            backgroundColor: colors.buttonBg,
            color: colors.primary,
          }}
          whileHover={{ scale: 1.1, backgroundColor: colors.buttonHover }}
          whileTap={{ scale: 0.9 }}
          aria-label={nightMode ? 'Mode jour' : 'Mode nuit'}
        >
          <motion.div
            initial={false}
            animate={{ rotate: nightMode ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon name={nightMode ? 'moon' : 'sun'} size={16} />
          </motion.div>
          
          {nightMode && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
              }}
            />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
});

export default Header;
