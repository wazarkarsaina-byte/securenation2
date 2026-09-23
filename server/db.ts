import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Threat, IncidentReport, QuizSubmission, ContactMessage, ResourceItem } from '../src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'db_store.json');

export interface DatabaseSchema {
  reports: IncidentReport[];
  threats: Threat[];
  resources: ResourceItem[];
  quizResults: QuizSubmission[];
  contacts: ContactMessage[];
}

const initialThreats: Threat[] = [
  {
    id: 'phishing',
    name: 'Phishing Attacks',
    category: 'Social Engineering',
    riskLevel: 'HIGH',
    description: 'Deceptive emails, fake portals, and crafted messages impersonating trusted organizations to steal credentials, credit cards, or sensitive data.',
    warningSigns: [
      'Urgent or threatening language ("Account suspended within 24h")',
      'Mismatched sender domain or spoofed email addresses',
      'Generic greetings like "Dear Customer"',
      'Suspicious attachments (.html, .exe, .zip, .iso)',
      'Fake login portals hosted on obscure domains'
    ],
    preventionTips: [
      'Always inspect the sender address domain after the "@" symbol',
      'Never click links in unexpected emails; navigate directly via bookmarks',
      'Enable Multi-Factor Authentication (MFA) on all critical accounts',
      'Use a modern password manager with autofill domain matching'
    ],
    whatToDoIfAffected: [
      'Immediately reset the compromised credentials',
      'Revoke active sessions and tokens in account settings',
      'Notify your IT/Security team and file an incident report on SecureNation',
      'Monitor your credit and bank alerts for anomalous activity'
    ],
    commonTargets: 'Email accounts, banking portals, cloud SaaS dashboards',
    reportCount: 342
  },
  {
    id: 'smishing',
    name: 'Smishing (SMS Phishing)',
    category: 'Mobile Security',
    riskLevel: 'HIGH',
    description: 'Fraudulent SMS text messages masquerading as banks, courier deliveries, or tax refunds containing dangerous shortened links.',
    warningSigns: [
      'Texts claiming courier delivery failed due to unpaid address fees',
      'Urgent electricity bill disconnection threats from unknown mobile numbers',
      'Shortened suspicious links (bit.ly, tinyurl, or random alphanumeric links)',
      'Demands to download an APK file to "update KYC"'
    ],
    preventionTips: [
      'Legitimate banks never send links asking you to update KYC via SMS',
      'Verify delivery issues directly on the official postal or courier website',
      'Block and report spam SMS through your telecom provider'
    ],
    whatToDoIfAffected: [
      'Never input credentials on links received via SMS',
      'If banking info was submitted, contact your bank helpline instantly to freeze accounts',
      'Scan your smartphone with official Play Protect or security tools'
    ],
    commonTargets: 'Smartphones, mobile banking customers, online shoppers',
    reportCount: 215
  },
  {
    id: 'vishing',
    name: 'Vishing (Voice Call Phishing)',
    category: 'Social Engineering',
    riskLevel: 'HIGH',
    description: 'Phone calls where fraudsters impersonate bank representatives, police, or tech support to extract OTPs, PINs, or remote screen access.',
    warningSigns: [
      'Caller creates panic claiming your account is linked to money laundering',
      'Aggressive request for the OTP sent to your phone "to verify identity"',
      'Insistence on installing remote desktop software like AnyDesk or TeamViewer',
      'Refusal to let you hang up and call back via official published numbers'
    ],
    preventionTips: [
      'Never share OTPs, CVV, or card PINs with anyone over the phone',
      'Official law enforcement never conducts virtual interrogation fines via video calls',
      'Disconnect immediately if asked to install remote desktop tools'
    ],
    whatToDoIfAffected: [
      'Immediately terminate the call',
      'If remote software was installed, immediately turn off Wi-Fi/Mobile Data and uninstall the app',
      'Call your bank fraud hotline to block cards and net banking'
    ],
    commonTargets: 'Elderly citizens, students, online banking users',
    reportCount: 180
  },
  {
    id: 'upi-fraud',
    name: 'UPI & QR Code Payment Fraud',
    category: 'Financial Fraud',
    riskLevel: 'CRITICAL',
    description: 'Tricking victims into scanning QR codes or entering UPI PINs under the pretext of receiving prize money, refunds, or marketplace payments.',
    warningSigns: [
      'Buyer insists on paying you by sending a QR code for you to scan',
      'Being asked to enter your UPI PIN to "receive" or "claim" money',
      'Fraudulent collect requests on PhonePe, Google Pay, or Paytm',
      'Fake transaction screenshots shared to show payment in transit'
    ],
    preventionTips: [
      'Golden Rule: You NEVER need to enter your UPI PIN to receive money',
      'Scanning a QR code ALWAYS deducts money from your account, never credits it',
      'Decline unknown UPI "Collect" requests immediately'
    ],
    whatToDoIfAffected: [
      'Immediately dial 1930 (National Cyber Crime Helpline) or your bank',
      'Report the transaction in your UPI app under "Report Fraud"',
      'File an official complaint on cybercrime.gov.in and SecureNation'
    ],
    commonTargets: 'OLX/Marketplace sellers, students, digital payment users',
    reportCount: 520
  },
  {
    id: 'malware',
    name: 'Malware & Spyware',
    category: 'Endpoint Security',
    riskLevel: 'HIGH',
    description: 'Malicious software including trojans, keyloggers, and spyware designed to infiltrate devices, log keystrokes, and steal data.',
    warningSigns: [
      'Sudden device slowdown, overheating, and rapid battery depletion',
      'Unfamiliar background processes and unfamiliar extensions in your browser',
      'Anti-virus or Windows Defender suddenly disabled without your knowledge',
      'Frequent pop-ups and unintended browser redirects'
    ],
    preventionTips: [
      'Download software only from verified publishers and official app stores',
      'Never run cracked software, keygens, or pirated game installers',
      'Keep operating system and security patches up to date'
    ],
    whatToDoIfAffected: [
      'Disconnect device from all Wi-Fi and ethernet networks',
      'Boot in Safe Mode and run a full offline antivirus scan',
      'If deeply compromised, backup essential files and perform a clean OS re-installation'
    ],
    commonTargets: 'Personal PCs, college lab computers, Android devices',
    reportCount: 289
  },
  {
    id: 'ransomware',
    name: 'Ransomware',
    category: 'Extortion',
    riskLevel: 'CRITICAL',
    description: 'Malicious payload that encrypts user documents, photos, or databases and demands cryptocurrency payments to restore files.',
    warningSigns: [
      'File extensions suddenly altered (e.g. .locked, .crypto, .enc)',
      'Desktop wallpaper replaced with ransom notes and countdown timers',
      'Files fail to open, accompanied by instructions to purchase Monero or Bitcoin'
    ],
    preventionTips: [
      'Maintain the 3-2-1 backup strategy: 3 copies, 2 different media, 1 offsite/immutable',
      'Disable remote desktop protocol (RDP) on publicly exposed internet ports',
      'Filter suspicious email attachments (.js, .vbs, .hta, .bat, .ps1)'
    ],
    whatToDoIfAffected: [
      'Instantly isolate the device from LAN and wireless networks to prevent lateral spread',
      'DO NOT pay the ransom — payment does not guarantee decryption and funds criminal syndicates',
      'Consult NoMoreRansom.org to check if public decryptor keys exist for the strain'
    ],
    commonTargets: 'Institutions, healthcare, small businesses, student project servers',
    reportCount: 94
  },
  {
    id: 'identity-theft',
    name: 'Identity Theft & KYC Impersonation',
    category: 'Identity',
    riskLevel: 'HIGH',
    description: 'Unauthorized acquisition of PAN, Aadhaar, SSN, or passports to apply for fraudulent loans, open mule accounts, or commit crimes.',
    warningSigns: [
      'Inquiries from credit bureaus (CIBIL/Experian) for loans you never requested',
      'Calls from debt collection agencies regarding unfamiliar liabilities',
      'Tax return rejection due to previous fraudulent filing in your name'
    ],
    preventionTips: [
      'Use Masked Aadhaar whenever submitting identity proof to hotels or vendors',
      'Regularly review your credit reports for unauthorized accounts',
      'Never post photos of airline boarding passes, government IDs, or passports on social media'
    ],
    whatToDoIfAffected: [
      'File an official FIR at the nearest cyber police station',
      'Place a credit freeze with major credit bureaus',
      'Notify your primary bank and the issuing agency of the compromised ID'
    ],
    commonTargets: 'General public, salaried individuals, university graduates',
    reportCount: 167
  },
  {
    id: 'password-attacks',
    name: 'Credential Stuffing & Brute Force',
    category: 'Authentication',
    riskLevel: 'HIGH',
    description: 'Automated attacks testing massive lists of breached username/password combos across hundreds of websites to hijack accounts.',
    warningSigns: [
      'Emails alerting you of successful logins from foreign countries or unknown devices',
      'Receiving MFA push notifications or 2FA codes without initiating a login',
      'Sudden password reset emails for accounts you have not accessed recently'
    ],
    preventionTips: [
      'Never reuse passwords across different platforms',
      'Adopt a strong passphrase (minimum 16 characters or 4 random words)',
      'Enforce hardware FIDO2 security keys or authenticator apps (TOTP), avoiding SMS OTP where possible'
    ],
    whatToDoIfAffected: [
      'Update the password immediately on the targeted service and any service sharing that password',
      'Revoke all authorized OAuth applications and logged-in sessions',
      'Check HaveIBeenPwned.com to verify which breaches compromised your data'
    ],
    commonTargets: 'Streaming services, social media, ecommerce, student portals',
    reportCount: 310
  },
  {
    id: 'social-engineering',
    name: 'Social Engineering & Pretexting',
    category: 'Psychological',
    riskLevel: 'MEDIUM',
    description: 'Manipulating human psychology via fear, urgency, authority, or romantic interest to coax victims into breaking security protocols.',
    warningSigns: [
      'Stranger claims to be an executive or professor demanding confidential student records',
      'Online romantic interest professes love quickly, then demands emergency medical funds',
      'Requests to bypass standard organizational verification procedures'
    ],
    preventionTips: [
      'Verify identity through secondary out-of-band communication channels',
      'Slow down: deliberate pressure is the #1 signature of a social engineer',
      'Follow organizational reporting protocols for suspicious requests'
    ],
    whatToDoIfAffected: [
      'Break contact immediately with the suspected manipulator',
      'Alert internal security personnel and preserve all chat transcripts and call records'
    ],
    commonTargets: 'College students, HR personnel, finance desk operators',
    reportCount: 145
  },
  {
    id: 'fake-websites',
    name: 'Typosquatting & Impersonation Portals',
    category: 'Web Security',
    riskLevel: 'MEDIUM',
    description: 'Cloned websites registered with subtly misspelled domain names (e.g. paypa1.com, amz0n.in) to intercept credit cards and logins.',
    warningSigns: [
      'Subtle spelling variations in the address bar (extra hyphen, swapped letters)',
      'SSL certificate issued to an unknown entity rather than the legitimate enterprise',
      'Broken footer links, distorted logos, or missing terms of service pages'
    ],
    preventionTips: [
      'Double-check URL spelling before entering sensitive data',
      'Bookmark critical banking and shopping destinations',
      'Use DNS providers with active malicious domain blocking (e.g. Quad9, Cloudflare 1.1.1.2)'
    ],
    whatToDoIfAffected: [
      'Close browser tab immediately',
      'Change any credentials that were submitted',
      'Report the phishing URL to Google Safe Browsing and SecureNation'
    ],
    commonTargets: 'Online shoppers, university admission candidates, banking clients',
    reportCount: 198
  },
  {
    id: 'job-scams',
    name: 'Work-From-Home & Job Scams',
    category: 'Employment Scams',
    riskLevel: 'HIGH',
    description: 'Fake recruitment promising thousands per day for watching videos or writing reviews, eventually requiring "security deposits" to withdraw earnings.',
    warningSigns: [
      'Recruitment conducted entirely via Telegram or WhatsApp by unknown HR reps',
      'Preposterous daily payouts ($100-$300/day) for rating hotels or YouTube videos',
      'Victim is asked to deposit funds into a "crypto wallet" or "prepaid task account"'
    ],
    preventionTips: [
      'Legitimate companies NEVER ask candidates to pay for employment or task unlocks',
      'Verify vacancies on the employer’s official careers page',
      'Do not trust Telegram groups displaying screenshots of purported bank credits'
    ],
    whatToDoIfAffected: [
      'Refuse all further payments regardless of promises of refunds',
      'Report Telegram accounts and fraudulent UPI VPA IDs',
      'Lodge a report on the National Cyber Crime portal'
    ],
    commonTargets: 'College students, job seekers, homemakers',
    reportCount: 388
  },
  {
    id: 'investment-scams',
    name: 'Pig Butchering & Fake Trading Apps',
    category: 'Financial Fraud',
    riskLevel: 'CRITICAL',
    description: 'Elaborate fraud where victims are guided by friendly online contacts to deposit money into manipulated fake crypto/forex trading dashboards.',
    warningSigns: [
      'Unsolicited friendly stranger on LinkedIn or Instagram offering trading mentorship',
      'Instructions to install an APK or web app not found on Google Play or App Store',
      'Dashboard shows astronomical fictitious profits, but withdrawals demand hefty "tax fees"'
    ],
    preventionTips: [
      'Only trade through registered, SEBI/SEC-authorized domestic brokers',
      'Never install third-party APKs recommended by internet acquaintances',
      'Remember: guaranteed high returns with zero risk is ALWAYS a scam'
    ],
    whatToDoIfAffected: [
      'Cease all fund transfers immediately — you will not recover money by paying fees',
      'Export all chat histories, wallet addresses, and bank receipts for law enforcement'
    ],
    commonTargets: 'Investors, professionals, young adults with savings',
    reportCount: 260
  },
  {
    id: 'social-media-theft',
    name: 'Social Media Account Takeover',
    category: 'Identity',
    riskLevel: 'MEDIUM',
    description: 'Hijacking Instagram, Facebook, or WhatsApp accounts to solicit emergency money from the victim’s friends list or promote scams.',
    warningSigns: [
      'A friend asks you to vote for them in an online contest and send them a code received by SMS',
      'Sudden log out and notification that your recovery phone number was modified',
      'Friends notifying you of bizarre cryptocurrency stories on your profile'
    ],
    preventionTips: [
      'Never send 6-digit codes or authentication links to anyone, even close friends',
      'Enable 2FA via Authenticator App instead of SMS',
      'Configure email security alerts and backup emergency codes'
    ],
    whatToDoIfAffected: [
      'Use the platform’s official identity verification process (e.g. video selfie for Instagram)',
      'Warn friends and family via alternative channels that your profile was hijacked',
      'Revoke access tokens and report the incident on SecureNation'
    ],
    commonTargets: 'Instagram influencers, students, creators',
    reportCount: 275
  },
  {
    id: 'data-breaches',
    name: 'Corporate Data Breaches',
    category: 'Corporate Incident',
    riskLevel: 'HIGH',
    description: 'Unauthorized exfiltration of customer databases, disclosing plaintext emails, hashed passwords, addresses, and payment tokens on dark web forums.',
    warningSigns: [
      'Notification from services indicating that system records were accessed',
      'Appearance of your email and passwords in publicly circulated paste sites',
      'Spike in targeted spam and phishing tailored with your actual private details'
    ],
    preventionTips: [
      'Use unique passwords for each service so a leak at one company doesn’t expose others',
      'Mask sensitive personal details when registering on secondary platforms',
      'Opt for virtual disposable credit cards where supported'
    ],
    whatToDoIfAffected: [
      'Change passwords on all associated accounts',
      'Enable biometric or app-based 2FA across all essential accounts',
      'Regularly check HaveIBeenPwned or breach alert utilities'
    ],
    commonTargets: 'Consumers, registered account holders, enterprise users',
    reportCount: 154
  }
];

