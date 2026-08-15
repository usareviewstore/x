import React, { useState } from 'react';
import { SERVICES, SERVICE_CATEGORIES, searchServices } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { CONTACT_INFO } from '../data/contactInfo';
import { BrandLogo } from '../components/BrandLogo';
import { SEOHead } from '../components/SEOHead';
import { MAIN_ROUTES_SEO } from '../lib/seoData';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Lock,
  Clock,
  DollarSign,
  Award,
  Users,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const seo = MAIN_ROUTES_SEO['/'];

  const filteredServices = searchServices(searchQuery, selectedCategory);
  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate('/services');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        breadcrumbs={seo.breadcrumbs}
        faqs={seo.faqs}
      />
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Trusted Digital Reputation & Customer Feedback Agency</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white max-w-4xl mx-auto">
            Build, Protect & Elevate Your <span className="text-blue-400">Online Business Reputation</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Enterprise-grade customer feedback collection, review management campaigns, and business profile optimization across 27+ premier platforms.
          </p>

          {/* Hero Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-xl p-1.5 shadow-lg border border-slate-200 text-slate-900">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms (e.g. Google, Trustpilot, Facebook)..."
                className="w-full px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Popular Platforms:</span>
              {['Google', 'Trustpilot', 'Facebook', 'Glassdoor', 'Monitoring'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onNavigate(`/services?q=${term}`)}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/services')}
              className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All 27+ Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="w-full sm:w-auto px-7 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Talk to Reputation Support</span>
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-slate-800 text-slate-300 text-xs font-semibold">
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>24/7 Live Support</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <Award className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Non-Drop Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS BRAND LOGOS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Platform Expertise
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Supported Platforms & Reputation Catalogs
            </h2>
            <p className="text-xs text-slate-500">
              Select any platform icon to view specialized packages and feedback solutions.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 pt-2">
            {[
              { name: 'Google', query: 'Google' },
              { name: 'Trustpilot', query: 'Trustpilot' },
              { name: 'Facebook', query: 'Facebook' },
              { name: 'Glassdoor', query: 'Glassdoor' },
              { name: 'Thumbtack', query: 'Thumbtack' },
              { name: 'Zillow', query: 'Zillow' },
              { name: 'Houzz', query: 'Houzz' },
              { name: 'HomeAdvisor', query: 'HomeAdvisor' },
              { name: 'BBB', query: 'BBB' },
              { name: 'Indeed', query: 'Indeed' },
              { name: 'Booking.com', query: 'Booking' },
              { name: 'WeddingWire', query: 'WeddingWire' },
              { name: 'Avvo', query: 'Avvo' },
              { name: 'RateMDs', query: 'RateMDs' },
              { name: 'Bark', query: 'Bark' },
              { name: 'Chrome', query: 'Chrome' },
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => onNavigate(`/services?q=${p.query}`)}
                className="p-3 bg-slate-50 hover:bg-blue-50/70 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-xs group-hover:border-blue-300 transition-colors">
                  <BrandLogo platform={p.name} className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 truncate max-w-full">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Top Reputation Management Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Review Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            <span>View All Services ({SERVICES.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === 'All' ? featuredServices : filteredServices.slice(0, 6)).map((service) => (
            <ServiceCard key={service.id} service={service} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Streamlined Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How USA Review Store Works
            </h2>
            <p className="text-slate-600 text-sm">
              Instant guest ordering model without compulsory account setup or password friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-extrabold text-base flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Select Package</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Choose your platform service package, quantity, and campaign schedule parameters.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-extrabold text-base flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Provide URL Details</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Enter your business name, target profile URL, and optional custom feedback instructions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-extrabold text-base flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">3. Secure Payment</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Pay seamlessly via cryptocurrency (USDT, BTC, ETH, LTC) and submit your transaction hash.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-extrabold text-base flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base">4. Track Live Execution</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Monitor order progress with your reference ID while our account team executes the campaign.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & ETHICS COMMITMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ethical Feedback & Compliance Standard</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Built on Genuine Organic Customer Relationships
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              USA Review Store provides structured customer review invitation campaigns, negative feedback gateway filters, and business profile optimization workflows. We help businesses systematically collect authentic feedback while adhering strictly to third-party terms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-200 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified non-drop warranty protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent platform compliance standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live order tracking & reference lookup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated 24/7 account managers</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('/about')}
                className="px-6 py-3 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Read Mission & Principles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Ready to Protect & Elevate Your Brand's Online Reputation?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Get started in under 2 minutes. Select your target service, submit your profile URL, and receive live progress tracking.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/services')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Catalog Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
