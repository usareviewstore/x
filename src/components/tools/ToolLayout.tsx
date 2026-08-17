import React, { useState } from 'react';
import {
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Share2,
  Zap,
  Lock,
  MessageSquare
} from 'lucide-react';
import { TOOLS_LIST } from '../../data/toolsData';
import { SERVICES } from '../../data/services';
import { BrandLogo } from '../BrandLogo';
import { SEOHead } from '../SEOHead';

export interface ToolLayoutProps {
  title: string;
  slug: string;
  icon: React.ReactNode;
  shortDescription: string;
  howItWorks: { step: number; title: string; description: string }[];
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  onNavigate: (path: string) => void;
  children: React.ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  slug,
  icon,
  shortDescription,
  howItWorks,
  features,
  faqs,
  onNavigate,
  children,
  seoTitle,
  seoDescription,
  keywords,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Related tools (exclude current)
  const relatedTools = TOOLS_LIST.filter((t) => t.slug !== slug).slice(0, 3);

  // Featured services for bottom CTA
  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 3);

  const canonicalUrl = `https://usareviewstore.com/tools/${slug}`;
  const resolvedTitle = seoTitle || `${title} | USA Review Store Free Tools`;
  const resolvedDescription = seoDescription || shortDescription;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      <SEOHead
        title={resolvedTitle}
        description={resolvedDescription}
        keywords={keywords || `${title.toLowerCase()}, free review tool, reputation utility, usa review store`}
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/tools' },
          { name: title, url: `/tools/${slug}` }
        ]}
        faqs={faqs}
      />
      {/* BREADCRUMB HEADER BAR */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button
              onClick={() => onNavigate('/tools')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Tools
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold">{title}</span>
          </nav>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-indigo-50/30 to-slate-50/70 border-b border-slate-200/60 pt-10 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>100% Free Business Utility</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
              {icon}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-left sm:text-center">
              {title}
            </h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {shortDescription}
          </p>
        </div>
      </section>

      {/* MAIN INTERACTIVE TOOL INTERFACE CONTAINER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 md:p-10 space-y-8">
          {children}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      {howItWorks && howItWorks.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              Simple Step-By-Step
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How {title} Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((hw) => (
              <div
                key={hw.step}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3 relative overflow-hidden"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center border border-indigo-100">
                  0{hw.step}
                </div>
                <h3 className="text-base font-bold text-slate-900">{hw.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{hw.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KEY FEATURES GRID */}
      {features && features.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              Built For Speed & Security
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Key Features & Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {faqs && faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* RELATED TOOLS */}
      {relatedTools.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 block">
                More Utilities
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Explore Related Reputation Tools
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onNavigate(`/tools/${tool.slug}`)}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{tool.shortDescription}</p>
                </div>
                <div className="pt-2 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform gap-1">
                  <span>Use Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FINAL SERVICES CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                Need Professional Help?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Explore Our Reputation Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Let our dedicated team handle your review request campaigns, dispute support, and cross-platform profile management with 24/7 service.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/services')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {featuredServices.map((svc) => (
              <div
                key={svc.id}
                onClick={() => onNavigate(`/services/${svc.slug}`)}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-400">
                      {svc.category}
                    </span>
                    <div className="w-6 h-6 rounded-lg bg-slate-700 p-1 flex items-center justify-center">
                      <BrandLogo platform={svc.platform} className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {svc.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{svc.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 text-xs font-bold border-t border-slate-700/60">
                  <span className="text-emerald-400">From ${svc.price}/review</span>
                  <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">
                    Learn More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
