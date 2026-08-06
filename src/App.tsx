import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Core Eagerly Loaded Pages
import { HomePage } from './pages/HomePage';

// Helper for resilient lazy loading with retry on dynamic import failure
function safeLazy<T extends React.ComponentType<any>>(
  factory: () => Promise<any>,
  exportName: string
) {
  return lazy(async () => {
    try {
      const m = await factory();
      return { default: m[exportName] };
    } catch (err) {
      console.warn(`Dynamic import for ${exportName} failed, retrying...`, err);
      await new Promise(res => setTimeout(res, 500));
      try {
        const m = await factory();
        return { default: m[exportName] };
      } catch (retryErr) {
        // Force page reload if module chunk is stale/missing
        window.location.reload();
        return new Promise(() => {}) as any;
      }
    }
  });
}

// Lazy Loaded Tool Pages for code splitting & bundle optimization
const ToolsLandingPage = safeLazy(() => import('./pages/tools/ToolsLandingPage'), 'ToolsLandingPage');
const ReviewCalculatorPage = safeLazy(() => import('./pages/tools/ReviewCalculatorPage'), 'ReviewCalculatorPage');
const AIReviewGeneratorPage = safeLazy(() => import('./pages/tools/AIReviewGeneratorPage'), 'AIReviewGeneratorPage');
const AIResponseGeneratorPage = safeLazy(() => import('./pages/tools/AIResponseGeneratorPage'), 'AIResponseGeneratorPage');
const ReviewLinkGeneratorPage = safeLazy(() => import('./pages/tools/ReviewLinkGeneratorPage'), 'ReviewLinkGeneratorPage');
const ReviewBadgeGeneratorPage = safeLazy(() => import('./pages/tools/ReviewBadgeGeneratorPage'), 'ReviewBadgeGeneratorPage');
const ReviewQrCodePage = safeLazy(() => import('./pages/tools/ReviewQrCodePage'), 'ReviewQrCodePage');

// Lazy Loaded Secondary Application Pages
const ServicesPage = safeLazy(() => import('./pages/ServicesPage'), 'ServicesPage');
const ServiceDetailPage = safeLazy(() => import('./pages/ServiceDetailPage'), 'ServiceDetailPage');
const BlogListPage = safeLazy(() => import('./pages/BlogListPage'), 'BlogListPage');
const BlogPostPage = safeLazy(() => import('./pages/BlogPostPage'), 'BlogPostPage');
const AboutPage = safeLazy(() => import('./pages/AboutPage'), 'AboutPage');
const FAQPage = safeLazy(() => import('./pages/FAQPage'), 'FAQPage');
const ContactPage = safeLazy(() => import('./pages/ContactPage'), 'ContactPage');
const CheckoutPage = safeLazy(() => import('./pages/CheckoutPage'), 'CheckoutPage');
const PaymentPage = safeLazy(() => import('./pages/PaymentPage'), 'PaymentPage');
const PaymentSuccessPage = safeLazy(() => import('./pages/PaymentSuccessPage'), 'PaymentSuccessPage');
const PaymentPendingPage = safeLazy(() => import('./pages/PaymentPendingPage'), 'PaymentPendingPage');
const PaymentFailedPage = safeLazy(() => import('./pages/PaymentFailedPage'), 'PaymentFailedPage');
const TrackOrderPage = safeLazy(() => import('./pages/TrackOrderPage'), 'TrackOrderPage');
const LegalPage = safeLazy(() => import('./pages/LegalPage'), 'LegalPage');

const PageLoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200/50 mb-4">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div className="text-sm font-bold text-slate-800">Loading Page...</div>
    <p className="text-xs text-slate-500 mt-1">USA Review Store</p>
  </div>
);

const getRepoBase = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    // Only use '/x' subpath if hosted directly on github.io subfolder
    if (hostname.endsWith('github.io') && (pathname === '/x' || pathname.startsWith('/x/'))) {
      return '/x';
    }
  }
  return '';
};

const getNormalizedPath = (rawPath: string) => {
  let path = rawPath.split('?')[0];
  const repoBase = getRepoBase();
  if (repoBase && path.startsWith(repoBase)) {
    path = path.slice(repoBase.length);
  }
  if (!path || path === '') path = '/';
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => getNormalizedPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (toPath: string) => {
    const repoBase = getRepoBase();
    const cleanToPath = toPath.startsWith('/') ? toPath : `/${toPath}`;
    const fullPath = `${repoBase}${cleanToPath}`;
    window.history.pushState({}, '', fullPath);
    setCurrentPath(getNormalizedPath(fullPath));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderRoute = () => {
    const path = currentPath;

    if (path === '/' || path === '') {
      return <HomePage onNavigate={navigate} />;
    }

    if (path === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (path === '/blog') {
      return <BlogListPage onNavigate={navigate} />;
    }

    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return <BlogPostPage slug={slug} onNavigate={navigate} />;
    }

    if (path === '/tools') {
      return <ToolsLandingPage onNavigate={navigate} />;
    }

    if (path === '/tools/review-calculator') {
      return <ReviewCalculatorPage onNavigate={navigate} />;
    }

    if (path === '/tools/ai-review-generator') {
      return <AIReviewGeneratorPage onNavigate={navigate} />;
    }

    if (path === '/tools/ai-response-generator') {
      return <AIResponseGeneratorPage onNavigate={navigate} />;
    }

    if (path === '/tools/review-link-generator') {
      return <ReviewLinkGeneratorPage onNavigate={navigate} />;
    }

    if (path === '/tools/review-badge-generator') {
      return <ReviewBadgeGeneratorPage onNavigate={navigate} />;
    }

    if (path === '/tools/review-qr-code') {
      return <ReviewQrCodePage onNavigate={navigate} />;
    }

    if (path === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (path === '/faq') {
      return <FAQPage onNavigate={navigate} />;
    }

    if (path === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (path === '/checkout') {
      return <CheckoutPage onNavigate={navigate} />;
    }

    if (path === '/payment') {
      return <PaymentPage onNavigate={navigate} />;
    }

    if (path === '/payment/success') {
      return <PaymentSuccessPage onNavigate={navigate} />;
    }

    if (path === '/payment/pending') {
      return <PaymentPendingPage onNavigate={navigate} />;
    }

    if (path === '/payment/failed') {
      return <PaymentFailedPage onNavigate={navigate} />;
    }

    if (path === '/track-order') {
      return <TrackOrderPage onNavigate={navigate} />;
    }

    if (path === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }

    if (path === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }

    if (path === '/refund-policy') {
      return <LegalPage type="refund-policy" onNavigate={navigate} />;
    }

    if (path === '/disclaimer') {
      return <LegalPage type="disclaimer" onNavigate={navigate} />;
    }

    // 404 Fallback
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900">404 - Page Not Found</h1>
        <p className="text-sm text-slate-600">The page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl"
        >
          Return Home
        </button>
      </div>
    );
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
        <Header currentPath={currentPath} onNavigate={navigate} />
        <main className="flex-1">
          <Suspense fallback={<PageLoadingFallback />}>
            {renderRoute()}
          </Suspense>
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </ToastProvider>
  );
}
