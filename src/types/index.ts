export type UserRole = 'customer' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  avatarUrl?: string;
  address?: Address;
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  size?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQty: number;
  imageUrl: string;
  galleryImages: string[];
  variants: ProductVariant[];
  ingredients?: string[];
  benefits?: string[];
  certifications?: string[];
  isFeatured?: boolean;
  netWeight?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount?: number;
  minOrderValue: number;
  description: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  variantName?: string;
  price: number;
  quantity: number;
  subtotal: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: PaymentStatus;
  paymentId?: string;
  razorpayOrderId?: string;
  orderStatus: OrderStatus;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
}

export type CowBreed = 'Gir' | 'Sahiwal' | 'Tharparkar' | 'Kankrej' | 'Red Sindhi' | 'Rathi';
export type CowCategory = 'resident' | 'elder' | 'calf' | 'rescued' | 'mother';
export type CowHealthStatus = 'healthy' | 'elder_care' | 'special_diet' | 'under_vet_observation';

export interface CowUpdate {
  id: string;
  cowId: string;
  date: string;
  title: string;
  summary: string;
  vetNotes?: string;
  imageUrl?: string;
}

export interface Cow {
  id: string;
  tagNumber: string;
  name: string;
  breed: CowBreed;
  gender: 'female' | 'male';
  ageYears: number;
  birthYear: number;
  category: CowCategory;
  temperament: string;
  favoriteFood: string;
  story: string;
  healthStatus: CowHealthStatus;
  imageUrl: string;
  galleryImages: string[];
  isAvailableForOwnership: boolean;
  isElderCareProgram: boolean;
  monthlyCareCost: number;
  currentSponsorId?: string;
  currentSponsorName?: string;
  updates: CowUpdate[];
}

export interface CowCarePlan {
  id: string;
  title: string;
  type: 'elder_care' | 'family_ownership' | 'daily_fodder';
  monthlyFee: number;
  quarterlyFee?: number;
  annualFee: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface CowOwnershipRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  cowId: string;
  cowName: string;
  cowTag: string;
  planId: string;
  planTitle: string;
  planType: 'ownership' | 'elder_care';
  monthlyAmount: number;
  billingCycle: 'monthly' | 'annual';
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  nextRenewalDate: string;
  certificateNumber: string;
  monthlyGheeAllotmentKg: number;
  allowedVisitsPerYear: number;
  visitsUsed: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: 'silver' | 'gold' | 'patron';
  annualFee: number;
  monthlyFee?: number;
  tagline: string;
  description?: string;
  benefits: string[];
  gheeQuotaKg?: number;
  freeVisitsCount?: number;
  productDiscountPercent?: number;
  gheePerMonthKg?: number;
  freeVisitsPerYear?: number;
  discountPercentage?: number;
  isPopular?: boolean;
  isRecommended?: boolean;
}

export interface UserMembership {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  annualFee: number;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired';
  gheeQuotaUsedKg: number;
  gheeQuotaTotalKg: number;
  freeVisitsRemaining: number;
  totalVisitsAllowed: number;
  memberIdCard: string;
}

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  durationHours: number;
  pricePerAdult: number;
  pricePerChild: number;
  minGuests: number;
  maxGuests: number;
  description: string;
  itinerary: { time: string; activity: string }[];
  inclusions: string[];
  timing: string;
  imageUrl: string;
  availableDays: string[];
}

export interface TourSlot {
  id: string;
  packageId: string;
  date: string;
  timeSlot: string;
  capacity: number;
  bookedSeats: number;
}

export interface TourBooking {
  id: string;
  bookingRef: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  packageId: string;
  packageTitle: string;
  bookingDate: string;
  timeSlot: string;
  adultsCount: number;
  childrenCount: number;
  totalGuests: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  bookingStatus: 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'cow_care' | 'products' | 'visits' | 'memberships';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  city: string;
  quote: string;
  rating: number;
  date: string;
  avatarUrl?: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  templateType: 'order_confirmed' | 'payment_success' | 'booking_confirmed' | 'care_plan_started' | 'membership_welcome';
  sentAt: string;
  status: 'delivered' | 'queued';
  contentPreview: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
}

export interface SiteSettings {
  sanctuaryName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  visitingHours: string;
  announcementBanner: string;
  isAnnouncementActive: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  razorpayKeyId: string;
  upiId: string;
}
