// Base API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: Pagination;
}

// Pagination object from API
export interface Pagination {
  page: number;
  limit: number;
  total: string;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Yacht with broker wrapper as returned by API
export interface YachtWithBroker {
  yacht: Yacht;
  broker: Broker | null;
}

export interface Yacht {
  id: string;
  listingId: string;
  title: string;
  name: string;
  slug: string;
  draft: boolean;
  vesselId: string | null;
  dataType: 'sales' | 'charter';
  newListing: boolean;
  bestBuy: boolean;
  priceDrop: boolean;
  sold: boolean;
  isCentralAgency: boolean;
  auctionBanner: string | null;
  auctionDate: string | null;
  auctionLocation: string | null;
  biddingLink: string | null;
  showOnNewListings: boolean;
  showOnBestBuys: boolean;
  showOnPriceDrop: boolean;
  showOnAuctions: boolean;
  showOnSold: boolean;
  salesAnnouncementLink: string | null;
  images: string[];
  yearBuilt: string;
  yearRefit: string | null;
  lengthMeters: string;
  price: string | null;
  grossTonnage: number;
  builder: string;
  model: string | null;
  category: string | null;
  cabins: number | null;
  sleeps: number | null;
  mainImage: string;
  beam: string | null;
  draftLength: string | null;
  lying: string | null; // This is the location
  description: string | null;
  specifications: string;
  refitType: string | null;
  flag: string | null;
  vesselTop: string | null;
  decks: number | null;
  classification: string | null;
  exteriorDesigner: string | null;
  interiorDesigner: string | null;
  construction: string | null;
  crew: number | null;
  imoNumber: string | null;
  mmsiNumber: string | null;
  mci: string | null;
  ism: string | null;
  hullMaterial: string | null;
  hullNumber: string | null;
  hullDesigner: string | null;
  hullColour: string | null;
  hullConfiguration: string | null;
  hin: string | null;
  superstructureMaterial: string | null;
  deckMaterial: string | null;
  warranty: string | null;
  dateKeelLaid: string | null;
  cruiseSpeed: string | null;
  cruiseSpeedRange: string | null;
  maxSpeed: string | null;
  fuelCapacity: string | null;
  fuelConsumption: string | null;
  freshWaterCapacity: string | null;
  greyBlackWaterCapacity: string | null;
  lubeOil: string | null;
  dirtyLubeOil: string | null;
  wasteOil: string | null;
  mechanicalEquipment: Record<string, any>;
  navicomEquipment: Record<string, any>;
  entertainmentAvEquipment: string;
  galleyLaundryEquipment: string;
  safetySecurityEquipment: string;
  refitsAdditional: Record<string, any>;
  toysAndTender: Record<string, any>;
  accommodation: string;
  comments: string | null;
  weight: number;
  yachtType: string | null;
  refitYear: string | null;
  weeklyPrice: string | null;
  dailyLowRate: string | null;
  dailyHighRate: string | null;
  weeklyLowRate: string | null;
  weeklyHighRate: string | null;
  includeGst: boolean;
  hourlyPrice: string | null;
  hourlyGstAmount: string | null;
  currency: string;
  locations: string[];
  regions: string[];
  charterTypes: string[];
  amenitiesLabels: string | null;
  entertainmentLabels: string | null;
  weeklyCharterRates: any[];
  dailyCharterRates: any[];
  dayPricing: any[];
  termSpecifications: any[];
  termToysAndTender: any[];
  toys: string | null;
  menus: any[];
  maxPassengers: number | null;
  maxPassengersCruising: number | null;
  maxCrew: number | null;
  staticCapacity: number | null;
  isMember: boolean;
  cabinConfiguration: string | null;
  floatSpaceData: any | null;
  searchRanking: number;
  brokerId: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogKeywords: string | null;
  ogImage: string | null;
  ogImageWidth: number | null;
  ogImageHeight: number | null;
  createdAt: string;
  updatedAt: string;

  // Computed/derived fields for backward compatibility
  guests?: number;
  location?: string;
  lengthInMeters?: number;
  priceNumber?: number;
  cruisingSpeed?: number;
  maxSpeedNumber?: number;
  range?: number;
  rates?: {
    weekly?: number;
    daily?: number;
    season?: string;
  };
  amenities?: string[];
  availability?: {
    start: string;
    end: string;
  }[];
  
  // Add broker property
  broker?: Broker | null;
  
  // Add missing properties used in UI
  engines?: string;
  priceReduction?: number;
}

export interface Broker {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  company?: string;
  location?: string;
  languages?: string[];
  specialties?: string[];
  bio?: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: Category[];
}

export interface YachtStats {
  total: number;
  sales: number;
  charter: number;
  averagePrice: number;
  averageLength: number;
  popularBuilders: { builder: string; count: number; }[];
  popularLocations: { location: string; count: number; }[];
}

export interface YachtInquiry {
  yachtId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: 'viewing' | 'purchase' | 'charter' | 'information';
  message: string;
  timeframe?: string;
  preferredContact?: 'email' | 'phone';
}

export interface YachtSearchParams {
  search?: string;
  dataType?: 'sales' | 'charter';
  builder?: string;
  category?: string;
  yachtType?: string;
  currency?: string;
  minPrice?: number;
  maxPrice?: number;
  minLength?: number;
  maxLength?: number;
  minYear?: number;
  maxYear?: number;
  sold?: boolean;
  newListing?: boolean;
  bestBuy?: boolean;
  location?: string;
  brokerId?: string;
  sortBy?: 'price' | 'length' | 'year' | 'name' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FeaturedYachtsResponse {
  yachts: Yacht[];
}

export interface YachtsResponse {
  yachts: Yacht[];
  pagination: Pagination;
}

export interface BrokersResponse {
  brokers: Broker[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface SearchResponse {
  yachts: Yacht[];
  total: number;
  suggestions?: string[];
}
