import React, { useState } from 'react';
import { Star, ShieldCheck, Sparkles, ImageOff } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  aspectRatio?: string;
  platformName?: string;
  badgeText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  caption,
  aspectRatio = 'aspect-video',
  platformName = 'Service Platform',
  badgeText = '5-Star Verified'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80 group ${aspectRatio} ${className}`}>
      {/* Skeleton loader while fetching */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin opacity-50" />
        </div>
      )}

      {/* Primary Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100 group-hover:scale-105' : 'opacity-0 scale-95'
          }`}
        />
      ) : (
        /* Fail-Safe Styled Fallback Visual Card (Guarantees no broken image icon) */
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 flex flex-col justify-between text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="px-2.5 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              {badgeText}
            </span>
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <div className="z-10 my-auto py-2">
            <h4 className="text-base sm:text-lg font-black text-white leading-tight line-clamp-2">
              {alt}
            </h4>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{platformName} Campaign Guarantee</span>
            </p>
          </div>

          <div className="z-10 text-[10px] uppercase font-mono text-slate-400 tracking-wider flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>USA Review Store</span>
            <span>100% Non-Drop</span>
          </div>
        </div>
      )}

      {/* Floating Badge overlay on image */}
      {isLoaded && !hasError && (
        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5 z-10">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{badgeText}</span>
        </div>
      )}

      {/* Caption footer overlay */}
      {caption && isLoaded && !hasError && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3 pt-8 text-white z-10">
          <p className="text-xs font-medium text-slate-200 line-clamp-1">{caption}</p>
        </div>
      )}
    </div>
  );
};