const initialResources: ResourceItem[] = [
  {
    id: 'cybercrime-gov-in',
    title: 'National Cyber Crime Reporting Portal (India)',
    description: 'Official portal by the Ministry of Home Affairs to report all cybercrimes, financial frauds, and cyber harassment.',
    category: 'Government Resources',
    url: 'https://cybercrime.gov.in',
    badge: 'Official Gov Portal',
    isOfficial: true
  },
  {
    id: 'helpline-1930',
    title: 'Citizen Financial Cyber Fraud Helpline (1930)',
    description: 'Dedicated national emergency hotline for victims of UPI, credit card, and digital payment frauds to trigger rapid freezing of stolen funds.',
    category: 'Emergency Help',
    url: 'https://cybercrime.gov.in',
    badge: 'Emergency 24x7',
    isOfficial: true
  },
  {
    id: 'cert-in',
    title: 'CERT-In (Indian Computer Emergency Response Team)',
    description: 'National nodal agency for responding to computer security incidents, publishing vulnerability notes, advisories, and best practices.',
    category: 'Government Resources',
    url: 'https://www.cert-in.org.in',
    badge: 'National CERT',
    isOfficial: true
  },
  {
    id: 'have-i-been-pwned',
    title: 'Have I Been Pwned?',
    description: 'Respected independent database to verify if your email address or phone number has been exposed in public corporate data breaches.',
    category: 'Awareness Guides',
    url: 'https://haveibeenpwned.com',
    badge: 'Breach Check',
    isOfficial: false
  },
  {
    id: 'cisa-cyber-essentials',
    title: 'CISA Cyber Essentials Guide',
    description: 'Foundational cybersecurity practices developed by CISA to defend individuals and organizations against common digital attacks.',
    category: 'Awareness Guides',
    url: 'https://www.cisa.gov/cyber-essentials',
    badge: 'Best Practice',
    isOfficial: true
  },
  {
    id: 'rbi-sachet',
    title: 'RBI Sachet Portal (Reserve Bank of India)',
    description: 'Central portal to verify authorized deposit-taking entities and report illegal, fraudulent financial schemes and fake investment apps.',
    category: 'Banking Safety',
    url: 'https://sachet.rbi.org.in',
    badge: 'Banking Authority',
    isOfficial: true
  },
  {
    id: 'bitwarden-open-source',
    title: 'Bitwarden Open Source Password Manager',
    description: 'Industry-standard open source zero-knowledge password vault for securing complex credentials across desktop and mobile.',
    category: 'Password Security',
    url: 'https://bitwarden.com',
    badge: 'Tool Recommendation',
    isOfficial: false
  },
  {
    id: 'student-digital-hygiene',
    title: 'Campus & Student Digital Hygiene Blueprint',
    description: 'SecureNation curated guide on safeguarding college project repos, protecting campus Wi-Fi connections, and securing coding credentials.',
    category: 'Student Safety',
    url: '/learn',
    badge: 'SecureNation Guide',
    isOfficial: false
  },
  {
    id: 'stop-think-connect',
    title: 'Stop. Think. Connect. Global Campaign',
    description: 'Global cybersecurity education initiative providing digital safety resources, infographics, and actionable advice.',
    category: 'Awareness Guides',
    url: 'https://www.stopthinkconnect.org',
    badge: 'Global Initiative',
    isOfficial: true
  }
];

