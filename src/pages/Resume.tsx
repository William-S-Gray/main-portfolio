import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Printer, Mail, Globe, Github, Linkedin, MessageCircle, MapPin, Briefcase, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import { resume, availability, WHATSAPP_URL } from "@/data/resume";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-10" → "Oct 2025", "2023" → "2023". */
const fmt = (d?: string) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
};
const range = (start?: string, end?: string) =>
  !start ? "" : start === end ? fmt(start) : `${fmt(start)} – ${end ? fmt(end) : "Present"}`;

const shipped = projects.filter((p) => p.status !== "concept");
// Hand-picked for relevance to engineering roles; the full list lives on /certificates.
const HIGHLIGHT_CERTS = [
  "software-architecture",
  "microservices-nodejs-react",
  "complete-nodejs",
  "mcp-ai-agents",
  "docker-for-beginners",
  "devops-fundamentals",
  "cloud-computing-foundations",
  "intro-to-machine-learning",
  "healthcare-it",
  "gdsc-solution-challenge",
];
const highlightCerts = HIGHLIGHT_CERTS.map((id) => certificates.find((c) => c.id === id)).filter(
  (c): c is (typeof certificates)[number] => Boolean(c)
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{title}</h2>
    {children}
  </section>
);

/**
 * Always-current résumé rendered from src/data — replaces the uploaded PDF.
 * "Save as PDF" uses the browser's print dialog; printing is forced to the
 * light theme so the PDF is readable whatever theme the visitor uses.
 */
const Resume = () => {
  useEffect(() => {
    const root = document.documentElement;
    let wasDark = false;
    const before = () => {
      wasDark = root.classList.contains("dark");
      root.classList.remove("dark");
    };
    const after = () => wasDark && root.classList.add("dark");
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  const { basics } = resume;
  const github = basics.profiles.find((p) => p.network === "GitHub")!;
  const linkedin = basics.profiles.find((p) => p.network === "LinkedIn")!;

  return (
    <section className="px-4 py-16 print:py-0">
      <Seo
        title="Résumé — William S. Gray | Software Engineer"
        description="Résumé of William S. Gray: software engineer and Africa University Computer Science graduate — NetOne experience, WillNova founder, GDSC President. Open to full-time, contract and freelance work."
        path="/resume"
      />
      <article className="container mx-auto max-w-4xl clay-lg p-8 sm:p-12 print:p-0 print:border-0 space-y-10">
        {/* Header */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold">{basics.name}</h1>
              <p className="text-muted-foreground font-medium mt-1">{basics.label}</p>
            </div>
            <button
              onClick={() => window.print()}
              className="print:hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-clay bg-primary text-primary-foreground text-sm font-semibold clay-hover"
            >
              <Printer size={16} /> Save as PDF
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-800 dark:text-emerald-300">
              <Briefcase size={13} aria-hidden="true" /> {availability.engagement}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <MapPin size={13} aria-hidden="true" /> {availability.location}
            </span>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm list-none p-0">
            <li>
              <a href={`mailto:${basics.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                <Mail size={15} aria-hidden="true" /> {basics.email}
              </a>
            </li>
            <li>
              <a href={basics.url} className="inline-flex items-center gap-1.5 hover:text-primary">
                <Globe size={15} aria-hidden="true" /> williamgray.dev
              </a>
            </li>
            <li>
              <a href={github.url} className="inline-flex items-center gap-1.5 hover:text-primary">
                <Github size={15} aria-hidden="true" /> github.com/{github.username}
              </a>
            </li>
            <li>
              <a href={linkedin.url} className="inline-flex items-center gap-1.5 hover:text-primary">
                <Linkedin size={15} aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li className="print:hidden">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary"
              >
                <MessageCircle size={15} aria-hidden="true" /> WhatsApp
              </a>
            </li>
          </ul>
        </header>

        <Section title="Summary">
          <p className="text-sm leading-relaxed text-muted-foreground">{basics.summary}</p>
        </Section>

        <Section title="Experience">
          <div className="space-y-6">
            {resume.work.map((w) => (
              <div key={w.name} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-bold">
                    {w.position} · <span className="text-primary">{w.name}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {"startDate" in w ? range(w.startDate, w.endDate) : "Ongoing"}
                  </span>
                </div>
                {"summary" in w && <p className="text-sm text-muted-foreground mt-1">{w.summary}</p>}
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  {w.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Selected projects">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 list-none p-0">
            {shipped.map((p) => (
              <li key={p.id} className="break-inside-avoid text-sm">
                <Link to={`/projects/${p.id}`} className="font-bold hover:text-primary">
                  {p.title}
                </Link>
                {p.status === "in-development" && <span className="text-xs text-muted-foreground"> · in development</span>}
                <p className="text-muted-foreground mt-0.5">{p.description.split(". ")[0].replace(/\.$/, "")}.</p>
                <p className="text-xs text-muted-foreground/80 mt-0.5">{p.techStack.join(" · ")}</p>
              </li>
            ))}
          </ul>
          <Link to="/projects" className="print:hidden inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:underline">
            Case studies for all {projects.length} projects <ArrowRight size={14} />
          </Link>
        </Section>

        <Section title="Skills">
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {resume.skills.map((s) => (
              <div key={s.name} className="break-inside-avoid">
                <dt className="font-semibold">{s.name}</dt>
                <dd className="text-muted-foreground">{s.keywords.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Leadership & community">
          <div className="space-y-5">
            {resume.volunteer.map((v) => (
              <div key={v.organization} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-bold">
                    {v.position} · <span className="text-primary">{v.organization}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground">{range(v.startDate, v.endDate)}</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  {v.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid sm:grid-cols-2 gap-10">
          <Section title="Education">
            {resume.education.map((e) => (
              <div key={e.institution} className="text-sm">
                <h3 className="font-bold">
                  {e.studyType} {e.area}
                </h3>
                <p className="text-muted-foreground">
                  {e.institution}, {e.location} · Graduated {fmt(e.endDate)}
                </p>
              </div>
            ))}
          </Section>
          <Section title="Languages & references">
            <p className="text-sm text-muted-foreground">
              {resume.languages.map((l) => `${l.language} (${l.fluency})`).join(", ")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{resume.references[0].reference}</p>
          </Section>
        </div>

        <Section title={`Certifications (${certificates.length})`}>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground list-disc pl-5">
            {highlightCerts.map((c) => (
              <li key={c.id}>
                {c.title} — {c.issuer}
              </li>
            ))}
          </ul>
          <Link to="/certificates" className="print:hidden inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary hover:underline">
            All {certificates.length} certificates, verifiable <ArrowRight size={14} />
          </Link>
        </Section>
      </article>
    </section>
  );
};

export default Resume;
