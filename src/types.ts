export interface Translation {
  navProducts: string;
  navAbout: string;
  navSustainability: string;
  navJournal: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreMore: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutBadge: string;
  productsTitle: string;
  productsSubtitle: string;
  customizerTitle: string;
  customizerSubtitle: string;
  customizerChooseMaterial: string;
  customizerChooseLayout: string;
  customizerLayoutAcoustic: string;
  customizerLayoutOffice: string;
  customizerLayoutLounge: string;
  customizerWoodWarm: string;
  customizerWoodDark: string;
  customizerWoodNatural: string;
  customizerReset: string;
  galleryTitle: string;
  gallerySubtitle: string;
  journalTitle: string;
  journalSubtitle: string;
  journalReadMore: string;
  footerSubscribe: string;
  footerPlaceholder: string;
  footerButton: string;
  footerCopy: string;
  acousticCalmOn: string;
  acousticCalmOff: string;
  simulatedReverberation: string;
  acousticCalmDesc: string;
}

export type Language = 'EN' | 'IT';

export interface FloatingCardData {
  id: number;
  image: string;
  title: string;
  category: string;
  top: string;
  left: string;
  scale: number;
  rotate: number;
  speedX: number;
  speedY: number;
  zIndex: number;
}

export interface ProductData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  specs: { [key: string]: string };
}

export interface JournalItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
}
