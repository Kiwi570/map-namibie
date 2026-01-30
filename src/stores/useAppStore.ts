import { create } from 'zustand';
import type { Location } from '@/types';
import { SAFARI_TOUR_ORDER } from '@/constants';

// ============================================
// STORE TYPES
// ============================================
interface AppState {
  // Theme
  nightMode: boolean;
  toggleNightMode: () => void;
  
  // Loading
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (transitioning: boolean) => void;
  
  // Onboarding
  hasStarted: boolean;
  startExploration: (locations: Location[]) => void;
  
  // Panel
  isPanelOpen: boolean;
  
  // Map interaction
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  hoveredLocation: Location | null;
  setHoveredLocation: (location: Location | null) => void;
  
  // Filters
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  accessFilter: string;
  setAccessFilter: (filter: string) => void;
  showFilters: boolean;
  toggleShowFilters: () => void;
  
  // Safari Mode 🚗
  safariMode: 'free' | 'guided';
  setSafariMode: (mode: 'free' | 'guided') => void;
  currentTourIndex: number;
  vehiclePosition: { x: number; y: number };
  vehicleRotation: number;
  isVehicleMoving: boolean;
  tourOrder: string[];
  
  // Safari actions
  moveVehicleTo: (position: { x: number; y: number }, onComplete?: () => void) => void;
  goToNextStop: (locations: Location[]) => void;
  goToPrevStop: (locations: Location[]) => void;
  goToLocationById: (locationId: string, locations: Location[]) => void;
  resetSafari: (locations: Location[]) => void;
}

// ============================================
// HELPERS
// ============================================
const calculateRotation = (from: { x: number; y: number }, to: { x: number; y: number }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
};

const getInitialTheme = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('safari-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

// ============================================
// STORE V10
// ============================================
export const useAppStore = create<AppState>()((set, get) => ({
  // Theme
  nightMode: getInitialTheme(),
  toggleNightMode: () => {
    set((state) => {
      const newMode = !state.nightMode;
      localStorage.setItem('safari-theme', newMode ? 'dark' : 'light');
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { nightMode: newMode, isTransitioning: true };
    });
    setTimeout(() => set({ isTransitioning: false }), 1500);
  },
  
  // Loading
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  isTransitioning: false,
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  
  // Onboarding
  hasStarted: false,
  startExploration: (locations) => {
    const { tourOrder, moveVehicleTo } = get();
    const firstLocationId = tourOrder[0];
    const firstLocation = locations.find(l => l.id === firstLocationId);
    
    set({ hasStarted: true, safariMode: 'guided', currentTourIndex: 0 });
    
    if (firstLocation) {
      setTimeout(() => {
        moveVehicleTo(firstLocation.position, () => {
          set({ selectedLocation: firstLocation });
        });
      }, 300);
    }
  },
  
  // Panel
  isPanelOpen: true,
  
  // Map interaction
  selectedLocation: null,
  setSelectedLocation: (location) => {
    set({ 
      selectedLocation: location,
      isPanelOpen: location !== null || !get().hasStarted,
    });
  },
  hoveredLocation: null,
  setHoveredLocation: (location) => set({ hoveredLocation: location }),
  
  // Filters
  activeFilter: 'all',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  accessFilter: 'all',
  setAccessFilter: (filter) => set({ accessFilter: filter }),
  showFilters: false,
  toggleShowFilters: () => set((state) => ({ showFilters: !state.showFilters })),
  
  // Safari Mode 🚗
  safariMode: 'guided',
  setSafariMode: (mode) => set({ safariMode: mode }),
  currentTourIndex: -1,
  vehiclePosition: { x: 35, y: -8 },
  vehicleRotation: 180,
  isVehicleMoving: false,
  tourOrder: SAFARI_TOUR_ORDER,
  
  // Move vehicle
  moveVehicleTo: (newPosition, onComplete) => {
    const { vehiclePosition } = get();
    const rotation = calculateRotation(vehiclePosition, newPosition);
    
    set({ vehicleRotation: rotation, isVehicleMoving: true });
    
    setTimeout(() => {
      set({ vehiclePosition: newPosition });
      
      setTimeout(() => {
        set({ isVehicleMoving: false });
        if (onComplete) onComplete();
      }, 1500);
    }, 200);
  },
  
  // Next stop
  goToNextStop: (locations) => {
    const { currentTourIndex, tourOrder, moveVehicleTo, setSelectedLocation } = get();
    const nextIndex = (currentTourIndex + 1) % tourOrder.length;
    
    set({ currentTourIndex: nextIndex });
    const nextLocation = locations.find(l => l.id === tourOrder[nextIndex]);
    
    if (nextLocation) {
      moveVehicleTo(nextLocation.position, () => setSelectedLocation(nextLocation));
    }
  },
  
  // Previous stop
  goToPrevStop: (locations) => {
    const { currentTourIndex, tourOrder, moveVehicleTo, setSelectedLocation } = get();
    const prevIndex = currentTourIndex <= 0 ? tourOrder.length - 1 : currentTourIndex - 1;
    
    set({ currentTourIndex: prevIndex });
    const prevLocation = locations.find(l => l.id === tourOrder[prevIndex]);
    
    if (prevLocation) {
      moveVehicleTo(prevLocation.position, () => setSelectedLocation(prevLocation));
    }
  },
  
  // Go to specific location
  goToLocationById: (locationId, locations) => {
    const { tourOrder, moveVehicleTo, setSelectedLocation, hasStarted } = get();
    
    if (!hasStarted) return;
    
    const location = locations.find(l => l.id === locationId);
    const tourIndex = tourOrder.indexOf(locationId);
    
    if (location) {
      set({ currentTourIndex: tourIndex >= 0 ? tourIndex : get().currentTourIndex });
      moveVehicleTo(location.position, () => setSelectedLocation(location));
    }
  },
  
  // Reset safari
  resetSafari: (locations) => {
    const { tourOrder, moveVehicleTo, setSelectedLocation } = get();
    set({ currentTourIndex: 0 });
    
    const firstLocation = locations.find(l => l.id === tourOrder[0]);
    if (firstLocation) {
      moveVehicleTo(firstLocation.position, () => setSelectedLocation(firstLocation));
    }
  },
}));
