import React from 'react';
import { TOOLS_LIST } from '../../data/toolsData';
import { SERVICES } from '../../data/services';
import { BrandLogo } from '../../components/BrandLogo';
import { SEOHead } from '../../components/SEOHead';
import { MAIN_ROUTES_SEO } from '../../lib/seoData';
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Star,
  Lock,
  Globe
} from 'lucide-react';

interface ToolsLandingPageProps {
  onNavigate: (path: string) => void;
}

export const ToolsLandingPage: React.FC<ToolsLandingPageProps> = ({ onNavigate }) => {
  const seo = MAIN_ROUTES_SEO['/tools'];
  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        breadcrumbs={seo.breadcrumbs}
      />
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Tools</span>
          </nav>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-indigo-50/30 to-slate-50/70 border-b border-slate-200/60 pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>100% Free Business Utilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Free Reputation & Review Tools
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Essential SaaS utilities designed to help local businesses calculate review goals, draft genuine feedback, write professional responses, and generate direct review links and QR codes.
          </p>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS_LIST.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(`/tools/${tool.slug}`)}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-indigo-300 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-xs">
                    <Zap className="w-6 h-6" />
                  </div>
                  {tool.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[10px] font-extrabold uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY USE OUR FREE TOOLS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
            Engineered For Business Growth
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Use USA Review Store Utilities?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Free Forever</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No hidden subscriptions, credit cards, or trial lockouts. Use these tools as often as your business requires.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Privacy & Data Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your inputs are processed in real-time. We never store, publish, or sell your customer feedback or private data.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cross-Platform Ready</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for Google Maps, Trustpilot, Glassdoor, Yelp, Facebook, Thumbtack, Zillow, Houzz, and more.
            </p>
          </div>
        </div>
      </section>

      {/* CTA TO FULL SERVICES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                Full-Service Reputation Management
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ready to Scale Your Brand Online?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                While our tools empower your internal team, our professional service plans manage entire review collection campaigns with 24/7 client support.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/services')}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    View Service →
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
