import { Service, ServiceCategory } from '../types';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Google Services',
  'Review Platforms',
  'Home & Local Services',
  'App & Digital Stores',
  'Travel & Hospitality',
  'Real Estate & Business',
  'Entertainment & Niche',
  'Reputation Management',
];

export const SERVICES: Service[] = [
  // 1. Buy Google Reviews
  {
    id: 'buy-google-reviews',
    name: 'Buy Google Reviews',
    slug: 'buy-google-reviews',
    category: 'Google Services',
    description: 'High-quality 5-star Google Business profile reviews with flexible warranty plans.',
    longDescription: 'Boost your local search visibility, build immediate customer trust, and outperform competitors on Google Maps with genuine, non-drop 5-star Google Reviews. Choose from 7, 15, or 30 days warranty coverage with one-time free replacement if drops occur during warranty.',
    price: 7,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Google Business Profile',
    icon: 'google',
    features: [
      'Authentic Geo-Targeted Profiles',
      'Sticky & Permanent Delivery Strategy',
      'Drip-Feed Natural Speed',
      '7, 15 & 30 Days Replacement Warranty',
      'One-Time Free Replacement Policy',
      '24/7 Dedicated Support'
    ],
    packages: [
      {
        id: 'google-7-day',
        name: '7 Days Warranty Plan',
        price: 7,
        description: 'Basic protection plan with 7-day warranty replacement.',
        features: ['$7 / Review', '7 Days Replacement Warranty', '100% Sticky Accounts', 'Natural Drip Feed']
      },
      {
        id: 'google-15-day',
        name: '15 Days Warranty Plan',
        price: 10,
        description: 'Popular choice for medium term warranty protection.',
        features: ['$10 / Review', '15 Days Replacement Warranty', 'Active Local Profiles', 'Priority Queue']
      },
      {
        id: 'google-30-day',
        name: '30 Days Warranty Plan',
        price: 15,
        description: 'Maximum security plan with full 30 days warranty replacement.',
        features: ['$15 / Review', '30 Days Extended Warranty', 'High-Authority Profiles', 'VIP Priority Support']
      }
    ],
    faqs: [
      {
        question: 'What is the warranty and replacement policy for Google Reviews?',
        answer: 'We offer 7-day ($7/rev), 15-day ($10/rev), and 30-day ($30/rev) replacement warranties. If any review drops during your selected warranty period, we will replace it once, subject to our standard one-time replacement policy.'
      },
      {
        question: 'How fast are Google Reviews delivered?',
        answer: 'To ensure maximum retention and natural profile growth, reviews are delivered at a safe drip-feed rate of 1-3 reviews per day depending on your account volume.'
      }
    ]
  },

  // 2. Buy Google Local Guide Reviews
  {
    id: 'buy-google-local-guide-reviews',
    name: 'Buy Google Local Guide Reviews',
    slug: 'buy-google-local-guide-reviews',
    category: 'Google Services',
    description: 'High-authority reviews from Level 4+ Google Local Guides for maximum trust.',
    longDescription: 'Google Local Guide profiles carry elevated algorithmic weight on Google Maps and search results. Get top-tier reviews from aged, active Google Local Guides to dominate local search rankings.',
    price: 20,
    currency: 'USD',
    minimumQuantity: 3,
    featured: true,
    active: true,
    platform: 'Google Local Guides',
    icon: 'google-guide',
    features: [
      'Level 4 to Level 8 Local Guides',
      'Highest Algorithmic Trust Signal',
      'Custom Text & Photo Support',
      'Non-Drop High-Authority Accounts',
      '24/7 Support & Fast Start'
    ]
  },

  // 3. Buy Trustpilot Reviews
  {
    id: 'buy-trustpilot-reviews',
    name: 'Buy Trustpilot Reviews',
    slug: 'buy-trustpilot-reviews',
    category: 'Review Platforms',
    description: 'Enhance your Trustpilot score with genuine, high-rating business feedback.',
    longDescription: 'Establish global credibility on Trustpilot. Boost your TrustScore and convert hesitant web visitors into buyers with authentic, high-retention 5-star Trustpilot reviews.',
    price: 10,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Trustpilot',
    icon: 'trustpilot',
    features: [
      'Global Geo-Targeting Available',
      'Drip-Fed Natural Publishing',
      'Non-Drop Guarantee',
      'Custom Review Content Allowed',
      '24/7 Support'
    ]
  },

  // 4. Buy Google GPS Reviews
  {
    id: 'buy-google-gps-reviews',
    name: 'Buy Google GPS Reviews',
    slug: 'buy-google-gps-reviews',
    category: 'Google Services',
    description: 'Location-verified GPS check-in Google Reviews for hyper-local credibility.',
    longDescription: 'Google GPS reviews come from accounts with physical location history match, passing strict geo-fencing filters to guarantee non-drop longevity on Google Maps.',
    price: 25,
    currency: 'USD',
    minimumQuantity: 3,
    featured: true,
    active: true,
    platform: 'Google Maps GPS',
    icon: 'google-gps',
    features: [
      'Physical GPS Location Match',
      'Bypasses Geo-Spam Filters',
      'Ultra High Retention Rate',
      'Geo-Targeted to Your City',
      'Full Money Back Guarantee'
    ]
  },

  // 5. Buy Glassdoor Reviews
  {
    id: 'buy-glassdoor-reviews',
    name: 'Buy Glassdoor Reviews',
    slug: 'buy-glassdoor-reviews',
    category: 'Real Estate & Business',
    description: 'Positive employee rating reviews on Glassdoor to attract top company talent.',
    longDescription: 'Improve your employer brand score on Glassdoor. Attract top-tier job candidates, boost company morale, and showcase a thriving workplace culture.',
    price: 20,
    currency: 'USD',
    minimumQuantity: 3,
    featured: true,
    active: true,
    platform: 'Glassdoor',
    icon: 'glassdoor',
    features: [
      'Authentic Job Title Profiles',
      'Pros & Cons Detailed Text',
      'Verified Employee Status',
      'Safe Gradual Delivery',
      '24/7 Support'
    ]
  },

  // 6. Buy Facebook Reviews
  {
    id: 'buy-facebook-reviews',
    name: 'Buy Facebook Reviews',
    slug: 'buy-facebook-reviews',
    category: 'Review Platforms',
    description: '5-star Facebook recommendations and positive page feedback.',
    longDescription: 'Increase your Facebook Business page recommendations score. Build social proof where millions of potential customers browse daily.',
    price: 5,
    currency: 'USD',
    minimumQuantity: 10,
    featured: true,
    active: true,
    platform: 'Facebook',
    icon: 'facebook',
    features: [
      'Real Active Facebook Profiles',
      'Positive Page Recommendations',
      'Custom Comments & Feedback',
      'Fast Start & Drip Feed',
      '24/7 Support'
    ]
  },

  // 7. Buy Zillow Reviews
  {
    id: 'buy-zillow-reviews',
    name: 'Buy Zillow Reviews',
    slug: 'buy-zillow-reviews',
    category: 'Real Estate & Business',
    description: 'Top-tier real estate agent reviews on Zillow for Premier Agent growth.',
    longDescription: 'Stand out in local property searches with positive client testimonials on Zillow. Perfect for realtors, mortgage brokers, and property managers.',
    price: 15,
    currency: 'USD',
    minimumQuantity: 3,
    featured: true,
    active: true,
    platform: 'Zillow',
    icon: 'zillow',
    features: [
      'Real Estate Client Profiles',
      'Local Geo-Location Matching',
      'Detailed Home Buyer/Seller Testimonials',
      '100% Non-Drop Quality',
      '24/7 Support'
    ]
  },

  // 8. Buy Thumbtack Reviews
  {
    id: 'buy-thumbtack-reviews',
    name: 'Buy Thumbtack Reviews',
    slug: 'buy-thumbtack-reviews',
    category: 'Home & Local Services',
    description: '5-star contractor and local pro reviews on Thumbtack.',
    longDescription: 'Win more client hires and quotes on Thumbtack by building a glowing 5-star reputation profile for your service business.',
    price: 15,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Thumbtack',
    icon: 'thumbtack',
    features: [
      'Verified Hire Profiles',
      'Custom Service Testimonials',
      'Higher Quote Conversion Rates',
      'Safe Drip Speed',
      '24/7 Support'
    ]
  },

  // 9. Buy Google LSA Reviews
  {
    id: 'buy-google-lsa-reviews',
    name: 'Buy Google LSA Reviews',
    slug: 'buy-google-lsa-reviews',
    category: 'Google Services',
    description: 'Google Local Services Ads (Google Guaranteed) verified reviews.',
    longDescription: 'Lower your Cost Per Lead on Google Guaranteed / LSA ads. Highly rated LSA profiles receive top ad spot placements and higher lead conversions.',
    price: 20,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Google LSA',
    icon: 'google-lsa',
    features: [
      'Google Guaranteed Compatible',
      'Boosts LSA Ad Rank Position',
      'Reduces Cost Per Lead',
      'Non-Drop Verified Accounts',
      '24/7 Support'
    ]
  },

  // 10. Buy Trustpilot Verified Reviews
  {
    id: 'buy-trustpilot-verified-reviews',
    name: 'Buy Trustpilot Verified Reviews',
    slug: 'buy-trustpilot-verified-reviews',
    category: 'Review Platforms',
    description: '100% Verified Order green-badge Trustpilot reviews for maximum authority.',
    longDescription: 'Verified Trustpilot reviews carry the green "Verified" badge, boosting customer trust by showing authentic purchase proof.',
    price: 12,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Trustpilot',
    icon: 'trustpilot-verified',
    features: [
      'Green Verified Purchase Badge',
      'Unique Order ID Invitations',
      'Highest Retention Guarantee',
      'Custom Written Feedback',
      '24/7 Support'
    ]
  },

  // 11. Buy Houzz Reviews
  {
    id: 'buy-houzz-reviews',
    name: 'Buy Houzz Reviews',
    slug: 'buy-houzz-reviews',
    category: 'Home & Local Services',
    description: 'Home improvement & architectural design reviews on Houzz.',
    longDescription: 'Attract premium home remodeling and interior design clients with high-rating Houzz reviews and contractor badges.',
    price: 15,
    currency: 'USD',
    minimumQuantity: 3,
    featured: true,
    active: true,
    platform: 'Houzz',
    icon: 'houzz',
    features: [
      'Interior Design & Contractor Focus',
      'High-Income Client Reach',
      'Custom Project Feedback',
      'Non-Drop Quality',
      '24/7 Support'
    ]
  },

  // 12. Buy BBB Reviews
  {
    id: 'buy-bbb-reviews',
    name: 'Buy BBB Reviews',
    slug: 'buy-bbb-reviews',
    category: 'Real Estate & Business',
    description: 'Better Business Bureau positive customer review ratings.',
    longDescription: 'Establish corporate trust and protect your business rating on BBB (Better Business Bureau) with glowing customer feedback.',
    price: 12,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Better Business Bureau',
    icon: 'bbb',
    features: [
      'BBB Accredited Compatible',
      'High Corporate Credibility',
      'Positive Resolution Signals',
      'Non-Drop Verified Profiles',
      '24/7 Support'
    ]
  },

  // 13. Buy Google Playstore Reviews
  {
    id: 'buy-google-playstore-reviews',
    name: 'Buy Google Playstore Reviews',
    slug: 'buy-google-playstore-reviews',
    category: 'App & Digital Stores',
    description: 'Android app 5-star ratings and keyword-targeted review feedback.',
    longDescription: 'Boost your Android app search rankings, increase install conversions, and improve star ratings on the Google Play Store.',
    price: 12,
    currency: 'USD',
    minimumQuantity: 10,
    featured: true,
    active: true,
    platform: 'Google Play Store',
    icon: 'playstore',
    features: [
      'Real Android Device Installs',
      'Keyword Targeted Review Copy',
      'High Retention Installs & Stars',
      'Safe Drip Velocity',
      '24/7 Support'
    ]
  },

  // 14. Buy HomeAdvisor Reviews
  {
    id: 'buy-homeadvisor-reviews',
    name: 'Buy HomeAdvisor Reviews',
    slug: 'buy-homeadvisor-reviews',
    category: 'Home & Local Services',
    description: 'Verified contractor reviews on HomeAdvisor / Angi network.',
    longDescription: 'Dominate local home repair and trade services by building a 5-star review record on HomeAdvisor.',
    price: 12,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'HomeAdvisor',
    icon: 'homeadvisor',
    features: [
      'Homeowner Account Profiles',
      'Trade & Repair Categories',
      'Angi Network Synergies',
      'Non-Drop Guarantee',
      '24/7 Support'
    ]
  },

  // 15. Buy Booking Reviews
  {
    id: 'buy-booking-reviews',
    name: 'Buy Booking Reviews',
    slug: 'buy-booking-reviews',
    category: 'Travel & Hospitality',
    description: 'High guest review scores on Booking.com for hotels and rentals.',
    longDescription: 'Increase booking conversion rates and ranking position for your hotel, resort, or vacation rental on Booking.com.',
    price: 25,
    currency: 'USD',
    minimumQuantity: 3,
    featured: true,
    active: true,
    platform: 'Booking.com',
    icon: 'booking',
    features: [
      'Verified Stay Guest Accounts',
      'High Overall Cleanliness & Staff Scores',
      'Multiple Languages Available',
      'Non-Drop Quality',
      '24/7 Support'
    ]
  },

  // 16. Buy Website Product Reviews
  {
    id: 'buy-website-product-reviews',
    name: 'Buy Website Product Reviews',
    slug: 'buy-website-product-reviews',
    category: 'App & Digital Stores',
    description: 'Custom e-commerce product reviews for Shopify, WooCommerce, and custom stores.',
    longDescription: 'Boost e-commerce store conversion rates with realistic, detailed customer product reviews and photos on your website.',
    price: 5,
    currency: 'USD',
    minimumQuantity: 10,
    featured: true,
    active: true,
    platform: 'E-Commerce Websites',
    icon: 'product',
    features: [
      'Compatible with Shopify, Woo, Judge.me, Loox',
      'Custom Buyer Names & Feedback',
      'Increases Add-To-Cart Rates',
      'Photo Review Support',
      '24/7 Support'
    ]
  },

  // 17. Buy HomeStar Reviews
  {
    id: 'buy-homestar-reviews',
    name: 'Buy HomeStar Reviews',
    slug: 'buy-homestar-reviews',
    category: 'Home & Local Services',
    description: 'Canadian contractor & home service reviews on HomeStars.',
    longDescription: 'Build trust with Canadian homeowners on HomeStars with high-rating contractor feedback and Star Score improvements.',
    price: 15,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'HomeStars',
    icon: 'homestar',
    features: [
      'Canadian Local Geo Profiles',
      'Home Renovation Feedback',
      'Star Score Optimization',
      'Non-Drop Quality',
      '24/7 Support'
    ]
  },

  // 18. Buy Chrome Extension Reviews
  {
    id: 'buy-chrome-extension-reviews',
    name: 'Buy Chrome Extension Reviews',
    slug: 'buy-chrome-extension-reviews',
    category: 'App & Digital Stores',
    description: '5-star Chrome Web Store extension ratings and user reviews.',
    longDescription: 'Rank higher in Chrome Web Store search results and increase extension install rates with authentic 5-star user ratings.',
    price: 12,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Chrome Web Store',
    icon: 'chrome',
    features: [
      'Active Google Account Profiles',
      'Keyword Focused User Feedback',
      'Higher Extension Installs',
      'Safe Drip Publishing',
      '24/7 Support'
    ]
  },

  // 19. Buy WeddingWire Reviews
  {
    id: 'buy-weddingwire-reviews',
    name: 'Buy WeddingWire Reviews',
    slug: 'buy-weddingwire-reviews',
    category: 'Entertainment & Niche',
    description: 'Wedding vendor & venue reviews on WeddingWire.',
    longDescription: 'Attract newly engaged couples and book more weddings with 5-star vendor reviews on WeddingWire.',
    price: 12,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'WeddingWire',
    icon: 'weddingwire',
    features: [
      'Bride & Groom Real Profiles',
      'Venue, Photographer, DJ Support',
      'Couples Choice Award Signal',
      'Non-Drop Guarantee',
      '24/7 Support'
    ]
  },

  // 20. Buy Reviews.io Reviews
  {
    id: 'buy-reviews-io-reviews',
    name: 'Buy Reviews.Io Reviews',
    slug: 'buy-reviews-io-reviews',
    category: 'Review Platforms',
    description: 'Authentic 5-star business reviews on Reviews.io platform.',
    longDescription: 'Improve your Google Seller Ratings and display high trust badges across your site with Reviews.io feedback.',
    price: 10,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'Reviews.io',
    icon: 'reviews-io',
    features: [
      'Google Seller Ratings Synergy',
      'Custom Buyer Testimonials',
      'High Retention Profiles',
      'Safe Gradual Delivery',
      '24/7 Support'
    ]
  },

  // 21. Buy Hotels Reviews
  {
    id: 'buy-hotels-reviews',
    name: 'Buy Hotels Reviews',
    slug: 'buy-hotels-reviews',
    category: 'Travel & Hospitality',
    description: 'Hotels.com guest reviews and property rating score boosts.',
    longDescription: 'Drive more room bookings and increase nightly rates on Hotels.com with top guest review scores.',
    price: 25,
    currency: 'USD',
    minimumQuantity: 3,
    featured: true,
    active: true,
    platform: 'Hotels.com',
    icon: 'hotels',
    features: [
      'Verified Traveler Profiles',
      'High Guest Satisfaction Marks',
      'Increases Search Visibility',
      'Non-Drop Quality',
      '24/7 Support'
    ]
  },

  // 22. Buy QuickBooks Reviews
  {
    id: 'buy-quickbooks-reviews',
    name: 'Buy QuickBooks Reviews',
    slug: 'buy-quickbooks-reviews',
    category: 'Real Estate & Business',
    description: 'ProAdvisor and QuickBooks app store reviews for accountants and apps.',
    longDescription: 'Gain client trust as a QuickBooks ProAdvisor or app developer with verified 5-star accounting reviews.',
    price: 12,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'QuickBooks / Intuit',
    icon: 'quickbooks',
    features: [
      'Intuit / ProAdvisor Compatible',
      'Accounting & App Market Feedback',
      'High Business Authority',
      'Safe Drip Delivery',
      '24/7 Support'
    ]
  },

  // 23. Buy Yelp Reviews
  {
    id: 'buy-yelp-reviews',
    name: 'Buy Yelp Reviews',
    slug: 'buy-yelp-reviews',
    category: 'Review Platforms',
    description: 'High-retention Yelp reviews engineered to pass Yelp automated filters.',
    longDescription: 'Dominate local searches on Yelp. Delivered from aged, active local accounts designed specifically to bypass Yelp strict recommendation software.',
    price: 75,
    currency: 'USD',
    minimumQuantity: 2,
    featured: true,
    active: true,
    platform: 'Yelp',
    icon: 'yelp',
    features: [
      'Aged Active Local Yelp Accounts',
      'Engineered to Pass Yelp Filter',
      'High Friend & Review Count Profiles',
      'Custom Written Detailed Content',
      '100% Replacement Guarantee'
    ]
  },

  // 24. Buy Elite Yelp Reviews
  {
    id: 'buy-elite-yelp-reviews',
    name: 'Buy Elite Yelp Reviews',
    slug: 'buy-elite-yelp-reviews',
    category: 'Review Platforms',
    description: 'Premium reviews from official Yelp Elite Squad badge members.',
    longDescription: 'Yelp Elite Squad members carry supreme algorithmic weight. Reviews from Elite members almost never get filtered and boost local prestige exponentially.',
    price: 275,
    currency: 'USD',
    minimumQuantity: 1,
    featured: true,
    active: true,
    platform: 'Yelp Elite Squad',
    icon: 'yelp-elite',
    features: [
      'Official Yelp Elite Badge Accounts',
      'Unshakeable Filter Resistance',
      'Maximum Brand Reputation Boost',
      'VIP Dedicated Account Manager',
      '100% Replacement Warranty'
    ]
  },

  // 25. Buy IMDb Reviews
  {
    id: 'buy-imdb-reviews',
    name: 'Buy IMDb Reviews',
    slug: 'buy-imdb-reviews',
    category: 'Entertainment & Niche',
    description: 'Movie, series, and short film ratings and reviews on IMDb.',
    longDescription: 'Increase your film or series IMDb user rating and user reviews to attract distributors, streaming deals, and viewers.',
    price: 7,
    currency: 'USD',
    minimumQuantity: 10,
    featured: true,
    active: true,
    platform: 'IMDb',
    icon: 'imdb',
    features: [
      'Verified User Profiles',
      '10/10 Rating Star Votes',
      'Custom Spoiler-Free Written Reviews',
      'Fast Safe Delivery',
      '24/7 Support'
    ]
  },

  // 26. Buy RealEstateAgents Reviews
  {
    id: 'buy-realestateagents-reviews',
    name: 'Buy RealEstateAgents Reviews',
    slug: 'buy-realestateagents-reviews',
    category: 'Real Estate & Business',
    description: 'Realtor profile reviews on RealEstateAgents.com.',
    longDescription: 'Win more home seller listings and buyer leads by showcasing a proven track record on RealEstateAgents.com.',
    price: 15,
    currency: 'USD',
    minimumQuantity: 5,
    featured: true,
    active: true,
    platform: 'RealEstateAgents.com',
    icon: 'realestateagents',
    features: [
      'Real Estate Client Profiles',
      'Transaction & Closing Testimonials',
      'High Listing Lead Conversion',
      'Non-Drop Quality',
      '24/7 Support'
    ]
  },

  // 27. Google Negative Reviews Removal Services
  {
    id: 'google-negative-reviews-removal-services',
    name: 'Google Negative Reviews Removal Services',
    slug: 'google-negative-reviews-removal-services',
    category: 'Reputation Management',
    description: 'Permanently remove damaging, fake, or policy-violating Google reviews.',
    longDescription: 'Protect your business rating by legally and algorithmically removing bad, fake, or competitor-posted negative Google reviews. Pay only for successful removal, covering reviews 1-2 months old or 3+ months old.',
    price: 50,
    currency: 'USD',
    minimumQuantity: 1,
    featured: true,
    active: true,
    platform: 'Google Business Profile',
    icon: 'removal',
    features: [
      'Legal & Terms Policy Audit',
      'High Success Rate Removal Strategy',
      '1-2 Month Old Reviews Removal ($50/rev)',
      '3+ Month Older Reviews Removal ($50/rev)',
      '100% Money Back If Not Removed',
      'Strict Confidentiality'
    ],
    packages: [
      {
        id: 'removal-1-2-month',
        name: '1-2 Month Plus Older Reviews Removal',
        price: 50,
        description: 'Targeted removal for recent negative reviews under 60 days old.',
        features: ['$50 / Review', 'Policy Violation Dispute', '7-14 Days Typical Turnaround', 'Pay On Success Guarantee']
      },
      {
        id: 'removal-3-plus-month',
        name: '3 Month Plus Older Reviews Removal',
        price: 50,
        description: 'Advanced removal protocol for legacy negative reviews older than 90 days.',
        features: ['$50 / Review', 'Deep Algorithmic Escalation', '10-21 Days Turnaround', 'Pay On Success Guarantee']
      }
    ]
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return SERVICES.find((service) => service.slug === slug || service.id === slug);
};

export const getServicesByCategory = (category: ServiceCategory): Service[] => {
  return SERVICES.filter((service) => service.category === category);
};

export const searchServices = (query: string, category: string = 'All'): Service[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return SERVICES.filter((service) => {
    const matchesCategory = category === 'All' || service.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const nameMatch = service.name.toLowerCase().includes(normalizedQuery);
    const descMatch = service.description.toLowerCase().includes(normalizedQuery);
    const platformMatch = service.platform.toLowerCase().includes(normalizedQuery);
    const featureMatch = service.features.some((f) => f.toLowerCase().includes(normalizedQuery));

    return nameMatch || descMatch || platformMatch || featureMatch;
  });
};

