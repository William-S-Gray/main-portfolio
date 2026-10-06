import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { categoryColors, categoryIcons, statusBadge } from "@/lib/categories";

const ProjectCard = ({ project }: { project: Project }) => {
  const iconColorClass =
    categoryColors[project.category] ?? "from-primary to-primary/60";
  const cardIcon = categoryIcons[project.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="clay overflow-hidden clay-hover group"
    >
      <div className="relative overflow-hidden h-48">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Branded gradient placeholder when no screenshot is available */
          <div
            className={`w-full h-full bg-gradient-to-br ${iconColorClass} flex flex-col items-center justify-center gap-3 text-white transition-transform duration-500 group-hover:scale-105`}
          >
            <div className="opacity-90 [&>svg]:w-10 [&>svg]:h-10">{cardIcon}</div>
            <span className="font-heading font-bold text-lg tracking-tight px-4 text-center drop-shadow-sm">
              {project.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
        {/* Category icon badge — only over real screenshots */}
        {cardIcon && project.image && (
          <div
            aria-hidden="true"
            className={`absolute top-3 right-3 bg-gradient-to-br ${iconColorClass} text-white p-2 rounded-xl shadow-lg backdrop-blur-sm`}
          >
            {cardIcon}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start gap-3 mb-2">
          <h3 className="font-bold text-lg leading-tight">
            <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors">
              {project.title}
            </Link>
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Case study <ArrowRight size={14} />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={15} /> Live
            </a>
          )}
          {project.status && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusBadge[project.status].className}`}>
              {statusBadge[project.status].label}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
