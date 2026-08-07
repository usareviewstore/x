import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MAIN_ROUTES_SEO } from '../lib/seoData';
import { SERVICES } from '../data/services';
import { BLOG_POSTS } from '../data/blogPosts';
import { MapPin, ShieldCheck, Wrench, BookOpen, Scale, ChevronRight } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const seo = MAIN_ROUTES_SEO['/sitemap'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        breadcrumbs={seo.breadcrumbs}
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Full Directory & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {seo.h1}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Quickly navigate through our complete library of verified customer review services, free reputation utilities, strategic local SEO guides, and compliance policies.
        </p>
      </div>

      {/* Grid of Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Core & Company Pages */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-base border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5" />
            <h2>Core Platform Pages</h2>
          </div>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            <li>
              <button onClick={() => onNavigate('/')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Home Page</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/services')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>All Review Services</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/tools')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Free Reputation Tools</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/about')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>About USA Review Store</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/contact')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Contact & 24/7 Support</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/faq')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Frequently Asked Questions</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/track-order')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Track Review Order</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Free Tools */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-base border-b border-slate-100 pb-3">
            <Wrench className="w-5 h-5" />
            <h2>Free Tools & Calculators</h2>
          </div>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            <li>
              <button onClick={() => onNavigate('/tools/review-calculator')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Star Rating Needed Calculator</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/tools/ai-review-generator')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>AI Review Content Writer</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/tools/ai-response-generator')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>AI Review Response Generator</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/tools/review-link-generator')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>1-Click Google Review Link Builder</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/tools/review-badge-generator')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Embeddable Star Badge Builder</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/tools/review-qr-code')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Printable Review QR Code Generator</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-base border-b border-slate-100 pb-3">
            <Scale className="w-5 h-5" />
            <h2>Legal & Editorial Policies</h2>
          </div>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            <li>
              <button onClick={() => onNavigate('/terms')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Terms of Service</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/privacy')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Privacy Policy</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/refund-policy')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Refund & Replacement Warranty Policy</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/disclaimer')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Legal Disclaimer</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/editorial-policy')} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Editorial & Fact-Checking Policy</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Review Services */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 md:col-span-2">
          <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-base border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5" />
            <h2>Verified Review Platforms ({SERVICES.length})</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(`/services/${s.slug}`)}
                className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors text-left py-1 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-base border-b border-slate-100 pb-3">
            <BookOpen className="w-5 h-5" />
            <h2>SEO & Reputation Guides</h2>
          </div>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            {BLOG_POSTS.map((post) => (
              <li key={post.id}>
                <button
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-2">{post.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