const initialReports: IncidentReport[] = [
  {
    id: 'SN-2026-0001',
    fullName: 'Arjun Verma (Demo Record)',
    email: 'arjun.demo@example.com',
    phoneNumber: '+91 98765 43210',
    incidentType: 'UPI Fraud',
    dateOfIncident: '2026-09-15',
    description: 'Victim was selling a laptop on an online marketplace. Fraudster sent a QR code stating it was required to receive Rs 15,000. Upon scanning and entering UPI PIN, funds were debited.',
    amountLost: 15000,
    websiteUrl: 'https://market-buyer-auth-fraud.fake',
    additionalInfo: 'Bank transaction reference UTR-98218731920. Case referred to 1930 emergency hotline.',
    status: 'Investigating',
    riskLevel: 'CRITICAL',
    createdAt: '2026-09-15T10:30:00.000Z',
    updatedAt: '2026-09-16T14:20:00.000Z',
    actionTakenNotes: 'Incident logged. User guided to file bank dispute and cybercrime.gov.in complaint.'
  },
  {
    id: 'SN-2026-0002',
    fullName: 'Priya Sharma (Demo Record)',
    email: 'priya.demo@example.com',
    phoneNumber: '+91 91234 56789',
    incidentType: 'Phishing',
    dateOfIncident: '2026-09-18',
    description: 'Received SMS masquerading as electricity provider warning of power cut within 2 hours. Clicked link and entered net banking details before realizing URL was invalid.',
    amountLost: 0,
    websiteUrl: 'http://electricity-bill-update-quick.xyz',
    additionalInfo: 'User changed bank password within 3 minutes and froze debit card.',
    status: 'Resolved',
    riskLevel: 'HIGH',
    createdAt: '2026-09-18T11:45:00.000Z',
    updatedAt: '2026-09-19T09:15:00.000Z',
    actionTakenNotes: 'Phishing domain reported to Google Safe Browsing and telecom registry.'
  },
  {
    id: 'SN-2026-0003',
    fullName: 'Rohan Deshmukh (Demo Record)',
    email: 'rohan.demo@example.com',
    phoneNumber: '+91 99887 76655',
    incidentType: 'Job Scam',
    dateOfIncident: '2026-09-20',
    description: 'Offered work-from-home reviewing travel destinations on Telegram. Required to deposit Rs 2,500 to "unlock" premium assignment tier.',
    amountLost: 2500,
    websiteUrl: 'https://t.me/fake_travel_task_portal',
    additionalInfo: 'Telegram channel had over 10,000 bot accounts faking positive testimonials.',
    status: 'Under Review',
    riskLevel: 'HIGH',
    createdAt: '2026-09-20T16:00:00.000Z',
    updatedAt: '2026-09-20T16:00:00.000Z',
    actionTakenNotes: 'Initial triage complete. Categorized under Telegram Task Scams.'
  },
  {
    id: 'SN-2026-0004',
    fullName: 'Kavita Nair (Demo Record)',
    email: 'kavita.demo@example.com',
    phoneNumber: '+91 94455 66778',
    incidentType: 'Social Media Hack',
    dateOfIncident: '2026-09-21',
    description: 'Instagram account taken over after clicking a "vote for our dance team" link received via direct message from a classmate whose account was also hacked.',
    amountLost: 0,
    websiteUrl: 'https://instagram-contest-vote-2026.net',
    additionalInfo: 'Hacker is currently messaging contacts asking for Rs 3,000 for emergency clinic bills.',
    status: 'Submitted',
    riskLevel: 'MEDIUM',
    createdAt: '2026-09-21T08:20:00.000Z',
    updatedAt: '2026-09-21T08:20:00.000Z',
    actionTakenNotes: 'User guided through Instagram video selfie recovery procedure.'
  }
];

