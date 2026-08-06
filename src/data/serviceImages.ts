export interface ServiceImageData {
  mainImage: string;
  galleryImages: string[];
  alt: string;
  caption: string;
}

export const SERVICE_IMAGES: Record<string, ServiceImageData> = {
  'buy-google-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Google Business Profile Reviews Strategy',
    caption: 'Verified 5-Star Google Reviews to dominate local search rankings'
  },
  'buy-google-local-guide-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Google Local Guide High Level Reviews',
    caption: 'High-authority Level 4-8 Google Local Guide profiles'
  },
  'buy-trustpilot-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Trustpilot Reviews Strategy',
    caption: 'Build instant global buyer trust with authentic Trustpilot reviews'
  },
  'buy-google-gps-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Google GPS Map Reviews',
    caption: 'Drive physical store foot traffic with top GPS map rankings'
  },
  'buy-glassdoor-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Glassdoor Employer Brand Reviews',
    caption: 'Attract top talent with a stellar Glassdoor employer rating'
  },
  'buy-facebook-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Facebook Page Recommendations & Reviews',
    caption: 'Boost social trust and ad conversions on Facebook'
  },
  'buy-zillow-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Zillow Premier Agent Reviews',
    caption: 'Win high-value real estate listings with 5-star Zillow reputation'
  },
  'buy-thumbtack-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Thumbtack Contractor Reviews',
    caption: 'Convert high-paying home service leads on Thumbtack'
  },
  'buy-google-lsa-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Google Local Service Ads Reviews',
    caption: 'Google Guaranteed badge verification and lead conversion'
  },
  'buy-trustpilot-verified-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Verified Order Trustpilot Reviews',
    caption: '100% verified order tag Trustpilot buyer reviews'
  },
  'buy-houzz-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Houzz Interior Design Reviews',
    caption: 'Showcase luxury home designs with Houzz 5-star ratings'
  },
  'buy-bbb-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Better Business Bureau Accreditations',
    caption: 'A+ BBB accredited business rating & positive client reviews'
  },
  'buy-google-playstore-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Google Play Store App Reviews',
    caption: 'Skyrocket Android app downloads and keyword rankings'
  },
  'buy-homeadvisor-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'HomeAdvisor Service Reviews',
    caption: 'Win top contractor badges on HomeAdvisor'
  },
  'buy-booking-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Booking.com Hotel Reviews',
    caption: 'Maximize hotel occupancy rates with high guest review scores'
  },
  'buy-website-product-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'E-commerce Website Product Reviews',
    caption: 'Increase Shopify & WooCommerce checkout conversion rates'
  },
  'buy-homestar-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'HomeStars Canadian Home Contractor Reviews',
    caption: 'Dominating home renovation lead channels in Canada'
  },
  'buy-chrome-extension-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Chrome Web Store Extension Reviews',
    caption: 'Drive extension installs and web store search visibility'
  },
  'buy-weddingwire-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'WeddingWire Event Vendor Reviews',
    caption: 'Book high-ticket wedding clients & venues with 5-star ratings'
  },
  'buy-reviews-io-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1534536281715-e28d76741772?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Reviews.io Merchant Reviews',
    caption: 'Display verified customer stars on Google Shopping & Ads'
  },
  'buy-hotels-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Hotels.com Guest Reviews',
    caption: 'Boost booking engine rankings for hotels & luxury stays'
  },
  'buy-quickbooks-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'QuickBooks ProAdvisor & App Reviews',
    caption: 'Build accounting & financial service client trust'
  },
  'buy-yelp-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Yelp Business Reviews',
    caption: 'Attract dining & local service customers with 5-star Yelp ratings'
  },
  'buy-elite-yelp-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Yelp Elite Squad Reviews',
    caption: 'High-authority Yelp Elite badge reviews for maximum weight'
  },
  'buy-imdb-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'IMDb Movie & TV Reviews',
    caption: 'Elevate film ratings and audience sentiment on IMDb'
  },
  'buy-realestateagents-reviews': {
    mainImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Real Estate Agent Reputation',
    caption: 'High-converting client feedback for top real estate brokers'
  },
  'google-negative-reviews-removal-services': {
    mainImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Google Negative Review Removal',
    caption: 'Lawful removal of policy-violating and fake negative reviews'
  }
};

export function getServiceImages(slug: string, name: string): ServiceImageData {
  if (SERVICE_IMAGES[slug]) {
    return SERVICE_IMAGES[slug];
  }

  // Fallback for any unknown slug
  return {
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80'
    ],
    alt: `${name} Strategy`,
    caption: `Verified 5-star reputation management strategy for ${name}`
  };
}
