import React from 'react';
import { Service } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  CheckCircle,
  ShoppingCart,
} from 'lucide-react';

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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Category & Badge Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 rounded-md">
            {service.category}
          </span>
          {service.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-full">
              ★ Popular
            </span>
          )}
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
            <BrandLogo platform={service.platform} className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
              {service.name}
            </h3>
            <span className="text-xs text-slate-500 font-medium">{service.platform}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
          {service.description}
        </p>

        {/* Features Snippet */}
        {service.features && service.features.length > 0 && (
          <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
            {service.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Price & Buttons */}
      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-slate-500">Starting at</span>
          <span className="font-extrabold text-slate-900 text-lg">
            {service.price !== null ? (
              <>
                <span className="text-indigo-600">${service.price}</span>
                <span className="text-xs font-normal text-slate-500 ml-1">/ review</span>
              </>
            ) : (
              <span className="text-xs font-bold text-slate-700">Contact Us for Pricing</span>
            )}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={`/services/${service.slug}`}
            onClick={(e) => handleLink(`/services/${service.slug}`, e)}
            className="w-full text-center py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span>View Details</span>
          </a>
          <a
            href={`/checkout?service=${service.slug}`}
            onClick={(e) => handleLink(`/checkout?service=${service.slug}`, e)}
            className="w-full text-center py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Order Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
