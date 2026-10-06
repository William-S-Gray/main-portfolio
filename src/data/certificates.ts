export type CertCategory =
  | "Software Engineering & Development"
  | "AI & Automation"
  | "Cloud & DevOps"
  | "Security & Compliance"
  | "Healthcare & Domain"
  | "Leadership & Professional";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Human-readable date earned, e.g. "May 2026". */
  date: string;
  category: CertCategory;
  /** Path to the certificate file in /public/certificate (PDF or image). */
  file: string;
  credentialId?: string;
  /** Official verification URL, when the issuer provides one. */
  verifyUrl?: string;
}

/** Display order of category sections on the Certificates page. */
export const certCategories: CertCategory[] = [
  "Software Engineering & Development",
  "AI & Automation",
  "Cloud & DevOps",
  "Security & Compliance",
  "Healthcare & Domain",
  "Leadership & Professional",
];

export const certificates: Certificate[] = [
  // ── Software Engineering & Development ──────────────────────────────
  {
    id: "java-for-beginners",
    title: "Java Basics for Beginners: Learn Coding with Java",
    issuer: "Udemy",
    date: "Feb 2026",
    category: "Software Engineering & Development",
    file: "/certificate/java-for-beginners.pdf",
    credentialId: "UC-4a6ee654-921c-4ab2-814b-3fc160adf459",
    verifyUrl: "https://ude.my/UC-4a6ee654-921c-4ab2-814b-3fc160adf459",
  },
  {
    id: "complete-nodejs",
    title: "The Complete Node.js Developer Course",
    issuer: "Udemy",
    date: "Apr 2026",
    category: "Software Engineering & Development",
    file: "/certificate/complete-nodejs.pdf",
    credentialId: "UC-57f78b7a-31f3-4ea5-b423-ef76666f95f5",
    verifyUrl: "https://ude.my/UC-57f78b7a-31f3-4ea5-b423-ef76666f95f5",
  },
  {
    id: "microservices-nodejs-react",
    title: "Microservices with Node.js & React",
    issuer: "Udemy",
    date: "May 2026",
    category: "Software Engineering & Development",
    file: "/certificate/microservices-nodejs-react.pdf",
    credentialId: "UC-0811636a-4dce-459a-8d1e-6712e126e168",
    verifyUrl: "https://ude.my/UC-0811636a-4dce-459a-8d1e-6712e126e168",
  },
  {
    id: "software-architecture",
    title: "Software Architecture & Design of Modern Large-Scale Systems",
    issuer: "Udemy",
    date: "Jun 2026",
    category: "Software Engineering & Development",
    file: "/certificate/software-architecture-large-scale-systems.pdf",
    credentialId: "UC-4d4064bc-236c-44f2-bf84-2f06cb696018",
    verifyUrl: "https://ude.my/UC-4d4064bc-236c-44f2-bf84-2f06cb696018",
  },
  {
    id: "understanding-apis",
    title: "Understanding APIs & RESTful APIs Crash Course",
    issuer: "Udemy",
    date: "Feb 2026",
    category: "Software Engineering & Development",
    file: "/certificate/understanding-apis-restful.pdf",
    credentialId: "UC-68775470-73c9-4317-9354-c1e334046bc4",
    verifyUrl: "https://ude.my/UC-68775470-73c9-4317-9354-c1e334046bc4",
  },
  {
    id: "postman-api-testing",
    title: "Quick Introduction to Postman & API Testing",
    issuer: "Udemy",
    date: "Apr 2026",
    category: "Software Engineering & Development",
    file: "/certificate/postman-api-testing.pdf",
    credentialId: "UC-f65dddfa-4ab2-4162-a474-982ffe257688",
    verifyUrl: "https://ude.my/UC-f65dddfa-4ab2-4162-a474-982ffe257688",
  },
  {
    id: "git-and-github",
    title: "The Git & GitHub Bootcamp",
    issuer: "Udemy",
    date: "Jun 2026",
    category: "Software Engineering & Development",
    file: "/certificate/git-and-github.pdf",
    credentialId: "UC-6a1a33ea-209e-4242-82d1-b710a0150368",
    verifyUrl: "https://ude.my/UC-6a1a33ea-209e-4242-82d1-b710a0150368",
  },
  {
    id: "git-tutorial",
    title: "Git Tutorial",
    issuer: "Great Learning",
    date: "Nov 2024",
    category: "Software Engineering & Development",
    file: "/certificate/git-tutorial.pdf",
    credentialId: "AVJOPXMO",
    verifyUrl: "https://verify.mygreatlearning.com/AVJOPXMO",
  },
  {
    id: "mysql-tutorial",
    title: "MySQL Tutorial",
    issuer: "Great Learning",
    date: "Dec 2023",
    category: "Software Engineering & Development",
    file: "/certificate/mysql-tutorial.pdf",
    credentialId: "MAYMNBPZ",
    verifyUrl: "https://verify.mygreatlearning.com/MAYMNBPZ",
  },
  {
    id: "ui-ux-for-beginners",
    title: "UI/UX for Beginners",
    issuer: "Great Learning",
    date: "Dec 2023",
    category: "Software Engineering & Development",
    file: "/certificate/ui-ux-for-beginners.pdf",
    credentialId: "LVLXKIIZ",
    verifyUrl: "https://verify.mygreatlearning.com/LVLXKIIZ",
  },

  // ── AI & Automation ─────────────────────────────────────────────────
  {
    id: "mcp-ai-agents",
    title: "Build AI Agents with MCP – Model Context Protocol (TS/PY)",
    issuer: "Udemy",
    date: "Apr 2026",
    category: "AI & Automation",
    file: "/certificate/model-context-protocol-mcp.jpg",
    credentialId: "UC-1b12324f-ef7d-40d4-9ff5-d0b9a44ef12d",
    verifyUrl: "https://ude.my/UC-1b12324f-ef7d-40d4-9ff5-d0b9a44ef12d",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering with ChatGPT Masterclass",
    issuer: "Udemy",
    date: "May 2026",
    category: "AI & Automation",
    file: "/certificate/prompt-engineering.pdf",
    credentialId: "UC-dfd02882-80a9-4b1c-91c9-be1390cfd56f",
    verifyUrl: "https://ude.my/UC-dfd02882-80a9-4b1c-91c9-be1390cfd56f",
  },
  {
    id: "intro-to-n8n",
    title: "Intro to n8n Agents: Automate Work Effortlessly",
    issuer: "Udemy",
    date: "Feb 2026",
    category: "AI & Automation",
    file: "/certificate/intro-to-n8n.pdf",
    credentialId: "UC-6e793281-ef1f-475e-a834-90d479ec0182",
    verifyUrl: "https://ude.my/UC-6e793281-ef1f-475e-a834-90d479ec0182",
  },
  {
    id: "ai-for-project-management",
    title: "AI for Project Management: Real-World AI Use Cases",
    issuer: "Udemy",
    date: "May 2026",
    category: "AI & Automation",
    file: "/certificate/ai-for-project-management.pdf",
    credentialId: "UC-0ce5c64c-ecf3-405c-b79e-903ccc3e86fe",
    verifyUrl: "https://ude.my/UC-0ce5c64c-ecf3-405c-b79e-903ccc3e86fe",
  },
  {
    id: "intro-to-machine-learning",
    title: "Introduction to Machine Learning",
    issuer: "Great Learning",
    date: "Dec 2023",
    category: "AI & Automation",
    file: "/certificate/intro-to-machine-learning.pdf",
    credentialId: "NIDEMNOZ",
    verifyUrl: "https://verify.mygreatlearning.com/NIDEMNOZ",
  },

  // ── Cloud & DevOps ──────────────────────────────────────────────────
  {
    id: "docker-for-beginners",
    title: "Docker for the Absolute Beginner – Hands-On DevOps",
    issuer: "Udemy",
    date: "Apr 2026",
    category: "Cloud & DevOps",
    file: "/certificate/docker-for-beginners.jpg",
    credentialId: "UC-6df59e39-2a8f-47d8-8682-b206f918c007",
    verifyUrl: "https://ude.my/UC-6df59e39-2a8f-47d8-8682-b206f918c007",
  },
  {
    id: "aws-devops-engineer",
    title: "AWS DevOps Engineer (course)",
    issuer: "Mindluster",
    date: "Feb 2025",
    category: "Cloud & DevOps",
    file: "/certificate/aws-devops-engineer-course-mindluster.pdf",
    credentialId: "f00bbf32",
  },
  {
    id: "devops-fundamentals",
    title: "DevOps Fundamentals",
    issuer: "Mindluster",
    date: "Jan 2025",
    category: "Cloud & DevOps",
    file: "/certificate/devops-fundamentals.jpg",
    credentialId: "bd515675",
  },
  {
    id: "linux-tutorial",
    title: "Linux Tutorial",
    issuer: "Great Learning",
    date: "Nov 2024",
    category: "Cloud & DevOps",
    file: "/certificate/linux-tutorial.pdf",
    credentialId: "ZWHZQYDG",
    verifyUrl: "https://verify.mygreatlearning.com/ZWHZQYDG",
  },
  {
    id: "cloud-computing-foundations",
    title: "Cloud Computing Foundations",
    issuer: "Great Learning",
    date: "Dec 2023",
    category: "Cloud & DevOps",
    file: "/certificate/cloud-computing-foundations.pdf",
    credentialId: "UUYKNSTB",
    verifyUrl: "https://verify.mygreatlearning.com/UUYKNSTB",
  },

  // ── Security & Compliance ───────────────────────────────────────────
  {
    id: "intro-to-cyber-security",
    title: "Introduction to Cyber Security",
    issuer: "Great Learning",
    date: "May 2024",
    category: "Security & Compliance",
    file: "/certificate/intro-to-cyber-security.pdf",
    credentialId: "FDZZIHRW",
    verifyUrl: "https://verify.mygreatlearning.com/FDZZIHRW",
  },
  {
    id: "intro-to-information-security",
    title: "Introduction to Information Security",
    issuer: "Great Learning",
    date: "Dec 2023",
    category: "Security & Compliance",
    file: "/certificate/intro-to-information-security.pdf",
    credentialId: "SKJNQZLU",
    verifyUrl: "https://verify.mygreatlearning.com/SKJNQZLU",
  },

  // ── Healthcare & Domain ─────────────────────────────────────────────
  {
    id: "healthcare-it",
    title: "Healthcare IT: HL7, EHR & Interoperability",
    issuer: "Udemy",
    date: "May 2026",
    category: "Healthcare & Domain",
    file: "/certificate/healthcare-it-hl7-ehr.pdf",
    credentialId: "UC-25e9599f-a7f2-420b-99e4-208fe5b5ac40",
    verifyUrl: "https://ude.my/UC-25e9599f-a7f2-420b-99e4-208fe5b5ac40",
  },
  {
    id: "ai-in-healthcare",
    title: "Artificial Intelligence (AI) in Healthcare",
    issuer: "Udemy",
    date: "May 2026",
    category: "Healthcare & Domain",
    file: "/certificate/ai-in-healthcare.pdf",
    credentialId: "UC-6b22f1c2-8295-46f2-9341-2833eee25445",
    verifyUrl: "https://ude.my/UC-6b22f1c2-8295-46f2-9341-2833eee25445",
  },

  // ── Leadership & Professional ───────────────────────────────────────
  {
    id: "gdsc-lead",
    title: "Google Developer Student Clubs Lead (2023–2024)",
    issuer: "Google Developer Student Clubs",
    date: "2023 – 2024",
    category: "Leadership & Professional",
    file: "/certificate/gdsc-lead.pdf",
    credentialId: "1Q-7KC0aV1CLQC1f08qxmOzQRe_abhGaBy92891m0pbU",
  },
  {
    id: "gdsc-solution-challenge",
    title: "GDSC Solution Challenge 2024",
    issuer: "Google Developer Student Clubs",
    date: "2024",
    category: "Leadership & Professional",
    file: "/certificate/google-solution-challenge.pdf",
  },
  {
    id: "google-crowdsource",
    title: "Crowdsource Learning Community Program",
    issuer: "Google Crowdsource",
    date: "Jan 2024",
    category: "Leadership & Professional",
    file: "/certificate/google-crowdsource-learning-community.pdf",
    credentialId: "CLC-2023-cgYIVIYtmD",
  },
  {
    id: "results-based-management",
    title: "Results-Based Management, Monitoring & Evaluation",
    issuer: "Udemy",
    date: "May 2026",
    category: "Leadership & Professional",
    file: "/certificate/results-based-management-me.pdf",
    credentialId: "UC-5ddc34db-3f08-45ee-89f5-077a872867cc",
    verifyUrl: "https://ude.my/UC-5ddc34db-3f08-45ee-89f5-077a872867cc",
  },
];
