/**
 * Title + description for each top-level page. Used by the page's <Seo> at
 * runtime and by the build (vite.config.ts) to bake them into each route's
 * HTML, so link previews on LinkedIn/WhatsApp/X match the page.
 */
export const pageMeta = {
  "/": {
    title: "William S. Gray | Software Engineer & AI Full-Stack Systems Builder",
    description:
      "Software engineer William S. Gray builds scalable full-stack, AI-powered, and cloud-native systems — from emergency dispatch and clinical decision tools to school platforms. Open to full-time, contract and freelance work.",
  },
  "/about": {
    title: "About William S. Gray | Software Engineer & Computer Science Graduate",
    description:
      "William S. Gray — Software Engineer from Liberia, BSc Honours Computer Science graduate of Africa University, building full-stack, AI-powered, and cloud systems for real-world problems.",
  },
  "/services": {
    title: "Services — Custom Software, Web Apps, APIs & AI | William S. Gray",
    description:
      "Hire William S. Gray to build management platforms, web apps, APIs, AI features and low-connectivity systems — from discovery to deployment and support. Remote, worldwide.",
  },
  "/projects": {
    title: "Projects by William S. Gray | Full-Stack & AI Systems",
    description:
      "Case studies of systems built by William S. Gray — ERDMS, PathoGuide, Aegis, Zoe Campus, CampusIQ and more across healthcare, education, emergency response and security.",
  },
  "/certificates": {
    title: "Certificates & Credentials | William S. Gray",
    description:
      "Certifications earned by William S. Gray in software engineering, AI & automation, cloud & DevOps, security, and leadership — from Udemy, Google, Great Learning, and more.",
  },
  "/blog": {
    title: "Blog | William S. Gray",
    description:
      "Writing by William S. Gray on software engineering, AI, and building technology for real-world problems in Africa and emerging markets.",
  },
  "/contact": {
    title: "Contact William S. Gray | Software Engineer",
    description:
      "Get in touch with William S. Gray for software engineering projects, full-stack development, AI solutions, or collaboration. Open to full-time, contract, and freelance work, remotely.",
  },
  "/resume": {
    title: "Résumé — William S. Gray | Software Engineer",
    description:
      "Résumé of William S. Gray: software engineer and Africa University Computer Science graduate — NetOne experience, WillNova founder, GDSC President. Open to full-time, contract and freelance work.",
  },
} as const;

export type PagePath = keyof typeof pageMeta;
