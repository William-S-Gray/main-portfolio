import { defineConfig, type Plugin } from "vite";
import type { OutputBundle, OutputChunk } from "rollup";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { posts } from "./src/data/posts";
import { resume } from "./src/data/resume";
import { projects } from "./src/data/projects";

const SITE = "https://www.williamgray.dev";

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

/** `page` is the lazy-loaded src/pages/<page>.tsx chunk to modulepreload on that route. */
type Route = { path: string; priority: string; page?: string; lastmod?: string; title?: string; description?: string };

/** Every real page on the site. Drives the sitemap and the per-route HTML files. */
const routes: Route[] = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.9", page: "About" },
  { path: "/projects", priority: "0.9", page: "Projects" },
  { path: "/certificates", priority: "0.8", page: "Certificates" },
  { path: "/blog", priority: "0.8", page: "Blog" },
  { path: "/services", priority: "0.7", page: "Services" },
  { path: "/contact", priority: "0.6", page: "Contact" },
  { path: "/resume", priority: "0.9", page: "Resume" },
  // Titles/descriptions mirror the <Seo> props in ProjectDetail.tsx and BlogPost.tsx.
  ...projects.map((p) => ({
    path: `/projects/${p.id}`,
    priority: "0.7",
    page: "ProjectDetail",
    title: `${p.title} — Project by William S. Gray`,
    description: p.description.slice(0, 155),
  })),
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: "0.6",
    page: "BlogPost",
    lastmod: p.date,
    title: `${p.title} | William S. Gray`,
    description: p.excerpt,
  })),
];

function buildSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const body = routes
    .map(({ path: loc, priority, lastmod = today }) =>
      `  <url><loc>${SITE}${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** Swaps the homepage title/description/URL tags in the built index.html for a route's own. */
function withMeta(html: string, { path: loc, title, description }: Route): string {
  if (!title || !description) return html;
  const url = `${SITE}${loc}`;
  const set = (attr: string, key: string, value: string) =>
    html.replace(new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`), `$1${escapeXml(value)}$2`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeXml(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  for (const [attr, key, value] of [
    ["name", "description", description],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", url],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
  ]) {
    html = set(attr, key, value);
  }
  return html;
}

/** Emits /rss.xml, /sitemap.xml, /resume.json, per-route HTML and 404.html into the build output. */
function staticFeeds(): Plugin {
  const write = (dir: string, bundle: OutputBundle) => {
    fs.writeFileSync(path.join(dir, "rss.xml"), buildRss());
    fs.writeFileSync(path.join(dir, "sitemap.xml"), buildSitemap());
    fs.writeFileSync(path.join(dir, "resume.json"), JSON.stringify(resume, null, 2));

    // One HTML file per real page (dist/about/index.html, …) instead of a catch-all
    // rewrite: Vercel serves these directly and returns a real 404 (404.html,
    // which renders the SPA's NotFound page) for any other path.
    // Each route also modulepreloads its lazy page chunk (and that chunk's imports) so it
    // downloads in parallel with the main bundle instead of after it.
    const shell = fs.readFileSync(path.join(dir, "index.html"), "utf8");
    const chunks = Object.values(bundle).filter((c): c is OutputChunk => c.type === "chunk");
    const preloads = (page?: string) => {
      const chunk = chunks.find((c) => c.facadeModuleId?.endsWith(`/src/pages/${page}.tsx`));
      if (!chunk) return "";
      return [chunk.fileName, ...chunk.imports]
        .filter((f) => !shell.includes(f)) // the entry and vendor chunks are already linked
        .map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`)
        .join("\n    ");
    };
    const homeOnly = /\s*<!-- Homepage hero photo[^>]*-->\s*<link [^>]*data-home-only[^>]*>/;
    const notHome = shell.replace(homeOnly, "");
    for (const route of routes) {
      if (route.path === "/") continue;
      const html = withMeta(notHome, route).replace("</head>", `  ${preloads(route.page)}\n  </head>`);
      fs.mkdirSync(path.join(dir, route.path), { recursive: true });
      fs.writeFileSync(path.join(dir, route.path, "index.html"), html);
    }
    fs.writeFileSync(path.join(dir, "404.html"), notHome);
  };
  return {
    name: "static-feeds",
    apply: "build",
    writeBundle(options, bundle) {
      const dir = options.dir ?? path.resolve(__dirname, "dist");
      write(dir, bundle);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
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
