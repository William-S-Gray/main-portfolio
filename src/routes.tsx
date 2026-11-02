import type { ComponentType } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { lazyPage } from "./lib/lazyPage";

/** Every page. Pages other than the homepage and 404 load on demand (see lazyPage). */
export const routes: { path: string; Page: ComponentType & { preload?: () => Promise<unknown> } }[] = [
  { path: "/", Page: Index },
  { path: "/about", Page: lazyPage(() => import("./pages/About")) },
  { path: "/services", Page: lazyPage(() => import("./pages/Services")) },
  { path: "/projects", Page: lazyPage(() => import("./pages/Projects")) },
  { path: "/projects/:id", Page: lazyPage(() => import("./pages/ProjectDetail")) },
  { path: "/certificates", Page: lazyPage(() => import("./pages/Certificates")) },
  { path: "/blog", Page: lazyPage(() => import("./pages/Blog")) },
  { path: "/blog/:slug", Page: lazyPage(() => import("./pages/BlogPost")) },
  { path: "/contact", Page: lazyPage(() => import("./pages/Contact")) },
  { path: "/resume", Page: lazyPage(() => import("./pages/Resume")) },
  { path: "*", Page: NotFound },
];
