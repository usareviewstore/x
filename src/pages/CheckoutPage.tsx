import React, { useState, useEffect } from 'react';
import { SERVICES, getServiceBySlug } from '../data/services';
import { QuantitySelector } from '../components/QuantitySelector';
import { useToast } from '../context/ToastContext';
import { ShieldCheck, ArrowRight, Lock, AlertCircle, ShoppingBag, Check } from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  // Read query params from URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceSlug = urlParams.get('service') || 'google-reputation-campaign';
  const initialQty = Number(urlParams.get('qty')) || 1;
  const initialPkg = urlParams.get('package') || '';

  const initialService = getServiceBySlug(serviceSlug) || SERVICES[0];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialService.id);
  const [selectedPackageName, setSelectedPackageName] = useState<string>(initialPkg);
  const [quantity, setQuantity] = useState<number>(
    Math.max(initialQty, initialService.minimumQuantity || 1)
  );

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [platformUrl, setPlatformUrl] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  useEffect(() => {
    // If service changes, ensure quantity satisfies minimum
    if (quantity < currentService.minimumQuantity) {
      setQuantity(currentService.minimumQuantity);
    }
  }, [selectedServiceId, currentService]);

  // Price calculations
  let unitPrice = currentService.price ?? 0;
  if (selectedPackageName && currentService.packages) {
    const pkg = currentService.packages.find(
      (p) => p.id === selectedPackageName || p.name === selectedPackageName
    );
    if (pkg) {
      unitPrice = pkg.price;
    }
  }

  const subtotal = unitPrice * quantity;
  const discount = 0;
  const total = subtotal - discount;

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Full Name is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required.';
    if (!businessName.trim()) errs.businessName = 'Business Name is required.';
    if (!platformUrl.trim()) errs.platformUrl = 'Platform / Profile URL is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          businessName,
          businessWebsite,
          platformUrl,
          serviceId: currentService.id,
          packageName: selectedPackageName,
          quantity,
          specialInstructions,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate order.');
      }

      showToast('Order Created!', `Order Ref: ${data.order.orderNumber}`, 'success');
      onNavigate(`/payment?order=${data.order.orderNumber}`);
    } catch (err: any) {
      console.error('Checkout submit error:', err);
      showToast('Checkout Failed', err.message || 'Error processing checkout.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
          <Lock className="w-3.5 h-3.5" />
          <span>Guest Checkout • No Account Required</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Complete Your Order</h1>
        <p className="text-slate-600 text-sm">
          Enter your campaign requirements below to proceed to crypto payment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Customer Contact Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
              1. Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-hidden ${
                    errors.customerName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@company.com"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-hidden ${
                    errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Phone Number (Optional)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 307 393 9979"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Used exclusively for live order status updates via Telegram/WhatsApp support.
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Business & Platform Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
              2. Campaign Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business / Brand Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Dental Clinic"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-hidden ${
                      errors.businessName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Website (Optional)
                  </label>
                  <input
                    type="url"
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    placeholder="e.g. https://apexdental.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Profile / Listing URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  value={platformUrl}
                  onChange={(e) => setPlatformUrl(e.target.value)}
                  placeholder="e.g. https://maps.google.com/?cid=123456 or https://trustpilot.com/review/..."
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-hidden ${
                    errors.platformUrl ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.platformUrl && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.platformUrl}</p>
                )}
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Paste the direct link to your business profile on Google, Trustpilot, Facebook, etc.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Instructions / Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Add target keywords, preferred schedule pacing, or feedback notes..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Service Selection & Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6 sticky top-24">
            <h2 className="font-bold text-slate-900 text-xl border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <span>Order Summary</span>
            </h2>

            {/* Service Selector Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Selected Service</label>
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  setSelectedPackageName('');
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.price !== null ? `$${s.price}` : 'Quote'})
                  </option>
                ))}
              </select>
            </div>

            {/* Package Selector if applicable */}
            {currentService.packages && currentService.packages.length > 0 && (
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Package Tier</label>
                <select
                  value={selectedPackageName}
                  onChange={(e) => setSelectedPackageName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden"
                >
                  <option value="">Standard Base Tier</option>
                  {currentService.packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} - ${pkg.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Control */}
            <QuantitySelector
              quantity={quantity}
              minQuantity={currentService.minimumQuantity || 1}
              onChange={(q) => setQuantity(q)}
              unitPrice={unitPrice}
            />

            {/* Price Calculations */}
            <div className="space-y-2 text-sm pt-4 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discount:</span>
                <span className="text-emerald-600">-$0.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="text-indigo-600 text-xl">${total}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed space-y-1 border border-slate-100">
              <div className="font-semibold text-slate-700">✓ Guest Checkout Guarantee</div>
              <p>Your details are protected. An official order number (e.g. URS-2026-XXXXX) will be generated for your payment submission.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
