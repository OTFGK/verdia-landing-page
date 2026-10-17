export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'mas-vendidos' | 'frutas' | 'verduras' | 'combos' | 'bowls' | 'hierbas';
  price: number;
  originalPrice?: number;
  unit: string;
  badge: string;
  badgeType: 'cosechado' | 'dulce' | 'huerto' | 'pesticidas' | 'maduracion' | 'listo' | 'oferta';
  origin: string;
  farm: string;
  farmer: string;
  harvestTime: string;
  image: string;
  inStock: boolean;
  calories?: string;
  nutritionTip?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  zone: string;
  comment: string;
  rating: number;
  timeDelivered: string;
  avatarBgColor?: string;
}

export interface Producer {
  id: string;
  name: string;
  farm: string;
  location: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  image: string;
  fairTradeBonus: string;
}

export interface Courier {
  id: string;
  name: string;
  number: number;
  vehicle: string;
  currentStreet: string;
  etaMinutes: number;
  batteryPercent: number;
  ordersOnBoard: number;
  coords: { x: number; y: number };
}
