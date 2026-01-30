// ============================================
// TYPES V10 - SAFARI NAMIBIE
// ============================================

export interface Animal {
  id: string;
  name: string;
  icon: string;
  rarity: 'rare' | 'frequent' | 'common';
}

export interface Highlight {
  icon: string;
  text: string;
}

export interface Location {
  id: string;
  name: string;
  shortName: string;
  region: string;
  position: { x: number; y: number };
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
  tooltipPosition: 'top' | 'bottom';
  summary: string;
  description: string;
  quote: string;
  fauna: Animal[];
  safariType: string;
  safariIcon: 'jeep' | 'walking' | 'boat';
  bestPeriod: { start: number; end: number };
  periodLabel: string;
  accommodation: string;
  accessLevel: number;
  accessLabel: string;
  color: string;
  highlights: Highlight[];
  duration: string;
  bestTime: string;
  budget: number;
  distance: string;
  images: string[];
  heroImage: string;
}

export interface Month {
  short: string;
  full: string;
  index: number;
}

export interface Filter {
  id: string;
  label: string;
  icon?: string;
  keywords?: string[];
  min?: number;
  max?: number;
}
