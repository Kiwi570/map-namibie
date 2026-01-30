import type { Location, Animal, Filter, Month } from '@/types';

// ============================================
// ANIMALS WITH RARITY
// ============================================
export const animals: Record<string, Animal> = {
  lion: { id: 'lion', name: 'Lion', icon: 'lion', rarity: 'frequent' },
  leopard: { id: 'leopard', name: 'Léopard', icon: 'leopard', rarity: 'rare' },
  cheetah: { id: 'cheetah', name: 'Guépard', icon: 'cheetah', rarity: 'rare' },
  elephant: { id: 'elephant', name: 'Éléphant', icon: 'elephant', rarity: 'frequent' },
  rhino: { id: 'rhino', name: 'Rhinocéros', icon: 'rhino', rarity: 'rare' },
  giraffe: { id: 'giraffe', name: 'Girafe', icon: 'giraffe', rarity: 'frequent' },
  zebra: { id: 'zebra', name: 'Zèbre', icon: 'zebra', rarity: 'frequent' },
  oryx: { id: 'oryx', name: 'Oryx', icon: 'oryx', rarity: 'frequent' },
  buffalo: { id: 'buffalo', name: 'Buffle', icon: 'buffalo', rarity: 'common' },
  hippo: { id: 'hippo', name: 'Hippopotame', icon: 'hippo', rarity: 'common' },
  crocodile: { id: 'crocodile', name: 'Crocodile', icon: 'crocodile', rarity: 'common' },
  hyena: { id: 'hyena', name: 'Hyène', icon: 'hyena', rarity: 'common' },
  eagle: { id: 'eagle', name: 'Aigle', icon: 'eagle', rarity: 'common' },
};

// Rarity config
export const rarityLabels: Record<string, { label: string; color: string }> = {
  rare: { label: 'Rare', color: '#E07B54' },
  frequent: { label: 'Fréquent', color: '#4A7C59' },
  common: { label: 'Commun', color: '#8B8578' },
};

// Animal emojis
export const animalEmojis: Record<string, string> = {
  lion: '🦁',
  leopard: '🐆',
  cheetah: '🐆',
  elephant: '🐘',
  rhino: '🦏',
  giraffe: '🦒',
  zebra: '🦓',
  oryx: '🦌',
  buffalo: '🐃',
  hippo: '🦛',
  crocodile: '🐊',
  hyena: '🐕',
  eagle: '🦅',
};