const initialQuizResults: QuizSubmission[] = [
  {
    id: 'qz-101',
    userName: 'Aakash K. (BCA Student)',
    score: 10,
    totalQuestions: 10,
    percentage: 100,
    category: 'Cyber Safety Champion',
    completedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'qz-102',
    userName: 'Sneha P. (Engineering Student)',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    category: 'Strong Awareness',
    completedAt: '2026-09-21T19:30:00.000Z'
  },
  {
    id: 'qz-103',
    userName: 'Vikram S.',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    category: 'Strong Awareness',
    completedAt: '2026-09-22T10:15:00.000Z'
  },
  {
    id: 'qz-104',
    userName: 'Meera T.',
    score: 7,
    totalQuestions: 10,
    percentage: 70,
    category: 'Good Awareness',
    completedAt: '2026-09-22T14:40:00.000Z'
  }
];

const initialContacts: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'Prof. S. R. Kulkarni',
    email: 'kulkarni.cs@college.edu',
    subject: 'Cyber Awareness Workshop Collaboration',
    message: 'We would love to organize a SecureNation digital safety awareness drive for our 1st year BCA and BSc students next month.',
    createdAt: '2026-09-20T09:00:00.000Z',
    status: 'unread'
  },
  {
    id: 'msg-02',
    name: 'Anita Roy',
    email: 'anita.roy@example.com',
    subject: 'Suggestion for UPI Fraud Module',
    message: 'Great platform! Could you also cover the new voice OTP bypass tricks that scammers use?',
    createdAt: '2026-09-21T11:20:00.000Z',
    status: 'read'
  }
];

