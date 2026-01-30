import { memo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';

export const Sidebar = memo(function Sidebar() {
  const { hasStarted } = useAppStore();
  
  if (!hasStarted) return null;
  
  return (
    <motion.aside
      className="relative z-20 flex flex-col items-center justify-center h-full"
      style={{ 
        backgroundColor: '#0D1117',
        width: '48px',
        minWidth: '48px',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* MENU vertical */}
      <div 
        className="flex flex-col items-center gap-1 text-xs font-semibold tracking-widest"
        style={{ color: '#8B949E' }}
      >
        {'MENU'.split('').map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </motion.aside>
  );
});

export default Sidebar;
