import { projects } from "./projects";
import { certificates } from "./certificates";

/**
 * Knowledge base for the offline "Ask William's AI" assistant.
 *
 * There is no LLM / network call: each entry carries a set of trigger
 * keywords and a pre-written answer grounded in real, verified facts about
 * William. The matcher (see `answerQuestion`) scores entries by keyword
 * overlap and returns the best match, falling back to a helpful default.
 */

export interface KbEntry {
  id: string;
  /** Lowercase trigger keywords / phrases. */
  keywords: string[];
  /** Markdown-ish answer (plain text + newlines; links rendered separately). */
  answer: string;
  /** Optional in-app link shown as a button under the answer. */
  cta?: { label: string; to: string; external?: boolean };
}

const projectTitles = projects.map((p) => p.title).join(", ");
const aiProjects = projects.filter((p) => p.category === "ai").map((p) => p.title);
const techset = Array.from(new Set(projects.flatMap((p) => p.techStack)));

export const knowledgeBase: KbEntry[] = [
  {
    id: "who",
    keywords: ["who", "about", "yourself", "william", "introduce", "bio", "background", "tell me"],
    answer:
      "William S. Gray is a Software Engineer and AI & Full-Stack Systems Builder, and the founder of WillNova Technologies. He's from Liberia and studied Computer Science (BSc Honours) at Africa University in Mutare, Zimbabwe. He builds scalable full-stack applications, AI-powered systems, and cloud-native infrastructure — turning complex, real-world problems into reliable software.",
    cta: { label: "Read full bio", to: "/about" },
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "tech", "stack", "technolog", "languages", "tools", "framework", "expertise", "know"],
    answer:
      `William works across the full stack and into DevOps and AI. Technologies he's shipped with include: ${techset.join(", ")}, plus cloud-native tooling and CI/CD. He's comfortable owning a system end to end — from data model and API to UI and deployment.`,
    cta: { label: "See services", to: "/services" },
  },
  {
    id: "projects",
    keywords: ["project", "projects", "built", "build", "work", "portfolio", "systems", "apps", "applications", "case study", "case studies"],
    answer:
      `William has built ${projects.length}+ systems across healthcare, education, marketplaces, security, and more — including ${projectTitles}. Each has a full case study covering the problem, his role, and key features.`,
    cta: { label: "Browse projects", to: "/projects" },
  },
  {
    id: "ai",
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "llm", "model", "intelligent", "automation"],
    answer:
      aiProjects.length > 0
        ? `Yes — AI is core to William's work. AI-focused projects include ${aiProjects.join(", ")}, and he applies data analytics and intelligent automation across others (for example, PathoGuide's real-time antibiotic-resistance analytics). His positioning is literally "AI & Full-Stack Systems Builder."`
        : "AI is core to William's work — he builds AI-powered and data-driven systems alongside full-stack applications.",
    cta: { label: "See AI projects", to: "/projects" },
  },
  {
    id: "pathoguide",
    keywords: ["pathoguide", "clinical", "antibiotic", "health", "healthcare", "medical", "resistance"],
    answer:
      "PathoGuide is a clinical decision-support system that optimizes antibiotic prescribing using real-time local resistance data from Mutare — helping clinicians fight antimicrobial resistance. William designed and built it full-stack.",
    cta: { label: "PathoGuide case study", to: "/projects/pathoguide" },
  },
  {
    id: "education",
    keywords: ["education", "study", "studied", "degree", "university", "school", "college", "africa university", "qualification", "academic"],
    answer:
      "William holds a BSc (Honours) in Computer Science from Africa University in Mutare, Zimbabwe. He's originally from Liberia.",
    cta: { label: "About & education", to: "/about" },
  },
  {
    id: "leadership",
    keywords: ["leadership", "lead", "gdsc", "google", "developer student", "speaker", "parliament", "union", "community", "role"],
    answer:
      "Beyond engineering, William was the Google Developer Student Clubs (GDSC) Lead for 2023/2024 and served as Deputy Speaker of the Africa University Student Union Parliament in 2024 — leading technical communities and student governance.",
    cta: { label: "More on leadership", to: "/about" },
  },
  {
    id: "willnova",
    keywords: ["willnova", "company", "founder", "startup", "business", "entrepreneur", "venture"],
    answer:
      "William is the founder of WillNova Technologies, where he builds software and digital solutions under the philosophy “Innovate. Build. Elevate.” It's how he takes ideas from concept to shipped product.",
    cta: { label: "Visit WillNova", to: "https://willnova.vercel.app/", external: true },
  },
  {
    id: "certificates",
    keywords: ["certificate", "certification", "certified", "credential", "course", "training", "udemy", "google cloud"],
    answer:
      `William has earned ${certificates.length}+ professional certifications spanning cloud & DevOps, software engineering, AI & automation, and more — all verifiable on the certificates page.`,
    cta: { label: "View certificates", to: "/certificates" },
  },
  {
    id: "availability",
    keywords: ["available", "availability", "hire", "hiring", "job", "opportunit", "remote", "work with", "freelance", "open to", "recruit"],
    answer:
      "Yes — William is open to full-time, contract, and freelance work in software engineering, full-stack, AI systems, and DevOps. He works remotely from Zimbabwe (CAT, UTC+2) and is open to hybrid, on-site, or relocation. The fastest way to reach him is the contact page or email.",
    cta: { label: "Get in touch", to: "/contact" },
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "message", "get in touch", "connect", "linkedin", "github", "social"],
    answer:
      "You can reach William at graywilliamwiltino@gmail.com, through the contact form, or via his socials (GitHub: William-S-Gray, plus LinkedIn). He usually responds quickly.",
    cta: { label: "Contact page", to: "/contact" },
  },
  {
    id: "cv",
    keywords: ["cv", "resume", "download", "curriculum"],
    answer: "You can download William's full CV as a PDF from the homepage — it covers his experience, education, projects, and skills in detail.",
    cta: { label: "Go to homepage", to: "/" },
  },
  {
    id: "location",
    keywords: ["where", "location", "based", "from", "country", "liberia", "zimbabwe", "africa"],
    answer:
      "William is from Liberia and was educated in Mutare, Zimbabwe, at Africa University. He builds for global, cloud-native deployment and is open to remote work.",
    cta: { label: "About", to: "/about" },
  },
];