class DatabaseService {
  private db: DatabaseSchema;

  constructor() {
    this.db = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Could not read existing database file, falling back to seed data:', err);
    }

    const defaultDb: DatabaseSchema = {
      reports: initialReports,
      threats: initialThreats,
      resources: initialResources,
      quizResults: initialQuizResults,
      contacts: initialContacts
    };

    this.saveToDisk(defaultDb);
    return defaultDb;
  }

  private saveToDisk(data: DatabaseSchema): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database to disk:', err);
    }
  }

  // Reports
  public getReports(): IncidentReport[] {
    return this.db.reports;
  }

  public getReportById(id: string): IncidentReport | undefined {
    return this.db.reports.find(r => r.id.toLowerCase() === id.trim().toLowerCase());
  }

  public addReport(reportData: Omit<IncidentReport, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'riskLevel'>): IncidentReport {
    const year = new Date().getFullYear();
    const count = this.db.reports.length + 1;
    const formattedId = `SN-${year}-${String(count).padStart(4, '0')}`;

    // Calculate baseline risk level
    let riskLevel: IncidentReport['riskLevel'] = 'MEDIUM';
    if (reportData.amountLost > 50000 || ['Ransomware', 'UPI Fraud', 'Financial Fraud'].includes(reportData.incidentType)) {
      riskLevel = 'CRITICAL';
    } else if (reportData.amountLost > 5000 || ['Phishing', 'Identity Theft', 'Malware'].includes(reportData.incidentType)) {
      riskLevel = 'HIGH';
    } else if (['Social Media Hack', 'Online Scam'].includes(reportData.incidentType)) {
      riskLevel = 'MEDIUM';
    } else {
      riskLevel = 'LOW';
    }

    const newReport: IncidentReport = {
      ...reportData,
      id: formattedId,
      status: 'Submitted',
      riskLevel,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      actionTakenNotes: 'Automated receipt generated. Security incident logged for review.'
    };

    this.db.reports.unshift(newReport);
    this.saveToDisk(this.db);
    return newReport;
  }

  public updateReportStatus(id: string, status: IncidentReport['status'], notes?: string): IncidentReport | null {
    const index = this.db.reports.findIndex(r => r.id.toLowerCase() === id.trim().toLowerCase());
    if (index === -1) return null;

    this.db.reports[index] = {
      ...this.db.reports[index],
      status,
      updatedAt: new Date().toISOString(),
      ...(notes ? { actionTakenNotes: notes } : {})
    };

    this.saveToDisk(this.db);
    return this.db.reports[index];
  }

  // Threats
  public getThreats(): Threat[] {
    return this.db.threats;
  }

  public getThreatById(id: string): Threat | undefined {
    return this.db.threats.find(t => t.id === id);
  }

  // Resources
  public getResources(): ResourceItem[] {
    return this.db.resources;
  }

  // Quiz
  public getQuizResults(): QuizSubmission[] {
    return this.db.quizResults;
  }

  public addQuizResult(submission: Omit<QuizSubmission, 'id' | 'completedAt'>): QuizSubmission {
    const newSubmission: QuizSubmission = {
      ...submission,
      id: `qz-${Date.now().toString(36)}`,
      completedAt: new Date().toISOString()
    };
    this.db.quizResults.unshift(newSubmission);
    this.saveToDisk(this.db);
    return newSubmission;
  }

  // Contacts
  public getContacts(): ContactMessage[] {
    return this.db.contacts;
  }

  public addContact(contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const newContact: ContactMessage = {
      ...contact,
      id: `msg-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    this.db.contacts.unshift(newContact);
    this.saveToDisk(this.db);
    return newContact;
  }

  // Stats calculation
  public getStats() {
    const totalReports = this.db.reports.length;
    const pendingReports = this.db.reports.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;
    const resolvedReports = this.db.reports.filter(r => r.status === 'Resolved').length;
    const quizParticipants = this.db.quizResults.length + 1280; // Added baseline community participation count
    const messagesReceived = this.db.contacts.length;
    const safetyResources = this.db.resources.length;

    // Reports by category
    const reportsByCategory: Record<string, number> = {};
    for (const report of this.db.reports) {
      reportsByCategory[report.incidentType] = (reportsByCategory[report.incidentType] || 0) + 1;
    }

    // Reports over time
    const reportsOverTime = [
      { month: 'Apr', count: 18 },
      { month: 'May', count: 27 },
      { month: 'Jun', count: 35 },
      { month: 'Jul', count: 44 },
      { month: 'Aug', count: 62 },
      { month: 'Sep', count: Math.max(78, totalReports + 70) }
    ];

    // Quiz score distribution
    const quizPerformance = [
      { range: '0-40% Needs Improvement', count: 110 },
      { range: '41-70% Good Awareness', count: 345 },
      { range: '71-90% Strong Awareness', count: 520 },
      { range: '91-100% Champion', count: 305 + this.db.quizResults.length }
    ];

    return {
      threatsReported: 2480 + totalReports,
      peopleEducated: 14250 + quizParticipants,
      safetyResources,
      cyberAwarenessScore: 88,
      totalReports,
      pendingReports,
      resolvedReports,
      quizParticipants,
      messagesReceived,
      reportsByCategory,
      reportsOverTime,
      quizPerformance
    };
  }
}

export const dbService = new DatabaseService();
