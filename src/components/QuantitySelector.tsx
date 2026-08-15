import React from 'react';
import { Minus, Plus, Zap, Tag } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  minQuantity: number;
  onChange: (newQty: number) => void;
  unitPrice: number | null;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  minQuantity,
  onChange,
  unitPrice,
}) => {
  const handleDecrement = () => {
    if (quantity > minQuantity) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onChange(quantity + 1);
  };

  // Determine volume discount multiplier based on quantity
  let discountPercent = 0;
  if (quantity >= 100) {
    discountPercent = 20;
  } else if (quantity >= 50) {
    discountPercent = 15;
  } else if (quantity >= 25) {
    discountPercent = 10;
  } else if (quantity >= 10) {
    discountPercent = 5;
  }

  const rawTotal = unitPrice !== null ? unitPrice * quantity : null;
  const discountedTotal = rawTotal !== null ? Math.round(rawTotal * (1 - discountPercent / 100) * 100) / 100 : null;
  const savings = rawTotal !== null && discountedTotal !== null ? Math.round((rawTotal - discountedTotal) * 100) / 100 : 0;

  // Preset quantity options
  const presets = [
    { qty: Math.max(minQuantity, 5), label: '5' },
    { qty: Math.max(minQuantity, 10), label: '10', popular: true },
    { qty: Math.max(minQuantity, 25), label: '25', discount: '10% OFF' },
    { qty: Math.max(minQuantity, 50), label: '50', discount: '15% OFF' },
    { qty: Math.max(minQuantity, 100), label: '100', discount: '20% OFF' },
  ].filter((p, index, self) => self.findIndex(t => t.qty === p.qty) === index);

  return (
    <div className="flex flex-col gap-3.5 p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200/90 shadow-2xs">
      {/* Header & Main Quantity Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-900">
            Select Quantity
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Minimum required: {minQuantity} reviews
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-300 shadow-xs">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= minQuantity}
            className="p-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-800"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            min={minQuantity}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= minQuantity) {
                onChange(val);
              } else if (e.target.value === '') {
                onChange(minQuantity);
              }
            }}
            className="w-12 text-center font-black text-slate-900 text-base focus:outline-none"
          />

          <button
            type="button"
            onClick={handleIncrement}
            className="p-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors text-slate-800"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Select Presets */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
          Quick Select Packages:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => {
            const isSelected = quantity === preset.qty;
            return (
              <button
                key={preset.qty}
                type="button"
                onClick={() => onChange(preset.qty)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{preset.qty} Reviews</span>
                {preset.popular && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'}`}>
                    Popular
                  </span>
                )}
                {preset.discount && !preset.popular && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'}`}>
                    {preset.discount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Summary Breakdown */}
      <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs">
        <div className="flex justify-between items-center text-slate-600">
          <span>Unit Price:</span>
          <span className="font-bold text-slate-900">
            {unitPrice !== null ? `$${unitPrice.toFixed(2)} / review` : 'Custom Quote'}
          </span>
        </div>

        {discountPercent > 0 && rawTotal !== null && (
          <div className="flex justify-between items-center text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Volume Discount ({discountPercent}% OFF):</span>
            </span>
            <span>-${savings.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-1 border-t border-slate-200/60 font-black text-slate-900">
          <span className="text-sm">Total Price:</span>
          <div className="text-right">
            {discountPercent > 0 && rawTotal !== null ? (
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="line-through text-xs text-slate-400 font-semibold">${rawTotal.toFixed(2)}</span>
                <span className="text-xl text-blue-600 font-black">${discountedTotal?.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl text-blue-600 font-black">
                {rawTotal !== null ? `$${rawTotal.toFixed(2)}` : 'Contact for Quote'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

