/**
 * VIKASH KUMAR GUPTA — AI PERSONAL KNOWLEDGE BASE
 * Portfolio AI Training & Personal Context Data Structure
 */

export const CORE_IDENTITY = {
  name: "Vikash Kumar Gupta",
  handle: "Vortex",
  github: "Vortex-16",
  githubUrl: "https://github.com/Vortex-16/",
  portfolioUrl: "https://vikash.is-a.dev/",
  leetcode: "Vortex16",
  role: "Full-Stack & Frontend Developer, UI/UX Builder, CSE Student",
  conciseBio: "A 3rd Year B.Tech CSE student and Full-Stack Developer with proven production internship experience at Dexmy, specializing in concurrency-hardened backend systems, modern UI/UX, and AI-powered products."
};

export const EDUCATION = {
  degree: "B.Tech — Computer Science & Engineering",
  institution: "St. Thomas College of Engineering & Technology (STCET)",
  timeline: "2024–2028",
  cgpa: "7.34 (approx 7.3 through 4th semester)",
  school: {
    class10: "Pulseford ICSE (~75%)",
    class12: "Pulseford / ISC (~75%, CS Background)"
  },
  subjects: [
    "Programming in C / Java",
    "Data Structures & Algorithms",
    "Computer Organization & Architecture",
    "Operating Systems & Linux",
    "Discrete Mathematics",
    "Digital Logic & Verilog"
  ]
};

export const EXPERIENCE = [
  {
    company: "Dexmy",
    role: "Full-Stack Web Development Intern",
    period: "August 2026 – September 2026 (3rd Year)",
    status: "Completed",
    description: "Completed intensive 1-month full-stack internship delivering 4 production-grade modules covering frontend dashboards, database concurrency, cross-service microservices, and payment gateways.",
    highlights: [
      "Parent Dashboard: Architected responsive multi-child account linking, dynamic context switching, course discovery, and package balance display.",
      "Booking Concurrency Hardening: Eliminated double-booking and race conditions using PostgreSQL EXCLUDE USING GIST range constraints and UUID idempotency keys.",
      "Testing Microservice Integration: Integrated standalone Node.js/Express Testing service with Dexmy FastAPI backend using federated JWT authentication and RBAC (test_creator role).",
      "Payment Architecture: Production-hardened Razorpay checkout flow with PostgreSQL SELECT FOR UPDATE row-level locks, migration unique constraints, and automated concurrency test suites."
    ],
    tech: ["Python", "FastAPI", "Node.js", "Express.js", "PostgreSQL", "React", "Razorpay", "JWT Auth", "Pytest"]
  }
];

export const CAREER_DIRECTION = {
  recentRole: "Full-Stack Web Development Intern at Dexmy (Completed in 3rd Year, September 2026)",
  primaryTarget: "Full-Stack & Frontend Engineering Roles",
  openTo: ["Full-Stack Development", "Backend Development", "Frontend Development", "AI Engineering"],
  longTermGoal: "Become a strong software engineer capable of designing, building, deploying, and maintaining complete products with production-grade reliability and polished UI/UX."
};

export const TECHNICAL_SKILLS = {
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "ScrollTrigger", "Swiper", "Responsive Web Dev", "Interaction Design"],
  backend: ["Python", "FastAPI", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis", "JWT Auth", "Row-Level Locks (SELECT FOR UPDATE)", "PostgreSQL GIST Locks"],
  aiCloudWeb3: ["Google Gemini AI", "Razorpay SDK & Webhooks", "Google OAuth", "Firebase", "IPFS", "Ethereum / Solidity", "Git & GitHub", "Vercel", "Render", "Railway", "Docker / Docker Compose"],
  foundations: ["C", "Java", "DSA", "Operating Systems / Linux", "Computer Architecture", "Digital Logic & Verilog"],
  algorithms: ["Merge Sort", "Quick Sort", "Binary Search", "BFS", "DFS", "Dijkstra", "Bellman-Ford", "Floyd-Warshall", "Coin Change", "Fractional Knapsack", "Job Sequencing", "AVL Trees", "Stack", "Queue", "Linked Lists"]
};

