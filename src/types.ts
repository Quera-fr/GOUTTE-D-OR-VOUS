export type Language = 'fr' | 'en' | 'ar' | 'uk' | 'ps';

export type ActiveView = 'hero' | 'home' | 'media' | 'agenda' | 'annuaire' | 'agir';

export interface ArticleItem {
  id: string;
  type: 'Article' | 'Podcast' | 'Web TV';
  title: string;
  subtitle: string;
  author: string;
  durationOrReadTime: string;
  image: string;
  date: string;
  category: string;
  content: string;
  audioUrl?: string;
  videoUrl?: string;
}

export interface AgendaEvent {
  id: string;
  day: string; // e.g. "06", "13", "14", "17", "18", "24", "30"
  month: 'Septembre' | 'Octobre' | 'Novembre' | 'Décembre';
  title: string;
  shortDesc: string;
  location: string;
  fullDesc: string;
  detailedLocations?: string;
  colorTheme: 'orange' | 'yellow' | 'coral' | 'mauve' | 'beige' | 'olive';
  position: 'top' | 'bottom';
  time?: string;
  organizer?: string;
  tag?: string;
}

export type DirectoryCategory =
  | 'all'
  | 'sante'
  | 'culture'
  | 'jeunesse'
  | 'education'
  | 'sport'
  | 'maison_assoc';

export interface DirectoryStructure {
  id: string;
  name: string;
  category: DirectoryCategory;
  categoryLabel: string;
  address: string;
  publicCible: string;
  horaires: string;
  phone: string;
  email: string;
  website?: string;
  mapCoords: { x: number; y: number }; // percentage on stylized map
  histoire: string;
  activites: string;
  fonctionnement: string;
  contactsDetails: string;
}

export type AgirFilter = 'benevolat' | 'emploi' | 'volontariat' | 'mecenat';

export interface AgirOpportunity {
  id: string;
  orgName: string;
  title: string;
  type: AgirFilter;
  typeLabel: string;
  buttonText: string;
  bgColor: 'red' | 'yellow' | 'terracotta';
  petalColor: string;
  image: string;
  duration: string;
  description: string;
  requirements: string[];
  contactEmail: string;
}
