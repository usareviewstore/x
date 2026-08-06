import { Service, ServiceBenefit, ServiceStep, ServiceIndustry, ServiceDetailedFeature, ServiceFAQ, ServiceSEO } from '../types';
import { SERVICES, getServiceBySlug as getBaseServiceBySlug } from './services';
import { DOC_SERVICES_DATA } from './docServicesData';

// Helper to sanitize slug matching
export function getServiceBySlug(slug: string): Service | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();
  const baseService = SERVICES.find((s) => {
    if (s.slug === cleanSlug) return true;
    if (s.id === cleanSlug) return true;
    if (s.aliases && s.aliases.includes(cleanSlug)) return true;
    
    // Normalized aliases (e.g. google-lsa-support <-> google-local-services-ads-support, google-maps-reputation-support <-> google-maps-gps-reputation-support)
    const norm1 = s.slug.replace(/-(gps|ads|reputation)-/g, '-');
    const norm2 = cleanSlug.replace(/-(gps|ads|reputation)-/g, '-');
    if (norm1 === norm2) return true;
    
    return false;
  });

  if (!baseService) return undefined;
  return getEnrichedService(baseService);
}

// Generate platform-tailored industry list
function getPlatformIndustries(platform: string, category: string): ServiceIndustry[] {
  const p = platform.toLowerCase();
  
  if (p.includes('zillow') || p.includes('realtor')) {
    return [
      { title: 'Real Estate Agents', description: 'Highlight closed property transactions and buyer satisfaction.' },
      { title: 'Property Managers', description: 'Showcase tenant care and well-maintained residential communities.' },
      { title: 'Mortgage Brokers', description: 'Build borrower trust through post-closing client testimonials.' },
      { title: 'Commercial Realtors', description: 'Demonstrate commercial real estate expertise and deal history.' }
    ];
  }

  if (p.includes('thumbtack') || p.includes('houzz') || p.includes('homeadvisor') || p.includes('homestars') || p.includes('bark')) {
    return [
      { title: 'Home Improvement', description: 'Contractors, remodelers, and builders seeking verified project reviews.' },
      { title: 'Local Trade Services', description: 'Plumbers, electricians, and HVAC technicians building local authority.' },
      { title: 'Architects & Designers', description: 'Interior designers and architects showcasing project satisfaction.' },
      { title: 'Landscapers & Cleaners', description: 'Residential service providers building recurring client trust.' }
    ];
  }

  if (p.includes('avvo')) {
    return [
      { title: 'Personal Injury Lawyers', description: 'Demonstrate successful case outcomes and empathetic client care.' },
      { title: 'Family Law Attorneys', description: 'Build compassionate credibility for divorce and custody consultation.' },
      { title: 'Corporate & Tax Lawyers', description: 'Showcase professional competence and peer-backed reputation.' },
      { title: 'Criminal Defense Counsel', description: 'Provide prospective clients with clear evidence of defense reliability.' }
    ];
  }

  if (p.includes('healthgrades') || p.includes('ratemds')) {
    return [
      { title: 'Specialist Physicians', description: 'Surgeons, cardiologists, and specialists building patient trust.' },
      { title: 'Dental Practices', description: 'Cosmetic and general dentists highlighting comfortable patient care.' },
      { title: 'Mental Health Clinics', description: 'Therapists and counselors fostering a safe, reputable environment.' },
      { title: 'Private Medical Clinics', description: 'Outpatient clinics improving prospective patient conversion.' }
    ];
  }

  if (p.includes('booking') || p.includes('weddingwire')) {
    return [
      { title: 'Boutique Hotels & Resorts', description: 'Elevate guest ratings to justify premium room rates.' },
      { title: 'Wedding Venues & Caterers', description: 'Capture glowing post-event reviews to fill event calendars.' },
      { title: 'Vacation Rentals', description: 'Stand out in competitive tourism markets with high feedback scores.' },
      { title: 'Event Photographers', description: 'Build wedding vendor authority through couple testimonials.' }
    ];
  }

  if (p.includes('e-commerce') || p.includes('product review') || p.includes('trustpilot') || p.includes('reviews.io')) {
    return [
      { title: 'D2C E-Commerce Brands', description: 'Boost online checkout conversion with post-purchase customer feedback.' },
      { title: 'SaaS & Digital Products', description: 'Build software product credibility with verified user reviews.' },
      { title: 'Subscription Box Services', description: 'Highlight recurring subscriber satisfaction and unboxing quality.' },
      { title: 'Online Retailers', description: 'Reduce cart abandonment with prominent third-party trust badges.' }
    ];
  }

  // Default general industries
  return [
    { title: 'Local Storefronts', description: 'Brick-and-mortar stores driving nearby foot traffic and map visibility.' },
    { title: 'Professional Services', description: 'Consultants, accountants, and agencies establishing market authority.' },
    { title: 'E-Commerce Retailers', description: 'Online sellers converting window shoppers into confident buyers.' },
    { title: 'Healthcare & Wellness', description: 'Medical clinics and wellness providers building local patient confidence.' }
  ];
}

