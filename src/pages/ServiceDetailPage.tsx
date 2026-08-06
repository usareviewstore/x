import React, { useState, useEffect } from 'react';
import { getServiceBySlug, getEnrichedService } from '../data/enrichedServices';
import { SERVICES } from '../data/services';
import { QuantitySelector } from '../components/QuantitySelector';
import { CONTACT_INFO } from '../data/contactInfo';
import { BrandLogo } from '../components/BrandLogo';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShoppingCart,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  Zap,
  LineChart,
  Headphones,
  Lock,
  PhoneCall,
  Building2,
  Sparkles,
  CheckSquare,
  Clock,
  ChevronDown,
  ExternalLink,
  Star,
  Users,
  Award,
  BarChart3,
  AlertTriangle,
  ThumbsUp
} from 'lucide-react';
import { DocServiceData } from '../types';

const DocGuideRenderer: React.FC<{ docData: DocServiceData; serviceName: string; platformName: string }> = ({ docData, serviceName, platformName }) => {
  return (
    <div className="space-y-8">
      {/* Hero Playbook Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-10 text-white shadow-xl border border-slate-800">
        <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Comprehensive Strategy Playbook
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Verified Accounts
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {docData.heroTitle}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {docData.heroDescription}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="text-blue-400 font-bold">100% Non-Drop</div>
              <div className="text-slate-400 text-[11px]">30-Day Guarantee</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="text-emerald-400 font-bold">Geo-Targeted</div>
              <div className="text-slate-400 text-[11px]">Local Residential IPs</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="text-amber-400 font-bold">Drip-Feed Speed</div>
              <div className="text-slate-400 text-[11px]">Natural Velocity</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="text-indigo-400 font-bold">Aged Profiles</div>
              <div className="text-slate-400 text-[11px]">High E-E-A-T Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Highlights Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span>Strategy & Execution</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {serviceName} Campaign Overview
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Our specialized campaigns use authentic customer feedback loops and high-authority residential IP profiles for non-drop {platformName} growth.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Real Local Profiles</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Natural Drip-Feed Speed</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Replacement Protection</span>
          </div>
        </div>
      </div>

      {/* Structured Sections */}
      <div className="space-y-6">
        {docData.sections.map((sec, idx) => {
          const title = sec.title || '';
          const lowerTitle = title.toLowerCase();

          const isWarning = lowerTitle.includes('danger') || lowerTitle.includes('risk') || lowerTitle.includes('bot') || lowerTitle.includes('cheap') || lowerTitle.includes('pitfall');
          const isComparison = lowerTitle.includes('specification') || lowerTitle.includes('vs') || lowerTitle.includes('comparison') || lowerTitle.includes('diy') || lowerTitle.includes('breakdown');
          const isStep = lowerTitle.includes('step') || lowerTitle.includes('process');
          const isBenefit = lowerTitle.includes('benefit') || lowerTitle.includes('why') || lowerTitle.includes('power') || lowerTitle.includes('psychology') || lowerTitle.includes('game-changing') || lowerTitle.includes('skyrocket');

          // 1. Warning / Risk Callout
          if (isWarning) {
            return (
              <div key={idx} className="bg-rose-50/90 border-l-4 border-rose-500 p-6 sm:p-8 rounded-2xl shadow-2xs space-y-4">
                {title && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-rose-950 tracking-tight">
                      {title}
                    </h3>
                  </div>
                )}
                <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {sec.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-200/80 text-rose-900 font-medium text-xs">
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // 2. Specifications & Benchmark Grid
          if (isComparison) {
            return (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
                {title && (
                  <div className="space-y-1 border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>Specifications & Benchmarks</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {title}
                    </h3>
                  </div>
                )}

                {sec.paragraphs.length > 0 && (
                  <div className="space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                )}

                {sec.bullets && sec.bullets.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {sec.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                          {b}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // 3. Step Process Card
          if (isStep) {
            return (
              <div key={idx} className="bg-gradient-to-br from-blue-50/60 to-indigo-50/30 p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-2xs space-y-4">
                {title && (
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-600 text-white font-black text-xs rounded-full uppercase tracking-wider">
                      Process Step
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-blue-950 tracking-tight">
                      {title}
                    </h3>
                  </div>
                )}
                <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          }

          // 4. Key Benefit Block
          if (isBenefit) {
            return (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
                {title && (
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span>Key Advantage</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {title}
                    </h3>
                  </div>
                )}
                <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {sec.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-950 text-xs font-semibold">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // 5. Default Clean Section Card
          return (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
              {title && (
                <h3 className={`font-black tracking-tight ${
                  sec.level === 'h3' ? 'text-lg sm:text-xl text-slate-800' : 'text-xl sm:text-2xl text-blue-950 border-l-4 border-blue-600 pl-3.5 py-0.5'
                }`}>
                  {title}
                </h3>
              )}
              <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const rawService = getServiceBySlug(slug);

  // 404 Not Found State
  if (!rawService) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-sm">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Service Not Found</h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            The service you are looking for does not exist or has been updated in our reputation catalog.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/services')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <span>Browse All Reputation Services</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const service = getEnrichedService(rawService);

  // FAQ Expand state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Selected package tier state
  const [selectedPackage, setSelectedPackage] = useState<string>(
    service.packages && service.packages.length > 0 ? service.packages[0].id : ''
  );
  
  // Quantity State
  const [quantity, setQuantity] = useState<number>(service.minimumQuantity || 1);

  // SEO & Title update
  useEffect(() => {
    if (service.seo?.title) {
      document.title = service.seo.title;
    } else {
      document.title = `${service.name} | USA Review Store`;
    }
    
    // Inject Structured Data (JSON-LD)
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://usareviewstore.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://usareviewstore.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": service.name,
          "item": `https://usareviewstore.com/services/${service.slug}`
        }
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.name,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "USA Review Store",
        "url": "https://usareviewstore.com"
      },
      "areaServed": "US",
      "offers": {
        "@type": "Offer",
        "priceCurrency": service.currency || "USD",
        "price": service.price ?? 0
      }
    };

    const faqSchema = service.faqs && service.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : null;

    const scriptBreadcrumb = document.createElement('script');
    scriptBreadcrumb.type = 'application/ld+json';
    scriptBreadcrumb.id = 'jsonld-breadcrumb';
    scriptBreadcrumb.text = JSON.stringify(breadcrumbSchema);

    const scriptService = document.createElement('script');
    scriptService.type = 'application/ld+json';
    scriptService.id = 'jsonld-service';
    scriptService.text = JSON.stringify(serviceSchema);

    document.head.appendChild(scriptBreadcrumb);
    document.head.appendChild(scriptService);

    let scriptFaq: HTMLScriptElement | null = null;
    if (faqSchema) {
      scriptFaq = document.createElement('script');
      scriptFaq.type = 'application/ld+json';
      scriptFaq.id = 'jsonld-faq';
      scriptFaq.text = JSON.stringify(faqSchema);
      document.head.appendChild(scriptFaq);
    }

    return () => {
      document.getElementById('jsonld-breadcrumb')?.remove();
      document.getElementById('jsonld-service')?.remove();
      document.getElementById('jsonld-faq')?.remove();
    };
  }, [service]);

  // Compute unit price based on selected package
  let currentUnitPrice = service.price;
  if (selectedPackage && service.packages) {
    const pkg = service.packages.find((p) => p.id === selectedPackage);
    if (pkg) {
      currentUnitPrice = pkg.price;
    }
  }

  // Handle Order Now trigger
  const handleOrderNow = () => {
    const pkgQuery = selectedPackage ? `&package=${encodeURIComponent(selectedPackage)}` : '';
    onNavigate(`/checkout?service=${service.slug}&qty=${quantity}${pkgQuery}`);
  };

  // Get Related Services objects
  const relatedServicesList = (service.relatedServices || [])
    .map(sSlug => SERVICES.find(s => s.slug === sSlug || s.id === sSlug))
    .filter((s): s is typeof SERVICES[0] => Boolean(s))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 space-y-16">
      
      {/* SECTION 1 — BREADCRUMB */}
      <div className="bg-white border-b border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
            <button 
              onClick={() => onNavigate('/')} 
              className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              onClick={() => onNavigate('/services')} 
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>Services</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold truncate">{service.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 2 — HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* HERO LEFT: Title, Description, Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{service.category}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <span>Platform: {service.platform}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {service.heroTitle || service.name}
            </h1>

            {/* KEY PRODUCT FEATURES & BUY GUARANTEES BOX - Right under Title */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-slate-800 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base sm:text-lg text-white tracking-tight flex items-center gap-2">
                      Key Product Features & Guarantees
                    </h2>
                    <p className="text-xs text-slate-300">
                      Everything included with your {service.platform} campaign order
                    </p>
                  </div>
                </div>
                <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% Risk-Free Guarantee
                </span>
              </div>

              {/* Product Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {(service.features && service.features.length > 0 ? service.features : [
                  "100% Authentic Active Local Profiles",
                  "Sticky & Permanent Non-Drop Strategy",
                  "Drip-Fed Natural Delivery Velocity",
                  "Replacement Warranty & Refill Guarantee",
                  "100% Confidential & No Passwords Needed",
                  "24/7 Dedicated Live Customer Support"
                ]).map((featureText, fIdx) => (
                  <div 
                    key={fIdx} 
                    className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all group"
                  >
                    <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-100 leading-snug">
                      {featureText}
                    </span>
                  </div>
                ))}
              </div>

              {/* High-Conversion Fast Buying Ribbon */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs bg-blue-900/40 p-4 rounded-2xl border border-blue-500/30">
                <div className="flex items-center gap-2.5 text-slate-200 font-medium">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant Processing • 100% Safe Payment • Guaranteed Retention</span>
                </div>
                <button 
                  onClick={() => {
                    document.getElementById('pricing-card')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer group shrink-0"
                >
                  <span>Select Package & Buy</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Quick Feature Chips */}
            <div className="pt-1 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Transparent Process</span>
              </span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Policy Compliant</span>
              </span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>24/7 Live Support</span>
              </span>
            </div>
          </div>

          {/* HERO RIGHT: Pricing & Configuration Card */}
          <div className="lg:col-span-5">
            <div id="pricing-card" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 sticky top-24">
              
              {/* Header: Platform & Social Proof */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                      <BrandLogo platform={service.platform} className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Target Platform
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">{service.platform}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                      Starting From
                    </span>
                    {service.price !== null ? (
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-2xl sm:text-3xl font-black text-blue-600">${service.price}</span>
                        <span className="text-xs font-bold text-slate-500">{service.currency}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-extrabold text-blue-600">Custom Quote</span>
                    )}
                  </div>
                </div>

                {/* Live Social Proof Badge */}
                <div className="flex flex-wrap items-center justify-between text-xs font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 gap-2">
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                    <span className="text-slate-400 font-normal">(1,480+ Orders)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Ready to Process</span>
                  </div>
                </div>
              </div>

              {/* Service Level Packages selector if available */}
              {service.packages && service.packages.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                      Select Service Warranty Level
                    </label>
                    <span className="text-[11px] text-blue-600 font-bold">Replacement Protection</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {service.packages.map((pkg, idx) => {
                      const isSelected = selectedPackage === pkg.id;
                      const isBestValue = idx === service.packages!.length - 1;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-500/20 font-bold shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          {isBestValue && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider rounded-full shadow-2xs whitespace-nowrap">
                              Best Value
                            </span>
                          )}
                          <div className="text-xs font-bold truncate mt-0.5">{pkg.name}</div>
                          <div className="text-sm font-black text-blue-600 mt-1">${pkg.price}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector with Quick Presets */}
              {service.price !== null && (
                <div className="space-y-2">
                  <QuantitySelector
                    quantity={quantity}
                    minQuantity={service.minimumQuantity || 1}
                    onChange={(q) => setQuantity(q)}
                    unitPrice={currentUnitPrice ?? service.price}
                  />
                </div>
              )}

              {/* Key Highlights List for Order */}
              <div className="space-y-2 text-xs font-semibold text-slate-700 bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Non-Drop & Sticky Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Drip-Fed Delivery (Natural Speed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No Password Required & Confidential</span>
                </div>
              </div>

              {/* Primary CTA Button */}
              {service.price !== null ? (
                <button
                  onClick={handleOrderNow}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Proceed to Secure Order</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Team for Custom Quote</span>
                </a>
              )}

              {/* Trust & Guarantee Badges */}
              <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 pt-3 border-t border-slate-100 text-center font-bold">
                <div className="flex flex-col items-center gap-1 p-1">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <span>100% Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-1">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>Refill Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-1">
                  <Headphones className="w-4 h-4 text-indigo-500" />
                  <span>24/7 Support</span>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* SECTION 3 — QUICK BENEFITS */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Campaign Benefits
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Key strategic advantages of our {service.name} workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(service.benefits || []).map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 1 && <Zap className="w-5 h-5" />}
                  {idx === 2 && <LineChart className="w-5 h-5" />}
                  {idx === 3 && <Headphones className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{benefit.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 — ABOUT THIS SERVICE / COMPREHENSIVE GUIDE */}
        {service.docData ? (
          <DocGuideRenderer docData={service.docData} serviceName={service.name} platformName={service.platform} />
        ) : (
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Detailed Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                About {service.name}
              </h2>
            </div>

            <div className="prose prose-slate text-slate-600 text-sm leading-relaxed space-y-4">
              {(service.about || service.longDescription || service.description)
                .split('\n\n')
                .map((pText, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {pText}
                  </p>
                ))}
            </div>
          </section>
        )}

        {/* SECTION 5 — WHAT'S INCLUDED */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Package Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>What’s Included in This Campaign</span>
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(service.included || service.features).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — HOW IT WORKS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Simple Step-by-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              From order placement to live status tracking in four straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(service.howItWorks || []).map((stepObj) => (
              <div
                key={stepObj.step}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                    0{stepObj.step}
                  </span>
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{stepObj.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{stepObj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7 — WHO CAN BENEFIT */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Target Audience
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Who Can Benefit From This Service?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(service.industries || []).map((ind, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{ind.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{ind.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8 — KEY FEATURES */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Service Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(service.detailedFeatures || []).map((feat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">{feat.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9 — PRICING & PACKAGES */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Clear & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pricing Options
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Simple, upfront rates with zero hidden fees or recurring subscriptions.
            </p>
          </div>

          {service.packages && service.packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-lg">{pkg.name}</h3>
                    <div className="text-3xl font-black text-blue-600">${pkg.price} <span className="text-xs font-normal text-slate-500">USD</span></div>
                    <p className="text-xs text-slate-600">{pkg.description}</p>
                    <ul className="space-y-2 pt-4 border-t border-slate-200 text-xs text-slate-700">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      onNavigate(`/checkout?service=${service.slug}&qty=${quantity}&package=${pkg.id}`);
                    }}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Select {pkg.name}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-xl mx-auto space-y-4">
              <div className="text-4xl font-black text-blue-600">
                {service.price !== null ? `$${service.price} USD` : 'Custom Quote'}
              </div>
              <p className="text-xs text-slate-600">
                {service.price !== null
                  ? `Starting package rate for ${service.minimumQuantity} reviews. Custom volume plans available upon request.`
                  : 'Contact our support team for a customized corporate quote.'}
              </p>
              {service.price !== null ? (
                <button
                  onClick={handleOrderNow}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Order Now at ${service.price}
                </button>
              ) : (
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="inline-block px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Contact Support
                </a>
              )}
            </div>
          )}
        </section>

        {/* SECTION 10 — WHAT WE NEED FROM YOU */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Requirements Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Do We Need From You?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
            {(service.requirements || []).map((req, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>

          {/* Explicit Password Policy Banner */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Privacy Security Guarantee: We will NEVER ask you to share your account passwords or personal login credentials.</span>
          </div>
        </section>

        {/* SECTION 11 — EXPECTATIONS */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Transparent Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What to Expect
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {(service.expectations || []).map((exp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 12 — IMPORTANT POLICY NOTICE */}
        <section>
          <div className="p-6 sm:p-8 bg-amber-50/80 rounded-3xl border border-amber-200/80 space-y-2 text-amber-950">
            <div className="flex items-center gap-2 font-black text-base text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Important Policy Notice</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 font-medium">
              Our services are designed to support legitimate customer feedback and reputation management. Customers are responsible for complying with the policies and guidelines of the relevant third-party platform. We do not provide fabricated customer identities or fake reviews.
            </p>
          </div>
        </section>

        {/* SECTION 13 — WHY USA REVIEW STORE */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Service Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose USA Review Store?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <Headphones className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">24/7 Dedicated Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Direct messaging support via Telegram & WhatsApp throughout your campaign.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Professional Workflow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Engineered around platform compliance guidelines and genuine customer feedback.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <Lock className="w-6 h-6 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Transparent & Secure</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Clear pricing structures and instant crypto payment processing with no hidden fees.</p>
            </div>
          </div>
        </section>

        {/* SECTION 14 — FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
            {(service.faqs || []).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-2 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 15 — RELATED SERVICES */}
        {relatedServicesList.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Explore Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Related Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServicesList.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/services/${rel.slug}`)}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">
                      {rel.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="font-black text-xs text-slate-900">
                      {rel.price !== null ? `$${rel.price} USD` : 'Quote'}
                    </span>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 16 — FINAL CTA */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Strengthen Your Online Reputation?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Get started with a professional reputation-management campaign today and help your business capture authentic customer feedback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 relative z-10 pt-2">
            {service.price !== null ? (
              <button
                onClick={handleOrderNow}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Support</span>
            </a>

            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Telegram (@EgSupport24)</span>
            </a>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp (+1 307 393 9979)</span>
            </a>
          </div>

          {/* Independent Disclaimer */}
          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed relative z-10">
            USA Review Store is an independent service provider and is not affiliated with or endorsed by the platforms mentioned unless explicitly stated.
          </div>
        </section>

      </div>
    </div>
  );
};
