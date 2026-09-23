import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookMarked, 
  ExternalLink, 
  Search, 
  Phone, 
  ShieldAlert, 
  Lock, 
  Building2, 
  Smartphone, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { ResourceItem } from '../types/index.js';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/resources')
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load resources:', err);
        setLoading(false);
      });
  }, []);

  const categories = [
    'ALL',
    'Emergency Help',
    'Government Resources',
    'Awareness Guides',
    'Password Security',
    'Banking Safety',
    'Social Media Safety',
    'Student Safety'
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <BookMarked className="w-3.5 h-3.5" />
          <span>CYBERSECURITY DEFENSE LIBRARY • OFFICIAL HELPLINES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Verified Cybersecurity Resources
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Access vetted statutory portals, emergency fraud freezing hotlines, password vault recommendations, and digital trust guides. All links are validated against official standards.
        </p>
      </div>

      {/* Emergency Callout Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-red-950/20 border border-red-500/30 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm font-mono">
            <Phone className="w-4 h-4" />
            <span>NATIONAL 24/7 EMERGENCY FINANCIAL CYBERCRIME HELPLINE</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Victim of a digital banking or UPI fraud right now?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Dial <strong>1930</strong> immediately. Reporting within the "Golden Hour" enables law enforcement and the banking nexus to freeze fund accounts before cash withdrawal.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
          <a
            href="tel:1930"
            className="w-full py-3 px-4 rounded-xl font-bold text-center bg-red-500 hover:bg-red-400 text-white text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
          >
            <Phone className="w-4 h-4" />
            <span>Call 1930 Hotline</span>
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-semibold text-center bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-sm flex items-center justify-center gap-2"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources by title or agency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="md:col-span-5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-cyan-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Resource Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === c
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {c === 'ALL' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-mono text-slate-400">Loading statutory resources from database...</p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <p className="text-sm text-slate-400">No resources found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl cyber-card flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-semibold">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-900/80">
                <a
                  href={item.url}
                  target={item.url.startsWith('http') ? '_blank' : '_self'}
                  rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Visit Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
