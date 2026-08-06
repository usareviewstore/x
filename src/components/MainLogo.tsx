import React from 'react';

interface MainLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
  taglineText?: string;
}

export const MainLogo: React.FC<MainLogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = true,
  taglineText = 'Authentic Reviews & Growth',
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Emblem matching uploaded shooting-star concept */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          className="w-10 h-10 md:w-11 md:h-11 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="starGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="50%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#E63900" />
            </linearGradient>
            <linearGradient id="innerStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#FF3D00" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Shooting Speed Star Outline */}
          <path
            d="M 50,6 L 61,33 L 92,33 L 67,52 L 77,82 L 50,63 L 23,82 L 33,52 L 8,33 L 39,33 Z"
            stroke="url(#starGradMain)"
            strokeWidth="9"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            fill="none"
          />

          {/* Speed Tail Upper Extension */}
          <path
            d="M 68,33 Q 85,32 98,30"
            stroke="url(#starGradMain)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Speed Tail Lower Extension */}
          <path
            d="M 60,67 Q 80,68 96,71"
            stroke="url(#starGradMain)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Inner Solid Rating Star */}
          <polygon
            points="50,25 56,42 74,42 60,53 65,71 50,60 35,71 40,53 26,42 44,42"
            fill="url(#innerStarGrad)"
            filter="url(#glow)"
          />
        </svg>
      </div>

      {/* Brand Name Typography & Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className="font-black text-2xl tracking-tighter italic font-sans leading-none">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>USA </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 pr-1">
              Review
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span
            className={`text-[10px] font-black uppercase tracking-[0.25em] ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`}
          >
            STORE
          </span>

          {showTagline && taglineText && (
            <span
              className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                isDark
                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                  : 'bg-orange-50 text-orange-800 border border-orange-200/80'
              }`}
            >
              {taglineText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
