import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ExternalLink,
  BadgeCheck,
  Code2,
  Bot,
  Cloud,
  ShieldCheck,
  HeartPulse,
  Users,
  Grid2X2,
} from "lucide-react";
import { certificates, certCategories, type Certificate, type CertCategory } from "@/data/certificates";
import Seo from "@/components/Seo";
import { pageMeta } from "@/data/pages";

const categoryMeta: Record<CertCategory, { icon: React.ReactNode; gradient: string }> = {
  "Software Engineering & Development": { icon: <Code2 size={20} />, gradient: "from-blue-500 to-indigo-600" },
  "AI & Automation": { icon: <Bot size={20} />, gradient: "from-cyan-500 to-sky-600" },
  "Cloud & DevOps": { icon: <Cloud size={20} />, gradient: "from-emerald-500 to-teal-600" },
  "Security & Compliance": { icon: <ShieldCheck size={20} />, gradient: "from-orange-500 to-red-600" },
  "Healthcare & Domain": { icon: <HeartPulse size={20} />, gradient: "from-rose-500 to-pink-600" },
  "Leadership & Professional": { icon: <Users size={20} />, gradient: "from-violet-500 to-purple-600" },
};

const issuerCount = new Set(certificates.map((c) => c.issuer)).size;

const Certificates = () => {
  const [filter, setFilter] = useState<CertCategory | "all">("all");

  const visibleCategories = filter === "all" ? certCategories : [filter];

  return (
    <section className="px-4 py-16">
      <Seo {...pageMeta["/certificates"]} path="/certificates" />

      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Certificates &amp; <span className="text-gradient">Credentials</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {certificates.length} verified certifications across software engineering, AI, cloud, and
            leadership — issued by {issuerCount} organizations including Udemy, Google, and Great Learning.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            <Grid2X2 size={14} /> All
          </FilterButton>
          {certCategories.map((c) => (
            <FilterButton key={c} active={filter === c} onClick={() => setFilter(c)}>
              {categoryMeta[c].icon}
              <span className="hidden sm:inline">{c}</span>
              <span className="sm:hidden">{c.split(" ")[0]}</span>
            </FilterButton>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {visibleCategories.map((cat) => {
            const certs = certificates.filter((c) => c.category === cat);
            if (certs.length === 0) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`w-9 h-9 rounded-clay bg-gradient-to-br ${categoryMeta[cat].gradient} text-white flex items-center justify-center flex-shrink-0`}
                  >
                    {categoryMeta[cat].icon}
                  </span>
                  <h2 className="text-xl font-bold">{cat}</h2>
                  <span className="text-sm text-muted-foreground">({certs.length})</span>
                </div>
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {certs.map((c) => (
                      <CertCard key={c.id} cert={c} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FilterButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-clay text-sm font-medium transition-all ${
      active ? "bg-primary text-primary-foreground" : "clay-sm text-muted-foreground hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

const CertCard = ({ cert }: { cert: Certificate }) => {
  const meta = categoryMeta[cert.category];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="clay p-6 flex flex-col clay-hover"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`w-11 h-11 rounded-clay bg-gradient-to-br ${meta.gradient} text-white flex items-center justify-center flex-shrink-0`}
        >
          <Award size={20} />
        </span>
        <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{cert.date}</span>
      </div>

      <h3 className="font-semibold leading-snug mb-1">{cert.title}</h3>
      <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>
      {cert.credentialId && (
        <p className="text-xs text-muted-foreground font-mono truncate" title={cert.credentialId}>
          ID: {cert.credentialId}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-border">
        <a
          href={cert.file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ExternalLink size={14} /> View
        </a>
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <BadgeCheck size={14} /> Verify
          </a>
        )}
      </div>
    </motion.article>
  );
};

export default Certificates;
