import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Phone, 
  Building, 
  MessageSquare,
  Sparkles,
  Info
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Please specify a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }
      setSuccessMessage(data.message || 'Message sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrors({ form: err.message || 'Error transmitting your message.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Mail className="w-3.5 h-3.5" />
          <span>CYBER INITIATIVE INTAKE & INQUIRIES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Contact SecureNation
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Connect with our student research team regarding cyber awareness workshops, campus seminars, vulnerability reporting feedback, or community partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Col */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                SecureNation Cybersecurity Awareness Initiative
              </h2>
              <p className="text-xs text-cyan-400 font-mono">
                Department of Computer Applications (BCA Project Lab)
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Academic Project Secretariat:</strong>
                  <span>College Hackathon & Capstone Cyber Defense Lab, Campus Innovation Wing</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email Dispatch:</strong>
                  <span className="font-mono text-cyan-300">contact@securenation.demo</span>
                  <span className="block text-[11px] text-slate-500">(Fictional demo/project contact)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Student Project Hotline:</strong>
                  <span className="font-mono text-cyan-300">+91 (020) 2555-SECURE</span>
                  <span className="block text-[11px] text-slate-500">(Demo helpline for presentations)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Info className="w-4 h-4" />
                Academic Presentation Note
              </div>
              <p>
                All inquiries submitted through this form are stored in the application database and reviewed in the demonstration Admin Dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Col */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-white">Send a Message</h2>
              <p className="text-xs text-slate-400">
                Messages are stored in the local SQLite/JSON datastore.
              </p>
            </div>

            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errors.form && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-300 uppercase">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prof. Ramesh Nair"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-300 uppercase">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="ramesh@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-300 uppercase">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Request for BCA Cyber Awareness Seminar"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                />
                {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-300 uppercase">
                  Message Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail your inquiry, workshop date requirements, or feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                ></textarea>
                {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? 'Transmitting...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
