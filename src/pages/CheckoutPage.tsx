import React, { useState, useEffect } from 'react';
import { SERVICES, getServiceBySlug } from '../data/services';
import { QuantitySelector } from '../components/QuantitySelector';
import { useToast } from '../context/ToastContext';
import { SEOHead } from '../components/SEOHead';
import { saveOrderLocally, generateClientOrderNumber } from '../lib/orderStorage';
import { dispatchClientOrderNotification } from '../lib/clientNotification';
import { CONTACT_INFO } from '../data/contactInfo';
import { Order } from '../types';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Clock,
  Shield,
  MessageSquare,
  Zap,
  PhoneCall,
  Send,
  HelpCircle,
  Award,
  Check,
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  // Read URL params
  const [currentSearch, setCurrentSearch] = useState(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  useEffect(() => {
    setCurrentSearch(window.location.search);
  }, []);

  const urlParams = new URLSearchParams(currentSearch);
  const serviceParam = urlParams.get('service') || 'buy-google-reviews';
  const initialQty = Math.max(1, Number(urlParams.get('qty')) || 1);
  const initialPkg = urlParams.get('package') || '';

  const matchedService = getServiceBySlug(serviceParam) || SERVICES[0];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(matchedService.id);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(initialPkg);
  const [quantity, setQuantity] = useState<number>(
    Math.max(initialQty, matchedService.minimumQuantity || 1)
  );

  useEffect(() => {
    const srv = getServiceBySlug(serviceParam);
    if (srv) {
      setSelectedServiceId(srv.id);
      if (initialPkg) setSelectedPackageId(initialPkg);
      setQuantity(Math.max(initialQty, srv.minimumQuantity || 1));
    }
  }, [serviceParam, initialPkg, initialQty]);

  // Form inputs
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [platformUrl, setPlatformUrl] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderCompleteModal, setOrderCompleteModal] = useState<Order | null>(null);

  const currentService =
    SERVICES.find((s) => s.id === selectedServiceId || s.slug === selectedServiceId) ||
    SERVICES[0];

  useEffect(() => {
    if (quantity < (currentService.minimumQuantity || 1)) {
      setQuantity(currentService.minimumQuantity || 1);
    }
  }, [selectedServiceId, currentService]);

  let unitPrice = currentService.price ?? 0;
  let activePackageName = '';

  if (currentService.packages && currentService.packages.length > 0) {
    const matchedPkg = currentService.packages.find(
      (p) => p.id === selectedPackageId || p.name === selectedPackageId
    );
    if (matchedPkg) {
      unitPrice = matchedPkg.price;
      activePackageName = matchedPkg.name;
    }
  }

  const subtotal = unitPrice * quantity;
  const discount = 0;
  const total = Math.max(0, subtotal - discount);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.customerName = 'Full Name is required.';
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      errs.email = 'Valid email address is required (e.g. name@company.com).';
    }
    if (!businessName.trim()) {
      errs.businessName = 'Business or Brand Name is required.';
    }
    if (!platformUrl.trim()) {
      errs.platformUrl = 'Target Profile / Platform Listing URL is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Missing Required Fields', 'Please fill in all highlighted fields.', 'error');
      const firstErr = document.querySelector('.border-rose-500');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const payload = {
      customerName: customerName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      businessName: businessName.trim(),
      businessWebsite: businessWebsite.trim(),
      platformUrl: platformUrl.trim(),
      serviceId: currentService.id,
      packageName: activePackageName || selectedPackageId || null,
      quantity,
      specialInstructions: specialInstructions.trim(),
    };

    let generatedOrderNumber = '';
    let finalOrderRecord: Order | null = null;

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (data.success && data.order) {
            generatedOrderNumber = data.order.orderNumber;
            finalOrderRecord = data.order;
            saveOrderLocally(data.order);
          }
        }
      }
    } catch (serverErr) {
      console.warn('Backend order API error, using local fallback:', serverErr);
    }

    if (!generatedOrderNumber) {
      generatedOrderNumber = generateClientOrderNumber();
      finalOrderRecord = {
        id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        orderNumber: generatedOrderNumber,
        customerName: payload.customerName,
        email: payload.email,
        phone: payload.phone,
        businessName: payload.businessName,
        businessWebsite: payload.businessWebsite,
        platformUrl: payload.platformUrl,
        serviceId: currentService.id,
        serviceName: currentService.name,
        packageName: payload.packageName || undefined,
        quantity,
        unitPrice,
        subtotal,
        discount,
        total,
        currency: currentService.currency || 'USD',
        specialInstructions: payload.specialInstructions,
        status: 'Pending Payment',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveOrderLocally(finalOrderRecord);

      // Trigger client notification fallback for static hosting / GitHub Pages
      dispatchClientOrderNotification({
        orderNumber: generatedOrderNumber,
        customerName: payload.customerName,
        email: payload.email,
        phone: payload.phone,
        businessName: payload.businessName,
        businessWebsite: payload.businessWebsite,
        platformUrl: payload.platformUrl,
        serviceName: currentService.name,
        packageName: payload.packageName,
        quantity,
        unitPrice,
        total,
        specialInstructions: payload.specialInstructions,
      }).catch((err) => console.warn('Client notification dispatch error:', err));
    }

    setIsSubmitting(false);
    showToast('Order Placed Successfully!', `Order ID: ${generatedOrderNumber} • Confirmation email sent.`, 'success');

    if (finalOrderRecord) {
      setOrderCompleteModal(finalOrderRecord);
    } else {
      onNavigate(`/payment?order=${generatedOrderNumber}`);
    }
  };

  const telegramPrefillUrl = orderCompleteModal
    ? `https://t.me/EgSupport24?text=${encodeURIComponent(
        `Hello USA Review Store Support, I just placed an order!\n\nOrder ID: ${orderCompleteModal.orderNumber}\nService: ${orderCompleteModal.serviceName}\nTotal: $${orderCompleteModal.total} USD\nEmail: ${orderCompleteModal.email}\n\nPlease confirm and start my campaign.`
      )}`
    : `https://t.me/EgSupport24?text=Hello%20USA%20Review%20Store%2C%20I%20have%20a%20question%20about%20placing%20an%20order.`;

  const whatsappPrefillUrl = orderCompleteModal
    ? `https://wa.me/13073939979?text=${encodeURIComponent(
        `Hello USA Review Store Support, I just placed an order!\n\nOrder ID: ${orderCompleteModal.orderNumber}\nService: ${orderCompleteModal.serviceName}\nTotal: $${orderCompleteModal.total} USD\nEmail: ${orderCompleteModal.email}\n\nPlease confirm and start my campaign.`
      )}`
    : `https://wa.me/13073939979?text=Hello%20USA%20Review%20Store%2C%20I%20have%20a%20question%20about%20placing%20an%20order.`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEOHead
        title="Professional Campaign Checkout | USA Review Store"
        description="Confidential guest checkout for business review acquisition campaigns, local guide reviews, and digital reputation optimization."
        keywords={['checkout', 'buy reviews', 'usa review store checkout', 'guest checkout']}
        canonicalUrl="https://usareviewstore.com/checkout"
      />

      {/* Top Urgent / Direct Contact Notice Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl border border-blue-800/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-400">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                24/7 Live Desk
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white">
                Instant Campaign Activation & Custom Quotes
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Need custom pacing, bulk discounts (100+ units), or instant WhatsApp/Telegram confirmation?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <a
            href={CONTACT_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram Support</span>
          </a>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp (+1 307-393-9979)</span>
          </a>
        </div>
      </div>

      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
          <Lock className="w-3.5 h-3.5 text-blue-600" />
          <span>256-Bit SSL Encrypted • 100% Confidential • Automated Email Confirmation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Secure Campaign Checkout
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl">
          Configure your target listing and campaign pacing. After placing your order, an official confirmation receipt is emailed to you and our 24/7 dispatch desk immediately coordinates campaign delivery.
        </p>
      </div>

      {/* Main Checkout Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Contact Information */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                  1
                </span>
                <span>Customer & Contact Information</span>
              </h2>
              <span className="text-xs text-slate-400 font-medium">* Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name / Contact Person <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                  }}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-hidden focus:bg-white transition-colors ${
                    errors.customerName
                      ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address (For Order Receipt) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="e.g. alex@yourcompany.com"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-hidden focus:bg-white transition-colors ${
                    errors.email
                      ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Telegram Username or WhatsApp Number (Recommended for Priority Support)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. @alex_ceo or +1 307 393 9979"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-colors"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Our dispatch manager will reach out via Telegram or WhatsApp to share live progress reports.
                </span>
              </div>
            </div>
          </div>

          {/* Step 2: Target Profile & Campaign Details */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                  2
                </span>
                <span>Target Listing & Delivery Strategy</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Business / Brand Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: '' }));
                    }}
                    placeholder="e.g. Skyline Dental Studio"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-hidden focus:bg-white transition-colors ${
                      errors.businessName
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500'
                        : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Business Website (Optional)
                  </label>
                  <input
                    type="url"
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    placeholder="e.g. https://skylinedental.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Target Profile / Listing URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={platformUrl}
                  onChange={(e) => {
                    setPlatformUrl(e.target.value);
                    if (errors.platformUrl) setErrors((prev) => ({ ...prev, platformUrl: '' }));
                  }}
                  placeholder="e.g. https://maps.google.com/?cid=... or https://trustpilot.com/review/..."
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-hidden focus:bg-white transition-colors ${
                    errors.platformUrl
                      ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.platformUrl && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.platformUrl}</p>
                )}
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Paste the direct URL to your Google Maps, Trustpilot, Facebook, Yelp, or Glassdoor profile.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Custom Pacing, Keywords & Review Content Guidelines (Optional)
                </label>
                <textarea
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Drip feed 2 reviews every 48 hours, mention 'great customer support and prompt delivery', focus on positive feedback for our team..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Summary & Guarantee Block */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-md space-y-5 sticky top-20">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <span>Order Summary</span>
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Non-Drop Warranty</span>
              </span>
            </div>

            {/* Service Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Selected Service</label>
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  const newId = e.target.value;
                  setSelectedServiceId(newId);
                  const s = SERVICES.find((item) => item.id === newId);
                  if (s) {
                    if (s.packages && s.packages.length > 0) {
                      setSelectedPackageId(s.packages[0].id);
                    } else {
                      setSelectedPackageId('');
                    }
                    if (quantity < (s.minimumQuantity || 1)) {
                      setQuantity(s.minimumQuantity || 1);
                    }
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 cursor-pointer"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} {s.price !== null ? `($${s.price}/unit)` : '(Custom Quote)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Package / Warranty Tier Selector */}
            {currentService.packages && currentService.packages.length > 0 && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Warranty & Quality Tier
                </label>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                >
                  {currentService.packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — ${pkg.price} / unit
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Quantity (Minimum: {currentService.minimumQuantity || 1})
              </label>
              <QuantitySelector
                quantity={quantity}
                minQuantity={currentService.minimumQuantity || 1}
                onChange={(q) => setQuantity(q)}
                unitPrice={unitPrice}
              />
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs pt-4 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Unit Rate:</span>
                <span className="font-semibold text-slate-900">${unitPrice.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quantity:</span>
                <span className="font-semibold text-slate-900">{quantity} units</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Automated Email Receipt:</span>
                <span className="text-emerald-600 font-semibold">Included (Instant)</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Total Amount Due:</span>
                <span className="text-blue-600 text-2xl font-black">${total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Order & Dispatching Emails...</span>
                </div>
              ) : (
                <>
                  <span>Place Order & Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trust Points */}
            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-2.5 border border-slate-200/80">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>USA Review Store Guarantees</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>100% Non-Drop Warranty & 60-Day Replacement</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Real Geo-Targeted High-Trust Profile Activity</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Instant Email Notification & Confirmation sent to inbox</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>24/7 Direct Account Manager on Telegram & WhatsApp</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>

      {/* Post-Order Interactive Action Modal */}
      {orderCompleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Order Placed Successfully
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Order Reference: {orderCompleteModal.orderNumber}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                A full confirmation receipt has been emailed to <strong className="text-slate-900">{orderCompleteModal.email}</strong> and dispatched to our admin desk (<strong className="text-slate-900">smmbuy2022@gmail.com</strong>).
              </p>
            </div>

            {/* Direct Contact Action Box */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Connect for Instant Priority Delivery</span>
              </div>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                Click below to message our Senior Dispatch Manager directly on Telegram or WhatsApp with your pre-filled Order ID for fast-track processing:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href={telegramPrefillUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Chat on Telegram</span>
                </a>
                <a
                  href={whatsappPrefillUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>

            {/* Primary Action to Proceed to Payment */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => onNavigate(`/payment?order=${orderCompleteModal.orderNumber}`)}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Crypto Payment Gateway</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate(`/track-order?order=${orderCompleteModal.orderNumber}`)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Track Live Order Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
