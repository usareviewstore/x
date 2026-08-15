import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { Link2, Copy, ExternalLink, QrCode, Check, Info, HelpCircle, ArrowRight, Search } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ReviewLinkGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const ReviewLinkGeneratorPage: React.FC<ReviewLinkGeneratorPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [inputVal, setInputVal] = useState('ChIJN1t_tDeuEmsRUsoyG83frY4');
  const [generatedLink, setGeneratedLink] = useState(
    'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4'
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const clean = inputVal.trim();
    if (!clean) {
      showToast('Please enter a Google Place ID or Business Profile URL.', 'error');
      return;
    }

    let placeId = clean;

    // Check if input is a URL containing placeid or place_id or /place/
    if (clean.includes('http://') || clean.includes('https://')) {
      const placeIdMatch = clean.match(/placeid=([A-Za-z0-9_-]+)/i) || clean.match(/place_id=([A-Za-z0-9_-]+)/i);
      if (placeIdMatch && placeIdMatch[1]) {
        placeId = placeIdMatch[1];
      } else {
        // If it's a general google URL without explicit placeid, keep clean or wrap safely
        setGeneratedLink(clean);
        showToast('Generated direct review link!', 'success');
        return;
      }
    }

    const finalUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
    setGeneratedLink(finalUrl);
    showToast('Direct Google Review link generated successfully!', 'success');
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    showToast('Review link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGoToQrCode = () => {
    if (!generatedLink) return;
    onNavigate(`/tools/review-qr-code?url=${encodeURIComponent(generatedLink)}`);
  };

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Locate Your Place ID',
      description: 'Enter your official Google Place ID or your Google Business Profile URL.',
    },
    {
      step: 2,
      title: 'Generate Direct URL',
      description: 'Our system formats the official 1-click review link structure.',
    },
    {
      step: 3,
      title: 'Test & Share',
      description: 'Test the link in a new browser tab or convert it into a printable QR code.',
    },
  ];

  const featuresList = [
    {
      title: '1-Click Review Dialog',
      description: 'Automatically opens the star-rating dialog box when customers click.',
    },
    {
      title: 'Official Google Schema',
      description: 'Uses search.google.com/local/writereview?placeid=... standard syntax.',
    },
    {
      title: 'Seamless QR Integration',
      description: 'Pass your generated review URL directly into our Review QR Code tool.',
    },
    {
      title: 'Zero Redirection Delay',
      description: 'Direct link with no intermediate tracking pages or extra friction.',
    },
  ];

  const faqsList = [
    {
      question: 'What is a Google Review link?',
      answer: 'It is a direct hyperlink that, when clicked, immediately opens the Google Business review dialog box with 5 blank stars, eliminating the need for customers to manually search for your business.',
    },
    {
      question: 'How do I find my Google Place ID?',
      answer: 'You can find your Place ID using the official Google Place ID Finder tool (developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) or by looking up your business name.',
    },
    {
      question: 'Can I test the generated review link?',
      answer: 'Yes! Click the "Open Link" button below to open your link in a new browser window to confirm it opens your review box.',
    },
    {
      question: 'Will this link work on mobile phones?',
      answer: 'Yes! It works seamlessly across iOS Safari, Android Chrome, desktop browsers, and embedded apps.',
    },
  ];

  return (
    <ToolLayout
      title="Review Link Generator"
      slug="review-link-generator"
      icon={<Link2 className="w-7 h-7" />}
      shortDescription="Turn your Google Business Profile URL or Place ID into a direct 1-click review link."
      howItWorks={howItWorksSteps}
      features={featuresList}
      faqs={faqsList}
      onNavigate={onNavigate}
      seoTitle="Google Review Link Generator | USA Review Store"
      seoDescription="Generate a direct 1-click Google review link using your Place ID or Business Profile URL so customers can leave feedback effortlessly."
    >
      <div className="space-y-6">
        <form onSubmit={handleGenerate} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Google Place ID or Google Business URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-mono text-sm font-semibold text-slate-900"
                required
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
            <p className="text-xs text-slate-500">
              Paste your Google Place ID (e.g. <code>ChIJN1t_...</code>) or your Google Business Profile URL.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Link2 className="w-4 h-4" />
            <span>Generate Direct Review Link</span>
          </button>
        </form>

        {/* OUTPUT LINK SECTION */}
        {generatedLink && (
          <div className="pt-6 border-t border-slate-200/80 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 block">
                Your Direct Review Link
              </span>
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm break-all border border-slate-800 shadow-inner flex items-center justify-between gap-3">
                <span>{generatedLink}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Link!' : 'Copy Review Link'}</span>
              </button>

              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-indigo-600" />
                <span>Test / Open Link</span>
              </a>

              <button
                type="button"
                onClick={handleGoToQrCode}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Create QR Code →</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Tip:</strong> Test your link in an incognito browser window before printing or emailing to ensure it opens your review box directly.
              </span>
            </div>
          </div>
        )}

        {/* GUIDE TO FIND PLACE ID */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            How to Find Your Google Place ID in 2 Steps
          </h3>
          <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
            <li>
              Visit the official{' '}
              <a
                href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-bold underline"
              >
                Google Place ID Finder
              </a>
              .
            </li>
            <li>Type your business name and address in the map search bar, then copy the generated Place ID code.</li>
          </ol>
        </div>
      </div>
    </ToolLayout>
  );
};
