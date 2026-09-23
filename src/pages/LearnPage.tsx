import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  Lock,
  Smartphone,
  ShieldCheck,
  Eye,
  KeyRound
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/learningData.js';
import { LearningModule } from '../types/index.js';

export const LearnPage: React.FC = () => {
  const modules = LEARNING_MODULES;
  const [activeModuleId, setActiveModuleId] = useState<string>(modules[0].id);
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('securenation_completed_modules');
      return saved ? JSON.parse(saved) : { 'module-1': true };
    } catch {
      return { 'module-1': true };
    }
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];

  useEffect(() => {
    try {
      localStorage.setItem('securenation_completed_modules', JSON.stringify(completedModules));
    } catch (e) {
      console.warn('Could not save to local storage', e);
    }
  }, [completedModules]);

  const toggleComplete = (id: string) => {
    setCompletedModules((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedModules).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / modules.length) * 100);

  const handleSelectQuiz = (moduleId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [moduleId]: optionIdx }));
    setQuizSubmitted((prev) => ({ ...prev, [moduleId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>CYBER HYGIENE & DEFENSE CURRICULUM • 8 CORE MODULES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Cybersecurity Learning Academy
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Master the fundamentals of threat recognition, account hardening, digital payments safety, and personal data privacy through guided modules.
        </p>
      </div>

      {/* Progress Card (Requested Requirement: "Your Cyber Safety Learning Progress: 65%") */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Overall Curriculum Progress
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              Your Cyber Safety Learning Progress:{' '}
              <span className="text-cyan-400 font-mono">{progressPercentage}%</span>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            {completedCount} of {modules.length} Modules Mastered
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Main Grid: Sidebar Module List + Active Module Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Nav Sidebar */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold px-1 mb-3">
            Syllabus Navigation
          </h3>

          <div className="space-y-2">
            {modules.map((m, idx) => {
              const isSelected = m.id === activeModuleId;
              const isCompleted = !!completedModules[m.id];

              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModuleId(m.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(m.id);
                      }}
                      className="flex-shrink-0 text-slate-500 hover:text-cyan-400"
                      title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                    </button>

                    <div className="truncate">
                      <div className="text-xs font-mono text-cyan-400 font-semibold">
                        MODULE {idx + 1}
                      </div>
                      <div className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {m.title.split(': ')[1] || m.title}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Content Reader */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 backdrop-blur-md">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold">
                  {activeModule.level.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeModule.readTime}
                </span>
              </div>

              {/* Mark Complete Button */}
              <button
                onClick={() => toggleComplete(activeModule.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  completedModules[activeModule.id]
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedModules[activeModule.id] ? 'Completed ✓' : 'Mark as Completed'}
                </span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeModule.title}
            </h2>
            <p className="text-sm font-medium text-cyan-300">
              {activeModule.subtitle}
            </p>
          </div>

          {/* Explanation Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Core Technical Explanation
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeModule.explanation}
            </p>
          </div>

          {/* Key Points */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Key Security Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {activeModule.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Real-World Case Scenario */}
          {activeModule.examples && activeModule.examples.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Case Study Scenario & Analysis
              </h3>
              {activeModule.examples.map((ex, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-3">
                  <div>
                    <span className="text-xs font-mono text-amber-300 font-bold block mb-1">INCIDENT SCENARIO:</span>
                    <p className="text-xs sm:text-sm text-slate-300">{ex.scenario}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-900 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="font-bold text-red-400 block mb-0.5">Threat Analysis:</span>
                      <p className="text-slate-400">{ex.analysis}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                      <span className="font-bold text-emerald-400 block mb-0.5">Safe Action:</span>
                      <p className="text-emerald-200">{ex.safeAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Safety Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Actionable Defense Checklist
            </h3>
            <div className="space-y-2">
              {activeModule.safetyChecklist.map((check, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/20 flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Quiz (Embedded check) */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>MODULE QUICK CHECK QUIZ</span>
            </div>

            <p className="text-sm font-semibold text-white">
              {activeModule.quickQuiz.question}
            </p>

            <div className="space-y-2">
              {activeModule.quickQuiz.options.map((opt, optIdx) => {
                const isSelected = quizAnswers[activeModule.id] === optIdx;
                const isSubmitted = quizSubmitted[activeModule.id];
                const isCorrect = optIdx === activeModule.quickQuiz.correct;

                let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50';

                if (isSubmitted) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-950/30 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    optStyle = 'bg-red-950/30 border-red-500 text-red-200';
                  } else {
                    optStyle = 'bg-slate-900/50 border-slate-900 text-slate-600';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectQuiz(activeModule.id, optIdx)}
                    disabled={isSubmitted}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {quizSubmitted[activeModule.id] && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 animate-in fade-in">
                <span className="font-bold text-cyan-400 font-mono">EXPLANATION:</span>
                <p>{activeModule.quickQuiz.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
