import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { MessageSquareQuote, Copy, RefreshCw, Edit3, Check, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AIResponseGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const AIResponseGeneratorPage: React.FC<AIResponseGeneratorPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [customerReview, setCustomerReview] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [reviewType, setReviewType] = useState('Positive');
  const [tone, setTone] = useState('Professional');

  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedResponse, setSuggestedResponse] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!customerReview.trim()) {
      showToast('Please paste or type the customer review text.', 'error');
      return;
    }

    setIsGenerating(true);
    setCopied(false);

    try {
      const response = await fetch('/api/tools/response-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerReview,
          businessName,
          businessType,
          reviewType,
          tone,
        }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setSuggestedResponse(data.response);
      } else {
        // Fallback generator
        const fallbackResp = generateFallbackResponse({
          customerReview,
          businessName,
          businessType,
          reviewType,
          tone,
        });
        setSuggestedResponse(fallbackResp);
      }
    } catch (err) {
      const fallbackResp = generateFallbackResponse({
        customerReview,
        businessName,
        businessType,
        reviewType,
        tone,
      });
      setSuggestedResponse(fallbackResp);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFallbackResponse = (params: any) => {
    const { businessName, reviewType, tone } = params;
    const bName = businessName ? businessName : 'our team';

    if (reviewType === 'Positive') {
      return `Thank you so much for taking the time to leave us such a wonderful review! Everyone at ${bName} is thrilled to hear about your positive experience. We truly appreciate your feedback and look forward to serving you again soon!`;
    } else if (reviewType === 'Negative') {
      return `Thank you for bringing your feedback to our attention. At ${bName}, we strive to provide the highest quality service, and we sincerely apologize that your experience fell short of your expectations. We would appreciate the opportunity to make things right. Please reach out directly to our management team so we can address your concerns.`;
    } else {
      return `Thank you for taking the time to share your feedback with ${bName}. We appreciate hearing from our customers as it helps us continuously improve our services. Please don't hesitate to reach out if there is anything else we can assist you with.`;
    }
  };

  const handleCopy = () => {
    if (!suggestedResponse) return;
    navigator.clipboard.writeText(suggestedResponse);
    setCopied(true);
    showToast('Response copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Paste Customer Review',
      description: 'Copy and paste the review you received from Google, Yelp, or Trustpilot.',
    },
    {
      step: 2,
      title: 'Set Response Parameters',
      description: 'Specify your business name, sentiment (positive/negative), and preferred tone.',
    },
    {
      step: 3,
      title: 'Get Professional Reply',
      description: 'Copy or tweak the brand-aligned response draft before posting publicly.',
    },
  ];

  const featuresList = [
    {
      title: 'De-escalation Logic',
      description: 'Handles negative feedback with diplomatic, calm, and constructive phrasing.',
    },
    {
      title: 'Brand Voice Alignment',
      description: 'Select from Professional, Friendly, Appreciative, Apologetic, Concise, or Warm.',
    },
    {
      title: 'SEO & Keyword Friendly',
      description: 'Naturally incorporates business keywords to strengthen local profile relevance.',
    },
    {
      title: 'Privacy Preserving',
      description: 'Never exposes customer names, account numbers, or internal company data.',
    },
  ];

  const faqsList = [
    {
      question: 'Can the AI Response Generator respond to negative reviews?',
      answer: 'Yes! It is specifically engineered to craft calm, respectful, and de-escalating responses to negative feedback while directing sensitive issues to private customer support.',
    },
    {
      question: 'Can I customize the tone of the response?',
      answer: 'Yes. You can select between Professional, Friendly, Appreciative, Apologetic, Concise, and Warm tone styles.',
    },
    {
      question: 'Does it publish the response automatically?',
      answer: 'No. The tool provides a draft. You can edit and copy the response to publish manually on your review platform dashboard.',
    },
    {
      question: 'Why is replying to customer reviews important?',
      answer: 'Responding to reviews proves to prospective buyers that your business values customer service. Search engines also favor active profiles that engage regularly with customer feedback.',
    },
  ];

  return (
    <ToolLayout
      title="AI Response Generator"
      slug="ai-response-generator"
      icon={<MessageSquareQuote className="w-7 h-7" />}
      shortDescription="Write better, professional responses to customer reviews in seconds."
      howItWorks={howItWorksSteps}
      features={featuresList}
      faqs={faqsList}
      onNavigate={onNavigate}
      seoTitle="AI Review Response Generator | USA Review Store"
      seoDescription="Create professional response drafts for genuine customer reviews with our free AI-powered review response assistant."
    >
      <div className="space-y-6">
        <form onSubmit={handleGenerate} className="space-y-5">
          {/* Customer Review Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Paste Customer Review <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={customerReview}
              onChange={(e) => setCustomerReview(e.target.value)}
              rows={4}
              placeholder="e.g. 'Great service! The team arrived on time and fixed our AC unit in under an hour. Will definitely use them again!'"
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-slate-900"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Business Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Business Name (Optional)
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Apex Plumbing & HVAC"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-sm font-medium"
              />
            </div>

            {/* Business Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Business Category (Optional)
              </label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="e.g. HVAC & Home Contracting"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-sm font-medium"
              />
            </div>
          </div>

          {/* Review Type & Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Review Sentiment</label>
              <div className="grid grid-cols-3 gap-2">
                {['Positive', 'Neutral', 'Negative'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setReviewType(type)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      reviewType === type
                        ? type === 'Positive'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : type === 'Negative'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Response Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Appreciative">Appreciative</option>
                <option value="Apologetic">Apologetic</option>
                <option value="Concise">Concise</option>
                <option value="Warm">Warm</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting Professional Reply...</span>
              </>
            ) : (
              <>
                <MessageSquareQuote className="w-4 h-4" />
                <span>Generate Response Draft</span>
              </>
            )}
          </button>
        </form>

        {/* OUTPUT RESPONSE SECTION */}
        {suggestedResponse && (
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Suggested Response
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Done Editing' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Response'}</span>
                </button>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={suggestedResponse}
                onChange={(e) => setSuggestedResponse(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-2xl border border-indigo-300 focus:ring-2 focus:ring-indigo-200 text-sm font-medium text-slate-900 bg-white"
              />
            ) : (
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 text-sm sm:text-base leading-relaxed font-normal shadow-inner whitespace-pre-wrap border border-slate-800">
                {suggestedResponse}
              </div>
            )}
          </div>
        )}

        {/* RESPONSE TIPS SECTION */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Best Practices For Public Responses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span> Be prompt, professional, and composed
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span> Acknowledge the customer's specific experience
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span> Avoid sharing private customer or billing info
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span> Move sensitive disputes to offline support channels
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};
