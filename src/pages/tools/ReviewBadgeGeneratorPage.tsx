import React, { useState, useRef } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { Award, Star, Copy, Download, Check, AlertCircle, Eye, ShieldCheck, Code, CheckSquare } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ReviewBadgeGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const ReviewBadgeGeneratorPage: React.FC<ReviewBadgeGeneratorPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [businessName, setBusinessName] = useState('Apex Auto Repair');
  const [reviewUrl, setReviewUrl] = useState('https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4');
  const [rating, setRating] = useState('4.9');
  const [reviewCount, setReviewCount] = useState('142');
  const [confirmedAccurate, setConfirmedAccurate] = useState(true);

  const [badgeStyle, setBadgeStyle] = useState<'minimal' | 'classic' | 'modern' | 'compact'>('classic');
  const [badgeTheme, setBadgeTheme] = useState<'slate' | 'indigo' | 'dark' | 'gold'>('indigo');

  const [copiedHtml, setCopiedHtml] = useState(false);
  const badgePreviewRef = useRef<HTMLDivElement>(null);

  // Escape HTML string to prevent XSS
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const cleanUrl = escapeHtml(reviewUrl.trim() || '#');
  const cleanName = escapeHtml(businessName.trim() || 'Business');
  const cleanRating = escapeHtml(rating.trim() || '5.0');
  const cleanCount = escapeHtml(reviewCount.trim() || '0');

  // Generate embeddable HTML string
  const generateBadgeHtml = () => {
    if (badgeStyle === 'compact') {
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:#1e293b;color:#ffffff;border-radius:9999px;font-family:system-ui,sans-serif;font-size:13px;font-weight:700;text-decoration:none;">
  <span style="color:#f59e0b;">★ ${cleanRating}</span>
  <span style="opacity:0.8;">(${cleanCount} reviews)</span>
</a>`;
    }

    if (badgeStyle === 'minimal') {
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:12px 18px;background:#ffffff;color:#0f172a;border:1px solid #e2e8f0;border-radius:12px;font-family:system-ui,sans-serif;text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
  <div style="font-size:16px;font-weight:800;color:#0f172a;"><span style="color:#f59e0b;">★</span> ${cleanRating} / 5.0</div>
  <div style="font-size:12px;color:#64748b;margin-top:2px;">Based on ${cleanCount} customer reviews</div>
</a>`;
    }

    if (badgeStyle === 'modern') {
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:16px 20px;background:linear-gradient(135deg, #4f46e5, #3730a3);color:#ffffff;border-radius:16px;font-family:system-ui,sans-serif;text-decoration:none;box-shadow:0 10px 15px -3px rgba(79,70,229,0.3);">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#c7d2fe;">${cleanName}</div>
  <div style="font-size:22px;font-weight:900;margin:4px 0;color:#fbbf24;">★ ${cleanRating} <span style="font-size:14px;color:#ffffff;font-weight:600;">(${cleanCount})</span></div>
  <div style="font-size:12px;font-weight:700;color:#ffffff;display:flex;align-items:center;gap:4px;">Review Us On Google &rarr;</div>
</a>`;
    }

    // Classic default
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:220px;padding:16px;background:#ffffff;border:1px solid #cbd5e1;border-radius:16px;font-family:system-ui,sans-serif;text-decoration:none;text-align:center;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
  <div style="font-size:12px;font-weight:800;color:#334155;text-transform:uppercase;letter-spacing:0.5px;">${cleanName}</div>
  <div style="font-size:28px;font-weight:900;color:#0f172a;margin:6px 0;"><span style="color:#f59e0b;">★</span> ${cleanRating}</div>
  <div style="font-size:12px;color:#64748b;font-weight:600;">${cleanCount} Verified Reviews</div>
  <div style="margin-top:12px;padding:6px;background:#f8fafc;border-radius:8px;font-size:11px;font-weight:700;color:#2563eb;">Leave A Review</div>
</a>`;
  };

  const handleCopyHtml = () => {
    if (!confirmedAccurate) {
      showToast('Please confirm that the rating and review count are accurate before copying.', 'error');
      return;
    }
    const html = generateBadgeHtml();
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    showToast('Badge HTML code copied to clipboard!', 'success');
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleDownloadPng = () => {
    if (!confirmedAccurate) {
      showToast('Please confirm that the rating and review count are accurate before downloading.', 'error');
      return;
    }

    // Canvas drawing helper for PNG download
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = badgeTheme === 'dark' ? '#0f172a' : badgeTheme === 'indigo' ? '#3730a3' : '#ffffff';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, 24);
    ctx.fill();

    if (badgeTheme === 'slate') {
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // Text
    ctx.textAlign = 'center';
    ctx.fillStyle = badgeTheme === 'dark' || badgeTheme === 'indigo' ? '#c7d2fe' : '#475569';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(businessName.toUpperCase(), 200, 50);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(`★ ${rating}`, 200, 110);

    ctx.fillStyle = badgeTheme === 'dark' || badgeTheme === 'indigo' ? '#ffffff' : '#0f172a';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`${reviewCount} Verified Reviews`, 200, 155);

    ctx.fillStyle = badgeTheme === 'indigo' ? '#fbbf24' : '#2563eb';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Review Us On Google', 200, 195);

    const link = document.createElement('a');
    link.download = `${businessName.toLowerCase().replace(/\s+/g, '-')}-review-badge.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast('Badge PNG downloaded!', 'success');
  };

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Input Business Stats',
      description: 'Enter your business name, target review link, rating score, and total review count.',
    },
    {
      step: 2,
      title: 'Select Design Style',
      description: 'Choose between Minimal, Classic, Modern, or Compact badge layouts.',
    },
    {
      step: 3,
      title: 'Embed HTML On Site',
      description: 'Copy the safe HTML snippet or download a high-resolution PNG image.',
    },
  ];

  const featuresList = [
    {
      title: 'XSS & Script Free',
      description: 'Outputs pure HTML/CSS without external JavaScript files or security risks.',
    },
    {
      title: '100% Mobile Responsive',
      description: 'Scales elegantly on smartphones, tablets, and desktop website footers.',
    },
    {
      title: 'Live Interactive Preview',
      description: 'Instant visual feedback as you adjust colors, typography, and ratings.',
    },
    {
      title: 'SEO Link Preservation',
      description: 'Includes rel="noopener noreferrer" and direct hyperlinks to boost local signals.',
    },
  ];

  const faqsList = [
    {
      question: 'Can I customize the badge design?',
      answer: 'Yes! You can choose between Minimal, Classic, Modern, and Compact layouts, as well as multiple background theme colors.',
    },
    {
      question: 'Can I embed the badge on my website?',
      answer: 'Yes. Simply click "Copy HTML Code" and paste the snippet into your website header, footer, or sidebar HTML widget (works on WordPress, Shopify, Wix, Squarespace, and Webflow).',
    },
    {
      question: 'Can I change the rating displayed?',
      answer: 'You should only enter your business’s true, published star rating and review count. Displaying deceptive scores damages customer trust.',
    },
    {
      question: 'Does the badge collect website visitor data?',
      answer: 'No. The generated badge code contains no scripts, tracking cookies, or analytics beacons.',
    },
  ];

  return (
    <ToolLayout
      title="Review Badge Generator"
      slug="review-badge-generator"
      icon={<Award className="w-7 h-7" />}
      shortDescription="Create an embeddable rating badge for your website to showcase your true customer reviews."
      howItWorks={howItWorksSteps}
      features={featuresList}
      faqs={faqsList}
      onNavigate={onNavigate}
      seoTitle="Embeddable Review Badge Generator | USA Review Store"
      seoDescription="Generate a clean, embeddable rating badge for your website to highlight your customer score and total review count."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Business Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Apex Auto Repair"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-sm font-medium"
              required
            />
          </div>

          {/* Review Destination URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Review Destination URL <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              value={reviewUrl}
              onChange={(e) => setReviewUrl(e.target.value)}
              placeholder="https://search.google.com/local/writereview?placeid=..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-sm font-medium"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Rating */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Current Rating (1.0 - 5.0)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-sm font-bold"
              />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 absolute right-3.5 top-3" />
            </div>
          </div>

          {/* Review Count */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Total Review Count
            </label>
            <input
              type="number"
              min="0"
              value={reviewCount}
              onChange={(e) => setReviewCount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-sm font-bold"
            />
          </div>
        </div>

        {/* Style & Theme Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Badge Layout Style</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'classic', label: 'Classic' },
                { id: 'minimal', label: 'Minimal' },
                { id: 'modern', label: 'Modern' },
                { id: 'compact', label: 'Compact' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setBadgeStyle(st.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    badgeStyle === st.id
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Theme Color</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'slate', label: 'Light Slate' },
                { id: 'indigo', label: 'Indigo Accent' },
                { id: 'dark', label: 'Dark Navy' },
                { id: 'gold', label: 'Gold Star' },
              ].map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setBadgeTheme(th.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    badgeTheme === th.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accuracy Confirmation Checkbox (REQUIRED) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3">
          <input
            type="checkbox"
            id="confirmAccurate"
            checked={confirmedAccurate}
            onChange={(e) => setConfirmedAccurate(e.target.checked)}
            className="mt-1 w-4 h-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="confirmAccurate" className="text-xs font-medium text-slate-700 cursor-pointer leading-relaxed">
            <strong className="font-bold text-slate-900">Accuracy Confirmation:</strong> I confirm that the rating score ({rating}★) and review count ({reviewCount}) displayed are accurate and represent true customer metrics.
          </label>
        </div>

        {/* LIVE BADGE PREVIEW SECTION */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              Live Badge Preview
            </span>
            <span className="text-[11px] text-slate-400">Interactive live output</span>
          </div>

          <div className="p-8 rounded-3xl bg-slate-100/80 border border-slate-200 flex items-center justify-center min-h-[160px]">
            <div ref={badgePreviewRef} className="max-w-full">
              {badgeStyle === 'compact' && (
                <a
                  href={cleanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full font-sans text-xs font-bold shadow-md transition-transform hover:scale-105 ${
                    badgeTheme === 'dark'
                      ? 'bg-slate-900 text-white'
                      : badgeTheme === 'indigo'
                      ? 'bg-indigo-600 text-white'
                      : badgeTheme === 'gold'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-slate-900 border border-slate-200'
                  }`}
                >
                  <span className="text-amber-400 font-extrabold">★ {rating}</span>
                  <span className="opacity-80">({reviewCount} reviews)</span>
                </a>
              )}

              {badgeStyle === 'minimal' && (
                <a
                  href={cleanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-5 py-3 rounded-2xl font-sans shadow-md border transition-transform hover:scale-105 ${
                    badgeTheme === 'dark'
                      ? 'bg-slate-900 text-white border-slate-800'
                      : badgeTheme === 'indigo'
                      ? 'bg-indigo-900 text-white border-indigo-800'
                      : 'bg-white text-slate-900 border-slate-200'
                  }`}
                >
                  <div className="text-sm font-black flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{rating} / 5.0 Rating</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Based on {reviewCount} customer reviews</div>
                </a>
              )}

              {badgeStyle === 'modern' && (
                <a
                  href={cleanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block p-5 rounded-3xl font-sans shadow-lg transition-transform hover:scale-105 ${
                    badgeTheme === 'dark'
                      ? 'bg-slate-900 text-white'
                      : badgeTheme === 'gold'
                      ? 'bg-amber-600 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">
                    {businessName || 'Business Name'}
                  </div>
                  <div className="text-2xl font-black my-1 text-amber-300 flex items-center gap-1">
                    <span>★ {rating}</span>
                    <span className="text-xs text-white font-normal">({reviewCount} reviews)</span>
                  </div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>Review Us On Google</span>
                    <span>→</span>
                  </div>
                </a>
              )}

              {badgeStyle === 'classic' && (
                <a
                  href={cleanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block w-56 p-5 rounded-2xl font-sans text-center shadow-md border transition-transform hover:scale-105 ${
                    badgeTheme === 'dark'
                      ? 'bg-slate-900 text-white border-slate-800'
                      : badgeTheme === 'indigo'
                      ? 'bg-indigo-950 text-white border-indigo-900'
                      : 'bg-white text-slate-900 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                    {businessName || 'Business Name'}
                  </div>
                  <div className="text-3xl font-black my-2 text-slate-900 dark:text-white flex items-center justify-center gap-1">
                    <span className="text-amber-400">★</span> {rating}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">{reviewCount} Verified Reviews</div>
                  <div className="mt-3 py-1.5 px-3 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-xs">
                    Leave A Review
                  </div>
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyHtml}
              className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedHtml ? <Check className="w-4 h-4 text-emerald-300" /> : <Code className="w-4 h-4" />}
              <span>{copiedHtml ? 'Copied HTML Code!' : 'Copy HTML Embed Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Badge PNG</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Disclaimer: Only display accurate ratings and review counts to maintain customer trust and search engine compliance.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};
