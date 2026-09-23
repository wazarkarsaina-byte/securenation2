import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-red-950/30 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-red-400 uppercase tracking-widest font-bold">
            ERROR 404 • UNRECOGNIZED ENDPOINT
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Security Route Not Found
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The page or resource you requested does not exist or has been relocated to prevent unauthorized traversal.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 text-xs flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Secure Home</span>
          </Link>
          <Link
            to="/threats"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Threat Directory</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
