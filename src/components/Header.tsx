import React, { useState } from 'react';
import { ShieldCheck, Search, Menu, X, ArrowRight, MessageSquare, PhoneCall, ChevronDown, Calculator, Sparkles, MessageSquareQuote, Link2, Award, QrCode, Wrench } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { TOOLS_LIST } from '../data/toolsData';
import { SERVICES } from '../data/services';
import { ServiceLogo } from './ServiceLogo';
import { MainLogo } from './MainLogo';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const toolIconMap: Record<string, React.ReactNode> = {
    'review-calculator': <Calculator className="w-4 h-4 text-indigo-600" />,
    'ai-review-generator': <Sparkles className="w-4 h-4 text-indigo-600" />,
    'ai-response-generator': <MessageSquareQuote className="w-4 h-4 text-indigo-600" />,
    'review-link-generator': <Link2 className="w-4 h-4 text-indigo-600" />,
    'review-badge-generator': <Award className="w-4 h-4 text-indigo-600" />,
    'review-qr-code': <QrCode className="w-4 h-4 text-indigo-600" />,
  };

  const featuredServices = SERVICES.filter(s => s.featured).slice(0, 8);

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setMobileToolsOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const isToolsActive = currentPath.startsWith('/tools');
  const isServicesActive = currentPath === '/services' || currentPath.startsWith('/services/');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-300">24/7 Reputation Support Available</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Telegram: {CONTACT_INFO.telegramUsername}</span>
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors hidden sm:flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>WhatsApp: {CONTACT_INFO.whatsappPhone}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="group"
          >
            <MainLogo taglineText="Authentic Human Reviews" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="/"
              onClick={(e) => handleLinkClick('/', e)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPath === '/' ? 'text-blue-600 bg-blue-50/80 font-bold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Home
            </a>

            {/* SERVICES DROPDOWN MENU */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={(e) => handleLinkClick('/services', e)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  isServicesActive ? 'text-blue-600 bg-blue-50/80 font-bold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-[440px] pt-2 z-50 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 space-y-2">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-600">
                        All Review Services (27 Platforms)
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                        Verified & Non-Drop
                      </span>
                    </div>

                    <div className="max-h-[420px] overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                      {SERVICES.map((service) => (
                        <a
                          key={service.id}
                          href={`/services/${service.slug}`}
                          onClick={(e) => handleLinkClick(`/services/${service.slug}`, e)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                            <ServiceLogo slug={service.slug} className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                {service.name}
                              </span>
                              {service.price !== null ? (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md shrink-0">
                                  ${service.price} / rev
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                                  Custom
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {service.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href="/services"
                        onClick={(e) => handleLinkClick('/services', e)}
                        className="flex items-center justify-between px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <span>View Full 27 Services Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* TOOLS DROPDOWN MENU */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                onClick={(e) => handleLinkClick('/tools', e)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  isToolsActive ? 'text-blue-600 bg-blue-50/80 font-bold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-600">
                        Free Business Utilities
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        100% Free
                      </span>
                    </div>

                    {TOOLS_LIST.map((tool) => (
                      <a
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        onClick={(e) => handleLinkClick(`/tools/${tool.slug}`, e)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {toolIconMap[tool.slug] || <Wrench className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {tool.title}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {tool.shortDescription}
                          </div>
                        </div>
                      </a>
                    ))}

                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href="/tools"
                        onClick={(e) => handleLinkClick('/tools', e)}
                        className="flex items-center justify-between px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      >
                        <span>Explore All Free Tools</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/blog"
              onClick={(e) => handleLinkClick('/blog', e)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPath.startsWith('/blog') ? 'text-orange-600 bg-orange-50/80 font-bold' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
              }`}
            >
              Blog
            </a>

            <a
              href="/about"
              onClick={(e) => handleLinkClick('/about', e)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPath === '/about' ? 'text-blue-600 bg-blue-50/80 font-bold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              About
            </a>

            <a
              href="/faq"
              onClick={(e) => handleLinkClick('/faq', e)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPath === '/faq' ? 'text-blue-600 bg-blue-50/80 font-bold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              FAQ
            </a>

            <a
              href="/contact"
              onClick={(e) => handleLinkClick('/contact', e)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPath === '/contact' ? 'text-blue-600 bg-blue-50/80 font-bold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/track-order"
              onClick={(e) => handleLinkClick('/track-order', e)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors border border-slate-200"
            >
              Search Order
            </a>
            <a
              href="/services"
              onClick={(e) => handleLinkClick('/services', e)}
              className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-200 shadow-lg shadow-blue-200 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            <a
              href="/"
              onClick={(e) => handleLinkClick('/', e)}
              className={`px-4 py-2.5 rounded-lg text-base font-semibold ${
                currentPath === '/' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-800'
              }`}
            >
              Home
            </a>

            {/* Mobile Collapsible Services Menu */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                  isServicesActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Services</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="pl-3 pr-2 py-2 space-y-1 bg-slate-50 rounded-xl border border-slate-200/60 max-h-80 overflow-y-auto">
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick('/services', e)}
                    className="block py-2 text-xs font-bold text-blue-600 border-b border-slate-200 mb-1"
                  >
                    View All 27 Review Services →
                  </a>
                  {SERVICES.map((service) => (
                    <a
                      key={service.id}
                      href={`/services/${service.slug}`}
                      onClick={(e) => handleLinkClick(`/services/${service.slug}`, e)}
                      className="flex items-center justify-between py-2 px-1 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <ServiceLogo slug={service.slug} className="w-4 h-4 shrink-0" />
                        <span className="truncate">{service.name}</span>
                      </div>
                      {service.price !== null && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">${service.price}</span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Collapsible Tools Menu */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                  isToolsActive ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-indigo-600" />
                  <span>Tools</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileToolsOpen && (
                <div className="pl-6 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl border border-slate-200/60">
                  <a
                    href="/tools"
                    onClick={(e) => handleLinkClick('/tools', e)}
                    className="block py-2 text-xs font-bold text-indigo-600"
                  >
                    All Free Tools Overview →
                  </a>
                  {TOOLS_LIST.map((tool) => (
                    <a
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      onClick={(e) => handleLinkClick(`/tools/${tool.slug}`, e)}
                      className="flex items-center gap-2 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600"
                    >
                      <span>•</span>
                      <span>{tool.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/about"
              onClick={(e) => handleLinkClick('/about', e)}
              className="px-4 py-2.5 rounded-lg text-base font-semibold text-slate-800"
            >
              About
            </a>

            <a
              href="/faq"
              onClick={(e) => handleLinkClick('/faq', e)}
              className="px-4 py-2.5 rounded-lg text-base font-semibold text-slate-800"
            >
              FAQ
            </a>

            <a
              href="/contact"
              onClick={(e) => handleLinkClick('/contact', e)}
              className="px-4 py-2.5 rounded-lg text-base font-semibold text-slate-800"
            >
              Contact
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="/track-order"
              onClick={(e) => handleLinkClick('/track-order', e)}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
            >
              Track Order
            </a>
            <a
              href="/services"
              onClick={(e) => handleLinkClick('/services', e)}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
