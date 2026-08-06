import React, { useState, useEffect } from 'react';
import { SERVICES, SERVICE_CATEGORIES, searchServices } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { Search, Filter, SlidersHorizontal, Layers } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  initialQuery?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  useEffect(() => {
    // Parse query parameter from window location if present
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, []);

  const rawFiltered = searchServices(searchQuery, selectedCategory);

  const sortedServices = [...rawFiltered].sort((a, b) => {
    if (sortBy === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    if (sortBy === 'price-asc') {
      const pA = a.price ?? 9999;
      const pB = b.price ?? 9999;
      return pA - pB;
    }
    if (sortBy === 'price-desc') {
      const pA = a.price ?? -1;
      const pB = b.price ?? -1;
      return pB - pA;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
          <Layers className="w-4 h-4" />
          <span>Complete Reputation Service Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Reputation & Customer Feedback Services
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
          Select from our transparently priced reputation campaigns, monitoring workflows, profile optimizations, and review-request strategies.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, platforms, keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({SERVICES.length})
          </button>
          {SERVICE_CATEGORIES.map((cat) => {
            const count = SERVICES.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Count Bar */}
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{sortedServices.length}</strong> services
        </span>
        {searchQuery && (
          <span>
            Filtered by query: <strong className="text-slate-800">"{searchQuery}"</strong>
          </span>
        )}
      </div>

      {/* Grid Display */}
      {sortedServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service) => (
            <ServiceCard key={service.id} service={service} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <Filter className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Services Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We couldn't find any services matching "{searchQuery}". Try clearing your search or selecting a different category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
