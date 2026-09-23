import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Lock, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getRiskBadgeColor } from '../utils/threatIcons.js';

interface ReportStatusResponse {
  id: string;
  status: 'Submitted' | 'Under Review' | 'Investigating' | 'Resolved';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  incidentType: string;
  dateOfIncident: string;
  createdAt: string;
  updatedAt: string;
  actionTakenNotes?: string;
  maskedName: string;
  maskedEmail: string;
}

export const StatusPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const [reportIdInput, setReportIdInput] = useState(queryId);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    setReportData(null);

    try {
      const res = await fetch(`/api/reports/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'No report found with this ID.');
      }
      setReportData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to check report status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryId) {
      setReportIdInput(queryId);
      fetchStatus(queryId);
    }
  }, [queryId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(reportIdInput);
  };

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'Under Review': return 1;
      case 'Investigating': return 2;
      case 'Resolved': return 3;
      default: return 0;
    }
  };

  const steps = [
    { name: 'Submitted', desc: 'Case received & logged' },
    { name: 'Under Review', desc: 'Classification & triage' },
    { name: 'Investigating', desc: 'Threat pattern analysis' },
    { name: 'Resolved', desc: 'Advisory or escalation completed' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Clock className="w-3.5 h-3.5" />
          <span>REAL-TIME AUDIT DISPATCH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Track Incident Report Status
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Enter your unique Report ID (e.g. <span className="font-mono text-cyan-400">SN-2026-0001</span>) to query the real-time status of your incident.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider block">
          Enter Incident Report ID
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="e.g. SN-2026-0001"
              value={reportIdInput}
              onChange={(e) => setReportIdInput(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 uppercase text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !reportIdInput.trim()}
            className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Searching...' : 'Check Status'}
          </button>
        </div>

        {/* Demo Hint */}
        <div className="text-xs text-slate-400 font-mono flex items-center justify-between pt-1">
          <span>Demo IDs to try:</span>
          <div className="flex items-center gap-2">
            {['SN-2026-0001', 'SN-2026-0002', 'SN-2026-0003'].map((demoId) => (
              <button
                key={demoId}
                type="button"
                onClick={() => {
                  setReportIdInput(demoId);
                  fetchStatus(demoId);
                }}
                className="text-cyan-400 hover:underline"
              >
                {demoId}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/30 text-red-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Report Not Found</h4>
            <p className="text-xs text-red-200/80 leading-relaxed">
              {error}. Please check the Report ID format (SN-YYYY-XXXX) or submit a new report if you have not filed one yet.
            </p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="py-12 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-mono text-slate-400">Querying cryptographic report ledger...</p>
        </div>
      )}

      {/* Report Details Card */}
      {reportData && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-8 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">REPORT IDENTIFIER:</span>
                <span className="text-xl font-mono font-extrabold text-cyan-400">{reportData.id}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Category: <strong className="text-white">{reportData.incidentType}</strong> • Filed: {new Date(reportData.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold ${getRiskBadgeColor(reportData.riskLevel)}`}>
                {reportData.riskLevel} RISK
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                STATUS: {reportData.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Resolution Pipeline Progress
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {steps.map((s, idx) => {
                const currentIdx = getStatusStepIndex(reportData.status);
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div 
                    key={s.name}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCompleted 
                        ? 'bg-slate-950/80 border-cyan-500/40 text-cyan-300' 
                        : 'bg-slate-950/30 border-slate-800/80 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold">STAGE 0{idx + 1}</span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                      )}
                    </div>
                    <div className={`text-sm font-bold ${isCompleted ? 'text-white' : 'text-slate-500'}`}>
                      {s.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {s.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Triage Log / Actions Taken */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
              <FileText className="w-4 h-4" />
              <span>INCIDENT AUDIT DISPATCH & NOTES</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-mono">
              {reportData.actionTakenNotes || 'No specific notes logged yet. Case pending analyst review.'}
            </p>
            <div className="text-[11px] text-slate-500 font-mono pt-1">
              Last status update: {new Date(reportData.updatedAt).toLocaleString()}
            </div>
          </div>

          {/* Masked Privacy Protection Notice */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Privacy Guard: Reporter Identity Masked ({reportData.maskedName} • {reportData.maskedEmail})</span>
            </div>
            <span className="text-emerald-400 font-semibold">PII SHIELD ACTIVE</span>
          </div>

          {/* Report Another CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400">Encountered an ongoing threat?</span>
            <Link
              to="/report"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Submit Another Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
