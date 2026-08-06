import React from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data/services';

interface BlogPostPageProps {
  slug: string;
  onNavigate?: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-black text-slate-900">Article Not Found</h1>
        <p className="text-xs text-slate-600">The requested article could not be located.</p>
        <button
          onClick={() => onNavigate && onNavigate('/blog')}
          className="px-6 py-2.5 bg-orange-600 text-white font-bold text-xs rounded-xl"
        >
          Return to Blog
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
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Breadcrumb & Article Header */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog Insights
          </button>

          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-extrabold uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
              />
              <div>
                <div className="font-bold text-white text-sm">{post.author.name}</div>
                <div className="text-[11px] text-slate-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-orange-400" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg mb-10 bg-slate-900">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-[320px] sm:h-[420px] object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          <div
            className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-orange-600 prose-a:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Embedded Service Promo CTA Card */}
        <div className="mt-10 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-6">
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

        {/* Related Articles */}
        <div className="mt-14 space-y-6">
          <h3 className="text-xl font-black text-slate-900">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <div
                key={related.id}
                onClick={() => onNavigate && onNavigate(`/blog/${related.slug}`)}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:border-orange-300 transition-all cursor-pointer space-y-3 group"
              >
                <div className="h-32 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={related.featuredImage}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  {related.category}
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-orange-600 line-clamp-2 leading-snug">
                  {related.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
