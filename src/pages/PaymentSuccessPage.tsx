import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Order } from '../types';
import { getLocalOrder } from '../lib/orderStorage';
import {
  CheckCircle2,
  Search,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';

interface PaymentSuccessPageProps {
  onNavigate: (path: string) => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onNavigate }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('order') || '';

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    if (orderNumber) {
      fetch(`/api/orders/${encodeURIComponent(orderNumber)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.order) {
            setOrder(data.order);
          } else {
            const local = getLocalOrder(orderNumber);
            if (local) setOrder(local);
          }
        })
        .catch(() => {
          const local = getLocalOrder(orderNumber);
          if (local) setOrder(local);
        });
    }
  }, [orderNumber]);

  const telegramMsgUrl = `https://t.me/EgSupport24?text=${encodeURIComponent(
    `Hello USA Review Store Support! I submitted payment verification for Order Reference: ${orderNumber || 'URS-2026-XXXXX'}. Please confirm and start my campaign.`
  )}`;

  const whatsappMsgUrl = `https://wa.me/13073939979?text=${encodeURIComponent(
    `Hello USA Review Store Support! I submitted payment verification for Order Reference: ${orderNumber || 'URS-2026-XXXXX'}. Please confirm and start my campaign.`
  )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 text-center space-y-8">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Payment Submitted & Logged
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Payment Verification Underway
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Thank you! Your payment verification has been logged into our automated queue. An email confirmation has been dispatched.
        </p>
      </div>

      {/* Order Summary Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4 text-left">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <span className="text-xs text-slate-500 font-semibold">Order Reference:</span>
          <span className="font-mono font-bold text-blue-600 text-base">{orderNumber || 'URS-2026-XXXXX'}</span>
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
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-900">{order.serviceName} ({order.quantity} units)</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
              <span className="text-slate-500">Total Amount:</span>
              <span className="font-bold text-slate-900">${order.total.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Customer Email:</span>
              <span className="font-medium text-slate-800">{order.email}</span>
            </div>
          </>
        )}

        {/* Instant WhatsApp & Telegram Priority Notice */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-3 pt-3">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Fast-Track Your Campaign via Telegram / WhatsApp</span>
          </div>
          <p className="text-[12px] text-slate-600 leading-relaxed">
            Send your Order ID directly to our 24/7 senior account manager to skip the queue and initiate instantaneous delivery setup:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <a
              href={telegramMsgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram (@EgSupport24)</span>
            </a>
            <a
              href={whatsappMsgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <button
          onClick={() => onNavigate(`/track-order?order=${orderNumber}`)}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Track Live Order Status</span>
        </button>

        <button
          onClick={() => onNavigate('/services')}
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          <span>Explore More Services</span>
        </button>
      </div>
    </div>
  );
};
