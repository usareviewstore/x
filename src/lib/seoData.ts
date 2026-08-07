export interface RouteSEOData {
  title: string;
  description: string;
  keywords: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  lsiKeywords: string[];
  searchIntent: 'Commercial' | 'Transactional' | 'Informational' | 'Navigational';
  canonicalUrl: string;
  h1: string;
  breadcrumbs: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
}

export const MAIN_ROUTES_SEO: Record<string, RouteSEOData> = {
  '/': {
    title: 'USA Review Store | #1 Organic Reputation & Verified Reviews Platform',
    description: 'Elevate your online reputation with authentic Google 5-star reviews, Trustpilot verified feedback, Yelp, and Facebook reviews. 100% non-drop, 30-day warranty protection.',
    keywords: 'buy google reviews, buy trustpilot reviews, online reputation management, buy yelp reviews, google local guide reviews, buy facebook reviews, non drop reviews',
    primaryKeyword: 'Buy Verified Google & Trustpilot Reviews',
    secondaryKeywords: ['Organic reputation management', 'Buy Google 5 star reviews', 'Trustpilot verified reviews', 'Yelp elite reviews'],
    lsiKeywords: ['Google Business Profile ranking', 'local SEO 3-pack', 'customer trust badge', 'review replacement warranty', 'drip-feed review delivery'],
    searchIntent: 'Transactional',
    canonicalUrl: 'https://usareviewstore.com/',
    h1: '#1 Enterprise Online Reputation & Verified Customer Feedback Platform',
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ],
    faqs: [
      {
        question: 'How does USA Review Store deliver organic 5-star reviews safely?',
        answer: 'We utilize aged, geo-targeted residential IP profiles and active Google Local Guides (Level 4+). Reviews are published via custom drip-feed schedules (1-3 per day) to mimic natural organic customer velocity.'
      },
      {
        question: 'What replacement warranty guarantees do you provide?',
        answer: 'All review services include flexible 7-day ($7/review), 15-day ($10/review), and 30-day ($15/review) replacement warranties with a one-time free refill policy.'
      },
      {
        question: 'Are reviews permanent and non-drop?',
        answer: 'Yes. By matching real geo-locations, authentic search patterns, and established user accounts, our reviews achieve industry-leading retention rates over 98%.'
      }
    ]
  },

  '/services': {
    title: 'All Reputation Services | Buy Verified Google, Trustpilot & Yelp Reviews',
    description: 'Browse 25+ verified review platforms including Google Business, Trustpilot, Facebook, Glassdoor, Zillow, BBB, and App Store reviews with 30-day warranty.',
    keywords: 'reputation management services, buy google reviews, buy trustpilot reviews, buy yelp reviews, google local guide, buy facebook recommendations',
    primaryKeyword: 'Verified Review Services Catalog',
    secondaryKeywords: ['Buy Google reviews', 'Buy Trustpilot reviews', 'Buy Yelp reviews', 'Local business reviews'],
    lsiKeywords: ['customer feedback automation', 'local SEO booster', '5 star rating seller', 'verified buyer profiles'],
    searchIntent: 'Commercial',
    canonicalUrl: 'https://usareviewstore.com/services',
    h1: 'Verified Online Reputation & Customer Review Services Catalog',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' }
    ]
  },

  '/tools': {
    title: 'Free Review & Reputation Tools | Google Rating Calculator & AI Generator',
    description: 'Access free online reputation tools: Google Review Rating Needed Calculator, AI Review Response Generator, Review Link & QR Code Generator, and Badge Builder.',
    keywords: 'review calculator, free review tools, google review link generator, ai review response generator, review qr code generator, review badge builder',
    primaryKeyword: 'Free Reputation Management Tools',
    secondaryKeywords: ['Google star rating calculator', 'AI review reply generator', 'Google review link creator', 'Free review QR code'],
    lsiKeywords: ['local SEO utility', 'customer feedback tools', '5 star rating target', 'reputation widget generator'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/tools',
    h1: 'Free Online Reputation & Review Growth Utilities',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Free Tools', url: '/tools' }
    ]
  },

  '/tools/review-calculator': {
    title: 'Google Review Star Rating Calculator | How Many 5-Star Reviews Needed',
    description: 'Calculate exactly how many 5-star reviews you need to reach 4.5, 4.8, or 5.0 stars on Google Maps, Trustpilot, or Yelp with our instant free calculator.',
    keywords: 'google review calculator, how many 5 star reviews needed, star rating target calculator, review gap calculator, local seo calculator',
    primaryKeyword: 'Google Review Star Rating Calculator',
    secondaryKeywords: ['How many reviews to reach 4.8', 'Star rating math calculator', 'Review target calculator'],
    lsiKeywords: ['Google Maps rating bump', '5 star review threshold', 'average rating formula', 'reputation score target'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/tools/review-calculator',
    h1: 'Google & Trustpilot Star Rating Target Calculator',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Free Tools', url: '/tools' },
      { name: 'Review Calculator', url: '/tools/review-calculator' }
    ]
  },

  '/tools/ai-review-generator': {
    title: 'Free AI Review Generator | Generate Authentic Customer Feedback',
    description: 'Generate hyper-realistic, keyword-rich 5-star review templates for Google, Trustpilot, Yelp, and Facebook instantly using AI.',
    keywords: 'ai review generator, generate google reviews, review content generator, 5 star review writer, customer review template maker',
    primaryKeyword: 'AI Customer Review Content Generator',
    secondaryKeywords: ['Free Google review generator', 'Trustpilot review generator', 'AI review text template'],
    lsiKeywords: ['natural customer feedback', 'local SEO keyword insertion', 'authentic review generator', '5 star rating text'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/tools/ai-review-generator',
    h1: 'Free AI Customer Review & Rating Content Generator',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Free Tools', url: '/tools' },
      { name: 'AI Review Generator', url: '/tools/ai-review-generator' }
    ]
  },

  '/tools/ai-response-generator': {
    title: 'Free AI Review Response Generator | Professional Owner Replies',
    description: 'Generate professional, empathetic owner responses to positive and negative customer reviews on Google Maps and Trustpilot in seconds.',
    keywords: 'ai review response generator, how to reply to reviews, owner response template, negative review response generator, google review reply tool',
    primaryKeyword: 'AI Review Response Generator',
    secondaryKeywords: ['Reply to negative google reviews', 'Professional review response maker', 'Customer service AI reply'],
    lsiKeywords: ['reputation recovery', 'empathetic business owner reply', 'Google business response SEO', 'customer trust retention'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/tools/ai-response-generator',
    h1: 'AI Business Owner Review Response Generator',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Free Tools', url: '/tools' },
      { name: 'AI Response Generator', url: '/tools/ai-response-generator' }
    ]
  },

  '/tools/review-link-generator': {
    title: 'Google Review Direct Link Generator | Place ID & Short Link Builder',
    description: 'Create instant 1-click direct Google review links for your business using Google Place ID or business name to maximize customer reviews.',
    keywords: 'google review link generator, place id review link, direct google review url, short google review link, 1-click review link',
    primaryKeyword: 'Direct Google Review Link Builder',
    secondaryKeywords: ['Google Place ID review finder', 'Generate 1-click review URL', 'Short review link creator'],
    lsiKeywords: ['Google Maps place ID', 'customer review funnel', 'review request link', 'local SEO conversion link'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/tools/review-link-generator',
    h1: 'Direct 1-Click Google Review Link & Place ID Generator',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Free Tools', url: '/tools' },
      { name: 'Review Link Generator', url: '/tools/review-link-generator' }
    ]
  },

  '/tools/review-badge-generator': {
    title: 'Free Google & Trustpilot Review Embed Badge Generator',
    description: 'Design beautiful, customizable embeddable star rating badges for your website. Show off your 5-star Google and Trustpilot scores in minutes.',
    keywords: 'review badge generator, embed google review badge, trustpilot badge widget, 5 star rating badge HTML, review trust seal maker',
    primaryKeyword: 'Review Embed Badge & Trust Seal Builder',
    secondaryKeywords: ['Google review badge code', 'Trustpilot score badge embed', 'Website trust badge maker'],
    lsiKeywords: ['conversion trust seal', 'social proof widget', 'HTML rating embed code', 'checkout trust booster'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/tools/review-badge-generator',
    h1: 'Embeddable Star Rating & Trust Badge Generator',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Free Tools', url: '/tools' },
      { name: 'Review Badge Generator', url: '/tools/review-badge-generator' }
    ]
  },

  '/tools/review-qr-code': {
    title: 'Free Google Review QR Code Generator | Custom Design & Logo Embed',
    description: 'Generate high-resolution printable QR codes linking directly to your Google Business Profile, Trustpilot, or Yelp review page.',
    keywords: 'google review qr code generator, printable review qr code, custom review qr code with logo, free review qr builder',
    primaryKeyword: 'Free Google Review QR Code Generator',
    secondaryKeywords: ['Printable QR code for reviews', 'Countertop review QR code', 'Trustpilot QR code maker'],
    lsiKeywords: ['in-store review collection', 'table tent QR code', 'instant scan review link', 'vector QR code download'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/tools/review-qr-code',
    h1: 'Printable Google & Trustpilot Review QR Code Generator',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Free Tools', url: '/tools' },
      { name: 'Review QR Code Generator', url: '/tools/review-qr-code' }
    ]
  },

  '/blog': {
    title: 'Reputation & Local SEO Blog | USA Review Store Guides & Strategies',
    description: 'Expert guides on local SEO ranking algorithms, Google 5-star review velocity, Trustpilot conversion rates, and negative review removal strategies.',
    keywords: 'local seo blog, google review strategy, trustpilot guide, yelp elite strategy, remove negative reviews guide, reputation management blog',
    primaryKeyword: 'Local SEO & Online Reputation Blog',
    secondaryKeywords: ['Google reviews strategy guides', 'Trustpilot optimization tips', 'Local pack ranking factors'],
    lsiKeywords: ['EEAT search guidelines', 'Google Local Guides authority', 'review velocity algorithm', 'customer trust building'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/blog',
    h1: 'Local SEO, Reputation Strategy & Trust Growth Blog',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' }
    ]
  },

  '/about': {
    title: 'About USA Review Store | Leading Online Reputation Management Agency',
    description: 'Learn about USA Review Store—our mission, 100% verified non-drop guarantees, expert local SEO team, and dedication to transparent customer trust.',
    keywords: 'about usa review store, verified review agency, reputation management company, trusted review provider',
    primaryKeyword: 'About USA Review Store Agency',
    secondaryKeywords: ['Verified review platform background', 'Reputation management experts', 'Non-drop review replacement policy'],
    lsiKeywords: ['brand authority building', 'organic customer feedback loops', 'local business growth partner', '30-day warranty guarantee'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/about',
    h1: 'About USA Review Store: Your Trusted Reputation Management Partner',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' }
    ]
  },

  '/faq': {
    title: 'Frequently Asked Questions | USA Review Store Support & Policies',
    description: 'Find answers regarding review delivery speed, replacement warranties, account safety, payment methods, and non-drop guarantees.',
    keywords: 'usa review store faq, google review questions, review replacement warranty faq, review delivery speed faq',
    primaryKeyword: 'USA Review Store FAQs & Support',
    secondaryKeywords: ['Review warranty questions', 'Are bought reviews safe', 'Delivery time for google reviews'],
    lsiKeywords: ['drip feed schedule', 'replacement refill policy', 'crypto payment support', '24/7 customer service'],
    searchIntent: 'Informational',
    canonicalUrl: 'https://usareviewstore.com/faq',
    h1: 'Frequently Asked Questions & Customer Support',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'FAQ', url: '/faq' }
    ]
  },

  '/contact': {
    title: 'Contact USA Review Store | 24/7 Live Support & Consultations',
    description: 'Get in touch with our reputation specialists via Telegram, WhatsApp, Email, or Live Chat for customized volume review orders.',
    keywords: 'contact usa review store, reputation agency phone, live chat support review store, telegram review support',
    primaryKeyword: 'Contact USA Review Store Support',
    secondaryKeywords: ['Reputation consultation', 'Telegram support usa review store', '24/7 live review assistance'],
    lsiKeywords: ['bulk order inquiry', 'enterprise review quote', 'custom drip feed strategy', 'dedicated account manager'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/contact',
    h1: 'Contact Our 24/7 Online Reputation Support Team',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact Us', url: '/contact' }
    ]
  },

  '/track-order': {
    title: 'Track Order Status | USA Review Store Real-Time Delivery Tracking',
    description: 'Check your review order delivery progress, active drip-feed schedules, and warranty coverage status in real time with your Order ID.',
    keywords: 'track order usa review store, review order status, drip feed order tracker, review delivery tracking',
    primaryKeyword: 'Real-Time Review Order Tracking',
    secondaryKeywords: ['Check order status', 'Review campaign tracking', 'Delivery progress bar'],
    lsiKeywords: ['Order ID search', 'warranty active status', 'drip feed delivery log', 'customer order lookup'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/track-order',
    h1: 'Track Your Customer Review Campaign Status',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Track Order', url: '/track-order' }
    ]
  },

  '/terms': {
    title: 'Terms of Service | USA Review Store Usage Policies & Guidelines',
    description: 'Review our complete Terms of Service governing order placements, delivery schedules, replacement warranty terms, and client responsibilities.',
    keywords: 'usa review store terms of service, review purchase terms, replacement warranty conditions',
    primaryKeyword: 'USA Review Store Terms of Service',
    secondaryKeywords: ['Client terms and conditions', 'Warranty rules', 'Order cancellation terms'],
    lsiKeywords: ['service agreement', 'legal usage policies', 'client liability', 'intellectual property'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/terms',
    h1: 'USA Review Store Terms of Service',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Terms of Service', url: '/terms' }
    ]
  },

  '/privacy': {
    title: 'Privacy Policy | USA Review Store Data Security & Confidentiality',
    description: 'Learn how USA Review Store protects client information, transaction confidentiality, order URLs, and payment privacy.',
    keywords: 'usa review store privacy policy, client data protection, order confidentiality',
    primaryKeyword: 'USA Review Store Privacy Policy',
    secondaryKeywords: ['Data security guarantee', 'Confidential ordering', 'Cookie policy'],
    lsiKeywords: ['SSL encryption', 'zero data sharing', 'privacy rights', 'secure checkout'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/privacy',
    h1: 'Privacy Policy & Client Data Protection',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Privacy Policy', url: '/privacy' }
    ]
  },

  '/refund-policy': {
    title: 'Refund & Warranty Replacement Policy | USA Review Store Guarantee',
    description: 'Read our explicit 7, 15, and 30-day replacement warranty policies and refund terms for review delivery orders.',
    keywords: 'usa review store refund policy, review replacement warranty policy, money back guarantee',
    primaryKeyword: 'Refund & Replacement Warranty Policy',
    secondaryKeywords: ['Review drop refill policy', '30 day warranty coverage', 'Refund eligibility rules'],
    lsiKeywords: ['one-time replacement guarantee', 'customer protection plan', 'order issue resolution'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/refund-policy',
    h1: 'Refund & Replacement Warranty Policy',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Refund Policy', url: '/refund-policy' }
    ]
  },

  '/disclaimer': {
    title: 'Legal Disclaimer | USA Review Store Platform Compliance Notice',
    description: 'Important legal notices regarding third-party trademark affiliations, independent service provision, and marketing guidelines.',
    keywords: 'usa review store legal disclaimer, trademark notice, independent service disclaimer',
    primaryKeyword: 'Legal Disclaimer & Trademark Notice',
    secondaryKeywords: ['Third-party platform disclaimer', 'Independent reputation provider', 'Terms compliance'],
    lsiKeywords: ['fair use trademarks', 'independent agency', 'compliance disclosure'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/disclaimer',
    h1: 'Legal Disclaimer & Trademark Notices',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Legal Disclaimer', url: '/disclaimer' }
    ]
  },

  '/editorial-policy': {
    title: 'Editorial & Fact-Checking Policy | USA Review Store EEAT Standards',
    description: 'Our commitment to editorial independence, expert fact-checking, EEAT standards, and transparent local SEO research.',
    keywords: 'editorial policy, fact checking policy, local seo editorial standards, eeat search quality',
    primaryKeyword: 'Editorial & EEAT Standards Policy',
    secondaryKeywords: ['Fact checking process', 'SEO research methodology', 'Content integrity'],
    lsiKeywords: ['Google quality rater guidelines', 'Expert author vetting', 'Search quality assurance'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/editorial-policy',
    h1: 'Editorial, EEAT & Fact-Checking Policy',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Editorial Policy', url: '/editorial-policy' }
    ]
  },

  '/sitemap': {
    title: 'HTML Site Map | Navigate All Pages & Services on USA Review Store',
    description: 'Complete directory of all pages, review services, free tools, blog posts, and legal documentation on USA Review Store.',
    keywords: 'html sitemap, usa review store sitemap, website directory, all review services list',
    primaryKeyword: 'USA Review Store HTML Sitemap',
    secondaryKeywords: ['All services directory', 'Website page index', 'Full site navigation'],
    lsiKeywords: ['crawlable links', 'service catalog index', 'tool directory', 'blog archives'],
    searchIntent: 'Navigational',
    canonicalUrl: 'https://usareviewstore.com/sitemap',
    h1: 'HTML Site Map & Full Website Directory',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Sitemap', url: '/sitemap' }
    ]
  }
};
