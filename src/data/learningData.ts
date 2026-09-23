import { QuizQuestion, LearningModule } from '../types/index.js';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Phishing',
    question: 'You receive an urgent email from "PayPal Security Team" warning that your account is locked and you must click a link within 24 hours. What should you do first?',
    options: [
      'Click the link immediately to verify your identity',
      'Forward the email to all your colleagues as a warning',
      'Check the actual sender address and open PayPal directly by typing paypal.com in your browser',
      'Reply to the email with your password to prove you are the real owner'
    ],
    correctAnswer: 2,
    explanation: 'Legitimate services never ask you to resolve account freezes via urgent unverified email links. Always check the sender domain and navigate directly via a trusted browser bookmark.'
  },
  {
    id: 2,
    topic: 'UPI & QR Code Safety',
    question: 'A buyer on an online marketplace offers to purchase your used phone and sends you a QR code to "receive payment into your bank account". What is the reality?',
    options: [
      'Scanning a QR code and entering your UPI PIN is standard to accept money',
      'Scanning a QR code and entering your UPI PIN ALWAYS deducts money from your account, never deposits it',
      'The QR code will deposit money only if you type 0000 as your PIN',
      'Only credit cards work with QR codes, not bank accounts'
    ],
    correctAnswer: 1,
    explanation: 'Golden Rule of Digital Payments: You NEVER need to enter your UPI PIN or scan a QR code to receive money. Entering your PIN authorizes a debit from your bank.'
  },
  {
    id: 3,
    topic: 'Passwords & Credentials',
    question: 'Which of the following is considered the strongest and most resilient password strategy?',
    options: [
      'Your pet’s name followed by your birth year (e.g. Bruno@2004)',
      'A 16+ character passphrase of random memorable words created via a password manager with MFA enabled',
      'A short 6-letter complex word with symbols (e.g. P@$$w0)',
      'The same complex password reused across all your social media and email accounts'
    ],
    correctAnswer: 1,
    explanation: 'Length beats complexity against brute force attacks. A 16+ character random passphrase stored in a password manager and defended by MFA is exponentially more secure.'
  },
  {
    id: 4,
    topic: 'OTP Security',
    question: 'A caller claiming to be an officer from your bank fraud prevention team asks for the 6-digit OTP sent to your phone to "cancel an unauthorized transaction". What should you do?',
    options: [
      'Give them the OTP quickly so the transaction gets cancelled',
      'Refuse, disconnect the call immediately, and call your bank using the number printed on the back of your debit card',
      'Ask them to email you before sharing the OTP',
      'Share only the first 3 digits of the OTP'
    ],
    correctAnswer: 1,
    explanation: 'Bank representatives and law enforcement NEVER ask for One-Time Passwords. Scammers trigger transactions and call you to capture the authorization OTP.'
  },
  {
    id: 5,
    topic: 'Public Wi-Fi',
    question: 'When using free public Wi-Fi at an airport or coffee shop, what is the best practice to protect your data?',
    options: [
      'Turn off your screen brightness to save battery',
      'Avoid entering sensitive passwords/financial portals or route your traffic through a trusted encrypted VPN',
      'Connect to the public network without a password because it is faster',
      'Disable your smartphone’s firewall'
    ],
    correctAnswer: 1,
    explanation: 'Unencrypted public Wi-Fi networks allow attackers on the same network to perform Man-in-the-Middle (MitM) attacks and packet sniffing.'
  },
  {
    id: 6,
    topic: 'Malware & Downloads',
    question: 'You want to download Photoshop or a premium PC game for free. A site offers a "cracked installer.exe" with a note saying "Disable your Windows Defender before installing". What should you do?',
    options: [
      'Disable antivirus temporarily as cracked software often false-alarms',
      'Do not download or execute the file; disabling antivirus for cracked software is a classic vector for trojans and keyloggers',
      'Run the software only inside an incognito browser window',
      'Rename the file extension from .exe to .txt'
    ],
    correctAnswer: 1,
    explanation: 'Pirated software and key generators are the number one distributor of info-stealers, remote access trojans (RATs), and ransomware targeting students and developers.'
  },
  {
    id: 7,
    topic: 'Social Engineering',
    question: 'What is "Pretexting" in cybersecurity?',
    options: [
      'Testing software source code before publishing on GitHub',
      'An attacker inventing an elaborate scenario (e.g., IT department audit or emergency hospital fund) to manipulate a victim into disclosing data',
      'Writing test documentation for automated unit testing',
      'Sending text messages in lowercase only'
    ],
    correctAnswer: 1,
    explanation: 'Pretexting is a social engineering technique where the attacker builds an artificial context (pretext) to establish trust and extract sensitive information.'
  },
  {
    id: 8,
    topic: 'Privacy & Personal Data',
    question: 'When submitting photocopies of your national ID (like Aadhaar card) for hotel check-ins or event registrations, what precaution is recommended?',
    options: [
      'Always share the original plastic smartcard for them to keep',
      'Use a "Masked" version where only the last 4 digits are visible and write the specific purpose across the copy',
      'Post a scan on Google Drive with public view access',
      'Laminate the copy before handing it over'
    ],
    correctAnswer: 1,
    explanation: 'Masked IDs obscure the full identification number from unauthorized indexing, and cross-signing the purpose prevents reuse in unauthorized SIM registrations or loan scams.'
  },
  {
    id: 9,
    topic: 'Account Security & MFA',
    question: 'Which Multi-Factor Authentication (MFA) method provides the highest defense against SIM-swapping and adversary-in-the-middle phishing?',
    options: [
      'SMS text message code',
      'Security questions (e.g. Mother’s maiden name)',
      'Hardware Security Key (FIDO2 / WebAuthn) or App-based Authenticator (TOTP)',
      'Voice phone call with automated code'
    ],
    correctAnswer: 2,
    explanation: 'FIDO2 hardware keys and TOTP authenticator apps are immune to telecommunication SIM-swap hijackings and automated reverse-proxy phishing kits.'
  },
  {
    id: 10,
    topic: 'Emergency Response',
    question: 'In India, what is the dedicated national 24/7 citizen helpline number to immediately report financial cyber frauds and freeze stolen bank funds?',
    options: [
      '100',
      '1930',
      '1098',
      '1800-00-00'
    ],
    correctAnswer: 1,
    explanation: '1930 is the Citizen Financial Cyber Fraud Reporting System helpline run under the Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs.'
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module-1',
    title: 'Module 1: Cybersecurity Basics & The Threat Landscape',
    subtitle: 'Understand the CIA Triad, threat actors, and attack surfaces',
    level: 'Beginner',
    readTime: '6 min read',
    explanation: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. The foundational pillar of digital trust is the CIA Triad: Confidentiality (only authorized parties can read data), Integrity (data cannot be altered in transit), and Availability (systems remain accessible when needed). Modern cyber threats do not just target high-profile corporations; everyday citizens, students, and small enterprises are frequent targets of opportunistic automated scanning.',
    keyPoints: [
      'The CIA Triad is the bedrock of information security architecture.',
      'Attack surfaces include smartphones, home routers, email inboxes, and web apps.',
      'Cyber hygiene: proactive daily habits like updating software and using password managers.'
    ],
    examples: [
      {
        scenario: 'A student receives an email claiming their college semester results are leaked on an external link.',
        analysis: 'Attackers exploit curiosity and urgency to bait the student into entering their campus portal credentials.',
        safeAction: 'Inspect the URL. If it does not belong to the official university domain, do not enter credentials.'
      }
    ],
    safetyChecklist: [
      'Keep your operating system and browsers updated with automatic security patches',
      'Check HaveIBeenPwned periodically for leaked email passwords',
      'Never leave personal laptops or phones unlocked in public study halls'
    ],
    quickQuiz: {
      question: 'What are the three pillars of the CIA Triad in information security?',
      options: ['Centralized, Internet, Automated', 'Confidentiality, Integrity, Availability', 'Control, Inspection, Access', 'Cybercrime, Identity, Attack'],
      correct: 1,
      explanation: 'Confidentiality, Integrity, and Availability form the CIA Triad.'
    }
  },
  {
    id: 'module-2',
    title: 'Module 2: Password & Account Security',
    subtitle: 'Master passphrases, credential stuffing defense, and MFA',
    level: 'Beginner',
    readTime: '8 min read',
    explanation: 'Single-password reuse is the Achilles heel of modern digital identity. When a low-security gaming forum gets breached, attackers instantly deploy bots to test your email and password across Amazon, Google, GitHub, and banking portals. To counteract this, modern security recommendations advise using long passphrases (16+ characters), dedicated password managers (like Bitwarden), and mandatory Multi-Factor Authentication.',
    keyPoints: [
      'Length over complexity: "correct-horse-battery-staple" is far harder to crack than "P@ss1".',
      'Credential stuffing bots automate millions of breach logins per hour.',
      'Authenticator apps (TOTP) and FIDO2 passkeys surpass SMS OTP in resistance to SIM swapping.'
    ],
    examples: [
      {
        scenario: 'You receive an unsolicited Google prompt: "Did you just try to sign in from Frankfurt, Germany?"',
        analysis: 'Your password was leaked or guessed, but 2-step verification blocked the attacker from finalizing access.',
        safeAction: 'Tap "No, it wasn’t me" immediately, and change your password from a clean device.'
      }
    ],
    safetyChecklist: [
      'Generate unique 16+ character passwords for every website',
      'Enable Multi-Factor Authentication (MFA) on email, banking, and social accounts',
      'Migrate from SMS-based verification to TOTP Authenticator apps where supported'
    ],
    quickQuiz: {
      question: 'Why are passphrases of multiple random words preferred over short complex passwords?',
      options: [
        'They are shorter and faster to type',
        'They offer drastically higher mathematical entropy while remaining humanly memorable',
        'They do not require lowercase letters',
        'They prevent physical theft of your laptop'
      ],
      correct: 1,
      explanation: 'High character count drastically multiplies brute-force search space, defeating dictionary and rainbow table attacks.'
    }
  },
  {
    id: 'module-3',
    title: 'Module 3: Phishing & Social Engineering',
    subtitle: 'Detect deceptive emails, fake websites, spear phishing, and pretexting',
    level: 'Intermediate',
    readTime: '7 min read',
    explanation: 'Social engineering targets the human brain rather than software vulnerabilities. Phishing attacks simulate authority, urgency, fear, or reward to short-circuit analytical thinking. Spear phishing tailors attacks using information scraped from LinkedIn or Instagram. Modern phishing pages use reverse-proxy kits (like Evilginx) capable of stealing session cookies even past 2FA, making domain verification vital.',
    keyPoints: [
      'Urgency and panic are tactical indicators of social manipulation.',
      'Always examine the domain hierarchy: "account.google.com" is Google; "google.com.account-update.xyz" is NOT.',
      'Beware of QR codes in unexpected places (Quishing).'
    ],
    examples: [
      {
        scenario: 'An SMS arrives claiming your courier parcel has been suspended due to an incomplete address with a link: bit.ly/del-39.',
        analysis: 'Shortened URLs hide the phishing domain destination to bypass automated carrier spam filters.',
        safeAction: 'Never open shortened links from unknown numbers. Check tracking status on the courier’s official app.'
      }
    ],
    safetyChecklist: [
      'Hover over links before clicking to inspect actual destination URLs',
      'Never download attachments with double extensions like "invoice.pdf.exe"',
      'Establish a strict habit: never disclose passwords or PINs to anyone via phone or chat'
    ],
    quickQuiz: {
      question: 'Which of the following domains represents a legitimate sub-domain of SecureNation?',
      options: [
        'securenation.org.phishportal.net',
        'portal.securenation.org',
        'securenation-verification.com',
        'login-securenation.in'
      ],
      correct: 1,
      explanation: 'In domain syntax, the true root domain sits directly to the left of the top-level domain (.org), making portal.securenation.org the authentic subdomain.'
    }
  },
  {
    id: 'module-4',
    title: 'Module 4: UPI & Online Banking Safety',
    subtitle: 'Protect your financial accounts against payment gateway frauds',
    level: 'Intermediate',
    readTime: '9 min read',
    explanation: 'Unified Payments Interface (UPI) has revolutionized instant digital finance, but has also become the prime vector for financial cybercrimes. Fraudsters exploit user misunderstandings regarding UPI PIN authorization. Common scams include fake "Collect" requests, QR code swap frauds, screen sharing via remote desktop tools, and spoofed bank customer support telephone numbers indexed on search engines.',
    keyPoints: [
      'The UPI PIN is SOLELY used for debiting money. Receiving money never requires a PIN.',
      'Never allow unknown individuals to guide you through remote desktop tools like AnyDesk.',
      'Bank customer support numbers found on Google search results can be manipulated by scammers.'
    ],
    examples: [
      {
        scenario: 'A buyer on an online marketplace agrees to buy your sofa and says: "I sent Rs 10 to test. Now accept my Rs 8,000 collect request."',
        analysis: 'The fraudster sent an actual Rs 10 transfer to win trust, followed by an Rs 8,000 DEBIT request.',
        safeAction: 'Decline the request. Block the user and report their profile.'
      }
    ],
    safetyChecklist: [
      'Set daily transaction limits on your UPI apps and net banking accounts',
      'Save official bank customer care contacts only from your physical passbook or bank website',
      'If scammed, dial 1930 within the "Golden Hour" to freeze fund transfers'
    ],
    quickQuiz: {
      question: 'Under what circumstance is entering a UPI PIN required?',
      options: [
        'When receiving cashback into your account',
        'When receiving prize money or festival rewards',
        'Exclusively when authorizing money to LEAVE your bank account',
        'To verify your mobile number on a payment app'
      ],
      correct: 2,
      explanation: 'The UPI PIN is a cryptographic signing key that only authorizes fund debits, never credits.'
    }
  },
  {
    id: 'module-5',
    title: 'Module 5: Social Media Security & Impersonation',
    subtitle: 'Guard against account hijacking, fake profiles, and extortion',
    level: 'Beginner',
    readTime: '6 min read',
    explanation: 'Social media platforms hold personal relationships, photos, and messaging histories. Attackers hijack accounts to execute emergency cash scams against your friends, post fake investment schemes, or harvest private photos for extortion. Attackers routinely clone profiles by copying your profile photo and bio, sending follow requests to your circle.',
    keyPoints: [
      'Account takeovers often begin with friends asking you to forward a verification SMS.',
      'Keep social media accounts private to limit personal data harvesting.',
      'Check authorized active devices and apps connected to your Instagram/Facebook account.'
    ],
    examples: [
      {
        scenario: 'A school friend messages on Instagram: "Hey! Can you send me the screenshot of the 6-digit code sent to your phone? My account recovery is stuck."',
        analysis: 'The friend’s account is hijacked. The attacker is attempting to reset YOUR account password.',
        safeAction: 'Never share the code. Call your friend via regular phone to alert them that their profile is hijacked.'
      }
    ],
    safetyChecklist: [
      'Turn on two-factor authentication (authenticator app) on Instagram, WhatsApp, and LinkedIn',
      'Enable WhatsApp Two-Step Verification PIN to protect against SIM-swap takeover',
      'Regularly review "Apps and Websites" permissions inside Facebook/Google settings'
    ],
    quickQuiz: {
      question: 'What is the primary motive when a scammer clones a student’s Instagram profile?',
      options: [
        'To improve the student’s follower count',
        'To solicit emergency money or loans from the student’s friends and family',
        'To optimize image compression algorithms',
        'To test web development servers'
      ],
      correct: 1,
      explanation: 'Impersonators prey on trust within personal networks to quickly siphon money from unsuspecting friends.'
    }
  },
  {
    id: 'module-6',
    title: 'Module 6: Safe Internet Browsing & Web Security',
    subtitle: 'HTTPS, DNS security, malicious extensions, and cookie privacy',
    level: 'Intermediate',
    readTime: '7 min read',
    explanation: 'The browser is your window to the web, making it a critical frontline defense. While HTTPS encrypts traffic between your browser and the web server, it does not guarantee the server itself is trustworthy (cybercriminals also use free SSL certificates!). Malicious browser extensions can read all website input, including credit card numbers and passwords.',
    keyPoints: [
      'HTTPS guarantees encrypted transport, but fraudulent phishing websites also use HTTPS.',
      'Browser extensions possess expansive permissions; only install from verified developers.',
      'Clean temporary site data and disable third-party cookie trackers.'
    ],
    examples: [
      {
        scenario: 'You install a free PDF converter chrome extension from an unverified developer.',
        analysis: 'The extension requests permissions to "Read and change all your data on the websites you visit".',
        safeAction: 'Decline and uninstall. Use built-in browser print-to-PDF functions instead.'
      }
    ],
    safetyChecklist: [
      'Audit your installed browser extensions every month and remove unused ones',
      'Use privacy-focused DNS (like Cloudflare 1.1.1.1 or Quad9 9.9.9.9)',
      'Keep your browser updated to patch Zero-Day V8 JavaScript engine vulnerabilities'
    ],
    quickQuiz: {
      question: 'Does the padlock icon (HTTPS) in your browser mean that a website is 100% legitimate and safe?',
      options: [
        'Yes, Google and Microsoft manually inspect every HTTPS website',
        'No, it only means the connection is encrypted; phishing sites can also have SSL certificates',
        'Yes, HTTPS is only granted to licensed financial institutions',
        'No, it means the website is offline'
      ],
      correct: 1,
      explanation: 'HTTPS encrypts data in transit against eavesdroppers, but malicious actors can easily obtain valid SSL certificates for phishing domains.'
    }
  },
  {
    id: 'module-7',
    title: 'Module 7: Mobile Security & App Permissions',
    subtitle: 'Defend Android & iOS devices from rogue APKs and permission leaks',
    level: 'Intermediate',
    readTime: '6 min read',
    explanation: 'Smartphones contain microphones, GPS tracking, contact lists, and banking apps. Side-loading unauthorized APK files from third-party websites or Telegram channels bypasses app store malware sandboxes. Malicious apps exploit accessibility services to read screen contents, capture OTPs from notification drawers, and click buttons without your knowledge.',
    keyPoints: [
      'Never enable "Install Unknown Apps / APKs" for unverified sources.',
      'Rogue apps exploit Android Accessibility Services to silently capture keystrokes.',
      'Review app permissions: a calculator app does not need access to Contacts or SMS.'
    ],
    examples: [
      {
        scenario: 'A flash loan app requests permission to read your Contact list, SMS messages, and Gallery.',
        analysis: 'Predatory loan apps upload your entire contact book and photo album to blackmail you for exorbitant interest.',
        safeAction: 'Deny permissions and immediately uninstall the application.'
      }
    ],
    safetyChecklist: [
      'Disable installation from Unknown Sources unless doing authorized developer debugging',
      'Ensure Google Play Protect or iOS App Integrity checks are active',
      'Regularly review location and microphone background permissions'
    ],
    quickQuiz: {
      question: 'Why is side-loading APK files from Telegram groups or random websites hazardous?',
      options: [
        'It changes the color scheme of your phone',
        'They bypass official app store malware screening and can contain trojans, spyware, and keyloggers',
        'It lowers your mobile network carrier speed',
        'It fills your phone storage with PDF files'
      ],
      correct: 1,
      explanation: 'Unverified APKs frequently bundle Remote Access Trojans (RATs) configured to steal banking credentials.'
    }
  },
  {
    id: 'module-8',
    title: 'Module 8: Privacy, Personal Data & The Digital Persona',
    subtitle: 'Protect your digital footprint, metadata, and identity tokens',
    level: 'Advanced',
    readTime: '8 min read',
    explanation: 'Every click, purchase, location check-in, and online forum post contributes to your permanent digital footprint. Data brokers aggregate this information into detailed behavioral profiles sold for targeted advertising or weaponized in social engineering. Practicing data minimization reduces the blast radius if an organization you interact with suffers a security incident.',
    keyPoints: [
      'Data minimization: only supply the minimum information required for a service to function.',
      'Be cautious with public metadata: photos contain EXIF GPS coordinates indicating your home location.',
      'Exercise your right to data deletion on platforms you no longer use.'
    ],
    examples: [
      {
        scenario: 'You post a photo of your new driving license or university student card on Twitter/X to celebrate.',
        analysis: 'Identity fraudsters scrape full names, dates of birth, student ID numbers, and address details.',
        safeAction: 'Never upload photos of official identification cards or flight boarding passes.'
      }
    ],
    safetyChecklist: [
      'Strip EXIF metadata or turn off camera location tagging before sharing public images',
      'Delete abandoned accounts on older web platforms',
      'Use email aliases (e.g. SimpleLogin or iCloud Hide My Email) when signing up for marketing newsletters'
    ],
    quickQuiz: {
      question: 'What is EXIF data commonly found inside unedited smartphone photos?',
      options: [
        'An encryption key for WhatsApp chats',
        'Metadata containing camera settings, date, time, and precise GPS coordinates',
        'A computer virus that infects social media accounts',
        'A watermark added by the phone manufacturer'
      ],
      correct: 1,
      explanation: 'EXIF metadata embeds technical camera information and location data directly inside image headers.'
    }
  }
];
