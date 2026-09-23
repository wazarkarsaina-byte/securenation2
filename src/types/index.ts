export interface Threat {
  id: string;
  name: string;
  category: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  warningSigns: string[];
  preventionTips: string[];
  whatToDoIfAffected: string[];
  commonTargets: string;
  reportCount?: number;
}

export interface IncidentReport {
  id: string; // e.g. SN-2026-0001
  fullName: string;
  email: string;
  phoneNumber: string;
  incidentType: string;
  dateOfIncident: string;
  description: string;
  amountLost: number;
  websiteUrl?: string;
  additionalInfo?: string;
  status: 'Submitted' | 'Under Review' | 'Investigating' | 'Resolved';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
  updatedAt: string;
  actionTakenNotes?: string;
}

export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface QuizSubmission {
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  category: string;
  completedAt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'Emergency Help' | 'Government Resources' | 'Awareness Guides' | 'Password Security' | 'Banking Safety' | 'Social Media Safety' | 'Student Safety';
  url: string;
  badge?: string;
  isOfficial?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface PlatformStats {
  totalReports?: number;
  threatsReported: number;
  peopleEducated: number;
  safetyResources: number;
  cyberAwarenessScore: number;
  pendingReports: number;
  resolvedReports: number;
  quizParticipants: number;
  messagesReceived: number;
  reportsByCategory: Record<string, number>;
  reportsOverTime: { month: string; count: number }[];
  quizPerformance: { range: string; count: number }[];
  recentContacts?: ContactMessage[];
}

export interface LearningModule {
  id: string;
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  explanation: string;
  keyPoints: string[];
  examples: { scenario: string; analysis: string; safeAction: string }[];
  safetyChecklist: string[];
  quickQuiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}
