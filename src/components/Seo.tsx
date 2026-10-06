import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.williamgray.dev";
const DEFAULT_TITLE = "William S. Gray | Software Engineer & AI Full-Stack Systems Builder";

interface SeoProps {
  /** Full <title> for the page. */
  title: string;
  /** ~150–160 character meta description. */
  description: string;
  /** Path portion of the canonical URL, e.g. "/about". Defaults to current path. */
  path?: string;
}

/** Sets/updates a <meta name|property=...> tag in <head>. */
const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Client-side head management for a SPA. The homepage carries the primary
 * Person/ProfilePage structured data in index.html; this keeps per-route
 * titles, descriptions, and canonical URLs correct for crawlers that execute JS.
 */
const Seo = ({ title, description, path }: SeoProps) => {
  const location = useLocation();
  const url = `${SITE_URL}${path ?? location.pathname}`;

  useEffect(() => {
    document.title = title;

    setMeta("name", "description", description);

    // Canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Open Graph + Twitter (title/description/url kept in sync with the route)
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, url]);

  return null;
};

export default Seo;
