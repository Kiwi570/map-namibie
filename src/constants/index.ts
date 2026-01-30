// ============================================
// CONSTANTS V10 - SAFARI NAMIBIE
// ============================================

// Animation springs
export const SPRING = {
  gentle: { type: 'spring', stiffness: 100, damping: 15 },
  bouncy: { type: 'spring', stiffness: 300, damping: 20 },
  smooth: { type: 'spring', stiffness: 200, damping: 25 },
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
};

// Timing
export const TIMING = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
};

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Map config
export const MAP_CONFIG = {
  viewBox: '0 0 100 75',
  markerRadius: 5,
  markerRadiusHover: 5.5,
  vehicleScale: 0.18,
};

// Safari tour - ITINÉRAIRE OPTIMISÉ géographiquement
export const SAFARI_TOUR_ORDER = [
  'sossusvlei',   // 1. Sud-Ouest - Dunes iconiques (point de départ logique après Windhoek)
  'fish-river',   // 2. Extrême Sud - Canyon
  'skeleton',     // 3. Côte Nord-Ouest - Remontée côtière
  'damaraland',   // 4. Nord-Ouest intérieur
  'etosha',       // 5. Nord - Parc majeur
  'waterberg',    // 6. Centre-Nord - Descente
  'okonjima',     // 7. Centre - AfriCat
  'erindi',       // 8. Centre-Sud
  'bwabwata',     // 9. Nord-Est - Caprivi
  'zambezi',      // 10. Extrême Nord-Est - Finale sur le fleuve
];
