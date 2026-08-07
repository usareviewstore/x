import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Core Application Pages (Eagerly Loaded for Instant Deep Link Access)
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentPendingPage } from './pages/PaymentPendingPage';
import { PaymentFailedPage } from './pages/PaymentFailedPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapPage } from './pages/SitemapPage';

// Tool Pages
import { ToolsLandingPage } from './pages/tools/ToolsLandingPage';
import { ReviewCalculatorPage } from './pages/tools/ReviewCalculatorPage';
import { AIReviewGeneratorPage } from './pages/tools/AIReviewGeneratorPage';
import { AIResponseGeneratorPage } from './pages/tools/AIResponseGeneratorPage';
import { ReviewLinkGeneratorPage } from './pages/tools/ReviewLinkGeneratorPage';
import { ReviewBadgeGeneratorPage } from './pages/tools/ReviewBadgeGeneratorPage';
import { ReviewQrCodePage } from './pages/tools/ReviewQrCodePage';

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

const getNormalizedPath = (rawPath: string, search = '') => {
  // Support GitHub Pages 404 redirect parameter ?/services/buy-google-reviews
  if (search && search.startsWith('?/')) {
    const redirectPath = search.slice(2).split('&')[0].replace(/~and~/g, '&');
    return getNormalizedPath(redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`);
  }

  let path = rawPath.split('?')[0];
  const repoBase = getRepoBase();
  if (repoBase && path.startsWith(repoBase)) {
    path = path.slice(repoBase.length);
  }
  if (!path || path === '') path = '/';
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path.toLowerCase();
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => 
    getNormalizedPath(window.location.pathname, window.location.search)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath(window.location.pathname, window.location.search));
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

    if (path === '/services' || path === '/service') {
      return <ServicesPage onNavigate={navigate} />;
    }

    if (path.startsWith('/services/') || path.startsWith('/service/')) {
      const slug = path.startsWith('/services/') ? path.replace('/services/', '') : path.replace('/service/', '');
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

    if (path === '/editorial-policy') {
      return <LegalPage type="editorial-policy" onNavigate={navigate} />;
    }

    if (path === '/sitemap') {
      return <SitemapPage onNavigate={navigate} />;
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
          {renderRoute()}
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </ToastProvider>
  );
}
