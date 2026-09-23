import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Menu, 
  X, 
  Lock, 
  Search,
  BookOpen,
  Award,
  Layers,
  Phone,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Threats', path: '/threats' },
    { name: 'Learn', path: '/learn' },
    { name: 'Cyber Quiz', path: '/quiz' },
    { name: 'Track Status', path: '/status' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
              <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                  SECURENATION
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold tracking-wide">
                  BCA INIT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                Building a Safer Digital Nation
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/70 border border-slate-800 transition-colors"
              title="Admin Demo Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>

            <Link
              to="/report"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_28px_rgba(6,182,212,0.55)] transition-all transform active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-slate-950 fill-current" />
              <span>Report a Threat</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/report"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-400 text-slate-950 flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Report
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                to="/report"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <AlertTriangle className="w-4 h-4 fill-current" />
                Report Incident
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-center text-sm font-medium flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                Admin Demonstration Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
