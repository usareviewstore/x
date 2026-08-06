import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Order } from '../types';
import { CheckCircle2, Search, MessageSquare, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';

interface PaymentSuccessPageProps {
  onNavigate: (path: string) => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onNavigate }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('order') || '';

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Launch celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    if (orderNumber) {
      fetch(`/api/orders/${orderNumber}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setOrder(data.order);
        })
        .catch(() => {});
    }
  }, [orderNumber]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Payment Hash Received
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Order Submitted Successfully
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Thank you! Your payment verification details have been received and logged into our queue.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4 text-left">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <span className="text-xs text-slate-500 font-semibold">Order Reference:</span>
          <span className="font-mono font-bold text-indigo-600 text-base">{orderNumber || 'URS-2026-XXXXX'}</span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <span className="text-xs text-slate-500 font-semibold">Payment Status:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Verification</span>
          </span>
        </div>

        {order && (
          <>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-xs">
              <span className="text-slate-500">Service Ordered:</span>
              <span className="font-semibold text-slate-900">{order.serviceName}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Total Amount:</span>
              <span className="font-bold text-slate-900">${order.total} USD</span>
            </div>
          </>
        )}

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed pt-3">
          <strong>Instructions:</strong> Please keep your transaction hash for reference. Our support team will verify the payment on the blockchain and contact you through the email or WhatsApp information provided.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <button
          onClick={() => onNavigate(`/track-order?order=${orderNumber}`)}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Track Order Status</span>
        </button>

        <a
          href={CONTACT_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-sky-400" />
          <span>Contact 24/7 Support</span>
        </a>
      </div>
    </div>
  );
};
