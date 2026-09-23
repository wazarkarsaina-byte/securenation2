import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Copy, 
  ExternalLink, 
  Info, 
  Phone, 
  Lock,
  ArrowRight
} from 'lucide-react';

export const ReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillType = searchParams.get('type') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    incidentType: prefillType || 'Phishing',
    dateOfIncident: new Date().toISOString().split('T')[0],
    description: '',
    amountLost: '',
    websiteUrl: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    reportId: string;
    status: string;
    riskLevel: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const incidentTypes = [
    'Phishing',
    'Financial Fraud',
    'UPI Fraud',
    'Identity Theft',
    'Social Media Hack',
    'Malware',
    'Ransomware',
    'Cyberbullying',
    'Online Scam',
    'Other'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Full Name is required (at least 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.trim().length < 7) {
      errs.phoneNumber = 'Please provide a valid contact phone number.';
    }
    if (!formData.incidentType) {
      errs.incidentType = 'Please select an incident type.';
    }
    if (!formData.dateOfIncident) {
      errs.dateOfIncident = 'Please provide the incident date.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      errs.description = 'Please detail what happened (minimum 15 characters).';
    }
    if (formData.amountLost && Number(formData.amountLost) < 0) {
      errs.amountLost = 'Amount lost cannot be negative.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit report.');
      }

      setSubmissionResult({
        success: true,
        reportId: data.reportId,
        status: data.status,
        riskLevel: data.riskLevel
      });
    } catch (err: any) {
      setErrors({ form: err.message || 'An error occurred while submitting your report.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submissionResult?.reportId) {
      navigator.clipboard.writeText(submissionResult.reportId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-xs font-mono text-red-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>CONFIDENTIAL INCIDENT INTAKE PORTAL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Report a Cyber Threat or Incident
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Log suspicious scams, unauthorized transactions, identity theft, or malware encounters. All submissions receive an automated cryptographic tracking ID for triage.
        </p>
      </div>

      {/* Official Authorities Notice (Mandatory Requirement) */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-4">
        <Info className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-slate-300">
          <p className="font-semibold text-amber-300">
            Important Educational & Project Notice:
          </p>
          <p className="leading-relaxed">
            SecureNation is an academic BCA cybersecurity awareness and community defense project. If you have experienced substantial financial theft, extortion, or acute distress, you must also report immediately to the official National Cyber Crime Reporting Portal at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-medium">cybercrime.gov.in</a> or dial the Citizen Financial Cyber Fraud Helpline <strong className="text-red-400">1930</strong> (24x7 India).
          </p>
        </div>
      </div>

      {/* Success State */}
      {submissionResult ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Your Incident Has Been Reported Successfully
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Your report has been securely registered in the SecureNation database. Please preserve your Report ID below to verify ongoing triage.
            </p>
          </div>

          {/* Generated ID Badge */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 text-center space-y-3 max-w-md mx-auto">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Assigned Tracking ID
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 tracking-wider">
              {submissionResult.reportId}
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Report ID'}</span>
              </button>
            </div>
          </div>

          {/* Incident Meta */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-slate-400 block mb-0.5">Initial Status:</span>
              <span className="text-cyan-400 font-bold">{submissionResult.status}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-slate-400 block mb-0.5">Assigned Risk Level:</span>
              <span className="text-amber-400 font-bold">{submissionResult.riskLevel}</span>
            </div>
          </div>

          {/* Next Steps Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800">
            <Link
              to={`/status?id=${submissionResult.reportId}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 text-sm text-center flex items-center justify-center gap-2"
            >
              <span>Track Incident Status</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setSubmissionResult(null);
                setFormData({
                  fullName: '',
                  email: '',
                  phoneNumber: '',
                  incidentType: 'Phishing',
                  dateOfIncident: new Date().toISOString().split('T')[0],
                  description: '',
                  amountLost: '',
                  websiteUrl: '',
                  additionalInfo: ''
                });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 text-sm text-center"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        /* The Report Form */
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          {errors.form && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Arjun Patel"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
              />
              {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                placeholder="arjun.patel@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
              />
              {errors.phoneNumber && <p className="text-xs text-red-400">{errors.phoneNumber}</p>}
            </div>

            {/* Incident Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Incident Type <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.incidentType}
                onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-400"
              >
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Date of Incident */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Date of Incident <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={formData.dateOfIncident}
                onChange={(e) => setFormData({ ...formData, dateOfIncident: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
              {errors.dateOfIncident && <p className="text-xs text-red-400">{errors.dateOfIncident}</p>}
            </div>

            {/* Amount Lost */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Financial Amount Lost (INR or USD, if any)
              </label>
              <input
                type="number"
                min="0"
                placeholder="0 if no direct money was stolen"
                value={formData.amountLost}
                onChange={(e) => setFormData({ ...formData, amountLost: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
              />
              {errors.amountLost && <p className="text-xs text-red-400">{errors.amountLost}</p>}
            </div>
          </div>

          {/* Website / URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
              Suspicious Website / URL / Phishing Link
            </label>
            <input
              type="text"
              placeholder="e.g. http://bank-update-kyc-verify.xyz"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
              Detailed Description of Incident <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Explain how you were contacted, what was promised or requested, and what actions were taken..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
            ></textarea>
            {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
          </div>

          {/* Additional Info */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
              Additional Information (Transaction IDs, Phone Numbers, Telegram Handles)
            </label>
            <input
              type="text"
              placeholder="e.g. UTR #87319203912, Telegram @scammer_hr_support"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              SecureNation enforces strict privacy: Personal Contact Info is redacted from public status views and accessible solely for triage demonstration.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Transmitting to SecureNation DB...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 fill-current" />
                  <span>Submit Incident Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
