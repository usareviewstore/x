import React, { useState, useEffect, useMemo } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ListOrdered,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  BookOpen,
  MessageCircle,
  ChevronRight,
  Award,
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { SEOHead } from '../components/SEOHead';

interface BlogPostPageProps {
  slug: string;
  onNavigate?: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [activeTocId, setActiveTocId] = useState<string>('');

  // Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Process HTML content to inject IDs into H2 and H3 tags and extract Table of Contents
  const { processedHtml, toc } = useMemo(() => {
    if (!post?.content) return { processedHtml: '', toc: [] };

    const tocList: { id: string; text: string; level: number }[] = [];
    let headingIndex = 0;

    const modifiedContent = post.content.replace(/<h([23])(.*?)>(.*?)<\/h\1>/gi, (match, levelStr, attrs, text) => {
      headingIndex++;
      const level = parseInt(levelStr, 10);
      const plainText = text.replace(/<[^>]+>/g, '').trim();
      const generatedId = `section-${headingIndex}-${plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

      tocList.push({ id: generatedId, text: plainText, level });

      return `<h${levelStr} id="${generatedId}" ${attrs}>${text}</h${levelStr}>`;
    });

    return { processedHtml: modifiedContent, toc: tocList };
  }, [post?.content]);

  // Highlight active TOC item on scroll
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-black text-slate-900">Article Not Found</h1>
        <p className="text-xs text-slate-600">The requested article could not be located in our blog directory.</p>
        <button
          onClick={() => onNavigate && onNavigate('/blog')}
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          Return to Blog Directory
        </button>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const featuredServices = SERVICES.slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offset = 90; // Header offset
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveTocId(id);
    }
  };

  return (
    <article className="min-h-screen bg-slate-50/70 pb-20 relative">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-indigo-600 z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <SEOHead
        title={post.metaTitle || `${post.title} | USA Review Store`}
        description={post.metaDescription || post.excerpt}
        keywords={post.tags.join(', ')}
        canonicalUrl={`https://usareviewstore.com/blog/${post.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
        articleMeta={{
          title: post.title,
          description: post.excerpt,
          publishedTime: post.publishedAt,
          authorName: post.author.name,
          category: post.category,
        }}
      />

      {/* Top Header Hero */}
      <header className="bg-slate-900 text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
            <button
              onClick={() => onNavigate && onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              onClick={() => onNavigate && onNavigate('/blog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-orange-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {post.category}
            </span>
          </nav>

          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> {post.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
                <Clock className="w-3 h-3 text-amber-400" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white max-w-4xl">
              {post.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
              {post.excerpt}
            </p>
          </div>

          {/* Author & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/90 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-orange-500 shadow-sm"
              />
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  {post.author.name}
                  <Award className="w-3.5 h-3.5 text-orange-400" title="Verified Reputation Specialist" />
                </div>
                <div className="text-[11px] text-slate-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <span className="hidden sm:flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {post.publishedAt}
              </span>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 font-semibold text-xs transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-orange-400" /> Share
              </button>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-slate-300 bg-slate-800/80 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 font-semibold text-xs transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content Column */}
          <main className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-900 group">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-[280px] sm:h-[400px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Key Takeaways / Executive Summary (SEO Priority) */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 rounded-2xl p-6 border-2 border-orange-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-orange-700 font-black text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-orange-600" /> Key Takeaways for Readers
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Core Focus:</strong> Actionable guidelines on {post.title.toLowerCase()}.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Verified Insights:</strong> Written & reviewed by field-tested local SEO reputation experts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Guaranteed Execution:</strong> Step-by-step methods designed for immediate implementation.</span>
                </li>
              </ul>
            </div>

            {/* Mobile Table of Contents (Shown on smaller screens) */}
            {toc.length > 0 && (
              <div className="block lg:hidden bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                  <ListOrdered className="w-4 h-4 text-orange-600" /> Table of Contents
                </div>
                <nav className="space-y-1.5 text-xs">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className={`block py-1 px-2 rounded-lg transition-colors ${
                        item.level === 3 ? 'pl-5 text-slate-600' : 'font-semibold text-slate-800'
                      } hover:bg-orange-50 hover:text-orange-600`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Article Main Text Body with CSS .blog-prose */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />

              {/* Tags List */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-orange-600" /> Article Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-bold bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 px-3 py-1 rounded-lg border border-slate-200 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Helpful Article Feedback Box */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <div className="text-xs font-black text-slate-900">Was this article helpful to you?</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Your feedback helps us refine our research guides.</div>
                </div>

                {feedback ? (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Thank you for your feedback!
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFeedback('yes')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm transition-all cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> Yes
                    </button>
                    <button
                      onClick={() => setFeedback('no')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm transition-all cursor-pointer"
                    >
                      <ThumbsDown className="w-3.5 h-3.5 text-rose-500" /> No
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Author Biography Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-orange-500/30 shrink-0 shadow-md"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{post.author.name}</h3>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200 self-center sm:self-auto">
                    {post.author.role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized in digital reputation strategy, Local SEO optimization, review velocity management, and Google Business Profile safety guidelines with 8+ years of industry experience.
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck className="w-4 h-4" /> Expert Verified Article
                  </span>
                </div>
              </div>
            </div>

            {/* Embedded Service Promo CTA Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Boost Your Online Reputation
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black">
                  Ready to Accelerate Your Google & Trustpilot Reviews?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  USA Review Store provides genuine, sticky, and geo-targeted 5-star reviews with up to 30 days replacement warranty.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {featuredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => onNavigate && onNavigate(`/services/${service.slug}`)}
                    className="bg-slate-800/80 hover:bg-slate-800 p-3.5 rounded-2xl border border-slate-700/80 cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-orange-400 transition-colors">
                        {service.name}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-bold mt-1">
                        ${service.price} / Review
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-orange-400 flex items-center gap-1 mt-3">
                      Order Now <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Desktop Right Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents Widget */}
              {toc.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 font-black text-slate-900 text-sm pb-2 border-b border-slate-100">
                    <ListOrdered className="w-4 h-4 text-orange-600" /> Table of Contents
                  </div>
                  <nav className="space-y-1 text-xs max-h-[380px] overflow-y-auto pr-1">
                    {toc.map((item) => {
                      const isActive = activeTocId === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => handleTocClick(e, item.id)}
                          className={`block py-1.5 px-2.5 rounded-lg transition-all ${
                            item.level === 3 ? 'pl-5 text-slate-500 text-[11px]' : 'font-bold text-slate-800'
                          } ${
                            isActive
                              ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                              : 'hover:bg-orange-50 hover:text-orange-600'
                          }`}
                        >
                          {item.text}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Recommended Services Widget */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm pb-2 border-b border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-orange-600" /> Top Review Services
                </div>
                <div className="space-y-2.5">
                  {featuredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => onNavigate && onNavigate(`/services/${service.slug}`)}
                      className="p-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all cursor-pointer group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {service.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Starting at <span className="text-emerald-600 font-bold">${service.price}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Support Banner */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-3">
                <div className="text-xs font-black text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" /> Need Custom Help?
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Have questions about review strategy or negative review disputes? Chat with our team 24/7 on WhatsApp or Telegram.
                </div>
                <a
                  href="https://t.me/usareviewstores"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all text-center"
                >
                  Chat with Expert Team
                </a>
              </div>

            </div>
          </aside>

        </div>

        {/* Related Articles Bottom Section */}
        <div className="mt-16 pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" /> More Recommended Insights
            </h3>
            <button
              onClick={() => onNavigate && onNavigate('/blog')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              View All Articles <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <div
                key={related.id}
                onClick={() => onNavigate && onNavigate(`/blog/${related.slug}`)}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:border-orange-300 hover:shadow-md transition-all cursor-pointer space-y-3 group"
              >
                <div className="h-36 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={related.featuredImage}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider">
                  {related.category}
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-orange-600 line-clamp-2 leading-snug">
                  {related.title}
                </h4>
                <div className="text-[11px] text-slate-500 line-clamp-2">
                  {related.excerpt}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};

