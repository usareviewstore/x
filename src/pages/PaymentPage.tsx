import React, { useState, useEffect } from 'react';
import { CRYPTO_PAYMENT_METHODS, PAYMENT_WARNING_NOTICE } from '../data/cryptoPayments';
import { CryptoMethod, Order, PaymentRecord } from '../types';
import { CryptoSelector } from '../components/CryptoSelector';
import { QRCodeCanvas } from '../components/QRCodeCanvas';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';
import { getLocalOrder, updateLocalOrderStatus } from '../lib/orderStorage';
import { dispatchClientPaymentNotification } from '../lib/clientNotification';
import { SEOHead } from '../components/SEOHead';
import { CONTACT_INFO } from '../data/contactInfo';
import {
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  RefreshCw,
  Copy,
  ExternalLink,
  ShieldCheck,
  Send,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface PaymentPageProps {
  onNavigate: (path: string) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const urlParams = new URLSearchParams(window.location.search);
  const orderNumberParam = urlParams.get('order') || '';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [selectedCrypto, setSelectedCrypto] = useState<CryptoMethod>(CRYPTO_PAYMENT_METHODS[4]); // USDT ERC20 default
  const [transactionHash, setTransactionHash] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!orderNumberParam) {
      setLoading(false);
      setErrorMsg('No order reference provided.');
      return;
    }

    fetch(`/api/orders/${encodeURIComponent(orderNumberParam)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.order) {
          setOrder(data.order);
        } else {
          const local = getLocalOrder(orderNumberParam);
          if (local) {
            setOrder(local);
          } else {
            setErrorMsg(data.error || 'Order reference not found.');
          }
        }
      })
      .catch((err) => {
        console.warn('Server fetch failed, checking local orders:', err);
        const local = getLocalOrder(orderNumberParam);
        if (local) {
          setOrder(local);
        } else {
          setErrorMsg('Unable to retrieve order details.');
        }
      })
      .finally(() => setLoading(false));
  }, [orderNumberParam]);

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionHash.trim()) {
      showToast('TXID Required', 'Please enter your cryptocurrency Transaction Hash (TXID).', 'error');
      return;
    }

    if (transactionHash.trim().length < 8) {
      showToast('Invalid TXID', 'Transaction hash appears too short.', 'error');
      return;
    }

    if (!order) return;

    setIsSubmitting(true);

    const paymentRecord: PaymentRecord = {
      id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      orderNumber: order.orderNumber,
      cryptoSymbol: selectedCrypto.symbol,
      cryptoName: selectedCrypto.name,
      network: selectedCrypto.network,
      walletAddress: selectedCrypto.address,
      amountUsd: order.total,
      transactionHash: transactionHash.trim(),
      status: 'Pending Verification',
      submittedAt: new Date().toISOString(),
    };

    updateLocalOrderStatus(order.orderNumber, 'Payment Verification', paymentRecord);

    // 1. Dispatch to backend API
    try {
      await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          cryptoSymbol: selectedCrypto.symbol,
          network: selectedCrypto.network,
          walletAddress: selectedCrypto.address,
          transactionHash: transactionHash.trim(),
          amountUsd: order.total,
        }),
      });
    } catch (serverErr) {
      console.warn('Backend payment submission error, saved locally:', serverErr);
    }

    // 2. Dispatch client fallback notification for static hosting
    dispatchClientPaymentNotification({
      orderNumber: order.orderNumber,
      cryptoSymbol: selectedCrypto.symbol,
      network: selectedCrypto.network,
      walletAddress: selectedCrypto.address,
      transactionHash: transactionHash.trim(),
      amountUsd: order.total,
    }).catch((err) => console.warn('Client payment notification dispatch error:', err));

    showToast('Payment Verification Submitted!', 'Verification in progress.', 'success');
    setIsSubmitting(false);
    onNavigate(`/payment/success?order=${encodeURIComponent(order.orderNumber)}`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-600">Loading order payment details...</p>
      </div>
    );
  }

  if (errorMsg || !order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Order Reference Not Found</h2>
        <p className="text-sm text-slate-600">{errorMsg || 'Invalid order reference number.'}</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/checkout')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Create New Order
          </button>
          <button
            onClick={() => onNavigate('/services')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Return to Services
          </button>
        </div>
      </div>
    );
  }

  const telegramPrefill = `https://t.me/EgSupport24?text=${encodeURIComponent(
    `Hello USA Review Store Support, I am paying for Order ID: ${order.orderNumber} ($${order.total} USD). Please confirm payment address and verify.`
  )}`;

  const whatsappPrefill = `https://wa.me/13073939979?text=${encodeURIComponent(
    `Hello USA Review Store Support, I am paying for Order ID: ${order.orderNumber} ($${order.total} USD). Please confirm payment address and verify.`
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title={`Payment for ${order.orderNumber} | USA Review Store`}
        description="Secure cryptocurrency gateway for USA Review Store campaign orders."
        canonicalUrl={`https://usareviewstore.com/payment?order=${order.orderNumber}`}
      />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Order Reference: {order.orderNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Crypto Payment Gateway
          </h1>
          <p className="text-xs text-slate-300">
            Customer: <strong className="text-white">{order.customerName}</strong> ({order.email})
          </p>
        </div>

        <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80 text-right shrink-0">
          <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Total Payable
          </span>
          <span className="text-3xl font-extrabold text-blue-400">${order.total.toFixed(2)} USD</span>
          <span className="block text-[11px] text-slate-400 mt-0.5">{order.serviceName} ({order.quantity} units)</span>
        </div>
      </div>

      {/* Live Telegram & WhatsApp Priority Support Box */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Need Instant Verification or Alternative Payment?</h4>
            <p className="text-xs text-slate-600">Send your TXID or receipt screenshot directly to our 24/7 senior account manager.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <a
            href={telegramPrefill}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-3.5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram Support</span>
          </a>
          <a
            href={whatsappPrefill}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Crypto Selector & TXID Input */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <CryptoSelector
              selectedId={selectedCrypto.id}
              onSelect={(method) => setSelectedCrypto(method)}
            />
          </div>

          {/* TXID Submission Form */}
          <form
            onSubmit={handleSubmitPayment}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
          >
            <h3 className="font-bold text-slate-900 text-base">
              Submit Payment Verification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              After transferring funds from your wallet or crypto exchange (Binance, Coinbase, TrustWallet, etc.), copy the Transaction Hash (TXID) from your withdrawal history and paste it below:
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Transaction Hash / TXID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder="e.g. 0x8a9f2e... or 4f2a7b..."
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-mono text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Submitting Verification...</span>
              ) : (
                <>
                  <span>Submit Payment for Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Address & QR Code Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-center sticky top-20">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Send Payment To
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {selectedCrypto.name}
              </h2>
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-md border border-slate-200">
                Network: {selectedCrypto.network}
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center p-2 bg-slate-50 rounded-lg border border-slate-100">
              <QRCodeCanvas value={selectedCrypto.address} size={190} />
            </div>

            {/* Wallet Address Box */}
            <div className="space-y-2 text-left">
              <label className="block text-xs font-bold text-slate-700">Wallet Address</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-800 break-all leading-relaxed select-all">
                {selectedCrypto.address}
              </div>
              <CopyButton text={selectedCrypto.address} label="Copy Address" className="w-full" />
            </div>

            {/* Warning Banner */}
            <div className="p-3.5 bg-rose-50 rounded-lg border border-rose-200 text-left text-xs text-rose-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Network Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">{PAYMENT_WARNING_NOTICE}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
