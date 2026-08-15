import React from 'react';
import { ShieldCheck, FileText, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { SEOHead } from '../components/SEOHead';
import { MAIN_ROUTES_SEO } from '../lib/seoData';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund-policy' | 'disclaimer' | 'editorial-policy';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const routeKey = `/${type}`;
  const seo = MAIN_ROUTES_SEO[routeKey] || MAIN_ROUTES_SEO['/terms'];
  const getLegalContent = () => {
    switch (type) {
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: FileText,
          updated: 'August 2, 2026',
          content: (
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h3>
                <p>
                  By accessing or utilizing services provided by USA Review Store ("the Company", "us", "we"), you agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, you should refrain from placing orders or utilizing our website.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Service Scope & Compliance</h3>
                <p>
                  USA Review Store provides legitimate customer feedback invitation campaigns, reputation monitoring, profile optimization, and consulting services. Our tools encourage authentic customer engagement. Customers are solely responsible for ensuring their campaign parameters align with the policies and guidelines of third-party platforms (e.g. Google, Trustpilot, Facebook).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Prohibition of Fabricated Reviews</h3>
                <p>
                  We strictly prohibit the use of our infrastructure to create, distribute, or facilitate fake reviews, fabricated identity profiles, or deceptive testimonials. Any attempt to misuse our services for fraudulent manipulation will result in immediate campaign cancellation without refund.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">4. Payments & Cryptocurrency</h3>
                <p>
                  All payments are processed using cryptocurrencies supported by our payment gateway. Orders are verified manually upon submission of a valid Transaction Hash (TXID). Customers are responsible for verifying wallet addresses and network choices prior to executing transfers.
                </p>
              </section>
            </div>
          ),
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: Lock,
          updated: 'August 2, 2026',
          content: (
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
                <p>
                  Because USA Review Store operates on a guest checkout model, we collect only minimal information necessary to fulfill your order. This includes your name, contact email, phone/WhatsApp number (optional), business name, and target platform URL.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. How We Use Information</h3>
                <p>
                  Collected data is strictly utilized to set up your campaign, deliver live status updates, and communicate regarding payment verification. We never sell, rent, or trade customer information to third-party marketers.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Data Security</h3>
                <p>
                  We employ industry-standard encryption, server-side validation, and secure transmission protocols to safeguard customer data against unauthorized access or disclosure.
                </p>
              </section>
            </div>
          ),
        };

      case 'refund-policy':
        return {
          title: 'Refund Policy',
          icon: RefreshCw,
          updated: 'August 2, 2026',
          content: (
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Eligibility for Refunds</h3>
                <p>
                  A full or partial refund may be requested if USA Review Store is unable to initiate your ordered service campaign within 72 hours of payment confirmation, or if an unresolvable technical failure prevents service execution.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Non-Refundable Scenarios</h3>
                <p>
                  Refunds will not be issued in cases where:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The customer submitted an incorrect, broken, or private target platform URL.</li>
                  <li>The customer attempted to request fabricated or misleading reviews.</li>
                  <li>Cryptocurrency was sent to an incorrect wallet address or unsupported blockchain network.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Requesting a Refund</h3>
                <p>
                  To request a refund, contact our 24/7 support desk via Telegram (@EgSupport24) or WhatsApp (+1 307 393 9979) with your Order Reference Number (URS-2026-XXXXX) and payment TXID.
                </p>
              </section>
            </div>
          ),
        };

      case 'disclaimer':
      default:
        return {
          title: 'Disclaimer Notice',
          icon: AlertCircle,
          updated: 'August 2, 2026',
          content: (
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Third-Party Platform Policies</h3>
                <p>
                  USA Review Store is an independent digital reputation and customer feedback agency. We are not affiliated with, endorsed by, or sponsored by Google, Trustpilot, Facebook, Glassdoor, or any other third-party review platform mentioned on our website.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Customer Policy Responsibility</h3>
                <p>
                  Customers are solely responsible for ensuring their campaign parameters align with the terms of service of any third-party website or application where they maintain business listings. USA Review Store assumes no liability for account suspensions resulting from customer policy non-compliance.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. No Guaranteed Ratings</h3>
                <p>
                  Because our campaigns rely on authentic customer feedback, we do not guarantee specific star ratings or subjective review content. Our services focus on establishing structured feedback invitation channels and improving customer engagement.
                </p>
              </section>
            </div>
          ),
        };
    }
  };

  const legalInfo = getLegalContent();
  const IconComponent = legalInfo.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        breadcrumbs={seo.breadcrumbs}
      />
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {legalInfo.title}
            </h1>
            <span className="text-xs text-slate-400 font-medium">Last Updated: {legalInfo.updated}</span>
          </div>
        </div>

        {legalInfo.content}
      </div>
    </div>
  );
};
