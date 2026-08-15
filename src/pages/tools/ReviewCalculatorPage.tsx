import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { Calculator, Star, AlertCircle, CheckCircle, HelpCircle, ArrowRight, TrendingUp, Info } from 'lucide-react';

interface ReviewCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const ReviewCalculatorPage: React.FC<ReviewCalculatorPageProps> = ({ onNavigate }) => {
  const [currentRating, setCurrentRating] = useState<string>('4.2');
  const [targetRating, setTargetRating] = useState<string>('4.5');
  const [currentReviews, setCurrentReviews] = useState<string>('120');

  const [result, setResult] = useState<{
    neededReviews: number | null;
    message?: string;
    isSuccess?: boolean;
    projectedTotalReviews?: number;
    projectedRating?: number;
  } | null>({
    neededReviews: 72,
    isSuccess: true,
    projectedTotalReviews: 192,
    projectedRating: 4.5,
  });

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const R = parseFloat(currentRating);
    const T = parseFloat(targetRating);
    const N = parseInt(currentReviews, 10);

    if (isNaN(R) || isNaN(T) || isNaN(N) || R < 1 || R > 5 || N < 0) {
      setResult({
        neededReviews: null,
        message: 'Please enter valid numerical values (Rating between 1.0 and 5.0, Reviews >= 0).',
        isSuccess: false,
      });
      return;
    }

    if (T <= R) {
      setResult({
        neededReviews: 0,
        message: 'Your current rating is already at or above your target rating.',
        isSuccess: true,
        projectedTotalReviews: N,
        projectedRating: R,
      });
      return;
    }

    if (T >= 5.0) {
      setResult({
        neededReviews: null,
        message: 'The target rating must be below 5.0 (it requires an infinite number of 5-star reviews to reach a mathematically pure 5.0 average).',
        isSuccess: false,
      });
      return;
    }

    // Mathematical formula: x = N * (T - R) / (5 - T)
    const x = (N * (T - R)) / (5 - T);

    if (!isFinite(x) || x < 0) {
      setResult({
        neededReviews: null,
        message: 'Unable to calculate a finite solution with these parameters.',
        isSuccess: false,
      });
      return;
    }

    const neededExact = Math.ceil(x);
    const projectedTotal = N + neededExact;
    const projectedRatingVal = Math.round(((R * N + 5 * neededExact) / projectedTotal) * 10) / 10;

