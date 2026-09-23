import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ThreatsPage } from './pages/ThreatsPage.js';
import { LearnPage } from './pages/LearnPage.js';
import { ReportPage } from './pages/ReportPage.js';
import { StatusPage } from './pages/StatusPage.js';
import { QuizPage } from './pages/QuizPage.js';
import { ResourcesPage } from './pages/ResourcesPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { AdminDashboard } from './pages/AdminDashboard.js';
import { NotFoundPage } from './pages/NotFoundPage.js';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/threats" element={<ThreatsPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
