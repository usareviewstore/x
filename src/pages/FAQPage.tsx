import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { SEOHead } from '../components/SEOHead';
import { MAIN_ROUTES_SEO } from '../lib/seoData';

interface FAQPageProps {
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string>('fake-reviews-policy');
  const seo = MAIN_ROUTES_SEO['/faq'];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        breadcrumbs={seo.breadcrumbs}
        faqs={FAQS.map(f => ({ question: f.question, answer: f.answer }))}
      />
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Find instant answers regarding our reputation management workflows, cryptocurrency payments, order tracking, and compliance policies.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-indigo-600 bg-white shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-700 shrink-0">
                    {faq.category}
                  </span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-2xl font-black text-white">Still Have Questions?</h3>
        <p className="text-slate-300 text-xs max-w-md mx-auto">
          Our 24/7 support team is standing by to help you choose the right reputation strategy for your business.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={CONTACT_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on Telegram ({CONTACT_INFO.telegramUsername})</span>
          </a>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            Contact Form
          </button>
        </div>
      </div>
    </div>
  );
};
