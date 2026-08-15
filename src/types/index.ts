export type ServiceCategory =
  | 'Google Services'
  | 'Review Platforms'
  | 'Home & Local Services'
  | 'App & Digital Stores'
  | 'Travel & Hospitality'
  | 'Real Estate & Business'
  | 'Entertainment & Niche'
  | 'Reputation Management';

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceIndustry {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceDetailedFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface DocArticleSection {
  title?: string;
  level?: 'h2' | 'h3';
  paragraphs: string[];
  bullets?: string[];
}

export interface DocServiceData {
  slug: string;
  heroTitle: string;
  heroDescription: string;
  sections: DocArticleSection[];
  faqs: { question: string; answer: string }[];
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  aliases?: string[];
  category: ServiceCategory;
  description: string;
  longDescription?: string;
  price: number | null; // null represents "Contact Us for Pricing"
  currency: string;
  minimumQuantity: number;
  featured?: boolean;
  active: boolean;
  platform: string;
  icon: string;
  features: string[];
  packages?: ServicePackage[];
  faqs?: ServiceFAQ[];
  
  // Extended Landing Page Fields
  heroTitle?: string;
  heroDescription?: string;
  about?: string;
  benefits?: ServiceBenefit[];
  included?: string[];
  howItWorks?: ServiceStep[];
  industries?: ServiceIndustry[];
  detailedFeatures?: ServiceDetailedFeature[];
  requirements?: string[];
  expectations?: string[];
  relatedServices?: string[]; // Slugs or IDs of related services
  seo?: ServiceSEO;
  docData?: DocServiceData;
}

export interface CryptoMethod {
  id: string;
  symbol: string;
  name: string;
  network: string;
  networkDescription: string;
  address: string;
  enabled: boolean;
  color: string;
}

export type OrderStatus =
  | 'Pending Payment'
  | 'Payment Submitted'
  | 'Payment Verification'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Completed'
  | 'Cancelled'
  | 'Refund Requested'
  | 'Refunded';

export interface PaymentRecord {
  id: string;
  orderNumber: string;
  cryptoSymbol: string;
  cryptoName: string;
  network: string;
  walletAddress: string;
  amountUsd: number;
  transactionHash: string;
  status: 'Pending Verification' | 'Confirmed' | 'Failed';
  submittedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  businessName: string;
  businessWebsite?: string;
  platformUrl: string;
  serviceId: string;
  serviceName: string;
  packageName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  specialInstructions?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  payment?: PaymentRecord;
}

export interface ContactSubmission {
  name: string;
  email: string;
  orderNumber?: string;
  message: string;
}
