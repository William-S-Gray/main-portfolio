import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
} from "lucide-react";
import { categoryColors, categoryIcons } from "@/lib/categories";
import { projects } from "@/data/projects";
import Seo from "@/components/Seo";
import NotFound from "./NotFound";

const SITE_URL = "https://william-gray.netlify.app";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <NotFound />;

  const gradient = categoryColors[project.category] ?? "from-primary to-primary/60";
  const icon = categoryIcons[project.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    keywords: project.techStack.join(", "),
    url: `${SITE_URL}/projects/${project.id}`,
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    author: { "@type": "Person", name: "William S. Gray", url: `${SITE_URL}/` },
  };

  return (
    <section className="px-4 py-16">
      <Seo
        title={`${project.title} — Project by William S. Gray`}
        description={project.description.slice(0, 155)}
        path={`/projects/${project.id}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container mx-auto max-w-4xl">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={15} /> All projects
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`w-11 h-11 rounded-clay bg-gradient-to-br ${gradient} text-white flex items-center justify-center`}>
              {icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground capitalize">
              {project.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.inDevelopment && (
              <span className="inline-flex items-center px-4 py-2 rounded-clay bg-amber-500/15 text-amber-700 dark:text-amber-300 text-sm font-semibold">
                In development — not yet deployed
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-clay bg-primary text-primary-foreground text-sm font-semibold clay-hover transition-all"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-clay clay-sm text-sm font-semibold text-muted-foreground hover:text-foreground transition-all"
              >
                <Github size={15} /> Source
              </a>
            )}
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="clay overflow-hidden mb-12"
        >
          {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} className="w-full object-cover" loading="eager" />
          ) : (
            <div className={`h-56 sm:h-72 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3 text-white`}>
              <div className="[&>svg]:w-12 [&>svg]:h-12 opacity-90">{icon}</div>
              <span className="font-heading font-bold text-2xl">{project.title}</span>
            </div>
          )}
        </motion.div>

        {/* Body */}
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {project.problem && (
            <div>
              <h2 className="text-xl font-bold mb-3">The problem</h2>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>
          )}

          {project.role && (
            <div>
              <h2 className="text-xl font-bold mb-3">My role</h2>
              <p className="text-muted-foreground leading-relaxed">{project.role}</p>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Key features</h2>
              <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
                {project.features.map((f) => (
                  <li key={f} className="clay-sm px-4 py-3 flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={17} className="text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="clay-lg p-8 text-center mt-14">
          <h2 className="text-xl font-bold mb-2">Interested in work like this?</h2>
          <p className="text-sm text-muted-foreground mb-6">Let's talk about building something for your team.</p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover transition-all text-sm"
          >
            Get in touch
          </Link>
        </div>
      </article>
    </section>
  );
};

export default ProjectDetail;
