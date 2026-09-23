import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Users, 
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningData.js';
import { QuizSubmission } from '../types/index.js';

export const QuizPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [userName, setUserName] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const questions = QUIZ_QUESTIONS;
  const currentQuestion = questions[currentIdx];

  // Fetch leaderboard & stats
  const fetchLeaderboard = () => {
    fetch('/api/quiz/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      })
      .catch((err) => console.error('Failed to fetch quiz leaderboard:', err));
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswers[currentIdx] !== undefined) return; // Answer locked
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finalizeQuiz();
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const getResultCategory = (percentage: number) => {
    if (percentage >= 91) return { title: 'Cyber Safety Champion', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    if (percentage >= 71) return { title: 'Strong Awareness', color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (percentage >= 41) return { title: 'Good Awareness', color: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
    return { title: 'Needs Improvement', color: 'text-red-400', badge: 'bg-red-500/20 text-red-300 border-red-500/30' };
  };

  const finalizeQuiz = async () => {
    setIsFinished(true);
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const categoryInfo = getResultCategory(percentage);

    setSavingResult(true);
    try {
      await fetch('/api/quiz/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userName.trim() || 'Student Defender',
          score,
          totalQuestions: questions.length,
          percentage,
          category: categoryInfo.title
        })
      });
      fetchLeaderboard();
    } catch (err) {
      console.error('Failed to post quiz results:', err);
    } finally {
      setSavingResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  const currentAnswer = selectedAnswers[currentIdx];
  const hasAnsweredCurrent = currentAnswer !== undefined;
  const isCorrect = hasAnsweredCurrent && currentAnswer === currentQuestion.correctAnswer;

  const scoreSoFar = calculateScore();
  const percentageScore = Math.round((scoreSoFar / questions.length) * 100);
  const resultCategory = getResultCategory(percentageScore);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Award className="w-3.5 h-3.5" />
          <span>INTERACTIVE CYBERSECURITY BENCHMARK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cyber Awareness Quiz
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Test your defense capabilities across 10 critical scenarios including phishing, OTP fraud, mobile APK permissions, and credential hygiene.
        </p>
      </div>

      {/* Main Quiz View or Results View */}
      {!isFinished ? (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 relative overflow-hidden shadow-xl">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                Question <strong className="text-cyan-400">{currentIdx + 1}</strong> of {questions.length}
              </span>
              <span className="text-cyan-400 font-bold">
                {Math.round(((currentIdx + 1) / questions.length) * 100)}% Completed
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* User Name input on question 1 if empty */}
          {currentIdx === 0 && !userName && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-mono font-semibold text-slate-300">
                Enter your name or student handle (Optional for Leaderboard):
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul S. (BCA 2nd Year)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          {/* Question Header & Body */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>TOPIC: {currentQuestion.topic.toUpperCase()}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = currentAnswer === optIdx;
              const isOptionCorrect = optIdx === currentQuestion.correctAnswer;

              let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-950';

              if (hasAnsweredCurrent) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-950/30 border-emerald-500 text-emerald-300 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-red-950/30 border-red-500 text-red-300 font-semibold';
                } else {
                  btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-start gap-3.5 ${btnStyle}`}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current font-mono text-xs flex items-center justify-center mt-0.5">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {hasAnsweredCurrent && isOptionCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {hasAnsweredCurrent && isSelected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Rationale Feedback */}
          {hasAnsweredCurrent && (
            <div className={`p-4 sm:p-5 rounded-2xl border animate-in fade-in space-y-2 ${
              isCorrect ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' : 'bg-red-950/20 border-red-500/30 text-red-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs font-mono uppercase">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Correct Answer</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Incorrect Choice</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">
              {hasAnsweredCurrent ? 'Review feedback and proceed' : 'Select an answer to reveal explanation'}
            </span>

            {hasAnsweredCurrent && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-cyan-500/40 text-center space-y-8 animate-in fade-in duration-200 shadow-2xl">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border ${resultCategory.badge}`}>
                {resultCategory.title.toUpperCase()}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Quiz Completed!
              </h2>
              <p className="text-sm text-slate-300">
                Candidate: <strong className="text-white">{userName || 'Student Defender'}</strong>
              </p>
            </div>
          </div>

          {/* Big Score Dial */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto space-y-2">
            <div className="text-5xl sm:text-6xl font-extrabold font-mono text-cyan-400 tracking-tight">
              {scoreSoFar} / {questions.length}
            </div>
            <div className="text-lg font-bold text-white font-mono">
              {percentageScore}% Accuracy
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              {percentageScore >= 90
                ? 'Outstanding digital defense awareness! You are well prepared against sophisticated cyber deception.'
                : percentageScore >= 70
                ? 'Strong understanding of core cybersecurity principles with minor review needed.'
                : 'Good start. We recommend reviewing our interactive learning modules to reinforce weak areas.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 text-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <a
              href="/learn"
              className="px-6 py-3 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 text-xs flex items-center gap-2"
            >
              <span>Explore Learning Modules</span>
            </a>
          </div>
        </div>
      )}

      {/* Community Leaderboard / Awareness Distribution */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              <span>COMMUNITY BENCHMARK & RECENT SCORES</span>
            </div>
            <p className="text-xs text-slate-400">
              Aggregated student & community awareness scores (Stored in SecureNation DB).
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            Avg Score: <strong className="text-cyan-400">84.5%</strong>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Participant</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    No quiz submissions logged yet. Be the first to take the test!
                  </td>
                </tr>
              ) : (
                leaderboard.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/40">
                    <td className="py-3 px-3 text-cyan-400 font-bold">#{item.rank || idx + 1}</td>
                    <td className="py-3 px-3 text-white font-medium">{item.userName}</td>
                    <td className="py-3 px-3 text-cyan-300 font-bold">{item.percentage}%</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
