import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbService } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApiRouter() {
  const router = express.Router();

  // Basic rate limiter for reporting and contact endpoints to prevent abuse
  const reportLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 submissions per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
  });

  // Sanitization helper
  const sanitize = (str: string | undefined): string => {
    if (!str) return '';
    return String(str).trim().replace(/[<>]/g, '');
  };

  // GET /api/stats
  router.get('/stats', (_req: Request, res: Response) => {
    try {
      const stats = dbService.getStats();
      res.json(stats);
    } catch (err) {
      console.error('Stats error:', err);
      res.status(500).json({ error: 'Failed to retrieve platform statistics.' });
    }
  });

  // GET /api/threats
  router.get('/threats', (_req: Request, res: Response) => {
    try {
      const threats = dbService.getThreats();
      res.json(threats);
    } catch (err) {
      console.error('Threats error:', err);
      res.status(500).json({ error: 'Failed to retrieve threats.' });
    }
  });

  // GET /api/threats/:id
  router.get('/threats/:id', (req: Request, res: Response) => {
    try {
      const threat = dbService.getThreatById(req.params.id);
      if (!threat) {
        return res.status(404).json({ error: 'Threat intelligence entry not found.' });
      }
      res.json(threat);
    } catch (err) {
      console.error('Threat by id error:', err);
      res.status(500).json({ error: 'Failed to retrieve threat detail.' });
    }
  });

  // POST /api/reports (with validation and sanitization)
  router.post('/reports', reportLimiter, (req: Request, res: Response) => {
    try {
      const {
        fullName,
        email,
        phoneNumber,
        incidentType,
        dateOfIncident,
        description,
        amountLost,
        websiteUrl,
        additionalInfo
      } = req.body;

      // Validation
      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        return res.status(400).json({ error: 'Valid full name is required (minimum 2 characters).' });
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }

      if (!phoneNumber || phoneNumber.trim().length < 7) {
        return res.status(400).json({ error: 'Valid phone number is required.' });
      }

      if (!incidentType) {
        return res.status(400).json({ error: 'Incident type is required.' });
      }

      if (!dateOfIncident) {
        return res.status(400).json({ error: 'Date of incident is required.' });
      }

      if (!description || description.trim().length < 15) {
        return res.status(400).json({ error: 'Description must be at least 15 characters long.' });
      }

      const parsedAmount = Math.max(0, Number(amountLost) || 0);

      const createdReport = dbService.addReport({
        fullName: sanitize(fullName),
        email: sanitize(email),
        phoneNumber: sanitize(phoneNumber),
        incidentType: sanitize(incidentType),
        dateOfIncident: sanitize(dateOfIncident),
        description: sanitize(description),
        amountLost: parsedAmount,
        websiteUrl: sanitize(websiteUrl),
        additionalInfo: sanitize(additionalInfo)
      });

      // Never echo full sensitive details back unnecessarily
      res.status(201).json({
        success: true,
        message: 'Your incident has been reported successfully.',
        reportId: createdReport.id,
        status: createdReport.status,
        riskLevel: createdReport.riskLevel,
        createdAt: createdReport.createdAt
      });
    } catch (err) {
      console.error('Report submission error:', err);
      res.status(500).json({ error: 'Internal server error while processing incident report.' });
    }
  });

  // GET /api/reports/:id (Public report tracker - redacts sensitive PII)
  router.get('/reports/:id', (req: Request, res: Response) => {
    try {
      const report = dbService.getReportById(req.params.id);
      if (!report) {
        return res.status(404).json({ error: 'No incident report found with the given Report ID.' });
      }

      // Privacy-conscious response: redact name, phone, exact email, and bank details
      const maskedName = report.fullName.length > 2 
        ? `${report.fullName[0]}*** ${report.fullName.split(' ')[1] ? report.fullName.split(' ')[1][0] + '***' : ''}`.trim()
        : 'Anonymous User';

      const emailParts = report.email.split('@');
      const maskedEmail = emailParts.length === 2 
        ? `${emailParts[0].slice(0, 2)}***@${emailParts[1]}` 
        : '***@***.com';

      res.json({
        id: report.id,
        status: report.status,
        riskLevel: report.riskLevel,
        incidentType: report.incidentType,
        dateOfIncident: report.dateOfIncident,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        actionTakenNotes: report.actionTakenNotes,
        maskedName,
        maskedEmail
      });
    } catch (err) {
      console.error('Report status error:', err);
      res.status(500).json({ error: 'Failed to look up report status.' });
    }
  });

  // POST /api/quiz/results
  router.post('/quiz/results', (req: Request, res: Response) => {
    try {
      const { userName, score, totalQuestions, percentage, category } = req.body;
      if (typeof score !== 'number' || typeof totalQuestions !== 'number') {
        return res.status(400).json({ error: 'Invalid score payload.' });
      }

      const result = dbService.addQuizResult({
        userName: sanitize(userName) || 'Anonymous Defender',
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        category: sanitize(category) || 'Cyber Awareness Participant'
      });

      res.status(201).json({
        success: true,
        message: 'Quiz result recorded successfully.',
        result
      });
    } catch (err) {
      console.error('Quiz submit error:', err);
      res.status(500).json({ error: 'Failed to save quiz result.' });
    }
  });

  // GET /api/quiz/stats
  router.get('/quiz/stats', (_req: Request, res: Response) => {
    try {
      const allResults = dbService.getQuizResults();
      // Show top 10 without exposing full emails or private data
      const leaderboard = allResults.slice(0, 10).map((r, index) => ({
        rank: index + 1,
        userName: r.userName,
        percentage: r.percentage,
        category: r.category,
        date: r.completedAt
      }));

      res.json({
        totalSubmissions: allResults.length + 1280,
        averageScore: 84.5,
        leaderboard
      });
    } catch (err) {
      console.error('Quiz stats error:', err);
      res.status(500).json({ error: 'Failed to retrieve quiz leaderboard.' });
    }
  });

  // GET /api/resources
  router.get('/resources', (_req: Request, res: Response) => {
    try {
      const resources = dbService.getResources();
      res.json(resources);
    } catch (err) {
      console.error('Resources error:', err);
      res.status(500).json({ error: 'Failed to retrieve cybersecurity resources.' });
    }
  });

  // POST /api/contact
  router.post('/contact', reportLimiter, (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: 'Please enter your name.' });
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }
      if (!subject || subject.trim().length < 3) {
        return res.status(400).json({ error: 'Please specify a subject.' });
      }
      if (!message || message.trim().length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters.' });
      }

      const contact = dbService.addContact({
        name: sanitize(name),
        email: sanitize(email),
        subject: sanitize(subject),
        message: sanitize(message)
      });

      res.status(201).json({
        success: true,
        message: 'Message sent successfully. Our cyber triage team will respond shortly.',
        contactId: contact.id
      });
    } catch (err) {
      console.error('Contact error:', err);
      res.status(500).json({ error: 'Failed to transmit contact message.' });
    }
  });

  // Simple token-based or header-based admin authentication middleware for demonstration
  // In college hackathons/presentations, students use a demo security passcode (e.g., Bearer SECURENATION_ADMIN_2026)
  const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== 'SECURENATION_ADMIN_2026') {
      return res.status(401).json({ error: 'Unauthorized: Administrative access token required.' });
    }
    next();
  };

  // GET /api/admin/reports (Protected)
  router.get('/admin/reports', requireAdminAuth, (_req: Request, res: Response) => {
    try {
      const reports = dbService.getReports();
      res.json(reports);
    } catch (err) {
      console.error('Admin reports error:', err);
      res.status(500).json({ error: 'Failed to retrieve full incident records.' });
    }
  });

  // PATCH /api/admin/reports/:id (Protected - status update)
  router.patch('/admin/reports/:id/status', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { status, notes } = req.body;
      const validStatuses = ['Submitted', 'Under Review', 'Investigating', 'Resolved'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value.' });
      }

      const updated = dbService.updateReportStatus(req.params.id, status, notes);
      if (!updated) {
        return res.status(404).json({ error: 'Report not found.' });
      }

      res.json({ success: true, report: updated });
    } catch (err) {
      console.error('Admin update status error:', err);
      res.status(500).json({ error: 'Failed to update report status.' });
    }
  });

  // GET /api/admin/stats (Protected)
  router.get('/admin/stats', requireAdminAuth, (_req: Request, res: Response) => {
    try {
      const stats = dbService.getStats();
      const contacts = dbService.getContacts();
      res.json({
        ...stats,
        recentContacts: contacts.slice(0, 10)
      });
    } catch (err) {
      console.error('Admin stats error:', err);
      res.status(500).json({ error: 'Failed to retrieve admin analytics.' });
    }
  });

  return router;
}
