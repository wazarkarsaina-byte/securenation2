import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Github, 
  Phone, 
  Mail, 
  Lock, 
  Cpu, 
  FileCode,
  Shield
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 relative overflow-hidden">
      {/* Decorative cyber grid backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                SECURENATION
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              “Building a Safer Digital Nation” — A BCA student cybersecurity and digital-trust initiative designed for hackathons, community education, and rapid cyber threat triage.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-cyan-400/90">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                REST APIs
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Local Storage DB
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                BCA Hackathon
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About Mission</Link>
              </li>
              <li>
                <Link to="/threats" className="hover:text-cyan-400 transition-colors">Threat Directory</Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-cyan-400 transition-colors">Learning Modules</Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-cyan-400 transition-colors">Cyber Quiz</Link>
              </li>
            </ul>
          </div>

          {/* Incident Response & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Incident Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/report" className="text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Report Incident
                </Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-cyan-400 transition-colors">Track Report Status</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-cyan-400 transition-colors">Emergency Resources</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Initiative</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-cyan-400 transition-colors text-slate-500 hover:text-slate-300">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              National Helplines
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-red-300">
                <div className="font-bold flex items-center gap-1 text-red-400">
                  <Phone className="w-3.5 h-3.5" />
                  Dial 1930 (India)
                </div>
                <p className="text-[11px] text-red-200/80 mt-0.5">
                  Citizen Financial Cyber Fraud Reporting System
                </p>
              </div>
              <a 
                href="https://cybercrime.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-[11px] text-slate-500 leading-normal">
                SecureNation is an academic cyber-trust project. Serious ongoing crimes should be reported to police & cyber helplines.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SECURENATION. Built as a BCA cybersecurity awareness & digital-trust project.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Privacy by Design</span>
            <span className="hover:text-slate-400 transition-colors">Zero-Telemetry Policy</span>
            <Link to="/about" className="text-cyan-400 hover:underline">Academic Presentation Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
