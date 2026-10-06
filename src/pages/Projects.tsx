import { useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  LayoutDashboard,
  ShoppingBag,
  Music,
  Bot,
  ShoppingCart,
  ShieldCheck,
  Siren,
  Grid2X2,
} from "lucide-react";
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

const categories = [
  "all",
  "healthcare",
  "management",
  "marketplace",
  "entertainment",
  "ai",
  "retail",
  "security",
  "emergency",
] as const;

type Category = (typeof categories)[number];

const categoryIcons: Record<Category, React.ReactNode> = {
  all: <Grid2X2 size={14} />,
  healthcare: <Stethoscope size={14} />,
  management: <LayoutDashboard size={14} />,
  marketplace: <ShoppingBag size={14} />,
  entertainment: <Music size={14} />,
  ai: <Bot size={14} />,
  retail: <ShoppingCart size={14} />,
  security: <ShieldCheck size={14} />,
  emergency: <Siren size={14} />,
};

const Projects = () => {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

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

        {/* Filters */}
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-clay text-sm font-medium transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground"
                  : "clay-sm text-muted-foreground hover:text-foreground"
              }`}
            >
              {categoryIcons[c]}
              {categoryLabel(c)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <h2 className="sr-only">Project list</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
