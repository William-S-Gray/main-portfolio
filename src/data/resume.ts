import { projects } from "./projects";

const SITE = "https://www.williamgray.dev";

/** "Message on WhatsApp" link. The number isn't printed anywhere on the site. */
export const WHATSAPP_URL =
  "https://wa.me/263786654578?text=" + encodeURIComponent("Hi William, I found you through williamgray.dev");

export const availability = {
  engagement: "Full-time, contract & freelance",
  location: "Remote · Zimbabwe, CAT (UTC+2)",
  detail: "Remote first; open to hybrid, on-site, or relocation.",
};

/**
 * William's résumé — the single source for /resume, the About page, and
 * /resume.json (JSON Resume schema, https://jsonresume.org/schema/), so ATS
 * systems, AI parsers and people all read the same, current facts.
 */
export const resume = {
  $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  basics: {
    name: "William S. Gray",
    label: "Software Engineer | AI & Full-Stack Systems Builder | Founder, WillNova Technologies",
    email: "graywilliamwiltino@gmail.com",
    url: `${SITE}/`,
    summary:
      "Software engineer from Liberia and Computer Science graduate of Africa University (2026). I design and ship full-stack applications, AI-powered systems and cloud-native infrastructure for real-world problems — from emergency dispatch and clinical decision support to school, campus and access-control platforms. I own systems end to end: understanding the problem, designing the architecture, writing the code and tests, and deploying it. Industry experience at NetOne, founder of WillNova Technologies, and former President of Google Developer Student Clubs at Africa University.",
    location: { city: "Mutare", countryCode: "ZW", region: "Manicaland" },
    profiles: [
      { network: "GitHub", username: "William-S-Gray", url: "https://github.com/William-S-Gray" },
      {
        network: "LinkedIn",
        username: "william-wiltino-gray",
        url: "https://www.linkedin.com/in/william-wiltino-gray-577254253/",
      },
    ],
  },
  work: [
    {
      name: "WillNova Technologies",
      position: "Founder & Software Engineer",
      url: "https://willnova.vercel.app/",
      summary:
        "Technology startup turning ideas and operational challenges into scalable digital products for businesses, institutions and startups — “Innovate. Build. Elevate.”",
      highlights: [
        "Take products from requirements to deployed system: architecture, build, delivery and post-launch support",
        "Built systems across healthcare, education, emergency response, security and retail",
      ],
    },
    {
      name: "NetOne Private Limited",
      position: "Software Developer Intern / Attachee",
      location: "Zimbabwe",
      startDate: "2025-10",
      endDate: "2026-06",
      highlights: [
        "Developed and maintained web applications using React, Java, MySQL, MongoDB and PostgreSQL",
        "Took part in system design, testing and implementation of enterprise software",
        "Reviewed websites and recommended usability and performance improvements",
        "Provided application support and troubleshooting for internal systems",
        "Worked with developers and stakeholders to deliver reliable, scalable solutions",
      ],
    },
  ],
  volunteer: [
    {
      organization: "Google Developer Student Clubs (GDSC), Africa University",
      position: "President",
      startDate: "2023",
      endDate: "2025",
      highlights: [
        "Led a community of 100+ student developers",
        "Organised technical workshops, hackathons and software development bootcamps",
        "Mentored student teams building real-world software and AI solutions",
      ],
    },
    {
      organization: "Africa University Student Union Parliament",
      position: "Deputy Speaker",
      startDate: "2024",
      endDate: "2025",
      highlights: [
        "Supported governance and digital transformation initiatives",
        "Facilitated communication between students and university administration",
      ],
    },
    {
      organization: "For Life Zoe Academy",
      position: "Web Development Tutor",
      startDate: "2021",
      endDate: "2021",
      highlights: [
        "Trained 30+ students in modern web development, improving course completion rates by 60%",
        "Designed a practical, project-based curriculum focused on real-world application development",
      ],
    },
  ],
  education: [
    {
      institution: "Africa University",
      area: "Computer Science",
      studyType: "BSc (Honours)",
      location: "Mutare, Zimbabwe",
      endDate: "2026-06",
    },
  ],
  skills: [
    { name: "Languages", keywords: ["TypeScript", "JavaScript", "Python", "Java"] },
    { name: "Frontend", keywords: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"] },
    { name: "Backend", keywords: ["Node.js", "Express", "FastAPI", "Flask", "Django", "Spring Boot"] },
    { name: "Data", keywords: ["PostgreSQL", "PostGIS", "MySQL", "MongoDB", "Redis", "Prisma", "SQLAlchemy"] },
    { name: "DevOps & Cloud", keywords: ["Docker", "Kubernetes", "GitHub Actions CI/CD", "Linux", "Vercel", "Render"] },
    { name: "AI & Automation", keywords: ["AI-powered systems", "OpenCV", "ONNX", "n8n", "Prompt engineering"] },
    { name: "Testing", keywords: ["pytest", "Jest", "Vitest", "Playwright", "Cypress", "Postman"] },
    { name: "Practices", keywords: ["System design", "REST APIs", "Microservices", "Auth & RBAC", "Agile / SDLC"] },
  ],
  languages: [{ language: "English", fluency: "Fluent" }],
  references: [{ name: "Available on request", reference: "Academic and industry references available on request." }],
  projects: projects.map((p) => ({
    name: p.title,
    description: p.description,
    keywords: p.techStack,
    ...(p.liveUrl ? { url: p.liveUrl } : {}),
    entity: p.category,
  })),
  meta: {
    canonical: `${SITE}/resume.json`,
    version: "2.0.0",
  },
} as const;
