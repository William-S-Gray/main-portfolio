import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { posts } from "./src/data/posts";
import { resume } from "./src/data/resume";
import { projects } from "./src/data/projects";

const SITE = "https://william-gray.netlify.app";

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c] as string));

function buildRss(): string {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const items = sorted
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
${p.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>William S. Gray — Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Writing by William S. Gray on software engineering, AI, and building technology for real-world problems.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

function buildSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls: [path: string, priority: string, lastmod?: string][] = [
    ["/", "1.0"],
    ["/about", "0.9"],
    ["/projects", "0.9"],
    ["/certificates", "0.8"],
    ["/blog", "0.8"],
    ["/services", "0.7"],
    ["/contact", "0.6"],
    ...projects.map((p) => [`/projects/${p.id}`, "0.7"] as [string, string]),
    ...posts.map((p) => [`/blog/${p.slug}`, "0.6", p.date] as [string, string, string]),
  ];
  const body = urls
    .map(([loc, priority, lastmod = today]) =>
      `  <url><loc>${SITE}${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** Emits /rss.xml, /sitemap.xml and /resume.json into the build output. */
function staticFeeds(): Plugin {
  const write = (dir: string) => {
    fs.writeFileSync(path.join(dir, "rss.xml"), buildRss());
    fs.writeFileSync(path.join(dir, "sitemap.xml"), buildSitemap());
    fs.writeFileSync(path.join(dir, "resume.json"), JSON.stringify(resume, null, 2));
  };
  return {
    name: "static-feeds",
    apply: "build",
    writeBundle(options) {
      const dir = options.dir ?? path.resolve(__dirname, "dist");
      write(dir);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    staticFeeds(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
}));
