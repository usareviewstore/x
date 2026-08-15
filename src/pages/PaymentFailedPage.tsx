import React from 'react';
import { AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';

interface PaymentFailedPageProps {
  onNavigate: (path: string) => void;
}

export const PaymentFailedPage: React.FC<PaymentFailedPageProps> = ({ onNavigate }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('order') || '';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Verification Issue</h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          We could not locate or verify the transaction hash provided on the blockchain network.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-md mx-auto text-left space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500 font-medium">Order Reference:</span>
          <span className="font-mono font-bold text-rose-600">{orderNumber || 'URS-2026-XXXXX'}</span>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-[11px] text-rose-900 leading-relaxed">
          Please verify that you selected the correct cryptocurrency network (e.g. TRC20 vs. ERC20) and pasted the exact Transaction Hash (TXID).
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        {orderNumber && (
          <button
            onClick={() => onNavigate(`/payment?order=${orderNumber}`)}
            className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-try Payment Submission</span>
          </button>
        )}
        <a
          href={CONTACT_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
          <span>Contact Support Desk</span>
        </a>
      </div>
    </div>
  );
};
