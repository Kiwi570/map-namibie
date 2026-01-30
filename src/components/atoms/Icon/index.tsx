import { memo } from 'react';
import {
  Sun,
  Moon,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Filter,
  Compass,
  Car,
  Footprints,
  Ship,
  Camera,
  Info,
  Check,
  RotateCcw,
  ZoomIn,
} from 'lucide-react';

const icons = {
  sun: Sun,
  moon: Moon,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  mapPin: MapPin,
  calendar: Calendar,
  clock: Clock,
  users: Users,
  star: Star,
  filter: Filter,
  compass: Compass,
  jeep: Car,
  walking: Footprints,
  boat: Ship,
  camera: Camera,
  info: Info,
  check: Check,
  reset: RotateCcw,
  zoomIn: ZoomIn,
};

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  className?: string;
}

export const Icon = memo(function Icon({ name, size = 20, className = '' }: IconProps) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
});

export default Icon;
