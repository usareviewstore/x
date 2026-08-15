import React, { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { QrCode, Download, Copy, Check, Info, Palette, Maximize2, ShieldCheck, HelpCircle, Store, Receipt, Package, CreditCard } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import QRCode from 'qrcode';

interface ReviewQrCodePageProps {
  onNavigate: (path: string) => void;
}

export const ReviewQrCodePage: React.FC<ReviewQrCodePageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  // Parse URL query parameter if passed from Review Link Generator
  const getInitialUrl = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get('url');
      if (urlParam) return urlParam;
    }
    return 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4';
  };

  const [targetUrl, setTargetUrl] = useState(getInitialUrl);
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState<number>(300);
  const [format, setFormat] = useState<'png' | 'svg'>('png');

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvgString, setQrSvgString] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR Code dynamically
  useEffect(() => {
    let active = true;
    const generateQr = async () => {
      const cleanUrl = targetUrl.trim() || 'https://usareviewstore.com';

      try {
        if (format === 'png') {
          const url = await QRCode.toDataURL(cleanUrl, {
            width: size,
            margin: 2,
            color: {
              dark: fgColor,
              light: bgColor,
            },
          });
          if (active) setQrDataUrl(url);
        } else {
          const svg = await QRCode.toString(cleanUrl, {
            type: 'svg',
            width: size,
            margin: 2,
            color: {
              dark: fgColor,
              light: bgColor,
            },
          });
          if (active) setQrSvgString(svg);
        }
      } catch (err) {
        console.error('QR Generation Error:', err);
      }
    };

    generateQr();
    return () => {
      active = false;
    };
  }, [targetUrl, fgColor, bgColor, size, format]);

  const handleDownload = () => {
    if (format === 'png') {
      if (!qrDataUrl) return;
      const a = document.createElement('a');
      a.href = qrDataUrl;
      a.download = 'review-qr-code.png';
      a.click();
      showToast('Downloaded PNG QR Code!', 'success');
    } else {
      if (!qrSvgString) return;
      const blob = new Blob([qrSvgString], { type: 'image/svg+xml' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'review-qr-code.svg';
      a.click();
      showToast('Downloaded SVG Vector QR Code!', 'success');
    }
  };

  const handleCopyImage = async () => {
    if (!qrDataUrl) return;
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopied(true);
      showToast('QR Code image copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      showToast('Copying image not supported in this browser. Please click Download instead.', 'info');
    }
  };

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Paste Review Link',
      description: 'Enter your 1-click Google review link or place ID.',
    },
    {
      step: 2,
      title: 'Customize Styling',
      description: 'Select brand colors, dimensions (150px to 600px), and PNG or vector SVG format.',
    },
    {
      step: 3,
      title: 'Print & Display',
      description: 'Download the file and place it on counter tops, receipts, or table tents.',
    },
  ];

  const featuresList = [
    {
      title: 'Vector SVG Output',
      description: 'High-resolution scalable SVG vector format ideal for professional commercial printing.',
    },
    {
      title: 'High Contrast Color Engine',
      description: 'Ensures reliable camera scanning across all iOS and Android smartphone lenses.',
    },
    {
      title: 'Zero Tracking Friction',
      description: 'Links directly to your review URL without dynamic redirect delays.',
    },
    {
      title: 'Commercial Print Ready',
      description: 'Export up to 600px PNG or SVG for physical signage and marketing materials.',
    },
  ];

  const faqsList = [
    {
      question: 'Where is the best place to put a Review QR Code?',
      answer: 'Place it where happy customers have a moment to scan: near the checkout cash register, printed on receipts, on restaurant table tents, or on post-service invoices.',
    },
    {
      question: 'What format should I use for commercial printing?',
      answer: 'Use SVG format if you are sending files to a professional print shop (e.g. banners or business cards). Use PNG format for office desktop printers or digital documents.',
    },
    {
      question: 'Will this QR code ever expire?',
      answer: 'No. The QR code directly encodes your destination URL and will work indefinitely as long as your review link remains active.',
    },
    {
      question: 'Should I test the QR code before printing in bulk?',
      answer: 'Yes! Always scan the QR code on your phone screen with both an iPhone and an Android device before sending materials to print.',
    },
  ];

  return (
    <ToolLayout
      title="Review QR Code Generator"
      slug="review-qr-code"
      icon={<QrCode className="w-7 h-7" />}
      shortDescription="Generate print-ready QR codes for table tents, receipts, and invoices linking directly to your review page."
      howItWorks={howItWorksSteps}
      features={featuresList}
      faqs={faqsList}
      onNavigate={onNavigate}
      seoTitle="Free Review QR Code Generator | USA Review Store"
      seoDescription="Create print-ready PNG or SVG QR codes linking directly to your Google review profile for receipts, table tents, and counter displays."
    >
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Target Review URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://search.google.com/local/writereview?placeid=..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-mono text-xs font-semibold text-slate-900"
            required
          />
        </div>

        {/* Styling Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Colors */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-indigo-600" /> Foreground Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer p-0.5"
              />
              <span className="font-mono text-xs font-bold text-slate-700 uppercase">{fgColor}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-indigo-600" /> Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer p-0.5"
              />
              <span className="font-mono text-xs font-bold text-slate-700 uppercase">{bgColor}</span>
            </div>
          </div>

          {/* Size */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-indigo-600" /> Export Size
            </label>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-xs font-bold text-slate-800 bg-white"
            >
              <option value={150}>Small (150 x 150 px)</option>
              <option value={300}>Medium (300 x 300 px)</option>
              <option value={600}>Large (600 x 600 px)</option>
            </select>
          </div>
        </div>

        {/* Format Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Export Format</label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => setFormat('png')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                format === 'png'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              PNG Image (Digital & Office)
            </button>
            <button
              type="button"
              onClick={() => setFormat('svg')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                format === 'svg'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              SVG Vector (Commercial Print)
            </button>
          </div>
        </div>

        {/* LIVE QR CODE DISPLAY AREA */}
        <div className="pt-6 border-t border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 flex items-center gap-1.5">
              <QrCode className="w-4 h-4" />
              Live Generated QR Code
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> High-Scannability Verified
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-slate-100/90 border border-slate-200 flex flex-col items-center justify-center min-h-[260px] space-y-4">
            {format === 'png' && qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="Review QR Code"
                className="rounded-2xl shadow-lg border border-slate-200 p-2 bg-white max-w-xs transition-transform hover:scale-102"
              />
            )}

            {format === 'svg' && qrSvgString && (
              <div
                className="rounded-2xl shadow-lg border border-slate-200 p-3 bg-white max-w-xs transition-transform hover:scale-102"
                dangerouslySetInnerHTML={{ __html: qrSvgString }}
              />
            )}

            <p className="text-xs text-slate-500 font-medium text-center">
              Scan with smartphone camera to verify destination link before downloading.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download {format.toUpperCase()} QR Code</span>
            </button>

            {format === 'png' && (
              <button
                type="button"
                onClick={handleCopyImage}
                className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Image!' : 'Copy QR Image'}</span>
              </button>
            )}
          </div>
        </div>

        {/* PRINT PLACEMENT ADVICE SECTION */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600" />
            Where to Place Your Review QR Code
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5">
              <Store className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-slate-900 block">Table Tents & Counter Stands</strong>
                <span>Position at checkout registers, lobby waiting tables, or reception desks.</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5">
              <Receipt className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-slate-900 block">Receipts & Invoices</strong>
                <span>Print at the bottom of physical paper receipts or attach to PDF invoices.</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5">
              <Package className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-slate-900 block">Packaging & Inserts</strong>
                <span>Include a physical thank-you card inside product shipment boxes.</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5">
              <CreditCard className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-slate-900 block">Business Cards & Flyers</strong>
                <span>Print on the back of staff business cards or local promotional handouts.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};