// Generate platform-tailored FAQs
function getPlatformFAQs(serviceName: string, platform: string): ServiceFAQ[] {
  const p = platform.toLowerCase();
  
  const commonFAQs: ServiceFAQ[] = [
    {
      question: `What is the ${serviceName} service?`,
      answer: `Our ${serviceName} is a strategic reputation management service designed to assist your business in establishing automated, compliant customer feedback workflows on ${platform}. We provide custom invitation funnels and profile optimization to capture authentic customer sentiment.`
    },
    {
      question: `Do you guarantee specific reviews or star ratings on ${platform}?`,
      answer: `No. We strictly comply with third-party platform terms of service. We do not provide fake reviews or guaranteed star ratings. Instead, we streamline your customer engagement process so satisfied clients can share genuine feedback effortlessly.`
    },
    {
      question: `Will you ever ask for my ${platform} account password?`,
      answer: `Never. We will never ask for your account passwords or administrative login credentials. All campaign setup and profile guidance are conducted externally or through standard customer outreach links.`
    },
    {
      question: `How does the customer feedback invitation workflow function?`,
      answer: `We configure compliant email, SMS, or direct link feedback triggers for your verified customers. Satisfied customers are guided to leave reviews on ${platform}, while private feedback options allow you to resolve customer concerns directly.`
    },
    {
      question: `How fast does campaign processing begin?`,
      answer: `Once your order is verified and target profile details are confirmed, campaign strategy configuration commences within 12 to 24 hours.`
    },
    {
      question: `How can I track the progress of my campaign?`,
      answer: `Every order includes a live order reference ID (e.g. URS-2026-XXXXX). You can check your status anytime using our Search Order page or reach out to our 24/7 Telegram/WhatsApp support.`
    }
  ];

  if (p.includes('google')) {
    commonFAQs.push({
      question: 'Is this campaign compliant with Google Business Profile guidelines?',
      answer: 'Yes. Our workflows adhere strictly to Google terms. We do not gate reviews or incentivize feedback, ensuring your profile remains safe and fully compliant.'
    });
  } else if (p.includes('trustpilot')) {
    commonFAQs.push({
      question: 'Can this service help with Trustpilot verified status?',
      answer: 'Yes. We guide you on setting up order confirmation webhooks and invitation APIs so customer feedback carries the official Trustpilot Verified tag.'
    });
  } else if (p.includes('facebook')) {
    commonFAQs.push({
      question: 'How do Facebook Recommendations differ from standard star reviews?',
      answer: 'Facebook uses a Recommendation system ("Do you recommend this business?") combined with rich customer tags. Our service optimizes outreach specifically for social recommendations.'
    });
  }

  return commonFAQs;
}