/** Questions surfaced as clickable starters in the chat UI. */
export const suggestedQuestions = [
  "Who is William?",
  "What projects has he built?",
  "Does he work with AI?",
  "What's his tech stack?",
  "Is he available for hire?",
  "How do I contact him?",
];

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "do", "does", "did", "of", "to", "in", "on", "for", "and",
  "with", "what", "how", "can", "you", "your", "he", "his", "him", "me", "i", "about", "tell",
  "has", "have", "any", "s", "william", "gray",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export interface AssistantReply {
  answer: string;
  cta?: KbEntry["cta"];
  matched: boolean;
}

/**
 * Score every KB entry against the question by keyword overlap and return
 * the best answer. Falls back to a helpful default when nothing scores.
 */
export function answerQuestion(question: string): AssistantReply {
  const tokens = tokenize(question);
  const raw = question.toLowerCase();

  let best: KbEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (kw.includes(" ")) {
        // Multi-word phrase: strong signal if present verbatim.
        if (raw.includes(kw)) score += 3;
      } else {
        if (tokens.includes(kw)) score += 2;
        else if (raw.includes(kw)) score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore >= 2) {
    return { answer: best.answer, cta: best.cta, matched: true };
  }

  return {
    answer:
      "I'm a lightweight assistant trained on William's portfolio, so I can help with his background, skills, projects, AI work, education, leadership, availability, and how to reach him. Try asking one of those — or head to the contact page to reach William directly.",
    cta: { label: "Contact William", to: "/contact" },
    matched: false,
  };
}
