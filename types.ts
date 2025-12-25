
export type Language = 'es' | 'en' | 'it' | 'fr' | 'de';

export interface NavItem {
  id: string;
  label: Record<Language, string>;
  path: string;
}

export interface Service {
  icon: string;
  title: Record<Language, string>;
  items: Record<Language, string[]>;
}

export interface Experience {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  description: Record<Language, string>;
  rating: number;
  image: string;
  priceLevel?: string;
  distance: Record<Language, string>;
  tag?: Record<Language, string>;
}

export interface HouseRule {
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
}
