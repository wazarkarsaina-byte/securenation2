import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  BookOpen, 
  Award, 
  Users, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const approaches = [
    {
      step: '01',
      title: 'Academic Research & Threat Profiling',
      desc: 'Conducting in-depth analysis on modern attack vectors affecting students, mobile banking users, and digital shoppers across the nation.',
      tag: 'RESEARCH'
    },
    {
      step: '02',
      title: 'Intuitive Incident Reporting Intake',
      desc: 'Providing citizens with a secure, non-judgmental environment to log scam attempts and receive guidance on official 1930 / cybercrime.gov.in escalation.',
      tag: 'INCIDENT RESPONSE'
    },
    {
      step: '03',
      title: 'Action-Oriented Digital Hygiene',
      desc: 'Replacing abstract cybersecurity jargon with practical checklists, simulated scenarios, and interactive awareness tests.',
      tag: 'EDUCATION'
    },
    {
      step: '04',
      title: 'Community Defense & Resilience',
      desc: 'Aggregating anonymized trends into public advisories that empower educational institutions and communities to anticipate emerging fraud schemes.',
      tag: 'TRUST NETWORK'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span>PROJECT MANIFESTO • BCA CYBERSECURITY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About SECURENATION
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          SECURENATION was conceived as an advanced BCA cybersecurity and digital-trust initiative designed to tackle the escalating wave of social engineering, UPI fraud, and unauthorized data exploitation targeting modern citizens.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="p-8 rounded-2xl cyber-card space-y-4 border-l-4 border-l-cyan-400">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Make cybersecurity awareness accessible, actionable, and free for every citizen — regardless of their technical background. We bridge the gap between complex cryptographic security concepts and the everyday security habits required to navigate the digital nation safely.
          </p>
          <ul className="space-y-2 text-xs font-mono text-cyan-300 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Accessible vernacular guidance
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Rapid self-service scam verification
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Direct escalation pathways to national agencies
            </li>
          </ul>
        </div>

        {/* Vision */}
        <div className="p-8 rounded-2xl cyber-card space-y-4 border-l-4 border-l-teal-400">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Create a digitally aware, self-reliant society where citizens can instinctively identify deception, prevent unauthorized breaches, and report cyber threats before widespread harm occurs. We envision a digital nation powered by knowledge, vigilance, and collective resilience.
          </p>
          <ul className="space-y-2 text-xs font-mono text-teal-300 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Resilient students, workers, and seniors
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Zero tolerance for predatory financial scams
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Transparent incident tracking & prevention
            </li>
          </ul>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            Operational Pillars
          </div>
          <h2 className="text-3xl font-extrabold text-white">What We Do</h2>
          <p className="text-sm text-slate-400">
            Our multi-pronged approach equips users with cognitive defense tools and immediate response mechanisms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-cyan-400 font-bold text-base flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Cybersecurity Awareness
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Curating practical insights on the psychology behind phishing, pretexting, and social engineering to prevent manipulation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-teal-400 font-bold text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Digital Safety Education
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Eight comprehensive learning modules breaking down password hygiene, mobile APK hazards, and public Wi-Fi security.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-red-400 font-bold text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Threat Reporting
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Streamlined, authenticated incident intake generating unique tracking IDs (SN-2026-XXXX) for ongoing triage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-blue-400 font-bold text-base flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Cybersecurity Resources
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Verified links to official government portals (cybercrime.gov.in, CERT-In, RBI Sachet) and emergency response numbers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-amber-400 font-bold text-base flex items-center gap-2">
              <Award className="w-5 h-5" />
              Interactive Learning
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Hands-on 10-question cyber quizzes with instant rationale feedback, score calculation, and performance categorization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-purple-400 font-bold text-base flex items-center gap-2">
              <Users className="w-5 h-5" />
              Community Awareness
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Workshops, campus presentations, and student-to-student cyber literacy mentoring for colleges and local organizations.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Feature Cards: Awareness, Protection, Community */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xl">
            01
          </div>
          <h3 className="text-xl font-bold text-white">Awareness</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            The strongest firewall is a prepared human mind. By exposing scam patterns early, we inoculate users against manipulative psychological traps.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-teal-500/30 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl">
            02
          </div>
          <h3 className="text-xl font-bold text-white">Protection</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            From two-factor authentication keys to masked national IDs and encrypted communications, we provide concrete toolkits for immediate hardening.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl">
            03
          </div>
          <h3 className="text-xl font-bold text-white">Community</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Cybersecurity is a collective responsibility. When one user flags a fraudulent job link or fake UPI handle, thousands are shielded from harm.
          </p>
        </div>
      </div>

      {/* Our Approach Timeline */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            Methodology & Blueprint
          </div>
          <h2 className="text-3xl font-extrabold text-white">Our Approach Timeline</h2>
          <p className="text-sm text-slate-400">
            How SecureNation evolves from academic project research to a resilient defense platform.
          </p>
        </div>

        <div className="relative border-l border-slate-800 ml-4 sm:ml-32 space-y-10">
          {approaches.map((item, idx) => (
            <div key={item.step} className="relative pl-8 sm:pl-10">
              {/* Timeline marker */}
              <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-300">
                {idx + 1}
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2 hover:border-cyan-500/30 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/20 font-semibold">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500">STAGE {item.step}</span>
                </div>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic / Hackathon Notice Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <AlertCircle className="w-5 h-5" />
            <span>Academic Demonstration & Project Scope</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            This platform is authored as a BCA graduation hackathon and cybersecurity capstone project. While all threat intelligence, APIs, and reporting mechanisms are fully functional, actual ongoing crimes should also be submitted to the official National Cyber Crime Helpline (1930) or cybercrime.gov.in.
          </p>
        </div>
        <Link
          to="/report"
          className="flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 text-sm"
        >
          Try Reporting System
        </Link>
      </div>
    </div>
  );
};