// Master Function to enrich base service with complete 16-section structured data
export function getEnrichedService(service: Service): Service {
  const platform = service.platform || 'Online Platforms';
  const name = service.name;
  const category = service.category;

  const docData = DOC_SERVICES_DATA[service.slug];

  // Custom Hero Title & Description
  const heroTitle = service.heroTitle || docData?.heroTitle || `Build a Stronger ${platform} Presence With Professional Reputation Strategy`;
  const heroDescription = service.heroDescription || docData?.heroDescription || 
    `Elevate your brand's standing on ${platform} through an organized customer feedback strategy. Our ${name} equips your business with transparent review-request funnels, sentiment monitoring, and business profile optimization designed to maximize authentic customer engagement.`;

  // Custom About Section
  const about = service.about || 
    `In today's digital marketplace, a business's online reputation on ${platform} directly dictates customer trust, search visibility, and conversion rates. Potential buyers routinely evaluate third-party feedback before making purchasing decisions or contacting a service provider.\n\n` +
    `Our ${name} is engineered specifically for forward-thinking companies seeking to take proactive control of their digital presence. Rather than leaving customer sentiment to chance, this campaign provides a structured, automated framework for capturing authentic customer experiences at peak moments of satisfaction.\n\n` +
    `By implementing streamlined review-request workflows, your business can systematically invite verified clients to share their feedback on ${platform}. Simultaneously, our private feedback routing enables you to catch and resolve customer grievances internally before they turn into public complaints.\n\n` +
    `Whether you are a local service business, e-commerce brand, or enterprise agency, maintaining an active, high-trust presence on ${platform} positions your business as an industry leader, lowers client acquisition costs, and fosters long-term brand loyalty.`;

  // Quick Benefits
  const benefits: ServiceBenefit[] = service.benefits || [
    {
      title: 'Enhanced Customer Trust',
      description: `Help buyers discover authentic positive feedback on ${platform} to build immediate brand confidence.`,
      icon: 'ShieldCheck'
    },
    {
      title: 'Streamlined Feedback Workflow',
      description: 'Automate post-interaction customer invitation sequences via SMS, email, and direct link funnels.',
      icon: 'Zap'
    },
    {
      title: 'Sentiment & Reputation Insights',
      description: 'Gain real-time visibility into customer satisfaction trends to refine service delivery.',
      icon: 'LineChart'
    },
    {
      title: 'Dedicated 24/7 Assistance',
      description: 'Receive continuous expert support throughout campaign strategy configuration and monitoring.',
      icon: 'Headphones'
    }
  ];

  // What's Included
  const included: string[] = service.included || [
    `${platform} Profile Audit & Optimization Guidance`,
    'Custom Review-Request Templates & Communication Scripts',
    'Private Customer Feedback & Complaint Escalation Pathway',
    'Automated Multi-Channel Invitation Setup Strategy',
    'Real-Time Reputation Signal Monitoring',
    `Full Policy Compliance Verification for ${platform}`,
    'Progress Reports & Executive Sentiment Benchmarking',
    'Dedicated Account Manager & 24/7 Telegram/WhatsApp Support'
  ];

  // How It Works (4 steps)
  const howItWorks: ServiceStep[] = service.howItWorks || [
    {
      step: 1,
      title: 'Select Campaign Package',
      description: `Choose the service level that aligns with your ${platform} growth targets and campaign scale.`
    },
    {
      step: 2,
      title: 'Submit Business & Profile Info',
      description: `Provide your target ${platform} listing link, business name, and campaign preferences. No passwords required.`
    },
    {
      step: 3,
      title: 'Secure Crypto Checkout',
      description: 'Complete your order securely using instant cryptocurrency payment with automated reference tracking.'
    },
    {
      step: 4,
      title: 'Campaign Processing & Updates',
      description: 'Our team configures your feedback workflows and delivers clear status updates every step of the way.'
    }
  ];

  // Industries
  const industries: ServiceIndustry[] = service.industries && service.industries.length > 0
    ? service.industries
    : getPlatformIndustries(platform, category);

  // Key Features
  const detailedFeatures: ServiceDetailedFeature[] = service.detailedFeatures || [
    {
      title: 'Targeted Review Invitations',
      description: `Implement polite, well-timed customer outreach that encourages satisfied buyers to share their experience on ${platform}.`,
      icon: 'Send'
    },
    {
      title: 'Private Complaint Routing',
      description: 'Route dissatisfied customer responses to your private internal support portal before public publication.',
      icon: 'ShieldAlert'
    },
    {
      title: 'Reputation Signal Tracking',
      description: `Monitor key brand mentions, star ratings, and review velocity across ${platform} in real time.`,
      icon: 'Eye'
    },
    {
      title: 'Compliance-First Infrastructure',
      description: 'All campaign workflows strictly adhere to platform terms of service, safeguarding your business profile.',
      icon: 'CheckSquare'
    }
  ];

  // What We Need From Customer
  const requirements: string[] = service.requirements || [
    'Official Business or Brand Name',
    `Direct Target Profile / Listing URL on ${platform}`,
    'Business Website (Optional but Recommended)',
    'Primary Contact Name & Email Address',
    'Campaign Preferences / Target Keywords (Optional)',
    'NOTE: We will NEVER ask you to share account passwords.'
  ];

  // Transparent Expectations
  const expectations: string[] = service.expectations || [
    'Campaign strategy configuration begins within 12–24 hours of order confirmation.',
    'Feedback invitations are dispatched gradually to maintain natural profile activity pacing.',
    'Customer response rates depend on buyer satisfaction, communication channel, and offer quality.',
    'Results may vary depending on customer participation, platform policies, business profile quality, and other factors.'
  ];

  // FAQs
  const faqs: ServiceFAQ[] = (docData?.faqs && docData.faqs.length > 0)
    ? docData.faqs
    : (service.faqs && service.faqs.length >= 4 
        ? service.faqs 
        : getPlatformFAQs(name, platform));

  // SEO Metadata
  const seo: ServiceSEO = service.seo || {
    title: docData?.heroTitle ? `${docData.heroTitle} | USA Review Store` : `${name} | USA Review Store`,
    description: docData?.heroDescription || `Professional ${name} for ${platform}. Build a stronger online reputation, collect genuine customer feedback, and streamline review-request workflows.`,
    keywords: [
      name.toLowerCase(),
      `${platform.toLowerCase()} reputation management`,
      'customer feedback campaign',
      'review request workflow',
      'reputation monitoring',
      'business profile optimization'
    ]
  };

  // Related Services (pick 4 existing service slugs from database excluding current)
  const relatedServices: string[] = service.relatedServices || SERVICES
    .filter((s) => s.id !== service.id && (s.category === category || s.platform === platform))
    .slice(0, 4)
    .map((s) => s.slug);

  return {
    ...service,
    heroTitle,
    heroDescription,
    about,
    benefits,
    included,
    howItWorks,
    industries,
    detailedFeatures,
    requirements,
    expectations,
    faqs,
    seo,
    relatedServices,
    docData
  };
}
