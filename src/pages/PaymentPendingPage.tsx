import React from 'react';
import { Clock, RefreshCw, MessageSquare, Search } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';

interface PaymentPendingPageProps {
  onNavigate: (path: string) => void;
}

export const PaymentPendingPage: React.FC<PaymentPendingPageProps> = ({ onNavigate }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('order') || '';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
        <Clock className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Pending Verification</h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Your transaction is currently undergoing block confirmation and manual verification by our 24/7 billing team.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-md mx-auto text-left space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500 font-medium">Order Reference:</span>
          <span className="font-mono font-bold text-indigo-600">{orderNumber || 'URS-2026-XXXXX'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500 font-medium">Verification Status:</span>
          <span className="font-bold text-amber-600">Pending Blockchain Confirmation</span>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed">
          Verification typically completes within 15–45 minutes. You can check your live order progress on our Track Order page at any time.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate(`/track-order?order=${orderNumber}`)}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          Track Order
        </button>
        <a
          href={CONTACT_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-700"
        >
          Telegram Support
        </a>
      </div>
    </div>
  );
};
