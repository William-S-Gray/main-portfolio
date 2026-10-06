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
  /** Not deployed yet — shows an "In development" badge instead of a live link. */
  inDevelopment?: boolean;
  /** Shown in the homepage "Featured work" section. */
  featured?: boolean;
  /** Case-study detail — powers /projects/:id. */
  problem?: string;
  role?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "pathoguide",
    featured: true,
    title: "PathoGuide",
    description: "A professional clinical decision support system designed to optimize antibiotic prescribing based on real-time local resistance data from Mutare. Revolutionizing antimicrobial stewardship.",
    techStack: ["React", "TypeScript", "Node.js", "Data Analytics"],
    category: "healthcare",
    liveUrl: "https://pathoguide-frontend.onrender.com/",
    problem:
      "Clinicians often prescribe antibiotics without visibility into local resistance patterns, accelerating antimicrobial resistance and worsening patient outcomes.",
    role: "Full-stack design & development",
    features: [
      "Real-time local antibiotic resistance data from Mutare",
      "Evidence-based prescribing recommendations",
      "Antimicrobial stewardship dashboards",
      "Analytics on emerging resistance trends",
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
    description: "Take control of your nutrition with this intelligent meal management system. Track individual meals, manage dietary goals, and streamline dining with QR-code integration.",
    techStack: ["React", "Vite", "PWA", "Firebase"],
    category: "management",
    liveUrl: "https://meal-pass-frontend.onrender.com",
    role: "Full-stack design & development",
    features: [
      "Individual meal tracking",
      "Dietary goal management",
      "QR-code meal redemption",
      "Installable PWA with offline support",
    ],
  },
  {
    id: "davison-motors",
    title: "Davison Motors",
    description: "A premium automotive management platform offering an elite experience for luxury car dealerships. Manage inventory and showcase high-end vehicles with unparalleled elegance.",
    techStack: ["React", "Three.js", "Express", "MongoDB"],
    category: "management",
    liveUrl: "https://frontend-nz41.onrender.com",
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
    title: "PharmTrack",
    description: "Real-time medicine availability at your fingertips. PharmTrack connects patients with pharmacies, offering stock management, reorder alerts, and seamless online ordering.",
    techStack: ["React Native", "Node.js", "Google Maps API", "Socket.io"],
    category: "healthcare",
    role: "Full-stack & mobile development",
    features: [
      "Real-time pharmacy stock visibility",
      "Automated reorder alerts",
      "Seamless online ordering",
      "Maps-based pharmacy locator",
    ],
  },
  {
    id: "agriconnect",
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
    description: "A comprehensive Point-of-Sale system built to automate supermarket daily operations. Features real-time inventory management, barcode scanning, sales analytics, and seamless checkout workflows for modern retail businesses.",
    techStack: ["Vite", "React", "TypeScript", "shadcn-ui", "Tailwind CSS"],
    category: "retail",
    image: "/projects/smartmart.webp",
    role: "Full-stack design & development",
    features: [
      "Real-time inventory management",
      "Barcode scanning",
      "Sales analytics dashboards",
      "Streamlined checkout workflows",
    ],
  },
  {
    id: "tune-wise",
    title: "Tune-Wise",
    description: "An interactive music education platform designed to teach students music theory, ear training, and instrument practice. Features piano keyboards, progress tracking, gamified lessons, and real-time audio feedback.",
    techStack: ["React", "TypeScript", "Web Audio API", "Vite"],
    category: "entertainment",
    image: "/projects/tunewise.webp",
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
    description: "An AI-powered intelligent vehicle access management system combining license plate recognition with role-based access control and real-time alerts. Supports IP cameras and mobile phones with a modern neumorphic UI.",
    techStack: ["React", "TypeScript", "Python", "OpenCV", "AI/ML"],
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
  },
  {
    id: "zoe-campus",
    title: "4Life Zoe Digital Campus",
    description: "The digital platform for 4Life Zoe, a vocational and technical training institution in Liberia. A public website where prospective students apply, plus a role-based campus platform covering admissions, enrollment, fee plans, payments, attendance, and a live executive dashboard.",
    techStack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    category: "management",
    liveUrl: "https://zoe-campus.vercel.app/",
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
  },
  {
    id: "erdms",
    title: "ERDMS – Emergency Response & Dispatch",
    description: "One incident record shared by everyone in an emergency — the citizen who asks for help, the dispatcher, the field officer who arrives, and the administrator. Built for Liberia and comparable African environments: mobile-first, low-bandwidth, offline-tolerant, and multi-agency.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "PostGIS", "Redis", "Celery"],
    category: "emergency",
    inDevelopment: true,
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
  },
];
