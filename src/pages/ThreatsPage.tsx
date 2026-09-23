import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  X,
  ExternalLink,
  Shield,
  Clock,
  Layers
} from 'lucide-react';
import { Threat } from '../types/index.js';
import { THREAT_ICONS, getRiskBadgeColor } from '../utils/threatIcons.js';

export const ThreatsPage: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeThreatModal, setActiveThreatModal] = useState<Threat | null>(null);

  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');

  useEffect(() => {
    fetch('/api/threats')
      .then((res) => res.json())
      .then((data) => {
        setThreats(data);
        setLoading(false);
        if (highlightId && Array.isArray(data)) {
          const match = data.find((t: Threat) => t.id === highlightId);
          if (match) setActiveThreatModal(match);
        }
      })
      .catch((err) => {
        console.error('Failed to load threats:', err);
        setLoading(false);
      });
  }, [highlightId]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(threats.map((t) => t.category));
    return ['ALL', ...Array.from(set)];
  }, [threats]);

  // Filtered threats
  const filteredThreats = useMemo(() => {
    return threats.filter((threat) => {
      const matchesSearch = 
        threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.commonTargets.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRisk = selectedRisk === 'ALL' || threat.riskLevel === selectedRisk;
      const matchesCat = selectedCategory === 'ALL' || threat.category === selectedCategory;

      return matchesSearch && matchesRisk && matchesCat;
    });
  }, [threats, searchQuery, selectedRisk, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span>THREAT INTELLIGENCE REPOSITORY • 14 VERIFIED TAXONOMIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Comprehensive Cyber-Threat Directory
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Detailed technical blueprints, warning indicators, preventative checklists, and emergency remediation protocols for every major digital threat confronting modern internet users.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search threats by keyword, target, or attack vector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Risk Level Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div>
            Showing <span className="font-bold text-cyan-400">{filteredThreats.length}</span> of {threats.length} threat models
          </div>
          {(searchQuery || selectedRisk !== 'ALL' || selectedCategory !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRisk('ALL');
                setSelectedCategory('ALL');
              }}
              className="text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Threats Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-mono text-slate-400">Loading verified threat models from API...</p>
        </div>
      ) : filteredThreats.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Threat Profiles Matched</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try tweaking your search keywords or resetting your risk level filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRisk('ALL');
              setSelectedCategory('ALL');
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThreats.map((threat) => {
            const Icon = THREAT_ICONS[threat.id] || ShieldAlert;
            return (
              <div 
                key={threat.id} 
                className="p-6 rounded-2xl cyber-card flex flex-col justify-between group cursor-pointer"
                onClick={() => setActiveThreatModal(threat)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${getRiskBadgeColor(threat.riskLevel)}`}>
                      {threat.riskLevel} RISK
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-cyan-400/90 font-medium">
                      {threat.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                      {threat.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {threat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-900/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                    Inspect Blueprint <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <Link
                    to={`/report?type=${encodeURIComponent(threat.name)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-slate-500 hover:text-red-400 transition-colors"
                  >
                    Report Incident
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Threat Detail Modal Drawer */}
      {activeThreatModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${getRiskBadgeColor(activeThreatModal.riskLevel)}`}>
                    {activeThreatModal.riskLevel} RISK
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    CATEGORY: {activeThreatModal.category.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  {activeThreatModal.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveThreatModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Attack Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeThreatModal.description}
              </p>
            </div>

            {/* Warning Signs */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Warning Signs & Tell-Tale Indicators
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeThreatModal.warningSigns.map((sign, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-amber-950/15 border border-amber-500/20">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Tips */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Prevention & Hardening Measures
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeThreatModal.preventionTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-950/15 border border-emerald-500/20">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to do if affected */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Emergency Remediation (What to do if affected)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeThreatModal.whatToDoIfAffected.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-950/15 border border-red-500/20">
                    <span className="text-red-400 font-bold">!</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Audience */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono flex items-center justify-between">
              <span className="text-slate-400">High-Risk Targets:</span>
              <span className="text-cyan-300">{activeThreatModal.commonTargets}</span>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-800">
              <button
                onClick={() => setActiveThreatModal(null)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800"
              >
                Close Blueprint
              </button>
              <Link
                to={`/report?type=${encodeURIComponent(activeThreatModal.name)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 text-center flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Report {activeThreatModal.name} Incident
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
