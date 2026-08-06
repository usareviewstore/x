import React, { useState, useEffect } from 'react';
import { CRYPTO_PAYMENT_METHODS, PAYMENT_WARNING_NOTICE } from '../data/cryptoPayments';
import { CryptoMethod, Order } from '../types';
import { CryptoSelector } from '../components/CryptoSelector';
import { QRCodeCanvas } from '../components/QRCodeCanvas';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';
import {
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  RefreshCw,
  Copy,
  ExternalLink,
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

    fetch(`/api/orders/${orderNumberParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.order) {
          setOrder(data.order);
        } else {
          setErrorMsg(data.error || 'Order reference not found.');
        }
      })
      .catch((err) => {
        console.error('Fetch order error:', err);
        setErrorMsg('Error loading order details.');
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
    try {
      const response = await fetch('/api/payments', {
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

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit payment verification.');
      }

      showToast('Payment Submitted!', 'Verification in progress.', 'success');
      onNavigate(`/payment/success?order=${order.orderNumber}`);
    } catch (err: any) {
      console.error('Payment submit error:', err);
      showToast('Payment Error', err.message || 'Error submitting TXID.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-600">Loading order payment details...</p>
      </div>
    );
  }

  if (errorMsg || !order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-black text-slate-900">Order Not Found</h2>
        <p className="text-sm text-slate-600">{errorMsg || 'Invalid order reference number.'}</p>
        <button
          onClick={() => onNavigate('/services')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl"
        >
          Return to Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Order Reference: {order.orderNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Crypto Payment Gateway
          </h1>
          <p className="text-xs text-slate-300">
            Customer: <strong className="text-white">{order.customerName}</strong> ({order.email})
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-right shrink-0">
          <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Total Payable
          </span>
          <span className="text-3xl font-black text-indigo-400">${order.total} USD</span>
          <span className="block text-[10px] text-slate-400 mt-0.5">{order.serviceName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Crypto Selector */}
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
              After transferring funds from your wallet, copy the Transaction Hash (TXID) from your wallet history and paste it below to initiate manual verification.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Transaction Hash / TXID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder="e.g. 0x8a9f2e... or 4f2a7b..."
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Submitting Payment...</span>
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
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6 text-center sticky top-24">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
                Send Payment To
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {selectedCrypto.name}
              </h2>
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200">
                Network: {selectedCrypto.network}
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <QRCodeCanvas value={selectedCrypto.address} size={200} />
            </div>

            {/* Wallet Address Box */}
            <div className="space-y-2 text-left">
              <label className="block text-xs font-bold text-slate-700">Wallet Address</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 break-all leading-relaxed select-all">
                {selectedCrypto.address}
              </div>
              <CopyButton text={selectedCrypto.address} label="Copy Address" className="w-full" />
            </div>

            {/* Warning Banner */}
            <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-left text-xs text-rose-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Irreversible Transfer Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">{PAYMENT_WARNING_NOTICE}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