// ============================================
// LOCATIONS V10 - IMAGES UNIQUES
// ============================================
export const locations: Location[] = [
  {
    id: 'sossusvlei',
    name: 'Sossusvlei',
    shortName: 'Sossusvlei',
    region: 'Désert du Namib',
    position: { x: 24, y: 52 },
    labelPosition: 'right',
    tooltipPosition: 'bottom',
    summary: "Les dunes les plus hautes du monde dans un océan de sable rouge.",
    description: "Sossusvlei est l'icône de la Namibie. Ses dunes de 300 mètres de haut, sculptées par le vent depuis des millions d'années, offrent un spectacle irréel au lever du soleil. Dead Vlei, avec ses arbres pétrifiés, semble appartenir à un autre monde.",
    quote: "Au cœur du plus vieux désert du monde, le temps s'est arrêté.",
    fauna: [animals.oryx, animals.eagle],
    safariType: 'Exploration des dunes',
    safariIcon: 'walking',
    bestPeriod: { start: 4, end: 10 },
    periodLabel: 'Avril à Octobre',
    accommodation: 'Lodges désertiques de luxe',
    accessLevel: 4,
    accessLabel: 'Facile',
    color: '#E07B54',
    highlights: [
      { icon: '🌄', text: 'Lever de soleil sur Dune 45' },
      { icon: '🌳', text: 'Dead Vlei et ses arbres millénaires' },
      { icon: '⭐', text: 'Ciel étoilé exceptionnel' },
    ],
    duration: '2-3 jours',
    bestTime: 'Lever du soleil (5h-7h)',
    budget: 3,
    distance: '380 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200',
      'https://images.unsplash.com/photo-1473246483394-82c775f1e73e?w=1200',
      'https://images.unsplash.com/photo-1503650537561-3c4e0f06c142?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600',
  },
  {
    id: 'fish-river',
    name: 'Fish River Canyon',
    shortName: 'Fish River',
    region: 'Extrême Sud',
    position: { x: 40, y: 68 },
    labelPosition: 'right',
    tooltipPosition: 'top',
    summary: "Le deuxième plus grand canyon du monde. Trek mythique de 5 jours.",
    description: "Fish River Canyon plonge à 550 mètres de profondeur sur 160 km. C'est le deuxième plus grand canyon au monde après le Grand Canyon. Le trek de 5 jours au fond du canyon est une expérience inoubliable.",
    quote: "160 kilomètres de solitude et de beauté brute.",
    fauna: [animals.oryx, animals.eagle],
    safariType: 'Randonnée et observation',
    safariIcon: 'walking',
    bestPeriod: { start: 5, end: 9 },
    periodLabel: 'Mai à Septembre',
    accommodation: 'Lodges panoramiques',
    accessLevel: 3,
    accessLabel: 'Modéré',
    color: '#A0522D',
    highlights: [
      { icon: '🥾', text: 'Trek de 5 jours mythique' },
      { icon: '👁️', text: 'Viewpoints spectaculaires' },
      { icon: '♨️', text: 'Sources chaudes d\'Ai-Ais' },
    ],
    duration: '1-5 jours',
    bestTime: 'Lever du soleil',
    budget: 2,
    distance: '530 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1600',
  },
  {
    id: 'skeleton',
    name: 'Skeleton Coast',
    shortName: 'Skeleton',
    region: 'Côte Atlantique',
    position: { x: 18, y: 24 },
    labelPosition: 'right',
    tooltipPosition: 'bottom',
    summary: "La côte des squelettes, où le désert rencontre l'océan dans un spectacle lugubre.",
    description: "Cette côte inhospitalière doit son nom aux nombreux naufrages et ossements de baleines qui la parsèment. Entre brouillard, colonies d'otaries et épaves rouillées, c'est un paysage d'une beauté spectrale unique au monde.",
    quote: "Là où le désert plonge dans l'Atlantique, la nature règne sans partage.",
    fauna: [animals.hyena, animals.oryx],
    safariType: 'Exploration côtière',
    safariIcon: 'jeep',
    bestPeriod: { start: 5, end: 10 },
    periodLabel: 'Mai à Octobre',
    accommodation: 'Camps fly-in exclusifs',
    accessLevel: 2,
    accessLabel: 'Difficile',
    color: '#5D8AA8',
    highlights: [
      { icon: '🚢', text: 'Épaves de navires échoués' },
      { icon: '🦭', text: 'Colonie d\'otaries de Cape Cross' },
      { icon: '🌫️', text: 'Brouillard mystique côtier' },
    ],
    duration: '2-3 jours',
    bestTime: 'Matin (moins de brouillard)',
    budget: 4,
    distance: '480 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200',
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1600',
  },
  {
    id: 'damaraland',
    name: 'Damaraland',
    shortName: 'Damaraland',
    region: 'Nord-Ouest',
    position: { x: 28, y: 34 },
    labelPosition: 'right',
    tooltipPosition: 'top',
    summary: "Un désert de roche rouge où éléphants et rhinocéros ont appris à survivre.",
    description: "Le Damaraland est une terre de contrastes absolus. Les éléphants du désert parcourent des lits de rivières asséchées, tandis que les rhinocéros noirs se fondent dans un paysage lunaire. Les gravures rupestres de Twyfelfontein témoignent de 6 000 ans de présence humaine.",
    quote: "Dans ce silence minéral, chaque rencontre animale devient un miracle.",
    fauna: [animals.elephant, animals.rhino, animals.oryx],
    safariType: 'Safari guidé, 4x4 indispensable',
    safariIcon: 'jeep',
    bestPeriod: { start: 6, end: 9 },
    periodLabel: 'Juin à Septembre',
    accommodation: 'Lodges de charme isolés',
    accessLevel: 3,
    accessLabel: 'Modéré',
    color: '#8B7355',
    highlights: [
      { icon: '🐘', text: 'Éléphants du désert' },
      { icon: '🪨', text: 'Gravures rupestres de Twyfelfontein' },
      { icon: '⛰️', text: 'Paysages lunaires' },
    ],
    duration: '2-3 jours',
    bestTime: 'Tôt le matin',
    budget: 3,
    distance: '300 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200',
      'https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600',
  },
  {
    id: 'etosha',
    name: "Parc National d'Etosha",
    shortName: 'Etosha',
    region: 'Nord de la Namibie',
    position: { x: 42, y: 18 },
    labelPosition: 'right',
    tooltipPosition: 'bottom',
    summary: "Le grand théâtre animalier de la Namibie autour d'un immense pan salin.",
    description: "Etosha est le joyau de la Namibie. Ce parc de 22 270 km² abrite l'un des plus grands salars d'Afrique. La saison sèche transforme ses points d'eau en scènes spectaculaires où lions, éléphants et rhinocéros noirs convergent.",
    quote: "Là où le sel blanc rencontre le ciel infini, la vie trouve son chemin.",
    fauna: [animals.lion, animals.elephant, animals.rhino, animals.giraffe, animals.zebra],
    safariType: 'Autotour et safaris guidés',
    safariIcon: 'jeep',
    bestPeriod: { start: 5, end: 10 },
    periodLabel: 'Mai à Octobre — Saison sèche',
    accommodation: 'Camps NWR et lodges privés',
    accessLevel: 5,
    accessLabel: 'Très accessible',
    color: '#B8602A',
    highlights: [
      { icon: '🌅', text: 'Points d\'eau au coucher du soleil' },
      { icon: '🦁', text: 'Observation des lions à Okaukuejo' },
      { icon: '🧂', text: 'Pan salin de 4 800 km²' },
    ],
    duration: '3-4 jours',
    bestTime: 'Lever et coucher du soleil',
    budget: 3,
    distance: '435 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1200',
      'https://images.unsplash.com/photo-1535338454528-1b5c5a17d35e?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600',
  },
  {
    id: 'waterberg',
    name: 'Waterberg',
    shortName: 'Waterberg',
    region: 'Centre-Nord',
    position: { x: 54, y: 28 },
    labelPosition: 'right',
    tooltipPosition: 'bottom',
    summary: "Un sanctuaire sur un plateau de grès rouge. Randonnées et espèces rares.",
    description: "Le plateau de Waterberg s'élève à 200 mètres au-dessus des plaines. Ce sanctuaire abrite des espèces rares comme le rhinocéros blanc et l'antilope rouanne. Les sentiers de randonnée offrent des vues spectaculaires.",
    quote: "Sur ce plateau rouge, la nature reprend ses droits.",
    fauna: [animals.rhino, animals.buffalo, animals.eagle],
    safariType: 'À pied et guidé',
    safariIcon: 'walking',
    bestPeriod: { start: 4, end: 10 },
    periodLabel: 'Avril à Octobre',
    accommodation: 'Lodges nature',
    accessLevel: 4,
    accessLabel: 'Facile',
    color: '#C75B39',
    highlights: [
      { icon: '🦏', text: 'Rhinocéros blancs protégés' },
      { icon: '🥾', text: 'Sentiers de randonnée' },
      { icon: '🌿', text: 'Végétation luxuriante' },
    ],
    duration: '1-2 jours',
    bestTime: 'Matin pour la randonnée',
    budget: 2,
    distance: '280 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=1200',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=1600',
  },
  {
    id: 'okonjima',
    name: 'Okonjima',
    shortName: 'Okonjima',
    region: 'Centre',
    position: { x: 50, y: 38 },
    labelPosition: 'right',
    tooltipPosition: 'bottom',
    summary: "Le sanctuaire AfriCat. Léopards et guépards dans un cadre intime.",
    description: "Okonjima abrite la fondation AfriCat, dédiée à la conservation des félins. C'est l'un des meilleurs endroits au monde pour observer léopards et guépards dans un environnement semi-sauvage.",
    quote: "Là où les félins retrouvent leur liberté.",
    fauna: [animals.leopard, animals.cheetah, animals.hyena],
    safariType: 'Safari guidé spécialisé',
    safariIcon: 'jeep',
    bestPeriod: { start: 1, end: 12 },
    periodLabel: 'Toute l\'année',
    accommodation: 'Lodges AfriCat',
    accessLevel: 5,
    accessLabel: 'Très accessible',
    color: '#C9956C',
    highlights: [
      { icon: '🐆', text: 'Pistage des léopards' },
      { icon: '🐆', text: 'Guépards en liberté' },
      { icon: '🏥', text: 'Centre de soins AfriCat' },
    ],
    duration: '2-3 jours',
    bestTime: 'Toute la journée',
    budget: 4,
    distance: '220 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1200',
      'https://images.unsplash.com/photo-1475224098637-8e6b4e4786cc?w=1200',
      'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1600',
  },
  {
    id: 'erindi',
    name: 'Erindi Private Reserve',
    shortName: 'Erindi',
    region: 'Centre',
    position: { x: 44, y: 44 },
    labelPosition: 'right',
    tooltipPosition: 'top',
    summary: "Réserve privée de 70 000 hectares. Big Five et luxe absolu.",
    description: "Erindi est l'une des plus grandes réserves privées d'Afrique. Ce sanctuaire de 70 000 hectares abrite les Big Five dans un cadre exclusif. Les safaris de nuit révèlent une faune exceptionnelle.",
    quote: "Le luxe au cœur de la savane africaine.",
    fauna: [animals.lion, animals.elephant, animals.rhino, animals.leopard, animals.buffalo],
    safariType: 'Safari privé tout inclus',
    safariIcon: 'jeep',
    bestPeriod: { start: 5, end: 11 },
    periodLabel: 'Mai à Novembre',
    accommodation: 'Lodges 5 étoiles',
    accessLevel: 5,
    accessLabel: 'Très accessible',
    color: '#4A7C59',
    highlights: [
      { icon: '🦁', text: 'Big Five garantis' },
      { icon: '🌙', text: 'Safaris de nuit' },
      { icon: '🍾', text: 'Expérience luxe' },
    ],
    duration: '2-3 jours',
    bestTime: 'Toute la journée',
    budget: 4,
    distance: '180 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200',
      'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=1200',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1600',
  },
  {
    id: 'bwabwata',
    name: 'Bwabwata',
    shortName: 'Bwabwata',
    region: 'Région du Zambèze',
    position: { x: 72, y: 14 },
    labelPosition: 'bottom',
    tooltipPosition: 'bottom',
    summary: "Où la route traverse le parc. Éléphants, buffles et vie locale cohabitent.",
    description: "Bwabwata est unique : des villages traditionnels existent au sein même du parc. Les safaris en bateau sur les rivières Kwando et Okavango révèlent une faune aquatique spectaculaire.",
    quote: "Ici, hommes et animaux ont appris à partager.",
    fauna: [animals.elephant, animals.buffalo, animals.hippo, animals.crocodile],
    safariType: 'Terrestre et fluvial',
    safariIcon: 'boat',
    bestPeriod: { start: 7, end: 10 },
    periodLabel: 'Juillet à Octobre',
    accommodation: 'Lodges nature, camps',
    accessLevel: 3,
    accessLabel: 'Modéré',
    color: '#228B22',
    highlights: [
      { icon: '🛶', text: 'Safari en bateau' },
      { icon: '🏘️', text: 'Villages traditionnels' },
      { icon: '🐃', text: 'Grands troupeaux de buffles' },
    ],
    duration: '2-3 jours',
    bestTime: 'Fin d\'après-midi sur l\'eau',
    budget: 2,
    distance: '1 100 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1600',
  },
  {
    id: 'zambezi',
    name: 'Région du Zambèze',
    shortName: 'Zambèze',
    region: 'Extrême Nord-Est',
    position: { x: 88, y: 12 },
    labelPosition: 'top',
    tooltipPosition: 'bottom',
    summary: "La Namibie aquatique. Croisières, hippopotames et oiseaux tropicaux.",
    description: "L'ancienne Bande de Caprivi est une Namibie verte, tropicale, entre quatre pays. Les safaris en bateau sur le Zambèze offrent des couchers de soleil légendaires et une avifaune exceptionnelle.",
    quote: "Quand le soleil plonge dans le fleuve, le temps s'arrête.",
    fauna: [animals.hippo, animals.elephant, animals.crocodile, animals.eagle],
    safariType: 'Bateau et 4x4',
    safariIcon: 'boat',
    bestPeriod: { start: 8, end: 10 },
    periodLabel: 'Août à Octobre',
    accommodation: 'Lodges fluviaux',
    accessLevel: 4,
    accessLabel: 'Facile',
    color: '#4682B4',
    highlights: [
      { icon: '🌅', text: 'Coucher de soleil sur le Zambèze' },
      { icon: '🦛', text: 'Hippopotames en grand nombre' },
      { icon: '🦅', text: '450+ espèces d\'oiseaux' },
    ],
    duration: '2-3 jours',
    bestTime: 'Croisière au coucher du soleil',
    budget: 3,
    distance: '1 200 km de Windhoek',
    images: [
      'https://images.unsplash.com/photo-1568659183784-9e6856056601?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
    ],
    heroImage: 'https://images.unsplash.com/photo-1568659183784-9e6856056601?w=1600',
  },
];

