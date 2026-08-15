import React from 'react';
import { CryptoMethod } from '../types';
import { CRYPTO_PAYMENT_METHODS } from '../data/cryptoPayments';
import { Check, ShieldAlert } from 'lucide-react';

interface CryptoSelectorProps {
  selectedId: string;
  onSelect: (method: CryptoMethod) => void;
}

export const CryptoSelector: React.FC<CryptoSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-slate-900">
          Choose Payment Currency & Network
        </label>
        <span className="text-xs text-slate-500 font-medium">12 Methods Supported</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CRYPTO_PAYMENT_METHODS.map((method) => {
          const isSelected = selectedId === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method)}
              className={`p-3.5 rounded-xl text-left border transition-all duration-200 relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: method.color }}
                  >
                    {method.symbol.substring(0, 4)}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 block leading-tight">
                      {method.symbol}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {method.name}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Network:</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded-md ${
                    method.network.includes('TRC20')
                      ? 'bg-rose-100 text-rose-800'
                      : method.network.includes('ERC20')
                      ? 'bg-blue-100 text-blue-800'
                      : method.network.includes('BEP20')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {method.network}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Network Check:</strong> Always verify that your personal crypto wallet is sending on the exact network shown in the badge above (e.g., <strong>TRC20 for TRON</strong>, <strong>ERC20 for Ethereum</strong>).
        </p>
      </div>
    </div>
  );
};
