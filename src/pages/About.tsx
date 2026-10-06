import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Landmark,
  Stethoscope,
  ShieldCheck,
  Sprout,
  Pill,
  UtensilsCrossed,
  School,
  Building2,
  Siren,
  Rocket,
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Briefcase,
} from "lucide-react";
import Seo from "@/components/Seo";
import { pageMeta } from "@/data/pages";
import { resume } from "@/data/resume";

const willNovaServices = [
  "Web Development", "Mobile Apps", "Custom Management Systems", "Backend APIs",
  "AI-Powered Solutions", "Database Architecture", "UI/UX Design", "Cloud & DevOps",
];

const founderHats = ["Founder", "Product Builder", "System Architect", "Project Manager", "Client Partner"];

const techStack = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
  "Python", "Flask", "FastAPI", "Java", "Spring Boot",
  "PostgreSQL", "MySQL", "MongoDB", "Docker", "Cloud",
];

const systems = [
  { icon: Stethoscope, name: "PathoGuide AMR Assist", to: "/projects/pathoguide", desc: "Clinical decision-support for antimicrobial resistance intelligence and better-informed treatment decisions." },
  { icon: ShieldCheck, name: "ClaimGuard 360°", to: "/projects/claimguard", desc: "Explainable, real-time fraud scoring for medical-aid claims, with member confirmation over WhatsApp/USSD." },
  { icon: Siren, name: "ERDMS", to: "/projects/erdms", desc: "Emergency response and dispatch for low-connectivity environments — one incident record across citizen, dispatcher and responder." },
  { icon: Pill, name: "PharmConnect Zim", to: "/projects/pharmtrack", desc: "Medicine discovery that shows which nearby pharmacies have a medicine in stock, live." },
  { icon: UtensilsCrossed, name: "Meal Pass", to: "/projects/meal-pass", desc: "Employee feeding access with QR/barcode meal IDs that verify eligibility and prevent double feeding." },
  { icon: School, name: "School & Campus Platforms", to: "/projects/sacred-heart-sms", desc: "Sacred Heart, 4Life Zoe Campus and CampusIQ — admissions, fees, attendance, report cards and dashboards." },
  { icon: Building2, name: "Hostels, Queues & Operations", to: "/projects/hostel-harmony", desc: "Hostel Harmony, QueueFlow and SmartMart — allocation, live queues, point of sale and reporting." },
]

const leadershipIcons = [Users, Landmark, BookOpen];
const leadership = resume.volunteer.map((v, i) => ({
  icon: leadershipIcons[i] ?? Users,
  role: v.position,
  org: `${v.organization} · ${v.startDate === v.endDate ? v.startDate : `${v.startDate}–${v.endDate}`}`,
  desc: `${v.highlights.join(". ")}.`,
}));

const netone = resume.work.find((w) => w.name.startsWith("NetOne"))!;

const approachQuestions = [
  "Who is experiencing the problem?",
  "How does the current process actually work?",
  "Where are the inefficiencies?",
  "What constraints exist in the real environment?",
  "How can technology create measurable improvement?",
];

