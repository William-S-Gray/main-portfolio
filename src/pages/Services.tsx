import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Globe,
  Server,
  Brain,
  WifiOff,
  Cloud,
  ArrowRight,
  MessageCircle,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { pageMeta } from "@/data/pages";
import { WHATSAPP_URL } from "@/data/resume";

// Every service points at a shipped project as proof — no claims without a case study.
const services = [
  {
    icon: LayoutDashboard,
    title: "Management platforms",
    description:
      "Admissions, enrolment, fees, attendance, inventory, approvals — one system with role-based access instead of spreadsheets and paper.",
    proof: { label: "4Life Zoe Digital Campus", to: "/projects/zoe-campus" },
  },
  {
    icon: Globe,
    title: "Web apps & dashboards",
    description:
      "Fast, responsive React and Next.js applications with live dashboards that show decision-makers what's happening now.",
    proof: { label: "PathoGuide", to: "/projects/pathoguide" },
  },
  {
    icon: Server,
    title: "Backend APIs & integrations",
    description:
      "Secure REST APIs with authentication, permissions, audit trails and realtime updates — designed so the backend stays the source of truth.",
    proof: { label: "ERDMS", to: "/projects/erdms" },
  },
  {
    icon: Brain,
    title: "AI & computer vision features",
    description:
      "Practical AI where it earns its place — plate recognition, recommendations, automation — with humans reviewing the uncertain cases.",
    proof: { label: "Aegis", to: "/projects/aegis" },
  },
  {
    icon: WifiOff,
    title: "Built for low connectivity",
    description:
      "Mobile-first, low-bandwidth and offline-tolerant systems, including USSD and SMS channels for people without smartphones or data.",
    proof: { label: "ERDMS", to: "/projects/erdms" },
  },
  {
    icon: Cloud,
    title: "DevOps & deployment",
    description:
      "Docker, CI pipelines that test every change, cloud deployment, and backups — so your system keeps working after launch day.",
    proof: { label: "ERDMS engineering", to: "/projects/erdms" },
  },
];

const process = [
  { title: "Understand", text: "We map who has the problem, how work happens today, and what success looks like — before choosing any technology." },
  { title: "Design", text: "A clear scope, architecture and plan you can review, with the trade-offs explained in plain language." },
  { title: "Build in increments", text: "Working software early and regular demos, so you see progress and steer as we go." },
  { title: "Launch", text: "Tested, deployed and documented — with your team trained to use and run it." },
  { title: "Support", text: "Fixes, improvements and new features after launch as your needs grow." },
];

const engagements = [
  { title: "Fixed-scope project", text: "A defined product or feature, delivered against an agreed scope and timeline." },
  { title: "Ongoing partnership", text: "Monthly development and support for a product that keeps evolving." },
  { title: "Contract or full-time role", text: "Joining your team to build and own part of your platform." },
];

const deliverables = [
  "Source code in your repository",
  "Automated tests and CI on every change",
  "Deployment set up and documented",
  "Admin and user handover",
  "Support after launch",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45 } }),
};

const Services = () => (
  <section className="px-4 py-16">
    <Seo {...pageMeta["/services"]} path="/services" />
    <div className="container mx-auto max-w-6xl space-y-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Software that works in <span className="text-gradient">the real world</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          I help businesses, institutions and startups turn messy processes and big ideas into reliable software —
          scoped clearly, built carefully, and supported after launch.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover text-sm"
          >
            Start a project <ArrowRight size={16} />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            See my work
          </Link>
        </div>
      </motion.div>

      {/* What I build */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">What I build</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="clay p-7 flex flex-col clay-hover"
            >
              <div className="w-12 h-12 rounded-clay bg-primary/10 flex items-center justify-center mb-5">
                <s.icon size={22} className="text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground flex-1 mb-5">{s.description}</p>
              <Link to={s.proof.to} className="text-sm font-semibold text-primary hover:underline">
                Proof: {s.proof.label} →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">How we'll work together</h2>
        <ol className="space-y-3 list-none p-0">
          {process.map((p, i) => (
            <motion.li
              key={p.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="clay-sm px-5 py-4 flex items-start gap-4"
            >
              <span className="text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-semibold text-sm">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Engagements + deliverables */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6">Ways to work with me</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {engagements.map((e) => (
              <div key={e.title} className="clay-sm p-5">
                <h3 className="font-semibold text-sm mb-1.5">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">What you get</h2>
          <ul className="clay-sm p-5 space-y-2.5 list-none">
            {deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 size={17} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="clay-lg p-8 sm:p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Tell me what you're building</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Share the problem, your timeline and any constraints. I'll reply within 24 hours with questions or a
          suggested next step — no obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover text-sm"
          >
            <Mail size={16} /> Send a message
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
