import React from 'react';
import { Service } from '../types';
import { BrandLogo } from './BrandLogo';
import { CheckCircle2, ShoppingCart, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onNavigate?: (path: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onNavigate }) => {
  const handleLink = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5 sm:p-6">
        {/* Category & Badge Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 rounded-md">
            {service.category}
          </span>
          {service.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md">
              Verified Non-Drop
            </span>
          )}
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
            <BrandLogo platform={service.platform} className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <span className="text-xs text-slate-500 font-medium">{service.platform} Platform</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
          {service.description}
        </p>

        {/* Features Snippet */}
        {service.features && service.features.length > 0 && (
          <div className="space-y-1.5 mb-2 pt-3 border-t border-slate-100">
            {service.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Price & Buttons */}
      <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-slate-500">Starting price</span>
          <div className="text-right">
            {service.price !== null ? (
              <span className="font-extrabold text-slate-900 text-lg">
                <span className="text-blue-600">${service.price}</span>
                <span className="text-xs font-normal text-slate-500 ml-1">/ review</span>
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-700">Custom Package</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={`/services/${service.slug}`}
            onClick={(e) => handleLink(`/services/${service.slug}`, e)}
            className="w-full text-center py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href={`/checkout?service=${service.slug}`}
            onClick={(e) => handleLink(`/checkout?service=${service.slug}`, e)}
            className="w-full text-center py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Order</span>
          </a>
        </div>
      </div>
    </div>
  );
};
