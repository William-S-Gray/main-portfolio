import { motion } from "framer-motion";
import { ArrowRight, FileText, CheckCircle2, GraduationCap, Briefcase, Rocket, Users, Building2, Code2, Mail, MessageCircle, Github, Linkedin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { pageMeta } from "@/data/pages";
import ImpactStats from "@/components/ImpactStats";
import GitHubActivity from "@/components/GitHubActivity";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { WHATSAPP_URL } from "@/data/resume";

const featured = projects.filter((p) => p.featured);

const credentials = [
  { icon: GraduationCap, label: "BSc Computer Science · Africa University '26" },
  { icon: Briefcase, label: "Software Developer Intern · NetOne" },
  { icon: Rocket, label: "Founder · WillNova Technologies" },
  { icon: Users, label: "GDSC President · 100+ developers" },
];

const audiences = [
  {
    icon: Building2,
    eyebrow: "Hiring for your team",
    title: "An engineer who owns the whole system",
    points: [
      "Ships end to end — architecture, code, tests, deployment and support",
      "Production habits: CI pipelines, load tests, failure drills and audit trails (see the ERDMS case study)",
      "Industry experience building enterprise systems at NetOne",
      "Leads and communicates — ran a 100+ member developer community as GDSC President",
    ],
    primary: { label: "View résumé", to: "/resume" },
    secondary: { label: "Contact me", to: "/contact" },
  },
  {
    icon: Code2,
    eyebrow: "Building a product",
    title: "A partner from idea to launch",
    points: [
      "Custom web platforms, management systems, APIs and AI features",
      "Built for real conditions — mobile-first, low bandwidth, offline-tolerant",
      "Already shipped for clinics, schools, campuses, security and retail",
      "Clear scope, regular demos, and support after launch",
    ],
    primary: { label: "See services", to: "/services" },
    secondary: { label: "Start a project", to: "/contact" },
  },
];

const socials = [
  { icon: Github, href: "https://github.com/William-S-Gray", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/william-wiltino-gray-577254253/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/wiltino.gray/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/williamwiltinogray/", label: "Instagram" },
];

const Index = () => (
  <>
    <section className="px-4 min-h-[calc(100vh-6rem)] flex items-center">
      <Seo {...pageMeta["/"]} path="/" />
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 clay-sm px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Open to full-time, contract &amp; freelance · Remote
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Hi, I'm <span className="text-gradient">William S. Gray</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-2 font-medium">
            Software Engineer · AI &amp; Full-Stack Systems Builder · DevOps
          </p>
          <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-5">
            I design and ship full-stack applications, AI-powered systems, and cloud-native infrastructure — and I own them end to end, from the first conversation to a tested, deployed product.
          </p>
          <ul className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 list-none p-0">
            {credentials.map((c) => (
              <li key={c.label} className="inline-flex items-center gap-1.5 clay-sm px-3 py-1.5 text-xs font-medium text-foreground">
                <c.icon size={14} className="text-primary" aria-hidden="true" /> {c.label}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-10">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover transition-all text-sm"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-clay bg-secondary text-secondary-foreground font-semibold clay-hover clay-sm transition-all text-sm"
            >
              Hire Me
            </Link>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary transition-all"
            >
              <FileText size={16} /> View résumé
            </Link>
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2.5 rounded-clay clay-sm clay-hover text-muted-foreground hover:text-primary transition-colors"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Profile */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="clay-lg p-3 animate-float">
            <img
              src="/Will.webp"
              alt="Portrait of William S. Gray, software engineer and full-stack systems builder"
              className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-clay-lg"
              width={433}
              height={577}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>

    </div>
    </section>
    <section className="px-4 py-16" aria-labelledby="audiences-heading">
      <div className="container mx-auto max-w-6xl">
        <h2 id="audiences-heading" className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
          Two ways to <span className="text-gradient">work with me</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((a) => (
            <article key={a.title} className="clay p-7 sm:p-8 flex flex-col">
              <span className="w-12 h-12 rounded-clay bg-primary/10 text-primary flex items-center justify-center mb-5">
                <a.icon size={22} aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">{a.eyebrow}</p>
              <h3 className="text-xl font-bold mb-4">{a.title}</h3>
              <ul className="space-y-2.5 mb-7 flex-1 list-none p-0">
                {a.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={17} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={a.primary.to}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-clay bg-primary text-primary-foreground text-sm font-semibold clay-hover"
                >
                  {a.primary.label} <ArrowRight size={15} />
                </Link>
                <Link
                  to={a.secondary.to}
                  className="inline-flex items-center px-5 py-2.5 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary"
                >
                  {a.secondary.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="px-4 py-16" aria-labelledby="featured-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="featured-heading" className="text-2xl sm:text-3xl font-extrabold">
              Featured <span className="text-gradient">work</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Systems I've designed and shipped end to end.</p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            All {projects.length} projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
    <ImpactStats />
    <GitHubActivity />
    <section className="px-4 py-16" aria-labelledby="cta-heading">
      <div className="container mx-auto max-w-4xl clay-lg p-8 sm:p-12 text-center">
        <h2 id="cta-heading" className="text-2xl sm:text-3xl font-extrabold mb-3">
          Have a role or a project in mind?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          I usually reply within 24 hours. Tell me what you're building or hiring for — I'll tell you honestly how I can help.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover text-sm"
          >
            <Mail size={16} /> Get in touch
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <FileText size={16} /> Résumé
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Index;
