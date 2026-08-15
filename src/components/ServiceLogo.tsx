import React from 'react';

interface ServiceLogoProps {
  iconName?: string;
  slug?: string;
  className?: string;
}

export const ServiceLogo: React.FC<ServiceLogoProps> = ({ iconName, slug = '', className = 'w-5 h-5' }) => {
  const s = slug.toLowerCase();
  const i = (iconName || '').toLowerCase();

  // 1. Google / Google Local Guide / GPS / LSA
  if (s.includes('google') || i.includes('google')) {
    if (s.includes('guide') || i.includes('guide')) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4" />
          <circle cx="12" cy="9" r="3.5" fill="#FBBC05" />
          <path d="M12 7l1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 11.3l2-.3 1-2z" fill="#EA4335" />
        </svg>
      );
    }
    if (s.includes('gps') || i.includes('gps')) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#E8F0FE" />
          <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#EA4335" />
          <circle cx="12" cy="10" r="2" fill="#FBBC05" />
        </svg>
      );
    }
    if (s.includes('playstore') || i.includes('playstore')) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.6 2.3A1.5 1.5 0 0 0 3 3.5v17a1.5 1.5 0 0 0 .6 1.2l9.7-9.7L3.6 2.3z" fill="#4285F4"/>
          <path d="M16.8 15.5l-3.5-3.5 3.5-3.5 4 2.3c1.1.6 1.1 1.7 0 2.3l-4 2.4z" fill="#FBBC05"/>
          <path d="M13.3 12L3.6 2.3c.4-.2.9-.2 1.4.1l11.8 6.8-3.5 2.8z" fill="#EA4335"/>
          <path d="M13.3 12l3.5 2.8L5 21.6c-.5.3-1 .3-1.4.1L13.3 12z" fill="#34A853"/>
        </svg>
      );
    }
    if (s.includes('removal')) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FEE2E2" />
          <path d="M8 12h8" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    }
    // Standard Google
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    );
  }

  // 2. Trustpilot / Verified
  if (s.includes('trustpilot')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#00B67A"/>
        <path d="M12 4.5l2.25 6.92h7.28l-5.89 4.28 2.25 6.92L12 18.34l-5.89 4.28 2.25-6.92-5.89-4.28h7.28L12 4.5z" fill="#FFFFFF"/>
        <path d="M15.5 13.5l2.5 7.5-6-4.5" fill="#005128" opacity="0.3"/>
      </svg>
    );
  }

  // 3. Yelp / Elite Yelp
  if (s.includes('yelp')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#D32323"/>
        <path d="M11.5 3.5a1.2 1.2 0 0 0-1.2 1.2v6.1a1.2 1.2 0 0 0 2.4 0V4.7a1.2 1.2 0 0 0-1.2-1.2zM7.2 13.1l-4.8 2.2a1.2 1.2 0 0 0 .9 2.2l5.1-1.4a1.2 1.2 0 0 0-1.2-3zm9.6 0a1.2 1.2 0 0 0-1.2 3l5.1 1.4a1.2 1.2 0 0 0 .9-2.2l-4.8-2.2zm-7 3.8l-3.3 4.2a1.2 1.2 0 1 0 1.9 1.4l3.1-4.4a1.2 1.2 0 0 0-1.7-1.2zm4.4 0a1.2 1.2 0 0 0-1.7 1.2l3.1 4.4a1.2 1.2 0 1 0 1.9-1.4l-3.3-4.2z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 4. Facebook
  if (s.includes('facebook')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#1877F2"/>
        <path d="M15.5 12.5h-2.5v8h-3v-8h-2v-2.8h2v-2c0-2.3 1.3-3.7 3.5-3.7 1 0 2 .1 2 .1v2.3h-1.2c-1.1 0-1.5.7-1.5 1.5v1.8h2.7l-.5 2.8z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 5. Glassdoor
  if (s.includes('glassdoor')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#0CAA41"/>
        <path d="M5 18h11v2H5v-2zm0-12h14v10H5V6zm3 2v6h8V8H8z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 6. Zillow
  if (s.includes('zillow')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#006AFF"/>
        <path d="M12 4L3 11h2.5v8h11v-8H19L12 4zm0 3.8l4 3.2H8l4-3.2zm-4 9.2v-2h8v2H8z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 7. Thumbtack
  if (s.includes('thumbtack')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#009FD6"/>
        <path d="M12 3a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 8. BBB (Better Business Bureau)
  if (s.includes('bbb')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#003366"/>
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="Arial">BBB</text>
      </svg>
    );
  }

  // 9. Houzz
  if (s.includes('houzz')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#4DBC15"/>
        <path d="M12 4l-6 5v11h4v-6h4v6h4V9l-6-5z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 10. HomeAdvisor
  if (s.includes('homeadvisor')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F26522"/>
        <path d="M12 3l9 8h-3v10h-5v-6h-2v6H5V11H2l9-8z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 11. Booking
  if (s.includes('booking')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#003580"/>
        <text x="12" y="16" textAnchor="middle" fill="#00A699" fontSize="13" fontWeight="900" fontFamily="sans-serif">B.</text>
      </svg>
    );
  }

  // 12. Chrome Extension
  if (s.includes('chrome')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#4285F4"/>
        <circle cx="12" cy="12" r="4" fill="#FFFFFF"/>
        <circle cx="12" cy="12" r="3" fill="#4285F4"/>
        <path d="M12 2a10 10 0 0 1 8.66 5H12V2z" fill="#EA4335"/>
        <path d="M20.66 7A10 10 0 0 1 12 22v-8l8.66-7z" fill="#FBBC05"/>
        <path d="M12 22A10 10 0 0 1 3.34 7L12 12v10z" fill="#34A853"/>
      </svg>
    );
  }

  // 13. WeddingWire
  if (s.includes('weddingwire')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#2096F3"/>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 14. Reviews.io
  if (s.includes('reviews-io') || s.includes('reviews.io')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#051923"/>
        <path d="M6 17l1.5-4.5L4 10h4.8L10 5.5l1.2 4.5H16l-3.5 2.5 1.5 4.5-4-3-4 3z" fill="#00C896"/>
      </svg>
    );
  }

  // 15. Hotels
  if (s.includes('hotels')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#D32F2F"/>
        <path d="M7 19h2v-6h6v6h2V5H7v14zm2-12h6v2H9V7zm0 4h6v2H9v-2z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 16. QuickBooks
  if (s.includes('quickbooks')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#2CA01C"/>
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">qb</text>
      </svg>
    );
  }

  // 17. IMDb
  if (s.includes('imdb')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F5C518"/>
        <text x="12" y="16" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="900" fontFamily="Impact, Arial">IMDb</text>
      </svg>
    );
  }

  // 18. RealEstateAgents
  if (s.includes('realestate')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#0F172A"/>
        <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5l5 4.5v6.5h-3v-4H10v4H7v-6.5l5-4.5z" fill="#38BDF8"/>
      </svg>
    );
  }

  // 19. HomeStar
  if (s.includes('homestar')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#1E293B"/>
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8L12 3z" fill="#F59E0B"/>
      </svg>
    );
  }

  // Default fallback shield
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#2563EB"/>
      <path d="M12 4L5 7v5c0 4.55 3 8.8 7 10 4-1.2 7-5.45 7-10V7l-7-3zm-1 12l-3-3 1.4-1.4 1.6 1.6 4.6-4.6L17 10l-6 6z" fill="#FFFFFF"/>
    </svg>
  );
};