    setResult({
      neededReviews: neededExact,
      isSuccess: true,
      projectedTotalReviews: projectedTotal,
      projectedRating: projectedRatingVal,
    });
  };

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Enter Current Metrics',
      description: 'Input your business’s current star rating and total count of published reviews.',
    },
    {
      step: 2,
      title: 'Set Target Goal',
      description: 'Define the target score you wish to achieve (e.g. 4.5 or 4.8 stars).',
    },
    {
      step: 3,
      title: 'Calculate 5-Star Gap',
      description: 'Get an instant, precise mathematical calculation of 5-star reviews required.',
    },
  ];

  const featuresList = [
    {
      title: 'Exact Math Formula',
      description: 'Uses the true weighted average algebraic formula: x = N(T-R)/(5-T).',
    },
    {
      title: 'Visual Goal Progress',
      description: 'Compare your starting average against your goal with a live progress indicator.',
    },
    {
      title: 'Projected Total Count',
      description: 'See total reviews needed in total to reach your requested milestone.',
    },
    {
      title: 'Cross-Platform Utility',
      description: 'Works for Google, Trustpilot, Yelp, Amazon, Facebook, and custom review systems.',
    },
  ];

  const faqsList = [
    {
      question: 'What does the review calculator calculate?',
      answer: 'It calculates the exact minimum number of additional consecutive 5-star customer reviews required to mathematically lift your average score from your current rating to your target rating.',
    },
    {
      question: 'How accurate is the estimate?',
      answer: 'The calculation is 100% mathematically accurate based on standard arithmetic average rules. However, actual platform scores may round numbers differently or apply platform-specific decay algorithms.',
    },
    {
      question: 'Why can actual platform ratings differ slightly?',
      answer: 'Platforms like Google or Trustpilot sometimes apply hidden review weighting (e.g. giving recent reviews more weight than old reviews) or round scores to 1 decimal place.',
    },
    {
      question: 'Can the calculator guarantee a platform rating?',
      answer: 'No. This calculator provides a mathematical estimation tool. It does not control external review platforms or guarantee ranking algorithms.',
    },
  ];

  return (
    <ToolLayout
      title="Review Calculator"
      slug="review-calculator"
      icon={<Calculator className="w-7 h-7" />}
      shortDescription="Calculate how many additional 5-star reviews are mathematically required to reach your target average rating."
      howItWorks={howItWorksSteps}
      features={featuresList}
      faqs={faqsList}
      onNavigate={onNavigate}
      seoTitle="Review Calculator | USA Review Store"
      seoDescription="Calculate how many additional 5-star reviews are mathematically needed to reach your target average rating on Google, Trustpilot, or any platform."
    >
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Current Rating */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Current Rating (1.0 - 5.0)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                value={currentRating}
                onChange={(e) => setCurrentRating(e.target.value)}
                placeholder="4.2"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-900 text-base"
                required
              />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          {/* Target Rating */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Target Rating (e.g., 4.5)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="4.9"
                value={targetRating}
                onChange={(e) => setTargetRating(e.target.value)}
                placeholder="4.5"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-900 text-base"
                required
              />
              <TrendingUp className="w-4 h-4 text-indigo-600 absolute right-3.5 top-3.5" />
            </div>
          </div>

          {/* Current Reviews Count */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Current Review Count
            </label>
            <input
              type="number"
              min="0"
              value={currentReviews}
              onChange={(e) => setCurrentReviews(e.target.value)}
              placeholder="120"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-900 text-base"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calculator className="w-4 h-4" />
          <span>Calculate 5-Star Reviews Needed</span>
        </button>
      </form>

      {/* RESULT SECTION */}
      {result && (
        <div className="pt-6 border-t border-slate-200/80 space-y-6">
          {!result.isSuccess ? (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Calculation Notice</p>
                <p className="mt-0.5">{result.message}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Primary Output Display */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl relative overflow-hidden">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-300 block">
                  Estimated Additional 5-Star Reviews Needed
                </span>
                <div className="text-5xl sm:text-6xl font-black text-amber-400 tracking-tight flex items-center justify-center gap-3">
                  <span>{result.neededReviews}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  To raise your average score from <strong className="text-white">{currentRating}★</strong> to{' '}
                  <strong className="text-white">{targetRating}★</strong> with {currentReviews} existing reviews, you need approximately{' '}
                  <strong className="text-amber-300">{result.neededReviews} additional 5-star reviews</strong>.
                </p>

                {/* Visual Progress Bar */}
                <div className="pt-2 max-w-md mx-auto space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Start: {currentRating}★</span>
                    <span className="text-amber-400">Target: {targetRating}★</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(10, ((parseFloat(targetRating) - parseFloat(currentRating)) / (5 - parseFloat(currentRating))) * 100)
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Current Rating</span>
                  <div className="text-lg font-black text-slate-900">{currentRating} ★</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Target Goal</span>
                  <div className="text-lg font-black text-indigo-600">{targetRating} ★</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Current Total</span>
                  <div className="text-lg font-black text-slate-900">{currentReviews}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">New Total Needed</span>
                  <div className="text-lg font-black text-emerald-600">{result.projectedTotalReviews}</div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Disclaimer:</strong> This calculator provides a mathematical estimate only based on equal weighting. Actual platform ratings may be affected by rounding conventions, review weighting algorithms, deleted or filtered reviews, and platform-specific updates. USA Review Store promotes authentic customer feedback collection.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};
