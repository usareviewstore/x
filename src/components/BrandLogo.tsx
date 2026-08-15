import React from 'react';

interface BrandLogoProps {
  platform: string;
  className?: string;
  size?: number | string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ platform = '', className = 'w-6 h-6', size }) => {
  const p = platform.toLowerCase().trim();
  const style = size ? { width: size, height: size } : undefined;

  // GOOGLE MAPS / GPS
  if (p.includes('google maps') || p.includes('gps')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#EA4335"/>
        <path d="M12 2C10.23 2 8.62 2.66 7.41 3.75L12 11.5L16.59 3.75C15.38 2.66 13.77 2 12 2Z" fill="#4285F4"/>
        <path d="M7.41 3.75C5.93 5.08 5 7.01 5 9.08C5 11.58 6.33 14.17 8.35 16.92L12 11.5L7.41 3.75Z" fill="#34A853"/>
        <path d="M12 11.5L15.65 16.92C17.67 14.17 19 11.58 19 9.08C19 7.01 18.07 5.08 16.59 3.75L12 11.5Z" fill="#FBBC04"/>
        <circle cx="12" cy="9" r="3" fill="#FFFFFF"/>
        <circle cx="12" cy="9" r="2" fill="#1A73E8"/>
      </svg>
    );
  }

  // GOOGLE PLAY
  if (p.includes('play store') || p.includes('google play')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.609 1.814L13.803 12 3.61 22.186A2.372 2.372 0 0 1 3 20.531V3.469c0-.649.222-1.25.609-1.655z" fill="#00E676"/>
        <path d="M17.337 8.466l-3.534 3.534 3.534 3.534 3.987-2.302a2.33 2.33 0 0 0 0-4.464l-3.987-2.302z" fill="#FFD600"/>
        <path d="M3.61 1.814L13.803 12l3.534-3.534L5.602.82A2.32 2.32 0 0 0 3.61 1.814z" fill="#00B0FF"/>
        <path d="M3.61 22.186L13.803 12l3.534 3.534-11.735 7.646a2.32 2.32 0 0 1-1.992.992c-.649 0-1.25-.222-1.655-.609z" fill="#FF3D00"/>
      </svg>
    );
  }

  // GOOGLE (GENERAL / LOCAL GUIDE / LSA / BUSINESS PROFILE)
  if (p.includes('google')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.23v3.13C3.21 21.32 7.33 24 12 24z"/>
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.23C.44 8.17 0 9.98 0 12s.44 3.83 1.23 5.4l4.05-3.13z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.21 2.68 1.23 6.61l4.05 3.13c.95-2.83 3.6-4.99 6.72-4.99z"/>
      </svg>
    );
  }

  // TRUSTPILOT
  if (p.includes('trustpilot')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#00B67A"/>
        <path d="M12 4.5L14.3 9.1L19.4 9.9L15.7 13.5L16.6 18.5L12 16.1L7.4 18.5L8.3 13.5L4.6 9.9L9.7 9.1L12 4.5Z" fill="#FFFFFF"/>
        <path d="M14.2 13.5L12 16.1V4.5L14.3 9.1L19.4 9.9L15.7 13.5H14.2Z" fill="#1C1C1C" opacity="0.15"/>
      </svg>
    );
  }

  // FACEBOOK
  if (p.includes('facebook')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12C24 5.373 18.627 0 12 0S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" fill="#1877F2"/>
        <path d="M16.671 15.469l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.57H7.078v3.47h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // GLASSDOOR
  if (p.includes('glassdoor')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#0C8040"/>
        <path d="M7 17.5h10V15H7v2.5zm0-5h10V10H7v2.5zM7 5v2.5h10V5H7z" fill="#FFFFFF"/>
        <path d="M14.5 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#00A261"/>
      </svg>
    );
  }

  // THUMBTACK
  if (p.includes('thumbtack')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#009FD9"/>
        <path d="M12 4a3.5 3.5 0 00-3.5 3.5c0 1.5.9 2.8 2.2 3.3L10 18l2 2 2-2-.7-7.2a3.5 3.5 0 002.2-3.3A3.5 3.5 0 0012 4z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // ZILLOW / REALTOR
  if (p.includes('zillow') || p.includes('realtor')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#006AFF"/>
        <path d="M12 3L3 10v11h18V10L12 3zm4.5 14H7.5v-2l6-6H7.5V7h9v2l-6 6h6v2z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // HOUZZ
  if (p.includes('houzz')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#4DBC15"/>
        <path d="M12 4L5 9v11h4v-6h6v6h4V9l-7-5zm2 8h-4V9.5h4V12z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // HOMEADVISOR / HOMESTARS
  if (p.includes('homeadvisor') || p.includes('homestars')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#F68B1F"/>
        <path d="M12 3L2 11h3v9h14v-9h3L12 3zm0 4.2l5 4V18H7v-6.8l5-4z" fill="#FFFFFF"/>
        <path d="M12 9.5l1.5 3 3.3.5-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.5 1.5-3z" fill="#003366"/>
      </svg>
    );
  }

  // BBB (BETTER BUSINESS BUREAU)
  if (p.includes('bbb') || p.includes('better business bureau')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#005A9C"/>
        <path d="M5 6h4.5a2.5 2.5 0 010 5 2.5 2.5 0 010 5H5V6zm3 3.5h1.5a1 1 0 000-2H8v2zm0 4.5h1.5a1 1 0 000-2H8v2zM14.5 6H19v10h-4.5a2.5 2.5 0 010-5 2.5 2.5 0 010-5zm3 3.5H16a1 1 0 000-2h1.5v2zm0 4.5H16a1 1 0 000-2h1.5v2z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // INDEED
  if (p.includes('indeed')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#2164F3"/>
        <path d="M12 4a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM10 10h4v10h-4V10z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // BOOKING.COM
  if (p.includes('booking')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#003580"/>
        <path d="M7 6h6a3.5 3.5 0 010 7H7V6zm3 2.5v2h3a1 1 0 000-2h-3zm-3 6.5h7a3.5 3.5 0 010 7H7v-7zm3 2.5v2h4a1 1 0 000-2h-4z" fill="#FFFFFF"/>
        <circle cx="19" cy="19" r="1.5" fill="#FEBB02"/>
      </svg>
    );
  }

  // WEDDINGWIRE
  if (p.includes('weddingwire')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#00A499"/>
        <path d="M4 7l2.5 10L10 10l3.5 7L16 7h2.5l-5 13h-3L7 12l-3.5 8h-3L4 7z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // AVVO
  if (p.includes('avvo')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#003366"/>
        <path d="M12 4L4 20h4l1.5-3h5l1.5 3h4L12 4zm-1 10l2-4 2 4h-4z" fill="#F36F21"/>
      </svg>
    );
  }

  // HEALTHGRADES / RATEMDS
  if (p.includes('healthgrades') || p.includes('ratemds')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#FF4A5A"/>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFFFFF"/>
        <path d="M10.5 7.5h3v3h3v3h-3v3h-3v-3h-3v-3h3v-3z" fill="#FF4A5A"/>
      </svg>
    );
  }

  // CHROME STORE
  if (p.includes('chrome')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#34A853"/>
        <path d="M12 12L20.66 7C19 4 15.8 2 12 2v10z" fill="#EA4335"/>
        <path d="M12 12l-8.66 5A10 10 0 0012 22v-10z" fill="#4285F4"/>
        <path d="M12 12L3.34 7A10 10 0 003.34 17L12 12z" fill="#FBBC05"/>
        <circle cx="12" cy="12" r="4.5" fill="#FFFFFF"/>
        <circle cx="12" cy="12" r="3.5" fill="#1A73E8"/>
      </svg>
    );
  }

  // YELP / ELITE YELP
  if (p.includes('yelp')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#D32323"/>
        <path d="M11.5 3.5a1.2 1.2 0 0 0-1.2 1.2v6.1a1.2 1.2 0 0 0 2.4 0V4.7a1.2 1.2 0 0 0-1.2-1.2zM7.2 13.1l-4.8 2.2a1.2 1.2 0 0 0 .9 2.2l5.1-1.4a1.2 1.2 0 0 0-1.2-3zm9.6 0a1.2 1.2 0 0 0-1.2 3l5.1 1.4a1.2 1.2 0 0 0 .9-2.2l-4.8-2.2zm-7 3.8l-3.3 4.2a1.2 1.2 0 1 0 1.9 1.4l3.1-4.4a1.2 1.2 0 0 0-1.7-1.2zm4.4 0a1.2 1.2 0 0 0-1.7 1.2l3.1 4.4a1.2 1.2 0 1 0 1.9-1.4l-3.3-4.2z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // IMDB
  if (p.includes('imdb')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#F5C518"/>
        <text x="12" y="16" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="900" fontFamily="Impact, Arial">IMDb</text>
      </svg>
    );
  }

  // QUICKBOOKS
  if (p.includes('quickbooks') || p.includes('intuit')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#2CA01C"/>
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">qb</text>
      </svg>
    );
  }

  // HOTELS
  if (p.includes('hotels')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#D32F2F"/>
        <path d="M7 19h2v-6h6v6h2V5H7v14zm2-12h6v2H9V7zm0 4h6v2H9v-2z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // REAL ESTATE AGENTS
  if (p.includes('realestate')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#0F172A"/>
        <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5l5 4.5v6.5h-3v-4H10v4H7v-6.5l5-4.5z" fill="#38BDF8"/>
      </svg>
    );
  }

  // PRODUCT REVIEW / REVIEWS.IO / E-COMMERCE
  if (p.includes('product') || p.includes('reviews.io') || p.includes('e-commerce') || p.includes('upcity') || p.includes('bark')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#4F46E5"/>
        <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // DEFAULT BRAND LOGO / SHIELD BADGE
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#2563EB"/>
      <path d="M12 3L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-3zm-1 13l-3.5-3.5 1.41-1.41L11 13.17l5.09-5.09L17.5 9.5 11 16z" fill="#FFFFFF"/>
    </svg>
  );
};
