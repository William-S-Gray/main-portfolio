import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { categoryLabel } from "@/lib/categories";
import Seo from "@/components/Seo";
import { pageMeta } from "@/data/pages";

const SITE_URL = "https://www.williamgray.dev";

// ItemList structured data so search engines can associate each system with William S. Gray.
const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Software projects by William S. Gray",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      keywords: p.techStack.join(", "),
      ...(p.liveUrl ? { url: p.liveUrl } : {}),
      author: {
        "@type": "Person",
        name: "William S. Gray",
        url: `${SITE_URL}/`,
      },
    },
  })),
};

const selected = projects.filter((p) => !p.archived);
const more = projects.filter((p) => p.archived);

const Projects = () => {
  return (
    <section className="px-4 py-16">
      <Seo {...pageMeta["/projects"]} path="/projects" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my skills in software
            development, AI, and backend engineering.
          </p>
        </motion.div>

        <h2 className="sr-only">Selected projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selected.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <h2 className="text-2xl font-extrabold mt-20 mb-2">More projects</h2>
        <p className="text-muted-foreground mb-6">Earlier builds, smaller tools and concepts, without a full case study yet.</p>
        <ul className="flex flex-col gap-3 list-none p-0">
          {more.map((p) => (
            <li key={p.id} className="clay-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1.5 text-sm">
              <Link to={`/projects/${p.id}`} className="font-semibold hover:text-primary sm:w-52 flex-shrink-0">
                {p.title}
              </Link>
              <span className="text-muted-foreground flex-1">
                {categoryLabel(p.category)} · {p.techStack.slice(0, 4).join(", ")}
                {p.status && <span className="ml-2 text-xs font-medium text-primary">{p.status === "concept" ? "Concept" : "In development"}</span>}
              </span>
              <span className="flex gap-3">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`} className="text-muted-foreground hover:text-primary">
                    <ExternalLink size={16} />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="text-muted-foreground hover:text-primary">
                    <Github size={16} />
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
