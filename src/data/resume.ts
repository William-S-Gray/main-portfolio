import { projects } from "./projects";

const SITE = "https://www.williamgray.dev";

const skills = Array.from(new Set(projects.flatMap((p) => p.techStack)));

/**
 * Machine-readable résumé following the JSON Resume schema
 * (https://jsonresume.org/schema/). Emitted to /resume.json at build so
 * ATS systems, AI parsers, and other tools can read William structurally.
 */
export const resume = {
  $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  basics: {
    name: "William S. Gray",
    label: "Software Engineer | AI & Full-Stack Systems Builder | Founder, WillNova Technologies",
    email: "graywilliamwiltino@gmail.com",
    url: `${SITE}/`,
    summary:
      "Software Engineer and AI & Full-Stack Systems Builder from Liberia, educated in Zimbabwe. I design and ship scalable full-stack applications, AI-powered systems, and cloud-native infrastructure — turning complex, real-world problems into reliable software. Founder of WillNova Technologies.",
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
        "Founder of WillNova Technologies — building software and digital solutions under the philosophy “Innovate. Build. Elevate.” Take products from concept to shipped, from clinical decision tools to school management platforms.",
    },
  ],
  education: [
    {
      institution: "Africa University",
      area: "Computer Science",
      studyType: "BSc (Honours)",
      location: "Mutare, Zimbabwe",
    },
  ],
  skills: [
    { name: "Full-Stack Engineering", keywords: skills },
    { name: "AI & Data", keywords: ["AI Systems", "Data Analytics", "Automation"] },
    { name: "DevOps & Cloud", keywords: ["CI/CD", "Cloud-Native", "Deployment"] },
  ],
  awards: [
    {
      title: "Google Developer Student Clubs (GDSC) Lead",
      awarder: "Google / Africa University",
      summary: "Led the GDSC chapter for 2023/2024.",
    },
    {
      title: "Deputy Speaker, Student Union Parliament",
      awarder: "Africa University",
      summary: "Served as Deputy Speaker of the Africa University Student Union Parliament, 2024.",
    },
  ],
  projects: projects.map((p) => ({
    name: p.title,
    description: p.description,
    keywords: p.techStack,
    ...(p.liveUrl ? { url: p.liveUrl } : {}),
    entity: p.category,
  })),
  meta: {
    canonical: `${SITE}/resume.json`,
    version: "1.0.0",
  },
} as const;