export const MAJOR_PROJECTS = [
  {
    id: "dexmy-platform",
    name: "Dexmy EdTech Platform (Internship Deliverables)",
    tagline: "Full-stack parent dashboard, concurrency-safe booking, microservice auth & Razorpay payments",
    description: "Delivered 4 critical production modules for Dexmy: responsive Parent Dashboard, PostgreSQL GIST concurrency-safe booking engine, cross-service JWT authentication with Node.js/FastAPI, and production-hardened Razorpay student package checkout.",
    tech: ["FastAPI", "Python", "PostgreSQL", "Node.js", "Express", "React", "Razorpay", "Pytest"]
  },
  {
    id: "arynox-llm",
    name: "Arynox LLM",
    tagline: "Socratic RAG-based AI tutoring platform",
    description: "Guides learners through guided inquiry rather than giving answers directly. Designed for conceptual mastery using Retrieval-Augmented Generation.",
    tech: ["React", "Node.js", "Gemini AI", "Vector Search", "Tailwind CSS"]
  },
  {
    id: "devtrack",
    name: "DevTrack & DevTrack V2",
    tagline: "AI Developer Growth Platform & Local-First Control Center",
    description: "Combines GitHub analytics with productivity tracking. V2 direction features Deep Focus Engine, Exam & Roadmap Tracker, Docker Compose, PostgreSQL, Redis, and HMAC webhook security.",
    tech: ["React", "Groq Llama 3.3", "Node.js", "Express", "Docker Compose", "PostgreSQL", "Redis", "Firebase"]
  },
  {
    id: "punarchakra",
    name: "Punarchakra / E-BIN",
    tagline: "AI-assisted E-Waste management platform",
    description: "Uses AI-assisted classification to identify electronic waste and route it for intelligent recycling.",
    tech: ["React", "Node.js", "AI Vision Classifier", "Tailwind CSS"]
  },
  {
    id: "codebattle-arena",
    name: "CodeBattle Arena",
    tagline: "Competitive programming 1v1 challenge platform",
    description: "Features live code execution, real-time matchmaking, test case runner, and competitive rating system.",
    tech: ["React", "Node.js", "Socket.io", "Express"]
  },
  {
    id: "vani",
    name: "VAni",
    tagline: "Voice-first AI healthcare & emergency-response platform",
    description: "Enables accessible, voice-oriented healthcare and rapid emergency interaction workflows.",
    tech: ["React", "Web Speech API", "Node.js", "Gemini AI"]
  },
  {
    id: "aerovista",
    name: "AeroVista / TourCraft",
    tagline: "AI-powered travel & tourism discovery platform",
    description: "Helps travelers discover personalized itineraries and explore cultural tourism destinations.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Node.js"]
  },
  {
    id: "trusted-sih",
    name: "TrustED (SIH PS 25029)",
    tagline: "Decentralized document authenticity validation platform",
    description: "Smart India Hackathon solution utilizing IPFS, Ethereum/Solidity smart contracts, and DigiLocker integration.",
    tech: ["Ethereum", "Solidity", "IPFS", "React", "Web3.js"]
  },
  {
    id: "rapid-crisis",
    name: "Rapid Crisis Response",
    tagline: "Google Solution Challenge 2026 Emergency Platform",
    description: "Emergency response system with instant SOS, AI symptom checker, ambulance integration, and offline emergency mode.",
    tech: ["React", "Node.js", "Firebase", "PWA Offline"]
  },
  {
    id: "queueease",
    name: "QueueEase / WaitWise",
    tagline: "Smart queue & wait-time management app",
    description: "Reduces physical waiting lines and optimizes user flow in service centers.",
    tech: ["React", "Firebase", "Node.js"]
  },
  {
    id: "avataran",
    name: "Avataran",
    tagline: "Mobile-responsive web platform",
    description: "Responsive web project under active development at avataran.vercel.app.",
    tech: ["React", "Tailwind CSS", "Vercel"]
  },
  {
    id: "stcet-coding-club",
    name: "STCET Coding Club Website",
    tagline: "Official community & event portal for STCET Coding Club",
    description: "Independently designed platform for college coding club featuring event registration, announcements, and team showcases.",
    tech: ["React", "GSAP", "Tailwind CSS", "Framer Motion"]
  }
];

export const ACHIEVEMENTS = [
  "Google Solution Challenge 2026 — Global Top 106 Team",
  "Smart India Hackathon (SIH) — Internal Hackathon Qualifier (Top 45 Teams)",
  "Kshitij, IIT Kharagpur (2025) — Top 8 Performer in Summer Web Development Program",
  "Dexmy Full-Stack Internship (2026) — Successfully delivered 4 major production modules",
  "Explored SIH Problem Statements: PS 25029 (TrustED), PS 25207 (Prashikshan/Trybe), PS 25032 (Eco & Cultural Tourism)"
];

export const DESIGN_PREFERENCES = {
  style: "Clean, premium, minimal, responsive interfaces with strong visual hierarchy",
  inspiration: ["Bento-grid layouts", "Nothing UI aesthetic", "Samsung One UI clarity", "Restrained glassmorphism"],
  colors: "Black, White, and Red visual direction (avoiding excessive neon/gradients)",
  motion: "Purposeful GSAP and Framer Motion micro-interactions"
};

export const LINUX_OS_CONTEXT = {
  distros: ["EndeavourOS", "Ubuntu", "Arch Linux", "WSL"],
  desktopEnv: ["Hyprland", "Waybar", "Kitty", "Rofi", "SwayNC", "Starship"],
  cliTools: ["zsh", "Starship", "eza", "btop", "batcat", "fastfetch"],
  hardware: "Dell Vostro 3400 (11th Gen Intel i5-1135G7, 512GB NVMe SSD, mixed RAM)"
};

