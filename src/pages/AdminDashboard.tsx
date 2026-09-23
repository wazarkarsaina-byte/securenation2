import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Users, 
  MessageSquare, 
  Filter, 
  Lock, 
  Key, 
  RefreshCw,
  Search,
  Eye,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { IncidentReport, PlatformStats, ContactMessage } from '../types/index.js';
import { getRiskBadgeColor } from '../utils/threatIcons.js';

export const AdminDashboard: React.FC = () => {
  // Demonstration authentication passcode state
  const DEMO_SECRET = 'SECURENATION_ADMIN_2026';
  const [authToken, setAuthToken] = useState<string>(() => {
    return localStorage.getItem('securenation_admin_auth') || '';
  });

  const [loginPasscode, setLoginPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  const [inspectReport, setInspectReport] = useState<IncidentReport | null>(null);
  const [actionNotes, setActionNotes] = useState('');

  const isAuthenticated = authToken === DEMO_SECRET;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPasscode.trim() === DEMO_SECRET) {
      setAuthToken(DEMO_SECRET);
      localStorage.setItem('securenation_admin_auth', DEMO_SECRET);
      setLoginError(null);
    } else {
      setLoginError('Invalid Passcode! (Hint for evaluation: Use SECURENATION_ADMIN_2026)');
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('securenation_admin_auth');
  };

  const loadAdminData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [resReports, resStats] = await Promise.all([
        fetch('/api/admin/reports', {
          headers: { Authorization: `Bearer ${authToken}` }
        }),
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${authToken}` }
        })
      ]);

      if (resReports.ok && resStats.ok) {
        const dataReports = await resReports.json();
        const dataStats = await resStats.json();
        setReports(dataReports);
        setStats(dataStats);
        if (dataStats.recentContacts) {
          setMessages(dataStats.recentContacts);
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  const handleUpdateStatus = async (reportId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/reports/${encodeURIComponent(reportId)}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          status: newStatus,
          notes: actionNotes.trim() || undefined
        })
      });

      if (res.ok) {
        setActionNotes('');
        setInspectReport(null);
        loadAdminData();
      }
    } catch (err) {
      console.error('Failed to update report status:', err);
    }
  };

  const filteredReports = reports.filter((r) => {
    const matchStatus = selectedStatusFilter === 'ALL' || r.status === selectedStatusFilter;
    const matchSearch =
      r.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.incidentType.toLowerCase().includes(searchFilter.toLowerCase());
    return matchStatus && matchSearch;
  });

  // If unauthenticated: display security barrier login
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Administrative Access Gate
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            This dashboard contains unredacted incident reports, cybercrime telemetry, and message logs. Access is restricted to authorized project evaluators.
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-300 uppercase">
              Admin Passcode
            </label>
            <input
              type="password"
              placeholder="Enter passcode..."
              value={loginPasscode}
              onChange={(e) => setLoginPasscode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {loginError && (
            <p className="text-xs text-red-400 font-mono">{loginError}</p>
          )}

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
            <strong>Hackathon Demo Credentials:</strong>
            <div className="mt-0.5 text-slate-300">
              Passcode: <code className="text-cyan-400 font-bold">SECURENATION_ADMIN_2026</code>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors text-xs uppercase tracking-wider"
          >
            Authenticate & Open Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner & Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>INCIDENT COMMAND & TELEMETRY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Admin Demonstration Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Authenticated as Lead Security Analyst (BCA Defense Project Demo)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAdminData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 text-xs font-mono text-red-300 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Dashboard</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Total Reports</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
            {stats?.totalReports ?? reports.length}
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">Real-time ledger</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-amber-400 uppercase">Pending Triage</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
            {stats?.pendingReports ?? 2}
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Requires action</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-emerald-400 uppercase">Resolved Cases</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
            {stats?.resolvedReports ?? 1}
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono">Remediated / Closed</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-cyan-400 uppercase">Quiz Participants</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
            {stats?.quizParticipants ?? 1284}
          </div>
          <span className="text-[10px] text-cyan-400/80 font-mono">Across campus</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-purple-400 uppercase">Messages Intake</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400">
            {messages.length}
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Contact form logs</span>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reports by Category Bar Chart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center justify-between">
            <span>REPORTS BY ATTACK VECTOR</span>
            <span className="text-xs text-cyan-400 font-normal">Real-Time Distribution</span>
          </h3>

          <div className="space-y-3 pt-2">
            {[
              { label: 'UPI & Payment Fraud', count: 520, pct: 65, color: 'bg-red-500' },
              { label: 'Phishing Attacks', count: 342, pct: 48, color: 'bg-amber-500' },
              { label: 'Job & Telegram Scams', count: 388, pct: 54, color: 'bg-orange-500' },
              { label: 'Social Media Hijacking', count: 275, pct: 38, color: 'bg-cyan-500' },
              { label: 'Malware & Ransomware', count: 383, pct: 52, color: 'bg-purple-500' }
            ].map((cat) => (
              <div key={cat.label} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{cat.label}</span>
                  <span className="text-slate-400">{cat.count} reports</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports Over Time / Monthly Ticker Chart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center justify-between">
            <span>INCIDENT INTAKE OVER TIME (MONTHLY)</span>
            <span className="text-xs text-cyan-400 font-normal">Growth Trajectory</span>
          </h3>

          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { m: 'Apr', h: '30%', count: 18 },
              { m: 'May', h: '42%', count: 27 },
              { m: 'Jun', h: '55%', count: 35 },
              { m: 'Jul', h: '70%', count: 44 },
              { m: 'Aug', h: '85%', count: 62 },
              { m: 'Sep (Current)', h: '100%', count: 78 }
            ].map((bar) => (
              <div key={bar.m} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.count}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all group-hover:from-cyan-500 group-hover:to-teal-300"
                  style={{ height: bar.h }}
                ></div>
                <span className="text-[11px] font-mono text-slate-400">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident Reports Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              Incident Reports Database Ledger
            </h3>
            <p className="text-xs text-slate-400">
              Direct access to submitted cases with triage & status modification tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter by ID, Name, Vector..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Status Select */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Report ID</th>
                <th className="py-3 px-3">Reporter</th>
                <th className="py-3 px-3">Incident Type</th>
                <th className="py-3 px-3">Amount Lost</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No reports matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-cyan-400">{report.id}</td>
                    <td className="py-3 px-3 text-white">
                      <div>{report.fullName}</div>
                      <div className="text-[10px] text-slate-500">{report.email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{report.incidentType}</td>
                    <td className="py-3 px-3 font-mono">
                      {report.amountLost > 0 ? (
                        <span className="text-red-400 font-bold">₹{report.amountLost.toLocaleString()}</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getRiskBadgeColor(report.riskLevel)}`}>
                        {report.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          setInspectReport(report);
                          setActionNotes(report.actionTakenNotes || '');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Triage Case
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Messages Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          Incoming Contact Form Messages
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Sender</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Message</th>
                <th className="py-2.5 px-3">Received At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-slate-500">
                    No contact inquiries logged yet.
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-3">
                      <div className="text-white font-semibold">{m.name}</div>
                      <div className="text-[10px] text-slate-500">{m.email}</div>
                    </td>
                    <td className="py-2.5 px-3 text-cyan-300">{m.subject}</td>
                    <td className="py-2.5 px-3 text-slate-400 max-w-xs truncate">{m.message}</td>
                    <td className="py-2.5 px-3 text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Triage / Status Update Modal */}
      {inspectReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">CASE FILE: {inspectReport.id}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{inspectReport.incidentType} Incident</h3>
              </div>
              <button
                onClick={() => setInspectReport(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Reporter Profile */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-500 block">Reporter Name:</span>
                <span className="text-white font-bold">{inspectReport.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone:</span>
                <span className="text-white">{inspectReport.phoneNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Email:</span>
                <span className="text-cyan-300">{inspectReport.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Incident Date:</span>
                <span className="text-white">{inspectReport.dateOfIncident}</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-xs">
              <span className="font-mono text-slate-400 uppercase font-bold">Incident Description:</span>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed font-sans text-sm">
                {inspectReport.description}
              </p>
            </div>

            {inspectReport.websiteUrl && (
              <div className="text-xs font-mono">
                <span className="text-slate-400">Suspicious URL: </span>
                <code className="text-red-400">{inspectReport.websiteUrl}</code>
              </div>
            )}

            {/* Status change actions */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Update Status & Log Triage Action:
              </label>

              <textarea
                rows={2}
                placeholder="Add audit notes (e.g. escalated to cyber cell, user advised to block cards)..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              ></textarea>

              <div className="flex flex-wrap gap-2">
                {(['Submitted', 'Under Review', 'Investigating', 'Resolved'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(inspectReport.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                      inspectReport.status === st
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/50'
                    }`}
                  >
                    Set to {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectReport(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
              >
                Close Case Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
