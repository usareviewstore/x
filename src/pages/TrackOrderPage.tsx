import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { useToast } from '../context/ToastContext';
import { SEOHead } from '../components/SEOHead';
import { MAIN_ROUTES_SEO } from '../lib/seoData';
import {
  Search,
  CheckCircle2,
  Clock,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';

interface TrackOrderPageProps {
  onNavigate: (path: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const seo = MAIN_ROUTES_SEO['/track-order'];

  const urlParams = new URLSearchParams(window.location.search);
  const initialOrderRef = urlParams.get('order') || '';

  const [orderNumberInput, setOrderNumberInput] = useState(initialOrderRef);
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialOrderRef) {
      handleSearch(initialOrderRef, '');
    }
  }, [initialOrderRef]);

  const handleSearch = async (ordNum: string, em: string) => {
    if (!ordNum.trim()) {
      showToast('Input Required', 'Please enter your Order Reference Number.', 'error');
      return;
    }

    setLoading(true);
    setSearched(true);
    setOrder(null);

    try {
      const emailQuery = em ? `?email=${encodeURIComponent(em.trim())}` : '';
      const response = await fetch(`/api/orders/${ordNum.trim()}${emailQuery}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setOrder(data.order);
      } else {
        showToast('Order Not Found', data.error || 'Please check your order reference.', 'error');
      }
    } catch (err) {
      showToast('Search Error', 'Unable to fetch order status.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(orderNumberInput, emailInput);
  };

  // Stepper pipeline stages
  const STAGES = [
    { key: 'Pending Payment', label: 'Pending Payment' },
    { key: 'Payment Verification', label: 'Payment Verification' },
    { key: 'Payment Confirmed', label: 'Payment Confirmed' },
    { key: 'Processing', label: 'Campaign Processing' },
    { key: 'Completed', label: 'Completed' },
  ];

  const getStageIndex = (st: string) => {
    if (st === 'Pending Payment') return 0;
    if (st === 'Payment Submitted' || st === 'Payment Verification') return 1;
    if (st === 'Payment Confirmed') return 2;
    if (st === 'Processing') return 3;
    if (st === 'Completed') return 4;
    return 1;
  };

  const currentStageIdx = order ? getStageIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        breadcrumbs={seo.breadcrumbs}
      />
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
          <Search className="w-3.5 h-3.5" />
          <span>Real-Time Campaign Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Track Your Order
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Enter your Order Reference Number (e.g. URS-2026-XXXXX) to view live progress updates.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md max-w-xl mx-auto space-y-4">
        <form onSubmit={onSubmitForm} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Order Reference Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={orderNumberInput}
              onChange={(e) => setOrderNumberInput(e.target.value)}
              placeholder="e.g. URS-2026-X7K9P"
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-hidden focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Checkout Email (Optional for Verification)
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="e.g. john@company.com"
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Searching Order...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track Order Now</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results Display */}
      {searched && order && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Reference</span>
              <h2 className="text-2xl font-black font-mono text-indigo-600">{order.orderNumber}</h2>
              <span className="text-xs text-slate-500 font-medium">
                Created: {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </span>
            </div>
            <OrderStatusBadge status={order.status} className="text-sm px-4 py-1.5" />
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Progress Pipeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {STAGES.map((stage, idx) => {
                const isDone = idx < currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                return (
                  <div
                    key={stage.key}
                    className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 ${
                      isDone
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-current">
                      {isDone ? '✓' : idx + 1}
                    </div>
                    <span>{stage.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Campaign Summary</span>
              <div className="flex justify-between text-slate-600">
                <span>Service:</span>
                <span className="font-semibold text-slate-900">{order.serviceName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quantity:</span>
                <span className="font-semibold text-slate-900">{order.quantity} units</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Payable:</span>
                <span className="font-bold text-indigo-600">${order.total} USD</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Target Business Info</span>
              <div className="flex justify-between text-slate-600">
                <span>Business Name:</span>
                <span className="font-semibold text-slate-900">{order.businessName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Target URL:</span>
                <a
                  href={order.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-medium truncate max-w-[150px] inline-flex items-center gap-1"
                >
                  <span>View Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {order.payment && (
                <div className="flex justify-between text-slate-600">
                  <span>TXID Hash:</span>
                  <span className="font-mono text-slate-800 truncate max-w-[120px]">
                    {order.payment.transactionHash}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
            {order.status === 'Pending Payment' && (
              <button
                onClick={() => onNavigate(`/payment?order=${order.orderNumber}`)}
                className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Complete Payment Now
              </button>
            )}

            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600"
            >
              <MessageSquare className="w-4 h-4 text-sky-500" />
              <span>Questions? Contact 24/7 Support</span>
            </a>
          </div>
        </div>
      )}

      {searched && !order && !loading && (
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="font-bold text-slate-900">No Order Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Please double-check your Order Reference Number (e.g. URS-2026-XXXXX) or contact support for manual lookup.
          </p>
        </div>
      )}
    </div>
  );
};
