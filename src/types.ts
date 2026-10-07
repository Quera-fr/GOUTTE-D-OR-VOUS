export type Language = 'fr' | 'en' | 'ar' | 'uk' | 'ps';

export type ActiveView =
  | 'hero'
  | 'home'
  | 'media'
  | 'agenda'
  | 'annuaire'
  | 'agir'
  | 'login'
  | 'myAccount'
  | 'admin'
  | 'createArticle';

export type UserRole = 'admin' | 'association' | 'user';
export type UserStatus = 'approved' | 'pending';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  associationId?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  authorName: string;
  content: string;
  date: string;
  status: 'approved' | 'pending';
}

export type ArticleCategory =
  | 'Tous'
  | 'Articles'
  | 'WebTV'
  | 'Web Radio'
  | 'Archives Goutte d\'Or'
  | 'Devenir bénévole';

export interface ArticleItem {
  id: string;
  type: 'Article' | 'Podcast' | 'Web TV';
  title: string;
  subtitle: string;
  author: string;
  durationOrReadTime: string;
  image: string;
  date: string;
  category: ArticleCategory | string;
  content: string;
  audioUrl?: string;
  videoUrl?: string;
  comments?: Comment[];
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
  associationId?: string;
  status?: 'approved' | 'pending';
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
  logo?: string;
  category: DirectoryCategory;
  categoryLabel: string;
  address: string;
  publicCible: string;
  horaires: string;
  phone: string;
  email: string;
  website?: string;
  thematique?: string;
  contact?: string;
  mapCoords: { x: number; y: number }; // percentage on stylized map
  lat?: number;
  lng?: number;
  histoire: string;
  activites: string;
  fonctionnement: string;
  contactsDetails: string;
  status?: 'approved' | 'pending';
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
  associationId?: string;
  status?: 'approved' | 'pending';
}

