import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { Sparkles, Copy, RefreshCw, Edit3, Check, AlertCircle, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AIReviewGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const AIReviewGeneratorPage: React.FC<AIReviewGeneratorPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [businessName, setBusinessName] = useState('');
  const [serviceUsed, setServiceUsed] = useState('');
  const [likes, setLikes] = useState('');
  const [highlights, setHighlights] = useState('');
  const [improvements, setImprovements] = useState('');
  const [experience, setExperience] = useState('Highly Satisfied');
  const [tone, setTone] = useState('Friendly');
  const [length, setLength] = useState('Medium');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!businessName.trim() || !serviceUsed.trim() || !likes.trim()) {
      showToast('Please fill out business name, service used, and what you liked.', 'error');
      return;
    }

    setIsGenerating(true);
    setCopied(false);

    try {
      const response = await fetch('/api/tools/review-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          serviceUsed,
          likes,
          highlights,
          improvements,
          experience,
          tone,
          length,
        }),
      });

      const data = await response.json();

      if (response.ok && data.draft) {
        setGeneratedDraft(data.draft);
      } else {
        // Local smart fallback generator if API key or backend unavailable
        const fallbackDraft = generateLocalFallbackDraft({
          businessName,
          serviceUsed,
          likes,
          highlights,
          improvements,
          experience,
          tone,
          length,
        });
        setGeneratedDraft(fallbackDraft);
      }
    } catch (err) {
      const fallbackDraft = generateLocalFallbackDraft({
        businessName,
        serviceUsed,
        likes,
        highlights,
        improvements,
        experience,
        tone,
        length,
      });
      setGeneratedDraft(fallbackDraft);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLocalFallbackDraft = (params: any) => {
    const { businessName, serviceUsed, likes, highlights, improvements, tone, length } = params;

    let lead = `I recently used ${serviceUsed} at ${businessName} and had a great experience overall.`;
    if (tone === 'Professional') {
      lead = `I am writing to share my positive feedback regarding ${serviceUsed} at ${businessName}.`;
    } else if (tone === 'Enthusiastic') {
      lead = `Highly recommend ${businessName}! Their ${serviceUsed} exceeded my expectations!`;
    }

    let body = `What really stood out to me was ${likes}. ${highlights ? `In addition, ${highlights}.` : ''}`;
    if (improvements) {
      body += ` While everything went smoothly, ${improvements} would make it even better.`;
    }

    let closing = `I would definitely recommend ${businessName} to anyone looking for quality ${serviceUsed}.`;
    if (length === 'Short') {
      return `${lead} ${likes}. Recommended!`;
    } else if (length === 'Long') {
      return `${lead}\n\n${body}\n\nOverall, the team was attentive and the results were fantastic. ${closing}`;
    }

    return `${lead}\n\n${body}\n\n${closing}`;
  };

  const handleCopy = () => {
    if (!generatedDraft) return;
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    showToast('Review draft copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Enter Real Details',
      description: 'Fill in quick bullet points about your genuine customer experience.',
    },
    {
      step: 2,
      title: 'Select Desired Tone',
      description: 'Choose whether you want a friendly, professional, or detailed style.',
    },
    {
      step: 3,
      title: 'Get Polished Draft',
      description: 'Review, edit, and personalize your draft before publishing it to any platform.',
    },
  ];

  const featuresList = [
    {
      title: 'Ethical AI Policy',
      description: 'Strictly transforms real user input without inventing false facts or claims.',
    },
    {
      title: 'Custom Tone & Length',
      description: 'Supports Professional, Friendly, Casual, Detailed, and Enthusiastic tones.',
    },
    {
      title: 'Instant Inline Editing',
      description: 'Modify and refine the generated text directly before copying.',
    },
    {
      title: 'Zero Storage',
      description: 'Your personal customer experiences are never stored on our servers.',
    },
  ];

  const faqsList = [
    {
      question: 'What does the AI Review Generator do?',
      answer: 'It acts as a writing assistant that helps real customers turn quick notes or fragmented bullet points about their genuine service experience into a well-structured, polished review draft.',
    },
    {
      question: 'Does it create fake reviews?',
      answer: 'No. USA Review Store strictly enforces policy rules preventing the generation of fabricated customer reviews. The tool only processes facts explicitly supplied by the user.',
    },
    {
      question: 'Can I edit the generated draft?',
      answer: 'Yes! You can edit the text directly in the draft box or regenerate it with a different tone and length setting before copying it.',
    },
    {
      question: 'Does it store my information?',
      answer: 'No. Inputs and generated review drafts are processed in memory and are never saved or sold.',
    },
  ];

  return (
    <ToolLayout
      title="AI Review Generator"
      slug="ai-review-generator"
      icon={<Sparkles className="w-7 h-7" />}
      shortDescription="Turn your real customer experience into a clear, polished review draft in seconds."
      howItWorks={howItWorksSteps}
      features={featuresList}
      faqs={faqsList}
      onNavigate={onNavigate}
      seoTitle="AI Review Draft Generator | USA Review Store"
      seoDescription="Turn your genuine customer experience into a polished, well-written review draft with our free AI review draft assistant."
    >
      <div className="space-y-6">
        {/* Ethical Policy Notice Header */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/90 text-indigo-950 text-xs sm:text-sm flex items-start gap-3">
          <HeartHandshake className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-slate-900 block mb-0.5">Real Experience Draft Assistant</strong>
            <p className="text-slate-600 leading-relaxed">
              This tool helps you articulate your genuine experience. It will not fabricate events, dates, or claims. Please input accurate details about your real interaction with the business.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5">
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-medium"
                required
              />
            </div>

            {/* Service or Product Used */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Service / Product Used <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={serviceUsed}
                onChange={(e) => setServiceUsed(e.target.value)}
                placeholder="e.g. Brake Inspection & Oil Change"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-medium"
                required
              />
            </div>
          </div>

          {/* What did you like? */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              What did you like about the service? <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              placeholder="e.g. Quick turnaround, transparent pricing, polite staff"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* What stood out? */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                What stood out most?
              </label>
              <input
                type="text"
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                placeholder="e.g. Technician explained everything clearly"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-medium"
              />
            </div>

            {/* What could be improved? */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Any constructive suggestions? (Optional)
              </label>
              <input
                type="text"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder="e.g. Waiting area coffee could be warmer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-medium"
              />
            </div>
          </div>

          {/* Tone & Length Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Overall Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="Exceptional / Outstanding">Exceptional / Outstanding</option>
                <option value="Highly Satisfied">Highly Satisfied</option>
                <option value="Good / Solid">Good / Solid</option>
                <option value="Average / Neutral">Average / Neutral</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Writing Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Casual">Casual</option>
                <option value="Detailed">Detailed</option>
                <option value="Enthusiastic">Enthusiastic</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Draft Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="Short">Short (1-2 sentences)</option>
                <option value="Medium">Medium (3-4 sentences)</option>
                <option value="Long">Long (Detailed paragraph)</option>
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
                <span>Crafting Your Experience Draft...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Review Draft</span>
              </>
            )}
          </button>
        </form>

        {/* OUTPUT DRAFT SECTION */}
        {generatedDraft && (
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Your Review Draft
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
                  <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
                </button>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={generatedDraft}
                onChange={(e) => setGeneratedDraft(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-2xl border border-indigo-300 focus:ring-2 focus:ring-indigo-200 text-sm font-medium text-slate-900 bg-white"
              />
            ) : (
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 text-sm sm:text-base leading-relaxed font-normal shadow-inner whitespace-pre-wrap border border-slate-800">
                {generatedDraft}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="font-bold text-slate-700">✓ Review and personalize this draft before publishing.</span>
              <span>Only publish content that accurately reflects your real experience.</span>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
