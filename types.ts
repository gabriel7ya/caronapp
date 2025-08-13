export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export interface Trip {
  id: string;
  origin: Location;
  destination: Location;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  price: number; // 0 for free
  seats: number;
  driver: User;
}

export interface SearchCriteria {
  origin: Location | null;
  destination: Location | null;
  date: string;
}
