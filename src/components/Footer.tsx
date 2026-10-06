import { Link } from "react-router-dom";
import { Github, Linkedin, Facebook, Instagram, Mail } from "lucide-react";
import { resume, availability } from "@/data/resume";

const socials = [
  { icon: Github, href: "https://github.com/William-S-Gray", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/william-wiltino-gray-577254253/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/wiltino.gray/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/williamwiltinogray/", label: "Instagram" },
];

const quickLinks = [
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/resume", label: "Résumé" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => (
  <footer className="py-12 px-4 print:hidden">
    <div className="container mx-auto max-w-6xl">
      <div className="clay p-8 grid gap-8 md:grid-cols-3 md:items-start">
        <div className="space-y-3 text-center md:text-left">
          <Link to="/" className="font-heading text-lg font-bold text-gradient">
            William.
          </Link>
          <p className="text-sm text-muted-foreground">
            Software engineer building full-stack, AI-powered and cloud systems for real-world problems.
          </p>
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {availability.engagement} · Remote
          </p>
        </div>

        <nav aria-label="Footer" className="text-center">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 list-none p-0 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${resume.basics.email}`}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-foreground hover:text-primary"
          >
            <Mail size={15} aria-hidden="true" /> {resume.basics.email}
          </a>
        </nav>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2.5 rounded-clay clay-sm clay-hover text-muted-foreground hover:text-primary transition-colors"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} William S. Gray. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
