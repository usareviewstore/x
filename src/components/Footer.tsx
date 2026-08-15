import React from 'react';
import { ShieldCheck, MessageSquare, PhoneCall, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { MainLogo } from './MainLogo';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <MainLogo variant="dark" taglineText="Authentic Human Reviews" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional digital reputation management, customer-feedback invitation campaigns, profile optimization, and review analytics for growing businesses.
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
              <div className="font-semibold text-slate-200">24/7 Support Desk:</div>
              <div className="text-indigo-400 font-mono">Telegram: {CONTACT_INFO.telegramUsername}</div>
              <div className="text-emerald-400 font-mono">WhatsApp: {CONTACT_INFO.whatsappPhone}</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/services" onClick={(e) => handleLinkClick('/services', e)} className="hover:text-white transition-colors">
                  All Services
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick('/about', e)} className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => handleLinkClick('/blog', e)} className="hover:text-white transition-colors">
                  Blog & Insights
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => handleLinkClick('/faq', e)} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLinkClick('/contact', e)} className="hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/terms" onClick={(e) => handleLinkClick('/terms', e)} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => handleLinkClick('/privacy', e)} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/refund-policy" onClick={(e) => handleLinkClick('/refund-policy', e)} className="hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/disclaimer" onClick={(e) => handleLinkClick('/disclaimer', e)} className="hover:text-white transition-colors">
                  Disclaimer Notice
                </a>
              </li>
              <li>
                <a href="/editorial-policy" onClick={(e) => handleLinkClick('/editorial-policy', e)} className="hover:text-white transition-colors">
                  Editorial Policy
                </a>
              </li>
              <li>
                <a href="/sitemap" onClick={(e) => handleLinkClick('/sitemap', e)} className="hover:text-white transition-colors">
                  HTML Sitemap
                </a>
              </li>
              <li>
                <a href="/track-order" onClick={(e) => handleLinkClick('/track-order', e)} className="hover:text-white transition-colors">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct 24/7 Channels */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Direct Contact
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Need assistance with your campaign or payment? Reach out directly via our official channels:
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2 rounded-lg bg-sky-900/50 hover:bg-sky-900 border border-sky-700/60 text-sky-200 text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>Telegram Support</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2 rounded-lg bg-emerald-900/50 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Support</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-300">Compliance Statement:</strong> USA Review Store provides legitimate customer feedback management, review-request campaign setups, business profile optimization, and reputation monitoring. Services are designed to encourage genuine customer sentiment and MUST NOT be used to post fake, misleading, or deceptive reviews. Customers are solely responsible for adhering to third-party platform terms of service.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 pt-4 border-t border-slate-800/60 text-xs">
            <span>© {CONTACT_INFO.copyrightYear} USA Review Store. All rights reserved.</span>
            <span className="font-mono text-slate-400">Website: {CONTACT_INFO.domain}</span>
          </div>
        </div>
      </div>

      {/* Floating Support Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href={CONTACT_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 hover:scale-110 transition-all group relative"
          title="Chat on Telegram"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Telegram Support
          </span>
        </a>
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 transition-all group relative"
          title="Chat on WhatsApp"
        >
          <PhoneCall className="w-6 h-6" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            WhatsApp 24/7
          </span>
        </a>
      </div>
    </footer>
  );
};
