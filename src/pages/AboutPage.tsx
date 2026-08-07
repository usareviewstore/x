import React from 'react';
import { ShieldCheck, Users, Award, Lock, Clock, Heart, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { SEOHead } from '../components/SEOHead';
import { MAIN_ROUTES_SEO } from '../lib/seoData';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const seo = MAIN_ROUTES_SEO['/about'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        breadcrumbs={seo.breadcrumbs}
      />
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          Our Brand & Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About USA Review Store
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
          USA Review Store is a premier digital agency specializing in legitimate customer feedback collection, review-request campaign setups, brand sentiment monitoring, and business profile optimization.
        </p>
      </div>

      {/* Core Mission Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Empowering Authentic Customer Trust</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          In today’s digital marketplace, online reputation directly influences consumer confidence and revenue growth. Our mission is to provide businesses with structured tools and expert guidance to capture legitimate customer sentiment, resolve private grievances effectively, and present an accurate online image.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          We firmly reject deceptive practices, fake profiles, and automated review manipulation. Every service offered by USA Review Store is designed to operate within third-party platform policies and encourage authentic customer engagement.
        </p>
      </div>

      {/* 5 Pillars */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Our Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <Award className="w-8 h-8 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Professional Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every campaign is overseen by dedicated reputation consultants who review your platform links and brand requirements thoroughly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <Lock className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900">Transparent Pricing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upfront per-unit and package rates with zero hidden subscription lock-ins or surprise fees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <Clock className="w-8 h-8 text-sky-600" />
            <h3 className="font-bold text-base text-slate-900">24/7 Support Desk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct access to our support desk via Telegram (@EgSupport24) and WhatsApp (+1 307 393 9979) around the clock.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <ShieldCheck className="w-8 h-8 text-purple-600" />
            <h3 className="font-bold text-base text-slate-900">Secure Guest Checkout</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No registration or account credentials needed. Pay safely via cryptocurrency and track order status with your unique reference number.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <Heart className="w-8 h-8 text-rose-600" />
            <h3 className="font-bold text-base text-slate-900">Customer-Focused Approach</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We focus on building long-term brand equity by setting up sustainable feedback channels that continue delivering value.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Prompt */}
      <div className="bg-indigo-50 border border-indigo-200 p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Have Questions About Our Reputation Services?</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Our team is available 24/7 to answer questions, discuss custom enterprise needs, or assist with your campaign setup.
        </p>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-6 py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-2"
        >
          <span>Contact USA Review Store Support</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
