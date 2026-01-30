import { useEffect, useCallback } from 'react';

// Hook for keyboard navigation
export const useKeyboardNavigation = (
  onNext: () => void,
  onPrev: () => void,
  onClose: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose, enabled]);
};

// Hook for preloading images
export const useImagePreloader = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
};

// Hook for detecting mobile
export const useIsMobile = () => {
  const checkMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);
  
  return checkMobile();
};