// ============================================
// MONTHS
// ============================================
export const months: Month[] = [
  { short: 'J', full: 'Janvier', index: 1 },
  { short: 'F', full: 'Février', index: 2 },
  { short: 'M', full: 'Mars', index: 3 },
  { short: 'A', full: 'Avril', index: 4 },
  { short: 'M', full: 'Mai', index: 5 },
  { short: 'J', full: 'Juin', index: 6 },
  { short: 'J', full: 'Juillet', index: 7 },
  { short: 'A', full: 'Août', index: 8 },
  { short: 'S', full: 'Septembre', index: 9 },
  { short: 'O', full: 'Octobre', index: 10 },
  { short: 'N', full: 'Novembre', index: 11 },
  { short: 'D', full: 'Décembre', index: 12 },
];

// ============================================
// FILTERS
// ============================================
export const filters: { fauna: Filter[]; access: Filter[] } = {
  fauna: [
    { id: 'all', label: 'Tous', icon: 'compass' },
    { id: 'felins', label: 'Félins', icon: 'lion', keywords: ['lion', 'leopard', 'cheetah'] },
    { id: 'elephants', label: 'Éléphants', icon: 'elephant', keywords: ['elephant'] },
    { id: 'aquatic', label: 'Aquatique', icon: 'hippo', keywords: ['hippo', 'crocodile'] },
  ],
  access: [
    { id: 'all', label: 'Tous niveaux' },
    { id: 'easy', label: 'Facile', min: 4 },
    { id: 'medium', label: 'Modéré', min: 3, max: 3 },
    { id: 'hard', label: 'Difficile', max: 2 },
  ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export const filterLocations = (activeFilter: string, accessFilter: string): Location[] => {
  return locations.filter((location) => {
    if (activeFilter !== 'all') {
      const filterConfig = filters.fauna.find((f) => f.id === activeFilter);
      if (filterConfig?.keywords) {
        const hasMatch = location.fauna.some((animal) => filterConfig.keywords!.includes(animal.id));
        if (!hasMatch) return false;
      }
    }
    if (accessFilter !== 'all') {
      const accessConfig = filters.access.find((f) => f.id === accessFilter);
      if (accessConfig) {
        if (accessConfig.min && location.accessLevel < accessConfig.min) return false;
        if (accessConfig.max && location.accessLevel > accessConfig.max) return false;
      }
    }
    return true;
  });
};

export const getLocationById = (id: string): Location | undefined => {
  return locations.find((l) => l.id === id);
};

export const getBudgetLabel = (budget: number): string => {
  return '€'.repeat(budget);
};
