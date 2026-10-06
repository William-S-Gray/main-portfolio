export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: "healthcare" | "management" | "marketplace" | "entertainment" | "ai" | "retail" | "security" | "emergency";
  githubUrl?: string;
  liveUrl?: string;
  /** Optional screenshot in /public/projects. When omitted, a branded gradient placeholder is shown. */
  image?: string;
  /** Badge for work that isn't a shipped product: not deployed yet, or a concept build. */
  status?: "in-development" | "concept";
  /** Shown in the homepage "Featured work" section. */
  featured?: boolean;
  /** Case-study detail — powers /projects/:id. */
  problem?: string;
  role?: string;
  features?: string[];
  /** Layers of the system, top to bottom — rendered as a simple flow diagram. */
  architecture?: string[];
  /** Design decisions and their trade-offs. */
  decisions?: { title: string; detail: string }[];
  /** Measured results, testing and engineering facts. Only real numbers. */
  results?: string[];
}

export const projects: Project[] = [
  {
    id: "pathoguide",
    featured: true,
    title: "PathoGuide",
    description: "A professional clinical decision support system designed to optimize antibiotic prescribing based on real-time local resistance data from Mutare. Revolutionizing antimicrobial stewardship.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "FastAPI"],
    category: "healthcare",
    liveUrl: "https://pathoguide-frontend.onrender.com/",
    image: "/projects/pathoguide.webp",
    problem:
      "Clinicians often prescribe antibiotics without visibility into local resistance patterns, accelerating antimicrobial resistance and worsening patient outcomes.",
    role: "Full-stack design & development",
    features: [
      "Real-time local antibiotic resistance data from Mutare",
      "Evidence-based prescribing recommendations",
      "Antimicrobial stewardship dashboards",
      "Analytics on emerging resistance trends",
    ],
    architecture: [
      "React + TypeScript frontend (Recharts dashboards)",
      "Node.js / Express API — Prisma ORM, Socket.IO realtime",
      "Python FastAPI AI service — treatment recommendations",
      "PostgreSQL with trigram indexes",
    ],
    results: [
      "109 backend tests (Jest), 15 frontend tests (Vitest) and Cypress end-to-end tests",
      "GitHub Actions gates every PR on tests, type-checking and build",
      "HMAC-keyed audit log; the server refuses to start if required secrets are missing or weak",
    ],
  },
  {
    id: "campusiq",
    featured: true,
    title: "CampusIQ",
    description: "A modern, all-in-one school management platform that streamlines administration, empowers teachers, and engages students with real-time academic tracking and analytics.",
    techStack: ["React", "Spring Boot", "PostgreSQL", "JWT"],
    category: "management",
    liveUrl: "https://edunext-app-f.onrender.com",
    image: "/projects/campusiq.webp",
    problem:
      "Schools juggle administration, teaching, and student engagement across disconnected tools that don't talk to each other.",
    role: "Full-stack design & development",
    features: [
      "Unified administration & academic tracking",
      "Dedicated teacher and student portals",
      "Real-time performance analytics",
      "JWT-secured, role-based access control",
    ],
  },
  {
    id: "meal-pass",
    title: "Meal Pass",
    description: "A smart employee feeding system for Africa Accommodation Providers (AAP). Scannable QR and barcode meal IDs verify each employee's eligibility at the checkpoint, block double feeding in real time, and give admins live reports.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    category: "management",
    githubUrl: "https://github.com/William-S-Gray/meal-pass",
    liveUrl: "https://meal-pass-frontend.onrender.com",
    problem:
      "Meals are served only to eligible employees, but paper checks make it hard to catch expired access or the same person being fed twice — and leave no reliable record.",
    role: "Full-stack design & development",
    features: [
      "Employee meal IDs with QR code + barcode",
      "Checkpoint scan verifies identity, validity period and whether already fed",
      "ATM-style ID cards — bulk printing up to 40 per sheet",
      "Daily, weekly & date-range reports with CSV/PDF export",
    ],
  },
  {
    id: "davison-motors",
    title: "Davison Motors",
    description: "A premium automotive management platform offering an elite experience for luxury car dealerships. Manage inventory and showcase high-end vehicles with unparalleled elegance.",
    techStack: ["React", "Three.js", "Express", "MongoDB"],
    category: "management",
    liveUrl: "https://frontend-nz41.onrender.com",
    image: "/projects/davison-motors.webp",
    role: "Full-stack design & development",
    features: [
      "Dealership inventory management",
      "Interactive 3D vehicle showcase (Three.js)",
      "Premium, high-end dealership UX",
      "MongoDB-backed vehicle catalog",
    ],
  },
  {
    id: "echostream",
    status: "concept",
    title: "EchoStream",
    description: "Experience music like never before with EchoStream. A futuristic music management system featuring dynamic visualizers, glassmorphism UI, and personalized audio discovery.",
    techStack: ["React", "Web Audio API", "Framer Motion", "Supabase"],
    category: "entertainment",
    role: "Full-stack design & development",
    features: [
      "Dynamic real-time audio visualizers",
      "Glassmorphism interface",
      "Personalized audio discovery",
      "Web Audio API playback engine",
    ],
  },
  {
    id: "mediflow",
    status: "concept",
    title: "MediFlow",
    description: "Optimizing hospital operations with MediFlow. A high-tech management system for real-time patient tracking, staff coordination, and medical inventory control.",
    techStack: ["React", "Next.js", "TypeScript", "Redis"],
    category: "healthcare",
    role: "Full-stack design & development",
    features: [
      "Real-time patient tracking",
      "Staff coordination workflows",
      "Medical inventory control",
      "Redis-backed live updates",
    ],
  },
  {
    id: "pharmtrack",
    title: "PharmConnect Zim",
    description: "Real-time medicine availability for Zimbabwe: patients search for a medicine and instantly see which nearby pharmacies have it in stock, with prices and one-tap calling. Pharmacies manage inventory and get low-stock SMS alerts.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "PostGIS"],
    category: "healthcare",
    liveUrl: "https://pharmconnect-zim.vercel.app/",
    image: "/projects/pharmconnect-zim.webp",
    problem:
      "Patients in Zimbabwe often visit pharmacy after pharmacy before finding the medicine they need.",
    role: "Full-stack design & development",
    features: [
      "No-login medicine search with in-stock / low / out-of-stock status and prices",
      "Filter by city or GPS location, one-tap call to the pharmacy",
      "Pharmacy dashboard: stock CRUD, CSV/Excel import & export",
      "Configurable SMS low-stock alerts",
      "Admin panel: pharmacy approvals, drug database, search analytics",
      "Free, Basic and Pro subscription tiers",
    ],
  },
  {
    id: "agriconnect",
    status: "concept",
    title: "AgriConnect Marketplace",
    description: "Empowering local farmers by eliminating middle-men. AgriConnect allows farmers to list harvests and buyers to purchase directly, ensuring fair prices and fresh produce.",
    techStack: ["React", "Express", "Stripe", "PostGIS"],
    category: "marketplace",
    problem:
      "Middlemen erode farmer margins and inflate buyer prices, while fresh produce struggles to reach the right markets in time.",
    role: "Full-stack design & development",
    features: [
      "Direct farmer-to-buyer marketplace",
      "Fair-price harvest listings",
      "Stripe-powered payments",
      "PostGIS location-based matching",
    ],
  },
  {
    id: "meditriage-ai",
    status: "concept",
    title: "MediTriage AI",
    description: "Advanced multi-channel AI triage platform. Access expert medical guidance via smartphone, WhatsApp, or USSD code, ensuring timely care for everyone, everywhere.",
    techStack: ["Python", "OpenAI", "React", "Twilio"],
    category: "ai",
    problem:
      "Timely medical guidance is out of reach for people with limited connectivity or no smartphone access.",
    role: "AI & full-stack development",
    features: [
      "Multi-channel triage: app, WhatsApp & USSD",
      "AI-driven medical guidance",
      "Twilio messaging integration",
      "Designed for low-connectivity contexts",
    ],
  },
  {
    id: "smartmart-pos",
    title: "SmartMart POS",
    description: "Supermarket management for a single store: point of sale with barcode scanning, inventory, till cash-up, stock adjustments and reporting, with role-based access for admins, managers, cashiers and stock clerks.",
    techStack: ["React", "TypeScript", "Vite", "shadcn/ui", "Tailwind CSS"],
    category: "retail",
    liveUrl: "https://smartmart-pos.vercel.app",
    image: "/projects/smartmart.webp",
    role: "Full-stack design & development",
    features: [
      "Point of sale: cart, hold/resume, cash/card/mobile, receipts",
      "Barcode scanning straight into the cart",
      "Till open, cash-up and variance before closing",
      "Stock write-offs and stocktakes with a full movement log",
      "Revenue, profit, top sellers and hourly trading reports",
      "Role-based views: admin, manager, cashier, stock clerk",
    ],
  },
  {
    id: "tune-wise",
    title: "Tune-Wise",
    description: "An interactive music education platform designed to teach students music theory, ear training, and instrument practice. Features piano keyboards, progress tracking, gamified lessons, and real-time audio feedback.",
    techStack: ["React", "TypeScript", "Web Audio API", "Vite"],
    category: "entertainment",
    role: "Full-stack design & development",
    features: [
      "Music theory & ear-training lessons",
      "Interactive piano keyboard",
      "Gamified progress tracking",
      "Real-time audio feedback",
    ],
  },
  {
    id: "aegis",
    featured: true,
    title: "Aegis – Vehicle Access Management",
    description: "AI-powered vehicle access control: cameras read number plates, Aegis checks them against the register and watchlist, and the guard gets a clear decision — with every decision logged and uncertain reads sent for human review. Works with IP cameras and mobile phones.",
    techStack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "OpenCV", "ONNX"],
    category: "security",
    liveUrl: "https://aegis-eight-snowy.vercel.app/",
    image: "/projects/aegis.webp",
    problem:
      "Manual vehicle access control is slow, error-prone, and hard to audit across multiple entry points.",
    role: "AI & full-stack development",
    features: [
      "License-plate recognition (OpenCV)",
      "Role-based access control",
      "Real-time entry alerts",
      "IP-camera & mobile-phone support",
    ],
    architecture: [
      "Cameras (IP or phone) → vision service: capture, gating, de-duplication",
      "FastAPI API server — auth, RBAC, resources, analytics, audit log",
      "Authenticated WebSocket alert stream → guards' screens",
      "PostgreSQL (data) · Redis (login throttling, WebSocket tickets)",
    ],
    decisions: [
      { title: "Humans review uncertain reads", detail: "A confidence gate holds back likely misreads for a guard to confirm instead of auto-deciding access on a bad read." },
      { title: "Small models on a CPU", detail: "Two MIT-licensed ONNX models (~11 MB) baked into the image — no GPU needed at the gate." },
      { title: "Every decision is audited", detail: "Access decisions land in an audit trail, so who entered, when, and on whose authority can always be answered." },
    ],
    results: [
      "Found 96% of plates on public test data, with the confidence gate holding back nearly every misread for human review",
      "Built-in evaluation command so accuracy is measured on each site's own camera footage before it is relied on",
    ],
  },
  {
    id: "zoe-campus",
    title: "4Life Zoe Digital Campus",
    description: "The digital platform for 4Life Zoe, a vocational and technical training institution in Liberia. A public website where prospective students apply, plus a role-based campus platform covering admissions, enrollment, fee plans, payments, attendance, and a live executive dashboard.",
    techStack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    category: "management",
    liveUrl: "https://zoe-campus.vercel.app/",
    image: "/projects/zoe-campus.webp",
    problem:
      "Admissions, fees, payments, and attendance at a growing vocational institution lived in separate places, leaving leadership without a single, current view of the campus.",
    role: "Full-stack design & development",
    features: [
      "Online applications with admissions review & approval",
      "Enrollment by program and cycle, with tuition fee plans",
      "Payment and attendance recording",
      "Mobile-friendly live executive dashboard",
      "Argon2id + HTTP-only JWT auth with DB-backed RBAC",
    ],
    architecture: [
      "Public website & role-based staff dashboard (mobile-first)",
      "Next.js 16 App Router — proxies /api/v1 so the browser talks to one origin",
      "FastAPI service — routes → services → SQLAlchemy 2, DB-backed RBAC",
      "PostgreSQL 16 (schema owned by Alembic migrations)",
    ],
    decisions: [
      { title: "Cookie sessions behind a same-origin proxy", detail: "A signed JWT in an HttpOnly, SameSite=Lax cookie, with Next.js proxying the API — no tokens in localStorage, no CORS or third-party-cookie issues, and deactivating a user takes effect immediately." },
      { title: "Services over repositories", detail: "Thin routes and services that own business rules and transactions directly on the SQLAlchemy session — each workflow, such as approval, reads top to bottom in one function." },
      { title: "One institution clock", detail: "Overdue fees, attendance days and monthly figures all use the campus timezone (Africa/Monrovia), after a real bug where a browser past midnight at UTC+2 submitted attendance for a date the API considered the future." },
    ],
    results: [
      "API tests run against a real PostgreSQL database built by Alembic, each test in a rolled-back transaction",
      "Playwright end-to-end tests on desktop and mobile, plus Vitest for frontend logic",
      "CI gates every change on lint, formatting, type-checking, tests and a production build",
      "Ships with synthetic demo data only — the demo seed refuses to run in production",
    ],
  },
  {
    id: "erdms",
    title: "ERDMS – Emergency Response & Dispatch",
    description: "One incident record shared by everyone in an emergency — the citizen who asks for help, the dispatcher, the field officer who arrives, and the administrator. Built for Liberia and comparable African environments: mobile-first, low-bandwidth, offline-tolerant, and multi-agency.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "PostGIS", "Redis", "Celery"],
    category: "emergency",
    status: "in-development",
    problem:
      "Emergency response in low-connectivity environments breaks down across agencies and channels: requests get lost, responders lack a shared picture, and there's no trustworthy record of what happened.",
    role: "Full-stack design & development",
    features: [
      "Citizen, dispatcher, field-officer & admin experiences on one incident record",
      "USSD, SMS, voice and web all feed the same incident engine",
      "PostGIS nearest-unit search as dispatcher decision support",
      "Offline queueing with sync and conflict handling",
      "Append-only emergency history and audit trail",
      "Categories, unit types and agencies configurable without a deploy — fire is the first use case",
    ],
    architecture: [
      "Citizen · Dispatcher · Field officer · Administrator — web, USSD, SMS & voice",
      "Next.js frontend (offline queue, realtime via WebSockets)",
      "FastAPI incident engine — dispatch, auth & MFA, sync, channels",
      "PostgreSQL + PostGIS (system of record) · Redis pub/sub · Celery",
    ],
    decisions: [
      { title: "The backend is the authority", detail: "Frontend permission checks only hide buttons; every endpoint enforces its own permission and object-level access." },
      { title: "Emergency history is append-only", detail: "Corrections add events and never rewrite them — there is no endpoint that edits or deletes an audit record." },
      { title: "Every channel enters the same engine", detail: "USSD, SMS, voice and web all call the same incident service. The channel is a field, not a fork." },
      { title: "Offline is not \"received\"", detail: "An action queued on a device shows as queued until the backend has actually persisted it." },
      { title: "WebSockets enhance; they don't replace", detail: "Authoritative state always comes from the API and is refetched on every reconnect, so Redis going down degrades realtime but never blocks a write." },
      { title: "The dispatcher decides", detail: "Nearest-unit search is decision support. Nothing dispatches itself, and the UI never claims a responder is on the way until one reports en route." },
    ],
    results: [
      "Load-tested at 20,000 incidents: a filtered dispatch queue went from 4,578 ms to 88 ms after restructuring a query that was discarding 29.4M rows in a join",
      "Incident-number search from 355 ms to 35 ms using per-table lookups on GIN trigram indexes",
      "Concurrency test suite found and fixed four race conditions",
      "End-to-end smoke suite works one emergency from call to closed record over real HTTP and a live WebSocket, as citizen, dispatcher, crew and admin",
      "Failure drills take Redis, then PostgreSQL, away from a running server; CI runs dependency audits, static analysis and secret scanning on every push",
    ],
  },
  {
    id: "sacred-heart-sms",
    title: "Sacred Heart School Management System",
    description: "Full-stack school management system for Sacred Heart Catholic High School in Monrovia, Liberia — students, classes, marks, conduct, attendance and live report cards, with role-based portals for administrators, teachers and guardians.",
    techStack: ["Django", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    category: "management",
    liveUrl: "https://sacred-heart-sms.vercel.app/",
    image: "/projects/sacred-heart-sms.webp",
    role: "Full-stack design & development",
    features: [
      "Report cards built from live marks, conduct, attendance, ranking and promotion",
      "Role-based access enforced at the API — teachers see their classes, guardians their children",
      "Grading scale configurable in settings, never hard-coded",
      "In-app and email notifications",
      "Installable app with offline pages",
      "Designed for 5,000–10,000 students without re-architecture",
    ],
  },
  {
    id: "hostel-harmony",
    title: "Hostel Harmony",
    description: "White-label university hostel management: accommodation applications, bed allocation across hostels, blocks, rooms and beds, check-in and check-out, complaints and reporting — branded per institution through configuration.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Vitest"],
    category: "management",
    liveUrl: "https://hostel-harmony-virid.vercel.app/",
    image: "/projects/hostel-harmony.webp",
    role: "Full-stack design & development",
    features: [
      "Applications and bed allocation per academic period",
      "Check-in, check-out and end-of-semester workflows",
      "Complaints, bulk student intake and reporting",
      "White-label: branding and naming are configuration",
      "Security: per-request role checks, login rate limiting, session revocation, encrypted audit logs",
      "Email/password and Google sign-in",
    ],
  },
  {
    id: "queueflow",
    title: "QueueFlow",
    description: "Multi-tenant smart queue management for hospitals, clinics, pharmacies, banks and government offices: customers join queues remotely and track their ticket live while staff run the queue from a real-time control room.",
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Socket.IO"],
    category: "management",
    role: "Full-stack design & development",
    features: [
      "Multi-tenant: organisations, branches and service points",
      "Staff control room: call, recall, skip, live wait estimates and chimes",
      "Mobile customer portal to join remotely and track tickets live",
      "Self-service touch kiosk and TV display board",
      "80 mm thermal ticket printing for walk-ins",
      "JWT auth and Socket.IO realtime on a NestJS + PostgreSQL API",
    ],
  },
  {
    id: "safechoice-plus",
    title: "SafeChoice+",
    description: "Private, real-time sexual-health decision support for university students in Zimbabwe — an anonymous mobile app that guides a student from uncertainty to informed action in under two minutes, in English, ChiShona or isiNdebele.",
    techStack: ["React Native", "Expo", "TypeScript", "Flask", "MongoDB"],
    category: "healthcare",
    problem:
      "After a possible HIV exposure or unprotected sex, students face time-critical decisions — the 72-hour PEP window — with nowhere private, fast or judgment-free to turn.",
    role: "Mobile & backend development",
    features: [
      "Rule-based risk assessment for HIV and pregnancy",
      "Live countdown of PEP and emergency-contraception windows",
      "Youth-friendly clinic and pharmacy finder",
      "Contraception guide, scenario simulator and reminders",
      "Three languages: English, ChiShona, isiNdebele",
      "Fully anonymous — no login, name or phone number, ever",
    ],
  },
  {
    id: "job-pilot-ai",
    title: "Job Pilot AI",
    description: "An AI job-application copilot that matches roles against a bank of verified evidence about the candidate, drafts tailored CVs and cover letters, and never submits anything without human approval.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    category: "ai",
    status: "in-development",
    role: "Product design & frontend development",
    features: [
      "Job scanning and matching against a verified evidence bank",
      "CV studio and tailored cover letters",
      "Human approval queue — automatic submission is off by default",
      "Truthfulness check: no claims the evidence doesn't support",
      "Scam flags such as application fees",
      "Application, interview and analytics tracking",
    ],
  },
];