/* ── Interactive Knowledge Base Queries ── */
export const AI_KB_ENTRIES = [
  {
    keys: ["who is", "identity", "bio", "about vikash", "vortex", "who"],
    answer: `Vikash Kumar Gupta (handle: Vortex) is a 3rd-year B.Tech CSE student (2024–2028) at STCET Kolkata and a Full-Stack Web Developer who completed his 1-month production engineering internship at Dexmy in his 3rd year (Aug–Sep 2026). He specializes in full-stack web applications, concurrency-safe backend systems, modern UI/UX, and AI integrations.`
  },
  {
    keys: ["dexmy", "internship", "dexmy internship", "dexmy education", "experience", "work experience"],
    answer: `Vikash completed an intensive Full-Stack Web Development Internship at Dexmy in his 3rd year (Aug–Sep 2026). Key deliverables:\n• Parent Dashboard: Multi-child account linking, dynamic child switching, course discovery, and package balance display\n• Booking Engine: Concurrency-safe class booking using PostgreSQL EXCLUDE USING GIST range constraints & UUID idempotency\n• Microservice Integration: Shared JWT auth integrating Node/Express testing service with FastAPI backend\n• Payment Architecture: Razorpay package checkout flow with SELECT FOR UPDATE row locking and duplicate webhook defense.`
  },
  {
    keys: ["education", "college", "degree", "cgpa", "stcet", "study", "gpa"],
    answer: `Vikash is pursuing B.Tech in CSE at St. Thomas' College of Engineering & Technology (STCET), Kolkata (2024–2028) with a 7.34 CGPA (~7.3 through 4th semester). He completed ICSE Class 10 (~75%) and ISC Class 12 (~75%, CS stream) at Pulseford.`
  },
  {
    keys: ["stack", "tech", "skills", "frontend", "backend", "languages"],
    answer: `Vikash's tech stack:\n• Frontend: React, Next.js, Tailwind CSS, Framer Motion, GSAP / ScrollTrigger, Swiper\n• Backend: Python (FastAPI), Node.js, Express, PostgreSQL (Row Locks & GIST Constraints), MongoDB, Redis, JWT\n• Payment & Cloud: Razorpay SDK & Webhooks, Gemini AI, Docker Compose, Git/GitHub, Vercel\n• Core Languages: JavaScript, Python, C, Java`
  },
  {
    keys: ["projects", "built", "work", "portfolio", "devtrack", "arynox"],
    answer: `Notable projects by Vikash:\n• Dexmy EdTech Platform — Full-stack parent dashboard, booking concurrency, and Razorpay payment architecture\n• Arynox LLM — Socratic RAG AI tutor\n• DevTrack V2 — AI developer platform with focus engine & Docker/Postgres\n• CodeBattle Arena — 1v1 competitive coding app\n• Punarchakra / E-BIN — AI e-waste classification\n• Rapid Crisis Response — Emergency app (Google Solution Challenge Top 106)\n• TrustED — SIH document validation (IPFS/Solidity)\n• VAni — Voice-first healthcare AI`
  },
  {
    keys: ["devtrack", "dev track"],
    answer: `DevTrack is Vikash's AI developer growth platform. DevTrack V2 includes a Deep Focus Engine, Exam & Roadmap Tracker, Control Center, Docker Compose infrastructure with PostgreSQL & Redis, and HMAC webhook security.`
  },
  {
    keys: ["arynox", "socratic", "rag"],
    answer: `Arynox LLM is an AI tutoring platform built by Vikash using RAG (Retrieval-Augmented Generation). It guides learners Socratically by asking questions rather than giving direct answers.`
  },
  {
    keys: ["achievement", "hackathon", "google", "sih", "iit", "award"],
    answer: `Key achievements:\n1. Google Solution Challenge 2026 — Global Top 106 Team\n2. Smart India Hackathon (SIH) — Internal Hackathon Qualifier (Top 45 Teams)\n3. Summer Web Dev Program, Kshitij IIT Kharagpur (2025) — Top 8 Performer\n4. Dexmy Full-Stack Internship (2026) — Successfully delivered 4 major production modules`
  },
  {
    keys: ["career", "job", "hire", "available", "target", "roles", "full time", "part time"],
    answer: `Vikash is open to Full-Stack, Frontend, and Backend software engineering opportunities. Having recently completed his Full-Stack Web Development Internship at Dexmy (hardening payment architectures, booking concurrency, and microservice integrations), he brings proven hands-on production engineering experience.`
  },
  {
    keys: ["design", "ui", "ux", "style", "theme", "preference"],
    answer: `Vikash prefers clean, minimal, bento-grid inspired layouts with black, white, and red color direction (inspired by Nothing UI & Samsung One UI). He favors purposeful Framer Motion & GSAP animations over excessive neon gradients.`
  },
  {
    keys: ["linux", "os", "hyprland", "waybar", "setup", "terminal"],
    answer: `Vikash daily-drives Linux (EndeavourOS / Arch / Ubuntu) with Hyprland, Waybar, Kitty, Rofi, Starship, zsh, btop, and fastfetch. He studies OS internals, bootloaders (GRUB/UEFI), and computer architecture.`
  },
  {
    keys: ["contact", "email", "github", "reach", "leetcode"],
    answer: `Connect with Vikash:\n• GitHub: https://github.com/Vortex-16/\n• Portfolio: https://vikash.is-a.dev/\n• LeetCode: Vortex16\n• Email: vikash.kr.gupta.dev@gmail.com`
  }
];
