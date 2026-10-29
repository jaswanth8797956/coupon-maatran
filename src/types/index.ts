export type CouponType = 'E-Voucher' | 'Coupon Code' | 'Discount' | 'Gift Card';
export type ExchangeType = 'Cash' | 'Free' | 'Exchange' | 'Any';
export type Category = 
  | 'Food & Dining' 
  | 'Entertainment' 
  | 'Shopping & Retail' 
  | 'Travel & Rides' 
  | 'Electronics' 
  | 'Health & Wellness' 
  | 'Subscriptions';

export interface Coupon {
  _id: string;
  title: string;
  description: string;
  category: Category;
  couponType: CouponType;
  exchangeType: ExchangeType;
  couponPrice: number; // Face value worth
  exchangePrice: number; // Requested price in cash (0 if Free)
  currency: string; // e.g. "INR", "USD", "EUR"
  negotiable: boolean;
  quantity: number;
  validityStart: string; // ISO date
  validityEnd: string; // ISO date
  ownerID: string;
  ownerName: string;
  ownerTrustScore: number; // e.g. 4.9
  ownerTotalSwaps: number;
  ownerCampusLocation: string; // e.g. "Building 4, 3rd Floor"
  sourceProductID?: string; // Product / store link
  exchangeInfo?: string; // What the seller wants to swap for
  couponCodeSecret?: string; // Masked until swap accepted
  status: 'active' | 'in_negotiation' | 'swapped' | 'expired';
  createdAt: string;
}

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  emailID: string;
  campusLocation: string;
  trustScore: number;
  ratingsCount: number;
  badges: string[];
  activeListingsCount: number;
  successfulSwapsCount: number;
}

export interface SubFilter {
  id: string;
  filterName: string;
  propertyInCouponModel: 'category' | 'couponType' | 'exchangeType';
  description: string;
  iconName?: string;
}

export interface ExchangeOffer {
  id: string;
  couponId: string;
  couponTitle: string;
  offeredByUsername: string;
  offeredByName: string;
  targetOwnerUsername: string;
  offerType: 'Cash' | 'Swap' | 'Free Request';
  cashAmount?: number;
  offeredSwapDescription?: string;
  message: string;
  preferredMeetingSpot: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

