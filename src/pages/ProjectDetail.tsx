import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowDown,
  Gauge,
} from "lucide-react";
import { categoryColors, categoryIcons, categoryLabel, statusBadge } from "@/lib/categories";
import { projects } from "@/data/projects";
import Seo from "@/components/Seo";
import NotFound from "./NotFound";

const SITE_URL = "https://www.williamgray.dev";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <NotFound />;

  // Previous / next in the order the Projects page shows them, wrapping around.
  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

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
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {categoryLabel(project.category)}
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
            {project.status && (
              <span className={`inline-flex items-center px-4 py-2 rounded-clay text-sm font-semibold ${statusBadge[project.status].className}`}>
                {statusBadge[project.status].detail}
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

          {project.architecture && project.architecture.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Architecture</h2>
              <ol className="list-none p-0 flex flex-col items-stretch">
                {project.architecture.map((layer, i) => (
                  <li key={layer} className="flex flex-col items-center">
                    {i > 0 && <ArrowDown size={16} aria-hidden="true" className="my-1.5 text-muted-foreground" />}
                    <span className="w-full clay-sm px-4 py-3 text-sm text-center font-medium">{layer}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {project.decisions && project.decisions.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Key decisions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.decisions.map((d) => (
                  <div key={d.title} className="clay-sm p-5">
                    <h3 className="font-semibold text-sm mb-1.5">{d.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.results && project.results.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Results &amp; engineering</h2>
              <ul className="space-y-3 list-none p-0">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <Gauge size={17} aria-hidden="true" className="text-primary flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Previous / next */}
        <nav aria-label="More projects" className="grid sm:grid-cols-2 gap-4 mt-14">
          <Link to={`/projects/${prev.id}`} className="clay-sm clay-hover p-5 group">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <ArrowLeft size={13} aria-hidden="true" /> Previous project
            </span>
            <span className="block mt-1 font-bold group-hover:text-primary transition-colors">{prev.title}</span>
          </Link>
          <Link to={`/projects/${next.id}`} className="clay-sm clay-hover p-5 group sm:text-right">
            <span className="flex items-center sm:justify-end gap-1.5 text-xs font-semibold text-muted-foreground">
              Next project <ArrowRight size={13} aria-hidden="true" />
            </span>
            <span className="block mt-1 font-bold group-hover:text-primary transition-colors">{next.title}</span>
          </Link>
        </nav>

        {/* CTA */}
        <div className="clay-lg p-8 text-center mt-8">
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
