import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Activity, 
  Users, 
  BookMarked, 
  ShieldAlert, 
  Compass, 
  Lock, 
  Search, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Cpu
} from 'lucide-react';
import { PlatformStats } from '../types/index.js';
import { THREAT_ICONS } from '../utils/threatIcons.js';

export const HomePage: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load stats:', err);
        // Fallback default
        setStats({
          threatsReported: 2484,
          peopleEducated: 15530,
          safetyResources: 9,
          cyberAwarenessScore: 88,
          totalReports: 4,
          pendingReports: 2,
          resolvedReports: 1,
          quizParticipants: 1284,
          messagesReceived: 2,
          reportsByCategory: {},
          reportsOverTime: [],
          quizPerformance: []
        });
        setLoading(false);
      });
  }, []);

  const commonThreats = [
    {
      id: 'phishing',
      title: 'Phishing Attacks',
      desc: 'Crafted emails and fake banking portals imitating authentic services to compromise logins and cards.',
      iconKey: 'phishing',
      badge: 'High Frequency'
    },
    {
      id: 'upi-fraud',
      title: 'Online & UPI Scams',
      desc: 'Manipulative QR code requests and fake collect notifications deceiving victims into debiting funds.',
      iconKey: 'upi-fraud',
      badge: 'Critical Vector'
    },
    {
      id: 'identity-theft',
      title: 'Identity Theft',
      desc: 'Unlawful use of national IDs, PAN, or passport credentials to open mule accounts and apply for illicit loans.',
      iconKey: 'identity-theft',
      badge: 'Severe Impact'
    },
    {
      id: 'malware',
      title: 'Malware & Spyware',
      desc: 'Rogue executables, keyloggers, and spyware bundled inside pirated college software or dubious download links.',
      iconKey: 'malware',
      badge: 'Device Compromise'
    },
    {
      id: 'password-attacks',
      title: 'Password Attacks',
      desc: 'Credential stuffing and brute-force cracking exploiting reused credentials across multiple web applications.',
      iconKey: 'password-attacks',
      badge: 'Credential Exposure'
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering',
      desc: 'Psychological manipulation leveraging urgency, impersonated authority, or false romance to bypass defense.',
      iconKey: 'social-engineering',
      badge: 'Psychological'
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Glowing backdrop mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-transparent blur-3xl rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>SECURENATION DEFENSE INITIATIVE • BCA 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Building a Safer <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                  Digital Nation
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Empowering citizens with cybersecurity awareness, digital safety tools, threat intelligence, and practical knowledge to stay secure in an increasingly connected world.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/report"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <AlertTriangle className="w-5 h-5 fill-current" />
                  <span>Report a Threat</span>
                </Link>

                <Link
                  to="/learn"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <BookMarked className="w-5 h-5 text-cyan-400" />
                  <span>Learn Cyber Safety</span>
                </Link>

                <Link
                  to="/quiz"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Take Awareness Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Security Pill Indicators */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-900 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Anonymous Triage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>REST API Backed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Curriculum</span>
                </div>
              </div>
            </div>

            {/* Right Dashboard Visual Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 p-5 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-xl">
                {/* Header bar of mock terminal */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400">securenation-telemetry.sys</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    ACTIVE MONITOR
                  </div>
                </div>

                {/* Simulated threat radar / feed */}
                <div className="space-y-3.5 mt-4 text-xs font-mono">
                  {/* Status Banner */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">National Defense Index</div>
                      <div className="text-xl font-bold text-white mt-0.5 flex items-center gap-2">
                        <span>DEFCON LEVEL 4</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">GUARDED</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Audit Status</div>
                      <div className="text-sm font-semibold text-emerald-400">NORMAL HYGIENE</div>
                    </div>
                  </div>

                  {/* Incident Pulse Ticker */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Activity className="w-3.5 h-3.5" />
                        Live Incident Stream
                      </span>
                      <span className="text-[10px] text-slate-500">Auto-refreshing</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-slate-300 flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-1 flex-shrink-0 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-red-300 text-[11px]">UPI Impersonation QR Campaign</span>
                          <span className="text-[10px] text-red-400/80 font-mono">14m ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Marketplace buyers targeted via spoofed WhatsApp business profiles</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-slate-300 flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-amber-300 text-[11px]">Fake Electricity Bill APK Surge</span>
                          <span className="text-[10px] text-amber-400/80 font-mono">1h ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">SMS text blast requesting urgent app install to prevent power disconnection</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-slate-300 flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-cyan-300 text-[11px]">Student Internship Telegram Scam</span>
                          <span className="text-[10px] text-cyan-400/80 font-mono">3h ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Fake hotel review task demanding prepaid fee before salary disbursement</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action in Card */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400">Have you encountered a scam?</span>
                    <Link to="/report" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                      File Report <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Section (retrieved from backend) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Live Platform Intelligence
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggregated in real-time from citizen reports, student learning modules, and community quizzes.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-lg border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              API STATUS: ONLINE
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {/* Stat 1 */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Threats Reported
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {loading ? '...' : (stats?.threatsReported?.toLocaleString() ?? '2,484')}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span className="text-red-400 font-medium">+{stats?.totalReports ?? 4} verified</span> in database
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                People Educated
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {loading ? '...' : (stats?.peopleEducated?.toLocaleString() ?? '15,530')}
              </div>
              <div className="text-xs text-slate-400">
                Across 8 interactive modules
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-teal-400" />
                Safety Resources
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {loading ? '...' : (stats?.safetyResources ?? 9)}
              </div>
              <div className="text-xs text-slate-400">
                Official guides & 1930 helpline
              </div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Awareness Score
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {loading ? '...' : `${stats?.cyberAwarenessScore ?? 88}%`}
              </div>
              <div className="text-xs text-slate-400">
                Average community quiz rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SecureNation? Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            The Digital Trust Mission
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why SecureNation?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            In an era where cybercriminals prey on lack of awareness, SecureNation provides a unified bridge connecting citizens with knowledge, reporting tools, and real-time defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl cyber-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cyber Awareness</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Step-by-step educational modules teaching the fundamentals of digital hygiene, password security, and modern threat avoidance.
            </p>
          </div>

          <div className="p-6 rounded-2xl cyber-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Threat Reporting</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Structured incident intake with unique tracking IDs, risk level scoring, and guidance for official reporting to law enforcement.
            </p>
          </div>

          <div className="p-6 rounded-2xl cyber-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Digital Safety</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Actionable checklists and tools for securing UPI accounts, social media profiles, student laptops, and public Wi-Fi access.
            </p>
          </div>

          <div className="p-6 rounded-2xl cyber-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Community Protection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Crowdsourced intelligence and warning feeds alerting students and families before emerging scams proliferate nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Common Digital Threats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Threat Intelligence Directory
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Common Digital Threats
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Inspect verified attack profiles, learn signature warning signals, and access rapid countermeasure instructions.
            </p>
          </div>

          <Link
            to="/threats"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All 14 Threat Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonThreats.map((threat) => {
            const Icon = THREAT_ICONS[threat.iconKey] || ShieldAlert;
            return (
              <div key={threat.id} className="p-6 rounded-2xl cyber-card flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {threat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {threat.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {threat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-900 flex items-center justify-between">
                  <Link
                    to={`/threats?highlight=${threat.id}`}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
                  >
                    <span>Learn More & Defense</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/report"
                    className="text-[11px] text-slate-500 hover:text-red-400 transition-colors"
                  >
                    Report this
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How SecureNation Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/20 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Systematic Security Lifecycle
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              How SecureNation Works
            </h2>
            <p className="text-slate-400 text-sm">
              From recognizing deceptive patterns to mobilizing community-wide safeguards in 4 structured stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-3 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center border border-cyan-500/40">
                  01
                </div>
                <h4 className="text-lg font-bold text-white">Identify</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Use our Threat Intelligence Directory and real-world indicators to pinpoint whether an unexpected SMS, phone call, or QR request is malicious.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 font-mono font-bold flex items-center justify-center border border-teal-500/40">
                  02
                </div>
                <h4 className="text-lg font-bold text-white">Report</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Submit an incident report in seconds. Receive a traceable Report ID (e.g. SN-2026-0001) with instant advice on contacting official helplines (1930).
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 font-mono font-bold flex items-center justify-center border border-blue-500/40">
                  03
                </div>
                <h4 className="text-lg font-bold text-white">Learn</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Complete self-paced interactive modules covering passwords, UPI fraud, and mobile permissions with immediate knowledge-check quizzes.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center border border-emerald-500/40">
                  04
                </div>
                <h4 className="text-lg font-bold text-white">Protect</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Apply preventative checklists across your college, workplace, and family devices to insulate your entire network from future breaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security by Design Section (Required for Cybersecurity Project) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                <Lock className="w-3.5 h-3.5" />
                SECURITY BY DESIGN PRINCIPLES
              </div>
              <h3 className="text-xl font-bold text-white">How This Application Protects Your Data</h3>
            </div>
            <Link
              to="/about"
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono"
            >
              <span>Explore Technical Architecture</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Input Sanitization
              </div>
              <p className="text-slate-400">
                All submitted incident reports & contact forms undergo server-side HTML tag stripping & XSS defense.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                PII Masking
              </div>
              <p className="text-slate-400">
                Public report status lookups (/api/reports/:id) redact full names, phone numbers, and raw email addresses.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Rate Limiting & Helmet
              </div>
              <p className="text-slate-400">
                Express-rate-limit guards endpoints against spam while HTTP security headers harden browser execution.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Role-Based Segregation
              </div>
              <p className="text-slate-400">
                Public endpoints do not expose administrative records. Admin actions require authorized bearer tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-8 sm:p-14 text-center space-y-6 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              “Together, We Can Build a Safer Digital Nation.”
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you are a student, faculty member, parent, or digital payment user, your vigilance protects everyone in your network. Start by reporting suspicious scams or taking the 5-minute cybersecurity quiz.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/report"
              className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-lg shadow-cyan-500/25 transition-all"
            >
              Report Incident Now
            </Link>
            <Link
              to="/quiz"
              className="px-6 py-3 rounded-xl font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
            >
              Take Awareness Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
