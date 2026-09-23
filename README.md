# SECURENATION — “Building a Safer Digital Nation”

> **A BCA Student Cybersecurity & Digital-Trust Project**  
> Developed for Academic Presentations, College Hackathons, and Community Cyber Literacy.

---

## 🛡️ Project Overview

**SECURENATION** is a full-stack cybersecurity awareness and incident triage web platform. Built to empower citizens, students, and digital payment users against online scams, phishing, UPI fraud, and data theft, SECURENATION unites real-time threat intelligence with structured reporting and interactive learning.

Unlike static landing pages or non-functional mockups, this repository contains a complete full-stack web application featuring:
1. **Interactive Cyber Defense Frontend** (React 19, Tailwind CSS, Lucide icons, responsive navigation).
2. **RESTful Express.js Backend** with input sanitization, rate-limiting (`express-rate-limit`), security headers (`helmet`), and CORS.
3. **Automated Local Database Persistence** with automated initial seed data for cyber threats, statutory emergency resources, sample incident reports, and community quiz benchmarks.
4. **End-to-End Incident Intake & Status Tracking** generating unique report IDs (e.g., `SN-2026-0001`) with PII-redacting tracking endpoints.
5. **Interactive 10-Question Cyber Quiz** with immediate rationale feedback, scoring metrics, and a community awareness leaderboard.
6. **8 Guided Learning Modules** with checklists, real-world case scenarios, and quick review quizzes.
7. **Administrative Demonstration Dashboard** secured via authentication gate to review unredacted reports, update case statuses, and view analytics.

---

## ⚡ Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Tooling**: Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS with custom cyber-grid and glassmorphism styling
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & JetBrains Mono

### Backend
- **Runtime**: Node.js & Express.js
- **Architecture**: REST APIs (`/api/*`)
- **Security**: Helmet, Express-Rate-Limit, CORS, server-side payload validation & sanitization
- **Database**: File-based local persistent datastore (`server/db_store.json`) with auto-seeding

---

## 🚀 Quick Start (Local Setup)

The application is engineered to run seamlessly with standard Node.js scripts:

```bash
# 1. Install all dependencies
npm install

# 2. Run the full-stack application (starts Express backend + Vite dev server)
npm run dev
```

Visit `http://localhost:3000` in your web browser.

### Available npm Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the full-stack Express server with Vite middleware on port 3000 (`tsx server.ts`) |
| `npm run build` | Compiles the production frontend bundle into `/dist` |
| `npm run start` | Launches the production Node server serving `/dist` |
| `npm run lint` | Runs TypeScript compiler checks without emitting files |

---

## 🔑 Administrative Demo Credentials

To present the Incident Command Dashboard during your project demonstration:
- Navigate to: `/admin` (or click the Dashboard icon in the navbar)
- **Demo Passcode**: `SECURENATION_ADMIN_2026`
- **Features in Admin**:
  - View full unredacted reporter details, phone numbers, and amounts lost.
  - Triage cases and transition statuses (`Submitted` ➔ `Under Review` ➔ `Investigating` ➔ `Resolved`).
  - Add resolution notes.
  - Review messages sent via the contact form.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/stats` | Retrieves live platform metrics, report counts, and awareness score |
| `GET` | `/api/threats` | Returns directory of 14 verified cyber threats with warning signs |
| `GET` | `/api/threats/:id` | Returns single threat intelligence profile |
| `POST` | `/api/reports` | Submits incident report, validates inputs, and assigns unique `SN-2026-XXXX` ID |
| `GET` | `/api/reports/:id` | Public report tracking endpoint (redacts PII to protect reporter identity) |
| `POST` | `/api/quiz/results` | Records quiz submission and computes awareness category |
| `GET` | `/api/quiz/stats` | Returns community quiz statistics and top entries for leaderboard |
| `GET` | `/api/resources` | Returns vetted statutory helplines and cyber defense guides |
| `POST` | `/api/contact` | Receives contact/collaboration inquiries into the database |
| `GET` | `/api/admin/reports` | *(Protected)* Returns all unredacted incident reports |
| `PATCH`| `/api/admin/reports/:id/status`| *(Protected)* Updates case status and logs audit notes |
| `GET` | `/api/admin/stats` | *(Protected)* Returns administrative analytics and contact messages |

---

## 🔒 Security by Design Implementation

As a dedicated cybersecurity project, the codebase demonstrates fundamental secure coding practices:
1. **Input Sanitization**: Replaces potential HTML injection tags `< >` in user submissions to mitigate stored XSS.
2. **Rate Limiting**: Applied to `/api/reports` and `/api/contact` to throttle spam bots.
3. **PII Masking**: Public tracking `/api/reports/:id` strips direct phone numbers and masks names (`A*** V***`) and emails (`ar***@example.com`).
4. **Role Separation**: Public clients cannot view administrative telemetry without a valid authorization bearer token.
5. **No Secrets in Frontend**: All credentials and sensitive server routes remain encapsulated on the server.

---

## 🏛️ Project Presentation Highlights (For Hackathon Judges)

1. **Realistic Problem Statement**: Focuses heavily on the surge in UPI QR frauds, Telegram work-from-home scams, and fake electricity APKs in India.
2. **Statutory Synergy**: Explicitly incorporates the official **National Cyber Crime Helpline (1930)** and **cybercrime.gov.in** escalation workflows.
3. **Complete Workflow**: From victim report ➔ Unique tracking ID ➔ Public status lookup ➔ Administrative triage in the back-office dashboard.

---

© 2026 SECURENATION. Built for academic hackathons & cyber trust.
