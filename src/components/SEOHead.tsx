import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  schemaData?: Record<string, any> | Record<string, any>[];
  articleMeta?: {
    title?: string;
    description?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authorName?: string;
    category?: string;
  };
  productMeta?: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    ratingValue?: number;
    reviewCount?: number;
    category?: string;
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  noIndex = false,
  ogType = 'website',
  ogImage = 'https://usareviewstore.com/assets/og-cover.jpg',
  breadcrumbs,
  faqs,
  schemaData,
  articleMeta,
  productMeta,
}) => {
  // Normalize Canonical URL
  let resolvedCanonical = canonicalUrl;
  if (!resolvedCanonical && typeof window !== 'undefined') {
    let path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    resolvedCanonical = `https://usareviewstore.com${path || '/'}`;
  }
  if (!resolvedCanonical) {
    resolvedCanonical = 'https://usareviewstore.com/';
  }
  // Strip trailing slashes on subpages to avoid duplicate alternate URLs
  if (resolvedCanonical !== 'https://usareviewstore.com/' && resolvedCanonical.endsWith('/')) {
    resolvedCanonical = resolvedCanonical.slice(0, -1);
  }
  // Strip query parameters from canonical URL
  if (resolvedCanonical.includes('?')) {
    resolvedCanonical = resolvedCanonical.split('?')[0];
  }

  const kwText = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to create or update meta/link tags
    const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (kwText) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', kwText);
    }
    
    // Robots Indexing Directive
    if (noIndex) {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
    setMetaTag('meta[name="author"]', 'name', 'author', 'USA Review Store');

    // 3. Canonical Tag
    setLinkTag('canonical', resolvedCanonical);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', resolvedCanonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'USA Review Store');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@usareviewstore');

    // 6. JSON-LD Structured Data Construction
    const jsonLdGraph: any[] = [];

    // Base Organization Schema
    jsonLdGraph.push({
      '@type': 'Organization',
      '@id': 'https://usareviewstore.com/#organization',
      'name': 'USA Review Store',
      'url': 'https://usareviewstore.com/',
      'logo': 'https://usareviewstore.com/favicon.svg',
      'sameAs': [
        'https://twitter.com/usareviewstore',
        'https://facebook.com/usareviewstore',
        'https://t.me/usareviewstores'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-800-555-7389',
        'contactType': 'customer support',
        'email': 'support@usareviewstore.com',
        'availableLanguage': ['English']
      }
    });

    // WebSite Schema with SearchAction
    jsonLdGraph.push({
      '@type': 'WebSite',
      '@id': 'https://usareviewstore.com/#website',
      'url': 'https://usareviewstore.com/',
      'name': 'USA Review Store',
      'publisher': {
        '@id': 'https://usareviewstore.com/#organization'
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://usareviewstore.com/services?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    });

    // LocalBusiness / ProfessionalService Schema
    jsonLdGraph.push({
      '@type': 'ProfessionalService',
      '@id': 'https://usareviewstore.com/#localbusiness',
      'name': 'USA Review Store - Organic Online Reputation Management',
      'image': ogImage,
      'priceRange': '$$',
      'telephone': '+1-800-555-7389',
      'email': 'support@usareviewstore.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '700 5th Ave, Suite 4000',
        'addressLocality': 'Seattle',
        'addressRegion': 'WA',
        'postalCode': '98104',
        'addressCountry': 'US'
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '00:00',
        'closes': '23:59'
      }
    });

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdGraph.push({
        '@type': 'BreadcrumbList',
        '@id': `${resolvedCanonical}#breadcrumb`,
        'itemListElement': breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'item': item.url.startsWith('http') ? item.url : `https://usareviewstore.com${item.url}`
        }))
      });
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      jsonLdGraph.push({
        '@type': 'FAQPage',
        '@id': `${resolvedCanonical}#faq`,
        'mainEntity': faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });
    }

    // Article Schema
    if (articleMeta) {
      jsonLdGraph.push({
        '@type': 'Article',
        '@id': `${resolvedCanonical}#article`,
        'headline': title,
        'description': description,
        'image': [ogImage],
        'datePublished': articleMeta.publishedTime || '2026-07-28',
        'dateModified': articleMeta.modifiedTime || articleMeta.publishedTime || '2026-08-06',
        'author': {
          '@type': 'Person',
          'name': articleMeta.authorName || 'David Vance',
          'jobTitle': 'Senior Reputation Specialist'
        },
        'publisher': {
          '@id': 'https://usareviewstore.com/#organization'
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': resolvedCanonical
        },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['h1', 'p']
        }
      });
    }

    // Product / Service Schema
    if (productMeta) {
      jsonLdGraph.push({
        '@type': 'Product',
        '@id': `${resolvedCanonical}#product`,
        'name': productMeta.name,
        'description': productMeta.description,
        'image': productMeta.image,
        'category': productMeta.category || 'Reputation Management Services',
        'brand': {
          '@type': 'Brand',
          'name': 'USA Review Store'
        },
        'offers': {
          '@type': 'Offer',
          'price': productMeta.price,
          'priceCurrency': productMeta.currency || 'USD',
          'priceValidUntil': '2027-12-31',
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@id': 'https://usareviewstore.com/#organization'
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': productMeta.ratingValue || 4.9,
          'reviewCount': productMeta.reviewCount || 1280,
          'bestRating': '5',
          'worstRating': '1'
        }
      });
    }

    // Extra Custom Schema Data
    if (schemaData) {
      if (Array.isArray(schemaData)) {
        jsonLdGraph.push(...schemaData);
      } else {
        jsonLdGraph.push(schemaData);
      }
    }

    // Inject Script into Head
    let scriptElement = document.head.querySelector('#json-ld-head') as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'json-ld-head';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': jsonLdGraph
    });

  }, [title, description, kwText, resolvedCanonical, noIndex, ogType, ogImage, breadcrumbs, faqs, schemaData, articleMeta, productMeta]);

  return null;
};