const interests = [
  "Cloud & DevOps", "Docker & Containerisation", "Software Architecture",
  "Artificial Intelligence", "API Design & Integration", "Cybersecurity",
  "Data-Driven Applications", "Product Development", "User Experience", "Open Source",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

const About = () => (
  <section className="px-4 py-16">
    <Seo {...pageMeta["/about"]} path="/about" />
    <div className="container mx-auto max-w-5xl space-y-20">
      {/* Intro */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block clay-sm px-4 py-1.5 text-xs font-semibold text-primary mb-6">
          Building technology that solves real problems
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          About <span className="text-gradient">William S. Gray</span>
        </h1>
        <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground text-left">
          <p>
            Hello, I'm <strong className="text-foreground">William S. Gray</strong>, a Software Engineer and
            Computer Science graduate with a passion for building practical, scalable technology that addresses
            real-world challenges.
          </p>
          <p>
            Originally from <strong className="text-foreground">Liberia</strong> and educated in{" "}
            <strong className="text-foreground">Zimbabwe</strong>, my journey has shaped me into a globally
            minded engineer who sees technology not simply as code, but as a tool for solving problems, improving
            systems, and creating opportunities.
          </p>
        </div>
      </motion.div>

      {/* Education highlight */}
      <motion.article
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="clay p-6 sm:p-8 flex items-start gap-5 max-w-3xl mx-auto"
      >
        <span className="w-12 h-12 rounded-clay bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
          <GraduationCap size={24} />
        </span>
        <div>
          <h2 className="text-xl font-bold mb-1">BSc (Honours) in Computer Science</h2>
          <p className="text-sm text-primary font-medium mb-2">Africa University · Mutare, Zimbabwe · Graduated June 2026</p>
          <p className="text-sm text-muted-foreground">
            My experience extended far beyond the classroom — combining software development, technical
            leadership, innovation, and community involvement while building systems across healthcare,
            education, agriculture, digital services, and operational management.
          </p>
        </div>
      </motion.article>

      {/* Industry experience */}
      <motion.article
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="clay p-6 sm:p-8 flex items-start gap-5 max-w-3xl mx-auto"
      >
        <span className="w-12 h-12 rounded-clay bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          <Briefcase size={24} />
        </span>
        <div>
          <h2 className="text-xl font-bold mb-1">{netone.position}</h2>
          <p className="text-sm text-primary font-medium mb-2">NetOne · Zimbabwe · Oct 2025 – Jun 2026</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            {netone.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </motion.article>

      {/* What I Build */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-3">What I Build</h2>
          <p className="text-muted-foreground text-sm">
            My work focuses on full-stack software engineering, AI-powered systems, cloud technologies, and
            DevOps — across the entire lifecycle, from understanding a problem and designing the architecture to
            deploying, monitoring, and continuously improving the product.
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-2.5 list-none p-0">
          {techStack.map((t, i) => (
            <motion.li
              key={t}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="clay-sm px-4 py-2 text-sm font-medium text-foreground clay-hover cursor-default"
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Featured systems */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-3">Systems I've Worked On</h2>
          <p className="text-muted-foreground text-sm">
            I'm especially drawn to building for environments where infrastructure, connectivity, affordability,
            and operational realities require solutions to be designed differently.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {systems.map((s, i) => (
            <motion.div
              key={s.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="clay clay-hover"
            >
              <Link to={s.to} className="p-6 flex items-start gap-4 h-full group">
                <span className="w-11 h-11 rounded-clay bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <s.icon size={20} />
                </span>
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See featured projects <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Leadership */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-3">Leadership &amp; Community</h2>
          <p className="text-muted-foreground text-sm">
            Leadership isn't simply about holding a position — it's about taking responsibility, listening,
            communicating clearly, bringing teams together, and turning ideas into action.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {leadership.map((l, i) => (
            <motion.article
              key={l.role}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="clay p-6 clay-hover"
            >
              <span className="w-11 h-11 rounded-clay bg-accent/15 text-accent flex items-center justify-center mb-4">
                <l.icon size={20} />
              </span>
              <h3 className="font-semibold leading-tight mb-1">{l.role}</h3>
              <p className="text-sm text-primary font-medium mb-2">{l.org}</p>
              <p className="text-sm text-muted-foreground">{l.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Entrepreneurship — WillNova Technologies */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="clay-lg p-8 sm:p-12 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="w-12 h-12 rounded-clay bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Rocket size={24} />
          </span>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">Entrepreneurship</p>
            <h2 className="text-2xl font-bold leading-tight">Founder, WillNova Technologies</h2>
          </div>
        </div>

        <div className="space-y-4 text-muted-foreground text-sm">
          <p>
            Beyond my work as a software engineer, I'm the founder of{" "}
            <strong className="text-foreground">WillNova Technologies</strong>, a technology startup focused on
            transforming ideas and operational challenges into scalable digital products — helping businesses,
            institutions, startups, and individuals modernise their operations and bring ambitious ideas to life.
          </p>
          <p>
            Building WillNova has expanded my experience beyond writing code, challenging me to think about
            technology as a founder, product builder, system architect, project manager, and client partner —
            understanding business problems, defining requirements, designing solutions, managing delivery, and
            supporting products after launch.
          </p>
        </div>

        <div className="my-6">
          <p className="text-xs font-semibold text-foreground mb-3">What we build</p>
          <ul className="flex flex-wrap gap-2 list-none p-0">
            {willNovaServices.map((s) => (
              <li key={s} className="clay-sm px-3.5 py-1.5 text-xs font-medium text-muted-foreground cursor-default">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-foreground mb-3">Hats I wear</p>
          <ul className="flex flex-wrap gap-2 list-none p-0">
            {founderHats.map((h) => (
              <li key={h} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          My ambition is to grow WillNova into a globally competitive African technology company that builds
          world-class digital products while contributing to the growth of Africa's technology ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8 pt-6 border-t border-border">
          <span className="font-heading font-bold text-gradient">Innovate. Build. Elevate.</span>
          <a
            href="https://willnova.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-clay bg-primary text-primary-foreground text-sm font-semibold clay-hover transition-all sm:ml-auto"
          >
            Visit WillNova <ArrowUpRight size={15} />
          </a>
        </div>
      </motion.div>

      {/* Approach */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">How I Approach Technology</h2>
          <p className="text-muted-foreground text-sm">
            I believe the best technology begins with understanding the problem before choosing the tools. Before
            I write code, I ask:
          </p>
        </div>
        <ul className="space-y-3 list-none p-0">
          {approachQuestions.map((q, i) => (
            <motion.li
              key={q}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="clay-sm px-5 py-4 flex items-center gap-3 text-sm font-medium"
            >
              <span className="text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
              {q}
            </motion.li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground text-center mt-6">
          I'm particularly drawn to challenges in healthcare, education, agriculture, public services, and digital
          transformation — especially within African and emerging-market contexts.
        </p>
      </div>

      {/* Interests */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Beyond Writing Code</h2>
        <ul className="flex flex-wrap justify-center gap-2.5 list-none p-0 max-w-3xl mx-auto">
          {interests.map((t, i) => (
            <motion.li
              key={t}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="clay-sm px-4 py-2 text-sm font-medium text-muted-foreground clay-hover cursor-default"
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Looking forward / CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="clay-lg p-8 sm:p-12 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
        <p className="text-muted-foreground text-sm mb-2">
          I'm focused on growing as a Software Engineer and contributing to teams building meaningful technology
          at scale — open to software engineering, full-stack, backend, frontend, cloud &amp; DevOps, AI-powered
          systems, graduate programmes, and international technology organisations. Full-time, contract, or
          freelance — remote first (CAT, UTC+2), with hybrid, on-site, or relocation also possible.
        </p>
        <p className="text-foreground font-semibold mt-6 mb-8">
          For me, technology is not only about what can be built. It is about what becomes possible because we
          built it.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover transition-all text-sm"
        >
          Let's build something <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default About;
